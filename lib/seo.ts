import type { Metadata } from "next";
import { site } from "@/config/site";

interface PageMeta {
  title: string;
  description: string;
  path: string;
  kicker?: string;
  type?: "website" | "article";
  publishedTime?: string;
}

export function ogImage(title: string, kicker = "Justus"): string {
  const params = new URLSearchParams({ title: title.slice(0, 120), kicker: kicker.slice(0, 40) });
  return `/api/og?${params.toString()}`;
}

/** Per-page metadata with canonical URL, Open Graph and Twitter cards. */
export function pageMetadata({ title, description, path, kicker, type = "website", publishedTime }: PageMeta): Metadata {
  const image = ogImage(title, kicker);
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { title, description, url: path, siteName: site.name, type, locale: site.locale, publishedTime, images: [{ url: image, width: 1200, height: 630, alt: title }] },
    twitter: { card: "summary_large_image", title, description, images: [image] },
  };
}
