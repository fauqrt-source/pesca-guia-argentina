import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/site-shell";
import { Button } from "@/components/ui/button";
import { carnadas, especies, regiones, tecnicas } from "@/data/pesca";

export const Route = createFileRoute("/sobre")({
  head: () => ({
    meta: [
      { title: "Sobre la app | Pesca Argentina" },
      {
        name: "description",
        content:
          "Cómo funciona Pesca Argentina: recomendaciones de especies, carnadas, señuelos, equipo y técnicas según dónde vas a pescar.",
      },
      { property: "og:title", content: "Sobre Pesca Argentina" },
      {
        property: "og:description",
        content: "Una guía de pesca deportiva argentina pensada para consultar desde la costa.",
      },
    ],
  }),
  component: SobrePage,
});

function SobrePage() {
  return (
    <PageShell>
      <p className="eyebrow text-accent">Sobre la app</p>
      <h1 className="mt-1 text-3xl sm:text-4xl">Pesca Argentina</h1>
      <div className="mt-4 max-w-prose space-y-4 text-muted-foreground">
        <p>
          Pesca Argentina traduce la pregunta más común entre pescadores —“¿qué llevo?”— en una
          recomendación concreta. Elegís provincia, ambiente o spot y obtenés especies probables,
          carnadas naturales, señuelos con color y tamaño, equipo sugerido y la modalidad de pesca
          que mejor funciona en ese escenario.
        </p>
        <p>
          El contenido está modelado como base relacional (regiones, especies, carnadas, equipo y
          técnicas), así que se puede ampliar a nuevas provincias y spots sin rediseñar nada.
        </p>
        <p>
          Esta versión es una base de validación con {regiones.length} regiones,{" "}
          {especies.length} especies, {carnadas.length} carnadas y señuelos y {tecnicas.length}{" "}
          técnicas cargadas.
        </p>
        <p className="rounded-md border border-border bg-secondary/60 p-4 text-foreground">
          Las recomendaciones son orientativas. Cada provincia tiene su propio reglamento, vedas y
          medidas mínimas: verificá siempre antes de salir y priorizá la devolución en especies
          bajo presión, como el dorado y los salmónidos.
        </p>
      </div>
      <Button asChild className="mt-8">
        <Link to="/">Buscar mi zona</Link>
      </Button>
    </PageShell>
  );
}
