import { useEffect, useState } from "react";
import type { Session } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

/** Sesión actual del usuario; se actualiza al iniciar o cerrar sesión. */
export function useSession() {
  const [session, setSession] = useState<Session | null>(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange((_e, s) => {
      setSession(s);
      setCargando(false);
    });
    void supabase.auth.getSession().then(({ data: d }) => {
      setSession(d.session);
      setCargando(false);
    });
    return () => data.subscription.unsubscribe();
  }, []);

  return { session, user: session?.user ?? null, cargando };
}
