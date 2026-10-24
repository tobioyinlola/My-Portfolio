"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  label: string;
  children: React.ReactNode;
  className?: string;
  /** "sheet" slides from the right edge (mobile menu). */
  variant?: "center" | "sheet";
}

/** Native <dialog>: focus trap, Escape and inert background come for free. */
export function Modal({ open, onClose, label, children, className, variant = "center" }: ModalProps) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <dialog
      ref={ref}
      aria-label={label}
      onClose={onClose}
      onClick={(e) => {
        if (e.target === ref.current) onClose();
      }}
      data-lenis-prevent
      className={cn(
        "m-auto max-h-[92svh] w-[min(94vw,56rem)] overflow-auto rounded-3xl border-2 border-line bg-paper p-0 text-ink backdrop:bg-black/60",
        variant === "sheet" && "ml-auto mr-0 mt-0 h-svh max-h-none w-[min(88vw,22rem)] rounded-none rounded-l-3xl",
        className,
      )}
    >
      {open && children}
    </dialog>
  );
}
