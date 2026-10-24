/** Remounts on every navigation, which replays the CSS entrance (no JS needed, so SSR content is never hidden). */
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="page-in">{children}</div>;
}
