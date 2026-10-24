import { PixelIcon, type PixelIconName } from "@/components/ui/pixel-icons";
import { MonoPill } from "@/components/ui/pill";

interface SectionTitleProps {
  id?: string;
  icon: PixelIconName;
  iconFill?: string;
  /** Mono pill, e.g. "03 FILES · KEEP SCROLLING". */
  kicker?: string;
  children: React.ReactNode;
  as?: "h1" | "h2";
  intro?: React.ReactNode;
}

export function SectionTitle({ id, icon, iconFill, kicker, children, as: Tag = "h2", intro }: SectionTitleProps) {
  return (
    <header className="mb-10 flex flex-col gap-4 md:mb-14">
      {kicker && <MonoPill className="self-start">{kicker}</MonoPill>}
      <div className="flex items-center gap-4">
        <PixelIcon name={icon} fill={iconFill} size={44} className="hidden sm:block" />
        <Tag
          id={id}
          className="font-display text-[clamp(2.1rem,6vw,4.25rem)] font-extrabold leading-[0.95] tracking-[-0.045em]"
        >
          {children}
        </Tag>
      </div>
      {intro && <p className="max-w-2xl text-lg text-muted">{intro}</p>}
    </header>
  );
}
