export interface Receta {
  id: string;
  especieId: string;
  nombre: string;
  tiempo: string;
  porciones: string;
  dificultad: "fácil" | "media" | "avanzada";
  ingredientes: string[];
  pasos: string[];
  tip: string;
}

/** Especies que conviene devolver al agua: no llevan receta. */
export const soloDevolucion: Record<string, string> = {
  dorado:
    "El dorado es una especie de alto valor deportivo y carne con muchas espinas: la práctica recomendada es pesca con devolución. Sacale la foto y devolvelo al agua.",
  "trucha-marron":
    "Las truchas marrón grandes son reproductoras clave del ambiente patagónico: se recomienda devolución. Si vas a llevar una, respetá la medida y el cupo del reglamento provincial.",
};

export const recetas: Receta[] = [
  {
    id: "surubi-a-la-parrilla",
    especieId: "surubi",
    nombre: "Surubí a la parrilla con limón y perejil",
    tiempo: "40 min",
    porciones: "4 porciones",
    dificultad: "fácil",
    ingredientes: [
      "4 rodajas de surubí de 3 cm (con piel)",
      "Jugo de 2 limones",
      "1 puñado de perejil picado",
      "3 dientes de ajo picados",
      "Aceite de oliva, sal y pimienta",
    ],
    pasos: [
      "Salpimentá las rodajas y dejalas 15 minutos con jugo de limón.",
      "Prendé la parrilla y esperá brasas suaves, sin llama.",
      "Cocinalas 8 minutos de cada lado, pincelando con aceite de oliva.",
      "Mezclá ajo, perejil, aceite y limón y volcá el chimichurri sobre el pescado caliente.",
    ],
    tip: "La rodaja gruesa y con piel es clave: sostiene la carne y no se desarma al darla vuelta.",
  },
  {
    id: "pacu-al-horno",
    especieId: "pacu",
    nombre: "Pacú al horno con papas y tomate",
    tiempo: "1 h",
    porciones: "4 porciones",
    dificultad: "fácil",
    ingredientes: [
      "1 costillar de pacú (o 4 filetes gruesos)",
      "4 papas en rodajas finas",
      "3 tomates en rodajas",
      "1 cebolla en aros",
      "Orégano, pimentón, aceite, sal y pimienta",
    ],
    pasos: [
      "Precalentá el horno a 200 °C y aceitá una fuente grande.",
      "Hacé una base con las papas, salpimentá y horneá 15 minutos.",
      "Apoyá el pacú sobre las papas, cubrí con cebolla y tomate y condimentá.",
      "Horneá 30 a 35 minutos hasta que la carne se separe fácil del hueso.",
    ],
    tip: "El pacú tiene grasa propia: no hace falta cargarlo de aceite, se dora solo.",
  },
  {
    id: "bagre-frito",
    especieId: "bagre-amarillo",
    nombre: "Bagre amarillo frito crocante",
    tiempo: "30 min",
    porciones: "4 porciones",
    dificultad: "fácil",
    ingredientes: [
      "8 bagres amarillos limpios (sin piel)",
      "1 taza de harina de maíz gruesa (polenta) o harina común",
      "2 huevos batidos",
      "Aceite para freír",
      "Sal, pimienta y limón",
    ],
    pasos: [
      "Lavá bien los bagres, secalos y salpimentalos.",
      "Pasalos por huevo y después por harina de maíz, presionando para que pegue.",
      "Freí en aceite bien caliente 4 a 5 minutos por lado hasta que estén dorados.",
      "Escurrí sobre papel y servilos con limón y ensalada.",
    ],
    tip: "Frito en aceite bien caliente queda crocante y no absorbe grasa.",
  },
  {
    id: "boga-a-la-parrilla",
    especieId: "boga",
    nombre: "Boga a la parrilla abierta al ajillo",
    tiempo: "50 min",
    porciones: "3 porciones",
    dificultad: "media",
    ingredientes: [
      "1 boga grande abierta en mariposa (con escamas del lado de abajo)",
      "5 dientes de ajo picados",
      "1 morrón en tiras",
      "Aceite de oliva, laurel, sal gruesa",
      "Jugo de 1 limón",
    ],
    pasos: [
      "Apoyá la boga con las escamas hacia las brasas: hacen de sartén natural.",
      "Salá con sal gruesa y sumá el morrón y el laurel encima.",
      "Cociná 35 a 40 minutos con brasas suaves, sin darla vuelta.",
      "Pincelá con aceite, ajo y limón en los últimos 5 minutos.",
    ],
    tip: "La boga tiene muchas espinas finas: cocinala bien y desmenuzá la carne al servir.",
  },
  {
    id: "pati-guiso",
    especieId: "pati",
    nombre: "Guiso de patí con arroz",
    tiempo: "1 h",
    porciones: "4 porciones",
    dificultad: "fácil",
    ingredientes: [
      "600 g de patí en cubos, sin piel",
      "1 taza de arroz",
      "1 cebolla, 1 morrón y 2 tomates picados",
      "1 zanahoria en cubos",
      "Caldo de verdura, pimentón, laurel, sal y pimienta",
    ],
    pasos: [
      "Rehogá cebolla, morrón y zanahoria en aceite hasta que estén tiernos.",
      "Sumá tomate, pimentón y laurel y cociná 5 minutos.",
      "Agregá el arroz y el caldo caliente y cociná 12 minutos.",
      "Incorporá el patí y cociná 8 minutos más, sin revolver de más.",
    ],
    tip: "El patí es graso y sabroso: quitale bien la piel y la grasa oscura antes de cocinar.",
  },
  {
    id: "tararira-milanesas",
    especieId: "tararira",
    nombre: "Milanesas de tararira",
    tiempo: "40 min",
    porciones: "4 porciones",
    dificultad: "media",
    ingredientes: [
      "4 filetes de tararira sin espinas",
      "2 huevos con ajo y perejil",
      "2 tazas de pan rallado",
      "Aceite para freír",
      "Sal, pimienta y limón",
    ],
    pasos: [
      "Fileteá la tararira retirando con paciencia la línea de espinas en Y.",
      "Dejá los filetes 20 minutos en agua con limón para blanquear la carne.",
      "Pasalos por huevo condimentado y pan rallado, apretando bien.",
      "Freí 3 minutos por lado o cocinalos al horno a 220 °C, 15 minutos.",
    ],
    tip: "Si vas a comerla, matala y enfriala en hielo enseguida: mejora muchísimo el sabor.",
  },
  {
    id: "corvina-a-la-sal",
    especieId: "corvina",
    nombre: "Corvina rubia a la sal",
    tiempo: "50 min",
    porciones: "4 porciones",
    dificultad: "media",
    ingredientes: [
      "1 corvina entera de 1,5 kg, sin escamar, eviscerada",
      "2 kg de sal gruesa",
      "2 claras de huevo",
      "Rodajas de limón y ramitas de romero",
      "Aceite de oliva",
    ],
    pasos: [
      "Mezclá la sal con las claras y un chorrito de agua hasta formar una pasta.",
      "Rellená la corvina con limón y romero.",
      "Cubrila entera con la sal sobre una fuente y horneá a 200 °C, 35 minutos.",
      "Rompé la costra, retirá la piel con la sal y serví con oliva.",
    ],
    tip: "La corvina de la rompiente se sangra y se pone en conservadora con hielo al sacarla.",
  },
  {
    id: "pescadilla-al-limon",
    especieId: "pescadilla",
    nombre: "Pescadilla a la plancha con manteca de limón",
    tiempo: "25 min",
    porciones: "2 porciones",
    dificultad: "fácil",
    ingredientes: [
      "4 filetes de pescadilla",
      "40 g de manteca",
      "Jugo de 1 limón",
      "1 cucharada de alcaparras (opcional)",
      "Sal, pimienta y perejil",
    ],
    pasos: [
      "Secá los filetes con papel y salpimentalos.",
      "Cocinalos en plancha caliente con un poco de manteca, 2 minutos por lado.",
      "Retiralos y en la misma sartén derretí la manteca con limón y alcaparras.",
      "Volcá la salsa sobre los filetes y terminá con perejil.",
    ],
    tip: "Es una carne muy delicada: poco tiempo de cocción y nada de moverla en la sartén.",
  },
  {
    id: "trucha-en-papillote",
    especieId: "trucha-arcoiris",
    nombre: "Trucha arcoíris en papillote",
    tiempo: "35 min",
    porciones: "2 porciones",
    dificultad: "fácil",
    ingredientes: [
      "2 truchas enteras evisceradas",
      "1 limón en rodajas",
      "1 puerro y 1 zanahoria en juliana",
      "Manteca, tomillo, sal y pimienta",
      "Papel de aluminio",
    ],
    pasos: [
      "Salpimentá las truchas por dentro y por fuera.",
      "Armá camas de verduras sobre el aluminio y apoyá cada trucha encima.",
      "Sumá limón, tomillo y un cubo de manteca y cerrá bien los paquetes.",
      "Cociná 20 minutos al horno a 200 °C o sobre brasas suaves.",
    ],
    tip: "Ideal para cocinar en camping: no necesitás sartén ni ensuciar nada.",
  },
  {
    id: "salmon-ahumado-casero",
    especieId: "salmon-encerrado",
    nombre: "Salmón encerrado ahumado en caliente",
    tiempo: "1 h 30 min",
    porciones: "4 porciones",
    dificultad: "avanzada",
    ingredientes: [
      "2 filetes grandes de salmón con piel",
      "4 cucharadas de sal gruesa y 2 de azúcar",
      "Pimienta en grano y laurel",
      "Viruta de leña frutal o de roble",
    ],
    pasos: [
      "Curá los filetes 1 hora con la mezcla de sal, azúcar y pimienta en la heladera.",
      "Enjuagá, secá y dejá al aire 20 minutos hasta que la superficie esté pegajosa.",
      "Ahumá a 80 °C durante 40 a 50 minutos con viruta húmeda.",
      "Dejá enfriar y servilo en lonjas con pan y queso crema.",
    ],
    tip: "Si no tenés ahumador, usá una olla profunda con viruta al fondo y una rejilla.",
  },
  {
    id: "pejerrey-escabeche",
    especieId: "pejerrey",
    nombre: "Pejerrey en escabeche",
    tiempo: "1 h + 24 h de reposo",
    porciones: "6 porciones",
    dificultad: "media",
    ingredientes: [
      "12 filetes de pejerrey",
      "2 cebollas, 2 zanahorias y 1 morrón en juliana",
      "1 taza de vinagre de alcohol y 1 taza de aceite",
      "Laurel, pimienta en grano, sal",
    ],
    pasos: [
      "Pasá los filetes por harina y freílos apenas dorados; escurrilos.",
      "Cociná las verduras en aceite 10 minutos, sumá vinagre, laurel y pimienta.",
      "Alterná capas de pescado y verduras en un frasco o fuente honda.",
      "Cubrí con el líquido y dejá reposar 24 horas en la heladera.",
    ],
    tip: "Clásico de laguna: rinde mucho y dura una semana bien tapado en frío.",
  },
];

export function getRecetasDeEspecie(especieId: string) {
  return recetas.filter((r) => r.especieId === especieId);
}
