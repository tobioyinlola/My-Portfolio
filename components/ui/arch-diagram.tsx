import type { BuiltProject } from "@/content/built";
import { accentVar } from "@/lib/accent";

const COL_W = 190;
const ROW_H = 110;
const NODE_W = 150;
const NODE_H = 64;

/** Data-driven architecture diagram (inline SVG; scales to the container, scrolls on very narrow screens). */
export function ArchDiagram({ project }: { project: Pick<BuiltProject, "nodes" | "edges" | "name"> }) {
  const cols = Math.max(...project.nodes.map((n) => n.col)) + 1;
  const rows = Math.max(...project.nodes.map((n) => n.row)) + 1;
  const width = cols * COL_W;
  const height = rows * ROW_H;
  const pos = (id: string) => {
    const n = project.nodes.find((x) => x.id === id);
    if (!n) throw new Error(`ArchDiagram: unknown node "${id}"`);
    return { x: n.col * COL_W + (COL_W - NODE_W) / 2, y: n.row * ROW_H + (ROW_H - NODE_H) / 2 };
  };

  return (
    <div className="overflow-x-auto" data-lenis-prevent-wheel>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        role="img"
        aria-label={`${project.name} architecture: ${project.nodes.map((n) => n.label).join(", ")}`}
        className="mx-auto min-w-[34rem] max-w-full"
      >
        <defs>
          <marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M0 0L10 5L0 10z" fill="var(--line)" />
          </marker>
        </defs>
        {project.edges.map((e) => {
          const a = pos(e.from);
          const b = pos(e.to);
          const x1 = a.x + NODE_W;
          const y1 = a.y + NODE_H / 2;
          const x2 = b.x;
          const y2 = b.y + NODE_H / 2;
          const mid = (x1 + x2) / 2;
          return (
            <path
              key={`${e.from}-${e.to}`}
              d={`M${x1} ${y1} C${mid} ${y1} ${mid} ${y2} ${x2} ${y2}`}
              fill="none"
              stroke="var(--line)"
              strokeWidth={2.5}
              strokeDasharray="6 5"
              markerEnd="url(#arrow)"
            />
          );
        })}
        {project.nodes.map((n) => {
          const p = pos(n.id);
          const dark = n.accent === "cobalt" || n.accent === "terracotta" || n.accent === "forest";
          return (
            <g key={n.id} transform={`translate(${p.x} ${p.y})`}>
              <rect x={0} y={4} width={NODE_W} height={NODE_H} rx={14} fill="var(--line)" />
              <rect width={NODE_W} height={NODE_H} rx={14} fill={accentVar[n.accent]} stroke="var(--line)" strokeWidth={2.5} />
              <text x={NODE_W / 2} y={28} textAnchor="middle" fontSize={15} fontWeight={800} fill={dark ? "#fff8e7" : "#16130f"} style={{ fontFamily: "var(--font-display)" }}>
                {n.label}
              </text>
              {n.sub && (
                <text x={NODE_W / 2} y={47} textAnchor="middle" fontSize={10.5} fill={dark ? "#fff8e7" : "#16130f"} style={{ fontFamily: "var(--font-mono)" }}>
                  {n.sub}
                </text>
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
}
