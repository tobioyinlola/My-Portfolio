import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { Button } from "@/components/ui/button";
import { Highlight } from "@/components/ui/pill";
import { SectionTitle } from "@/components/ui/section-title";
import { HowToLibrary } from "@/components/sections/howto-library";
import { howToCards } from "@/components/sections/howtos-section";

export const metadata: Metadata = pageMetadata({
  title: "Writing: how-to library",
  description: "Practical how-tos on AI product management, PRDs, roadmapping, evals and shipping with Claude Code.",
  path: "/writing",
  kicker: "Writing",
});

export default function WritingPage() {
  return (
    <section className="px-4 pt-10 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <SectionTitle as="h1" icon="doc" kicker="Writing · Library" intro="Search, or filter by tag.">
          How-to <Highlight>library</Highlight>
        </SectionTitle>
        <HowToLibrary items={howToCards()} headingAs="h2" />
        <div className="mt-8">
          <Button href="/rss.xml" size="sm" variant="cream">
            RSS feed
          </Button>
        </div>
      </div>
    </section>
  );
}
