export interface ProofItem {
  value: string;
  label: string;
}

export const proof: readonly ProofItem[] = [
  { value: "$45M+", label: "Monthly volume scaled" },
  { value: "850M", label: "Profile dataset shipped" },
  { value: "-30%", label: "Fraud reduction" },
  { value: "6+", label: "Years in product" },
];
