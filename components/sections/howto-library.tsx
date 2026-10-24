"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { Accent } from "@/lib/schemas";
import { howToTags } from "@/lib/taxonomy";
import { accentClass } from "@/lib/accent";
import { FilterPills } from "@/components/sections/filter-pills";
import { MonoPill } from "@/components/ui/pill";
import { cn } from "@/lib/utils";

export interface HowToCardData {
  slug: string;
  title: string;
  excerpt: string;
  tags: readonly string[];
  minutes: number;
  accent: Accent;
}

export function HowToLibrary({ items, limit, headingAs: Heading = "h3" }: { items: readonly HowToCardData[]; limit?: number; headingAs?: "h2" | "h3" }) {
  const [tag, setTag] = useState("All");
  const [query, setQuery] = useState("");

  const shown = useMemo(() => {
    const q = query.trim().toLowerCase();
    return items
      .filter((i) => tag === "All" || i.tags.includes(tag))
      .filter((i) => !q || `${i.title} ${i.excerpt} ${i.tags.join(" ")}`.toLowerCase().includes(q))
      .slice(0, limit);
  }, [items, tag, query, limit]);

  return (
    <div>
      <div className="flex flex-col gap-4">
        <label className="block">
          <span className="sr-only">Search how-tos</span>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search how-tos…"
            className="h-12 w-full max-w-md rounded-full border-2 border-line bg-surface px-5 text-base placeholder:text-muted"
          />
        </label>
        <FilterPills label="Filter how-tos by tag" options={howToTags} value={tag} onChange={setTag} />
      </div>
      <p className="sr-only" aria-live="polite">
        {shown.length} how-to{shown.length === 1 ? "" : "s"} shown
      </p>
      <ul className="mt-6 grid gap-4 md:grid-cols-2">
        {shown.map((h) => (
          <li key={h.slug} className="relative">
            <article className="flex h-full gap-4 rounded-3xl border-2 border-line bg-surface p-5 transition-transform hover:-translate-y-1">
              <span aria-hidden className={cn("mt-1 hidden h-14 w-3 shrink-0 rounded-full sm:block", accentClass[h.accent])} />
              <div className="flex flex-col gap-2">
                <div className="flex flex-wrap items-center gap-2">
                  {h.tags.map((t) => (
                    <MonoPill key={t}>{t}</MonoPill>
                  ))}
                  <span className="font-mono text-[0.68rem] font-semibold uppercase tracking-wider text-muted">{h.minutes} min read</span>
                </div>
                <Heading className="font-display text-xl font-extrabold leading-tight tracking-tight">
                  <Link href={`/writing/${h.slug}`} className="after:absolute after:inset-0 after:content-['']">
                    {h.title}
                  </Link>
                </Heading>
                <p className="text-muted">{h.excerpt}</p>
              </div>
            </article>
          </li>
        ))}
      </ul>
      {shown.length === 0 && <p className="mt-6 text-muted">Nothing matches. Try another tag or search term.</p>}
    </div>
  );
}
