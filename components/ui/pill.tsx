import { cn } from "@/lib/utils";

/** Small uppercase mono pill: tags, counters, metrics. */
export function MonoPill({
  children,
  className,
  tone = "outline",
}: {
  children: React.ReactNode;
  className?: string;
  tone?: "outline" | "solid" | "yellow";
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border-2 border-line px-3 py-1 font-mono text-[0.68rem] font-semibold uppercase tracking-[0.08em]",
        tone === "solid" && "bg-ink text-paper",
        tone === "yellow" && "bg-mustard text-[#16130f]",
        tone === "outline" && "bg-transparent",
        className,
      )}
    >
      {children}
    </span>
  );
}

/** Highlights one word of a heading in a yellow pill. */
export function Highlight({ children }: { children: React.ReactNode }) {
  return (
    <span className="mx-[0.06em] inline-block -rotate-1 rounded-full bg-mustard px-[0.3em] text-[#16130f]">
      {children}
    </span>
  );
}
