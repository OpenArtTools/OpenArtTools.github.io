# Privacidad

Open Art Tools — idea, diseño, creación y desarrollo por **Gerard Valls Montaño**.

Este documento explica, con claridad, **qué hace y qué no hace** la plataforma con tus datos.

---

## Regla absoluta

**Open Art Tools no almacena tus datos.**

No hay:

- Cuentas en la nube
- Analítica, trackers ni telemetría
- Servidores que reciban el contenido de tus formularios
- `localStorage`, cookies ni almacenes del navegador controlados por la plataforma para tus datos
- Agendas de clientes ni bases de contactos de terceros

Lo que escribes en un formulario vive **solo en la memoria de la pestaña** mientras está abierta.

**Al cerrar la pestaña (o la ventana), esos datos desaparecen de la plataforma.**

Esa advertencia está siempre visible en una franja superior de la interfaz.

Los gestores de contraseñas y las extensiones del navegador pueden leer o sugerir datos en formularios; eso lo controla el navegador o la extensión, no Open Art Tools.

El **código de la plataforma no incluye analítica ni telemetría**. El hosting (p. ej. GitHub Pages) puede registrar peticiones web habituales (IP, URL, user-agent); eso no incluye el contenido de tus formularios, que no se envía a ningún servidor de la plataforma.

Carga solo perfiles o borradores que **tú** hayas creado o en los que confíes.

---

## Qué significa “no almacena”

| Situación | Qué ocurre |
|-----------|------------|
| Rellenas un formulario | Queda en memoria de esa pestaña |
| Cierras la pestaña | La plataforma ya no tiene esos datos |
| Recargas la página | Empiezas de cero (salvo que cargues un archivo tuyo) |
| Descargas un perfil `.json`, un borrador `.html` o un PDF | El archivo queda **donde tú lo guardes**; la plataforma no se queda una copia |
| Exportas PDF / HTML / TXT | Solo en tu dispositivo; la plataforma no lo sube a ningún servidor |

---

## Archivos opcionales que controlas tú

Si quieres reutilizar información más adelante, **tú** descargas un archivo y **tú** lo vuelves a cargar. Open Art Tools **nunca** lo sube ni lo guarda en la nube.

Hay **dos tipos**, con funciones distintas:

### 1. Perfil — Autoría — `openarttools.profile`

- **Nivel:** plataforma (página de inicio)
- **Contiene:** datos de quien tiene la **autoría** (nombre, documento, domicilio, email, teléfono, rol…). Pensada para artistas y creadores; también puede actuar un **representante del autor**.
- **Sirve para:** reutilizar esa identidad en esta herramienta y en futuras (p. ej. rellenar la autoría)
- **No es:** una lista de clientes, ni una agenda de terceros, ni un perfil de compradores o poseedores de la obra

### 2. Borrador de documento — HTML legible (`openarttools.draft`)

- **Nivel:** dentro de una herramienta (p. ej. Acuerdos de exhibición)
- **Formato:** archivo `.html` que puedes abrir en cualquier navegador / sistema
- **Contiene:** vista legible del borrador + datos para recargarlo en la herramienta
- **Sirve para:** leerlo fuera de la app y retomar el mismo acuerdo más tarde
- **No es:** el perfil de autoría (ese es el otro tipo de archivo)
- **Confianza:** carga en la herramienta solo borradores que hayas creado tú o en los que confíes (un `.html` manipulado podría intentar engañarte al abrirlo fuera de la app)

**Responsabilidad:** cómo guardas, copias o compartes esos archivos es cosa tuya. La plataforma no puede proteger un archivo que sale de tu dispositivo.

---

## Qué sale de la plataforma (solo si tú lo decides)

1. **Archivos** de perfil (`.json`) o borrador (`.html`) que descargas.
2. **Exportaciones** del documento: PDF (vía diálogo de impresión / guardar), HTML o TXT.
3. Si usas el apartado de **apoyo voluntario** y hay un enlace de pago, sales a un **proveedor externo** (PayPal u otro). Ahí aplican sus condiciones; Open Art Tools no procesa el pago ni guarda datos de donación. Ver [SUPPORT.md](SUPPORT.md).

La plataforma **no envía** el contenido de tus formularios a servidores propios.

---

## Datos de terceros (clientes / organizaciones)

Open Art Tools **no ofrece** guardar, listar ni sincronizar clientes.

Si en un acuerdo escribes datos de otra persona u organización, existen solo:

- en el formulario de ese documento (memoria de la pestaña), y/o  
- en el borrador o PDF/HTML/TXT **si tú** los descargas.

No hay fichero de “mis clientes” dentro de la plataforma.

---

## Cómo se muestra esto en el producto

- Franja de **transparencia** (siempre visible)
- Franja de **sesión**: aviso de borrado al cerrar; botón de descargar borrador cuando hay documento en curso
- Página **Transparencia** en la navegación
- Enlaces a este archivo y a [AUDITABILITY.md](AUDITABILITY.md)

---

## Cómo comprobarlo tú mismo

Cualquiera puede auditar el código. Guía práctica: [AUDITABILITY.md](AUDITABILITY.md).

Repositorio: https://github.com/OpenArtTools/OpenArtTools.github.io

---

## Licencia del software (no de tus documentos)

El **código** de Open Art Tools está bajo **AGPL-3.0-or-later**. Eso protege la autoría de Gerard Valls Montaño y obliga a compartir el origen y el código en los términos de la licencia. Ver [LICENSE](LICENSE) y [NOTICE](NOTICE).

Eso **no** significa que la plataforma se quede con los textos o datos que **tú** generas en un contrato: esos salen solo si tú los exportas o descargas, según lo descrito arriba.

---

## Contacto de quien lo desarrolla

Gerard Valls Montaño — https://bygerardvisuals.com/
