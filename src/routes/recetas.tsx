import { createFileRoute, Link } from "@tanstack/react-router";
import { ChefHat, Clock, Users } from "lucide-react";
import { PageShell } from "@/components/site-shell";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { especies, getEspecie } from "@/data/pesca";
import { recetas, soloDevolucion } from "@/data/recetas";

export const Route = createFileRoute("/recetas")({
  head: () => ({
    meta: [
      { title: "Recetas de pescados de río y mar | Pesca Argentina" },
      {
        name: "description",
        content:
          "Cómo cocinar lo que pescaste: recetas de surubí, pacú, bagre, boga, corvina, pejerrey y truchas, paso a paso.",
      },
      { property: "og:title", content: "Recetas para tus pescados" },
      {
        property: "og:description",
        content: "Parrilla, horno, frito y escabeche: recetas simples para especies argentinas.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: RecetasPage,
});

function RecetasPage() {
  const devolucion = especies.filter((e) => soloDevolucion[e.id]);

  return (
    <PageShell>
      <div className="surface-river rounded-xl p-6 shadow-outdoor">
        <p className="eyebrow flex items-center gap-1.5 opacity-90">
          <ChefHat className="size-3.5" /> Cocina de pesca
        </p>
        <h1 className="mt-2 text-3xl sm:text-4xl">Recetas para tus pescados</h1>
        <p className="mt-3 max-w-prose opacity-95">
          Recetas simples para preparar lo que trajiste del agua, con el corte y la cocción que mejor
          le va a cada especie. Si vas a llevar pescado, respetá siempre las medidas mínimas y los
          cupos de cada provincia.
        </p>
      </div>

      <div className="mt-6 space-y-6">
        {recetas.map((receta) => {
          const especie = getEspecie(receta.especieId);
          return (
            <Card key={receta.id} className="overflow-hidden shadow-card">
              <CardHeader className="bg-secondary/50">
                <div className="flex items-start gap-4">
                  {especie ? (
                    <img
                      src={especie.foto}
                      alt={`Foto de ${especie.nombre}`}
                      loading="lazy"
                      width={1024}
                      height={768}
                      className="size-20 shrink-0 rounded-lg object-cover shadow-card sm:size-24"
                    />
                  ) : null}
                  <div className="min-w-0">
                    <CardTitle className="text-xl">{receta.nombre}</CardTitle>
                    {especie ? (
                      <p className="mt-1 text-sm text-muted-foreground">
                        <Link
                          to="/especie/$especieId"
                          params={{ especieId: especie.id }}
                          className="hover:text-primary"
                        >
                          {especie.nombre}
                        </Link>
                      </p>
                    ) : null}
                    <div className="mt-2 flex flex-wrap gap-1.5 text-[11px]">
                      <Badge variant="outline" className="gap-1">
                        <Clock className="size-3" /> {receta.tiempo}
                      </Badge>
                      <Badge variant="outline" className="gap-1">
                        <Users className="size-3" /> {receta.porciones}
                      </Badge>
                      <Badge variant="secondary">Dificultad {receta.dificultad}</Badge>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="grid gap-5 pt-5 text-sm sm:grid-cols-2">
                <section>
                  <h2 className="eyebrow text-accent">Ingredientes</h2>
                  <ul className="mt-2 list-disc space-y-1 pl-5 text-muted-foreground">
                    {receta.ingredientes.map((i) => (
                      <li key={i}>{i}</li>
                    ))}
                  </ul>
                </section>
                <section>
                  <h2 className="eyebrow text-accent">Preparación</h2>
                  <ol className="mt-2 list-decimal space-y-1.5 pl-5 text-muted-foreground">
                    {receta.pasos.map((p) => (
                      <li key={p}>{p}</li>
                    ))}
                  </ol>
                  <p className="mt-3 rounded-md border border-border bg-secondary/60 p-3">
                    <span className="font-medium">Tip:</span> {receta.tip}
                  </p>
                </section>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {devolucion.length > 0 ? (
        <>
          <h2 className="mt-10 text-xl">Especies que conviene devolver</h2>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            {devolucion.map((e) => (
              <Card key={e.id} className="shadow-card">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">{e.nombre}</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  {soloDevolucion[e.id]}
                </CardContent>
              </Card>
            ))}
          </div>
        </>
      ) : null}
    </PageShell>
  );
}
