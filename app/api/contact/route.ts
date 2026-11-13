import { NextResponse } from "next/server";
import { site } from "@/config/site";
import { contactSchema } from "@/lib/schemas";

const MIN_FILL_MS = 3000;
const WINDOW_MS = 10 * 60_000;
const MAX_PER_WINDOW = 5;
// Best-effort, per-instance limiter. Use an edge/KV limiter if abuse becomes real.
const hits = new Map<string, number[]>();

function limited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > MAX_PER_WINDOW;
}

async function passesTurnstile(token: string | undefined, ip: string): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return true; // not configured: honeypot + time-trap only
  if (!token) return false;
  const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    body: new URLSearchParams({ secret, response: token, remoteip: ip }),
  });
  const json = (await res.json()) as { success?: boolean };
  return json.success === true;
}

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (limited(ip)) return NextResponse.json({ error: "Too many messages. Please try again later." }, { status: 429 });

  const parsed = contactSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "Invalid submission." }, { status: 400 });
  }
  const { website, startedAt, turnstileToken, ...message } = parsed.data;

  // Bots: filled honeypot or instant submit. Pretend success so they learn nothing.
  if (website || Date.now() - startedAt < MIN_FILL_MS) return NextResponse.json({ ok: true });
  if (!(await passesTurnstile(turnstileToken, ip))) {
    return NextResponse.json({ error: "Spam check failed. Please try again." }, { status: 400 });
  }

  // Delivery via FormSubmit (formsubmit.co): no account or API key. The first message ever sent triggers a one-time
  // activation email to the recipient; after that every submission is forwarded straight to the inbox.
  const to = process.env.CONTACT_TO_EMAIL || site.email;
  const origin = request.headers.get("origin") ?? site.url;
  const res = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(to)}`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json", Origin: origin, Referer: origin },
    body: JSON.stringify({
      _subject: `[Portfolio] ${message.reason} — ${message.name}`,
      _replyto: message.email,
      _template: "table",
      _captcha: "false",
      Name: message.name,
      Email: message.email,
      Reason: message.reason,
      Message: message.message,
    }),
  }).catch(() => null);
  const body = (await res?.json().catch(() => null)) as { success?: boolean | string; message?: string } | null;
  const delivered = res?.ok === true && (body?.success === true || body?.success === "true");
  if (!delivered) {
    console.error("[contact] FormSubmit did not deliver the message", res?.status, body?.message);
    return NextResponse.json({ error: `Couldn't send your message. Please email ${site.email} directly.` }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}
