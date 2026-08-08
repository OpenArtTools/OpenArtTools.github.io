/**
 * Copyright 2026 Gerard Valls Montaño
 * Licensed under the Apache License, Version 2.0
 *
 * Open Art Tools — umbrella catalog of free open-source tools for artists.
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
  tagline:
    "Plataforma open source de herramientas gratuitas para artistas. Úsalas siempre que quieras.",
  author: "Gerard Valls Montaño",
} as const;

export const TOOLS: OpenArtTool[] = [
  {
    id: "exhibition-agreements",
    name: "Acuerdos de exhibición",
    blurb:
      "Crea anexos y condiciones para exhibir obra en festivales, galerías u otros espacios: custodia, seguro y responsabilidad, paso a paso.",
    status: "available",
    templateId: "exhibition-custody-es",
  },
];
