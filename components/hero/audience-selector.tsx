"use client";

import { AnimatePresence, m } from "framer-motion";
import { audiences } from "@/config/audiences";
import { hero } from "@/content/hero";
import { useAudience } from "@/components/hero/audience-provider";
import { useMotionPref } from "@/lib/use-motion-pref";
import { cn } from "@/lib/utils";

export function AudienceSelector() {
  const { audience, select } = useAudience();
  const { reduced } = useMotionPref();

  return (
    <div className="mx-auto w-full max-w-3xl">
      <div className="flex flex-col items-center gap-3">
        <span id="audience-label" className="font-mono text-xs font-semibold uppercase tracking-[0.14em]">
          {hero.audienceLabel}
        </span>
        <div role="radiogroup" aria-labelledby="audience-label" className="flex flex-wrap justify-center gap-2">
          {audiences.map((a) => {
            const selected = a.id === audience.id;
            return (
              <button
                key={a.id}
                type="button"
                role="radio"
                aria-checked={selected}
                onClick={() => select(a.id)}
                className={cn(
                  "btn rounded-full border-2 border-line px-4 py-2 text-sm font-bold [--depth:3px]",
                  selected ? "bg-ink text-paper" : "bg-surface hover:bg-mustard hover:text-[#16130f]",
                )}
              >
                {a.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-5 min-h-[11.5rem] rounded-3xl border-2 border-line bg-surface p-5 text-left sm:p-6" aria-live="polite">
        <AnimatePresence mode="wait" initial={false}>
          <m.div
            key={audience.id}
            initial={reduced ? { opacity: 0 } : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
          >
            <p className="font-display text-xl font-extrabold tracking-tight sm:text-2xl">{audience.headline}</p>
            <p className="mt-2 text-muted">{audience.body}</p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {audience.bullets.map((b) => (
                <li key={b} className="rounded-full border-2 border-line px-3 py-1 font-mono text-[0.68rem] font-semibold uppercase tracking-wide">
                  {b}
                </li>
              ))}
            </ul>
            <a href="#contact" className="mt-4 inline-block font-bold underline decoration-2 underline-offset-4">
              {audience.cta} ↓
            </a>
          </m.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
