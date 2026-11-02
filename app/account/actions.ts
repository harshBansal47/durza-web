"use server";

import { cookies } from "next/headers";
import { api, ApiError } from "@/lib/api";
import {
  clearSessionCookies,
  getAccessToken,
  setSessionCookies,
} from "@/lib/session";
import {
  describeError,
  fail,
  ok,
  type ActionResult,
  type EmailOtpRequestResult,
  type TrackFlowResult,
} from "./action-result";
import { maskEmail } from "@/lib/maskEmail";

/**
 * Server Actions for the account area.
 *
 * `'use server'` is declared once at the top of this file rather than inline
 * on each function. Client Components (the header sign-out button, for one)
 * import actions from here, and only a file-level directive keeps the module
 * — and its `server-only` / `next/headers` imports — out of the client bundle.
 *
 * Every action follows the same contract: return a plain serialisable result
 * rather than throwing, because a thrown error in a Server Action turns into an
 * opaque digest on the client. `useActionState` in the forms reads `error`.
 */

/**
 * The access token for an authenticated action.
 *
 * `proxy.ts` refreshes ahead of each render, so by the time an action runs the
 * cookie is normally fresh. If it is not — a long-lived tab submitting a stale
 * form — the refresh token is used to mint a new one rather than failing the
 * user out mid-flow.
 */
async function requireToken(): Promise<string> {
  let token = await getAccessToken();
  if (token) return token;

  const store = await cookies();
  const refresh = store.get("durza_refresh")?.value;
  if (!refresh) throw new ApiError("Not signed in", 401);

  const tokens = await api.refresh(refresh);
  await setSessionCookies(tokens.access_token, tokens.refresh_token);
  token = tokens.access_token;
  if (!token) throw new ApiError("Could not refresh the session", 401);
  return token;
}

/* ------------------------------------------------------------------ */
/* Auth                                                                */
/* ------------------------------------------------------------------ */

/** Only allow same-origin, path-relative redirects. */
function safeRedirect(target: FormDataEntryValue | null | undefined): string | null {
  if (typeof target !== "string" || !target.startsWith("/") || target.startsWith("//")) {
    return null;
  }
  return target;
}

export async function requestEmailOtpAction(
  _prev: ActionResult,
  formData: FormData,
): Promise<EmailOtpRequestResult> {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();

  if (!email) return fail("Enter your email address.");
  try {
    await api.requestEmailOtp(email);
  } catch (error) {
    const message =
      error instanceof Error && ["TimeoutError", "AbortError"].includes(error.name)
        ? "We couldn't confirm the request yet. Please try again."
        : describeError(error);
    return fail(message);
  }

  return { codeEntry: true };
}

export async function verifyEmailOtpAction(
  _prev: ActionResult,
  formData: FormData,
): Promise<ActionResult> {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const code = String(formData.get("code") ?? "").trim();
  const next = safeRedirect(formData.get("next"));

  if (!email) return fail("Enter your email address.");
  if (!/^\d{6}$/.test(code)) return fail("Enter the 6-digit code from your email.");

  try {
    const tokens = await api.verifyEmailOtp(email, code);
    await setSessionCookies(tokens.access_token, tokens.refresh_token);
  } catch (error) {
    if (error instanceof ApiError && error.status === 400) {
      return fail("That code is invalid or has expired. Please request a new one.");
    }
    return fail(describeError(error));
  }

  const { redirect } = await import("next/navigation");
  redirect(next ?? "/account");
  // `redirect` never returns, but TypeScript cannot see through a dynamic
  // import. Anything unreachable past this point is a bug, not a silent return.
  throw new Error("redirect did not return");
}

export async function logoutAction(): Promise<void> {
  const token = await getAccessToken();
  if (token) {
    try {
      await api.logout(token);
    } catch {
      // Logout is best-effort on the backend: clearing the browser cookies is
      // the local part of the operation, and a failed revocation still means the
      // holder just lost access through the cookie.
    }
  }
  await clearSessionCookies();
  const { redirect } = await import("next/navigation");
  redirect("/");
  throw new Error("redirect did not return");
}

/* ------------------------------------------------------------------ */
/* Account deletion                                                    */
/* ------------------------------------------------------------------ */

export async function deleteAccountAction(
  _prev: ActionResult,
  formData: FormData,
): Promise<ActionResult> {
  const confirmEmail = String(formData.get("confirm_email") ?? "").trim().toLowerCase()

  if (!confirmEmail) return fail("Confirm your email address.")

  try {
    const token = await requireToken()
    const me = await api.me(token)

    if (confirmEmail !== me.email.toLowerCase()) {
      return fail("The email address does not match your account.")
    }

    await api.deleteAccount(token, confirmEmail)
  } catch (error) {
    if (error instanceof ApiError) {
      if (error.status === 401) return fail("Your session has expired. Please sign in again.")
      if (error.status === 400) return fail("The email address does not match your account.")
    }
    return fail(describeError(error))
  }

  // Clear the session cookies
  await clearSessionCookies()

  const { redirect } = await import("next/navigation")
  redirect("/?deleted=success")
  throw new Error("redirect did not return")
}

/* ------------------------------------------------------------------ */
/* Profile                                                             */
/* ------------------------------------------------------------------ */

export async function updateProfileAction(
  _prev: ActionResult,
  formData: FormData,
): Promise<ActionResult> {
  const fullName = String(formData.get("full_name") ?? "").trim();
  const patch: { full_name?: string | null } = { full_name: fullName || null };

  try {
    const token = await requireToken();
    await api.updateMe(token, patch);
  } catch (error) {
    return fail(describeError(error));
  }

  return ok("Profile updated.");
}

/* ------------------------------------------------------------------ */
/* Saved stores and coupons                                             */
/* ------------------------------------------------------------------ */

/** Ids only — the catalogue rows are fetched fresh by the pages that show them. */
async function savedIds(
  kind: "store" | "coupon",
  list: (token: string) => Promise<{ kind: string; item_id: string }[]>,
): Promise<Set<string>> {
  const token = await requireToken();
  const rows = await list(token);
  return new Set(rows.filter((row) => row.kind === kind).map((row) => row.item_id));
}

export async function getSavedStoreIds(): Promise<Set<string>> {
  return savedIds("store", api.listSavedStores);
}

export async function getSavedCouponIds(): Promise<Set<string>> {
  return savedIds("coupon", api.listSavedCoupons);
}

async function setSavedItem(
  kind: "store" | "coupon",
  itemId: string,
  shouldSave: boolean,
): Promise<ActionResult> {
  try {
    const token = await requireToken();
    // The API's save and unsave are idempotent (saving what is saved, or unsaving what is
    // not, succeeds and changes nothing), so this states the wanted outcome directly. It used
    // to fetch the user's whole saved list first just to decide whether to write.
    if (shouldSave) {
      if (kind === "store") await api.saveStore(token, itemId);
      else await api.saveCoupon(token, itemId);
    } else if (kind === "store") await api.unsaveStore(token, itemId);
    else await api.unsaveCoupon(token, itemId);

    if (kind === "store") {
      return ok(
        shouldSave
          ? "You're following this store. We'll email you when it has a new offer, at most once a day."
          : "You've stopped following this store.",
      );
    }
    return ok(
      shouldSave
        ? "You're tracking this offer. We'll email you if it's confirmed working, about to end, or stops working."
        : "You've stopped tracking this offer.",
    );
  } catch (error) {
    return fail(describeError(error));
  }
}

/* ------------------------------------------------------------------ */
/* Track / follow, for visitors who may not have an account yet         */
/* ------------------------------------------------------------------ */

type TrackKind = "store" | "coupon";

function isTrackKind(value: unknown): value is TrackKind {
  return value === "store" || value === "coupon";
}

/**
 * Is this visitor signed in, and are they already tracking this?
 *
 * Asked from the client once the page is on screen, so the cached page itself
 * never depends on who is looking. Any failure reads as "signed out": the
 * worst case is that a signed-in visitor is offered the email-code step, which
 * still works.
 */
export async function trackingStatusAction(
  kind: TrackKind,
  itemId: string,
): Promise<{ signedIn: boolean; tracking: boolean }> {
  const token = await getAccessToken();
  if (!token || !isTrackKind(kind)) return { signedIn: false, tracking: false };
  try {
    // One backend call. The masked email the banner shows comes from `/api/session`, which
    // has already looked the user up; asking `/auth/me` again here was the same lookup twice.
    const rows =
      kind === "store" ? await api.listSavedStores(token) : await api.listSavedCoupons(token);
    return {
      signedIn: true,
      tracking: rows.some((row) => row.kind === kind && row.item_id === itemId),
    };
  } catch {
    return { signedIn: false, tracking: false };
  }
}

/**
 * Step 1 for a signed-out visitor: email them a sign-in code.
 *
 * Like the login page, it never reveals why a code might not arrive (unknown
 * address, cooldown, delivery trouble all look the same), so only a malformed
 * address is reported back.
 */
export async function requestTrackCodeAction(
  _prev: TrackFlowResult,
  formData: FormData,
): Promise<TrackFlowResult> {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  if (!email || !email.includes("@")) return fail("Enter a valid email address.");

  try {
    await api.requestEmailOtp(email);
  } catch {
    // Deliberately silent; see above.
  }
  return { codeSentTo: email, sentAt: Date.now() };
}

/**
 * Step 2: confirm the code, sign them in, and start tracking, in one go.
 *
 * Unlike `verifyEmailOtpAction` this does not redirect: the visitor stays on
 * the offer they were looking at. The save uses the tokens straight from the
 * verify call rather than re-reading the cookie that was just set.
 */
export async function trackWithEmailCodeAction(
  _prev: TrackFlowResult,
  formData: FormData,
): Promise<TrackFlowResult> {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const code = String(formData.get("code") ?? "").replace(/\s+/g, "");
  const kind = formData.get("kind");
  const itemId = String(formData.get("itemId") ?? "");

  if (!email || !isTrackKind(kind) || !itemId) return fail("Start again and enter your email address.");
  if (!/^\d{6}$/.test(code)) return { ...fail("Enter the 6-digit code from your email."), codeSentTo: email };

  let accessToken: string;
  try {
    const tokens = await api.verifyEmailOtp(email, code);
    await setSessionCookies(tokens.access_token, tokens.refresh_token);
    accessToken = tokens.access_token;
  } catch (error) {
    const message =
      error instanceof ApiError && error.status === 400
        ? "That code is invalid or has expired. Send a new one."
        : describeError(error);
    return { ...fail(message), codeSentTo: email };
  }

  try {
    if (kind === "store") await api.saveStore(accessToken, itemId);
    else await api.saveCoupon(accessToken, itemId);
  } catch (error) {
    return { ...fail(describeError(error)), signedIn: true };
  }
  return { tracking: true, signedIn: true, email: maskEmail(email) };
}

/** Set backend state explicitly so browser-local state cannot invert a save. */
export async function setSavedStoreAction(
  storeId: string,
  shouldSave: boolean,
): Promise<ActionResult> {
  return setSavedItem("store", storeId, shouldSave);
}

export async function setSavedCouponAction(
  couponId: string,
  shouldSave: boolean,
): Promise<ActionResult> {
  return setSavedItem("coupon", couponId, shouldSave);
}

export async function toggleSavedStore(
  storeId: string,
  currentlySaved: boolean,
): Promise<ActionResult> {
  return setSavedStoreAction(storeId, !currentlySaved);
}

export async function toggleSavedCoupon(
  couponId: string,
  currentlySaved: boolean,
): Promise<ActionResult> {
  return setSavedCouponAction(couponId, !currentlySaved);
}

/* ------------------------------------------------------------------ */
/* Tracked products                                                    */
/* ------------------------------------------------------------------ */

export async function trackProductAction(
  _prev: ActionResult,
  formData: FormData,
): Promise<ActionResult> {
  const productId = String(formData.get("product_id") ?? "");
  const rawTarget = String(formData.get("target_price") ?? "").trim();
  const currency = String(formData.get("currency") ?? "INR").toUpperCase();

  if (!productId) return fail("Missing product.");

  let targetPrice: number | null = null;
  if (rawTarget) {
    targetPrice = Number(rawTarget.replace(/[^0-9.]/g, ""));
    if (!Number.isFinite(targetPrice) || targetPrice <= 0) {
      return fail("Enter a target price as a plain number.");
    }
  }

  try {
    const token = await requireToken();
    await api.trackProduct(token, productId, targetPrice);
  } catch (error) {
    return fail(describeError(error));
  }

  return {
    message: targetPrice
      ? `Tracking this product. We will email you at ${targetPrice} ${currency} or below.`
      : "Tracking this product. We will email you when the price drops.",
  };
}

export async function updateTargetPriceAction(
  trackedId: string,
  rawTarget: string,
): Promise<ActionResult> {
  const trimmed = rawTarget.trim();
  let targetPrice: number | null = null;
  if (trimmed) {
    targetPrice = Number(trimmed.replace(/[^0-9.]/g, ""));
    if (!Number.isFinite(targetPrice) || targetPrice <= 0) {
      return fail("Enter a target price as a plain number.");
    }
  }

  try {
    const token = await requireToken();
    await api.updateTrackedProduct(token, trackedId, targetPrice);
    return ok(targetPrice ? `Target set to ${targetPrice}.` : "Target cleared.");
  } catch (error) {
    return fail(describeError(error));
  }
}

export async function untrackProductAction(trackedId: string): Promise<ActionResult> {
  try {
    const token = await requireToken();
    await api.untrackProduct(token, trackedId);
    return ok("No longer tracking this product.");
  } catch (error) {
    return fail(describeError(error));
  }
}

/* ------------------------------------------------------------------ */
/* Notification preferences                                            */
/* ------------------------------------------------------------------ */

export async function updatePreferencesAction(
  _prev: ActionResult,
  formData: FormData,
): Promise<ActionResult> {
  const on = (name: string) => formData.get(name) === "on" || formData.get(name) === "true";

  try {
    const token = await requireToken();
    await api.updateNotificationPreferences(token, {
      email_enabled: on("email_enabled"),
    });
  } catch (error) {
    return fail(describeError(error));
  }

  return ok("Preferences saved.");
}

/* ------------------------------------------------------------------ */
/* Newsletter unsubscribe (no account required)                        */
/* ------------------------------------------------------------------ */

/**
 * One-click unsubscribe. Works from an emailed link, so it must not require a
 * session — a signed-out reader clicking "unsubscribe" should still be honoured.
 */
export async function unsubscribeAction(_prev: ActionResult, formData: FormData): Promise<ActionResult> {
  const emailToken = String(formData.get("token") ?? "");

  // From the link in an email: the signed token is the proof, no session needed.
  if (emailToken) {
    try {
      await api.unsubscribeByToken(emailToken);
    } catch (error) {
      if (error instanceof ApiError && error.status === 400) {
        return fail("This unsubscribe link isn't valid. Sign in and use your notification settings instead.");
      }
      return fail(describeError(error));
    }
    return ok("Done. We've switched off email alerts for this address. You can turn them back on from your account at any time.");
  }

  // Signed in: change the account's own setting.
  const sessionToken = await getAccessToken();
  if (sessionToken) {
    try {
      await api.updateNotificationPreferences(sessionToken, { email_enabled: false });
    } catch (error) {
      return fail(describeError(error));
    }
    return ok("We've switched off email alerts for your account. You can turn them back on at any time.");
  }

  // Neither. This used to report success without doing anything, which left
  // people believing they had unsubscribed while alerts kept coming.
  return fail("To turn off alerts, open the unsubscribe link in one of our emails, or sign in and use your notification settings.");
}

/* ------------------------------------------------------------------ */
/* Account read helpers for pages                                      */
/* ------------------------------------------------------------------ */

async function requireAccountSlice<T>(loader: (token: string) => Promise<T>): Promise<T> {
  const token = await getAccessToken();
  if (!token) {
    const { redirect } = await import("next/navigation");
    redirect("/account/login?next=%2Faccount");
    throw new Error("unreachable");
  }

  try {
    return await loader(token);
  } catch {
    // Preserve the existing account-page failure behavior while only making
    // the requests each page actually needs.
    const { redirect } = await import("next/navigation");
    redirect("/account/login?next=%2Faccount");
    throw new Error("unreachable");
  }
}

export async function requireAccount() {
  return requireAccountSlice(async (token) => {
    const [user, stores, coupons, tracked, prefs, alerts] = await Promise.all([
      api.me(token),
      api.listSavedStores(token),
      api.listSavedCoupons(token),
      api.listTrackedProducts(token),
      api.getNotificationPreferences(token),
      api.listAlerts(token, 20),
    ]);
    return { user, stores, coupons, tracked, prefs, alerts };
  });
}

export async function requireAccountUser() {
  return requireAccountSlice(async (token) => ({ user: await api.me(token) }));
}

export async function requireSavedAccount() {
  return requireAccountSlice(async (token) => {
    const [user, stores, coupons] = await Promise.all([
      api.me(token),
      api.listSavedStores(token),
      api.listSavedCoupons(token),
    ]);
    return { user, stores, coupons };
  });
}

export async function requireTrackedAccount() {
  return requireAccountSlice(async (token) => {
    const [user, tracked] = await Promise.all([
      api.me(token),
      api.listTrackedProducts(token),
    ]);
    return { user, tracked };
  });
}

export async function requireAlertsAccount() {
  return requireAccountSlice(async (token) => {
    const [user, alerts] = await Promise.all([api.me(token), api.listAlerts(token, 50)]);
    return { user, alerts };
  });
}

export async function requireNotificationAccount() {
  return requireAccountSlice(async (token) => {
    const [user, prefs] = await Promise.all([api.me(token), api.getNotificationPreferences(token)]);
    return { user, prefs };
  });
}
