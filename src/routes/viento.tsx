import { createFileRoute } from "@tanstack/react-router";
import { queryOptions, useQuery } from "@tanstack/react-query";
import { Loader2, Wind } from "lucide-react";
import { PageShell } from "@/components/site-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getMapaViento, type PuntoViento } from "@/lib/viento.functions";

const vientoQueryOptions = queryOptions({
  queryKey: ["viento", "argentina"],
  queryFn: () => getMapaViento(),
  staleTime: 1000 * 60 * 60, // 1 hora
  retry: 1,
});

export const Route = createFileRoute("/viento")({
  head: () => ({
    meta: [
      { title: "Mapa del viento en Argentina para pescar | Pesca Argentina" },
      {
        name: "description",
        content:
          "Mapa del viento en Argentina actualizado todos los días: velocidad, ráfagas y dirección en los principales spots de pesca del país.",
      },
      { property: "og:title", content: "Mapa del viento en Argentina" },
      {
        property: "og:description",
        content: "Viento y ráfagas actualizados a diario en los spots de pesca argentinos.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: VientoPage,
});

// Proyección lineal simple sobre el recorte de Argentina.
const LON_MIN = -74;
const LON_MAX = -53;
const LAT_MIN = -56;
const LAT_MAX = -21;
const W = 100;
const H = 170;

const x = (lon: number) => ((lon - LON_MIN) / (LON_MAX - LON_MIN)) * W;
const y = (lat: number) => ((LAT_MAX - lat) / (LAT_MAX - LAT_MIN)) * H;

const CONTORNO: [number, number][] = [
  [-66.3, -22.0],
  [-62.8, -22.0],
  [-60.0, -24.0],
  [-57.6, -25.5],
  [-54.6, -25.6],
  [-53.6, -26.9],
  [-55.6, -28.0],
  [-57.6, -30.2],
  [-58.0, -32.0],
  [-58.2, -34.0],
  [-56.7, -36.4],
  [-57.5, -38.2],
  [-62.3, -38.9],
  [-62.4, -40.8],
  [-65.0, -41.0],
  [-65.2, -43.0],
  [-65.3, -45.0],
  [-67.6, -46.0],
  [-67.0, -48.5],
  [-68.5, -50.3],
  [-68.6, -52.3],
  [-68.6, -54.9],
  [-66.3, -55.1],
  [-71.0, -54.0],
  [-72.3, -51.5],
  [-71.9, -49.0],
  [-72.5, -47.0],
  [-71.8, -44.0],
  [-71.5, -41.0],
  [-70.5, -38.0],
  [-69.8, -35.0],
  [-70.4, -33.0],
  [-69.8, -30.0],
  [-68.5, -27.0],
  [-67.2, -24.0],
];

function escala(v: number) {
  if (v < 10) return { color: "var(--wind-calm)", label: "Calmo" };
  if (v < 20) return { color: "var(--wind-suave)", label: "Suave" };
  if (v < 30) return { color: "var(--wind-medio)", label: "Moderado" };
  if (v < 45) return { color: "var(--wind-fuerte)", label: "Fuerte" };
  return { color: "var(--wind-severo)", label: "Muy fuerte" };
}

const RUMBOS = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSO", "SO", "OSO", "O", "ONO", "NO", "NNO"];
const rumbo = (deg: number) => RUMBOS[Math.round((deg % 360) / 22.5) % 16];

function Flecha({ p }: { p: PuntoViento }) {
  const { color } = escala(p.velocidad);
  const px = x(p.lon);
  const py = y(p.lat);
  // El viento sopla DESDE `direccion`: la flecha apunta hacia direccion + 180.
  const rot = p.direccion + 180;
  const largo = 3 + Math.min(p.velocidad, 60) / 12;

  return (
    <g transform={`translate(${px} ${py})`}>
      <g transform={`rotate(${rot})`}>
        <line x1={0} y1={largo} x2={0} y2={-largo} stroke={color} strokeWidth={0.9} />
        <polygon points={`0,${-largo - 1.6} 1.5,${-largo + 0.6} -1.5,${-largo + 0.6}`} fill={color} />
      </g>
      <circle r={0.9} fill={color} />
    </g>
  );
}

function VientoPage() {
  const { data, isPending, isError, refetch, isFetching } = useQuery(vientoQueryOptions);

  if (isPending || (isError && isFetching)) {
    return (
      <PageShell>
        <div className="flex items-center gap-2 py-16 text-muted-foreground" role="status">
          <Loader2 className="size-5 animate-spin" /> Cargando viento…
        </div>
      </PageShell>
    );
  }

  if (isError || !data) {
    return (
      <PageShell>
        <div className="rounded-md border border-border bg-secondary/60 p-6 text-center">
          <p>No pudimos actualizar el viento. Reintentá en unos minutos.</p>
          <Button className="mt-4" onClick={() => void refetch()}>
            Reintentar
          </Button>
        </div>
      </PageShell>
    );
  }

  const puntos = data.puntos;
  const fecha = new Date(data.actualizado).toLocaleString("es-AR", {
    dateStyle: "long",
    timeStyle: "short",
    timeZone: "America/Argentina/Buenos_Aires",
  });

  const ordenados = [...puntos].sort((a, b) => b.velocidad - a.velocidad);

  return (
    <PageShell>
      <p className="eyebrow flex items-center gap-1.5 text-accent">
        <Wind className="size-3.5" /> Condiciones del día
      </p>
      <h1 className="mt-1 text-3xl sm:text-4xl">Mapa del viento en Argentina</h1>
      <p className="mt-3 max-w-prose text-muted-foreground">
        Datos en vivo de Open-Meteo (modelo global de viento a 10 m), con actualización diaria. La
        flecha marca hacia dónde va el viento y el color, su intensidad. Con más de 30 km/h la pesca
        de costa se complica y en el mar suele picar la corvina con viento del este.
      </p>
      <p className="mt-1 text-xs text-muted-foreground">Última actualización: {fecha}</p>

      {data.error ? (
        <p className="mt-4 rounded-md border border-border bg-secondary/60 p-4 text-sm">
          {data.error}
        </p>
      ) : null}

      <div className="mt-6 grid gap-6 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <div className="rounded-xl border border-border bg-card p-3 shadow-card">
          <svg
            viewBox={`0 0 ${W} ${H}`}
            className="mx-auto h-auto w-full max-w-[380px]"
            role="img"
            aria-label="Mapa del viento actual sobre Argentina"
            style={{ background: "var(--wind-water)" }}
          >
            <polygon
              points={CONTORNO.map(([lon, lat]) => `${x(lon)},${y(lat)}`).join(" ")}
              fill="var(--wind-land)"
              stroke="var(--color-border)"
              strokeWidth={0.4}
            />
            {puntos.map((p) => (
              <Flecha key={p.id} p={p} />
            ))}
          </svg>
          <div className="mt-3 flex flex-wrap justify-center gap-2 text-xs">
            {[
              { label: "0–10", color: "var(--wind-calm)" },
              { label: "10–20", color: "var(--wind-suave)" },
              { label: "20–30", color: "var(--wind-medio)" },
              { label: "30–45", color: "var(--wind-fuerte)" },
              { label: "45+ km/h", color: "var(--wind-severo)" },
            ].map((s) => (
              <span key={s.label} className="flex items-center gap-1.5 text-muted-foreground">
                <span
                  className="size-2.5 rounded-full"
                  style={{ background: s.color }}
                  aria-hidden
                />
                {s.label}
              </span>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-xl">Viento por spot</h2>
          <ul className="mt-3 divide-y divide-border rounded-xl border border-border bg-card shadow-card">
            {ordenados.map((p) => {
              const s = escala(p.velocidad);
              return (
                <li key={p.id} className="flex items-center justify-between gap-3 px-4 py-2.5">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium">{p.nombre}</p>
                    <p className="text-xs text-muted-foreground">{p.provincia}</p>
                  </div>
                  <div className="flex shrink-0 items-center gap-2 text-right">
                    <div>
                      <p className="text-sm font-medium">{p.velocidad} km/h</p>
                      <p className="text-xs text-muted-foreground">
                        {rumbo(p.direccion)} · ráf. {p.rafaga}
                      </p>
                    </div>
                    <Badge
                      variant="outline"
                      style={{ borderColor: s.color, color: s.color }}
                      className="hidden w-[92px] justify-center min-[400px]:inline-flex"
                    >
                      {s.label}
                    </Badge>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </PageShell>
  );
}
