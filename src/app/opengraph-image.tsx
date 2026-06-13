import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Victor Rodrigues — Desenvolvedor Full-Stack";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "64px 80px",
          background: "linear-gradient(135deg, #020817 0%, #0f172a 50%, #111827 100%)",
          color: "#f8fafc",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            marginBottom: 32,
            fontSize: 22,
            color: "#38bdf8",
            fontWeight: 600,
          }}
        >
          <div
            style={{
              width: 12,
              height: 12,
              borderRadius: "50%",
              background: "#38bdf8",
            }}
          />
          Full-Stack Developer
        </div>
        <div style={{ fontSize: 72, fontWeight: 800, letterSpacing: -2, lineHeight: 1.05 }}>
          Victor Rodrigues
        </div>
        <div
          style={{
            marginTop: 24,
            fontSize: 28,
            color: "#94a3b8",
            maxWidth: 800,
            lineHeight: 1.4,
          }}
        >
          Next.js · TypeScript · PostgreSQL · SaaS
        </div>
        <div
          style={{
            marginTop: 48,
            display: "flex",
            gap: 16,
            fontSize: 20,
            color: "#64748b",
          }}
        >
          <span>FlowJersey SaaS</span>
          <span>·</span>
          <span>victorrodrigues.dev</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
