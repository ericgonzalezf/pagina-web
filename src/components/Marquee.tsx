import { stripServices } from "@/config/site";

// Cada copia repite la lista dos veces para que el bucle no deje huecos en pantallas anchas.
function Copy({ hidden = false }: { hidden?: boolean }) {
  const items = [...stripServices, ...stripServices];
  return (
    <div
      aria-hidden={hidden || undefined}
      className="flex shrink-0 items-center gap-9 whitespace-nowrap pr-9 font-mono text-[15px] font-semibold uppercase tracking-[0.12em]"
    >
      {items.map((item, i) => (
        <span key={`${item}-${i}`} className="flex items-center gap-9">
          <span>{item}</span>
          <span aria-hidden="true">◆</span>
        </span>
      ))}
    </div>
  );
}

export default function Marquee() {
  return (
    <div
      aria-label="Servicios"
      className="overflow-hidden bg-accent py-[18px] text-on-accent shadow-[0_0_40px_rgba(255,138,31,0.35)] max-md:shadow-[0_0_20px_rgba(255,138,31,0.25)]"
    >
      <div className="marquee-track">
        <Copy />
        <Copy hidden />
      </div>
    </div>
  );
}
