# Open Art Tools

**Open Art Tools** es una **plataforma open source** que **agrupa y aloja herramientas gratuitas** para artistas.

No es una sola utilidad: es el paraguas donde viven las herramientas. Entras a la plataforma, eliges una y la usas cuando quieras.

Idea, design & creation by **Gerard Valls Montaño**. Licensed under **Apache-2.0**.

## Herramientas en la plataforma

### 1. Acuerdos de exhibición

Crea acuerdos y anexos para exhibir obra en **festivales, galerías u otros espacios**: custodia, seguro y responsabilidad, paso a paso, con control fino de cada cláusula y exportación a PDF.

Más herramientas se irán sumando a la misma plataforma.

## Principios

- **Plataforma → herramientas** — Open Art Tools contiene las herramientas; cada una hace un trabajo concreto
- **Gratis y open source** — para cualquier artista
- **Cero almacenamiento de datos de usuario** — nada en navegador ni servidor; sesión solo en memoria
- **Archivos que controlas tú** — descarga/carga un `.json` de sesión para reutilizar datos
- **Transparente** — sin cuentas cloud, sin analytics, sin telemetría

## Sitio público

https://openarttools.github.io/contract-studio/

## Desarrollo

```bash
npm install
npm run dev
npm test
npm run build
```

### Desktop (macOS, Windows, Linux)

Requiere [Rust](https://rustup.rs/):

```bash
npm run tauri:dev
npm run tauri:build
```

## Privacidad

Ver [PRIVACY.md](PRIVACY.md).

## Aviso

Las plantillas son **orientativas**. No han sido revisadas por abogados ni constituyen asesoramiento legal.
