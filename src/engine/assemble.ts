/**
 * Copyright 2026 Gerard Valls Montaño
 * Licensed under the Apache License, Version 2.0
 */

import type { AppValues, Clause, ClauseTemplate, Field, TemplateDoc } from "./types";

function getPath(values: AppValues, path: string): string | boolean | number | undefined {
  return values[path];
}

function isTruthy(values: AppValues, path: string): boolean {
  const v = getPath(values, path);
  return v === true || v === "true" || v === 1;
}

export function clauseAllowed(clause: ClauseTemplate, values: AppValues): boolean {
  if (clause.requireAll?.length) {
    if (!clause.requireAll.every((p) => isTruthy(values, p))) return false;
  }
  if (clause.requireAny?.length) {
    if (!clause.requireAny.some((p) => isTruthy(values, p))) return false;
  }
  if (clause.excludeIf?.length) {
    if (clause.excludeIf.some((p) => isTruthy(values, p))) return false;
  }
  return true;
}

/** Replace {{path}} with value or emptyMarker from field map. */
export function fillPlaceholders(
  text: string,
  values: AppValues,
  fields: Field[],
): string {
  const byPath = new Map(fields.map((f) => [f.path, f]));
  return text.replace(/\{\{([^}]+)\}\}/g, (_m, raw: string) => {
    const path = raw.trim();
    const field = byPath.get(path);
    const val = getPath(values, path);
    if (val === undefined || val === null || val === "") {
      return field?.emptyMarker ?? `[${path}]`;
    }
    if (typeof val === "boolean") return val ? "sí" : "no";
    return String(val);
  });
}

export function assembleClauses(
  template: TemplateDoc,
  values: AppValues,
  previous?: Clause[],
): Clause[] {
  const prevMap = new Map(previous?.map((c) => [c.id, c]));
  const out: Clause[] = [];

  for (const ct of template.clauses) {
    if (!clauseAllowed(ct, values)) continue;
    const prev = prevMap.get(ct.id);
    const body = fillPlaceholders(ct.body, values, template.fields);
    const title = fillPlaceholders(ct.title, values, template.fields);

    if (prev?.source === "user") {
      out.push({ ...prev, enabled: prev.enabled });
      continue;
    }

    out.push({
      id: ct.id,
      title,
      body,
      enabled: prev ? prev.enabled : ct.defaultEnabled !== false,
      source: "template",
    });
  }

  // Keep user-added clauses
  for (const prev of previous ?? []) {
    if (prev.source === "user" && !out.some((c) => c.id === prev.id)) {
      out.push(prev);
    }
  }

  return out;
}

/** Re-fill template clauses from values; preserve user edits if manualOverride. */
export function refreshFromValues(
  template: TemplateDoc,
  values: AppValues,
  clauses: Clause[],
  manualOverride: boolean,
): Clause[] {
  if (manualOverride) {
    // Only refresh non-user clauses that still match template and weren't hand-edited
    // In override mode we leave bodies as-is except for newly included clauses
    const allowed = new Set(
      template.clauses.filter((c) => clauseAllowed(c, values)).map((c) => c.id),
    );
    const existing = new Map(clauses.map((c) => [c.id, c]));
    const out: Clause[] = [];

    for (const ct of template.clauses) {
      if (!allowed.has(ct.id)) continue;
      const prev = existing.get(ct.id);
      if (prev) {
        out.push(prev);
      } else {
        out.push({
          id: ct.id,
          title: fillPlaceholders(ct.title, values, template.fields),
          body: fillPlaceholders(ct.body, values, template.fields),
          enabled: ct.defaultEnabled !== false,
          source: "template",
        });
      }
    }
    for (const c of clauses) {
      if (c.source === "user" && !out.some((x) => x.id === c.id)) out.push(c);
    }
    return out;
  }
  return assembleClauses(template, values, clauses);
}

export function documentText(clauses: Clause[]): string {
  return clauses
    .filter((c) => c.enabled)
    .map((c) => `${c.title}\n\n${c.body}`)
    .join("\n\n");
}

export function missingRequired(template: TemplateDoc, values: AppValues): Field[] {
  return template.fields.filter((f) => {
    if (!f.required) return false;
    if (f.showIf && !isTruthy(values, f.showIf)) return false;
    const v = getPath(values, f.path);
    return v === undefined || v === null || v === "";
  });
}

export function fieldsForStep(template: TemplateDoc, stepId: string): Field[] {
  return template.fields.filter((f) => f.step === stepId);
}

export function fieldVisible(field: Field, values: AppValues): boolean {
  if (!field.showIf) return true;
  return isTruthy(values, field.showIf);
}
