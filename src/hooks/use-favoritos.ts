import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useSession } from "@/hooks/use-session";

export type TipoFavorito = "spot" | "viento";
export interface Favorito {
  tipo: TipoFavorito;
  spot_id: string;
}

const key = (uid: string | undefined) => ["favoritos", uid ?? "anon"];

/** Favoritos del usuario actual (vacío si no inició sesión). */
export function useFavoritos() {
  const { user } = useSession();
  const qc = useQueryClient();
  const q = useQuery({
    queryKey: key(user?.id),
    enabled: !!user,
    queryFn: async (): Promise<Favorito[]> => {
      const { data, error } = await supabase
        .from("favoritos")
        .select("tipo, spot_id")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return (data ?? []) as Favorito[];
    },
  });

  const lista = user ? (q.data ?? []) : [];
  const es = (tipo: TipoFavorito, id: string) =>
    lista.some((f) => f.tipo === tipo && f.spot_id === id);

  const toggle = useMutation({
    mutationFn: async ({ tipo, id }: { tipo: TipoFavorito; id: string }) => {
      if (!user) throw new Error("Iniciá sesión para guardar favoritos");
      if (es(tipo, id)) {
        const { error } = await supabase
          .from("favoritos")
          .delete()
          .eq("tipo", tipo)
          .eq("spot_id", id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("favoritos").insert({ tipo, spot_id: id });
        if (error) throw error;
      }
    },
    onSettled: () => qc.invalidateQueries({ queryKey: key(user?.id) }),
  });

  return { user, lista, cargando: !!user && q.isPending, isError: q.isError, es, toggle };
}
