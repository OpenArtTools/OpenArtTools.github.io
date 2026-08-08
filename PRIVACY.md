# Privacidad

Open ArtCore — idea, diseño, creación y desarrollo por **Gerard Valls Montaño**.

Este documento explica, con claridad, **qué hace y qué no hace** la plataforma con los datos de quien la usa.

Open ArtCore es **segura, privada, accesible, transparente cristalina y auditable**.

Voz: **tercera persona** y **sin marcas de género**.

---

## Regla absoluta

**Open ArtCore no almacena los datos de quien usa la plataforma.**

No hay:

- Cuentas en la nube
- Analítica, trackers ni telemetría
- Servidores que reciban el contenido de los formularios
- `localStorage`, cookies ni almacenes del navegador controlados por la plataforma para esos datos
- Agendas de clientes ni bases de contactos de terceros

Lo que se escribe en un formulario vive **solo en la memoria de la pestaña** mientras está abierta.

**Al cerrar la pestaña (o la ventana), esos datos desaparecen de la plataforma.**

Esa advertencia está siempre visible en una franja superior de la interfaz.

Los gestores de contraseñas y las extensiones del navegador pueden leer o sugerir datos en formularios; eso lo controla el navegador o la extensión, no Open ArtCore.

---

## Qué significa “no almacena”

| Situación | Qué ocurre |
|-----------|------------|
| Se rellena un formulario | Queda en memoria de esa pestaña |
| Se cierra la pestaña | La plataforma ya no tiene esos datos |
| Se recarga la página | Se empieza de cero (salvo que se cargue un archivo propio) |
| Se descarga un `.json` o un PDF | El archivo queda **donde se guarde**; la plataforma no se queda una copia |
| Se exporta PDF / HTML / TXT | Solo en el dispositivo; la plataforma no lo sube a ningún servidor |

---

## Archivos opcionales bajo control de quien usa la plataforma

Para reutilizar información más adelante, quien usa la plataforma **descarga** un archivo y **lo vuelve a cargar**. Open ArtCore **nunca** lo sube ni lo guarda en la nube.

Hay **dos tipos**, con funciones distintas:

### 1. Perfil personal — `openarttools.profile`

- **Nivel:** plataforma (página de inicio)
- **Contiene:** datos personales (nombre, documento, domicilio, email, teléfono, rol…)
- **Sirve para:** reutilizar la identidad en esta herramienta y en futuras
- **No es:** una lista de clientes, ni una agenda de terceros

### 2. Borrador de documento — `openarttools.draft`

- **Nivel:** dentro de una herramienta (p. ej. Acuerdos de exhibición)
- **Contiene:** el estado de **ese** documento (valores del formulario, cláusulas, si se editó a mano, paso del asistente)
- **Sirve para:** retomar el mismo acuerdo más tarde
- **No es:** el perfil personal multi-herramienta

**Responsabilidad:** cómo se guardan, copian o comparten esos archivos es de quien los descarga. La plataforma no puede proteger un archivo que sale del dispositivo.

---

## Qué sale de la plataforma (solo si se decide)

1. **Archivos `.json`** de perfil o borrador que se descargan.
2. **Exportaciones** del documento: PDF (vía diálogo de impresión / guardar), HTML o TXT.
3. Si se usa el apartado de **aportación** y hay un enlace de pago, se abre un **proveedor externo** (PayPal, Ko-fi u otro). Ahí aplican sus condiciones; Open ArtCore no procesa el pago ni guarda datos de aportación. Ver [SUPPORT.md](SUPPORT.md).

La plataforma **no envía** el contenido de los formularios a servidores propios.

---

## Datos de terceros (clientes / organizaciones)

Open ArtCore **no ofrece** guardar, listar ni sincronizar clientes.

Si en un acuerdo se escriben datos de otra persona u organización, existen solo:

- en el formulario de ese documento (memoria de la pestaña), y/o  
- en el borrador o PDF/HTML/TXT **si se descargan**.

No hay fichero de “clientes” dentro de la plataforma.

---

## Cómo se muestra esto en el producto

- Franja de **transparencia** (siempre visible)
- Franja de **sesión**: aviso de borrado al cerrar; botón de descargar borrador cuando hay documento en curso
- Página **Transparencia** en la navegación
- Enlaces a este archivo y a [AUDITABILITY.md](AUDITABILITY.md)

---

## Cómo comprobarlo

Cualquiera puede auditar el código. Guía práctica: [AUDITABILITY.md](AUDITABILITY.md).

Repositorio: https://github.com/OpenArtTools/OpenArtTools.github.io

---

## Licencia del software (no de los documentos generados)

El **código** de Open ArtCore está bajo **AGPL-3.0-or-later**. Eso protege la autoría de Gerard Valls Montaño y obliga a compartir el origen y el código en los términos de la licencia. Ver [LICENSE](LICENSE) y [NOTICE](NOTICE).

Eso **no** significa que la plataforma se quede con los textos o datos generados en un contrato: esos salen solo si se exportan o descargan, según lo descrito arriba.

---

## Contacto

Gerard Valls Montaño — https://bygerardvisuals.com/
