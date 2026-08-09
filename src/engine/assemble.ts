/**
 * Copyright (C) 2026 Gerard Valls Montaño
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import type { AppValues, Clause, ClauseTemplate, Field, TemplateDoc } from "./types";

function getPath(values: AppValues, path: string): string | boolean | number | undefined {
  return values[path];
}

export function isTruthy(values: AppValues, path: string): boolean {
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
      if (field) return field.emptyMarker;
      // Explicit empty derived values (e.g. optional representative block).
      if (val === "") return "";
      return `[${path}]`;
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
      out.push({ ...prev, enabled: prev.enabled, placeAtEnd: ct.placeAtEnd });
      continue;
    }

    out.push({
      id: ct.id,
      title,
      body,
      enabled: prev ? prev.enabled : true,
      source: "template",
      placeAtEnd: ct.placeAtEnd,
    });
  }

  // Keep user-added clauses (before signature / end blocks)
  for (const prev of previous ?? []) {
    if (prev.source === "user" && !out.some((c) => c.id === prev.id)) {
      out.push({ ...prev, placeAtEnd: false });
    }
  }

  return ensurePlaceAtEnd(out, template);
}

/** Force placeAtEnd clauses (signatures) to the absolute end. */
export function ensurePlaceAtEnd(
  clauses: Clause[],
  template?: TemplateDoc,
): Clause[] {
  const endIds = new Set(
    template?.clauses.filter((c) => c.placeAtEnd).map((c) => c.id) ?? [],
  );
  const normal: Clause[] = [];
  const end: Clause[] = [];
  for (const c of clauses) {
    if (c.placeAtEnd || endIds.has(c.id)) end.push({ ...c, placeAtEnd: true });
    else normal.push(c);
  }
  return [...normal, ...end];
}

/** Re-fill template clauses from values; preserve user edits if manualOverride. */
export function refreshFromValues(
  template: TemplateDoc,
  values: AppValues,
  clauses: Clause[],
  manualOverride: boolean,
): Clause[] {
  if (manualOverride) {
    const allowed = new Set(
      template.clauses.filter((c) => clauseAllowed(c, values)).map((c) => c.id),
    );
    const placeAtEndById = new Map(
      template.clauses.map((c) => [c.id, Boolean(c.placeAtEnd)]),
    );
    const existing = new Map(clauses.map((c) => [c.id, c]));
    const out: Clause[] = [];

    for (const ct of template.clauses) {
      if (!allowed.has(ct.id)) continue;
      const prev = existing.get(ct.id);
      if (prev) {
        out.push({ ...prev, placeAtEnd: ct.placeAtEnd });
      } else {
        out.push({
          id: ct.id,
          title: fillPlaceholders(ct.title, values, template.fields),
          body: fillPlaceholders(ct.body, values, template.fields),
          enabled: true,
          source: "template",
          placeAtEnd: ct.placeAtEnd,
        });
      }
    }
    for (const c of clauses) {
      if (c.source === "user" && !out.some((x) => x.id === c.id)) {
        out.push({ ...c, placeAtEnd: placeAtEndById.get(c.id) ?? false });
      }
    }
    return ensurePlaceAtEnd(out, template);
  }
  return assembleClauses(template, values, clauses);
}

export function documentText(clauses: Clause[]): string {
  return clauses
    .filter((c) => c.enabled)
    .map((c) => {
      const title = c.title.trim();
      return title ? `${title}\n\n${c.body}` : c.body;
    })
    .join("\n\n");
}

export function missingRequired(template: TemplateDoc, values: AppValues): Field[] {
  return template.fields.filter((f) => {
    if (!f.required) return false;
    if (!fieldVisible(f, values)) return false;
    const v = getPath(values, f.path);
    return v === undefined || v === null || v === "";
  });
}

export function fieldsForStep(template: TemplateDoc, stepId: string): Field[] {
  return template.fields.filter((f) => f.step === stepId);
}

export function fieldVisible(field: Field, values: AppValues): boolean {
  if (field.showIf && !isTruthy(values, field.showIf)) return false;
  if (field.showIfAny?.length) {
    if (!field.showIfAny.some((p) => isTruthy(values, p))) return false;
  }
  return true;
}
