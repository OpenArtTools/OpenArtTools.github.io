# Apoyo voluntario

Open Art Tools — idea, diseño, creación y desarrollo por **Gerard Valls Montaño**.

Este documento explica el apoyo voluntario con honestidad: **qué es**, **qué no es**, y **dónde aparece** en la plataforma.

---

## En una frase

Open Art Tools es **gratis** y **open source**. Lo desarrolla su creador de forma **voluntaria**. Si quieres, puedes aportar para que pueda **dedicarle más tiempo** al proyecto. **No es obligatorio.**

---

## Contexto (sin maquillaje)

| Afirmación | Significado |
|------------|-------------|
| Gratuito | Usar la plataforma no cuesta dinero |
| Open source | El código es público bajo AGPL-3.0-or-later (ver LICENSE y NOTICE) |
| Desarrollo voluntario | Gerard lo mantiene sin cobros ni suscripciones |
| Sin ánimo comercial | No es un producto de pago ni un negocio de suscripción |
| Apoyo voluntario | Una aportación opcional para tiempo y costes del proyecto |

> **Nota de honestidad:** “sin ánimo comercial” / desarrollo voluntario describe la **intención** del proyecto. **No** afirma un estatus legal de asociación o entidad «sin ánimo de lucro», salvo que exista formalmente.

---

## Qué es el apoyo voluntario

Un apartado para quien quiera ayudar a que el creador pueda:

- Dedicar más tiempo a desarrollo y mejoras
- Mantener la plataforma y las herramientas existentes
- Cubrir costes asociados (dominio, infraestructura, tiempo)

### Reglas claras

- **Nunca es obligatorio**
- **No desbloquea** funciones, plantillas ni exportaciones
- **No cambia** lo que puedes usar
- **No hay presión** dentro del asistente de documentos
- Las herramientas siguen siendo **igual de libres** para quien no aporta

---

## Qué no es

- No es un pago por un “servicio premium”
- No es una suscripción
- No convierte Open Art Tools en un negocio de pago
- No hay contraprestación comercial dentro de la plataforma
- Open Art Tools **no hace seguimiento** de quién aporta (no hay cuentas de usuario)

---

## Privacidad del aporte

Open Art Tools **no procesa pagos** ni guarda datos de donación.

Si hay un enlace de aportación, se abre un **proveedor externo** (por ejemplo PayPal, Ko-fi u otro). Allí aplican **sus** condiciones y su privacidad, no las de esta plataforma.

Si aún no hay enlace de pago configurado, la interfaz lo dice con claridad y ofrece contacto con el creador.

---

## Dónde aparece en el producto

| Lugar | Qué verás |
|-------|-----------|
| Inicio | Sección **Cómo se mantiene** |
| Navegación | Enlace **Apoyo** |
| Transparencia | Mención al apoyo voluntario |
| Pie de página | Enlace **Apoyo voluntario** |

**No** aparece dentro del asistente de documentos ni bloquea exportar.

Textos de la interfaz: `src/platform.ts` (objeto `SUPPORT`).

---

## Cómo configurar el enlace de pago (desarrollo)

En `src/platform.ts`, campo `SUPPORT.donateUrl`:

1. Pon la URL pública de tu método de aportación.
2. Si está vacío (`""`), la UI muestra el aviso honesto + contacto.
3. No inventes un botón de pago que no lleve a un destino real.

Contacto del creador (por defecto): https://bygerardvisuals.com/

---

## Relacionado

- Privacidad general: [PRIVACY.md](PRIVACY.md)
- Guía de la plataforma: [README.md](README.md)
