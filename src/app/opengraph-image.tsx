import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { clients, profile } from "@/content/profile";

// The share image shown when ioncazac.com is posted on LinkedIn, Slack, X, etc.
// It is generated at build time from the files below.

export const alt = "Ion Cazac - Senior Product Designer · AI-Native Product Builder. design → code → deliver.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Each path is written out in full so the build only bundles these files.
const jpeg = (data: Buffer) => `data:image/jpeg;base64,${data.toString("base64")}`;

const [regular, medium, semibold] = await Promise.all([
  readFile(join(process.cwd(), "assets/fonts/Inter-Regular.ttf")),
  readFile(join(process.cwd(), "assets/fonts/Inter-Medium.ttf")),
  readFile(join(process.cwd(), "assets/fonts/Inter-SemiBold.ttf")),
]);
const portrait = jpeg(await readFile(join(process.cwd(), "public/ion.jpg")));
const flovi = jpeg(await readFile(join(process.cwd(), "assets/og/flovi.jpg")));
const orb = jpeg(await readFile(join(process.cwd(), "assets/og/orb.jpg")));
const profit = jpeg(await readFile(join(process.cwd(), "assets/og/profit.jpg")));

// The first six client logos, recoloured to one grey so the row reads as a calm strip.
const logos = await Promise.all(
  clients.slice(0, 6).map(async (client) => {
    const file = client.logo.replace("/logos/", "");
    const svg = (await readFile(join(process.cwd(), "public", "logos", file), "utf8")).replace(/fill="(?!none)[^"]*"/g, 'fill="#a3a3a3"');
    return {
      name: client.name,
      src: `data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}`,
      width: Math.round((client.width / client.height) * client.display * 0.7),
      height: Math.round(client.display * 0.7),
    };
  }),
);

const card = {
  position: "absolute" as const,
  display: "flex",
  overflow: "hidden",
  boxShadow: "0 30px 60px -20px rgba(15, 23, 42, 0.45)",
};

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          background: "linear-gradient(120deg, #ffffff 0%, #ffffff 52%, #eef1f4 100%)",
          fontFamily: "Inter",
          color: "#0a0a0a",
        }}
      >
        {/* Work collage */}
        <div style={{ ...card, left: 700, top: 54, width: 440, height: 300, transform: "rotate(-5deg)" }}>
          <img src={flovi} width={440} height={300} style={{ objectFit: "cover", objectPosition: "top" }} alt="" />
        </div>
        <div style={{ ...card, left: 740, top: 318, width: 420, height: 250, transform: "rotate(4deg)" }}>
          <img src={orb} width={420} height={250} style={{ objectFit: "cover", objectPosition: "60% 50%" }} alt="" />
        </div>
        <div
          style={{
            ...card,
            left: 1012,
            top: 150,
            width: 170,
            height: 352,
            padding: 6,
            borderRadius: 30,
            background: "#0b0b0d",
            transform: "rotate(8deg)",
          }}
        >
          <img src={profit} width={158} height={340} style={{ objectFit: "cover", objectPosition: "top", borderRadius: 24 }} alt="" />
        </div>

        {/* Text */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            paddingLeft: 76,
            width: 660,
            height: "100%",
          }}
        >
          <img src={portrait} width={112} height={112} style={{ borderRadius: 999, objectFit: "cover" }} alt="" />
          <div style={{ marginTop: 30, fontSize: 84, fontWeight: 600, letterSpacing: -3, lineHeight: 1 }}>{profile.greeting}</div>
          <div style={{ marginTop: 18, display: "flex", flexDirection: "column", fontSize: 28, fontWeight: 500, letterSpacing: -0.5, lineHeight: 1.25 }}>
            {profile.title.split(" · ").map((part, i) => (
              <div key={part}>{i === 0 ? `${profile.name} - ${part}` : part}</div>
            ))}
          </div>
          <div style={{ marginTop: 14, fontSize: 26, color: "#737373" }}>{profile.tagline}</div>
          <div style={{ marginTop: 52, display: "flex", alignItems: "center", gap: 22 }}>
            {logos.map((logo) => (
              <img key={logo.name} src={logo.src} width={logo.width} height={logo.height} alt="" />
            ))}
          </div>
        </div>

        <div style={{ position: "absolute", left: 76, bottom: 40, fontSize: 22, fontWeight: 500, color: "#a3a3a3" }}>
          ioncazac.com
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Inter", data: regular, style: "normal", weight: 400 },
        { name: "Inter", data: medium, style: "normal", weight: 500 },
        { name: "Inter", data: semibold, style: "normal", weight: 600 },
      ],
    },
  );
}
