import { Link, useNavigate } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";
import { LogIn, LogOut } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useSession } from "@/hooks/use-session";

const btn =
  "flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground";

export function UserMenu() {
  const { user, cargando } = useSession();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  if (cargando) return <span className="w-20" aria-hidden />;

  if (!user) {
    return (
      <Link to="/auth" className={btn}>
        <LogIn className="size-4" /> Ingresar
      </Link>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <span className="hidden max-w-[160px] truncate text-xs text-muted-foreground md:inline" title={user.email ?? ""}>
        {user.email}
      </span>
      <button
        type="button"
        className={btn}
        onClick={async () => {
          await queryClient.cancelQueries();
          await supabase.auth.signOut();
          void navigate({ to: "/", replace: true });
        }}
      >
        <LogOut className="size-4" /> Cerrar sesión
      </button>
    </div>
  );
}
