"use server";

import { cookies } from "next/headers";
import { api, ApiError } from "@/lib/api";
import {
  clearSessionCookies,
  getAccessToken,
  setSessionCookies,
} from "@/lib/session";
import type { PushPublicKey, PushSubscriptionPayload } from "@/lib/types";
import {
  describeError,
  fail,
  ok,
  type ActionResult,
  type EmailOtpRequestResult,
  type TrackFlowResult,
} from "./action-result";

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
    const rows =
      kind === "store" ? await api.listSavedStores(token) : await api.listSavedCoupons(token);
    const isSaved = rows.some((row) => row.kind === kind && row.item_id === itemId);

    if (shouldSave && !isSaved) {
      if (kind === "store") await api.saveStore(token, itemId);
      else await api.saveCoupon(token, itemId);
    } else if (!shouldSave && isSaved) {
      if (kind === "store") await api.unsaveStore(token, itemId);
      else await api.unsaveCoupon(token, itemId);
    }

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

/** `harsh@gmail.com` -> `h••••@gmail.com`. Enough to recognise, not enough to harvest. */
function maskEmail(email: string): string {
  const [name = "", domain] = email.split("@");
  if (!domain) return email;
  return `${name.slice(0, 1)}${"\u2022".repeat(Math.min(Math.max(name.length - 1, 1), 4))}@${domain}`;
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
): Promise<{ signedIn: boolean; tracking: boolean; email: string | null }> {
  const token = await getAccessToken();
  if (!token || !isTrackKind(kind)) return { signedIn: false, tracking: false, email: null };
  try {
    const [rows, me] = await Promise.all([
      kind === "store" ? api.listSavedStores(token) : api.listSavedCoupons(token),
      api.me(token),
    ]);
    return {
      signedIn: true,
      tracking: rows.some((row) => row.kind === kind && row.item_id === itemId),
      email: maskEmail(me.email),
    };
  } catch {
    return { signedIn: false, tracking: false, email: null };
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

  // A push subscription is only meaningful alongside push_enabled, and an
  // invalid one would make the alert engine fail every send.
  const rawSubscription = String(formData.get("push_subscription") ?? "").trim();
  let pushSubscription: Record<string, unknown> | null = null;
  if (rawSubscription) {
    try {
      pushSubscription = JSON.parse(rawSubscription) as Record<string, unknown>;
    } catch {
      return fail("The browser gave us an unreadable push subscription. Re-enable it.");
    }
  }

  try {
    const token = await requireToken();
    await api.updateNotificationPreferences(token, {
      email_enabled: on("email_enabled"),
      push_enabled: on("push_enabled") && pushSubscription !== null,
      telegram_enabled: on("telegram_enabled"),
      push_subscription: pushSubscription,
    });
  } catch (error) {
    return fail(describeError(error));
  }

  return ok("Preferences saved.");
}

/* ------------------------------------------------------------------ */
/* Browser push                                                        */
/* ------------------------------------------------------------------ */

/**
 * Subscribe this browser to push.
 *
 * A Server Action rather than a direct client fetch because the access token
 * lives in an httpOnly cookie: the browser cannot read it, so it cannot
 * authenticate a call of its own. Keeping this on the server also means the
 * subscription never has to be passed through a form field as a JSON string,
 * which is the step where a half-serialised subscription most often goes wrong.
 */
export async function subscribePushAction(
  _prev: ActionResult,
  formData: FormData,
): Promise<ActionResult> {
  const token = await getAccessToken();
  if (!token) return fail("Sign in to turn on browser notifications.");

  let payload: PushSubscriptionPayload;
  try {
    payload = JSON.parse(String(formData.get("subscription") ?? "")) as PushSubscriptionPayload;
  } catch {
    return fail("The browser gave us an unreadable push subscription. Try again.");
  }
  if (!payload?.endpoint || !payload?.keys?.p256dh || !payload?.keys?.auth) {
    // Caught here rather than left to the API because a subscription without
    // both key halves parses as valid JSON and then fails on every send.
    return fail("The browser gave us an incomplete push subscription. Try again.");
  }

  try {
    await api.subscribePush(token, payload);
  } catch (error) {
    return fail(describeError(error));
  }
  return ok("Browser notifications are on for this device.");
}

/**
 * Turn push off in both places.
 *
 * The browser's `unsubscribe()` alone leaves the server holding an endpoint
 * nobody listens to, which the push service answers with a 410 on every future
 * alert. Both halves have to go, which is why this is one action rather than
 * two buttons.
 */
export async function unsubscribePushAction(previous: ActionResult): Promise<ActionResult> {
  // The argument is only there because `useActionState` requires the
  // (state, formData) shape; this action takes no form.
  void previous;
  const token = await getAccessToken();
  if (!token) return fail("Sign in to change your notification settings.");

  try {
    await api.unsubscribePush(token);
  } catch (error) {
    return fail(describeError(error));
  }
  return ok("Browser notifications are off for this device.");
}

/**
 * Whether this deployment can send push at all.
 *
 * Read on the server and handed to the client as a boolean, so the settings
 * page does not have to fetch it on the client and flash "unsupported" before
 * the real answer arrives. A failed lookup is treated as "not configured",
 * which is the safe direction: the toggle hides itself.
 */
export async function loadPushKey(): Promise<PushPublicKey> {
  try {
    return await api.getPushPublicKey();
  } catch {
    return { public_key: null, enabled: false };
  }
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

export async function loadAccount() {
  const token = await getAccessToken();
  if (!token) return null;

  try {
      const [user, stores, coupons, tracked, prefs, alerts] = await Promise.all([
      api.me(token),
      api.listSavedStores(token),
      api.listSavedCoupons(token),
      api.listTrackedProducts(token),
      api.getNotificationPreferences(token),
      api.listAlerts(token, 20),
    ]);
    return { user, stores, coupons, tracked, prefs, alerts };
  } catch {
    return null;
  }
}

export async function requireAccount() {
  const account = await loadAccount();
  if (account) return account;
  const { redirect } = await import("next/navigation");
  redirect("/account/login?next=%2Faccount");
  throw new Error("unreachable");
}