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
  | "list"
  | "textarea";

export type Field = {
  id: string;
  label: string;
  /** Instructive hint — what to write, never a sample identity. */
  placeholder: string;
  type: FieldType;
  path: string;
  required?: boolean;
  /** Marker shown in the assembled document when empty, e.g. [nombre completo del autor] */
  emptyMarker: string;
  step: string;
  group?: string;
  /** When set, field only shows if this toggle path is true */
  showIf?: string;
};

export type ClauseTemplate = {
  id: string;
  title: string;
  body: string;
  /** Include when all of these toggle paths are true (or omitted = always) */
  requireAll?: string[];
  /** Include when any of these toggle paths are true */
  requireAny?: string[];
  /** Exclude when any of these toggle paths are true */
  excludeIf?: string[];
  optional?: boolean;
  defaultEnabled?: boolean;
  /** Always keep this block at the very end (e.g. signatures). */
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

export type SessionState = {
  templateId: string;
  values: AppValues;
  clauses: Clause[];
  stepIndex: number;
  phase: "home" | "wizard" | "review" | "accept" | "privacy";
  manualOverride: boolean;
  acceptedFinal?: boolean;
};
