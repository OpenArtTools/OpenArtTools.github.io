/**
 * Copyright (C) 2026 Gerard Valls Montaño
 * SPDX-License-Identifier: AGPL-3.0-or-later
 *
 * Open ArtCore — umbrella platform copy + app catalog.
 * Voice: third person, gender-neutral.
 */

export type OpenArtTool = {
  id: string;
  /** URL segment under the platform home, e.g. acuerdos-de-exhibicion */
  slug: string;
  name: string;
  blurb: string;
  status: "available" | "coming";
  templateId?: string;
};

export const PLATFORM = {
  name: "Open ArtCore",
  role: "Plataforma",
  version: "0.1.0-beta.4",
  tagline:
    "Segura, privada, accesible, transparente cristalina y auditable.",
  about: "Se elige la app que se necesite y se usa.",
  /** Why the platform exists — separate from voluntary coffee support. */
  origin:
    "La idea sale de la experiencia propia en la práctica artística y de la necesidad real de estos recursos: claros, libres y respetuosos con la privacidad. Se construyen y se comparten abiertas para quien las necesite.",
  author: "Gerard Valls Montaño",
  license: "AGPL-3.0-or-later",
  repoUrl: "https://github.com/OpenArtTools/OpenArtTools.github.io",
} as const;

/**
 * Voluntary contribution — never required, never gated behind features.
 * "Invitar a un café" is only a light wink, not the main framing.
 * Keep separate from PLATFORM.origin (why the tools exist).
 */
export const SUPPORT = {
  navLabel: "Apoyo",
  title: "Aportación",
  donateUrl: "",
  donateLabel: "Aportar",
  homeCtaLabel: "Aportar",
  contactLabel: "Contactar con Gerard Valls Montaño",
  contactUrl: "https://bygerardvisuals.com/",
  homeTitle: "Cómo se mantiene",
  homeLead:
    "Open ArtCore lo mantiene Gerard Valls Montaño de forma voluntaria: es gratuito y open source, sin cobros ni suscripciones. No es un negocio ni un producto de pago.",
  homeBody:
    "Si la plataforma resulta útil, se puede hacer una aportación voluntaria para respaldar el trabajo de desarrollo. No compra nada ni desbloquea funciones. No es obligatoria.",
  /** One-line wink — keep rare. */
  wink: "«Invitar a un café» es solo un guiño.",
  intro:
    "Esta página trata de la aportación voluntaria. Open ArtCore es y seguirá siendo gratuito y de código abierto. Usar la plataforma no exige aportar nada.",
  voluntary:
    "Quien lo desee puede aportar para respaldar el trabajo de desarrollo de Gerard Valls Montaño —tiempo para mantener y ampliar la plataforma—. No es necesario. No hay presión. No cambia lo que se puede usar.",
  whatForTitle: "Para qué sirve la aportación",
  whatFor: [
    "Respaldar el trabajo de desarrollo de Open ArtCore",
    "Más tiempo para mantener y mejorar herramientas",
    "Costes asociados al proyecto (dominio, infraestructura, tiempo)",
  ],
  whatNotTitle: "Qué no es",
  whatNot: [
    "No es un pago por un servicio ni una suscripción",
    "No convierte Open ArtCore en un negocio de pago",
    "No desbloquea funciones, plantillas ni exportaciones",
    "No hay contraprestación comercial: las herramientas siguen igual de libres para todo el mundo",
    "No hay seguimiento de quién aporta dentro de Open ArtCore",
  ],
  privacyTitle: "Privacidad de la aportación",
  privacy:
    "Open ArtCore no procesa pagos ni guarda datos de aportación. Si hay un enlace de pago, se abre un proveedor externo (por ejemplo PayPal, Ko-fi o similar). Allí aplican sus condiciones y su privacidad, no las de esta plataforma.",
  thanks:
    "Si se aporta: gracias de verdad. Si no se puede o no se quiere: también está bien. La plataforma está hecha para usarse.",
  footerLabel: "Aportar",
} as const;

/**
 * Fundamental premises of free use — not marketing promises.
 * Always visible on the home and Transparencia pages.
 */
export const PREMISES = {
  title: "Premisas fundamentales",
  lead: "Se ofrece para libre uso bajo estas premisas. Sin letra pequeña.",
  items: [
    {
      title: "Seguro",
      body: "Los datos del formulario no salen a servidores de Open ArtCore. No hay telemetría, trackers ni envíos ocultos.",
    },
    {
      title: "Privado",
      body: "Sin cuentas, sin nube y sin almacenamiento en la plataforma. Lo escrito vive solo en la memoria de la pestaña; al cerrarla, desaparece.",
    },
    {
      title: "Accesible",
      body: "Gratis, open source y usable en el navegador. Interfaz con saltos de contenido, foco visible y respeto a preferencias de movimiento reducido.",
    },
    {
      title: "Transparente",
      body: "Transparencia cristalina: se dice qué hace y qué no hace, sin letra pequeña. El código, la licencia y los límites están a la vista.",
    },
    {
      title: "Auditable",
      body: "Cualquiera puede revisar el código y comprobar estas premisas. Guía en AUDITABILITY.md.",
    },
  ],
} as const;

export const TRANSPARENCY = {
  strip: "Seguro · Privado · Accesible · Transparente · Auditable",
  stripShort: "Seguro · Privado · Transparente · Auditable",
  pageIntro:
    "Open ArtCore se ofrece para libre uso bajo premisas fundamentales: segura, privada, accesible, transparente cristalina y auditable. El detalle vive en el repositorio.",
  sessionClear:
    "Al cerrar esta pestaña se borran los datos de la plataforma.",
  sessionClearInTool:
    "Al cerrar esta pestaña se borran los datos de la plataforma. Se puede descargar el borrador de este acuerdo en cualquier momento, esté como esté.",
  draftDownloadLabel: "Descargar borrador",
  legal:
    "Las plantillas no han sido revisadas por profesionales del derecho y no constituyen asesoramiento legal.",
  points: [
    {
      title: "De dónde sale la idea",
      body: "Nace de la experiencia propia en la práctica artística y de la necesidad real de estos recursos. Son herramientas que faltaban en la práctica y se comparten abiertas. Esto no es lo mismo que la aportación voluntaria.",
    },
    {
      title: "Plataforma paraguas",
      body: "Open ArtCore es la home. Cada herramienta es una app con su propia ruta.",
    },
    {
      title: "Código abierto",
      body: "Todo el código es público bajo AGPL-3.0-or-later: se puede usar y mejorar, pero hay que mantener la autoría, mencionar el origen y compartir el código (también si se publica una versión modificada en la web). Ver LICENSE y NOTICE.",
    },
    {
      title: "Cero almacenamiento en la plataforma",
      body: "No hay nube, cuentas ni localStorage para los datos de quien usa la plataforma. Lo que se escribe vive solo en la memoria de la pestaña. Al cerrarla, desaparece de la plataforma.",
    },
    {
      title: "Datos personales (en la plataforma)",
      body: "En el inicio se puede guardar un .json solo con datos personales (nombre, documento, domicilio…). Sirve para cualquier herramienta. No es una agenda de clientes. Detalle: PRIVACY.md.",
    },
    {
      title: "Borrador del documento (dentro de cada herramienta)",
      body: "El borrador de un acuerdo (formulario y cláusulas) se descarga y carga solo dentro de esa herramienta. Se puede hacer en cualquier momento mientras el documento esté en memoria.",
    },
    {
      title: "Sin agendas de clientes",
      body: "No hay listas de clientes de terceros. Los datos de la otra parte se escriben en el formulario de ese documento (o van en el borrador si se descarga).",
    },
    {
      title: "Plantillas orientativas",
      body: "Los documentos son ayuda práctica para el arte. No han sido revisados por profesionales del derecho y no sustituyen asesoramiento legal profesional.",
    },
  ],
} as const;

export const TOOLS: OpenArtTool[] = [
  {
    id: "exhibition-agreements",
    slug: "acuerdos-de-exhibicion",
    name: "Acuerdos de exhibición",
    blurb:
      "Genera acuerdos para exhibir obra en festivales, galerías u otros espacios.",
    status: "available",
    templateId: "exhibition-custody-es",
  },
];

export function findToolByTemplateId(
  templateId: string,
): OpenArtTool | undefined {
  return TOOLS.find((t) => t.templateId === templateId);
}

export function findToolBySlug(slug: string): OpenArtTool | undefined {
  return TOOLS.find((t) => t.slug === slug);
}
