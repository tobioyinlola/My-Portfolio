import { personJsonLd } from "@/lib/jsonld";
import { JsonLd } from "@/components/ui/json-ld";
import { Hero } from "@/components/hero/hero";
import { SelectedWork } from "@/components/sections/selected-work";
import { FocusSection } from "@/components/sections/focus-section";
import { TeardownsSection } from "@/components/sections/teardowns-section";
import { HowTosSection } from "@/components/sections/howtos-section";
import { VideoShelf } from "@/components/sections/video-shelf";
import { BuiltSection } from "@/components/sections/built-section";
import { ExperienceSection } from "@/components/sections/experience-section";
import { TestimonialsSection } from "@/components/sections/testimonials-section";

export default function HomePage() {
  return (
    <>
      <JsonLd data={personJsonLd()} />
      <Hero />
      <SelectedWork />
      <FocusSection />
      <TeardownsSection />
      <HowTosSection />
      <VideoShelf />
      <BuiltSection />
      <ExperienceSection />
      <TestimonialsSection />
    </>
  );
}
