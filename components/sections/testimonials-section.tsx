"use client";

import { m, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useRef } from "react";
import { testimonials, type Testimonial } from "@/content/testimonials";
import { accentOrder, accentClass } from "@/lib/accent";
import { useMotionPref } from "@/lib/use-motion-pref";
import { Highlight } from "@/components/ui/pill";
import { SectionTitle } from "@/components/ui/section-title";
import { cn } from "@/lib/utils";

const tilts = [-4, 3, -2] as const;

function Note({ t, i, className }: { t: Testimonial; i: number; className?: string }) {
  const accent = accentOrder[(i + 1) % accentOrder.length] ?? "mustard";
  return (
    <figure className={cn("relative rounded-md border-2 border-line p-6 shadow-[0_6px_0_var(--line)]", accentClass[accent], className)}>
      <span aria-hidden className="absolute -top-3 left-1/2 h-6 w-20 -translate-x-1/2 -rotate-2 bg-cream/80 shadow-sm" />
      <blockquote className="font-display text-xl font-bold leading-snug tracking-tight">“{t.quote}”</blockquote>
      <figcaption className="mt-4 font-mono text-xs font-semibold uppercase tracking-wider">
        {t.name} · {t.role}
      </figcaption>
    </figure>
  );
}

function FanCard({ t, i, progress, reduced }: { t: Testimonial; i: number; progress: MotionValue<number>; reduced: boolean }) {
  const mid = (testimonials.length - 1) / 2;
  const spread = i - mid;
  const x = useTransform(progress, [0, 0.55], ["0%", `${spread * 108}%`]);
  const y = useTransform(progress, [0, 0.55], [i * 14, Math.abs(spread) * 24]);
  const rotate = useTransform(progress, [0, 0.55], [(i - mid) * 2, tilts[i % tilts.length] ?? 0]);
  return (
    <m.div
      style={
        reduced
          ? { x: `${spread * 108}%`, y: Math.abs(spread) * 24, rotate: tilts[i % tilts.length] ?? 0, zIndex: i }
          : { x, y, rotate, zIndex: i }
      }
      className="absolute left-1/2 top-1/2 w-[min(26rem,30vw)] min-w-[17rem] -translate-x-1/2 -translate-y-1/2"
    >
      <Note t={t} i={i} />
    </m.div>
  );
}

export function TestimonialsSection() {
  const { reduced } = useMotionPref();
  const track = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: track, offset: ["start start", "end end"] });

  return (
    <section id="word-of-mouth" aria-labelledby="wom-title" className="px-4 pt-24 sm:px-6">
      {/* Small screens: plain tilted notes. */}
      <div className="md:hidden">
        <div className="mx-auto max-w-6xl">
          <SectionTitle id="wom-title" icon="chat" kicker="Kind words">
            Word of <Highlight>mouth</Highlight>
          </SectionTitle>
        </div>
        <ul className="mx-auto flex max-w-md flex-col gap-8 pb-8">
          {testimonials.map((t, i) => (
            <li key={i} style={{ transform: `rotate(${tilts[i % tilts.length] ?? 0}deg)` }}>
              <Note t={t} i={i} />
            </li>
          ))}
        </ul>
      </div>

      {/* md+: notes start stacked, then fan out as you scroll through the track. */}
      <div ref={track} className="relative hidden h-[220svh] md:block">
        <div className="sticky top-0 flex h-svh flex-col overflow-hidden pt-24">
          <div className="mx-auto w-full max-w-6xl">
            <SectionTitle icon="chat" kicker="Kind words">
              Word of <Highlight>mouth</Highlight>
            </SectionTitle>
          </div>
          <div className="relative mx-auto w-full max-w-6xl flex-1" role="list" aria-label="Testimonials">
            {testimonials.map((t, i) => (
              <div key={i} role="listitem">
                <FanCard t={t} i={i} progress={scrollYProgress} reduced={reduced} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
