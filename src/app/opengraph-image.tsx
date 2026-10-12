import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const alt = `${site.name} — Digital ideas. Engineered into reality.`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Share card generated at build time from the site palette:
 * jet black ground, off-white type, pale taupe accent.
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
          background: "#1e1e20",
          padding: "72px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "18px" }}>
          <div style={{ width: "14px", height: "14px", borderRadius: "999px", background: "#c9c7ba" }} />
          <div
            style={{
              fontSize: "24px",
              letterSpacing: "6px",
              textTransform: "uppercase",
              color: "rgba(244,242,236,0.75)",
            }}
          >
            {site.name}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: "92px",
              fontWeight: 700,
              lineHeight: 1,
              letterSpacing: "-3px",
              color: "#f4f2ec",
            }}
          >
            Digital ideas.
          </div>
          <div
            style={{
              display: "flex",
              fontSize: "92px",
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: "-3px",
              color: "#c9c7ba",
            }}
          >
            Engineered into reality.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            borderTop: "1px solid rgba(244,242,236,0.15)",
            paddingTop: "28px",
            fontSize: "22px",
            letterSpacing: "4px",
            textTransform: "uppercase",
            color: "rgba(244,242,236,0.55)",
          }}
        >
          <div style={{ display: "flex" }}>Strategy · Design · Engineering</div>
          <div style={{ display: "flex" }}>Digital studio</div>
        </div>
      </div>
    ),
    size
  );
}
