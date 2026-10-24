export function esc(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");
}

export function xmlResponse(body: string, type: string): Response {
  return new Response(body, { headers: { "Content-Type": `${type}; charset=utf-8`, "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400" } });
}
