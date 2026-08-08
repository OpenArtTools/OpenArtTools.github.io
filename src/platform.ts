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
  templateId?: string;
};

export const PLATFORM = {
  name: "Open Art Tools",
  role: "Plataforma",
  tagline: "Herramientas open source y gratuitas para artistas.",
  about:
    "Open Art Tools es la plataforma. Aquí viven las herramientas: eliges una y la usas cuando quieras.",
  author: "Gerard Valls Montaño",
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
