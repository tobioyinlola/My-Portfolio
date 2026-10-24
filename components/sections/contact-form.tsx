"use client";

import Script from "next/script";
import { useEffect, useRef, useState } from "react";
import { audiences } from "@/config/audiences";
import { site } from "@/config/site";
import { useAudience } from "@/components/hero/audience-provider";
import { Button } from "@/components/ui/button";
import type { ContactInput } from "@/lib/schemas";

type Status = "idle" | "sending" | "sent" | "error";

const reasons = [...audiences.map((a) => a.reason), "Something else"];
const turnstileKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

const field =
  "w-full rounded-2xl border-2 border-line bg-surface px-4 py-3 text-base placeholder:text-muted";

export function ContactForm() {
  const { audience } = useAudience();
  // The hero's "I'm here to…" choice pre-selects the reason until the visitor picks one themselves.
  const [picked, setPicked] = useState<string | null>(null);
  const reason = picked ?? audience.reason;
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const startedAt = useRef(0);

  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const payload: ContactInput = {
      name: String(data.get("name") ?? ""),
      email: String(data.get("email") ?? ""),
      reason: String(data.get("reason") ?? ""),
      message: String(data.get("message") ?? ""),
      website: String(data.get("website") ?? ""),
      startedAt: startedAt.current,
      turnstileToken: String(data.get("cf-turnstile-response") ?? "") || undefined,
    };
    setStatus("sending");
    setError("");
    try {
      const res = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      const body = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) throw new Error(body.error ?? "Something went wrong.");
      setStatus("sent");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div role="status" className="rounded-3xl border-2 border-line bg-forest p-8 text-cream">
        <p className="font-display text-3xl font-extrabold tracking-tight">Thanks, message received.</p>
        <p className="mt-2">I&apos;ll reply by email as soon as I can.</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4 rounded-3xl border-2 border-line bg-surface p-5 sm:p-8" noValidate={false}>
      <h3 className="font-display text-2xl font-extrabold tracking-tight">Or send a note</h3>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-1.5">
          <span className="font-mono text-xs font-semibold uppercase tracking-wider">Name</span>
          <input name="name" required maxLength={120} autoComplete="name" className={field} />
        </label>
        <label className="flex flex-col gap-1.5">
          <span className="font-mono text-xs font-semibold uppercase tracking-wider">Email</span>
          <input name="email" type="email" required maxLength={200} autoComplete="email" className={field} />
        </label>
      </div>
      <label className="flex flex-col gap-1.5">
        <span className="font-mono text-xs font-semibold uppercase tracking-wider">Reason</span>
        <select name="reason" value={reason} onChange={(e) => setPicked(e.target.value)} className={field}>
          {reasons.map((r) => (
            <option key={r}>{r}</option>
          ))}
        </select>
      </label>
      <label className="flex flex-col gap-1.5">
        <span className="font-mono text-xs font-semibold uppercase tracking-wider">Message</span>
        <textarea name="message" required minLength={10} maxLength={4000} rows={5} className={field} />
      </label>

      {/* Honeypot: hidden from people and assistive tech. */}
      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Leave this empty
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      {turnstileKey && (
        <>
          <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js" strategy="lazyOnload" />
          <div className="cf-turnstile" data-sitekey={turnstileKey} />
        </>
      )}

      <div className="flex flex-wrap items-center gap-4">
        <Button type="submit" variant="cobalt" disabled={status === "sending"}>
          {status === "sending" ? "Sending…" : "Send message"}
        </Button>
        {status === "error" && (
          <p role="alert" className="text-sm font-semibold text-terracotta">
            {error} You can also email{" "}
            <a className="underline" href={`mailto:${site.email}`}>
              {site.email}
            </a>
            .
          </p>
        )}
      </div>
    </form>
  );
}
