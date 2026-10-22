import { createFileRoute, Link } from "@tanstack/react-router";
import { Heart, Loader2, MapPin, Wind } from "lucide-react";
import { PageShell } from "@/components/site-shell";
import { BotonFavorito } from "@/components/boton-favorito";
import { useFavoritos } from "@/hooks/use-favoritos";
import { getRegion } from "@/data/pesca";
import { PUNTOS } from "@/lib/viento";

export const Route = createFileRoute("/_authenticated/favoritos")({
  head: () => ({
    meta: [
      { title: "Mis favoritos | Pesca Argentina" },
      { name: "description", content: "Tus pesqueros y zonas de viento guardados." },
      { property: "og:title", content: "Mis favoritos | Pesca Argentina" },
      { property: "og:description", content: "Pesqueros y zonas de viento guardados." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: FavoritosPage,
});

function FavoritosPage() {
  const { lista, cargando, isError } = useFavoritos();
  const spots = lista.filter((f) => f.tipo === "spot").map((f) => getRegion(f.spot_id)).filter((r) => !!r);
  const vientos = lista
    .filter((f) => f.tipo === "viento")
    .map((f) => PUNTOS.find((p) => p.id === f.spot_id))
    .filter((p) => !!p);

  return (
    <PageShell>
      <p className="eyebrow flex items-center gap-1.5 text-accent">
        <Heart className="size-3.5" /> Tu cuenta
      </p>
      <h1 className="mt-1 text-3xl sm:text-4xl">Mis Favoritos</h1>

      {cargando ? (
        <p className="mt-8 flex items-center gap-2 text-muted-foreground" role="status">
          <Loader2 className="size-5 animate-spin" /> Cargando favoritos…
        </p>
      ) : isError ? (
        <p className="mt-8 rounded-md border border-border bg-secondary/60 p-4">No pudimos cargar tus favoritos. Reintentá en unos minutos.</p>
      ) : lista.length === 0 ? (
        <div className="mt-8 rounded-xl border border-border bg-card p-6 text-center shadow-card">
          <p>Todavía no guardaste favoritos.</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Tocá el corazón en un pesquero o en el <Link to="/viento" className="underline">mapa del viento</Link>.
          </p>
        </div>
      ) : (
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <section>
            <h2 className="flex items-center gap-1.5 text-xl"><MapPin className="size-4" /> Pesqueros</h2>
            {spots.length === 0 ? (
              <p className="mt-2 text-sm text-muted-foreground">Ninguno todavía.</p>
            ) : (
              <ul className="mt-3 divide-y divide-border rounded-xl border border-border bg-card shadow-card">
                {spots.map((r) => (
                  <li key={r.id} className="flex items-center justify-between gap-3 px-4 py-2.5">
                    <Link to="/resultados" search={{ region: r.id }} className="min-w-0 hover:underline">
                      <p className="truncate text-sm font-medium">{r.spot}</p>
                      <p className="text-xs text-muted-foreground">{r.provincia}</p>
                    </Link>
                    <BotonFavorito tipo="spot" id={r.id} nombre={r.spot} />
                  </li>
                ))}
              </ul>
            )}
          </section>
          <section>
            <h2 className="flex items-center gap-1.5 text-xl"><Wind className="size-4" /> Zonas de viento</h2>
            {vientos.length === 0 ? (
              <p className="mt-2 text-sm text-muted-foreground">Ninguna todavía.</p>
            ) : (
              <ul className="mt-3 divide-y divide-border rounded-xl border border-border bg-card shadow-card">
                {vientos.map((p) => (
                  <li key={p.id} className="flex items-center justify-between gap-3 px-4 py-2.5">
                    <Link to="/viento" className="min-w-0 hover:underline">
                      <p className="truncate text-sm font-medium">{p.nombre}</p>
                      <p className="text-xs text-muted-foreground">{p.provincia}</p>
                    </Link>
                    <BotonFavorito tipo="viento" id={p.id} nombre={p.nombre} />
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>
      )}
    </PageShell>
  );
}
