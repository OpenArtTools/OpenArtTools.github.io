# Open ArtCore

**Open ArtCore** es la **plataforma paraguas** open source: la home agrupa apps gratuitas para el arte; cada app tiene su propia ruta.

Es **segura, privada, accesible, transparente cristalina y auditable**.

**Estado:** **beta golden master** (`0.1.0-beta.3`). Base estable para uso público; el catálogo de apps puede crecer.

- **Idea, diseño y desarrollo:** Gerard Valls Montaño  
- **Licencia:** [AGPL-3.0-or-later](LICENSE) — ver también [NOTICE](NOTICE) (autoría y obligaciones en lenguaje claro)  
- **Autoría:** Gerard Valls Montaño (debe conservarse y mencionarse siempre)  
- **Sitio (home):** https://openarttools.github.io/  
- **App:** https://openarttools.github.io/acuerdos-de-exhibicion  
- **Código:** https://github.com/OpenArtTools/OpenArtTools.github.io  
- **Versión:** 0.1.0-beta.3


---

## De dónde sale

La idea sale de la **experiencia propia** en la práctica artística y de la **necesidad real** de estos recursos: claros, libres y respetuosos con la privacidad. Se construyen y se comparten abiertas para quien las necesite.

El apartado **Invitar a un café** es **otra cosa**: apoyo voluntario al trabajo de desarrollo (ver más abajo y [SUPPORT.md](SUPPORT.md)).

---

## Premisas fundamentales

Se ofrece para **libre uso** bajo estas premisas:

| | |
|--|--|
| **Seguro** | Los datos del formulario no salen a servidores de Open ArtCore; sin telemetría ni envíos ocultos |
| **Privado** | Sin cuentas, sin nube, sin almacenamiento en la plataforma |
| **Accesible** | Gratis, open source, usable en el navegador; foco visible y respeto a movimiento reducido |
| **Transparente** | Transparencia cristalina: qué hace y qué no hace, sin letra pequeña |
| **Auditable** | Código público; cualquiera puede comprobar estas premisas ([AUDITABILITY.md](AUDITABILITY.md)) |

---

## Qué es (y qué no es)

| Sí | No |
|----|----|
| Plataforma web que aloja herramientas | Una app de escritorio descargable |
| Gratis y open source (AGPL) | Un producto cerrado o de pago |
| Datos solo en la memoria de la pestaña | Una nube que guarda contratos |
| Archivos `.json` que se descargan y cargan | Una agenda de clientes o contactos de terceros |
| Plantillas orientativas para el arte | Asesoramiento legal profesional |
| Autoría de Gerard Valls Montaño siempre visible | Quitar o ocultar el origen del proyecto |

---

## Rutas

Sitio: `https://openarttools.github.io/` — cada app es `/nombre-de-la-app`.

| URL | Qué es |
|-----|--------|
| https://openarttools.github.io/ | Home de Open ArtCore (plataforma paraguas) |
| https://openarttools.github.io/transparencia | Transparencia |
| https://openarttools.github.io/apoyo | Invitar a un café (apoyo voluntario) |
| https://openarttools.github.io/acuerdos-de-exhibicion | App: Acuerdos de exhibición |

---

## Cómo se usa, en 30 segundos

1. Abrir la [home](https://openarttools.github.io/).
2. (Opcional) En **Datos personales**, rellenar o cargar el perfil y descargarlo para reutilizarlo después.
3. Entrar en una app (hoy: **Acuerdos de exhibición** → `/acuerdos-de-exhibicion`).
4. Completar el asistente, revisar, aceptar y exportar (PDF / HTML / TXT).
5. Para retomar el trabajo más tarde, **descargar el borrador** dentro de la app antes de cerrar la pestaña.

**Importante:** al cerrar la pestaña, la plataforma borra lo que había en memoria. Esa advertencia está siempre visible arriba.

---

## Apps

### 1. Acuerdos de exhibición *(disponible)* — `/acuerdos-de-exhibicion`

Sirve para generar anexos / acuerdos de exhibición de obra en **festivales, galerías u otros espacios**.

Incluye, entre otras cosas:

- Identificación de partes (autor y organización)
- Datos del proyecto e instalación
- Custodia, montaje y riesgos
- Seguros y responsabilidad
- Revisión cláusula a cláusula
- Exportación a PDF (imprimir / guardar), HTML y TXT

Los datos de la **otra parte** (organización / cliente) se escriben solo en el formulario de ese documento. **No hay lista de clientes** en la plataforma.

Más apps se irán sumando al mismo paraguas, cada una con su ruta.

---

## Dos tipos de archivo (no confundirlos)

La plataforma **no guarda nada**. Para reutilizar datos, se descarga un archivo al dispositivo.

### A) Datos personales — nivel plataforma

| | |
|--|--|
| **Dónde** | Página de inicio de la plataforma |
| **Para qué** | Identidad (nombre, documento, domicilio, email, teléfono…) |
| **Reutilizable** | En esta herramienta y en futuras |
| **Formato** | `.json` con `kind: "openarttools.profile"` |
| **No es** | Una agenda de clientes ni contactos de terceros |

Si se carga el perfil y se abre una herramienta, puede rellenar la parte de autoría (p. ej. quien firma como autora o titular).

### B) Borrador del documento — dentro de cada herramienta

| | |
|--|--|
| **Dónde** | Solo dentro de la herramienta (asistente, revisión, aceptación) |
| **Para qué** | Retomar **ese** acuerdo (formulario, cláusulas y estado de edición) |
| **Formato** | `.json` con `kind: "openarttools.draft"` |
| **No es** | El perfil personal reutilizable entre herramientas |

Se puede descargar el borrador **en cualquier momento** mientras el documento esté en memoria (también desde la franja superior).

Si se vuelve a abrir la misma herramienta con un documento en curso, la plataforma pregunta si se quiere **retomar** o empezar de nuevo.

---

## Privacidad, en una frase

**La plataforma no almacena los datos de quien la usa.** Viven en la pestaña; al cerrarla, desaparecen de la plataforma. Solo salen si se exportan o descargan.

Detalle completo: [PRIVACY.md](PRIVACY.md).

---

## Transparencia y auditoría

Se puede comprobar en el código que no hay cuentas cloud, telemetría ni `localStorage` para esos datos.

- En la interfaz: franja de transparencia + página **Transparencia**
- En el repo: [AUDITABILITY.md](AUDITABILITY.md)

---

## Invitar a un café

*(Apartado distinto del origen de la idea.)*

Open ArtCore lo mantiene Gerard Valls Montaño de forma **voluntaria**, sin cobros ni suscripciones. Quien lo desee puede **invitar a un café** para **respaldar el trabajo de desarrollo**. Nunca es obligatorio ni desbloquea funciones.

Detalle: [SUPPORT.md](SUPPORT.md).

---

## Aviso legal sobre las plantillas

Las plantillas **no han sido revisadas por profesionales del derecho**. **No constituyen asesoramiento legal.** Sirven como ayuda práctica; si hace falta, conviene consultar a una persona profesional del derecho.

---

## Documentación de este repositorio

| Archivo | Contenido |
|---------|-----------|
| [README.md](README.md) | Qué es la plataforma y cómo usarla (este archivo) |
| [PRIVACY.md](PRIVACY.md) | Privacidad: qué se guarda, qué no, y los archivos opcionales |
| [AUDITABILITY.md](AUDITABILITY.md) | Cómo auditar el código y las premisas |
| [SUPPORT.md](SUPPORT.md) | Invitar a un café: qué es y qué no es |
| [LICENSE](LICENSE) | Licencia AGPL-3.0-or-later (texto legal) |
| [NOTICE](NOTICE) | Autoría, origen y obligaciones en lenguaje claro |
| [COPYRIGHT](COPYRIGHT) | Autoría |

---

## Desarrollo local

Requisitos: Node.js 22+ recomendado.

```bash
npm install
npm run dev      # http://localhost:5173
npm test
npm run build
```

Vista previa del build:

```bash
npm run preview
```

### Estructura del código

```
src/
  main.ts              pantallas y flujo
  session.ts           estado en memoria (se pierde al cerrar la pestaña)
  platform.ts          marca, catálogo, textos de transparencia y apoyo
  router.ts            rutas de la plataforma y de cada app
  shell.ts             header, franjas fijas, footer
  dom.ts               helpers DOM mínimos
  engine/              ensamblado de plantillas (testeado)
  templates/           textos de documentos
  storage/
    profile.ts         perfil personal (.json)
    draft.ts           borrador de documento (.json)
    jsonFile.ts        descarga / lectura de JSON
  export/              PDF / HTML / TXT
```

Los archivos `.json` de perfil y borrador usan `kind: "openarttools.profile"` / `"openarttools.draft"` (formato estable; el nombre del kind no es la marca de producto).

El sitio público se publica con GitHub Pages desde la rama `main` (ver `.github/workflows/pages.yml`).

---

## Licencia y autoría

Idea, diseño, creación y desarrollo: **Gerard Valls Montaño**.

Licencia: **GNU Affero General Public License v3 (o posterior)** — [LICENSE](LICENSE).

Eso significa, en resumen:

- El proyecto es **completamente open source**.
- La autoría de Gerard Valls Montaño **debe mantenerse y mencionarse siempre**.
- Si se comparte o publica el proyecto (o una versión modificada), hay que **mencionar el origen** y **compartir el código** bajo la misma licencia.
- Cualquier modificación debe **referenciar la obra original**.
- Si se publica una versión modificada en la web, también hay que ofrecer el código fuente (AGPL).

Detalle en lenguaje claro: [NOTICE](NOTICE).  
Autoría: [COPYRIGHT](COPYRIGHT).
