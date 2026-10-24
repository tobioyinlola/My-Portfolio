import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="grid min-h-[60svh] place-items-center px-4 text-center">
      <div className="flex flex-col items-center gap-4">
        <p className="font-mono text-xs font-semibold uppercase tracking-widest">404</p>
        <h1 className="font-display text-5xl font-extrabold tracking-tight">This page wandered off.</h1>
        <Button href="/" variant="cobalt">
          Back home
        </Button>
      </div>
    </section>
  );
}
