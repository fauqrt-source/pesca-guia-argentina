// Modelo relacional simple. Ampliá el contenido acá sin tocar el diseño.

import fotoDorado from "@/assets/peces/dorado.jpg";
import fotoSurubi from "@/assets/peces/surubi.jpg";
import fotoTararira from "@/assets/peces/tararira.jpg";
import fotoPati from "@/assets/peces/pati.jpg";
import fotoCorvina from "@/assets/peces/corvina.jpg";
import fotoPescadilla from "@/assets/peces/pescadilla.jpg";
import fotoTruchaArcoiris from "@/assets/peces/trucha-arcoiris.jpg";
import fotoTruchaMarron from "@/assets/peces/trucha-marron.jpg";
import fotoSalmon from "@/assets/peces/salmon.jpg";
import fotoPejerrey from "@/assets/peces/pejerrey.jpg";
import fotoBagreAmarillo from "@/assets/peces/bagre-amarillo.jpg";
import fotoPacu from "@/assets/peces/pacu.jpg";
import fotoBoga from "@/assets/peces/boga.jpg";

export type Ambiente = "mar" | "rio" | "lago" | "laguna";
export type Temporada = "verano" | "otono" | "invierno" | "primavera";
export type Nivel = "principiante" | "avanzado";
export type Modalidad = "devolucion" | "consumo";

export interface Region {
  id: string;
  provincia: string;
  ambiente: Ambiente;
  spot: string;
  descripcion: string;
  especies: string[]; // ids de especies
}

export interface Especie {
  id: string;
  nombre: string;
  cientifico: string;
  icono: string; // emoji / ícono simple
  foto: string; // foto real de la especie
  descripcion: string;
  detalle: string;
  temporadas: Temporada[];
  modalidad: Modalidad[];
  nivel: Nivel;
  carnadas: string[]; // ids de carnadas
  equipo: string; // id de equipo
  tecnicas: string[]; // ids de técnicas
}

export interface Carnada {
  id: string;
  nombre: string;
  tipo: "natural" | "artificial";
  subtipo?: string; // cuchara, popper, minnow, softbait, jig, spinnerbait, spoon
  color?: string;
  tamano?: string;
  nota: string;
}

export interface Equipo {
  id: string;
  cana: string;
  reel: string;
  linea: string;
  accesorios: string;
}

export interface Tecnica {
  id: string;
  nombre: string;
  descripcion: string;
  nivel: Nivel;
}

export const AMBIENTES: { id: Ambiente; label: string }[] = [
  { id: "mar", label: "Mar / costa" },
  { id: "rio", label: "Río" },
  { id: "lago", label: "Lago o embalse" },
  { id: "laguna", label: "Laguna" },
];

export const TEMPORADAS: { id: Temporada; label: string }[] = [
  { id: "verano", label: "Verano" },
  { id: "otono", label: "Otoño" },
  { id: "invierno", label: "Invierno" },
  { id: "primavera", label: "Primavera" },
];

export const carnadas: Carnada[] = [
  {
    id: "lombriz",
    nombre: "Lombriz",
    tipo: "natural",
    nota: "Universal para pejerrey, bagres y mojarras. Presentar entera y viva.",
  },
  {
    id: "morena",
    nombre: "Morena viva",
    tipo: "natural",
    nota: "La reina del dorado y el surubí. Anzuelo pasado por el lomo.",
  },
  {
    id: "mojarra",
    nombre: "Mojarra",
    tipo: "natural",
    nota: "Carnada viva de bajo costo para tararira y dorado chico.",
  },
  {
    id: "anguila",
    nombre: "Anguila / tira de bagre",
    tipo: "natural",
    nota: "Muy resistente, ideal para surubí de fondo en aguas turbias.",
  },
  {
    id: "camaron",
    nombre: "Camarón",
    tipo: "natural",
    nota: "Excelente para corvina rubia y pejerrey de mar.",
  },
  {
    id: "anchoa",
    nombre: "Filet de anchoíta",
    tipo: "natural",
    nota: "Clásico de la costa bonaerense, sostener con hilo elástico.",
  },
  {
    id: "calamar",
    nombre: "Calamar",
    tipo: "natural",
    nota: "Tiras firmes para pescadilla y corvina, aguanta la rompiente.",
  },
  {
    id: "masa",
    nombre: "Masa / pan compacto",
    tipo: "natural",
    nota: "Bolita firme para boga, sábalo y bagre amarillo. Amasar con harina y esencia dulce.",
  },
  {
    id: "fruta",
    nombre: "Fruta y semillas",
    tipo: "natural",
    nota: "Higo, naranja, mburucuyá o maíz cocido: la carnada natural del pacú.",
  },
  {
    id: "cascarudo",
    nombre: "Cascarudo / grillo",
    tipo: "natural",
    nota: "Insecto vivo muy efectivo para pacú y boga cerca de camalotes.",
  },
  {
    id: "menudo",
    nombre: "Menudo de pollo",
    tipo: "natural",
    nota: "Barato y oloroso: ideal para bagre amarillo y patí de barranca.",
  },
  {
    id: "cuchara",
    nombre: "Cuchara ondulante",
    tipo: "artificial",
    subtipo: "spoon",
    color: "Plateada / dorada",
    tamano: "10–18 g",
    nota: "Agua clara: plata. Agua con color o sol bajo: dorado.",
  },
  {
    id: "popper",
    nombre: "Popper",
    tipo: "artificial",
    subtipo: "popper",
    color: "Blanco perla, rojo-blanco",
    tamano: "8–11 cm",
    nota: "Superficie al amanecer y atardecer, sobre juncales y correderas.",
  },
  {
    id: "minnow",
    nombre: "Minnow suspending",
    tipo: "artificial",
    subtipo: "minnow",
    color: "Natural mojarra, chartreuse en agua turbia",
    tamano: "7–12 cm",
    nota: "Recuperación con pausas: el pique llega en la detención.",
  },
  {
    id: "softbait",
    nombre: "Softbait (vinilo)",
    tipo: "artificial",
    subtipo: "softbait",
    color: "Motor oil, blanco, rosa",
    tamano: "3–5″",
    nota: "Montado en jig head, para pesca lenta cerca del fondo.",
  },
  {
    id: "jig",
    nombre: "Jig / cabeza plomada",
    tipo: "artificial",
    subtipo: "jig",
    color: "Blanco, negro",
    tamano: "7–21 g",
    nota: "Vertical desde embarcación o barranca profunda.",
  },
  {
    id: "spinnerbait",
    nombre: "Spinnerbait",
    tipo: "artificial",
    subtipo: "spinnerbait",
    color: "Chartreuse, blanco",
    tamano: "10–14 g",
    nota: "Vibración y destello: perfecto para tararira entre vegetación.",
  },
  {
    id: "streamer",
    nombre: "Streamer (mosca)",
    tipo: "artificial",
    subtipo: "mosca",
    color: "Olive woolly bugger, negro",
    tamano: "#4 – #8",
    nota: "Fly casting patagónico: imita pequeños peces y sanguijuelas.",
  },
  {
    id: "ninfa",
    nombre: "Ninfa con lastre",
    tipo: "artificial",
    subtipo: "mosca",
    color: "Pheasant tail, hare's ear",
    tamano: "#12 – #16",
    nota: "Deriva muerta en correderas de ríos patagónicos.",
  },
];

export const equipos: Equipo[] = [
  {
    id: "eq-dorado",
    cana: "Spinning 1,90–2,10 m, acción rápida, potencia media-pesada (15–30 lb)",
    reel: "Frontal 3000–4000, relación 6.2:1, freno 8 kg",
    linea: "Multifilamento 20–30 lb + líder de acero o fluorocarbono 40 lb",
    accesorios: "Anzuelos 4/0–6/0 reforzados, pinza larga, guantes, copo grande",
  },
  {
    id: "eq-surubi",
    cana: "Caña de fondo 2,40–2,70 m, potencia pesada (20–40 lb)",
    reel: "Rotativo o frontal 5000–6000, relación 4.9:1",
    linea: "Multifilamento 40–50 lb + líder fluorocarbono 60 lb",
    accesorios: "Anzuelos 7/0–9/0, plomada de 80–150 g, campanita, portacaña",
  },
  {
    id: "eq-corvina",
    cana: "Caña de playa 3,60–4,20 m, potencia 100–200 g",
    reel: "Rotativo o frontal 6000–8000 con capacidad de 250 m",
    linea: "Nylon 0,35 mm + shock leader 0,50 mm",
    accesorios: "Anzuelos 3/0–5/0, plomada pirámide 80–120 g, líneas de 2 brazoladas",
  },
  {
    id: "eq-pescadilla",
    cana: "Caña de playa 3,30–3,90 m, potencia 60–120 g",
    reel: "Frontal 5000, relación 5.2:1",
    linea: "Nylon 0,30 mm + shock leader 0,45 mm",
    accesorios: "Anzuelos 1/0–3/0, plomada 60–90 g, luz química opcional de noche",
  },
  {
    id: "eq-trucha-spin",
    cana: "Spinning 1,80–2,10 m, acción media, potencia liviana (4–12 lb)",
    reel: "Frontal 1000–2500, relación 5.2:1",
    linea: "Multifilamento 8–12 lb + líder fluorocarbono 8 lb",
    accesorios: "Anzuelos simples sin rebaba, copo de red blanda, pinza",
  },
  {
    id: "eq-trucha-fly",
    cana: "Fly 9 pies #5–#6, acción media-rápida",
    reel: "Fly con freno de disco y 100 m de backing",
    linea: "WF flotante #5–#6, leader 9 pies 3X–5X",
    accesorios: "Tippet 4X–6X, floatant, chaleco, botas de vadeo",
  },
  {
    id: "eq-pejerrey",
    cana: "Caña de flote 3,00–3,60 m, acción parabólica liviana",
    reel: "Frontal 2000–3000, relación 5.0:1",
    linea: "Nylon 0,22–0,25 mm",
    accesorios: "Línea de 4–6 brazoladas, anzuelos #10–#12, boya deslizante",
  },
  {
    id: "eq-tararira",
    cana: "Spinning 1,80–1,98 m, acción rápida, potencia media",
    reel: "Frontal 2500–3000 o rotativo baitcast",
    linea: "Multifilamento 15–20 lb + líder de acero fino",
    accesorios: "Anzuelos anchos, pinza larga, snaps de cambio rápido",
  },
  {
    id: "eq-bagre",
    cana: "Caña de fondo o variada 2,10–2,70 m, potencia media (10–25 lb)",
    reel: "Frontal 3000–4000, relación 5.2:1",
    linea: "Nylon 0,30 mm o multifilamento 15 lb",
    accesorios: "Anzuelos 1/0–3/0, plomada 40–80 g, línea de 2 brazoladas, trapo para manipular",
  },
  {
    id: "eq-boga",
    cana: "Caña variada 2,40–3,00 m, acción parabólica, potencia liviana-media",
    reel: "Frontal 2500–3500, relación 5.2:1",
    linea: "Nylon 0,25–0,30 mm",
    accesorios: "Anzuelos #4–#1 de tija corta, plomada corrediza 20–40 g, boya opcional",
  },
  {
    id: "eq-pacu",
    cana: "Spinning o variada 2,10–2,40 m, potencia media-pesada (15–30 lb)",
    reel: "Frontal 4000 con buen freno o rotativo",
    linea: "Multifilamento 25–30 lb + líder fluorocarbono 40 lb",
    accesorios: "Anzuelos 2/0–4/0 fuertes de tija corta, plomada liviana, copo grande",
  },
];

export const tecnicas: Tecnica[] = [
  {
    id: "spinning",
    nombre: "Spinning de costa",
    descripcion:
      "Lanzás el señuelo abanicando el sector y recuperás a distintas velocidades. Buscá correderas, pozones y bordes de vegetación; variá el ritmo hasta encontrar el pique.",
    nivel: "principiante",
  },
  {
    id: "embarcado",
    nombre: "Embarcado / deriva",
    descripcion:
      "Desde la lancha derivás con la corriente presentando carnada o señuelo cerca del fondo. Usá sonda para ubicar cardúmenes y estructuras sumergidas.",
    nivel: "avanzado",
  },
  {
    id: "fondo",
    nombre: "Pesca de fondo",
    descripcion:
      "Plomada apoyada y carnada quieta. Clave la caña en el portacaña, mantené la línea tensa y esperá el segundo tirón antes de clavar.",
    nivel: "principiante",
  },
  {
    id: "fly",
    nombre: "Fly casting",
    descripcion:
      "Lanzás el peso de la línea, no del señuelo. En Patagonia trabajá streamer contra la barranca o ninfa en deriva muerta, con vadeo prolijo y aguas arriba.",
    nivel: "avanzado",
  },
  {
    id: "trolling",
    nombre: "Trolling",
    descripcion:
      "Arrastre de señuelos a 2–4 nudos detrás del bote. Ideal para salmónidos en lagos profundos; variá la profundidad con plomos o líneas lastradas.",
    nivel: "avanzado",
  },
  {
    id: "flote",
    nombre: "Pesca a flote",
    descripcion:
      "Boya y línea de varias brazoladas para pejerrey. Ajustá la profundidad hasta encontrar el cardumen y recuperá lento y parejo.",
    nivel: "principiante",
  },
  {
    id: "encarnada-liviana",
    nombre: "Encarnada liviana de barranca",
    descripcion:
      "Plomada corrediza y carnada blanda (masa, fruta o insecto) cerca de camalotes y barrancas. Línea semitensa y clavada corta al primer tirón firme.",
    nivel: "principiante",
  },
];

export const especies: Especie[] = [
  {
    id: "dorado",
    nombre: "Dorado",
    cientifico: "Salminus brasiliensis",
    icono: "🐟",
    foto: fotoDorado,
    descripcion: "El tigre del Paraná: saltos, corridas y piques violentos.",
    detalle:
      "Depredador de aguas cálidas y correntosas. Se concentra en correderas, cabeceras de islas y zonas de remanso donde caza sábalos y mojarras. Muy sensible a la presión de pesca: se recomienda devolución.",
    temporadas: ["primavera", "verano", "otono", "invierno"],
    modalidad: ["devolucion"],
    nivel: "avanzado",
    carnadas: ["morena", "mojarra", "cuchara", "popper", "minnow"],
    equipo: "eq-dorado",
    tecnicas: ["spinning", "embarcado"],
  },
  {
    id: "surubi",
    nombre: "Surubí",
    cientifico: "Pseudoplatystoma corruscans",
    icono: "🐡",
    foto: fotoSurubi,
    descripcion: "Gigante de fondo, pique nocturno y peleas de fuerza pura.",
    detalle:
      "Bagre de gran porte que habita pozones profundos del Paraná. Mejor actividad de noche y con agua en bajante. Requiere equipo robusto y paciencia: el pique es un tirón sostenido.",
    temporadas: ["verano", "otono", "primavera"],
    modalidad: ["devolucion", "consumo"],
    nivel: "avanzado",
    carnadas: ["anguila", "morena", "jig"],
    equipo: "eq-surubi",
    tecnicas: ["fondo", "embarcado"],
  },
  {
    id: "tararira",
    nombre: "Tararira",
    cientifico: "Hoplias malabaricus",
    icono: "🎣",
    foto: fotoTararira,
    descripcion: "Emboscada entre juncos, ataca señuelos de superficie.",
    detalle:
      "Vive en lagunas, riachos y zonas vegetadas. Ideal para iniciarse en spinning: pesca visual, cercana y muy activa en días cálidos.",
    temporadas: ["primavera", "verano", "otono"],
    modalidad: ["devolucion", "consumo"],
    nivel: "principiante",
    carnadas: ["mojarra", "popper", "spinnerbait", "softbait"],
    equipo: "eq-tararira",
    tecnicas: ["spinning"],
  },
  {
    id: "pati",
    nombre: "Patí",
    cientifico: "Luciopimelodus pati",
    icono: "🐠",
    foto: fotoPati,
    descripcion: "Bagre abundante del Paraná, pique constante desde la costa.",
    detalle:
      "Se pesca de fondo casi todo el año. Excelente objetivo para arrancar con pesca de barranca: no exige equipo fino y da acción sostenida.",
    temporadas: ["otono", "invierno", "primavera", "verano"],
    modalidad: ["consumo", "devolucion"],
    nivel: "principiante",
    carnadas: ["lombriz", "anguila", "morena", "menudo"],
    equipo: "eq-surubi",
    tecnicas: ["fondo"],
  },
  {
    id: "bagre-amarillo",
    nombre: "Bagre amarillo",
    cientifico: "Pimelodus maculatus",
    icono: "🐟",
    foto: fotoBagreAmarillo,
    descripcion: "El más generoso del río: pique seguro todo el año y equipo simple.",
    detalle:
      "Bagre de porte chico a mediano, abundantísimo en el Paraná, el Uruguay y sus riachos. Anda en grupos sobre fondos de barro y cerca de barrancas y muelles. Pica mejor con agua turbia, al atardecer y de noche. Cuidado con las espinas pectorales: manipulalo con trapo o pinza.",
    temporadas: ["verano", "otono", "invierno", "primavera"],
    modalidad: ["consumo", "devolucion"],
    nivel: "principiante",
    carnadas: ["lombriz", "menudo", "masa", "anguila"],
    equipo: "eq-bagre",
    tecnicas: ["fondo", "encarnada-liviana"],
  },
  {
    id: "pacu",
    nombre: "Pacú",
    cientifico: "Piaractus mesopotamicus",
    icono: "🐡",
    foto: fotoPacu,
    descripcion: "Fuerza bruta y pique fino: se busca con fruta cerca de camalotes.",
    detalle:
      "Habita el Paraná medio y alto, el Paraguay y los esteros correntinos. Come frutos, semillas e insectos que caen al agua, así que se lo busca bajo árboles ribereños, camalotales y bocas de riacho. Pique sutil pero pelea potentísima: exige anzuelo fuerte de tija corta y freno bien ajustado. Mejor época con agua cálida.",
    temporadas: ["verano", "primavera", "otono"],
    modalidad: ["devolucion", "consumo"],
    nivel: "avanzado",
    carnadas: ["fruta", "cascarudo", "masa"],
    equipo: "eq-pacu",
    tecnicas: ["encarnada-liviana", "embarcado"],
  },
  {
    id: "boga",
    nombre: "Boga",
    cientifico: "Megaleporinus obtusidens",
    icono: "🐠",
    foto: fotoBoga,
    descripcion: "Pique astuto y pelea rápida; la mejor escuela de encarnada fina.",
    detalle:
      "Muy común en todo el litoral. Anda en cardúmenes sobre fondos duros, espigones y correderas suaves. Roba la carnada con delicadeza: conviene masa bien compacta, anzuelo chico y clavada inmediata. Excelente objetivo cuando el dorado no pica.",
    temporadas: ["primavera", "verano", "otono", "invierno"],
    modalidad: ["consumo", "devolucion"],
    nivel: "principiante",
    carnadas: ["masa", "lombriz", "cascarudo", "fruta"],
    equipo: "eq-boga",
    tecnicas: ["encarnada-liviana", "fondo"],
  },
  {
    id: "corvina",
    nombre: "Corvina rubia",
    cientifico: "Micropogonias furnieri",
    icono: "🐟",
    foto: fotoCorvina,
    descripcion: "Reina de la costa bonaerense, se pesca en la rompiente.",
    detalle:
      "Frecuenta playas de arena y escolleras. Mejores resultados con marea creciente, agua algo turbia y viento del sector este. Pique en dos golpes.",
    temporadas: ["verano", "otono", "primavera"],
    modalidad: ["consumo", "devolucion"],
    nivel: "principiante",
    carnadas: ["camaron", "anchoa", "calamar"],
    equipo: "eq-corvina",
    tecnicas: ["fondo"],
  },
  {
    id: "pescadilla",
    nombre: "Pescadilla",
    cientifico: "Cynoscion guatucupa",
    icono: "🐟",
    foto: fotoPescadilla,
    descripcion: "Cardúmenes cerca de la orilla, muy activa de noche.",
    detalle:
      "Se mueve en grupos por las canaletas de playa. Cuando entra el cardumen el pique es continuo: dos brazoladas cortas y carnada chica funcionan mejor.",
    temporadas: ["otono", "invierno", "primavera"],
    modalidad: ["consumo", "devolucion"],
    nivel: "principiante",
    carnadas: ["anchoa", "calamar", "camaron"],
    equipo: "eq-pescadilla",
    tecnicas: ["fondo"],
  },
  {
    id: "trucha-arcoiris",
    nombre: "Trucha arcoíris",
    cientifico: "Oncorhynchus mykiss",
    icono: "🐠",
    foto: fotoTruchaArcoiris,
    descripcion: "Ícono patagónico: agua fría, cristalina y saltos largos.",
    detalle:
      "Habita ríos y lagos de la Patagonia. Busca oxígeno y comida en correderas y desembocaduras. Temporada regulada: consultá siempre el reglamento provincial.",
    temporadas: ["primavera", "verano", "otono"],
    modalidad: ["devolucion", "consumo"],
    nivel: "principiante",
    carnadas: ["streamer", "ninfa", "cuchara", "minnow"],
    equipo: "eq-trucha-spin",
    tecnicas: ["spinning", "fly"],
  },
  {
    id: "trucha-marron",
    nombre: "Trucha marrón",
    cientifico: "Salmo trutta",
    icono: "🐟",
    foto: fotoTruchaMarron,
    descripcion: "Desconfiada y territorial, premio mayor del fly patagónico.",
    detalle:
      "Prefiere sombras, troncos y barrancas socavadas. Los ejemplares grandes se mueven al atardecer y con poca luz; streamer grande y presentación silenciosa.",
    temporadas: ["otono", "primavera", "verano"],
    modalidad: ["devolucion"],
    nivel: "avanzado",
    carnadas: ["streamer", "minnow", "cuchara"],
    equipo: "eq-trucha-fly",
    tecnicas: ["fly", "trolling"],
  },
  {
    id: "salmon-encerrado",
    nombre: "Salmón encerrado",
    cientifico: "Salmo salar sebago",
    icono: "🐡",
    foto: fotoSalmon,
    descripcion: "Lagos profundos del sur, se busca con trolling y spinning.",
    detalle:
      "Se mantiene en cotas frías durante el verano y sube a superficie en primavera y otoño. Arrastre de cuchara plateada a media agua es la técnica clásica.",
    temporadas: ["primavera", "otono", "verano"],
    modalidad: ["devolucion", "consumo"],
    nivel: "avanzado",
    carnadas: ["cuchara", "minnow", "streamer"],
    equipo: "eq-trucha-spin",
    tecnicas: ["trolling", "spinning"],
  },
  {
    id: "pejerrey",
    nombre: "Pejerrey",
    cientifico: "Odontesthes bonariensis",
    icono: "🐟",
    foto: fotoPejerrey,
    descripcion: "Pesca social de lagunas, ideal con frío y viento suave.",
    detalle:
      "Cardúmenes en lagunas pampeanas y embalses. Mejor pique entre mayo y septiembre, con líneas de varias brazoladas y carnada chica bien presentada.",
    temporadas: ["invierno", "otono", "primavera"],
    modalidad: ["consumo", "devolucion"],
    nivel: "principiante",
    carnadas: ["lombriz", "mojarra"],
    equipo: "eq-pejerrey",
    tecnicas: ["flote", "embarcado"],
  },
];

const LITORAL = ["dorado", "surubi", "pati", "bagre-amarillo", "boga", "pacu", "tararira"];

export const regiones: Region[] = [
  {
    id: "paso-de-la-patria",
    provincia: "Corrientes",
    ambiente: "rio",
    spot: "Paso de la Patria",
    descripcion:
      "Confluencia del Paraná y el Paraguay: capital del dorado. Correderas, restingas e islas con pesca embarcada de primer nivel.",
    especies: LITORAL,
  },
  {
    id: "goya",
    provincia: "Corrientes",
    ambiente: "rio",
    spot: "Goya",
    descripcion:
      "Riachos, lagunas internas y el Paraná ancho. Surubí de fondo en los pozones y pacú entre camalotales.",
    especies: ["surubi", "pacu", "dorado", "bagre-amarillo", "boga", "pati"],
  },
  {
    id: "empedrado",
    provincia: "Corrientes",
    ambiente: "rio",
    spot: "Empedrado",
    descripcion:
      "Barrancas altas y playas de arena sobre el Paraná. Muy buena pesca de costa de bagre amarillo, boga y patí.",
    especies: ["bagre-amarillo", "boga", "pati", "dorado", "surubi"],
  },
  {
    id: "esquina",
    provincia: "Corrientes",
    ambiente: "rio",
    spot: "Esquina (río Corriente)",
    descripcion:
      "Desembocadura del río Corriente en el Paraná: aguas más claras, dorado de spinning y tararira en los esteros cercanos.",
    especies: ["dorado", "tararira", "boga", "bagre-amarillo", "pati"],
  },
  {
    id: "reconquista",
    provincia: "Santa Fe",
    ambiente: "rio",
    spot: "Reconquista (río San Jerónimo)",
    descripcion:
      "Riachos del norte santafesino con mucha estructura vegetal. Dorado, tararira y bagres desde la costa o en canoa.",
    especies: ["dorado", "tararira", "bagre-amarillo", "boga", "pati", "surubi"],
  },
  {
    id: "rio-parana",
    provincia: "Santa Fe",
    ambiente: "rio",
    spot: "Río Paraná (Rosario y alrededores)",
    descripcion:
      "Correderas, islas y pozones profundos. El escenario más completo del país: dorado, surubí y bagres todo el año.",
    especies: LITORAL,
  },
  {
    id: "parana-entre-rios",
    provincia: "Entre Ríos",
    ambiente: "rio",
    spot: "Paraná (ciudad y Victoria)",
    descripcion:
      "Frente a Rosario y Santa Fe: túneles de riachos, sauzales y grandes pozones. Ideal para surubí y boga.",
    especies: ["surubi", "dorado", "boga", "bagre-amarillo", "pati", "pacu"],
  },
  {
    id: "gualeguaychu",
    provincia: "Entre Ríos",
    ambiente: "rio",
    spot: "Gualeguaychú (río Uruguay)",
    descripcion:
      "Río Uruguay bajo, con playas, restingas y espigones. Boga, bagre amarillo, dorado y tararira en los arroyos.",
    especies: ["boga", "bagre-amarillo", "dorado", "tararira", "pati"],
  },
  {
    id: "zarate",
    provincia: "Buenos Aires",
    ambiente: "rio",
    spot: "Zárate (Paraná de las Palmas)",
    descripcion:
      "Delta bonaerense a una hora de CABA: muelles, arroyos y barrancas. Bagre amarillo y boga durante todo el año.",
    especies: ["bagre-amarillo", "boga", "pati", "tararira", "dorado", "surubi"],
  },
  {
    id: "mar-del-plata",
    provincia: "Buenos Aires",
    ambiente: "mar",
    spot: "Mar del Plata (costa y escolleras)",
    descripcion:
      "Playas de arena, muelles y escolleras. Pesca variada de rompiente, muy dependiente de mareas y viento.",
    especies: ["corvina", "pescadilla"],
  },
  {
    id: "laguna-chascomus",
    provincia: "Buenos Aires",
    ambiente: "laguna",
    spot: "Laguna de Chascomús",
    descripcion:
      "Laguna pampeana somera, clásica del pejerrey embarcado y de la tararira en la costa vegetada.",
    especies: ["pejerrey", "tararira"],
  },
  {
    id: "esteros-ibera",
    provincia: "Corrientes",
    ambiente: "laguna",
    spot: "Esteros del Iberá",
    descripcion:
      "Lagunas y embalsados con vegetación densa. Paraíso de la tararira de superficie y del pique de bagres.",
    especies: ["tararira", "bagre-amarillo", "boga", "pejerrey"],
  },
  {
    id: "salto-grande",
    provincia: "Entre Ríos",
    ambiente: "lago",
    spot: "Embalse de Salto Grande",
    descripcion:
      "Gran espejo de agua sobre el río Uruguay. Dorado y boga en las correderas del pie de represa, tararira en las bahías.",
    especies: ["dorado", "boga", "tararira", "bagre-amarillo", "surubi"],
  },
  {
    id: "lagos-patagonicos",
    provincia: "Neuquén / Río Negro",
    ambiente: "lago",
    spot: "Lagos y ríos patagónicos",
    descripcion:
      "Agua fría y cristalina entre bosques. Territorio de salmónidos, fly casting y trolling en lagos profundos.",
    especies: ["trucha-arcoiris", "trucha-marron", "salmon-encerrado"],
  },
];

export const provincias = Array.from(new Set(regiones.map((r) => r.provincia))).sort();

export function getRegion(id: string) {
  return regiones.find((r) => r.id === id);
}
export function getEspecie(id: string) {
  return especies.find((e) => e.id === id);
}
export function getCarnada(id: string) {
  return carnadas.find((c) => c.id === id);
}
export function getEquipo(id: string) {
  return equipos.find((e) => e.id === id);
}
export function getTecnica(id: string) {
  return tecnicas.find((t) => t.id === id);
}

/** Regiones que cumplen provincia/ambiente (usá "todos" para no filtrar). */
export function filtrarRegiones(provincia?: string, ambiente?: string) {
  return regiones.filter(
    (r) =>
      (!provincia || provincia === "todos" || r.provincia === provincia) &&
      (!ambiente || ambiente === "todos" || r.ambiente === ambiente),
  );
}
