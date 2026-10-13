import { createFileRoute, Link } from "@tanstack/react-router";
import { CalendarDays, MapPin, Trophy } from "lucide-react";
import { PageShell } from "@/components/site-shell";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getEspecie } from "@/data/pesca";
import { torneos } from "@/data/torneos";

export const Route = createFileRoute("/torneos")({
  head: () => ({
    meta: [
      { title: "Torneos de pesca en Argentina | Pesca Argentina" },
      {
        name: "description",
        content:
          "Los torneos de pesca más importantes de Argentina: Fiesta Nacional del Surubí en Goya, el Dorado en Paso de la Patria y el Pejerrey en Chascomús.",
      },
      { property: "og:title", content: "Torneos de pesca en Argentina" },
      {
        property: "og:description",
        content: "Fechas, modalidad y consejos para los concursos de pesca más convocantes del país.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: TorneosPage,
});

function TorneosPage() {
  return (
    <PageShell>
      <div className="surface-river rounded-xl p-6 shadow-outdoor">
        <p className="eyebrow flex items-center gap-1.5 opacity-90">
          <Trophy className="size-3.5" /> Concursos
        </p>
        <h1 className="mt-2 text-3xl sm:text-4xl">Torneos de pesca en Argentina</h1>
        <p className="mt-3 max-w-prose opacity-95">
          Los encuentros más importantes del calendario. Las fechas exactas cambian cada año:
          confirmalas con la organización antes de viajar.
        </p>
      </div>

      <div className="mt-8 space-y-6">
        {torneos.map((t) => {
          const especie = t.especieId ? getEspecie(t.especieId) : undefined;
          return (
            <Card key={t.id} className="overflow-hidden shadow-card">
              <CardHeader className="bg-secondary/50">
                <div className="flex items-start gap-4">
                  {especie ? (
                    <img
                      src={especie.foto}
                      alt={`Foto de ${especie.nombre}`}
                      loading="lazy"
                      className="size-20 shrink-0 rounded-lg object-cover sm:size-28"
                    />
                  ) : null}
                  <div className="min-w-0">
                    <CardTitle className="text-xl">{t.nombre}</CardTitle>
                    <div className="mt-2 flex flex-wrap gap-1.5 text-xs">
                      <Badge variant="outline" className="gap-1">
                        <MapPin className="size-3" /> {t.localidad}, {t.provincia}
                      </Badge>
                      <Badge variant="outline" className="gap-1">
                        <CalendarDays className="size-3" /> {t.epoca}
                      </Badge>
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground">{t.modalidad}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4 pt-5 text-sm">
                <p>{t.descripcion}</p>
                <ul className="list-disc space-y-1 pl-5 text-muted-foreground">
                  {t.datos.map((d) => (
                    <li key={d}>{d}</li>
                  ))}
                </ul>
                {especie ? (
                  <Link
                    to="/especie/$especieId"
                    params={{ especieId: especie.id }}
                    className="inline-block font-medium text-primary hover:underline"
                  >
                    Ver ficha del {especie.nombre.toLowerCase()} →
                  </Link>
                ) : null}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </PageShell>
  );
}
