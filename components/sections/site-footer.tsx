import Link from "next/link";
import { site } from "@/config/site";
import { BookButton } from "@/components/booking/book-button";
import { BookingEmbed } from "@/components/booking/booking-embed";
import { Button } from "@/components/ui/button";
import { PixelIcon } from "@/components/ui/pixel-icons";
import { ContactForm } from "@/components/sections/contact-form";
import { cn } from "@/lib/utils";

interface Sign {
  label: string;
  href: string;
  color: string;
  tilt: number;
  side: "left" | "right";
  external?: boolean;
}

const signs: readonly Sign[] = [
  { label: "Work", href: "/#work", color: "bg-cobalt text-cream", tilt: -4, side: "right" },
  { label: "Videos", href: "/videos", color: "bg-mustard text-[#16130f]", tilt: 3, side: "left" },
  { label: "Writing", href: "/writing", color: "bg-terracotta text-cream", tilt: -2, side: "right" },
  { label: "Resume", href: site.links.resume, color: "bg-forest text-cream", tilt: 4, side: "left", external: true },
  { label: "LinkedIn", href: site.links.linkedin, color: "bg-lilac text-[#16130f]", tilt: -3, side: "right", external: true },
  { label: "X", href: site.links.x, color: "bg-cream text-[#16130f]", tilt: 2, side: "left", external: true },
  { label: "YouTube", href: site.links.youtube, color: "bg-cobalt text-cream", tilt: -2, side: "right", external: true },
];

const clouds = [
  { top: "6%", dur: 70, delay: -10, size: 150 },
  { top: "22%", dur: 95, delay: -55, size: 110 },
  { top: "40%", dur: 80, delay: -30, size: 190 },
] as const;

function Bubble({ className, pattern, tail, tailColor, children }: { className?: string; pattern: string; tail: "left" | "right"; tailColor: string; children: React.ReactNode }) {
  return (
    <div className={cn("relative rounded-3xl border-2 border-line p-5 text-[#16130f] shadow-[0_6px_0_var(--line)]", pattern, className)}>
      <span
        aria-hidden
        className={cn(
          "absolute top-1/2 hidden size-5 -translate-y-1/2 rotate-45 border-2 border-line lg:block",
          tailColor,
          tail === "right" ? "-right-[11px] border-b-0 border-l-0" : "-left-[11px] border-r-0 border-t-0",
        )}
      />
      <p className="font-display text-xl font-extrabold leading-snug tracking-tight sm:text-2xl">{children}</p>
    </div>
  );
}

export function SiteFooter() {
  return (
    <footer id="contact" aria-labelledby="contact-title" className="relative mt-24 overflow-hidden border-t-2 border-line px-4 pb-16 pt-20 sm:px-6">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-[28rem]">
        {clouds.map((c, i) => (
          <div key={i} className="absolute left-0" style={{ top: c.top, animation: `drift ${c.dur}s linear ${c.delay}s infinite` }}>
            <PixelIcon name="cloud" fill="var(--cream)" size={c.size} />
          </div>
        ))}
      </div>

      <div className="relative mx-auto max-w-6xl">
        <h2 id="contact-title" className="sr-only">
          Contact
        </h2>

        <div className="grid items-center gap-8 lg:grid-cols-[1fr_auto_1fr]">
          <Bubble pattern="bg-lilac pattern-dots" tail="right" tailColor="bg-lilac" className="lg:-rotate-2">
            Got something you want built properly?
          </Bubble>

          <nav aria-label="Site links" className="relative mx-auto w-64 py-2">
            <span aria-hidden className="absolute inset-y-0 left-1/2 w-5 -translate-x-1/2 rounded-sm border-2 border-line bg-[#a9743f]" />
            <ul className="relative flex flex-col gap-3">
              {signs.map((s) => {
                const cls = cn(
                  "stamp relative block px-5 py-2.5 text-center font-display text-lg font-extrabold tracking-tight hover:brightness-110",
                  s.color,
                  s.side === "left" ? "mr-8" : "ml-8",
                );
                return (
                  <li key={s.label} style={{ transform: `rotate(${s.tilt}deg)` }} className="relative">
                    <span aria-hidden className={cn("stamp absolute inset-0 translate-x-[3px] translate-y-1 bg-line", s.side === "left" ? "mr-8" : "ml-8")} />
                    {s.external ? (
                      <a href={s.href} className={cls} target={s.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer">
                        {s.label} <span aria-hidden>{s.side === "left" ? "←" : "→"}</span>
                      </a>
                    ) : (
                      <Link href={s.href} className={cls}>
                        {s.label} <span aria-hidden>{s.side === "left" ? "←" : "→"}</span>
                      </Link>
                    )}
                  </li>
                );
              })}
            </ul>
          </nav>

          <Bubble pattern="bg-mustard pattern-stripes" tail="left" tailColor="bg-mustard" className="lg:rotate-2">
            Hiring for an AI/product role? Need a PM or a product built? Let&apos;s talk.
          </Bubble>
        </div>

        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <BookButton size="lg" variant="cobalt" magnetic />
          <Button href={`mailto:${site.email}`} size="lg" variant="cream" magnetic>
            Email me
          </Button>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          <BookingEmbed />
          <ContactForm />
        </div>

        <p className="mt-12 text-center font-mono text-xs font-semibold uppercase tracking-widest text-muted">
          © {new Date().getFullYear()} {site.fullName} · Built with Next.js
        </p>
      </div>
    </footer>
  );
}
