import type { Accent } from "@/lib/schemas";

export interface ExperienceEntry {
  company: string;
  years: string;
  role: string;
  accent: Accent;
}

/** Placeholder entries. Newest first; the stack builds from the bottom (oldest) up. */
export const experience: readonly ExperienceEntry[] = [
  { company: "[COMPANY 1]", years: "[YYYY–Present]", role: "[Role: e.g. Senior AI Product Manager]", accent: "cobalt" },
  { company: "[COMPANY 2]", years: "[YYYY–YYYY]", role: "[Role: e.g. Technical Product Manager]", accent: "mustard" },
  { company: "[COMPANY 3]", years: "[YYYY–YYYY]", role: "[Role: e.g. Product Manager]", accent: "terracotta" },
  { company: "[COMPANY 4]", years: "[YYYY–YYYY]", role: "[Role: e.g. Associate PM]", accent: "forest" },
];
