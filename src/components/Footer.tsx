import { site } from "@/config/site";
import Container from "@/components/Container";

export default function Footer() {
  return (
    <footer className="border-t border-border py-8">
      <Container className="flex flex-col items-center justify-between gap-3 text-sm text-muted sm:flex-row">
        <p>
          © {new Date().getFullYear()} {site.name}. Todos los derechos reservados.
        </p>
      </Container>
    </footer>
  );
}
