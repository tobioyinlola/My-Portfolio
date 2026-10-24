import { ImageResponse } from "next/og";

const COLORS = ["#2340e0", "#f5b50a", "#b53a10", "#1d6b43", "#c9b6f2"];

export function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title = (searchParams.get("title") ?? "Justus").slice(0, 120);
  const kicker = (searchParams.get("kicker") ?? "Justus").slice(0, 40);
  const words = title.split(" ");

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", background: "#f4ede0", padding: 64, color: "#16130f" }}>
        <div style={{ display: "flex", gap: 12 }}>
          {COLORS.map((c) => (
            <div key={c} style={{ width: 44, height: 44, background: c, border: "4px solid #16130f" }} />
          ))}
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
          {words.map((w, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                fontSize: words.length > 8 ? 64 : 88,
                fontWeight: 900,
                letterSpacing: -3,
                padding: "0 18px",
                background: COLORS[i % COLORS.length],
                color: i % 5 === 1 || i % 5 === 4 ? "#16130f" : "#fff8e7",
              }}
            >
              {w}
            </div>
          ))}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 30, fontWeight: 700 }}>
          <span>{kicker.toUpperCase()}</span>
          <span>AI PRODUCT MANAGER</span>
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
