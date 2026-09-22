export interface Torneo {
  id: string;
  nombre: string;
  localidad: string;
  provincia: string;
  epoca: string;
  modalidad: string;
  especieId?: string;
  regionId?: string;
  descripcion: string;
  datos: string[];
}

export const torneos: Torneo[] = [
  {
    id: "fiesta-surubi-goya",
    nombre: "Fiesta Nacional del Surubí",
    localidad: "Goya",
    provincia: "Corrientes",
    epoca: "Fin de abril / comienzos de mayo",
    modalidad: "Embarcado, de pique, por equipos",
    especieId: "surubi",
    regionId: "goya",
    descripcion:
      "El concurso de pesca del surubí más convocante del país: cientos de embarcaciones sobre el río Paraná frente a Goya, con premios mayores para la pieza más pesada y una fiesta popular con espectáculos durante varios días.",
    datos: [
      "Se pesca embarcado sobre el Paraná, en pozones y juntas de correntada",
      "Equipo pesado: caña de acción media-pesada, multifilamento 30-50 lb y plomada de río",
      "Carnada clásica: morena, anguila o tira de bagre fresca",
      "Hay categorías por equipos y premio a la pieza mayor",
    ],
  },
  {
    id: "dorado-paso-de-la-patria",
    nombre: "Concurso Internacional del Dorado con devolución",
    localidad: "Paso de la Patria",
    provincia: "Corrientes",
    epoca: "Agosto / septiembre",
    modalidad: "Embarcado, todo con devolución (catch & release)",
    especieId: "dorado",
    regionId: "paso-de-la-patria",
    descripcion:
      "Clásico de la pesca del dorado en la confluencia del Paraná y el Paraguay. Se puntúa por medida y todas las piezas vuelven al agua, así que el cuidado del pez forma parte del reglamento.",
    datos: [
      "Puntaje por largo con planilla y foto: la pieza se devuelve viva",
      "Señuelos de superficie y media agua, más carnada viva según la jornada",
      "Conviene anzuelo sin rebaba y red de goma para no dañar al pez",
      "Se pesca en correderas, puntas de isla y bocas de riacho",
    ],
  },
  {
    id: "fiesta-pejerrey-chascomus",
    nombre: "Fiesta Nacional del Pejerrey",
    localidad: "Chascomús",
    provincia: "Buenos Aires",
    epoca: "Invierno (julio / agosto)",
    modalidad: "Embarcado y de costa en laguna",
    especieId: "pejerrey",
    regionId: "chascomus",
    descripcion:
      "El encuentro más tradicional de la pesca de laguna en Buenos Aires. Se premia el peso total de la captura y suele combinarse con jornadas para chicos y escuelas de pesca.",
    datos: [
      "Línea de boyas con varias brazoladas y anzuelos chicos",
      "Carnada: filet de mojarra o lombriz, bien fresca",
      "Los mejores piques son a primera hora con agua fría y poco viento",
      "Se controla medida mínima: los ejemplares chicos vuelven al agua",
    ],
  },
];
