"use client";

import Link from "next/link";
import { createRef, forwardRef, useMemo, type RefObject } from "react";
import { m, useScroll, useTransform } from "framer-motion";
import type { Accent } from "@/lib/schemas";
import { accentClass } from "@/lib/accent";
import { useMotionPref } from "@/lib/use-motion-pref";
import { ScreenshotFrame } from "@/components/ui/screenshot-frame";
import { MonoPill } from "@/components/ui/pill";
import { cn } from "@/lib/utils";

export interface FolderItem {
  slug: string;
  title: string;
  subtitle: string;
  accent: Accent;
  outcomeHeadline: string;
  metrics: readonly { label: string; value: string }[];
  cover?: string;
  coverAlt?: string;
}

export function FolderStack({ items }: { items: readonly FolderItem[] }) {
  const refs = useMemo(() => items.map(() => createRef<HTMLDivElement>()), [items]);
  // Siblings in one tall parent: each pins at its own offset and later folders paint over earlier ones.
  return (
    <div className="pb-[6svh]">
      {items.map((item, i) => (
        <Folder key={item.slug} ref={refs[i]} item={item} index={i} total={items.length} nextRef={refs[i + 1]} last={i === items.length - 1} />
      ))}
    </div>
  );
}

interface FolderProps {
  item: FolderItem;
  index: number;
  total: number;
  last: boolean;
  nextRef?: RefObject<HTMLDivElement | null>;
}

const Folder = forwardRef<HTMLDivElement, FolderProps>(function Folder({ item, index, total, last, nextRef }, ref) {
  const { reduced } = useMotionPref();
  // 0 while the next folder is below the fold, 1 once it has slid fully over this one.
  const { scrollYProgress } = useScroll({ target: nextRef, offset: ["start end", "start 22%"] });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.94]);
  const dim = useTransform(scrollYProgress, [0, 1], [0, 0.4]);
  const active = Boolean(nextRef) && !reduced;

  return (
    <div ref={ref} className={cn("sticky", !last && "mb-[24svh]")} style={{ top: `calc(5.25rem + ${index} * 2.5rem)` }}>
      <m.article
        style={active ? { scale, transformOrigin: "50% 0%" } : undefined}
        className="relative mx-auto max-w-6xl px-3 sm:px-6"
      >
        {/* folder tab */}
        <div className={cn("ml-3 flex h-10 w-fit items-center gap-2 rounded-t-2xl border-2 border-b-0 border-line px-5 font-mono text-xs font-bold uppercase tracking-widest", accentClass[item.accent])}>
          <span>{String(index + 1).padStart(2, "0")}</span>
          <span aria-hidden>/</span>
          <span>{item.title}</span>
        </div>
        <div className={cn("relative grid gap-5 overflow-hidden rounded-3xl rounded-tl-none border-2 border-line p-5 shadow-[0_8px_0_var(--line)] sm:p-8 md:grid-cols-[1.1fr_0.9fr] md:items-center md:gap-10", accentClass[item.accent])}>
          <div className="flex flex-col gap-3 md:gap-5">
            <MonoPill className="self-start border-current">{item.subtitle}</MonoPill>
            <h3 className="font-display text-[clamp(1.6rem,4.4vw,3.4rem)] font-extrabold leading-[0.98] tracking-[-0.04em]">
              {item.outcomeHeadline}
            </h3>
            <ul className="flex flex-wrap gap-2" aria-label="Key metrics">
              {item.metrics.map((m) => (
                <li key={m.label} className="rounded-full border-2 border-current px-3 py-1 font-mono text-[0.68rem] font-semibold uppercase tracking-wider">
                  {m.label}: {m.value}
                </li>
              ))}
            </ul>
            <Link
              href={`/work/${item.slug}`}
              data-cursor="link"
              className="mt-1 w-fit font-display text-lg font-bold underline decoration-2 underline-offset-4 after:absolute after:inset-0 after:content-['']"
            >
              Open the case study <span aria-hidden>↗</span>
            </Link>
          </div>
          <ScreenshotFrame
            src={item.cover}
            alt={item.coverAlt ?? `${item.title} screenshot`}
            label={`[${item.title.toUpperCase()} SCREENSHOT]`}
            tilt={index % 2 === 0 ? 2 : -2}
            className="max-w-[16rem] sm:max-w-md"
          />
          <span className="sr-only">
            Case study {index + 1} of {total}
          </span>
          {active && (
            <m.div aria-hidden style={{ opacity: dim }} className="pointer-events-none absolute inset-0 bg-black" />
          )}
        </div>
      </m.article>
    </div>
  );
});
