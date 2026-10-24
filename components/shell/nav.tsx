"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { navItems, site } from "@/config/site";
import { BookButton } from "@/components/booking/book-button";
import { Modal } from "@/components/ui/modal";
import { ThemeToggle } from "@/components/shell/theme-toggle";
import { OPEN_PALETTE_EVENT } from "@/lib/palette";
import { cn } from "@/lib/utils";

const pill = "rounded-full border-2 border-line bg-surface";

function openPalette() {
  window.dispatchEvent(new Event(OPEN_PALETTE_EVENT));
}

export function Nav() {
  const pathname = usePathname();
  const [menu, setMenu] = useState(false);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3">
          <Link
            href="/"
            aria-label={`${site.name} — home`}
            className={cn(pill, "flex items-center gap-2 py-1 pl-1 pr-4 font-display text-lg font-extrabold tracking-tight")}
          >
            <Image src="/avatar.svg" alt="" width={36} height={36} unoptimized className="size-9 rounded-full border-2 border-line" />
            {site.name}
          </Link>

          <nav aria-label="Primary" className={cn(pill, "hidden items-center gap-1 p-1 md:flex")}>
            {navItems.map((item) => {
              const active = !item.href.startsWith("/#") && pathname.startsWith(item.href);
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "rounded-full px-4 py-2 text-sm font-semibold hover:bg-mustard hover:text-[#16130f]",
                    active && "bg-ink text-paper hover:bg-ink hover:text-paper",
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={openPalette}
              aria-label="Open command palette"
              className={cn(pill, "hidden h-10 items-center gap-2 px-3 font-mono text-xs font-semibold uppercase tracking-wider hover:bg-mustard hover:text-[#16130f] lg:flex")}
            >
              <kbd className="font-mono">⌘K</kbd>
            </button>
            <ThemeToggle className="hidden sm:grid" />
            <BookButton size="sm" variant="ink" magnetic className="hidden sm:inline-flex">
              Book a call
            </BookButton>
            <button
              type="button"
              onClick={() => setMenu(true)}
              aria-haspopup="dialog"
              className={cn(pill, "h-10 px-4 font-mono text-xs font-semibold uppercase tracking-wider md:hidden")}
            >
              Menu
            </button>
          </div>
        </div>
      </header>

      <Modal open={menu} onClose={() => setMenu(false)} label="Menu" variant="sheet">
        <div className="flex h-full flex-col gap-6 p-5">
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs font-semibold uppercase tracking-widest">Menu</span>
            <button type="button" onClick={() => setMenu(false)} className={cn(pill, "px-4 py-1.5 font-mono text-xs font-semibold uppercase tracking-wider")}>
              Close
            </button>
          </div>
          <nav aria-label="Mobile" className="flex flex-col gap-1">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setMenu(false)}
                className="rounded-2xl px-3 py-3 font-display text-3xl font-extrabold tracking-tight hover:bg-mustard hover:text-[#16130f]"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="mt-auto flex flex-col gap-3">
            <BookButton variant="cobalt" size="lg" className="w-full" aria-label="Book a call">
              Book a call
            </BookButton>
            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={() => {
                  setMenu(false);
                  setTimeout(openPalette, 80);
                }}
                className={cn(pill, "h-10 px-4 font-mono text-xs font-semibold uppercase tracking-wider")}
              >
                Search
              </button>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}
