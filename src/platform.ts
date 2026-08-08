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
} as const;

/** Always-visible transparency promise (short). */
export const TRANSPARENCY = {
  strip:
    "Open source · No almacena tus datos · Auditable · Tú controlas tus archivos",
  legal:
    "Las plantillas no han sido revisadas por abogados ni por profesionales del derecho y no constituyen asesoramiento legal.",
  points: [
    {
      title: "Open source",
      body: "Todo el código es público (Apache-2.0). Cualquiera puede leerlo, usarlo, auditarlo o mejorarlo.",
    },
    {
      title: "Cero almacenamiento de tus datos",
      body: "La plataforma no guarda formularios, contratos ni datos personales. La sesión vive solo en la memoria del navegador mientras la pestaña está abierta.",
    },
    {
      title: "Archivos que controlas tú",
      body: "Si quieres reutilizar trabajo, descargas un archivo .json y lo vuelves a cargar tú. Open Art Tools no lo sube a ningún servidor.",
    },
    {
      title: "Auditable",
      body: "Puedes comprobar en el código que no hay telemetría, cuentas cloud ni localStorage para tus datos. Ver AUDITABILITY.md en el repositorio.",
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
