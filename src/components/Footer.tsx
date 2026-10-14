import { site } from "@/config/site";
import Container from "@/components/Container";

export default function Footer() {
  return (
    <footer className="border-t border-border">
      {/* Espacio inferior extra para que el botón flotante del asistente no tape el pie */}
      <Container className="flex flex-wrap items-center justify-between gap-4 pb-24 pt-8 text-sm text-muted xl:pb-8">
        <div className="font-mono text-foreground">
          eric<span className="text-accent">gonzalezf</span>.com
        </div>
        <div>
          © {new Date().getFullYear()} {site.name} · {site.handle}
        </div>
      </Container>
    </footer>
  );
}
