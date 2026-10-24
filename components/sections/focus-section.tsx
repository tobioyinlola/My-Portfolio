import { focusAreas } from "@/content/focus";
import { accentVar } from "@/lib/accent";
import { Highlight } from "@/components/ui/pill";
import { PixelIcon } from "@/components/ui/pixel-icons";
import { SectionTitle } from "@/components/ui/section-title";

export function FocusSection() {
  return (
    <section id="focus" aria-labelledby="focus-title" className="px-4 pt-24 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <SectionTitle id="focus-title" icon="bulb" kicker="What I do">
          What I <Highlight>work on</Highlight>
        </SectionTitle>
        <ul className="grid rounded-3xl border-2 border-line bg-surface sm:grid-cols-2 lg:grid-cols-4">
          {focusAreas.map((f, i) => (
            <li
              key={f.title}
              className={`flex flex-col gap-4 p-6 ${i > 0 ? "border-t-2 border-dashed border-line sm:border-t-0" : ""} ${i % 2 === 1 ? "sm:border-l-2 sm:border-dashed" : ""} ${i >= 2 ? "sm:border-t-2 sm:border-dashed lg:border-t-0" : ""} ${i > 0 ? "lg:border-l-2 lg:border-dashed" : ""} border-line`}
            >
              <PixelIcon name={f.icon} fill={accentVar[f.accent]} size={52} />
              <h3 className="font-display text-2xl font-extrabold leading-tight tracking-tight">{f.title}</h3>
              <p className="text-muted">{f.blurb}</p>
              <ul className="mt-auto space-y-1.5 font-mono text-xs font-semibold uppercase tracking-wide">
                {f.points.map((p) => (
                  <li key={p} className="flex gap-2">
                    <span aria-hidden>+</span>
                    {p}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
