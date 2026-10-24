import { Bricolage_Grotesque, Inter, JetBrains_Mono } from "next/font/google";

export const display = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

export const body = Inter({ subsets: ["latin"], variable: "--font-body", display: "swap" });

// Mono is only used for small labels, so it loads after the critical fonts.
export const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono", display: "swap", preload: false });
