import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Compass, MapPin, Search } from "lucide-react";
import heroImg from "@/assets/hero-pesca.jpg";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AMBIENTES,
  TEMPORADAS,
  provincias,
  regiones,
  type Ambiente,
  type Nivel,
  type Temporada,
} from "@/data/pesca";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Pesca Argentina — ¿Dónde vas a pescar?" },
      {
        name: "description",
        content:
          "Elegí provincia, ambiente o spot y recibí recomendaciones de especies, carnadas, señuelos, equipo y técnicas de pesca deportiva en Argentina.",
      },
      { property: "og:title", content: "Pesca Argentina — recomendaciones por zona" },
      {
        property: "og:description",
        content:
          "Del Paraná a la Patagonia: qué especies buscar, con qué carnada, qué señuelo y qué equipo llevar.",
      },
    ],
  }),
  component: Index,
});

const TODOS = "todos";

function Index() {
  const navigate = useNavigate();
  const [provincia, setProvincia] = useState<string>(TODOS);
  const [ambiente, setAmbiente] = useState<string>(TODOS);
  const [spot, setSpot] = useState<string>("");
  const [temporada, setTemporada] = useState<string>(TODOS);
  const [nivel, setNivel] = useState<string>(TODOS);
  const [modalidad, setModalidad] = useState<string>(TODOS);

  const disponibles = useMemo(
    () =>
      regiones.filter(
        (r) =>
          (provincia === TODOS || r.provincia === provincia) &&
          (ambiente === TODOS || r.ambiente === (ambiente as Ambiente)),
      ),
    [provincia, ambiente],
  );

  const filtros = {
    temporada: temporada === TODOS ? undefined : (temporada as Temporada),
    nivel: nivel === TODOS ? undefined : (nivel as Nivel),
    modalidad: modalidad === TODOS ? undefined : (modalidad as "devolucion" | "consumo"),
  };

  const buscar = (regionId: string) => {
    navigate({ to: "/resultados", search: { region: regionId, ...filtros } });
  };

  /** Sin spot elegido: recomendaciones de toda la provincia y/o ambiente. */
  const buscarZona = () => {
    if (spot) {
      buscar(spot);
      return;
    }
    navigate({
      to: "/resultados",
      search: {
        provincia: provincia === TODOS ? undefined : provincia,
        ambiente: ambiente === TODOS ? undefined : ambiente,
        ...filtros,
      },
    });
  };

  return (
    <>
      <section className="relative isolate overflow-hidden">
        <img
          src={heroImg}
          alt="Pescador en bote sobre el río Paraná al atardecer"
          width={1600}
          height={912}
          className="absolute inset-0 size-full object-cover"
        />
        <div className="overlay-dusk absolute inset-0" />
        <div className="relative mx-auto max-w-5xl px-4 pt-20 pb-14 sm:pt-28">
          <p className="eyebrow text-secondary">Guía de pesca deportiva argentina</p>
          <h1 className="mt-3 max-w-2xl text-4xl leading-[1.05] text-primary-foreground sm:text-6xl">
            ¿Dónde vas a pescar?
          </h1>
          <p className="mt-4 max-w-xl text-primary-foreground/85">
            Elegí tu zona y te decimos qué especies buscar, con qué carnada, qué señuelo, qué equipo
            llevar y cómo pescarlo.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-4">
        <Card className="-mt-8 relative shadow-outdoor">
          <CardContent className="space-y-5 pt-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label>Provincia</Label>
                <Select
                  value={provincia}
                  onValueChange={(v) => {
                    setProvincia(v);
                    setSpot("");
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Todas" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={TODOS}>Todas las provincias</SelectItem>
                    {provincias.map((p) => (
                      <SelectItem key={p} value={p}>
                        {p}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1.5">
                <Label>Ambiente</Label>
                <Select
                  value={ambiente}
                  onValueChange={(v) => {
                    setAmbiente(v);
                    setSpot("");
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Todos" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={TODOS}>Todos los ambientes</SelectItem>
                    {AMBIENTES.map((a) => (
                      <SelectItem key={a.id} value={a.id}>
                        {a.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1.5 sm:col-span-2">
                <Label>Cuerpo de agua / localidad (opcional)</Label>
                <Select value={spot} onValueChange={setSpot}>
                  <SelectTrigger>
                    <SelectValue placeholder="Todos los de la selección" />
                  </SelectTrigger>
                  <SelectContent>
                    {disponibles.map((r) => (
                      <SelectItem key={r.id} value={r.id}>
                        {r.spot} — {r.provincia}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">
                  {disponibles.length} zona{disponibles.length === 1 ? "" : "s"} disponible
                  {disponibles.length === 1 ? "" : "s"}. Si no elegís ninguna, te mostramos todas las
                  recomendaciones de la provincia y el ambiente seleccionados.
                </p>
              </div>
            </div>


            <div className="grid gap-4 border-t border-border pt-4 sm:grid-cols-3">
              <div className="space-y-1.5">
                <Label>Temporada</Label>
                <Select value={temporada} onValueChange={setTemporada}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={TODOS}>Todo el año</SelectItem>
                    {TEMPORADAS.map((t) => (
                      <SelectItem key={t.id} value={t.id}>
                        {t.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label>Tipo de pesca</Label>
                <Select value={modalidad} onValueChange={setModalidad}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={TODOS}>Indistinto</SelectItem>
                    <SelectItem value="devolucion">Con devolución</SelectItem>
                    <SelectItem value="consumo">De consumo</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label>Experiencia</Label>
                <Select value={nivel} onValueChange={setNivel}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={TODOS}>Cualquiera</SelectItem>
                    <SelectItem value="principiante">Principiante</SelectItem>
                    <SelectItem value="avanzado">Avanzado</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button size="lg" className="w-full" onClick={buscarZona}>
              <Search className="size-4" /> Ver recomendación
            </Button>
          </CardContent>
        </Card>

        <section className="mt-14">
          <p className="eyebrow flex items-center gap-1.5 text-accent">
            <Compass className="size-3.5" /> Zonas cargadas
          </p>
          <h2 className="mt-1 text-2xl">Spots destacados</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {regiones.map((r) => (
              <button
                key={r.id}
                type="button"
                onClick={() => buscar(r.id)}
                className="rounded-xl border border-border bg-card p-5 text-left shadow-card transition-colors hover:border-primary"
              >
                <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <MapPin className="size-3.5" /> {r.provincia}
                </p>
                <h3 className="mt-1 text-lg">{r.spot}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground">{r.descripcion}</p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  <Badge variant="secondary">
                    {AMBIENTES.find((a) => a.id === r.ambiente)?.label}
                  </Badge>
                  <Badge variant="outline">{r.especies.length} especies</Badge>
                </div>
              </button>
            ))}
          </div>
        </section>

        <section className="mt-14 rounded-xl border border-border bg-secondary/50 p-6">
          <h2 className="text-xl">¿Recién arrancás?</h2>
          <p className="mt-2 max-w-prose text-sm text-muted-foreground">
            Mirá el catálogo de señuelos y carnadas con color y tamaño sugerido para cada situación
            de agua.
          </p>
          <Button asChild variant="outline" className="mt-4">
            <Link to="/senuelos">Abrir guía de señuelos</Link>
          </Button>
        </section>
      </div>
    </>
  );
}
