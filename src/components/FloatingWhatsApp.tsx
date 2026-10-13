import { IconWhatsApp } from "@/components/icons";
import { waLink, WA_SALUDO } from "@/lib/whatsapp";

export default function FloatingWhatsApp() {
  return (
    <a
      href={waLink(WA_SALUDO)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escríbeme por WhatsApp"
      className="btn fixed bottom-4 right-3 z-40 flex h-[52px] w-[52px] items-center justify-center rounded-full border border-accent/60 bg-surface !text-accent shadow-[0_0_20px_rgba(255,138,31,0.3),0_12px_30px_rgba(0,0,0,0.5)] hover:border-accent sm:bottom-7 sm:right-7 sm:h-[58px] sm:w-[58px]"
    >
      <IconWhatsApp className="h-6 w-6" />
    </a>
  );
}
