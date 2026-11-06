import { getTeardowns } from "@/lib/content";
import { Button } from "@/components/ui/button";
import { Highlight } from "@/components/ui/pill";
import { SectionTitle } from "@/components/ui/section-title";
import { TeardownBrowser } from "@/components/sections/teardown-browser";

export function teardownCards() {
  return getTeardowns().map((t) => ({ slug: t.slug, title: t.meta.title, product: t.meta.product, industry: t.meta.industry, summary: t.meta.summary, accent: t.meta.accent, hasPrototype: t.meta.hasPrototype }));
}

export function TeardownsSection() {
  return (
    <section id="teardowns" aria-labelledby="teardowns-title" className="px-4 pt-24 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <SectionTitle
          id="teardowns-title"
          icon="cursor"
          kicker="Playground · Teardowns"
          intro="Three deep dives into fintech, HR tech and AI: follow the user journey, inspect the trade-offs, and turn product friction into a measurable improvement."
        >
          Product <Highlight>teardowns</Highlight>
        </SectionTitle>
        <TeardownBrowser items={teardownCards()} limit={3} />
        <div className="mt-8">
          <Button href="/teardowns" variant="ink">
            All teardowns →
          </Button>
        </div>
      </div>
    </section>
  );
}
