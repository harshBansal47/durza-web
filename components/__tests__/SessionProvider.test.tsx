import { render, screen, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { SessionProvider, useSession } from "@/components/session/SessionProvider";

let pathname = "/";

vi.mock("next/navigation", () => ({
  usePathname: () => pathname,
}));

function Probe() {
  const { session } = useSession();
  return (
    <span data-testid="state">
      {session.status}:{session.user?.name ?? "-"}
    </span>
  );
}

function stubSession(body: unknown) {
  const fetchMock = vi.fn().mockResolvedValue({ ok: true, json: async () => body });
  vi.stubGlobal("fetch", fetchMock);
  return fetchMock;
}

afterEach(() => {
  pathname = "/";
  vi.unstubAllGlobals();
});

describe("SessionProvider", () => {
  it("resolves the signed-in visitor from /api/session", async () => {
    const fetchMock = stubSession({
      signedIn: true,
      user: { name: "Ada", avatarUrl: null },
    });

    render(
      <SessionProvider>
        <Probe />
      </SessionProvider>,
    );

    await waitFor(() =>
      expect(screen.getByTestId("state")).toHaveTextContent("authenticated:Ada"),
    );
    expect(fetchMock).toHaveBeenCalledWith(
      "/api/session",
      expect.objectContaining({ cache: "no-store" }),
    );
  });

  it("reads as signed out when the endpoint is unreachable", async () => {
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("offline")));

    render(
      <SessionProvider>
        <Probe />
      </SessionProvider>,
    );

    await waitFor(() =>
      expect(screen.getByTestId("state")).toHaveTextContent("anonymous:-"),
    );
  });

  it("re-checks the session after leaving an auth route", async () => {
    pathname = "/account/login";
    const fetchMock = stubSession({
      signedIn: true,
      user: { name: "Ada", avatarUrl: null },
    });

    const { rerender } = render(
      <SessionProvider>
        <Probe />
      </SessionProvider>,
    );
    await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(1));

    // A sign-in redirect is a soft navigation: same provider instance, new route.
    pathname = "/account";
    rerender(
      <SessionProvider>
        <Probe />
      </SessionProvider>,
    );

    await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(2));
  });

  it("does not fetch when the state is pinned by a test", () => {
    const fetchMock = stubSession({ signedIn: true, user: { name: "Ada" } });

    render(
      <SessionProvider initial={{ status: "anonymous", user: null }}>
        <Probe />
      </SessionProvider>,
    );

    expect(fetchMock).not.toHaveBeenCalled();
    expect(screen.getByTestId("state")).toHaveTextContent("anonymous:-");
  });
});
