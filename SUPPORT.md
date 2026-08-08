# Invitar a un café

Open ArtCore — idea, diseño, creación y desarrollo por **Gerard Valls Montaño**.

Este documento explica **solo** el apoyo voluntario: **qué es**, **qué no es**, y **dónde aparece**.

> El **origen de la idea** (experiencia propia en la práctica artística y necesidad de estos recursos) se explica en el [README](README.md) y en la página Transparencia. **No** se mezcla aquí con el café.

Voz del proyecto: **tercera persona** y **sin marcas de género**.

---

## En una frase

Open ArtCore es **gratis** y **open source**. Quien lo desee puede **invitar a un café**: apoyo voluntario para **respaldar el trabajo de desarrollo** de Gerard Valls Montaño. **No es obligatorio.**

---

## Contexto (sin maquillaje)

| Afirmación | Significado |
|------------|-------------|
| Gratuito | Usar la plataforma no cuesta dinero |
| Open source | El código es público bajo AGPL-3.0-or-later (ver LICENSE y NOTICE) |
| Desarrollo voluntario | Gerard Valls Montaño lo mantiene sin cobros ni suscripciones |
| Sin ánimo comercial | No es un producto de pago ni un negocio de suscripción |
| Invitar a un café | Aportación opcional para respaldar el trabajo de desarrollo (tiempo y costes) |

> **Nota de honestidad:** “sin ánimo comercial” / desarrollo voluntario describe la **intención** del proyecto. **No** afirma un estatus legal de asociación o entidad «sin ánimo de lucro», salvo que exista formalmente.

---

## Qué es “invitar a un café”

Un gesto voluntario para quien quiera **respaldar el trabajo de desarrollo** y contribuir a:

- Dedicar más tiempo a desarrollo y mejoras
- Mantener la plataforma y las herramientas existentes
- Cubrir costes asociados (dominio, infraestructura, tiempo)

La aportación es **completamente para respaldar y dar apoyo al trabajo de desarrollo**. No compra un servicio.

### Reglas claras

- **Nunca es obligatorio**
- **No desbloquea** funciones, plantillas ni exportaciones
- **No cambia** lo que se puede usar
- **No hay presión** dentro del asistente de documentos
- Las herramientas siguen siendo **igual de libres** para quien no aporta

---

## Qué no es

- No es un pago por un “servicio premium”
- No es una suscripción
- No convierte Open ArtCore en un negocio de pago
- No hay contraprestación comercial dentro de la plataforma
- Open ArtCore **no hace seguimiento** de quién aporta (no hay cuentas de usuario)
- **No** es la explicación del origen de la plataforma (eso es otra cosa)

---

## Privacidad del aporte

Open ArtCore **no procesa pagos** ni guarda datos de donación.

Si hay un enlace para invitar a un café, se abre un **proveedor externo** (por ejemplo PayPal, Ko-fi u otro). Allí aplican **sus** condiciones y su privacidad, no las de esta plataforma.

Si aún no hay enlace de pago configurado, la interfaz lo dice con claridad y ofrece contacto con Gerard Valls Montaño.

---

## Dónde aparece en el producto

| Lugar | Qué verás |
|-------|-----------|
| Inicio | Sección **Cómo se mantiene** + CTA **Invitar a un café** |
| Navegación | Enlace **Apoyo** |
| Transparencia | Punto del café (distinto del origen de la idea) |
| Pie de página | Enlace **Invitar a un café** |

**No** aparece dentro del asistente de documentos ni bloquea exportar.

Textos de la interfaz: `src/platform.ts` (objeto `SUPPORT`).

---

## Enlace de aportación

En `src/platform.ts`, campo `SUPPORT.donateUrl`:

1. URL pública del método de aportación (PayPal, Ko-fi, etc.).
2. Si está vacío (`""`), la interfaz muestra el aviso + contacto.
3. Solo se muestra un botón de pago cuando hay un destino real.

Contacto: https://bygerardvisuals.com/

---

## Relacionado

- Origen de la idea: [README.md](README.md)
- Privacidad general: [PRIVACY.md](PRIVACY.md)
