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
  version: "0.1.0-beta.3",
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
 * Voluntary support (coffee) — never required, never gated behind features.
 * Keep this separate from PLATFORM.origin (why the tools exist).
 */
export const SUPPORT = {
  navLabel: "Apoyo",
  title: "Invitar a un café",
  donateUrl: "",
  donateLabel: "Invitar a un café",
  homeCtaLabel: "Invitar a un café",
  contactLabel: "Contactar con Gerard Valls Montaño",
  contactUrl: "https://bygerardvisuals.com/",
  homeTitle: "Cómo se mantiene",
  homeLead:
    "Open ArtCore lo mantiene Gerard Valls Montaño de forma voluntaria: es gratuito y open source, sin cobros ni suscripciones. No es un negocio ni un producto de pago.",
  homeBody:
    "Si la plataforma resulta útil, se puede invitar a un café: es apoyo para respaldar el trabajo de desarrollo. No compra nada ni desbloquea funciones. No es obligatorio.",
  intro:
    "Esta página trata solo del apoyo voluntario. Open ArtCore es y seguirá siendo gratuito y de código abierto. Usar la plataforma no exige aportar nada.",
  voluntary:
    "Quien lo desee puede invitar a un café. Esa aportación es completamente para respaldar y dar apoyo al trabajo de desarrollo de Gerard Valls Montaño —tiempo para mantener y ampliar la plataforma—. No es necesario. No hay presión. No cambia lo que se puede usar.",
  whatForTitle: "Para qué sirve ese café",
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
  privacyTitle: "Privacidad del aporte",
  privacy:
    "Open ArtCore no procesa pagos ni guarda datos de donación. Si se usa un enlace para invitar a un café, se abre un proveedor externo (por ejemplo PayPal, Ko-fi o similar). Allí aplican sus condiciones y su privacidad, no las de esta plataforma.",
  thanks:
    "Si se invita a un café: gracias de verdad. Si no se puede o no se quiere: también está bien. La plataforma está hecha para usarse.",
  footerLabel: "Invitar a un café",
} as const;

/** Five non-negotiable platform commitments — always visible. */
export const PRINCIPLES = [
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
    body: "Cualquiera puede revisar el código y comprobar las promesas. Guía en AUDITABILITY.md.",
  },
] as const;

export const TRANSPARENCY = {
  strip: "Seguro · Privado · Accesible · Transparente · Auditable",
  stripShort: "Seguro · Privado · Transparente · Auditable",
  pageIntro:
    "Open ArtCore es segura, privada, accesible, transparente cristalina y auditable. Aquí está el compromiso, sin rodeos; el detalle vive en el repositorio.",
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
      body: "Nace de la experiencia propia en la práctica artística y de la necesidad real de estos recursos. Son herramientas que faltaban en la práctica y se comparten abiertas. Esto no es lo mismo que el apoyo voluntario («invitar a un café»).",
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
      title: "Invitar a un café",
      body: "Apoyo voluntario al trabajo de desarrollo (tiempo y costes). Distinto del origen de la idea. No desbloquea funciones. Nunca es obligatorio. Ver SUPPORT.md.",
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
