"use client";

export function ThemeToggle({ className }: { className?: string }) {
  const toggle = () => {
    const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {
      /* storage unavailable: theme still applies for this visit */
    }
  };
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle light / dark theme"
      className={`grid size-10 place-items-center rounded-full border-2 border-line bg-surface hover:bg-mustard hover:text-[#16130f] ${className ?? ""}`}
    >
      <svg viewBox="0 0 24 24" className="size-5 dark:hidden" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden>
        <path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5Z" />
      </svg>
      <svg viewBox="0 0 24 24" className="hidden size-5 dark:block" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden>
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9 7 7M17 17l2.1 2.1M4.9 19.1 7 17M17 7l2.1-2.1" />
      </svg>
    </button>
  );
}
