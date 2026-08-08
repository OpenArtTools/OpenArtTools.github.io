/**
 * Copyright 2026 Gerard Valls Montaño
 * Licensed under the Apache License, Version 2.0
 */

export type FieldType =
  | "text"
  | "number"
  | "date"
  | "money"
  | "toggle"
  | "textarea";

export type Field = {
  id: string;
  label: string;
  /** Instructive hint — what to write, never a sample identity. */
  placeholder: string;
  type: FieldType;
  path: string;
  required?: boolean;
  emptyMarker: string;
  step: string;
  group?: string;
  showIf?: string;
};

export type ClauseTemplate = {
  id: string;
  title: string;
  body: string;
  requireAll?: string[];
  requireAny?: string[];
  excludeIf?: string[];
  optional?: boolean;
  defaultEnabled?: boolean;
  placeAtEnd?: boolean;
};

export type TemplateDoc = {
  id: string;
  name: string;
  description: string;
  fields: Field[];
  clauses: ClauseTemplate[];
  steps: { id: string; title: string; blurb: string }[];
};

export type Clause = {
  id: string;
  title: string;
  body: string;
  enabled: boolean;
  source: "template" | "user";
  placeAtEnd?: boolean;
};

export type AppValues = Record<string, string | boolean | number>;
