const items = [
  "INTELIGENCIA ARTIFICIAL",
  "AUTOMATIZACIÓN",
  "CHATBOTS",
  "DESARROLLO WEB",
  "MARCA PERSONAL",
  "MACHINE LEARNING",
];

export default function Marquee() {
  const track = [...items, ...items];

  return (
    <div className="relative overflow-hidden border-y border-border py-4">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-background to-transparent" />

      <div className="flex w-max animate-marquee gap-10 whitespace-nowrap">
        {track.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="flex items-center gap-10 font-mono text-sm tracking-widest text-muted"
          >
            {item}
            <span className="text-accent-2">◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}
