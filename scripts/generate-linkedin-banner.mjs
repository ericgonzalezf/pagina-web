// Genera el banner de LinkedIn (1584x396) en referencia/linkedin-banner.png (carpeta ignorada por git).
// Uso: node scripts/generate-linkedin-banner.mjs
// En LinkedIn la foto de perfil tapa la esquina inferior izquierda, por eso el texto va a la derecha.
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { ImageResponse } from "next/dist/compiled/@vercel/og/index.node.js";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const FONT_SANS = "https://fonts.gstatic.com/s/geist/v5/gyBhhwUxId8gMGYQMKR3pzfaWI_Re-Q4nQ.ttf";
const FONT_MONO = "https://fonts.gstatic.com/s/geistmono/v6/or3yQ6H-1_WfwkMZI_qYPLs1a-t7PU0AbeEPKJ5T.ttf";
const load = async (url) => Buffer.from(await (await fetch(url)).arrayBuffer());
const [sans, mono] = await Promise.all([load(FONT_SANS), load(FONT_MONO)]);

const h = (type, style, children) => ({ type, props: { style, children } });

const tree = h(
  "div",
  {
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    paddingLeft: 470,
    backgroundColor: "#070605",
    backgroundImage:
      "radial-gradient(ellipse 45% 110% at 100% 0%, rgba(255,122,26,0.26), rgba(255,122,26,0) 70%), radial-gradient(ellipse 30% 90% at 0% 100%, rgba(255,122,26,0.12), rgba(255,122,26,0) 70%)",
    fontFamily: "Geist",
    color: "#f2e9dd",
  },
  h("div", { display: "flex", flexDirection: "column", gap: 22 }, [
    h(
      "div",
      { display: "flex", flexDirection: "column", fontSize: 76, fontWeight: 700, lineHeight: 1, letterSpacing: -3 },
      [
        h("div", { display: "flex" }, "IA aplicada"),
        h(
          "div",
          {
            display: "flex",
            paddingBottom: 8,
            backgroundImage: "linear-gradient(90deg, #ffb224, #ff8a1f 50%, #ee4d2a)",
            backgroundClip: "text",
            color: "transparent",
          },
          "sin tecnicismos.",
        ),
      ],
    ),
    h(
      "div",
      { display: "flex", alignItems: "center", gap: 14, fontFamily: "Geist Mono", fontSize: 24, color: "#a8998a" },
      [
        h("div", { width: 36, height: 2, backgroundColor: "#ff8a1f", display: "flex" }, ""),
        h("div", { display: "flex" }, "25 años emprendiendo · IA después de los 40"),
      ],
    ),
    h("div", { display: "flex", fontFamily: "Geist Mono", fontSize: 24, color: "#ff8a1f" }, "ericgonzalezf.com"),
  ]),
);

const res = new ImageResponse(tree, {
  width: 1584,
  height: 396,
  fonts: [
    { name: "Geist", data: sans, weight: 700, style: "normal" },
    { name: "Geist Mono", data: mono, weight: 400, style: "normal" },
  ],
});
await mkdir(path.join(root, "referencia"), { recursive: true });
await writeFile(path.join(root, "referencia/linkedin-banner.png"), Buffer.from(await res.arrayBuffer()));
console.log("OK");
