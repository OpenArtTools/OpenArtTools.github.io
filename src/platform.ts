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
    "Open Art Tools es la plataforma. Aquí viven las herramientas: eliges una y la usas cuando quieras.",
  author: "Gerard Valls Montaño",
  license: "AGPL-3.0-or-later",
  repoUrl: "https://github.com/OpenArtTools/contract-studio",
  siteUrl: "https://openarttools.github.io/contract-studio/",
  authorSiteUrl: "https://bygerardvisuals.com/",
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
  contactLabel: "Contactar con el creador",
  contactUrl: "https://bygerardvisuals.com/",
  homeTitle: "Cómo se mantiene",
  homeLead:
    "Open Art Tools lo desarrollo yo, Gerard Valls Montaño, de forma voluntaria: es gratuito y open source, sin cobros ni suscripciones. No es un negocio ni un producto de pago.",
  homeBody:
    "Una aportación voluntaria no compra nada ni desbloquea funciones. Ayuda a que pueda dedicarle más tiempo a mantener y ampliar la plataforma y sus herramientas. No es obligatorio.",
  intro:
    "Open Art Tools es y seguirá siendo gratuito y de código abierto. Lo desarrollo de forma voluntaria, sin cobros, sin suscripciones y sin ánimo comercial. Usar la plataforma no exige aportar nada.",
  voluntary:
    "Si te resulta útil y quieres ayudar a que pueda dedicarle más tiempo al proyecto —mantenimiento, nuevas herramientas y mejoras—, puedes hacer una aportación voluntaria. No es necesario. No hay presión. No cambia lo que puedes usar.",
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
    "Open Art Tools no procesa pagos ni guarda datos de donación. Si usas un enlace de aportación, saldrás a un proveedor externo (por ejemplo PayPal o similar). Ahí aplican sus condiciones y su privacidad, no las de esta plataforma.",
  thanks:
    "Si aportas: gracias de verdad. Si no puedes o no quieres: también está bien. La plataforma está hecha para usarse.",
  footerLabel: "Apoyo voluntario",
} as const;

/** Always-visible transparency promise (short). */
export const TRANSPARENCY = {
  strip:
    "Código abierto · Sin nube ni almacenamiento local · Auditable",
  stripShort: "Sin nube · Sin almacenamiento local",
  sessionClear:
    "Al cerrar esta pestaña se borran los datos de la plataforma.",
  sessionClearInTool:
    "Al cerrar esta pestaña se borran los datos de la plataforma. Descarga el borrador de este acuerdo cuando quieras, esté como esté.",
  draftDownloadLabel: "Descargar borrador",
  legal:
    "Las plantillas no han sido revisadas por abogados ni por profesionales del derecho y no constituyen asesoramiento legal.",
  points: [
    {
      title: "Código abierto",
      body: "Todo el código es público bajo AGPL-3.0-or-later: puedes usarlo y mejorarlo, pero debes mantener la autoría, mencionar el origen y compartir el código (también si publicas una versión modificada en la web). Ver LICENSE y NOTICE.",
    },
    {
      title: "Cero almacenamiento en la plataforma",
      body: "No hay nube, cuentas ni localStorage para tus datos. Lo que escribes vive solo en la memoria de la pestaña. Al cerrarla, desaparece de la plataforma.",
    },
    {
      title: "Mis datos personales (en la plataforma)",
      body: "En el inicio puedes guardar un .json solo con tus datos (nombre, documento, domicilio…). Sirve para cualquier herramienta. No es una agenda de clientes. Detalle: PRIVACY.md.",
    },
    {
      title: "Borrador del documento (dentro de cada herramienta)",
      body: "El borrador de un acuerdo (formulario y cláusulas) se descarga y carga solo dentro de esa herramienta. Puedes hacerlo en cualquier momento mientras el documento esté en memoria.",
    },
    {
      title: "Sin agendas de clientes",
      body: "No hay listas de clientes de terceros. Los datos de la otra parte se escriben en el formulario de ese documento (o van en el borrador si tú lo descargas).",
    },
    {
      title: "Auditable",
      body: "Puedes comprobar en el código que no hay telemetría ni almacenamiento oculto. Guía: AUDITABILITY.md.",
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
      "Crea acuerdos para exhibir obra en festivales, galerías u otros espacios.",
    status: "available",
    templateId: "exhibition-custody-es",
  },
];

export function findToolByTemplateId(
  templateId: string,
): OpenArtTool | undefined {
  return TOOLS.find((t) => t.templateId === templateId);
}
