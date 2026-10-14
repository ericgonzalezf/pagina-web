// Genera la imagen para compartir (1200x630) en src/app/opengraph-image.png y twitter-image.png.
// Uso: node scripts/generate-og.mjs
// Solo hay que volver a correrlo si cambian el título, la foto o los colores.
import { writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
import { ImageResponse } from "next/dist/compiled/@vercel/og/index.node.js";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

const FONT_SANS = "https://fonts.gstatic.com/s/geist/v5/gyBhhwUxId8gMGYQMKR3pzfaWI_Re-Q4nQ.ttf";
const FONT_MONO = "https://fonts.gstatic.com/s/geistmono/v6/or3yQ6H-1_WfwkMZI_qYPLs1a-t7PU0AbeEPKJ5T.ttf";

const load = async (url) => Buffer.from(await (await fetch(url)).arrayBuffer());
const [sans, mono] = await Promise.all([load(FONT_SANS), load(FONT_MONO)]);

// La foto trae un aro blanco horneado: se recorta el borde para que solo se vea el anillo naranja.
const SIZE = 380;
const photo = await sharp(path.join(root, "public/images/foto-eric.webp"))
  .extract({ left: 27, top: 27, width: 846, height: 846 })
  .resize(SIZE, SIZE)
  .png()
  .toBuffer();
const photoSrc = `data:image/png;base64,${photo.toString("base64")}`;

const h = (type, style, children) => ({ type, props: { style, children } });

const tree = h(
  "div",
  {
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 84px",
    backgroundColor: "#070605",
    backgroundImage:
      "radial-gradient(ellipse 55% 75% at 0% 0%, rgba(255,122,26,0.22), rgba(255,122,26,0) 70%)",
    fontFamily: "Geist",
    color: "#f2e9dd",
  },
  [
    h("div", { display: "flex", flexDirection: "column", gap: 34 }, [
      h(
        "div",
        { display: "flex", flexDirection: "column", fontSize: 84, fontWeight: 700, lineHeight: 1, letterSpacing: -3.5 },
        [
          h("div", { display: "flex" }, "IA aplicada"),
          {
            type: "div",
            props: {
              style: {
                display: "flex",
                paddingBottom: 10,
                backgroundImage: "linear-gradient(90deg, #ffb224, #ff8a1f 50%, #ee4d2a)",
                backgroundClip: "text",
                color: "transparent",
              },
              children: "sin tecnicismos.",
            },
          },
        ],
      ),
      h(
        "div",
        { display: "flex", alignItems: "center", gap: 16, fontFamily: "Geist Mono", fontSize: 30, color: "#a8998a" },
        [
          h("div", { width: 44, height: 2, backgroundColor: "#ff8a1f", display: "flex" }, ""),
          h("div", { display: "flex" }, "ericgonzalezf.com"),
        ],
      ),
    ]),
    {
      type: "img",
      props: {
        src: photoSrc,
        width: SIZE,
        height: SIZE,
        style: {
          borderRadius: 9999,
          border: "4px solid #ff8a1f",
          boxShadow: "0 0 0 2px rgba(255,178,36,0.35), 0 0 40px rgba(255,138,31,0.55), 0 0 110px rgba(255,138,31,0.25)",
        },
      },
    },
  ],
);

const res = new ImageResponse(tree, {
  width: 1200,
  height: 630,
  fonts: [
    { name: "Geist", data: sans, weight: 700, style: "normal" },
    { name: "Geist Mono", data: mono, weight: 400, style: "normal" },
  ],
});
const png = Buffer.from(await res.arrayBuffer());

for (const name of ["opengraph-image.png", "twitter-image.png"]) {
  await writeFile(path.join(root, "src/app", name), png);
}
console.log("OK", png.length, "bytes");
