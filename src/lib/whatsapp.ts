import { site } from "@/config/site";

export function waLink(text: string) {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`;
}

export const WA_SALUDO =
  "Hola Eric, vi tu página y me gustaría platicar sobre mi negocio";
