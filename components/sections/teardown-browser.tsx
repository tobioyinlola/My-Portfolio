"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { Accent } from "@/lib/schemas";
import { accentClass } from "@/lib/accent";
import { FilterPills } from "@/components/sections/filter-pills";
import { MonoPill } from "@/components/ui/pill";
import { cn } from "@/lib/utils";

export interface TeardownCardData {
  slug: string;
  title: string;
  product: string;
  industry: string;
  summary: string;
  accent: Accent;
  hasPrototype: boolean;
}

export function TeardownBrowser({ items, limit, headingAs: Heading = "h3" }: { items: readonly TeardownCardData[]; limit?: number; headingAs?: "h2" | "h3" }) {
  const [industry, setIndustry] = useState("All");
  const industries = useMemo(() => [...new Set(items.map((i) => i.industry))], [items]);
  const shown = items.filter((i) => industry === "All" || i.industry === industry).slice(0, limit);

  return (
    <div>
      <FilterPills label="Filter teardowns by industry" options={industries} value={industry} onChange={setIndustry} />
      <ul className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((t) => (
          <li key={t.slug} className="relative">
            <article className={cn("group flex h-full flex-col gap-3 rounded-3xl border-2 border-line p-5 shadow-[0_6px_0_var(--line)] transition-transform hover:-translate-y-1", accentClass[t.accent])}>
              <div className="flex flex-wrap gap-2">
                <MonoPill className="border-current">{t.industry}</MonoPill>
                {t.hasPrototype && <MonoPill className="border-current">Prototype</MonoPill>}
              </div>
              <Heading className="font-display text-2xl font-extrabold leading-tight tracking-tight">
                <Link href={`/teardowns/${t.slug}`} className="after:absolute after:inset-0 after:content-['']">
                  {t.title}
                </Link>
              </Heading>
              <p className="text-[0.95rem]">{t.summary}</p>
              <span className="mt-auto font-display font-bold underline decoration-2 underline-offset-4">Read the teardown ↗</span>
            </article>
          </li>
        ))}
      </ul>
      {shown.length === 0 && <p className="mt-6 text-muted">No teardowns in this industry yet.</p>}
    </div>
  );
}
