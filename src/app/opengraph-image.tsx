import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const alt = `${site.name} — ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const svgSource = (svg: Buffer) => `data:image/svg+xml;base64,${svg.toString("base64")}`;

// The supplied artwork, untouched, and Manrope for the labels. Paths stay
// literal so the bundler traces only these three files.
const [logoFile, appIconFile, manrope] = await Promise.all([
  readFile(join(process.cwd(), "public/brand/sdl-primary-white.svg")),
  readFile(join(process.cwd(), "public/brand/sdl-app-icon-light.svg")),
  readFile(join(process.cwd(), "assets/fonts/manrope-latin-500-normal.woff")),
]);
const logo = svgSource(logoFile);
const appIcon = svgSource(appIconFile);

/** Soft glow as an SVG radial gradient — drawn exactly by the image renderer. */
function glow(id: string, hex: string, peak: number) {
  return `<radialGradient id="${id}">${[
    [0, peak],
    [0.4, peak * 0.52],
    [0.7, peak * 0.17],
    [1, 0],
  ]
    .map(([offset, opacity]) => `<stop offset="${offset}" stop-color="${hex}" stop-opacity="${opacity}"/>`)
    .join("")}</radialGradient>`;
}

const ground = svgSource(
  Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">` +
      `<defs>${glow("mint", "#bde7d9", 0.42)}${glow("lavender", "#c9b8ff", 0.4)}</defs>` +
      `<rect width="1200" height="630" fill="#101014"/>` +
      `<circle cx="1150" cy="60" r="500" fill="url(#mint)"/>` +
      `<circle cx="120" cy="650" r="460" fill="url(#lavender)"/>` +
      `</svg>`
  )
);

const label = {
  position: "absolute",
  display: "flex",
  fontSize: 17,
  letterSpacing: "5px",
  textTransform: "uppercase",
  color: "#a8a7ad",
} as const;

/**
 * Share card laid out like the brand guideline cover: charcoal ground, mint
 * glow top right, lavender glow bottom left, the white primary logo and the
 * light app icon.
 */
export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          fontFamily: "Manrope",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element -- rendered by Satori, not the browser */}
        <img src={ground} alt="" width={1200} height={630} style={{ position: "absolute", left: 0, top: 0 }} />

        <div style={{ ...label, top: 64, left: 80 }}>Digital studio</div>
        <div style={{ ...label, top: 64, right: 80 }}>Websites · Applications · Software</div>

        {/* eslint-disable-next-line @next/next/no-img-element -- rendered by Satori, not the browser */}
        <img src={logo} alt="" width={500} height={315} style={{ position: "absolute", left: 80, top: 150 }} />
        {/* eslint-disable-next-line @next/next/no-img-element -- rendered by Satori, not the browser */}
        <img src={appIcon} alt="" width={96} height={96} style={{ position: "absolute", right: 80, bottom: 64 }} />

        <div style={{ ...label, bottom: 64, left: 80, fontSize: 16, letterSpacing: "4px" }}>
          {new URL(site.url).host}
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [{ name: "Manrope", data: manrope, weight: 500, style: "normal" }],
    }
  );
}
