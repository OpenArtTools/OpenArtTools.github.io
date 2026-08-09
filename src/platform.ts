/**
 * Copyright (C) 2026 Gerard Valls Montaño
 * SPDX-License-Identifier: AGPL-3.0-or-later
 *
 * Shared platform copy — one place for brand + transparency promises.
 */

export type ToolStatus = "available" | "coming";

export type OpenArtTool = {
  id: string;
  name: string;
  blurb: string;
  status: ToolStatus;
  templateId?: string;
};

export const PLATFORM = {
  name: "Open Art Tools",
  role: "Plataforma",
  version: "0.2.0",
  tagline: "Herramientas open source y gratuitas para artistas.",
  about:
    "Open Art Tools es la plataforma. Aquí viven las herramientas: se elige una y se usa cuando haga falta.",
  author: "Gerard Valls Montaño",
  license: "AGPL-3.0-or-later",
  repoUrl: "https://github.com/OpenArtTools/OpenArtTools.github.io",
} as const;

/**
 * Voluntary support — never required, never gated behind features.
 * Set `donateUrl` to your PayPal / Ko-fi / Stripe / etc. page when ready.
 * If empty, the UI offers an honest contact path instead of a fake button.
 *
 * Wording note: avoid claiming legal "non-profit" status unless the project
 * is formally a non-profit entity. Prefer voluntary / non-commercial language.
 */
export const SUPPORT = {
  navLabel: "Apoyo",
  title: "Apoyo voluntario",
  /** External donation page. Leave empty until you have a real payment link. */
  donateUrl: "",
  donateLabel: "Hacer una aportación voluntaria",
  homeCtaLabel: "Cómo apoyar",
  contactLabel: "Contactar con quien desarrolla el proyecto",
  contactUrl: "https://bygerardvisuals.com/",
  homeTitle: "Cómo se mantiene",
  homeLead:
    "Open Art Tools lo desarrollo yo, Gerard Valls Montaño, de forma voluntaria: es gratuito y open source, sin cobros ni suscripciones. No es un negocio ni un producto de pago.",
  homeBody:
    "Una aportación voluntaria no compra nada ni desbloquea funciones. Ayuda a que pueda dedicarle más tiempo a mantener y ampliar la plataforma y sus herramientas. No es obligatorio.",
  intro:
    "Open Art Tools es y seguirá siendo gratuito y de código abierto. Lo desarrollo de forma voluntaria, sin cobros, sin suscripciones y sin ánimo comercial. Usar la plataforma no exige aportar nada.",
  voluntary:
    "Si la plataforma resulta útil y se desea ayudar a que pueda dedicarse más tiempo al proyecto —mantenimiento, nuevas herramientas y mejoras—, se puede hacer una aportación voluntaria. No es necesario. No hay presión. No cambia lo que se puede usar.",
  whatForTitle: "Para qué sirve, si aportas",
  whatFor: [
    "Más tiempo para desarrollar y mejorar herramientas",
    "Mantenimiento de la plataforma y de lo que ya existe",
    "Costes asociados al proyecto (dominio, infraestructura, tiempo)",
  ],
  whatNotTitle: "Qué no es",
  whatNot: [
    "No es un pago por un servicio ni una suscripción",
    "No convierte Open Art Tools en un negocio de pago",
    "No desbloquea funciones, plantillas ni exportaciones",
    "No hay contraprestación comercial: las herramientas siguen igual de libres para todo el mundo",
    "No hay seguimiento de quién aporta dentro de Open Art Tools",
  ],
  privacyTitle: "Privacidad del aporte",
  privacy:
    "Open Art Tools no procesa pagos ni guarda datos de donación. Si se usa un enlace de aportación, se sale a un proveedor externo (por ejemplo PayPal o similar). Ahí aplican sus condiciones y su privacidad, no las de esta plataforma.",
  thanks:
    "Si se aporta: gracias. Si no se puede o no se desea: también está bien. La plataforma está hecha para usarse.",
  footerLabel: "Apoyo voluntario",
} as const;

/** Always-visible transparency promise (short). */
export const TRANSPARENCY = {
  strip:
    "Código abierto · Sin nube ni localStorage · Auditable",
  stripShort: "Sin nube · Sin localStorage",
  sessionClear:
    "Al cerrar esta pestaña se borran los datos de la plataforma.",
  sessionClearInTool:
    "Al cerrar esta pestaña se borran los datos de la plataforma. Se puede descargar el borrador de este acuerdo en cualquier momento, esté como esté.",
  draftDownloadLabel: "Descargar borrador",
  legal:
    "Las plantillas no han sido revisadas por abogados ni por profesionales del derecho y no constituyen asesoramiento legal.",
  /** Longer legal line shown on the document preview / PDF / text export. */
  documentHint:
    "Open Art Tools — plantilla orientativa. Este documento no ha sido revisado por abogados ni por ningún profesional del derecho y no constituye asesoramiento legal.",
  printPdfNote:
    "Usa el diálogo de impresión del navegador para guardar como PDF. Si el navegador ofrece numeración de páginas en el pie, activarla ahí.",
  points: [
    {
      title: "Código abierto",
      body: "Todo el código es público bajo AGPL-3.0-or-later: se puede usar y mejorar, manteniendo la autoría, mencionando el origen y compartiendo el código (también si se publica una versión modificada en la web). Ver LICENSE y NOTICE.",
    },
    {
      title: "Cero almacenamiento en la plataforma",
      body: "No hay nube, cuentas ni localStorage para los datos. Lo que se escribe vive solo en la memoria de la pestaña. Al cerrarla, desaparece de la plataforma.",
    },
    {
      title: "Datos personales — Autoría",
      body: "En el inicio se puede guardar un .json con los datos de autoría (nombre, documento, domicilio…). Destinado a artistas y creadores; también puede actuar un representante de la Parte Autora. Sirven para rellenar esa parte en las herramientas. No es una agenda de clientes. Detalle: PRIVACY.md.",
    },
    {
      title: "Borrador del documento (dentro de cada herramienta)",
      body: "El borrador de un acuerdo se descarga como HTML legible (se abre en cualquier navegador) y se puede volver a cargar en esa herramienta. La plataforma no lo guarda.",
    },
    {
      title: "Sin agendas de clientes",
      body: "No hay listas de clientes de terceros. Los datos de la otra parte se escriben en el formulario de ese documento (o van en el borrador si se descarga).",
    },
    {
      title: "Auditable",
      body: "Se puede comprobar en el código que no hay telemetría ni almacenamiento oculto. Guía: AUDITABILITY.md.",
    },
    {
      title: "Gratis, con apoyo voluntario",
      body: "Desarrollo voluntario, sin cobros ni suscripciones. El apoyo voluntario ayuda a dedicarle más tiempo al proyecto. Nunca es obligatorio. Ver SUPPORT.md.",
    },
    {
      title: "Plantillas orientativas",
      body: "Los documentos son ayuda práctica para artistas. No han sido revisados por abogados y no sustituyen asesoramiento legal profesional.",
    },
  ],
} as const;

export const TOOLS: OpenArtTool[] = [
  {
    id: "exhibition-agreements",
    name: "Acuerdos de exhibición",
    blurb:
      "Exhibición, custodia, seguro, imagen, venta, transporte, remuneración, reparaciones y más cláusulas opcionales.",
    status: "available",
    templateId: "exhibition-custody-es",
  },
];

export function findToolByTemplateId(
  templateId: string,
): OpenArtTool | undefined {
  return TOOLS.find((t) => t.templateId === templateId);
}
