"use client";

import { Button } from "@/components/ui/button";
import { useBookCall } from "@/components/booking/book-call-provider";
import { site } from "@/config/site";

type ButtonProps = React.ComponentProps<typeof Button>;

/**
 * Primary CTA. Opens the booking modal; without JS (or a booking URL) it still
 * navigates to the booking URL, or the contact section as a last resort.
 */
export function BookButton({
  children = "Book a call",
  ...props
}: Omit<ButtonProps, "href" | "onClick" | "children"> & { children?: React.ReactNode }) {
  const { open } = useBookCall();
  return (
    <Button
      {...props}
      href={site.bookingUrl || "/#contact"}
      aria-haspopup="dialog"
      onClick={(e) => {
        if (!site.bookingUrl) return; // no embed to open: let the link jump to #contact
        e.preventDefault();
        open();
      }}
    >
      {children}
    </Button>
  );
}
