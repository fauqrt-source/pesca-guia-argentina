import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Compass, MapPin, Search } from "lucide-react";
import heroImg from "@/assets/hero-pesca.jpg";
import { SiteFooter } from "@/components/site-shell";
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
  component: Index;
});

function Index() {
  return null;
}
