"use client";

import { cn } from "@/lib/utils";

interface FilterPillsProps {
  label: string;
  options: readonly string[];
  value: string;
  onChange: (v: string) => void;
}

/** "All" + options as a radio group of pills. */
export function FilterPills({ label, options, value, onChange }: FilterPillsProps) {
  return (
    <div role="radiogroup" aria-label={label} className="flex flex-wrap gap-2">
      {["All", ...options].map((o) => {
        const selected = o === value;
        return (
          <button
            key={o}
            type="button"
            role="radio"
            aria-checked={selected}
            onClick={() => onChange(o)}
            className={cn(
              "rounded-full border-2 border-line px-3.5 py-1.5 font-mono text-xs font-semibold uppercase tracking-wider",
              selected ? "bg-ink text-paper" : "bg-surface hover:bg-mustard hover:text-[#16130f]",
            )}
          >
            {o}
          </button>
        );
      })}
    </div>
  );
}
