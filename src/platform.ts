/**
 * Copyright 2026 Gerard Valls Montaño
 * Licensed under the Apache License, Version 2.0
 *
 * Open Art Tools — umbrella platform that hosts free open-source tools for artists.
 */

export type ToolStatus = "available" | "coming";

export type OpenArtTool = {
  id: string;
  name: string;
  blurb: string;
  status: ToolStatus;
  /** When available, starts this template in the app */
  templateId?: string;
};

export const PLATFORM = {
  name: "Open Art Tools",
  role: "Plataforma",
  tagline:
    "Plataforma open source que agrupa herramientas gratuitas para artistas.",
  about:
    "Open Art Tools no es una sola app: es el lugar donde viven las herramientas. Entras a la plataforma, eliges una herramienta y la usas cuando quieras. Completamente open source y gratuita.",
  dataNote:
    "La plataforma no almacena tus datos. Cada herramienta trabaja en memoria; si quieres reutilizar información, descargas un archivo y lo cargas tú.",
  author: "Gerard Valls Montaño",
} as const;

export const TOOLS: OpenArtTool[] = [
  {
    id: "exhibition-agreements",
    name: "Acuerdos de exhibición",
    blurb:
      "Herramienta para crear acuerdos y anexos al exhibir obra en festivales, galerías u otros espacios: custodia, seguro y responsabilidad.",
    status: "available",
    templateId: "exhibition-custody-es",
  },
];

export function findToolByTemplateId(
  templateId: string,
): OpenArtTool | undefined {
  return TOOLS.find((t) => t.templateId === templateId);
}
