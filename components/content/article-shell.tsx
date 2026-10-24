import Link from "next/link";
import type { TocItem } from "@/lib/content";
import { accentClass } from "@/lib/accent";
import type { Accent } from "@/lib/schemas";
import { CtaBlock } from "@/components/content/cta-block";
import { ReadingProgress } from "@/components/content/reading-progress";
import { Toc } from "@/components/content/toc";
import { cn } from "@/lib/utils";

interface ArticleShellProps {
  backHref: string;
  backLabel: string;
  accent: Accent;
  kicker: string;
  title: string;
  subtitle?: string;
  /** Extra header content (summary grid, pills…). */
  header?: React.ReactNode;
  toc: readonly TocItem[];
  children: React.ReactNode;
  /** Optional block between the article and the CTA (e.g. next case study). */
  after?: React.ReactNode;
  ctaHeading?: string;
}

export function ArticleShell({ backHref, backLabel, accent, kicker, title, subtitle, header, toc, children, after, ctaHeading }: ArticleShellProps) {
  return (
    <>
      <ReadingProgress />
      <article className="px-4 pb-8 pt-10 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <Link href={backHref} className="font-mono text-xs font-semibold uppercase tracking-widest underline-offset-4 hover:underline">
            ← {backLabel}
          </Link>
          <header className={cn("mt-5 rounded-3xl border-2 border-line p-6 shadow-[0_8px_0_var(--line)] sm:p-10", accentClass[accent])}>
            <p className="font-mono text-xs font-semibold uppercase tracking-widest">{kicker}</p>
            <h1 className="mt-3 font-display text-[clamp(2.4rem,7vw,5.5rem)] font-extrabold leading-[0.92] tracking-[-0.05em]">{title}</h1>
            {subtitle && <p className="mt-3 max-w-2xl text-xl">{subtitle}</p>}
            {header}
          </header>

          <div className="mt-12 grid gap-12 lg:grid-cols-[14rem_minmax(0,1fr)]">
            <Toc items={toc} />
            <div className="min-w-0 max-w-3xl">{children}</div>
          </div>
          {after}
          <div className="mx-auto max-w-3xl lg:ml-[calc(14rem+3rem)]">
            <CtaBlock heading={ctaHeading} />
          </div>
        </div>
      </article>
    </>
  );
}
