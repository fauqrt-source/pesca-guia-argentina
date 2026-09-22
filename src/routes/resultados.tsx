import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, MapPin, Wind } from "lucide-react";
import { PageShell } from "@/components/site-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  AMBIENTES,
  TEMPORADAS,
  filtrarRegiones,
  getCarnada,
  getEquipo,
  getEspecie,
  getRegion,
  getTecnica,
  type Especie,
  type Nivel,
  type Temporada,
} from "@/data/pesca";

type Search = {
  region?: string | undefined;
  provincia?: string | undefined;
  ambiente?: string | undefined;
  temporada?: Temporada | undefined;
  nivel?: Nivel | undefined;
  modalidad?: "devolucion" | "consumo" | undefined;
};

export const Route = createFileRoute("/resultados")({
  validateSearch: (search: Record<string, unknown>): Search => ({
    region: typeof search["region"] === "string" ? (search["region"] as string) : undefined,
    provincia: typeof search["provincia"] === "string" ? (search["provincia"] as string) : undefined,
    ambiente: typeof search["ambiente"] === "string" ? (search["ambiente"] as string) : undefined,
    temporada: (search["temporada"] as Temporada) || undefined,
    nivel: (search["nivel"] as Nivel) || undefined,
    modalidad: (search["modalidad"] as Search["modalidad"]) || undefined,
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
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ResultadosPage,
});

function ResultadosPage() {
  const search = Route.useSearch();
  const region = search.region ? getRegion(search.region) : undefined;

  const zonas = region ? [region] : filtrarRegiones(search.provincia, search.ambiente);

  if (zonas.length === 0) {
    return (
      <PageShell>
        <h1 className="text-2xl">No encontramos zonas con esos datos</h1>
        <p className="mt-2 text-muted-foreground">
          Probá con otra provincia o ambiente desde el buscador.
        </p>
        <Button asChild className="mt-6">
          <Link to="/">Volver al inicio</Link>
        </Button>
      </PageShell>
    );
  }

  const titulo = region
    ? region.spot
    : [
        search.ambiente && search.ambiente !== "todos"
          ? AMBIENTES.find((a) => a.id === search.ambiente)?.label
          : "Todos los ambientes",
        search.provincia && search.provincia !== "todos" ? search.provincia : "Argentina",
      ].join(" · ");

  const subtitulo = region
    ? region.descripcion
    : `${zonas.length} ${zonas.length === 1 ? "zona" : "zonas"} cargadas para esta búsqueda: ${zonas
        .map((z) => z.spot)
        .join(", ")}.`;

  const provinciaTitulo = region
    ? region.provincia
    : search.provincia && search.provincia !== "todos"
      ? search.provincia
      : "Argentina";

  const ids = Array.from(new Set(zonas.flatMap((z) => z.especies)));
  const todas = ids.map(getEspecie).filter((e): e is Especie => Boolean(e));

  const filtradas = todas.filter((e) => {
    if (search.temporada && !e.temporadas.includes(search.temporada)) return false;
    if (search.nivel === "principiante" && e.nivel !== "principiante") return false;
    if (search.modalidad && !e.modalidad.includes(search.modalidad)) return false;
    return true;
  });

  const sinCoincidencias = filtradas.length === 0 && todas.length > 0;
  const mostradas = sinCoincidencias ? todas : filtradas;

  const activos = [
    search.temporada && TEMPORADAS.find((t) => t.id === search.temporada)?.label,
    search.nivel === "principiante"
      ? "Principiante"
      : search.nivel === "avanzado"
        ? "Avanzado"
        : null,
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
          <MapPin className="size-3.5" /> {provinciaTitulo}
        </p>
        <h1 className="mt-2 text-3xl sm:text-4xl">{titulo}</h1>
        <p className="mt-3 max-w-prose opacity-95">{subtitulo}</p>
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

      {!region && zonas.length > 1 ? (
        <div className="mt-4 flex flex-wrap gap-2">
          {zonas.map((z) => (
            <Link
              key={z.id}
              to="/resultados"
              search={(prev) => ({ ...prev, region: z.id })}
            >
              <Badge variant="outline" className="px-3 py-1.5">
                {z.spot}
              </Badge>
            </Link>
          ))}
        </div>
      ) : null}

      <h2 className="mt-10 text-xl">
        Especies recomendadas <span className="text-muted-foreground">({mostradas.length})</span>
      </h2>

      {sinCoincidencias ? (
        <p className="mt-3 rounded-md border border-border bg-secondary/60 p-4 text-sm">
          Con esos filtros no había coincidencias exactas, así que te mostramos todas las especies de
          la zona ordenadas igual. Probá con otra temporada o quitá el filtro de nivel para afinar.
        </p>
      ) : null}

      <div className="mt-4 space-y-6">
        {mostradas.map((especie) => {
          const equipo = getEquipo(especie.equipo);
          const naturales = especie.carnadas.map(getCarnada).filter((c) => c?.tipo === "natural");
          const artificiales = especie.carnadas
            .map(getCarnada)
            .filter((c) => c?.tipo === "artificial");

          return (
            <Card key={especie.id} className="overflow-hidden shadow-card">
              <CardHeader className="bg-secondary/50">
                <div className="flex items-start gap-4">
                  <img
                    src={especie.foto}
                    alt={`Foto de ${especie.nombre} (${especie.cientifico})`}
                    loading="lazy"
                    width={1024}
                    height={768}
                    className="size-24 shrink-0 rounded-lg object-cover shadow-card sm:size-32"
                  />
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
                    <p className="text-xs italic text-muted-foreground">{especie.cientifico}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{especie.descripcion}</p>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {especie.temporadas.map((t) => (
                        <Badge key={t} variant="outline" className="text-[11px]">
                          {TEMPORADAS.find((x) => x.id === t)?.label}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="grid gap-5 pt-5 text-sm sm:grid-cols-2">
                <section>
                  <h3 className="eyebrow text-accent">Carnadas naturales</h3>
                  <ul className="mt-2 space-y-1.5">
                    {naturales.length === 0 ? (
                      <li className="text-muted-foreground">
                        Se pesca principalmente con señuelo.
                      </li>
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
                    {artificiales.length === 0 ? (
                      <li className="text-muted-foreground">
                        Mejor con carnada natural que con señuelo.
                      </li>
                    ) : (
                      artificiales.map((c) => (
                        <li key={c!.id}>
                          <span className="font-medium">{c!.nombre}</span>
                          <span className="text-muted-foreground">
                            {" "}
                            — {c!.subtipo} · {c!.color} · {c!.tamano}
                          </span>
                        </li>
                      ))
                    )}
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
          <Link to="/viento">
            <Wind className="size-4" /> Ver mapa del viento
          </Link>
        </Button>
        <Button asChild variant="outline">
          <Link to="/senuelos">Ver guía de señuelos</Link>
        </Button>
        <Button asChild variant="outline">
          <Link to="/recetas">Ver recetas</Link>
        </Button>
        <Button asChild>
          <Link to="/">Probar otra zona</Link>
        </Button>
      </div>
    </PageShell>
  );
}
