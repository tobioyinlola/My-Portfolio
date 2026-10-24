import { site } from "@/config/site";
import { BookButton } from "@/components/booking/book-button";
import { Button } from "@/components/ui/button";
import { MonoPill } from "@/components/ui/pill";

/** Closing hire-me block for every case study, teardown, how-to and video page. */
export function CtaBlock({ heading = "Want this thinking on your team?" }: { heading?: string }) {
  return (
    <aside aria-label="Work with me" className="my-16 rounded-3xl border-2 border-line bg-mustard p-6 text-[#16130f] shadow-[0_8px_0_var(--line)] sm:p-10">
      <MonoPill className="border-[#16130f]">Hire me · Book a call</MonoPill>
      <h2 className="mt-4 max-w-2xl font-display text-[clamp(1.9rem,5vw,3.2rem)] font-extrabold leading-[0.98] tracking-[-0.04em]">{heading}</h2>
      <p className="mt-3 max-w-xl text-lg">
        Hiring for an AI or product role, need a PM, or want a product built properly? Let&apos;s talk for 30 minutes.
      </p>
      <div className="mt-6 flex flex-wrap gap-4">
        <BookButton size="lg" variant="ink" />
        <Button href={`mailto:${site.email}`} size="lg" variant="cream">
          Email me
        </Button>
      </div>
    </aside>
  );
}
