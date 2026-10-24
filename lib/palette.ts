export interface PaletteItem {
  id: string;
  label: string;
  group: string;
  href: string;
  keywords?: string;
}

export const OPEN_PALETTE_EVENT = "open-command-palette";
