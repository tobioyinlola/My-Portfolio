"use client";

import { useCallback, useEffect, useState } from "react";
import { Command } from "cmdk";
import { useRouter } from "next/navigation";
import { site } from "@/config/site";
import { useBookCall } from "@/components/booking/book-call-provider";
import { OPEN_PALETTE_EVENT, type PaletteItem } from "@/lib/palette";

export function CommandPalette({ items, initialOpen = false }: { items: readonly PaletteItem[]; initialOpen?: boolean }) {
  const [open, setOpen] = useState(initialOpen);
  const router = useRouter();
  const book = useBookCall();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    const onOpen = () => setOpen(true);
    window.addEventListener("keydown", onKey);
    window.addEventListener(OPEN_PALETTE_EVENT, onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener(OPEN_PALETTE_EVENT, onOpen);
    };
  }, []);

  const run = useCallback((fn: () => void) => {
    setOpen(false);
    // let the dialog unmount before moving focus / scrolling
    setTimeout(fn, 60);
  }, []);

  const groups = [...new Set(items.map((i) => i.group))];

  return (
    <Command.Dialog
      open={open}
      onOpenChange={setOpen}
      label="Command palette"
      filter={(value, search) => (value.toLowerCase().includes(search.trim().toLowerCase()) ? 1 : 0)}
      overlayClassName="fixed inset-0 z-[65] bg-black/55"
      contentClassName="fixed left-1/2 top-[14vh] z-[66] w-[min(94vw,40rem)] -translate-x-1/2 overflow-hidden rounded-3xl border-2 border-line bg-paper text-ink shadow-[0_8px_0_var(--line)]"
    >
      <Command.Input
        placeholder="Jump to a section, case study, video… or run an action"
        className="w-full border-b-2 border-line bg-transparent px-5 py-4 text-base outline-none placeholder:text-muted"
      />
      <Command.List data-lenis-prevent className="max-h-[52vh] overflow-auto p-2">
        <Command.Empty className="px-4 py-6 text-center text-sm text-muted">Nothing found.</Command.Empty>
        <Command.Group heading="Actions" className={groupClass}>
          <Row onSelect={() => run(book.open)} hint="Primary">
            Book a call
          </Row>
          <Row
            onSelect={() =>
              run(() => {
                void navigator.clipboard?.writeText(site.email);
              })
            }
          >
            Copy email
          </Row>
          <Row
            onSelect={() =>
              run(() => {
                const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
                document.documentElement.dataset.theme = next;
                try {
                  localStorage.setItem("theme", next);
                } catch {
                  /* ignore */
                }
              })
            }
          >
            Toggle theme
          </Row>
        </Command.Group>
        {groups.map((group) => (
          <Command.Group key={group} heading={group} className={groupClass}>
            {items
              .filter((i) => i.group === group)
              .map((i) => (
                <Row key={i.id} value={`${i.label} ${i.keywords ?? ""}`} onSelect={() => run(() => router.push(i.href))}>
                  {i.label}
                </Row>
              ))}
          </Command.Group>
        ))}
      </Command.List>
    </Command.Dialog>
  );
}

const groupClass =
  "[&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:py-2 [&_[cmdk-group-heading]]:font-mono [&_[cmdk-group-heading]]:text-[0.68rem] [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-[0.1em] [&_[cmdk-group-heading]]:text-muted";

function Row({
  children,
  onSelect,
  value,
  hint,
}: {
  children: React.ReactNode;
  onSelect: () => void;
  value?: string;
  hint?: string;
}) {
  return (
    <Command.Item
      value={value}
      onSelect={onSelect}
      className="flex cursor-pointer items-center justify-between rounded-xl px-3 py-2.5 text-[0.95rem] data-[selected=true]:bg-mustard data-[selected=true]:text-[#16130f]"
    >
      <span>{children}</span>
      {hint && <span className="font-mono text-[0.65rem] uppercase tracking-wider opacity-70">{hint}</span>}
    </Command.Item>
  );
}
