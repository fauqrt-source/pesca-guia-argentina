import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, MapPin } from "lucide-react";
import { PageShell } from "@/components/site-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  TEMPORADAS,
  getCarnada,
  getEquipo,
  getEspecie,
  getRegion,
  getTecnica,
  type Nivel,
  type Temporada,
} from "@/data/pesca";

type Search = {
  region: string;
  temporada?: Temporada;
  nivel?: Nivel;
  modalidad?: "devolucion" | "consumo";
};

export const Route = createFileRoute("/resultados")({
  validateSearch: (search: Record<string, unknown>): Search => ({
    region: typeof search.region === "string" ? search.region : "",
    temporada: (search.temporada as Temporada) || undefined,
    nivel: (search.nivel as Nivel) || undefined,
    modalidad: (search.modalidad as Search["modalidad"]) || undefined,
  }),
  head: () => ({
    meta: [
      { title: "Recomendación de pesca por zona | Pesca Argentina" },
      {
        name: "description",
        content:
          "Especies, carnadas, señuelos, equipo y técnicas recomendadas para el spot de pesca que elegiste en Argentina.",
      },
      { property: "og:title", content: "Tu recomendación de pesca" },
      {
        property: "og:description",
        content: "Qué llevar y cómo pescar en el spot que elegiste.",
      },
    ],
  }),
  component: ResultadosPage,
});

function ResultadosPage() {
  const search = Route.useSearch();
  const region = getRegion(search.region);

  if (!region) {
    return (
      <PageShell>
        <h1 className="text-2xl">No encontramos esa zona</h1>
        <p className="mt-2 text-muted-foreground">Elegí una región desde el buscador.</p>
        <Button asChild className="mt-6">
          <Link to="/">Volver al inicio</Link>
        </Button>
      </PageShell>
    );
  }

  const todas = region.especies.map(getEspecie).filter(Boolean);
  const filtradas = todas.filter((e) => {
    if (search.temporada && !e!.temporadas.includes(search.temporada)) return false;
    if (search.nivel === "principiante" && e!.nivel !== "principiante") return false;
    if (search.modalidad && !e!.modalidad.includes(search.modalidad)) return false;
    return true;
  });

  const activos = [
    search.temporada && TEMPORADAS.find((t) => t.id === search.temporada)?.label,
    search.nivel === "principiante" ? "Principiante" : search.nivel === "avanzado" ? "Avanzado" : null,
    search.modalidad === "devolucion"
      ? "Con devolución"
      : search.modalidad === "consumo"
        ? "De consumo"
        : null,
  ].filter(Boolean) as string[];

  return (
    <PageShell>
      <Link
        to="/"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="size-4" /> Cambiar zona
      </Link>

      <div className="surface-river mt-4 rounded-xl p-6 shadow-outdoor">
        <p className="eyebrow flex items-center gap-1.5 opacity-90">
          <MapPin className="size-3.5" /> {region.provincia}
        </p>
        <h1 className="mt-2 text-3xl sm:text-4xl">{region.spot}</h1>
        <p className="mt-3 max-w-prose opacity-95">{region.descripcion}</p>
        {activos.length > 0 ? (
          <div className="mt-4 flex flex-wrap gap-1.5">
            {activos.map((a) => (
              <Badge key={a} variant="secondary">
                {a}
              </Badge>
            ))}
          </div>
        ) : null}
      </div>

      <h2 className="mt-10 text-xl">
        Especies recomendadas{" "}
        <span className="text-muted-foreground">({filtradas.length})</span>
      </h2>

      {filtradas.length === 0 ? (
        <p className="mt-3 rounded-md border border-border bg-secondary/60 p-4 text-sm">
          Con esos filtros no hay especies destacadas en este spot. Probá con otra temporada o quitá
          el filtro de nivel.
        </p>
      ) : null}

      <div className="mt-4 space-y-6">
        {filtradas.map((e) => {
          const especie = e!;
          const equipo = getEquipo(especie.equipo);
          const naturales = especie.carnadas.map(getCarnada).filter((c) => c?.tipo === "natural");
          const artificiales = especie.carnadas
            .map(getCarnada)
            .filter((c) => c?.tipo === "artificial");

          return (
            <Card key={especie.id} className="overflow-hidden shadow-card">
              <CardHeader className="bg-secondary/50">
                <div className="flex items-start gap-3">
                  <span className="text-3xl leading-none" aria-hidden>
                    {especie.icono}
                  </span>
                  <div className="min-w-0">
                    <CardTitle className="text-xl">
                      <Link
                        to="/especie/$especieId"
                        params={{ especieId: especie.id }}
                        className="hover:text-primary"
                      >
                        {especie.nombre}
                      </Link>
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">{especie.descripcion}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="grid gap-5 pt-5 text-sm sm:grid-cols-2">
                <section>
                  <h3 className="eyebrow text-accent">Carnadas naturales</h3>
                  <ul className="mt-2 space-y-1.5">
                    {naturales.length === 0 ? (
                      <li className="text-muted-foreground">Se pesca principalmente con señuelo.</li>
                    ) : (
                      naturales.map((c) => (
                        <li key={c!.id}>
                          <span className="font-medium">{c!.nombre}</span>
                          <span className="text-muted-foreground"> — {c!.nota}</span>
                        </li>
                      ))
                    )}
                  </ul>
                </section>

                <section>
                  <h3 className="eyebrow text-accent">Señuelos artificiales</h3>
                  <ul className="mt-2 space-y-1.5">
                    {artificiales.map((c) => (
                      <li key={c!.id}>
                        <span className="font-medium">{c!.nombre}</span>
                        <span className="text-muted-foreground">
                          {" "}
                          — {c!.subtipo} · {c!.color} · {c!.tamano}
                        </span>
                      </li>
                    ))}
                  </ul>
                </section>

                {equipo ? (
                  <section>
                    <h3 className="eyebrow text-accent">Equipo</h3>
                    <ul className="mt-2 space-y-1.5 text-muted-foreground">
                      <li>
                        <span className="font-medium text-foreground">Caña:</span> {equipo.cana}
                      </li>
                      <li>
                        <span className="font-medium text-foreground">Reel:</span> {equipo.reel}
                      </li>
                      <li>
                        <span className="font-medium text-foreground">Línea:</span> {equipo.linea}
                      </li>
                      <li>
                        <span className="font-medium text-foreground">Accesorios:</span>{" "}
                        {equipo.accesorios}
                      </li>
                    </ul>
                  </section>
                ) : null}

                <section>
                  <h3 className="eyebrow text-accent">Técnica recomendada</h3>
                  <ul className="mt-2 space-y-2">
                    {especie.tecnicas.map(getTecnica).map((t) => (
                      <li key={t!.id}>
                        <span className="font-medium">{t!.nombre}</span>
                        <span className="text-muted-foreground"> — {t!.descripcion}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="mt-10 flex flex-wrap gap-3">
        <Button asChild variant="outline">
          <Link to="/senuelos">Ver guía de señuelos</Link>
        </Button>
        <Button asChild>
          <Link to="/">Probar otra zona</Link>
        </Button>
      </div>
    </PageShell>
  );
}
