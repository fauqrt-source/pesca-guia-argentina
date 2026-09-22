import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ChefHat, Clock, Users } from "lucide-react";
import { PageShell } from "@/components/site-shell";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  TEMPORADAS,
  getCarnada,
  getEquipo,
  getEspecie,
  getTecnica,
  regiones,
} from "@/data/pesca";
import { getRecetasDeEspecie, soloDevolucion } from "@/data/recetas";

export const Route = createFileRoute("/especie/$especieId")({
  loader: ({ params }) => {
    const especie = getEspecie(params.especieId);
    if (!especie) throw notFound();
    return { especie };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Especie no encontrada | Pesca Argentina" }, { name: "robots", content: "noindex" }],
      };
    }
    const { especie } = loaderData;
    const title = `${especie.nombre}: carnadas, señuelos y equipo | Pesca Argentina`;
    return {
      meta: [
        { title },
        { name: "description", content: especie.descripcion },
        { property: "og:title", content: `${especie.nombre} — guía de pesca` },
        { property: "og:description", content: especie.descripcion },
      ],
    };
  },
  component: EspeciePage,
});

function EspeciePage() {
  const { especie } = Route.useLoaderData();
  const equipo = getEquipo(especie.equipo);
  const donde = regiones.filter((r) => r.especies.includes(especie.id));
  const naturales = especie.carnadas.map(getCarnada).filter((c) => c?.tipo === "natural");
  const artificiales = especie.carnadas.map(getCarnada).filter((c) => c?.tipo === "artificial");
  const recetasEspecie = getRecetasDeEspecie(especie.id);
  const avisoDevolucion = soloDevolucion[especie.id];

  return (
    <PageShell>
      <Link
        to="/"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="size-4" /> Volver al buscador
      </Link>

      <div className="surface-river mt-4 grid gap-5 rounded-xl p-6 shadow-outdoor sm:grid-cols-[220px_minmax(0,1fr)]">
        <img
          src={especie.foto}
          alt={`Foto de ${especie.nombre} (${especie.cientifico})`}
          width={1024}
          height={768}
          className="h-44 w-full rounded-lg object-cover shadow-card sm:h-full"
        />
        <div>
          <h1 className="text-3xl sm:text-4xl">{especie.nombre}</h1>
          <p className="mt-1 text-sm italic opacity-80">{especie.cientifico}</p>
          <p className="mt-3 max-w-prose opacity-95">{especie.detalle}</p>
          <div className="mt-4 flex flex-wrap gap-1.5">
            {especie.temporadas.map((t) => (
              <Badge key={t} variant="secondary">
                {TEMPORADAS.find((x) => x.id === t)?.label}
              </Badge>
            ))}
            <Badge variant="secondary">
              {especie.nivel === "principiante" ? "Apto principiantes" : "Nivel avanzado"}
            </Badge>
          </div>
        </div>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <Card className="shadow-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Carnadas naturales</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            {naturales.length === 0 ? (
              <p className="text-muted-foreground">No se pesca habitualmente con carnada natural.</p>
            ) : (
              naturales.map((c) => (
                <div key={c!.id}>
                  <p className="font-medium">{c!.nombre}</p>
                  <p className="text-muted-foreground">{c!.nota}</p>
                </div>
              ))
            )}
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Señuelos artificiales</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            {artificiales.map((c) => (
              <div key={c!.id}>
                <p className="font-medium">
                  {c!.nombre}{" "}
                  <span className="text-muted-foreground">
                    · {c!.color} · {c!.tamano}
                  </span>
                </p>
                <p className="text-muted-foreground">{c!.nota}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        {equipo ? (
          <Card className="shadow-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Equipo recomendado</CardTitle>
            </CardHeader>
            <CardContent className="text-sm">
              <dl className="space-y-2">
                <div>
                  <dt className="font-medium">Caña</dt>
                  <dd className="text-muted-foreground">{equipo.cana}</dd>
                </div>
                <div>
                  <dt className="font-medium">Reel</dt>
                  <dd className="text-muted-foreground">{equipo.reel}</dd>
                </div>
                <div>
                  <dt className="font-medium">Línea</dt>
                  <dd className="text-muted-foreground">{equipo.linea}</dd>
                </div>
                <div>
                  <dt className="font-medium">Accesorios</dt>
                  <dd className="text-muted-foreground">{equipo.accesorios}</dd>
                </div>
              </dl>
            </CardContent>
          </Card>
        ) : null}

        <Card className="shadow-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Técnicas</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            {especie.tecnicas.map(getTecnica).map((t) => (
              <div key={t!.id}>
                <p className="font-medium">{t!.nombre}</p>
                <p className="text-muted-foreground">{t!.descripcion}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <h2 className="mt-10 text-xl">Dónde encontrarla</h2>
      <div className="mt-3 flex flex-wrap gap-2">
        {donde.map((r) => (
          <Link
            key={r.id}
            to="/resultados"
            search={{
              region: r.id,
              temporada: undefined,
              nivel: undefined,
              modalidad: undefined,
            }}
          >
            <Badge variant="outline" className="px-3 py-1.5">
              {r.spot} · {r.provincia}
            </Badge>
          </Link>
        ))}
      </div>
    </PageShell>
  );
}
