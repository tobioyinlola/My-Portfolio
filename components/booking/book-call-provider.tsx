"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";

interface BookCallContext {
  isOpen: boolean;
  open: () => void;
  close: () => void;
}

const Ctx = createContext<BookCallContext | null>(null);

export function BookCallProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setOpen] = useState(false);
  const open = useCallback(() => setOpen(true), []);
  const close = useCallback(() => setOpen(false), []);
  const value = useMemo(() => ({ isOpen, open, close }), [isOpen, open, close]);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useBookCall(): BookCallContext {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useBookCall must be used inside <BookCallProvider>");
  return ctx;
}
