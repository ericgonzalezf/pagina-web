import { site } from "@/config/site";
import { IconInstagram, IconThreads, IconLinkedIn, IconTikTok } from "@/components/social-icons";
import Reveal from "@/components/Reveal";

const socialLinks = [
  { href: site.social.threads, label: "Threads", Icon: IconThreads },
  { href: site.social.instagram, label: "Instagram", Icon: IconInstagram },
  { href: site.social.linkedin, label: "LinkedIn", Icon: IconLinkedIn },
  { href: site.social.tiktok, label: "TikTok", Icon: IconTikTok },
];

export default function Contact() {
  return (
    <section id="contacto" className="relative overflow-hidden border-t border-border py-24">
      <div className="glow left-1/2 top-0 h-80 w-80 -translate-x-1/2 bg-accent" />

      <Reveal className="relative z-10 mx-auto max-w-2xl px-6 text-center">
        <span className="font-mono text-sm text-accent-2">03 · Contacto</span>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
          ¿Listo para caminar juntos?
        </h2>
        <p className="mt-4 text-lg text-muted">
          Cuéntame sobre tu proyecto de IA, tu página web o tu marca personal. Te respondo directamente.
        </p>

        <a
          href={`mailto:${site.email}`}
          className="mt-10 inline-flex items-center gap-2 rounded-full bg-accent px-8 py-4 text-base font-medium text-white shadow-[0_0_30px_-6px_var(--accent)] transition-transform hover:scale-105"
        >
          <span className="font-mono text-white/70">&gt;</span> {site.email}
        </a>

        <div className="mt-12 flex justify-center gap-4">
          {socialLinks.map(({ href, label, Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-border text-muted transition-colors hover:border-accent hover:text-accent"
            >
              <Icon className="h-5 w-5" />
            </a>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
