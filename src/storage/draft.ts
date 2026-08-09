/**
 * Copyright (C) 2026 Gerard Valls Montaño
 * SPDX-License-Identifier: AGPL-3.0-or-later
 *
 * Document draft file (openarttools.draft).
 * Downloaded as a readable HTML file (any OS / browser).
 * Reload state is embedded in the file; never stored by the platform.
 * Lives inside a tool (e.g. exhibition agreements), not on the platform home.
 * See README.md and PRIVACY.md.
 */

import { escapeHtml } from "../dom";
import type { AppValues, Clause } from "../engine/types";
import { readTextFile } from "./jsonFile";

export const DRAFT_FILE_KIND = "openarttools.draft" as const;
export const DRAFT_FILE_VERSION = 2 as const;
export const DRAFT_EMBED_ID = "openarttools-draft-data" as const;

const DRAFT_HTML_CSP =
  "default-src 'none'; style-src 'unsafe-inline'; img-src data:; base-uri 'none'; form-action 'none'; frame-ancestors 'none'; script-src 'none'";

const FORBIDDEN_KEYS = new Set(["__proto__", "constructor", "prototype"]);

export type DraftFile = {
  kind: typeof DRAFT_FILE_KIND;
  version: typeof DRAFT_FILE_VERSION;
  savedAt: string;
  templateId: string;
  values: AppValues;
  clauses: Clause[];
  manualOverride: boolean;
  stepIndex: number;
};

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return (
    typeof value === "object" &&
    value !== null &&
    !Array.isArray(value) &&
    Object.getPrototypeOf(value) === Object.prototype
  );
}

function sanitizeValues(raw: unknown): AppValues {
  if (!isPlainObject(raw)) {
    throw new Error("El borrador está incompleto o dañado.");
  }
  const values: AppValues = {};
  for (const [key, value] of Object.entries(raw)) {
    if (!key || FORBIDDEN_KEYS.has(key) || key.includes("__proto__")) continue;
    if (
      typeof value === "string" ||
      typeof value === "boolean" ||
      typeof value === "number"
    ) {
      values[key] = value;
    }
  }
  return values;
}

function sanitizeClauses(raw: unknown): Clause[] {
  if (!Array.isArray(raw)) return [];
  const clauses: Clause[] = [];
  for (const item of raw) {
    if (!isPlainObject(item)) continue;
    const id = item.id;
    const title = item.title;
    const body = item.body;
    if (typeof id !== "string" || !id.trim()) continue;
    if (typeof title !== "string" || typeof body !== "string") continue;
    const source =
      item.source === "user" || item.source === "template"
        ? item.source
        : "user";
    clauses.push({
      id,
      title,
      body,
      enabled: item.enabled !== false,
      source,
      placeAtEnd: item.placeAtEnd === true,
    });
  }
  return clauses;
}

export function buildDraftFile(input: {
  templateId: string;
  values: AppValues;
  clauses: Clause[];
  manualOverride: boolean;
  stepIndex: number;
}): DraftFile {
  return {
    kind: DRAFT_FILE_KIND,
    version: DRAFT_FILE_VERSION,
    savedAt: new Date().toISOString(),
    templateId: input.templateId,
    values: { ...input.values },
    clauses: input.clauses.map((c) => ({ ...c })),
    manualOverride: Boolean(input.manualOverride),
    stepIndex: Math.max(0, input.stepIndex | 0),
  };
}

function draftTitle(draft: DraftFile): string {
  const work = String(draft.values["project.workTitle"] ?? "").trim();
  return work ? `Borrador — ${work}` : "Borrador de acuerdo — Open Art Tools";
}

function valuesPreviewHtml(values: AppValues): string {
  const rows = Object.entries(values)
    .filter(([, v]) => {
      if (v === undefined || v === null || v === "") return false;
      if (typeof v === "boolean") return v;
      return true;
    })
    .map(([path, v]) => {
      const shown =
        typeof v === "boolean" ? (v ? "sí" : "no") : String(v);
      return `<tr><th>${escapeHtml(path)}</th><td>${escapeHtml(shown)}</td></tr>`;
    });
  if (!rows.length) {
    return "<p>No hay datos de formulario guardados todavía.</p>";
  }
  return `<table class="values"><tbody>${rows.join("")}</tbody></table>`;
}

function clausesPreviewHtml(clauses: Clause[]): string {
  const enabled = clauses.filter((c) => c.enabled);
  if (!enabled.length) {
    return "<p>Aún no hay cláusulas ensambladas (o están desactivadas). Se puede seguir editando al cargar este borrador en Open Art Tools.</p>";
  }
  return enabled
    .map(
      (c) =>
        `<section class="clause"><h2>${escapeHtml(c.title)}</h2><pre>${escapeHtml(c.body)}</pre></section>`,
    )
    .join("\n");
}

/** Readable HTML draft for any OS; embeds reload payload. */
export function draftToHtml(draft: DraftFile): string {
  const payload = buildDraftFile(draft);
  const title = draftTitle(payload);
  const json = JSON.stringify(payload);
  const saved = payload.savedAt.slice(0, 19).replace("T", " ");

  return `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="utf-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1"/>
<meta http-equiv="Content-Security-Policy" content="${DRAFT_HTML_CSP}"/>
<title>${escapeHtml(title)}</title>
<style>
  body {
    font-family: Georgia, "Times New Roman", serif;
    font-size: 15px;
    line-height: 1.45;
    color: #111;
    max-width: 44rem;
    margin: 0 auto;
    padding: 1.5rem 1.25rem 3rem;
  }
  h1 { font-size: 1.35rem; font-weight: 600; margin: 0 0 0.5rem; }
  h2 { font-size: 1.05rem; margin: 1.5rem 0 0.5rem; }
  .meta, .hint {
    font-family: system-ui, sans-serif;
    font-size: 0.85rem;
    color: #444;
  }
  .hint { margin: 0 0 1.5rem; padding-bottom: 1rem; border-bottom: 1px solid #ddd; }
  table.values { width: 100%; border-collapse: collapse; font-family: system-ui, sans-serif; font-size: 0.85rem; }
  table.values th {
    text-align: left; font-weight: 500; color: #555; padding: 0.35rem 0.5rem 0.35rem 0;
    vertical-align: top; white-space: nowrap;
  }
  table.values td { padding: 0.35rem 0; word-break: break-word; }
  .clause { margin: 1.25rem 0; }
  .clause pre {
    white-space: pre-wrap;
    font-family: inherit;
    margin: 0;
  }
  #${DRAFT_EMBED_ID} { display: none; }
</style>
</head>
<body>
  <h1>${escapeHtml(title)}</h1>
  <p class="meta">Guardado: ${escapeHtml(saved)} · Herramienta: ${escapeHtml(payload.templateId)}</p>
  <p class="hint">Este archivo es un borrador visible. Se puede abrir en cualquier navegador. Para seguir editándolo, cargarlo en Open Art Tools (Cargar borrador). Cargar solo borradores propios o de confianza.</p>

  <h2>Cláusulas</h2>
  ${clausesPreviewHtml(payload.clauses)}

  <h2>Datos del formulario</h2>
  ${valuesPreviewHtml(payload.values)}

  <script type="application/json" id="${DRAFT_EMBED_ID}">${json.replace(/</g, "\\u003c")}</script>
</body>
</html>
`;
}

function downloadText(filename: string, content: string, mime: string): void {
  const blob = new Blob([content], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

export function downloadDraftFile(draft: DraftFile): void {
  const payload = buildDraftFile(draft);
  const html = draftToHtml(payload);
  downloadText(
    `open-art-tools-borrador-${payload.savedAt.slice(0, 10)}.html`,
    html,
    "text/html;charset=utf-8",
  );
}

function extractEmbeddedDraftJson(raw: string): string | null {
  const trimmed = raw.trim();
  if (trimmed.startsWith("{")) return trimmed;

  const byId = new RegExp(
    `<script[^>]*\\bid=["']${DRAFT_EMBED_ID}["'][^>]*>([\\s\\S]*?)</script>`,
    "i",
  );
  const match = raw.match(byId);
  if (match?.[1]) return match[1].trim();

  const generic = raw.match(
    /<script[^>]*type=["']application\/json["'][^>]*>([\s\S]*?)<\/script>/i,
  );
  if (generic?.[1]?.includes(DRAFT_FILE_KIND)) return generic[1].trim();

  return null;
}

export function parseDraftFile(raw: string): DraftFile {
  const jsonText = extractEmbeddedDraftJson(raw);
  if (!jsonText) {
    throw new Error(
      "El archivo no es un borrador de documento de Open Art Tools.",
    );
  }

  let data: {
    kind?: string;
    version?: number;
    templateId?: string;
    values?: unknown;
    clauses?: unknown;
    manualOverride?: unknown;
    stepIndex?: unknown;
  };
  try {
    data = JSON.parse(jsonText) as typeof data;
  } catch {
    throw new Error("El borrador está incompleto o dañado.");
  }

  if (data.kind !== DRAFT_FILE_KIND) {
    throw new Error(
      "El archivo no es un borrador de documento de Open Art Tools.",
    );
  }
  if (data.version !== 1 && data.version !== DRAFT_FILE_VERSION) {
    throw new Error("Versión de borrador no compatible.");
  }
  if (typeof data.templateId !== "string" || !data.templateId.trim()) {
    throw new Error("El borrador no indica la herramienta.");
  }
  return buildDraftFile({
    templateId: data.templateId.trim(),
    values: sanitizeValues(data.values),
    clauses: sanitizeClauses(data.clauses),
    manualOverride: Boolean(data.manualOverride),
    stepIndex:
      typeof data.stepIndex === "number" && Number.isFinite(data.stepIndex)
        ? Math.max(0, Math.floor(data.stepIndex))
        : 0,
  });
}

export async function readDraftFile(file: File): Promise<DraftFile> {
  return parseDraftFile(await readTextFile(file));
}

/** Prefer HTML drafts; still accept legacy .json. */
export function pickDraftFileDialog(): Promise<File | null> {
  return new Promise((resolve) => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".html,.htm,text/html,application/json,.json";
    let settled = false;
    const finish = (file: File | null) => {
      if (settled) return;
      settled = true;
      window.removeEventListener("focus", onFocus);
      resolve(file);
    };
    const onFocus = () => {
      setTimeout(() => finish(null), 400);
    };
    input.addEventListener("change", () => {
      finish(input.files?.[0] ?? null);
    });
    input.addEventListener("cancel", () => finish(null));
    window.addEventListener("focus", onFocus, { once: true });
    input.click();
  });
}

export async function pickAndReadDraftFile(): Promise<DraftFile | null> {
  const file = await pickDraftFileDialog();
  if (!file) return null;
  return readDraftFile(file);
}
