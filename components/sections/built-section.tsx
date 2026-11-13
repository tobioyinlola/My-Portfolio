import Link from "next/link";
import { builtProjects } from "@/content/built";
import { accentClass } from "@/lib/accent";
import { ArchDiagram } from "@/components/ui/arch-diagram";
import { Highlight, MonoPill } from "@/components/ui/pill";
import { SectionTitle } from "@/components/ui/section-title";
import { SlideIn } from "@/components/ui/slide-in";
import { cn } from "@/lib/utils";

export function BuiltSection() {
  return (
    <section id="built" aria-labelledby="built-title" className="overflow-x-clip px-4 pt-24 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <SectionTitle
          id="built-title"
          icon="briefcase"
          kicker="Proof of shipping"
          intro="Not just roadmaps: how the platforms are put together, the technical trade-offs behind them, and the product decisions they forced."
        >
          Platforms I have <Highlight>shipped</Highlight>
        </SectionTitle>
        <div className="space-y-8">
          {builtProjects.map((p) => (
            <SlideIn key={p.slug}>
            <article className="overflow-hidden rounded-3xl border-2 border-line bg-surface">
              <header className={cn("flex flex-wrap items-center justify-between gap-3 border-b-2 border-line px-6 py-4", accentClass[p.accent])}>
                <h3 className="font-display text-2xl font-extrabold tracking-tight">
                  {p.name} <span className="font-medium">· {p.tagline}</span>
                </h3>
                <MonoPill className="border-current">{p.status}</MonoPill>
              </header>
              <div className="p-5 sm:p-8">
                <ArchDiagram project={p} />
                <div className="mt-8 grid gap-8 md:grid-cols-3">
                  <Block title="Stack" items={p.stack} />
                  <Block title="Deployment" items={p.deployment} />
                  <Block title="Notes" items={p.notes} />
                </div>
                <Link href={`/work/${p.caseStudy}`} className="mt-6 inline-block font-display font-bold underline decoration-2 underline-offset-4">
                  Read the {p.name} case study ↗
                </Link>
              </div>
            </article>
            </SlideIn>
          ))}
        </div>
      </div>
    </section>
  );
}

function Block({ title, items }: { title: string; items: readonly string[] }) {
  return (
    <div>
      <h4 className="mb-2 font-mono text-xs font-semibold uppercase tracking-widest">{title}</h4>
      <ul className="space-y-1.5 text-muted">
        {items.map((i) => (
          <li key={i}>{i}</li>
        ))}
      </ul>
    </div>
  );
}
