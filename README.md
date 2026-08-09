# Open Art Tools

**Open Art Tools** es una **plataforma web open source** que agrupa y aloja **herramientas gratuitas para artistas**.

No es una sola utilidad. Es el paraguas: entras a la plataforma, eliges una herramienta y la usas cuando quieras.

- **Quién lo desarrolla:** Gerard Valls Montaño  
- **Licencia:** [AGPL-3.0-or-later](LICENSE) — ver también [NOTICE](NOTICE) (autoría y obligaciones en lenguaje claro)  
- **Autoría:** Gerard Valls Montaño (debe conservarse y mencionarse siempre)  
- **Sitio:** https://openarttools.github.io/  
- **Código:** https://github.com/OpenArtTools/OpenArtTools.github.io  
- **Versión actual:** 0.2.0  

---

## Qué es (y qué no es)

| Sí | No |
|----|----|
| Plataforma web que aloja herramientas | Una app de escritorio descargable |
| Gratis y open source (AGPL) | Un producto cerrado o de pago |
| Datos solo en la memoria de tu pestaña | Una nube que guarda tus contratos |
| Archivos que **tú** descargas y cargas (perfil `.json`, borrador `.html`) | Una agenda de clientes o contactos de terceros |
| Plantillas orientativas para artistas | Asesoramiento legal profesional |
| Autoría de Gerard Valls Montaño siempre visible | Quitar o ocultar el origen del proyecto |

---

## Cómo se usa, en 30 segundos

1. Abre la [plataforma](https://openarttools.github.io/).
2. (Opcional) En **Datos personales — Autoría**, rellena o carga ese perfil y descárgalo para reutilizarlo después.
3. Elige una herramienta (hoy: **Acuerdos de exhibición**).
4. Completa el asistente, revisa, acepta y exporta (PDF / HTML / TXT).
5. Si quieres retomar el trabajo más tarde, **descarga el borrador** dentro de la herramienta antes de cerrar la pestaña.

**Importante:** al cerrar la pestaña, la plataforma borra lo que había en memoria. Esa advertencia está siempre visible arriba.

---

## Herramientas

### 1. Acuerdos de exhibición *(disponible)*

Sirve para generar anexos / acuerdos de obra en **festivales, galerías u otros espacios**.

Incluye, entre otras cosas:

- Identificación de partes (autoría y solicitante de la obra)
- Datos del proyecto e instalación
- Custodia, montaje y riesgos
- Seguros y responsabilidad
- Opcional: préstamo/cesión, imagen, venta, transporte, costes, cancelación, contactos, inventario, espacio, subcontratación, PI, modificaciones y notificaciones
- Revisión cláusula a cláusula
- Exportación a PDF (imprimir / guardar), HTML y TXT

Los datos de la **otra parte** (solicitante de la obra) se escriben solo en el formulario de ese documento. **No hay lista de clientes** en la plataforma.

Más herramientas se irán sumando al mismo paraguas.

---

## Dos tipos de archivo (no confundirlos)

La plataforma **no guarda nada**. Si quieres reutilizar datos, descargas un archivo a tu dispositivo.

### A) Datos personales — Autoría (nivel plataforma)

| | |
|--|--|
| **Dónde** | Página de inicio de la plataforma |
| **Para qué** | Identidad de quien tiene la **autoría** (autores y creadores: nombre, documento, domicilio, email, teléfono…) |
| **Reutilizable** | En esta herramienta y en futuras |
| **Formato** | `.json` con `kind: "openarttools.profile"` |
| **No es** | Una agenda de clientes, compradores ni poseedores de la obra |

Si cargas ese perfil y abres una herramienta, puede rellenar la parte de autoría.

### B) Borrador del documento — dentro de cada herramienta

| | |
|--|--|
| **Dónde** | Solo dentro de la herramienta (asistente, revisión, aceptación) |
| **Para qué** | Retomar **ese** acuerdo (formulario, cláusulas y estado de edición) |
| **Formato** | `.html` legible (abre en cualquier navegador); incluye datos para recargar |
| **No es** | El perfil de autoría (reutilizable entre herramientas) |

Puedes descargar el borrador **en cualquier momento** mientras el documento esté en memoria (también desde la franja superior).

Si vuelves a abrir la misma herramienta con un documento en curso, la plataforma te pregunta si quieres **retomarlo** o empezar de nuevo.

---

## Privacidad, en una frase

**La plataforma no almacena tus datos.** Viven en la pestaña; al cerrarla, desaparecen de la plataforma. Solo salen si **tú** exportas o descargas un archivo.

Detalle completo: [PRIVACY.md](PRIVACY.md).

---

## Transparencia y auditoría

Puedes comprobar en el código que no hay cuentas cloud, telemetría ni `localStorage` para tus datos.

- En la interfaz: franja de transparencia + página **Transparencia**
- En el repo: [AUDITABILITY.md](AUDITABILITY.md)

---

## Apoyo voluntario

Open Art Tools lo desarrolla Gerard de forma **voluntaria**, sin cobros ni suscripciones. Una aportación **opcional** ayuda a dedicarle más tiempo al proyecto. Nunca es obligatoria ni desbloquea funciones.

Detalle: [SUPPORT.md](SUPPORT.md).

---

## Aviso legal sobre las plantillas

Las plantillas **no han sido revisadas por abogados** ni por profesionales del derecho. **No constituyen asesoramiento legal.** Úsalas como ayuda práctica y, si hace falta, consulta a un profesional.

---

## Documentación de este repositorio

| Archivo | Contenido |
|---------|-----------|
| [README.md](README.md) | Qué es la plataforma y cómo usarla (este archivo) |
| [PRIVACY.md](PRIVACY.md) | Privacidad: qué se guarda, qué no, y tus archivos |
| [AUDITABILITY.md](AUDITABILITY.md) | Cómo auditar el código y las promesas |
| [SUPPORT.md](SUPPORT.md) | Apoyo voluntario: qué es y qué no es |
| [LICENSE](LICENSE) | Licencia AGPL-3.0-or-later (texto legal) |
| [NOTICE](NOTICE) | Autoría, origen y obligaciones en lenguaje claro |
| [COPYRIGHT](COPYRIGHT) | Autoría |

---

## Desarrollo local

Requisitos: Node.js 20+ recomendado.

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
  shell.ts             header, franjas fijas, footer
  dom.ts               helpers DOM mínimos
  engine/              ensamblado de plantillas (testeado)
  templates/           textos de documentos
  storage/
    profile.ts         perfil de autoría (.json)
    draft.ts           borrador de documento (.html)
    jsonFile.ts        descarga / lectura de JSON
  export/              PDF / HTML / TXT
```

El sitio público se publica con GitHub Pages desde la rama `main` (ver `.github/workflows/pages.yml`).

---

## Licencia y autoría

Idea, diseño, creación y desarrollo: **Gerard Valls Montaño**.

Licencia: **GNU Affero General Public License v3 (o posterior)** — [LICENSE](LICENSE).

Eso significa, en resumen:

- El proyecto es **completamente open source**.
- La autoría de Gerard Valls Montaño **debe mantenerse y mencionarse siempre**.
- Si compartes o publicas el proyecto (o una versión modificada), debes **mencionar el origen** y **compartir el código** bajo la misma licencia.
- Cualquier modificación debe **referenciar la obra original**.
- Si alguien publica una versión modificada en la web, también debe ofrecer el código fuente (AGPL).

Detalle en lenguaje claro: [NOTICE](NOTICE).  
Autoría: [COPYRIGHT](COPYRIGHT).
