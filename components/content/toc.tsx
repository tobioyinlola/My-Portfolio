"use client";

import { useEffect, useState } from "react";
import type { TocItem } from "@/lib/content";
import { cn } from "@/lib/utils";

export function Toc({ items }: { items: readonly TocItem[] }) {
  const [active, setActive] = useState(items[0]?.id ?? "");

  useEffect(() => {
    const els = items.map((i) => document.getElementById(i.id)).filter((e): e is HTMLElement => Boolean(e));
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-90px 0px -65% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [items]);

  const list = (
    <ol className="space-y-1">
      {items.map((i, n) => (
        <li key={i.id}>
          <a
            href={`#${i.id}`}
            aria-current={active === i.id ? "location" : undefined}
            className={cn("flex gap-2 rounded-lg px-2 py-1.5 text-sm hover:bg-mustard hover:text-[#16130f]", active === i.id && "bg-ink font-semibold text-paper")}
          >
            <span className="font-mono text-xs opacity-70">{String(n + 1).padStart(2, "0")}</span>
            {i.title}
          </a>
        </li>
      ))}
    </ol>
  );

  return (
    <>
      <details className="mb-8 rounded-2xl border-2 border-line bg-surface p-3 lg:hidden">
        <summary className="cursor-pointer font-mono text-xs font-semibold uppercase tracking-widest">On this page</summary>
        <nav aria-label="Table of contents" className="mt-2">
          {list}
        </nav>
      </details>
      <nav aria-label="Table of contents" className="sticky top-28 hidden self-start lg:block">
        <p className="mb-2 px-2 font-mono text-xs font-semibold uppercase tracking-widest text-muted">On this page</p>
        {list}
      </nav>
    </>
  );
}
