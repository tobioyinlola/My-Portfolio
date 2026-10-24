import { hero } from "@/content/hero";
import { proof } from "@/content/proof";
import { BookButton } from "@/components/booking/book-button";
import { Button } from "@/components/ui/button";
import { AudienceSelector } from "@/components/hero/audience-selector";
import { Mascot } from "@/components/hero/mascot";
import { StampedHeadline } from "@/components/hero/stamped-headline";

export function Hero() {
  return (
    <section aria-labelledby="hero" className="relative overflow-x-clip px-4 pb-16 pt-24 sm:px-6 md:pt-32">
      {/* pixel checkerboard accents */}
      <div aria-hidden className="checker absolute left-0 top-24 hidden h-24 w-48 text-cobalt/80 md:block" />
      <div aria-hidden className="checker absolute bottom-40 right-0 hidden h-32 w-56 text-terracotta/80 md:block" />
      <div aria-hidden className="checker absolute right-8 top-10 h-12 w-24 text-forest/80 md:h-16 md:w-32" />

      <Mascot shape="blob" fill="var(--lilac)" size={92} tilt={-8} parallax={-0.2} className="absolute left-3 top-2 sm:left-[7%] sm:top-4" />
      <Mascot shape="spike" fill="var(--mustard)" size={110} tilt={10} parallax={-0.1} delay={0.4} className="absolute right-[7%] top-[25rem] hidden lg:block" />
      <Mascot shape="block" fill="var(--terracotta)" size={84} tilt={-5} parallax={-0.25} delay={0.8} className="absolute bottom-56 left-[5%] hidden lg:block" />
      <Mascot shape="tri" fill="var(--forest)" size={80} tilt={8} parallax={-0.12} delay={1.2} className="absolute bottom-64 right-[6%] hidden lg:block" />
      <Mascot shape="bean" fill="var(--cobalt)" size={72} tilt={-12} parallax={-0.3} delay={0.6} className="absolute right-6 top-2 sm:right-[7%] sm:top-4" />

      <div className="relative mx-auto flex max-w-6xl flex-col items-center gap-8 text-center">
        <span id="hero" className="sr-only">
          Introduction
        </span>
        <StampedHeadline />

        <div className="max-w-2xl space-y-1 text-lg leading-relaxed sm:text-xl">
          {hero.statement.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <BookButton size="lg" variant="cobalt" magnetic />
          <Button href="/#work" size="lg" variant="cream" magnetic>
            See the work
          </Button>
        </div>

        <AudienceSelector />

        <ul aria-label="At a glance" className="mt-2 flex w-full max-w-3xl flex-wrap justify-center gap-3">
          {proof.map((p) => (
            <li key={p.label} className="flex items-baseline gap-2 rounded-full border-2 border-line bg-surface px-4 py-2">
              <span className="font-display text-2xl font-extrabold tracking-tight">{p.value}</span>
              <span className="font-mono text-[0.68rem] font-semibold uppercase tracking-wider text-muted">{p.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
