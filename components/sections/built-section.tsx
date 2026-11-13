import { builtProjects } from "@/content/built";
import { Highlight } from "@/components/ui/pill";
import { SectionTitle } from "@/components/ui/section-title";
import { BuiltStack } from "@/components/sections/built-stack";

export function BuiltSection() {
  return (
    <section id="built" aria-labelledby="built-title" className="px-4 pt-24 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <SectionTitle
          id="built-title"
          icon="briefcase"
          kicker="Proof of shipping"
          intro="Not just roadmaps: how the platforms are put together, the technical trade-offs behind them, and the product decisions they forced."
        >
          Platforms I have <Highlight>shipped</Highlight>
        </SectionTitle>
      </div>
      <BuiltStack projects={builtProjects} />
    </section>
  );
}
