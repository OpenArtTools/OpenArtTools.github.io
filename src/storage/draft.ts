/**
 * Copyright (C) 2026 Gerard Valls Montaño
 * SPDX-License-Identifier: AGPL-3.0-or-later
 *
 * Document draft file (openarttools.draft).
 * Owned by the user: download / reload. Never stored by the platform.
 * Lives inside a tool (e.g. exhibition agreements), not on the platform home.
 * See README.md and PRIVACY.md.
 */

import type { AppValues, Clause } from "../engine/types";
import { downloadJson, pickJsonFile, readTextFile } from "./jsonFile";

export const DRAFT_FILE_KIND = "openarttools.draft" as const;
export const DRAFT_FILE_VERSION = 2 as const;

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

export function downloadDraftFile(draft: DraftFile): void {
  const payload = buildDraftFile(draft);
  downloadJson(
    `open-art-tools-borrador-${payload.savedAt.slice(0, 10)}.json`,
    payload,
  );
}

export function parseDraftFile(raw: string): DraftFile {
  const data = JSON.parse(raw) as {
    kind?: string;
    version?: number;
    templateId?: string;
    values?: unknown;
    clauses?: unknown;
    manualOverride?: unknown;
    stepIndex?: unknown;
  };
  if (data.kind !== DRAFT_FILE_KIND) {
    throw new Error(
      "El archivo no es un borrador de documento de Open Art Tools.",
    );
  }
  if (data.version !== 1 && data.version !== DRAFT_FILE_VERSION) {
    throw new Error("Versión de borrador no compatible.");
  }
  if (!data.templateId || typeof data.templateId !== "string") {
    throw new Error("El borrador no indica la herramienta.");
  }
  if (!data.values || typeof data.values !== "object" || Array.isArray(data.values)) {
    throw new Error("El borrador está incompleto o dañado.");
  }
  const clauses = Array.isArray(data.clauses)
    ? (data.clauses as Clause[]).filter(
        (c) => c && typeof c.id === "string" && typeof c.title === "string",
      )
    : [];
  return buildDraftFile({
    templateId: data.templateId,
    values: data.values as AppValues,
    clauses,
    manualOverride: Boolean(data.manualOverride),
    stepIndex: typeof data.stepIndex === "number" ? data.stepIndex : 0,
  });
}

export async function readDraftFile(file: File): Promise<DraftFile> {
  return parseDraftFile(await readTextFile(file));
}

export async function pickAndReadDraftFile(): Promise<DraftFile | null> {
  const file = await pickJsonFile();
  if (!file) return null;
  return readDraftFile(file);
}
