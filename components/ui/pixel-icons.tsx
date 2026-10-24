import { cn } from "@/lib/utils";

/** '#' = ink outline, 'o' = fill colour, 'w' = white, '.' = empty. */
const GRIDS = {
  folder: [
    "............",
    ".#####......",
    "#ooooo####..",
    "#oooooooooo#",
    "#oooooooooo#",
    "#oooooooooo#",
    "#oooooooooo#",
    "#oooooooooo#",
    "#oooooooooo#",
    "############",
  ],
  cursor: [
    "#...........",
    "##..........",
    "#o#.........",
    "#oo#........",
    "#ooo#.......",
    "#oooo#......",
    "#ooooo#.....",
    "#oooooo#....",
    "#ooooooo#...",
    "#oooo#####..",
    "#oo#o#......",
    "#o#.#o#.....",
    "##...##.....",
  ],
  briefcase: [
    "...######...",
    "...#....#...",
    "############",
    "#oooooooooo#",
    "#oooooooooo#",
    "#ooooo##ooo#",
    "#oooooooooo#",
    "#oooooooooo#",
    "#oooooooooo#",
    "############",
  ],
  chat: [
    ".##########.",
    "#oooooooooo#",
    "#oooooooooo#",
    "#o#oo#oo#oo#",
    "#oooooooooo#",
    "#oooooooooo#",
    ".####oo####.",
    "....#oo#....",
    ".....##.....",
  ],
  bulb: [
    "...######...",
    "..#oooooo#..",
    ".#oooooooo#.",
    ".#oooooooo#.",
    ".#oooooooo#.",
    ".#oooooooo#.",
    "..#oooooo#..",
    "...#oooo#...",
    "...######...",
    "...#oooo#...",
    "...######...",
    "....####....",
  ],
  star: [
    ".....#.....",
    "....#o#....",
    "....#o#....",
    "#####o#####",
    "#ooooooooo#",
    ".#ooooooo#.",
    "..#ooooo#..",
    "..#oo#oo#..",
    ".#oo#.#oo#.",
    ".###...###.",
  ],
  play: [
    "############",
    "#oooooooooo#",
    "#oo#ooooooo#",
    "#oo##oooooo#",
    "#oo###ooooo#",
    "#oo####oooo#",
    "#oo###ooooo#",
    "#oo##oooooo#",
    "#oo#ooooooo#",
    "#oooooooooo#",
    "############",
  ],
  doc: [
    "#######...",
    "#ooooo##..",
    "#ooooo#o#.",
    "#ooooo####",
    "#o#####oo#",
    "#oooooooo#",
    "#o######o#",
    "#oooooooo#",
    "#o####ooo#",
    "#oooooooo#",
    "##########",
  ],
  target: [
    "...######...",
    "..#oooooo#..",
    ".#oo####oo#.",
    "#oo##oo##oo#",
    "#oo#o##o#oo#",
    "#oo#o##o#oo#",
    "#oo##oo##oo#",
    ".#oo####oo#.",
    "..#oooooo#..",
    "...######...",
  ],
  mail: [
    "############",
    "##oooooooo##",
    "#o#oooooo#o#",
    "#oo#oooo#oo#",
    "#ooo#oo#ooo#",
    "#oooo##oooo#",
    "#oooooooooo#",
    "############",
  ],
  cloud: [
    "......####......",
    "...####oooo##...",
    "..#oooooooooo#..",
    ".#oooooooooooo#.",
    "#oooooooooooooo#",
    "################",
  ],
  arrow: [
    "......#....",
    "......##...",
    "#########..",
    "##########.",
    "#########..",
    "......##...",
    "......#....",
  ],
} as const;

export type PixelIconName = keyof typeof GRIDS;
export const pixelIconNames = Object.keys(GRIDS) as PixelIconName[];

interface PixelIconProps {
  name: PixelIconName;
  /** Fill colour (any CSS colour). */
  fill?: string;
  size?: number;
  className?: string;
  title?: string;
}

export function PixelIcon({ name, fill = "var(--mustard)", size = 32, className, title }: PixelIconProps) {
  const rows: readonly string[] = GRIDS[name];
  const w = Math.max(...rows.map((r) => r.length));
  const h = rows.length;
  // One <path> per colour with horizontal runs merged keeps the DOM tiny (icons appear all over the page).
  const paths: Record<string, string> = {};
  rows.forEach((row, y) => {
    let x = 0;
    while (x < row.length) {
      const ch = row[x] ?? ".";
      if (ch === ".") {
        x++;
        continue;
      }
      let end = x;
      while (row[end + 1] === ch) end++;
      const color = ch === "#" ? "var(--line)" : ch === "w" ? "#fff" : fill;
      paths[color] = `${paths[color] ?? ""}M${x} ${y}h${end - x + 1.02}v1.02h-${end - x + 1.02}z`;
      x = end + 1;
    }
  });
  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      width={(size * w) / Math.max(w, h)}
      height={(size * h) / Math.max(w, h)}
      shapeRendering="crispEdges"
      className={cn("shrink-0", className)}
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
    >
      {Object.entries(paths).map(([color, d]) => (
        <path key={color} d={d} fill={color} />
      ))}
    </svg>
  );
}
