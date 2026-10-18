"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { api } from "@/lib/api";

export default function SetPasswordForm() {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [status, setStatus] = useState<"idle" | "saving" | "done" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }
    setStatus("saving");
    setError(null);
    try {
      await api.setPassword(password);
      setStatus("done");
      setPassword("");
      setConfirm("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not set password.");
      setStatus("error");
    }
  }

  if (status === "done") {
    return <p className="text-sm text-verified">Password set. You can now sign in with email and password.</p>;
  }

  return (
    <form onSubmit={submit} className="space-y-3">
      <Input
        label="New password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        autoComplete="new-password"
        required
        hint="At least 8 characters"
      />
      <Input
        label="Confirm password"
        type="password"
        value={confirm}
        onChange={(e) => setConfirm(e.target.value)}
        autoComplete="new-password"
        required
      />
      {error && <p className="text-sm text-rust">{error}</p>}
      <Button type="submit" loading={status === "saving"}>
        {status === "saving" ? "Setting…" : "Set password"}
      </Button>
    </form>
  );
}
