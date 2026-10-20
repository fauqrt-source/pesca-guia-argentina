CREATE TABLE public.favoritos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL DEFAULT auth.uid(),
  tipo text NOT NULL CHECK (tipo IN ('spot','viento')),
  spot_id text NOT NULL CHECK (char_length(spot_id) BETWEEN 1 AND 80),
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, tipo, spot_id)
);
GRANT SELECT, INSERT, DELETE ON public.favoritos TO authenticated;
GRANT ALL ON public.favoritos TO service_role;
ALTER TABLE public.favoritos ENABLE ROW LEVEL SECURITY;
CREATE POLICY "fav select own" ON public.favoritos FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "fav insert own" ON public.favoritos FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "fav delete own" ON public.favoritos FOR DELETE TO authenticated USING (auth.uid() = user_id);

CREATE TABLE public.capturas (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL DEFAULT auth.uid(),
  especie text NOT NULL CHECK (char_length(especie) BETWEEN 1 AND 80),
  medida text CHECK (medida IS NULL OR char_length(medida) <= 60),
  ubicacion text NOT NULL CHECK (char_length(ubicacion) BETWEEN 1 AND 120),
  fecha date NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.capturas TO authenticated;
GRANT ALL ON public.capturas TO service_role;
ALTER TABLE public.capturas ENABLE ROW LEVEL SECURITY;
CREATE POLICY "cap select own" ON public.capturas FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "cap insert own" ON public.capturas FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "cap update own" ON public.capturas FOR UPDATE TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY "cap delete own" ON public.capturas FOR DELETE TO authenticated USING (auth.uid() = user_id);
CREATE INDEX capturas_user_fecha ON public.capturas (user_id, fecha DESC);