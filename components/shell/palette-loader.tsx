"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { OPEN_PALETTE_EVENT, type PaletteItem } from "@/lib/palette";

const CommandPalette = dynamic(() => import("@/components/shell/command-palette").then((m) => m.CommandPalette), { ssr: false });

/** Keeps cmdk out of the initial bundle: it loads the first time the palette is requested. */
export function PaletteLoader({ items }: { items: readonly PaletteItem[] }) {
  const [armed, setArmed] = useState(false);

  useEffect(() => {
    const arm = () => setArmed(true);
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        arm();
      }
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener(OPEN_PALETTE_EVENT, arm);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener(OPEN_PALETTE_EVENT, arm);
    };
  }, []);

  // Once armed this component stays mounted; the palette owns its own listeners from then on.
  return armed ? <CommandPalette items={items} initialOpen /> : null;
}
