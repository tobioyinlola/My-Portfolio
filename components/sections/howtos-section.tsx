import { getHowTos } from "@/lib/content";
import { Button } from "@/components/ui/button";
import { Highlight } from "@/components/ui/pill";
import { SectionTitle } from "@/components/ui/section-title";
import { HowToLibrary } from "@/components/sections/howto-library";

export function howToCards() {
  return getHowTos().map((h) => ({ slug: h.slug, title: h.meta.title, excerpt: h.meta.excerpt, tags: h.meta.tags, minutes: h.minutes, accent: h.meta.accent }));
}

export function HowTosSection() {
  return (
    <section id="how-tos" aria-labelledby="howtos-title" className="px-4 pt-24 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <SectionTitle id="howtos-title" icon="doc" kicker="Writing · Library" intro="Practical guides for AI product work. Search or filter by tag.">
          How-to <Highlight>library</Highlight>
        </SectionTitle>
        <HowToLibrary items={howToCards()} limit={4} />
        <div className="mt-8">
          <Button href="/writing" variant="ink">
            All writing →
          </Button>
        </div>
      </div>
    </section>
  );
}
