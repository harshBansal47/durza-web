/** Public FastAPI base URL for requests made by the browser. */
export function getPublicApiBaseUrl(): string {
  return process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000/api/v1";
}
