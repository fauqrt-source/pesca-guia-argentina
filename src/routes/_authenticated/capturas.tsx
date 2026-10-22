import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState, type FormEvent } from "react";
import { Fish, Loader2, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { PageShell } from "@/components/site-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSession } from "@/hooks/use-session";
import { especies } from "@/data/pesca";

export const Route = createFileRoute("/_authenticated/capturas")({
  head: () => ({
    meta: [
      { title: "Mis capturas | Pesca Argentina" },
      { name: "description", content: "Tu bitácora personal de capturas de pesca." },
      { property: "og:title", content: "Mis capturas | Pesca Argentina" },
      { property: "og:description", content: "Bitácora personal de capturas." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: CapturasPage,
});

const schema = z.object({
  especie: z.string().trim().min(1, "Poné la especie").max(80),
  medida: z.string().trim().max(60).optional(),
  ubicacion: z.string().trim().min(1, "Poné dónde la sacaste").max(120),
  fecha: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Elegí la fecha"),
});

interface Captura {
  id: string;
  especie: string;
  medida: string | null;
  ubicacion: string;
  fecha: string;
}

const hoy = () => new Date().toLocaleDateString("en-CA", { timeZone: "America/Argentina/Buenos_Aires" });

function CapturasPage() {
  const { user } = useSession();
  const qc = useQueryClient();
  const key = ["capturas", user?.id];
  const [form, setForm] = useState({ especie: "", medida: "", ubicacion: "", fecha: hoy() });
  const [error, setError] = useState<string | null>(null);

  const q = useQuery({
    queryKey: key,
    enabled: !!user,
    queryFn: async (): Promise<Captura[]> => {
      const { data, error } = await supabase
        .from("capturas")
        .select("id, especie, medida, ubicacion, fecha")
        .order("fecha", { ascending: false })
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data ?? [];
    },
  });

  const crear = useMutation({
    mutationFn: async (v: z.infer<typeof schema>) => {
      const { error } = await supabase.from("capturas").insert({ ...v, medida: v.medida || null });
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Captura guardada");
      setForm({ especie: "", medida: "", ubicacion: "", fecha: hoy() });
      void qc.invalidateQueries({ queryKey: key });
    },
    onError: () => setError("No pudimos guardar la captura. Probá de nuevo."),
  });

  const borrar = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("capturas").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => void qc.invalidateQueries({ queryKey: key }),
    onError: () => toast.error("No pudimos borrar la captura."),
  });

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    const r = schema.safeParse(form);
    if (!r.success) return setError(r.error.issues[0]?.message ?? "Revisá los datos");
    crear.mutate(r.data);
  }

  const set = (k: keyof typeof form) => (e: { target: { value: string } }) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  return (
    <PageShell>
      <p className="eyebrow flex items-center gap-1.5 text-accent">
        <Fish className="size-3.5" /> Tu bitácora
      </p>
      <h1 className="mt-1 text-3xl sm:text-4xl">Mis Capturas</h1>

      <div className="mt-6 grid gap-6 md:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)]">
        <form onSubmit={onSubmit} className="space-y-3 rounded-xl border border-border bg-card p-5 shadow-card md:self-start">
          <h2 className="text-xl">Registrar captura</h2>
          <div className="space-y-1.5">
            <Label htmlFor="especie">Especie</Label>
            <Input id="especie" list="especies" placeholder="Dorado, Tararira, Pejerrey…" maxLength={80} value={form.especie} onChange={set("especie")} required />
            <datalist id="especies">
              {especies.map((e) => (
                <option key={e.id} value={e.nombre} />
              ))}
            </datalist>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="medida">Peso o tamaño (opcional)</Label>
            <Input id="medida" placeholder="Ej: 3 kg o 45 cm" maxLength={60} value={form.medida} onChange={set("medida")} />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="ubicacion">Pesquero</Label>
            <Input id="ubicacion" placeholder="Ej: Paso de la Patria" maxLength={120} value={form.ubicacion} onChange={set("ubicacion")} required />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="fecha">Fecha</Label>
            <Input id="fecha" type="date" max={hoy()} value={form.fecha} onChange={set("fecha")} required />
          </div>
          {error ? <p className="text-sm text-destructive">{error}</p> : null}
          <Button type="submit" className="w-full" disabled={crear.isPending}>
            {crear.isPending ? "Guardando…" : "Guardar captura"}
          </Button>
        </form>

        <section>
          <h2 className="text-xl">
            Historial {q.data ? <span className="text-muted-foreground">({q.data.length})</span> : null}
          </h2>
          {q.isPending ? (
            <p className="mt-3 flex items-center gap-2 text-muted-foreground" role="status">
              <Loader2 className="size-5 animate-spin" /> Cargando capturas…
            </p>
          ) : q.isError ? (
            <p className="mt-3 rounded-md border border-border bg-secondary/60 p-4">No pudimos cargar tus capturas.</p>
          ) : q.data.length === 0 ? (
            <p className="mt-3 rounded-xl border border-border bg-card p-6 text-center text-muted-foreground shadow-card">
              Todavía no registraste capturas. ¡Que pique!
            </p>
          ) : (
            <ul className="mt-3 grid gap-3 sm:grid-cols-2">
              {q.data.map((c) => (
                <li key={c.id} className="rounded-xl border border-border bg-card p-4 shadow-card">
                  <div className="flex items-start justify-between gap-2">
                    <p className="font-display text-lg uppercase tracking-wide">{c.especie}</p>
                    <button
                      type="button"
                      aria-label={`Borrar captura de ${c.especie}`}
                      className="rounded-md p-1 text-muted-foreground hover:bg-secondary hover:text-destructive"
                      onClick={() => borrar.mutate(c.id)}
                    >
                      <Trash2 className="size-4" />
                    </button>
                  </div>
                  {c.medida ? <p className="text-sm">{c.medida}</p> : null}
                  <p className="mt-1 text-sm text-muted-foreground">{c.ubicacion}</p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(`${c.fecha}T12:00:00`).toLocaleDateString("es-AR", { dateStyle: "long" })}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </PageShell>
  );
}
