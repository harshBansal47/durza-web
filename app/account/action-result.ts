import { ApiError } from "@/lib/api";

/**
 * The result contract shared by every account Server Action and the Client
 * Components that render their forms.
 *
 * Actions return a plain serialisable result rather than throwing, because a
 * thrown error in a Server Action turns into an opaque digest on the client.
 * `useActionState` in the forms reads `error`.
 *
 * This module is intentionally free of `server-only` / `next/headers` imports
 * so Client Components can pull the types and helpers without dragging the
 * action implementation into the client bundle.
 */

export interface ActionResult {
  error?: string;
  message?: string;
}

/**
 * Result of one step of "track this" for someone who may not be signed in.
 *
 * `codeSentTo` moves the flow to the code step; `tracking` means the visitor is
 * now signed in *and* tracking. `signedIn` without `tracking` is the awkward
 * middle (the code was right but saving failed): the visitor has a session and
 * only needs to press the button again.
 */
export interface TrackFlowResult extends ActionResult {
  codeSentTo?: string;
  sentAt?: number;
  tracking?: boolean;
  signedIn?: boolean;
  /** Masked, for reassurance ("we'll email a•••@gmail.com"), never the full address. */
  email?: string;
}

export function ok(message?: string): ActionResult {
  return { message };
}

export function fail(error: string): ActionResult {
  return { error };
}

/** Turns an API failure into something worth showing a person. */
export function describeError(error: unknown): string {
  if (error instanceof ApiError) {
    if (error.status === 401) return "Your session has expired. Please sign in again.";
    if (error.status === 409) return "That account already exists. Try signing in instead.";
    if (error.status === 422) return error.message;
    if (error.status >= 500) return "The service is having trouble. Please try again shortly.";
    return error.message;
  }
  return "Something went wrong. Please try again.";
}
