"use client";

import { useEffect, useRef, useState } from "react";
import { PixelIcon } from "@/components/ui/pixel-icons";
import { useMotionPref } from "@/lib/use-motion-pref";

type CursorState = "default" | "link" | "hidden";

const INTERACTIVE = "a, button, [role='button'], summary, label, [data-cursor='link']";
const TEXT_FIELDS = "input, textarea, select, dialog";

/** Pixel arrow that follows the pointer on fine-pointer desktops; grows and turns yellow over links. */
export function Cursor() {
  const { reduced } = useMotionPref();
  const ref = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<CursorState>("hidden");

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!fine || reduced) return;
    const root = document.documentElement;
    root.classList.add("pixel-cursor");

    const move = (e: PointerEvent) => {
      if (ref.current) ref.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
    };
    const over = (e: PointerEvent) => {
      const el = e.target instanceof Element ? e.target : null;
      if (!el) return;
      if (el.closest(TEXT_FIELDS)) setState("hidden");
      else setState(el.closest(INTERACTIVE) ? "link" : "default");
    };
    const leave = () => setState("hidden");

    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerover", over, { passive: true });
    document.addEventListener("pointerleave", leave);
    return () => {
      root.classList.remove("pixel-cursor");
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerover", over);
      document.removeEventListener("pointerleave", leave);
    };
  }, [reduced]);

  return (
    <div ref={ref} aria-hidden className="pointer-events-none fixed left-0 top-0 z-[70] will-change-transform">
      <div
        className="origin-top-left transition-[transform,opacity] duration-100"
        style={{ opacity: state === "hidden" ? 0 : 1, transform: state === "link" ? "scale(1.5)" : "scale(1)" }}
      >
        <PixelIcon name="cursor" size={26} fill={state === "link" ? "var(--mustard)" : "#fff8e7"} />
      </div>
    </div>
  );
}
