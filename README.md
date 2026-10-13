# Pesca Argentina Guide

Quiero crear una aplicación web llamada “Pesca Argentina” (o similar), una plataforma de recomendaciones de pesca deportiva pensada para pescadores en Argentina. La idea central es que el usuario indique dónde va a pescar (provincia, región o cuerpo de agua específico) y la app le devuelva recomendaciones personalizadas de especies, carnadas, señuelos, equipo y técnicas.

Funcionalidad principal

	1.	Selector de ubicación: el usuario elige una provincia y luego un tipo de ambiente (mar, río, lago/embalse, laguna) o un spot específico dentro de una lista precargada (ej: Río Paraná, Río Negro, Río Uruguay, Chubut, lagos patagónicos, costa atlántica bonaerense, Mar del Plata, etc).

	2.	Resultado de recomendación, que muestra:

	•	Especies más frecuentes en esa zona (ej: dorado, surubí, pejerrey, trucha, salmón, corvina, pacú, tararira, etc), con una foto/ícono y una breve descripción de cada una.

	•	Carnadas naturales recomendadas por especie (ej: lombriz, mojarra, morena, camarón, anchoa, calamar).

	•	Señuelos artificiales recomendados (si esa especie/zona se presta a pesca con señuelo), especificando tipo: cucharas, spinnerbaits, poppers, minnows, softbaits, jigs, spoons — indicando color y tamaño sugerido según la temporada/agua.

	•	Equipo recomendado: tipo de caña (acción, potencia, longitud), reel (tamaño, relación de recuperación), línea/multifilamento (libraje sugerido) y accesorios (anzuelos, plomadas, líder).

	•	Técnica/modalidad de pesca recomendada: costa, embarcado, spinning, fly casting, pesca de fondo, trolling, etc, con una breve explicación de cómo aplicarla.

	3.	Filtros adicionales (opcionales pero deseables): época del año/temporada, tipo de pesca (con devolución o de consumo), nivel de experiencia (principiante/avanzado).

	4.	Diseño: estilo outdoor/naturaleza, colores tierra y azules, tipografía robusta y legible, con fotos de paisajes de pesca argentinos (ríos, costas, patagonia). Debe ser responsive y priorizar mobile-first, ya que muchos usuarios lo van a consultar desde la costa o el bote.

	5.	Estructura de datos: modelá la información como una base de datos relacional simple:

	•	Tabla regiones (provincia, tipo de ambiente, nombre del spot)

	•	Tabla especies (nombre, descripción, foto, regiones donde habita)

	•	Tabla carnadas (nombre, tipo: natural/artificial, especies asociadas)

	•	Tabla equipo (tipo de caña, reel, línea, asociado a especie/técnica)

	•	Tabla tecnicas (nombre, descripción, especies/regiones asociadas)

Esto para que después se pueda ampliar el contenido fácilmente sin tocar el diseño.

	6.	Páginas:

	•	Home con buscador principal (”¿Dónde vas a pescar?”)

	•	Página de resultados/recomendación

	•	Página de detalle por especie

	•	Página “Guía de señuelos” con catálogo general

	•	Página “Sobre la app”

Empezá generando la estructura general, el home con el selector de ubicación y una página de resultados de ejemplo con datos de 2 o 3 regiones (por ejemplo Río Paraná y Mar del Plata) para validar el diseño antes de cargar todo el contenido.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://pesca-guia-argentina.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/b563ec61-815f-4484-9bd4-1c2366e498f6).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
