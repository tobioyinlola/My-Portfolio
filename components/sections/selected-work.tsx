import { featuredCaseStudies } from "@/content/work";
import { getCaseStudies } from "@/lib/content";
import { Highlight } from "@/components/ui/pill";
import { SectionTitle } from "@/components/ui/section-title";
import { FolderStack, type FolderItem } from "@/components/sections/folder-stack";

export function SelectedWork() {
  const all = getCaseStudies();
  const items: FolderItem[] = featuredCaseStudies.flatMap((slug) => {
    const cs = all.find((c) => c.slug === slug);
    return cs ? [{ slug, title: cs.meta.title, subtitle: cs.meta.subtitle, accent: cs.meta.accent, outcomeHeadline: cs.meta.outcomeHeadline, metrics: cs.meta.metrics, cover: cs.meta.cover, coverAlt: cs.meta.coverAlt }] : [];
  });

  return (
    <section id="work" aria-labelledby="work-title" className="px-4 pt-16 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <SectionTitle
          id="work-title"
          icon="folder"
          kicker={`${String(items.length).padStart(2, "0")} FILES · KEEP SCROLLING`}
          intro="The problem, the decisions, the architecture trade-offs and the measured outcomes behind each product."
        >
          Selected <Highlight>work</Highlight>
        </SectionTitle>
      </div>
      <FolderStack items={items} />
    </section>
  );
}
