"use client";

import { m, type Variants } from "framer-motion";
import { hero } from "@/content/hero";
import { useMotionPref } from "@/lib/use-motion-pref";
import { cn } from "@/lib/utils";

const palette = [
  "bg-cobalt text-cream",
  "bg-mustard text-[#16130f]",
  "bg-terracotta text-cream",
  "bg-forest text-cream",
  "bg-lilac text-[#16130f]",
  "bg-ink text-paper",
  "bg-cream text-[#16130f]",
] as const;
const tilts = [-2.2, 1.6, -1, 2.4, -1.8, 1.2, -2.6] as const;

export function StampedHeadline() {
  const { reduced } = useMotionPref();

  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: reduced ? 0.03 : 0.07, delayChildren: 0.1 } },
  };
  const word: Variants = reduced
    ? { hidden: { opacity: 0 }, show: { opacity: 1 } }
    : {
        // opacity stays 1 so the server-rendered headline is visible (and measurable as LCP) before hydration
        hidden: { y: 48, rotate: -8, scale: 0.9 },
        show: (i: number) => ({
          y: 0,
          scale: 1,
          rotate: tilts[i % tilts.length] ?? 0,
          transition: { type: "spring", stiffness: 240, damping: 15 },
        }),
      };

  let index = 0;
  return (
    <m.h1
      variants={container}
      initial="hidden"
      animate="show"
      aria-label={hero.lines.map((l) => l.join(" ")).join(" ")}
      className="flex flex-col items-center gap-2 font-display text-[clamp(2.5rem,9.6vw,7.6rem)] font-extrabold leading-none tracking-[-0.055em] sm:gap-3"
    >
      {hero.lines.map((line, li) => (
        <span key={li} aria-hidden className="flex flex-wrap items-center justify-center gap-x-[0.18em] gap-y-2">
          {line.map((w) => {
            const i = index++;
            return (
              <m.span
                key={`${li}-${w}-${i}`}
                custom={i}
                variants={word}
                className="relative inline-block"
              >
                {/* hard offset shadow: a second notched shape underneath (clip-path would clip a box-shadow) */}
                <span aria-hidden className="stamp absolute inset-0 translate-x-[0.04em] translate-y-[0.06em] bg-line" />
                <span className={cn("stamp relative inline-block px-[0.2em] pb-[0.06em] pt-[0.02em]", palette[i % palette.length])}>
                  {w}
                </span>
              </m.span>
            );
          })}
        </span>
      ))}
    </m.h1>
  );
}
