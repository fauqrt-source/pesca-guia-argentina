// Consulta de viento a Open-Meteo hecha desde el navegador del visitante.
// Motivo: desde el servidor compartido la cuota gratuita diaria se agota (HTTP 429).
// Open-Meteo no usa API key y permite llamadas desde el navegador.

export interface PuntoViento {
  id: string;
  nombre: string;
  provincia: string;
  lat: number;
  lon: number;
  /** km/h; null si ese spot no devolvió datos */
  velocidad: number | null;
  rafaga: number | null;
  /** grados desde donde sopla */
  direccion: number | null;
  hora: string;
}

export interface MapaViento {
  /** ISO UTC de la medición devuelta por la API */
  actualizado: string;
  puntos: PuntoViento[];
  fallidos: number;
}

const PUNTOS = [
  { id: "paso-patria", nombre: "Paso de la Patria", provincia: "Corrientes", lat: -27.31, lon: -58.57 },
  { id: "corrientes", nombre: "Corrientes", provincia: "Corrientes", lat: -27.47, lon: -58.83 },
  { id: "empedrado", nombre: "Empedrado", provincia: "Corrientes", lat: -27.95, lon: -58.81 },
  { id: "goya", nombre: "Goya", provincia: "Corrientes", lat: -29.14, lon: -59.26 },
  { id: "esquina", nombre: "Esquina", provincia: "Corrientes", lat: -30.02, lon: -59.53 },
  { id: "ibera", nombre: "Esteros del Iberá", provincia: "Corrientes", lat: -28.53, lon: -57.17 },
  { id: "posadas", nombre: "Posadas", provincia: "Misiones", lat: -27.37, lon: -55.9 },
  { id: "reconquista", nombre: "Reconquista", provincia: "Santa Fe", lat: -29.15, lon: -59.65 },
  { id: "santa-fe", nombre: "Santa Fe", provincia: "Santa Fe", lat: -31.63, lon: -60.7 },
  { id: "rosario", nombre: "Rosario", provincia: "Santa Fe", lat: -32.95, lon: -60.65 },
  { id: "parana", nombre: "Paraná", provincia: "Entre Ríos", lat: -31.73, lon: -60.53 },
  { id: "victoria", nombre: "Victoria", provincia: "Entre Ríos", lat: -32.62, lon: -60.16 },
  { id: "gualeguaychu", nombre: "Gualeguaychú", provincia: "Entre Ríos", lat: -33.01, lon: -58.51 },
  { id: "salto-grande", nombre: "Salto Grande", provincia: "Entre Ríos", lat: -31.27, lon: -57.94 },
  { id: "zarate", nombre: "Zárate", provincia: "Buenos Aires", lat: -34.1, lon: -59.02 },
  { id: "tigre", nombre: "Delta / Tigre", provincia: "Buenos Aires", lat: -34.42, lon: -58.58 },
  { id: "chascomus", nombre: "Chascomús", provincia: "Buenos Aires", lat: -35.57, lon: -58.01 },
  { id: "mar-del-plata", nombre: "Mar del Plata", provincia: "Buenos Aires", lat: -38.0, lon: -57.55 },
  { id: "necochea", nombre: "Necochea", provincia: "Buenos Aires", lat: -38.55, lon: -58.74 },
  { id: "bahia-blanca", nombre: "Bahía Blanca", provincia: "Buenos Aires", lat: -38.72, lon: -62.27 },
  { id: "cordoba", nombre: "Córdoba", provincia: "Córdoba", lat: -31.42, lon: -64.18 },
  { id: "rio-cuarto", nombre: "Río Cuarto", provincia: "Córdoba", lat: -33.13, lon: -64.35 },
  { id: "mendoza", nombre: "Mendoza", provincia: "Mendoza", lat: -32.89, lon: -68.84 },
  { id: "santiago", nombre: "Santiago del Estero", provincia: "Santiago del Estero", lat: -27.79, lon: -64.26 },
  { id: "salta", nombre: "Salta", provincia: "Salta", lat: -24.79, lon: -65.41 },
  { id: "resistencia", nombre: "Resistencia", provincia: "Chaco", lat: -27.45, lon: -58.99 },
  { id: "formosa", nombre: "Formosa", provincia: "Formosa", lat: -26.18, lon: -58.17 },
  { id: "neuquen", nombre: "Neuquén", provincia: "Neuquén", lat: -38.95, lon: -68.06 },
  { id: "bariloche", nombre: "Bariloche", provincia: "Río Negro", lat: -41.13, lon: -71.31 },
  { id: "esquel", nombre: "Esquel", provincia: "Chubut", lat: -42.91, lon: -71.32 },
  { id: "comodoro", nombre: "Comodoro Rivadavia", provincia: "Chubut", lat: -45.86, lon: -67.5 },
  { id: "rio-gallegos", nombre: "Río Gallegos", provincia: "Santa Cruz", lat: -51.62, lon: -69.22 },
  { id: "ushuaia", nombre: "Ushuaia", provincia: "Tierra del Fuego", lat: -54.8, lon: -68.3 },
];

const BASE = "https://api.open-meteo.com/v1/forecast";

interface Current {
  time?: string;
  wind_speed_10m?: number | null;
  wind_gusts_10m?: number | null;
  wind_direction_10m?: number | null;
}

function url(pts: { lat: number; lon: number }[]) {
  const lat = pts.map((p) => p.lat).join(",");
  const lon = pts.map((p) => p.lon).join(",");
  return (
    `${BASE}?latitude=${lat}&longitude=${lon}` +
    `&current=wind_speed_10m,wind_gusts_10m,wind_direction_10m&wind_speed_unit=kmh&timezone=GMT`
  );
}

async function pedir(pts: { lat: number; lon: number }[]): Promise<(Current | undefined)[]> {
  const res = await fetch(url(pts), { headers: { accept: "application/json" } });
  if (!res.ok) {
    const txt = await res.text().catch(() => "");
    console.error("[viento] Open-Meteo", res.status, txt);
    throw new Error(`Open-Meteo ${res.status}`);
  }
  const json = (await res.json()) as unknown;
  const arr = (Array.isArray(json) ? json : [json]) as { current?: Current }[];
  return pts.map((_, i) => arr[i]?.current);
}

const num = (v: number | null | undefined) =>
  typeof v === "number" && Number.isFinite(v) ? Math.round(v) : null;

export async function getMapaViento(): Promise<MapaViento> {
  let currents: (Current | undefined)[];
  try {
    // Una sola llamada con todos los spots.
    currents = await pedir(PUNTOS);
  } catch {
    // Si la llamada grupal falla, pedimos cada spot por separado:
    // los que respondan se muestran igual.
    const res = await Promise.allSettled(PUNTOS.map((p) => pedir([p])));
    currents = res.map((r) => (r.status === "fulfilled" ? r.value[0] : undefined));
  }

  const puntos: PuntoViento[] = PUNTOS.map((p, i) => {
    const c = currents[i];
    return {
      ...p,
      velocidad: num(c?.wind_speed_10m),
      rafaga: num(c?.wind_gusts_10m),
      direccion: num(c?.wind_direction_10m),
      hora: c?.time ?? "",
    };
  });

  const conDatos = puntos.filter((p) => p.velocidad !== null && p.hora);
  if (conDatos.length === 0) throw new Error("Sin datos de viento");

  // Hora real de la medición devuelta por la API (UTC, formato YYYY-MM-DDTHH:mm).
  const t = conDatos.map((p) => p.hora).sort().at(-1)!;
  return {
    actualizado: `${t}:00Z`,
    puntos,
    fallidos: puntos.length - conDatos.length,
  };
}
