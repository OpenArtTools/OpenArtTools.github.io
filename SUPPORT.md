# Apoyo voluntario

Open Art Tools — concept, idea, design, creation & development by Gerard Valls Montaño.

Open Art Tools es **gratuito** y **open source**. Lo desarrolla su creador de forma **voluntaria**, sin cobros ni suscripciones y **sin ánimo comercial**. No es un negocio de pago.

> Nota de honestidad: esto describe la intención del proyecto. No afirma un estatus legal de asociación o entidad «sin ánimo de lucro» salvo que exista formalmente.

## Qué es

Existe un apartado de **apoyo voluntario** para quien quiera ayudar a que el creador pueda **dedicarle más tiempo** a mantener y ampliar la plataforma y sus herramientas.

- **Nunca es obligatorio**
- **No desbloquea nada**
- **No cambia lo que puedes usar**
- **No hay presión** dentro del flujo de las herramientas

## Para qué sirve un aporte

Si aportas, el apoyo va a:

- Más tiempo de desarrollo y mejoras
- Mantenimiento de la plataforma y de lo que ya existe
- Costes asociados al proyecto (dominio, infraestructura, tiempo)

## Privacidad

Open Art Tools **no procesa pagos** ni guarda datos de donación. Un enlace de aportación lleva a un proveedor externo. Ahí aplican las condiciones de ese proveedor.

## En el producto

- Sección clara en el inicio (**Cómo se mantiene**)
- Página **Apoyo** en la navegación
- Mención en Transparencia
- Pie de página: «Apoyo voluntario»

Nunca aparece dentro del asistente de documentos ni bloquea exportar.

## Configurar el enlace de pago

En `src/platform.ts`, objeto `SUPPORT.donateUrl`, pon la URL pública de tu método (PayPal, Ko-fi, Stripe, etc.). Si está vacío, la interfaz explica honestamente que aún no hay enlace y ofrece contacto con el creador.
