import { site } from "@/config/site";
import { waLink, WA_SALUDO } from "@/lib/whatsapp";
import {
  IconInstagram,
  IconLinkedIn,
  IconThreads,
  IconTikTok,
  IconWhatsApp,
  IconYouTube,
} from "@/components/icons";
import Container from "@/components/Container";

const socialLinks = [
  { href: site.social.instagram, label: "Instagram", Icon: IconInstagram },
  { href: site.social.threads, label: "Threads", Icon: IconThreads },
  // Sin URL de LinkedIn todavía, el ícono abre WhatsApp (ver site.social.linkedin).
  { href: site.social.linkedin || waLink(WA_SALUDO), label: "LinkedIn", Icon: IconLinkedIn },
  { href: site.social.tiktok, label: "TikTok", Icon: IconTikTok },
  { href: site.social.youtube, label: "YouTube", Icon: IconYouTube },
];

export default function Contact() {
  return (
    <section
      id="contacto"
      className="sec-contacto relative overflow-hidden border-t border-accent/50"
    >
      <Container className="relative flex flex-col items-center gap-7 py-24 text-center sm:py-32">
        <div className="font-mono text-sm text-accent">06 · Contacto</div>
        <h2 className="m-0 text-[clamp(44px,6.5vw,84px)] font-bold leading-none tracking-[-0.04em] text-foreground">
          ¿Listo para
          <br />
          <span className="text-brand">caminar juntos?</span>
        </h2>
        <p className="m-0 max-w-[560px] text-lg leading-[1.55] text-muted sm:text-xl">
          Cuéntame de tu negocio o de lo que quieres aprender. Te respondo yo, directamente.
        </p>

        <div className="flex flex-wrap justify-center gap-3 pt-2">
          <a
            href={waLink(WA_SALUDO)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary inline-flex min-h-14 items-center gap-2.5 rounded-full px-[30px] text-[17px]"
          >
            <IconWhatsApp className="h-5 w-5" />
            Escríbeme por WhatsApp
          </a>
          <a
            href={`mailto:${site.email}`}
            className="btn btn-ghost inline-flex min-h-14 items-center rounded-full px-[30px] text-[17px]"
          >
            {site.email}
          </a>
        </div>

        <ul className="m-0 flex list-none gap-3 p-0 pt-4">
          {socialLinks.map(({ href, label, Icon }) => (
            <li key={label}>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="flex h-[46px] w-[46px] items-center justify-center rounded-full border border-accent/45 text-foreground hover:border-accent hover:text-accent-highlight"
              >
                <Icon className="h-5 w-5" />
              </a>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
