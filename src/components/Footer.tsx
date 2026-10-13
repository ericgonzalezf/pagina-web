import { site } from "@/config/site";
import Container from "@/components/Container";

export default function Footer() {
  return (
    <footer className="border-t border-border">
      <Container className="flex flex-wrap items-center justify-between gap-4 py-8 text-sm text-muted">
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
