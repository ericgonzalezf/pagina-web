import { site } from "@/config/site";

export function waLink(text: string) {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`;
}

// Cada entrada usa un saludo distinto: al leer el mensaje en WhatsApp se sabe desde dónde
// escribió la persona (portada, contacto o asistente), sin depender de ninguna herramienta.
export const WA_SALUDO =
  "Hola Eric, vi tu página y me gustaría platicar sobre mi negocio";

export const WA_SALUDO_CONTACTO =
  "Hola Eric, revisé tu página y quiero platicar contigo. Te cuento lo que necesito:";

export const WA_SALUDO_CHAT =
  "Hola Eric, vengo del asistente de tu página y quiero seguir la plática por aquí";
