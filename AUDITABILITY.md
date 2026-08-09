# Auditoría

Open Art Tools es **open source** bajo la licencia [AGPL-3.0-or-later](LICENSE).

La autoría de **Gerard Valls Montaño** debe conservarse. Las obligaciones de atribución, origen y copyleft están resumidas en [NOTICE](NOTICE).

Cualquiera debería poder verificar **qué hace** la plataforma y, sobre todo, **qué no hace**.

Este documento es la guía para auditar el proyecto con claridad.

---

## Promesas que puedes comprobar

| # | Promesa | Dónde mirar |
|---|---------|-------------|
| 1 | **No se envían** los datos de tus contratos a un servidor de la plataforma | No debería haber `fetch` / `XMLHttpRequest` / `sendBeacon` con el contenido del formulario en `src/` |
| 2 | **No hay** `localStorage`, cookies ni almacén del navegador para tus datos | Buscar `localStorage` / cookies de sesión en `src/` |
| 3 | Solo hay archivos **opcionales** que tú descargas | `src/storage/profile.ts` (perfil) y `src/storage/draft.ts` (borrador). No escriben en el navegador |
| 4 | **Solo web** — sin instalador de escritorio | No debe existir `src-tauri/`, ni scripts `tauri` en `package.json` |
| 5 | **Sin agendas de clientes** | No debe existir módulo de contactos / `openarttools.contacts` |
| 6 | **Sin identidades de ejemplo reales** en plantillas | Placeholders instructivos y marcadores `[…]`, no DNIs ni nombres reales de muestra |
| 7 | Autoría y licencia visibles (AGPL + origen) | `LICENSE`, `NOTICE`, `COPYRIGHT`, pie de la UI, franja de transparencia |

---

## Cómo auditar en local

```bash
npm install
npm test
npm run build
```

Comprobaciones útiles (desde la raíz del repo):

```bash
# No localStorage en el código de la plataforma
rg "localStorage" src || true

# No empaquetado de escritorio
rg -i "tauri|src-tauri" . --glob '!node_modules/**' --glob '!dist/**' || true

# No agenda de contactos / clientes
rg -i "contactsBook|contactsPanel|openarttools\\.contacts" src || true

# Sí existen los formatos de archivo documentados
rg "openarttools\\.(draft|profile)" src

# No fixtures de identidad real en el código
rg -i "48133899|caution hot|ex-centris|brunch electronik" src || true

# No red inesperada en módulos de la app
rg "fetch\\(|XMLHttpRequest|navigator\\.sendBeacon" src || true
```

Si algo de lo anterior aparece donde no debería, es una señal para investigar.

---

## Mapa del código (legible a propósito)

| Ruta | Función |
|------|---------|
| `src/main.ts` | Pantallas y flujo (inicio → herramienta → revisión → aceptación → exportación) |
| `src/session.ts` | Estado en memoria; se pierde al cerrar la pestaña |
| `src/platform.ts` | Marca, catálogo de herramientas, textos de transparencia y apoyo |
| `src/shell.ts` | Header, franjas fijas, footer |
| `src/dom.ts` | Helpers DOM mínimos |
| `src/engine/` | Ensamblado de plantillas (lógica pura, con tests) |
| `src/templates/` | Textos de los documentos |
| `src/storage/profile.ts` | Perfil personal: descargar / cargar `.json` |
| `src/storage/draft.ts` | Borrador de documento: descargar / cargar `.json` |
| `src/storage/jsonFile.ts` | Utilidades compartidas de lectura/escritura de JSON |
| `src/export/` | Exportación PDF / HTML / TXT |
| `PRIVACY.md` | Política de privacidad en lenguaje claro |
| `SUPPORT.md` | Apoyo voluntario |
| `README.md` | Guía general de la plataforma |

---

## Cómo funciona la sesión (para auditores)

1. Todo el estado del documento y del perfil cargado vive en variables en memoria (`session.ts` / `main.ts`).
2. No se persiste automáticamente.
3. Persistencia = solo si el usuario descarga un archivo o exporta un documento.
4. Al cerrar la pestaña, el proceso del navegador se destruye: la plataforma ya no tiene esos datos.

---

## Formatos de archivo (referencia)

### Perfil — `kind: "openarttools.profile"`, `version: 1`

Campos personales del usuario de la plataforma (nombre, documento, rol, domicilio, email, teléfono).  
Gestionado en la **página de inicio**.

### Borrador — `kind: "openarttools.draft"`, `version: 2`

Incluye `templateId`, `values`, `clauses`, `manualOverride`, `stepIndex`.  
Compatible con borradores antiguos `version: 1` (sin cláusulas).  
Solo tiene sentido **dentro** de una herramienta.

---

## Despliegue

El sitio público se construye y publica con GitHub Actions (`.github/workflows/pages.yml`) hacia:

https://openarttools.github.io/

El build de Pages usa `VITE_BASE=/`.

---

## Repositorio

https://github.com/OpenArtTools/OpenArtTools.github.io

Licencia y autoría: [LICENSE](LICENSE), [NOTICE](NOTICE), [COPYRIGHT](COPYRIGHT).
