# Open Art Tools

**Open Art Tools** es una **plataforma web open source** que **agrupa y aloja herramientas gratuitas** para artistas.

No es una sola utilidad: es el paraguas donde viven las herramientas. Entras a la plataforma, eliges una y la usas cuando quieras.

Idea, design & creation by **Gerard Valls Montaño**. Licensed under **Apache-2.0**.

## Herramientas en la plataforma

### 1. Acuerdos de exhibición

Crea acuerdos y anexos para exhibir obra en **festivales, galerías u otros espacios**: custodia, seguro y responsabilidad, paso a paso, con control fino de cada cláusula y exportación a PDF.

Más herramientas se irán sumando a la misma plataforma.

## Principios

- **Plataforma → herramientas** — Open Art Tools contiene las herramientas; cada una hace un trabajo concreto
- **Transparencia siempre visible** — open source, cero almacenamiento de tus datos, auditable
- **Gratis y open source** — para cualquier artista
- **Apoyo voluntario** — nunca obligatorio; ayuda al mantenimiento si quieres
- **Sin agendas de clientes** — no hay listas reutilizables de contactos de terceros
- **Mis datos personales** — en la plataforma; `.json` reutilizable entre herramientas
- **Borrador del documento** — dentro de cada herramienta (p. ej. Acuerdos de exhibición)
- **Código claro** — pensado para que cualquiera pueda leerlo y usarlo

## Estructura del código

```
src/
  main.ts            → pantallas y flujo
  session.ts         → estado de sesión en memoria
  platform.ts        → marca, catálogo, transparencia, apoyo
  shell.ts           → header, franjas, footer
  dom.ts             → helpers DOM mínimos
  engine/            → lógica de plantillas (testeada)
  templates/         → textos de documentos
  storage/profile.ts → mis datos personales (.json)
  storage/draft.ts   → borrador del documento (.json)
  export/            → PDF / HTML / TXT
```

## Sitio público

https://openarttools.github.io/contract-studio/

## Desarrollo

```bash
npm install
npm run dev
npm test
npm run build
```

## Privacidad

Ver [PRIVACY.md](PRIVACY.md).

## Apoyo voluntario

Ver [SUPPORT.md](SUPPORT.md).

## Aviso

Las plantillas son **orientativas**. No han sido revisadas por abogados ni constituyen asesoramiento legal.
