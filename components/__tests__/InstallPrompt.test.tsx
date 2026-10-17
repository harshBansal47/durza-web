import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it } from "vitest";
import InstallPrompt from "@/components/InstallPrompt";

const ANSWERED_KEY = "durza.install-prompt.answered";

type PromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
};

function makePromptEvent(outcome: "accepted" | "dismissed" = "dismissed"): PromptEvent {
  const event = new Event("beforeinstallprompt") as PromptEvent;
  event.prompt = () => Promise.resolve();
  Object.defineProperty(event, "userChoice", { value: Promise.resolve({ outcome }) });
  return event;
}

function setDevice(touchPoints: number, width: number) {
  Object.defineProperty(navigator, "maxTouchPoints", { value: touchPoints, configurable: true });
  Object.defineProperty(window, "innerWidth", { value: width, configurable: true, writable: true });
}

async function firePrompt(outcome: "accepted" | "dismissed" = "dismissed") {
  await act(async () => {
    window.dispatchEvent(makePromptEvent(outcome));
  });
}

describe("InstallPrompt", () => {
  beforeEach(() => {
    window.localStorage.clear();
    setDevice(0, 1280);
  });

  it("never appears on a desktop — no touch points, desktop width", async () => {
    render(<InstallPrompt />);
    await firePrompt();
    expect(screen.queryByText("Install Durza")).not.toBeInTheDocument();
  });

  it("stays hidden in a narrow desktop window too — a small window is not a tablet", async () => {
    setDevice(0, 500);
    render(<InstallPrompt />);
    await firePrompt();
    expect(screen.queryByText("Install Durza")).not.toBeInTheDocument();
  });

  it("appears on a phone-sized touch device", async () => {
    setDevice(5, 390);
    render(<InstallPrompt />);
    await firePrompt();
    expect(screen.getByText("Install Durza")).toBeInTheDocument();
  });

  it("appears on a tablet", async () => {
    setDevice(5, 1024);
    render(<InstallPrompt />);
    await firePrompt();
    expect(screen.getByText("Install Durza")).toBeInTheDocument();
  });

  it("does not appear at all once the visitor has answered", async () => {
    window.localStorage.setItem(ANSWERED_KEY, "1");
    setDevice(5, 390);
    render(<InstallPrompt />);
    await firePrompt();
    expect(screen.queryByText("Install Durza")).not.toBeInTheDocument();
  });

  it("stays away on the next page after 'Not now' — the answer is remembered", async () => {
    setDevice(5, 390);
    const first = render(<InstallPrompt />);
    await firePrompt();
    await userEvent.click(screen.getByRole("button", { name: "Not now" }));
    expect(screen.queryByText("Install Durza")).not.toBeInTheDocument();
    expect(window.localStorage.getItem(ANSWERED_KEY)).toBe("1");

    first.unmount();
    render(<InstallPrompt />);
    await firePrompt();
    expect(screen.queryByText("Install Durza")).not.toBeInTheDocument();
  });

  it("treats cancelling the native install dialog as an answer too", async () => {
    setDevice(5, 390);
    render(<InstallPrompt />);
    await firePrompt("dismissed");

    await userEvent.click(screen.getByRole("button", { name: "Install" }));
    expect(screen.queryByText("Install Durza")).not.toBeInTheDocument();
    expect(window.localStorage.getItem(ANSWERED_KEY)).toBe("1");
  });

  it("hides when the window grows past tablet width", async () => {
    setDevice(5, 390);
    render(<InstallPrompt />);
    await firePrompt();
    expect(screen.getByText("Install Durza")).toBeInTheDocument();

    await act(async () => {
      window.innerWidth = 1440;
      window.dispatchEvent(new Event("resize"));
    });
    expect(screen.queryByText("Install Durza")).not.toBeInTheDocument();
  });
});
