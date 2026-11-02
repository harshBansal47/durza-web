/** Shared error shape for native fetch and Axios API requests. */
export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    options?: ErrorOptions,
  ) {
    super(message, options);
    this.name = "ApiError";
  }
}

export function apiErrorMessage(body: unknown, fallback: string): string {
  if (typeof body === "string") {
    try {
      return apiErrorMessage(JSON.parse(body), fallback);
    } catch {
      return body.slice(0, 300) || fallback;
    }
  }
  if (!body || typeof body !== "object") return fallback;

  const payload = body as { detail?: unknown; error?: unknown };
  const detail = payload.detail;
  if (typeof detail === "string") return detail;
  if (typeof payload.error === "string") return payload.error;
  if (Array.isArray(detail) && detail.length > 0) {
    const first = detail[0] as { msg?: unknown };
    if (typeof first?.msg === "string") return first.msg;
  }
  return fallback;
}
