import { useNavigate } from "@tanstack/react-router";
import { Heart } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { useFavoritos, type TipoFavorito } from "@/hooks/use-favoritos";

export function BotonFavorito({
  tipo,
  id,
  nombre,
  className,
  conTexto = false,
}: {
  tipo: TipoFavorito;
  id: string;
  nombre: string;
  className?: string;
  conTexto?: boolean;
}) {
  const { user, es, toggle } = useFavoritos();
  const navigate = useNavigate();
  const activo = es(tipo, id);
  const label = activo ? `Quitar ${nombre} de favoritos` : `Añadir ${nombre} a favoritos`;

  return (
    <button
      type="button"
      aria-label={label}
      aria-pressed={activo}
      title={label}
      disabled={toggle.isPending}
      onClick={() => {
        if (!user) {
          toast("Iniciá sesión para guardar favoritos");
          void navigate({ to: "/auth" });
          return;
        }
        toggle.mutate(
          { tipo, id },
          {
            onSuccess: () => toast.success(activo ? "Quitado de favoritos" : "Guardado en favoritos"),
            onError: () => toast.error("No pudimos guardar el favorito. Probá de nuevo."),
          },
        );
      }}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-md p-1.5 text-sm transition-colors hover:bg-secondary disabled:opacity-60",
        activo ? "text-destructive" : "text-muted-foreground",
        className,
      )}
    >
      <Heart className={cn("size-4", activo && "fill-current")} />
      {conTexto ? <span>{activo ? "En favoritos" : "Añadir a favoritos"}</span> : null}
    </button>
  );
}
