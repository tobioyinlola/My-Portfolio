export interface Testimonial {
  quote: string;
  name: string;
  role: string;
}

/** Placeholder testimonials. Replace with real quotes (with permission). */
export const testimonials: readonly Testimonial[] = [
  { quote: "[TESTIMONIAL 1 — one or two sentences on what it was like to work with you and the outcome.]", name: "[NAME]", role: "[ROLE, COMPANY]" },
  { quote: "[TESTIMONIAL 2 — focus on a specific product decision or delivery moment.]", name: "[NAME]", role: "[ROLE, COMPANY]" },
  { quote: "[TESTIMONIAL 3 — ideally from an engineer or founder you worked with.]", name: "[NAME]", role: "[ROLE, COMPANY]" },
];
