import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { Highlight } from "@/components/ui/pill";
import { SectionTitle } from "@/components/ui/section-title";
import { TeardownBrowser } from "@/components/sections/teardown-browser";
import { teardownCards } from "@/components/sections/teardowns-section";

export const metadata: Metadata = pageMetadata({
  title: "Product teardowns",
  description: "Product teardowns with one fixed template: what it does well, where it breaks, metrics to track and how I'd improve it.",
  path: "/teardowns",
  kicker: "Teardowns",
});

export default function TeardownsPage() {
  return (
    <section className="px-4 pt-10 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <SectionTitle as="h1" icon="cursor" kicker="Playground · Teardowns" intro="Filter by industry.">
          Product <Highlight>teardowns</Highlight>
        </SectionTitle>
        <TeardownBrowser items={teardownCards()} headingAs="h2" />
      </div>
    </section>
  );
}
