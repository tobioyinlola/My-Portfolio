"use client";

import { m } from "framer-motion";
import { experience } from "@/content/experience";
import { accentClass } from "@/lib/accent";
import { useMotionPref } from "@/lib/use-motion-pref";
import { Highlight } from "@/components/ui/pill";
import { SectionTitle } from "@/components/ui/section-title";
import { cn } from "@/lib/utils";

const offsets = ["sm:ml-0", "sm:ml-12", "sm:ml-4", "sm:ml-16"] as const;

export function ExperienceSection() {
  const { reduced } = useMotionPref();
  const n = experience.length;

  return (
    <section id="experience" aria-labelledby="experience-title" className="px-4 pt-24 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <SectionTitle id="experience-title" icon="briefcase" kicker="About · Experience" intro="5+ years, built up brick by brick.">
          <Highlight>Experience</Highlight>
        </SectionTitle>
        <ol className="mx-auto flex max-w-3xl flex-col gap-2">
          {experience.map((e, i) => (
            <m.li
              key={`${e.company}-${i}`}
              initial={reduced ? { opacity: 0 } : { opacity: 0, y: -70, rotate: i % 2 ? 3 : -3 }}
              whileInView={{ opacity: 1, y: 0, rotate: 0 }}
              viewport={{ once: true, margin: "0px 0px -12% 0px" }}
              // bottom brick lands first
              transition={reduced ? { duration: 0.3 } : { type: "spring", stiffness: 180, damping: 16, delay: (n - 1 - i) * 0.12 }}
              className={cn(
                "flex flex-col justify-between gap-1 rounded-2xl border-2 border-line px-6 py-5 shadow-[0_5px_0_var(--line)] sm:flex-row sm:items-center sm:gap-6",
                accentClass[e.accent],
                offsets[i % offsets.length],
              )}
            >
              <span className="font-display text-2xl font-extrabold tracking-tight sm:text-3xl">{e.company}</span>
              <span className="flex flex-col font-mono text-xs font-semibold uppercase tracking-wider sm:items-end">
                <span>{e.years}</span>
                <span>{e.role}</span>
              </span>
            </m.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
