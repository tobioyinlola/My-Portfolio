import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { Highlight } from "@/components/ui/pill";
import { SectionTitle } from "@/components/ui/section-title";
import { TeardownBrowser } from "@/components/sections/teardown-browser";
import { teardownCards } from "@/components/sections/teardowns-section";

export const metadata: Metadata = pageMetadata({
  title: "Product teardowns",
  description: "Senior product teardowns of Stripe Checkout, Frappe HR and Open WebUI: user journeys, evidence, trade-offs, proposed improvements and experiment and release decisions.",
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
