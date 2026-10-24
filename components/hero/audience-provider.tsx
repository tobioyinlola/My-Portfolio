"use client";

import { createContext, useContext, useMemo, useState } from "react";
import { audiences, type Audience, type AudienceId } from "@/config/audiences";

interface AudienceContext {
  audience: Audience;
  select: (id: AudienceId) => void;
}

const Ctx = createContext<AudienceContext | null>(null);

export function AudienceProvider({ children }: { children: React.ReactNode }) {
  const [id, setId] = useState<AudienceId>("hire");
  const value = useMemo<AudienceContext>(
    () => ({ audience: audiences.find((a) => a.id === id) ?? audiences[0]!, select: setId }),
    [id],
  );
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useAudience(): AudienceContext {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useAudience must be used inside <AudienceProvider>");
  return ctx;
}
