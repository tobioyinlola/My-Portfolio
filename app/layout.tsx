import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { body, display, mono } from "@/lib/fonts";
import { site } from "@/config/site";
import { ogImage } from "@/lib/seo";
import { getPaletteItems } from "@/lib/palette-items";
import { BookCallProvider } from "@/components/booking/book-call-provider";
import { BookingModal } from "@/components/booking/booking-modal";
import { AudienceProvider } from "@/components/hero/audience-provider";
import { Nav } from "@/components/shell/nav";
import { Cursor } from "@/components/shell/cursor";
import { SmoothScroll } from "@/components/shell/smooth-scroll";
import { MotionProvider } from "@/components/shell/motion-provider";
import { PaletteLoader } from "@/components/shell/palette-loader";
import { SiteFooter } from "@/components/sections/site-footer";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.title, template: `%s — ${site.name}` },
  description: site.description,
  alternates: { canonical: "/", types: { "application/rss+xml": "/rss.xml" } },
  openGraph: { type: "website", siteName: site.name, locale: site.locale, title: site.title, description: site.description, images: [{ url: ogImage(site.title), width: 1200, height: 630 }] },
  twitter: { card: "summary_large_image", title: site.title, description: site.description, images: [ogImage(site.title)] },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f4ede0" },
    { media: "(prefers-color-scheme: dark)", color: "#15120e" },
  ],
};

const themeScript = `try{var t=localStorage.getItem('theme')||(matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light');document.documentElement.dataset.theme=t}catch(e){}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <MotionProvider>
          <BookCallProvider>
            <AudienceProvider>
            <a
              href="#main"
              className="fixed left-3 top-3 z-[80] -translate-y-20 rounded-full bg-ink px-4 py-2 text-paper focus:translate-y-0"
            >
              Skip to content
            </a>
            <SmoothScroll />
            <Cursor />
            <Nav />
            <main id="main" className="pt-24">
              {children}
            </main>
            <SiteFooter />
            <BookingModal />
            <PaletteLoader items={getPaletteItems()} />
            </AudienceProvider>
          </BookCallProvider>
        </MotionProvider>
        {process.env.VERCEL && <Analytics />}
      </body>
    </html>
  );
}
