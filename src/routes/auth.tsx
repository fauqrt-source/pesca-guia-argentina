import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable/index";
import { PageShell } from "@/components/site-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSession } from "@/hooks/use-session";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Ingresar o crear cuenta | Pesca Argentina" },
      { name: "description", content: "Ingresá o creá tu cuenta gratis en Pesca Argentina." },
      { property: "og:title", content: "Ingresar | Pesca Argentina" },
      { property: "og:description", content: "Creá tu cuenta de pescador en Pesca Argentina." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const { user } = useSession();
  const [modo, setModo] = useState<"ingresar" | "registro">("ingresar");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [enviando, setEnviando] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [aviso, setAviso] = useState<string | null>(null);

  useEffect(() => {
    if (user) void navigate({ to: "/", replace: true });
  }, [user, navigate]);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setAviso(null);
    setEnviando(true);
    try {
      if (modo === "registro") {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: window.location.origin },
        });
        if (error) throw error;
        setAviso("Te mandamos un mail para confirmar tu cuenta. Revisá tu bandeja (y spam).");
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : "";
      setError(
        msg.includes("Invalid login")
          ? "Email o contraseña incorrectos."
          : msg.includes("already registered")
            ? "Ese email ya tiene cuenta. Probá ingresar."
            : msg || "No pudimos completar la acción. Probá de nuevo.",
      );
    } finally {
      setEnviando(false);
    }
  }

  async function google() {
    setError(null);
    const r = await lovable.auth.signInWithOAuth("google", { redirect_uri: window.location.origin });
    if (r.error) setError("No pudimos ingresar con Google. Probá de nuevo.");
  }

  return (
    <PageShell>
      <div className="mx-auto w-full max-w-sm rounded-xl border border-border bg-card p-6 shadow-card">
        <h1 className="text-2xl">{modo === "ingresar" ? "Ingresar" : "Crear cuenta"}</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {modo === "ingresar" ? "Entrá con tu cuenta de pescador." : "Es gratis y lleva un minuto."}
        </p>

        <Button type="button" variant="outline" className="mt-5 w-full" onClick={() => void google()}>
          Continuar con Google
        </Button>
        <p className="my-4 text-center text-xs text-muted-foreground">o con tu email</p>

        <form onSubmit={onSubmit} className="space-y-3">
          <div className="space-y-1.5">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" required autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="password">Contraseña</Label>
            <Input
              id="password"
              type="password"
              required
              minLength={6}
              autoComplete={modo === "ingresar" ? "current-password" : "new-password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {error ? <p className="text-sm text-destructive">{error}</p> : null}
          {aviso ? <p className="text-sm text-accent">{aviso}</p> : null}
          <Button type="submit" className="w-full" disabled={enviando}>
            {enviando ? "Un momento…" : modo === "ingresar" ? "Ingresar" : "Crear cuenta"}
          </Button>
        </form>

        <button
          type="button"
          className="mt-4 w-full text-center text-sm text-muted-foreground underline-offset-4 hover:underline"
          onClick={() => {
            setModo(modo === "ingresar" ? "registro" : "ingresar");
            setError(null);
            setAviso(null);
          }}
        >
          {modo === "ingresar" ? "¿No tenés cuenta? Creala" : "¿Ya tenés cuenta? Ingresá"}
        </button>
      </div>
    </PageShell>
  );
}
