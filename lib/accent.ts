import type { Accent } from "@/lib/schemas";

/** Background + readable foreground (WCAG AA) for each flat colour block. */
export const accentClass: Record<Accent, string> = {
  cobalt: "bg-cobalt text-cream",
  mustard: "bg-mustard text-[#16130f]",
  terracotta: "bg-terracotta text-cream",
  forest: "bg-forest text-cream",
  lilac: "bg-lilac text-[#16130f]",
};

export const accentVar: Record<Accent, string> = {
  cobalt: "var(--cobalt)",
  mustard: "var(--mustard)",
  terracotta: "var(--terracotta)",
  forest: "var(--forest)",
  lilac: "var(--lilac)",
};

export const accentOrder: readonly Accent[] = ["cobalt", "mustard", "terracotta", "forest", "lilac"];
