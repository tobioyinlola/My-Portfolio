"use client";

import { Modal } from "@/components/ui/modal";
import { BookingEmbed } from "@/components/booking/booking-embed";
import { useBookCall } from "@/components/booking/book-call-provider";

export function BookingModal() {
  const { isOpen, close } = useBookCall();
  return (
    <Modal open={isOpen} onClose={close} label="Book a call">
      <div className="p-4 sm:p-6">
        <div className="mb-4 flex items-center justify-between gap-4">
          <h2 className="font-display text-2xl font-extrabold tracking-tight">Book a call</h2>
          <button
            type="button"
            onClick={close}
            className="rounded-full border-2 border-line px-4 py-1.5 font-mono text-xs font-semibold uppercase tracking-wider"
          >
            Close
          </button>
        </div>
        <BookingEmbed height={620} />
      </div>
    </Modal>
  );
}
