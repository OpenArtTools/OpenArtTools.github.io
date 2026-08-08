/**
 * Copyright 2026 Gerard Valls Montaño
 * Licensed under the Apache License, Version 2.0
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
  tagline: "Herramientas open source y gratuitas para artistas.",
  about:
    "Open Art Tools es la plataforma. Aquí viven las herramientas: eliges una y la usas cuando quieras.",
  author: "Gerard Valls Montaño",
  license: "Apache-2.0",
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
    "Open source · Sin nube ni localStorage · Auditable",
  sessionClear:
    "Al cerrar esta pestaña se borran los datos de la plataforma.",
  sessionClearInTool:
    "Al cerrar esta pestaña se borran los datos de la plataforma. Descarga el borrador de este acuerdo cuando quieras, esté como esté.",
  draftDownloadLabel: "Descargar borrador",
  legal:
    "Las plantillas no han sido revisadas por abogados ni por profesionales del derecho y no constituyen asesoramiento legal.",
  points: [
    {
      title: "Open source",
      body: "Todo el código es público (Apache-2.0). Cualquiera puede leerlo, usarlo, auditarlo o mejorarlo.",
    },
    {
      title: "Cero almacenamiento en la plataforma",
      body: "La plataforma no guarda formularios, contratos ni datos personales en servidores ni en el navegador (sin localStorage). Lo que escribes vive solo en memoria mientras la pestaña está abierta. Al cerrarla, se borran de la plataforma.",
    },
    {
      title: "Mis datos personales (plataforma)",
      body: "En la página de la plataforma puedes descargar y cargar un .json con tus datos personales. Sirven para cualquier herramienta. No es una agenda de clientes.",
    },
    {
      title: "Borrador del documento (dentro de cada herramienta)",
      body: "El borrador de un acuerdo vive solo dentro de esa herramienta (p. ej. Acuerdos de exhibición). Puedes descargarlo en cualquier momento mientras estés usándola.",
    },
    {
      title: "Sin agendas de clientes",
      body: "No hay listas de clientes de terceros. Los datos de la otra parte se escriben en el formulario de ese documento (o van en el borrador si tú los incluiste).",
    },
    {
      title: "Auditable",
      body: "Puedes comprobar en el código que no hay telemetría, cuentas cloud ni localStorage para tus datos. Ver AUDITABILITY.md en el repositorio.",
    },
    {
      title: "Gratis, con apoyo voluntario",
      body: "Lo desarrollo de forma voluntaria, sin cobros ni suscripciones. El apoyo voluntario ayuda a dedicarle más tiempo al proyecto. Nunca es obligatorio ni bloquea el uso.",
    },
    {
      title: "Plantillas orientativas",
      body: "Los documentos generados son ayuda práctica para artistas. No sustituyen asesoramiento legal profesional.",
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
