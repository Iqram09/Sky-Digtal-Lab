import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const alt = `${site.name} — ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Share card generated at build time from the same palette as the site:
 * near-black ground, off-white type, one lime accent.
 */
export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#050505",
          padding: "72px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "18px" }}>
          <div
            style={{
              width: "16px",
              height: "16px",
              borderRadius: "999px",
              background: "#c9ff4a",
            }}
          />
          <div
            style={{
              fontSize: "24px",
              letterSpacing: "6px",
              textTransform: "uppercase",
              color: "rgba(245,245,240,0.7)",
            }}
          >
            {site.name}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: "84px",
              fontWeight: 700,
              lineHeight: 1.02,
              letterSpacing: "-3px",
              color: "#F5F5F0",
            }}
          >
            WE BUILD DIGITAL SYSTEMS
          </div>
          <div
            style={{
              display: "flex",
              fontSize: "84px",
              fontWeight: 700,
              lineHeight: 1.02,
              letterSpacing: "-3px",
              color: "#c9ff4a",
            }}
          >
            THAT MOVE BUSINESSES FORWARD.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            borderTop: "1px solid rgba(245,245,240,0.15)",
            paddingTop: "28px",
            fontSize: "22px",
            letterSpacing: "4px",
            textTransform: "uppercase",
            color: "rgba(245,245,240,0.5)",
          }}
        >
          <div style={{ display: "flex" }}>{site.tagline}</div>
          <div style={{ display: "flex" }}>Digital product studio</div>
        </div>
      </div>
    ),
    size
  );
}
