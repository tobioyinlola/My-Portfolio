"use client";

import Link from "next/link";
import { createRef, forwardRef, useMemo, type RefObject } from "react";
import { m, useScroll, useTransform } from "framer-motion";
import type { BuiltProject } from "@/content/built";
import { accentClass } from "@/lib/accent";
import { useMotionPref } from "@/lib/use-motion-pref";
import { ArchDiagram } from "@/components/ui/arch-diagram";
import { MonoPill } from "@/components/ui/pill";
import { cn } from "@/lib/utils";

/** Platform cards that pin and overlay one another as you scroll, like Selected work. */
export function BuiltStack({ projects }: { projects: readonly BuiltProject[] }) {
  const refs = useMemo(() => projects.map(() => createRef<HTMLDivElement>()), [projects]);
  return (
    <div className="pb-[6svh]">
      {projects.map((p, i) => (
        <Card key={p.slug} ref={refs[i]} project={p} index={i} total={projects.length} nextRef={refs[i + 1]} last={i === projects.length - 1} />
      ))}
    </div>
  );
}

interface CardProps {
  project: BuiltProject;
  index: number;
  total: number;
  last: boolean;
  nextRef?: RefObject<HTMLDivElement | null>;
}

const Card = forwardRef<HTMLDivElement, CardProps>(function Card({ project: p, index, total, last, nextRef }, ref) {
  const { reduced } = useMotionPref();
  // 0 while the next card is below the fold, 1 once it has slid fully over this one.
  const { scrollYProgress } = useScroll({ target: nextRef, offset: ["start end", "start 22%"] });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);
  const dim = useTransform(scrollYProgress, [0, 1], [0, 0.4]);
  const active = Boolean(nextRef) && !reduced;

  return (
    // Pinning only from md up: on a phone the card is taller than the screen, so it scrolls normally.
    <div ref={ref} className={cn("md:sticky", !last && "mb-8 md:mb-[22svh]")} style={{ top: `calc(5.25rem + ${index} * 2.5rem)` }}>
      <m.article style={active ? { scale, transformOrigin: "50% 0%" } : undefined} className="relative mx-auto max-w-6xl">
        <div className={cn("ml-3 flex h-10 w-fit items-center gap-2 rounded-t-2xl border-2 border-b-0 border-line px-5 font-mono text-xs font-bold uppercase tracking-widest", accentClass[p.accent])}>
          <span>{String(index + 1).padStart(2, "0")}</span>
          <span aria-hidden>/</span>
          <span>{p.name}</span>
        </div>
        <div className="relative overflow-hidden rounded-3xl rounded-tl-none border-2 border-line bg-surface shadow-[0_8px_0_var(--line)]">
          <header className={cn("flex flex-wrap items-center justify-between gap-3 border-b-2 border-line px-5 py-4 sm:px-8", accentClass[p.accent])}>
            <h3 className="font-display text-xl font-extrabold tracking-tight sm:text-2xl">
              {p.name} <span className="font-medium">· {p.tagline}</span>
            </h3>
            <MonoPill className="border-current">{p.status}</MonoPill>
          </header>
          <div className="grid gap-6 p-5 sm:p-8 lg:grid-cols-[1.15fr_1fr] lg:gap-10">
            <ArchDiagram project={p} />
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1">
              <Block title="Stack" items={p.stack} />
              <Block title="Deployment" items={p.deployment} />
              <div className="sm:col-span-2 lg:col-span-1">
                <Block title="Notes" items={p.notes} />
              </div>
            </div>
          </div>
          <div className="px-5 pb-6 sm:px-8">
            <Link href={`/work/${p.caseStudy}`} data-cursor="link" className="font-display text-lg font-bold underline decoration-2 underline-offset-4 after:absolute after:inset-0 after:content-['']">
              Read the {p.name} case study <span aria-hidden>↗</span>
            </Link>
          </div>
          <span className="sr-only">
            Platform {index + 1} of {total}
          </span>
          {active && <m.div aria-hidden style={{ opacity: dim }} className="pointer-events-none absolute inset-0 bg-black" />}
        </div>
      </m.article>
    </div>
  );
});

function Block({ title, items }: { title: string; items: readonly string[] }) {
  return (
    <div>
      <h4 className="mb-1.5 font-mono text-xs font-semibold uppercase tracking-widest">{title}</h4>
      <ul className="space-y-1 text-sm leading-snug text-muted">
        {items.map((i) => (
          <li key={i}>{i}</li>
        ))}
      </ul>
    </div>
  );
}
