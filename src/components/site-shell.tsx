import { Link } from "@tanstack/react-router";
import { Fish } from "lucide-react";
import type { ReactNode } from "react";
import { UserMenu } from "./user-menu";

const nav = [
  { to: "/", label: "Inicio" },
  { to: "/viento", label: "Viento" },
  { to: "/senuelos", label: "Señuelos" },
  { to: "/recetas", label: "Recetas" },
  { to: "/torneos", label: "Torneos" },
  { to: "/favoritos", label: "Mis Favoritos" },
  { to: "/capturas", label: "Mis Capturas" },
  { to: "/sobre", label: "Sobre" },
] as const;

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-x-4 gap-y-2 px-4 py-3">
        <Link to="/" className="flex items-center gap-2">
          <span className="surface-river flex size-9 items-center justify-center rounded-md">
            <Fish className="size-5" />
          </span>
          <span className="font-display text-lg leading-none tracking-wide uppercase">
            Pesca Argentina
          </span>
        </Link>
        <div className="md:order-last">
          <UserMenu />
        </div>
        <nav className="-mx-1 flex w-full items-center gap-1 overflow-x-auto text-sm md:mx-0 md:w-auto">
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="shrink-0 rounded-md px-2.5 py-1.5 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              activeProps={{ className: "bg-secondary text-foreground" }}
              activeOptions={{ exact: item.to === "/" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-border bg-secondary/60">
      <div className="mx-auto max-w-5xl px-4 py-8 text-sm text-muted-foreground">
        <p className="font-display uppercase tracking-wide text-foreground">Pesca Argentina</p>
        <p className="mt-2 max-w-prose">
          Recomendaciones orientativas de pesca deportiva. Respetá siempre las vedas, medidas
          mínimas y reglamentos de cada provincia.
        </p>
      </div>
    </footer>
  );
}

export function PageShell({ children }: { children: ReactNode }) {
  return <div className="mx-auto max-w-5xl px-4 py-8">{children}</div>;
}
