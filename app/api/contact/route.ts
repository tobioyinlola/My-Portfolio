import { NextResponse } from "next/server";
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

  const { RESEND_API_KEY, CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL } = process.env;
  if (!RESEND_API_KEY || !CONTACT_TO_EMAIL || !CONTACT_FROM_EMAIL) {
    console.warn("[contact] RESEND_API_KEY / CONTACT_TO_EMAIL / CONTACT_FROM_EMAIL not set; message not delivered");
    return NextResponse.json({ error: "The form isn't connected yet." }, { status: 503 });
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${RESEND_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: CONTACT_FROM_EMAIL,
      to: CONTACT_TO_EMAIL,
      reply_to: message.email,
      subject: `[Portfolio] ${message.reason} — ${message.name}`,
      text: `${message.message}\n\n— ${message.name} <${message.email}>\nReason: ${message.reason}`,
    }),
  });
  if (!res.ok) return NextResponse.json({ error: "Couldn't send your message." }, { status: 502 });
  return NextResponse.json({ ok: true });
}
