import { site } from "@/config/site";

export default function Footer() {
  return (
    <footer className="border-t border-border py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-6 text-sm text-muted sm:flex-row">
        <p>
          © {new Date().getFullYear()} {site.name}. Todos los derechos reservados.
        </p>
        <p className="font-mono">{site.handle}</p>
      </div>
    </footer>
  );
}
