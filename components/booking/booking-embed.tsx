import { site } from "@/config/site";
import { Button } from "@/components/ui/button";

/** Inline iframe for the booking page, or a plain-link fallback when no URL is configured. */
export function BookingEmbed({ height = 680, className }: { height?: number; className?: string }) {
  if (!site.bookingUrl) {
    return (
      <div className={className}>
        <div className="flex flex-col items-start gap-4 rounded-3xl border-2 border-dashed border-line p-8">
          <p className="font-mono text-xs uppercase tracking-widest">Booking not configured</p>
          <p className="max-w-md text-muted">
            Set <code>NEXT_PUBLIC_BOOKING_URL</code> to show the scheduler here. Until then, email works.
          </p>
          <Button href={`mailto:${site.email}`} variant="mustard">
            Email me
          </Button>
        </div>
      </div>
    );
  }
  return (
    <div className={className}>
      <iframe
        src={site.bookingUrl}
        title="Book a call"
        loading="lazy"
        height={height}
        className="w-full rounded-3xl border-2 border-line bg-white"
      />
      <p className="mt-3 text-sm text-muted">
        Scheduler not loading?{" "}
        <a className="underline underline-offset-4" href={site.bookingUrl} target="_blank" rel="noopener noreferrer">
          Open it in a new tab
        </a>
        .
      </p>
    </div>
  );
}
