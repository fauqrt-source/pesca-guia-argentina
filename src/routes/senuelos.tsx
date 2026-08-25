import { createFileRoute, Link } from "@tanstack/react-router";
import { carnadas, especies } from "@/data/pesca";
import { PageShell } from "@/components/site-shell";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const Route = createFileRoute("/senuelos")({
  head: () => ({
    meta: [
      { title: "Guía de señuelos y carnadas | Pesca Argentina" },
      {
        name: "description",
        content:
          "Catálogo de señuelos artificiales y carnadas naturales para pesca deportiva en Argentina: tipo, color, tamaño sugerido y especies objetivo.",
      },
      { property: "og:title", content: "Guía de señuelos y carnadas" },
      {
        property: "og:description",
        content: "Cucharas, poppers, minnows, jigs, softbaits y carnadas naturales por especie.",
      },
    ],
  }),
  component: SenuelosPage,
});

function especiesDe(carnadaId: string) {
  return especies.filter((e) => e.carnadas.includes(carnadaId));
}

function SenuelosPage() {
  const artificiales = carnadas.filter((c) => c.tipo === "artificial");
  const naturales = carnadas.filter((c) => c.tipo === "natural");

  return (
    <PageShell>
      <p className="eyebrow text-accent">Catálogo</p>
      <h1 className="mt-1 text-3xl sm:text-4xl">Guía de señuelos y carnadas</h1>
      <p className="mt-3 max-w-prose text-muted-foreground">
        Qué usar, en qué color y tamaño, y a qué especie apunta cada opción. Los colores claros y
        naturales rinden en agua cristalina; los fuertes (chartreuse, naranja) en agua con barro.
      </p>

      <h2 className="mt-10 text-xl">Señuelos artificiales</h2>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        {artificiales.map((c) => (
          <Card key={c.id} className="shadow-card">
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between gap-2">
                <CardTitle className="text-base">{c.nombre}</CardTitle>
                {c.subtipo ? <Badge variant="secondary">{c.subtipo}</Badge> : null}
              </div>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <dl className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-1 text-muted-foreground">
                <dt className="font-medium text-foreground">Color</dt>
                <dd>{c.color}</dd>
                <dt className="font-medium text-foreground">Tamaño</dt>
                <dd>{c.tamano}</dd>
              </dl>
              <p className="text-muted-foreground">{c.nota}</p>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {especiesDe(c.id).map((e) => (
                  <Link key={e.id} to="/especie/$especieId" params={{ especieId: e.id }}>
                    <Badge variant="outline">{e.nombre}</Badge>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <h2 className="mt-12 text-xl">Carnadas naturales</h2>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        {naturales.map((c) => (
          <Card key={c.id} className="shadow-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">{c.nombre}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <p className="text-muted-foreground">{c.nota}</p>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {especiesDe(c.id).map((e) => (
                  <Link key={e.id} to="/especie/$especieId" params={{ especieId: e.id }}>
                    <Badge variant="outline">{e.nombre}</Badge>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </PageShell>
  );
}
