/**
 * Copyright 2026 Gerard Valls Montaño
 * Licensed under the Apache License, Version 2.0
 *
 * No browser/server storage. Session data can only leave the app as a
 * downloaded file that the user may reload later.
 */

export const SESSION_FILE_KIND = "openarttools.session" as const;
export const SESSION_FILE_VERSION = 1 as const;

export type SessionFile = {
  kind: typeof SESSION_FILE_KIND;
  version: typeof SESSION_FILE_VERSION;
  savedAt: string;
  templateId: string;
  values: Record<string, string | boolean | number>;
  clauses: {
    id: string;
    title: string;
    body: string;
    enabled: boolean;
    source: "template" | "user";
    placeAtEnd?: boolean;
  }[];
  manualOverride: boolean;
};

export function buildSessionFile(input: {
  templateId: string;
  values: Record<string, string | boolean | number>;
  clauses: SessionFile["clauses"];
  manualOverride: boolean;
}): SessionFile {
  return {
    kind: SESSION_FILE_KIND,
    version: SESSION_FILE_VERSION,
    savedAt: new Date().toISOString(),
    templateId: input.templateId,
    values: input.values,
    clauses: input.clauses,
    manualOverride: input.manualOverride,
  };
}

export function downloadSessionFile(file: SessionFile): void {
  const blob = new Blob([JSON.stringify(file, null, 2)], {
    type: "application/json;charset=utf-8",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `open-art-tools-sesion-${file.savedAt.slice(0, 10)}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

export function parseSessionFile(raw: string): SessionFile {
  const data = JSON.parse(raw) as Partial<SessionFile>;
  if (data.kind !== SESSION_FILE_KIND) {
    throw new Error("El archivo no es una sesión de Open Art Tools.");
  }
  if (data.version !== SESSION_FILE_VERSION) {
    throw new Error("Versión de archivo no compatible.");
  }
  if (!data.templateId || !data.values || !Array.isArray(data.clauses)) {
    throw new Error("El archivo de sesión está incompleto o dañado.");
  }
  return {
    kind: SESSION_FILE_KIND,
    version: SESSION_FILE_VERSION,
    savedAt: data.savedAt ?? new Date().toISOString(),
    templateId: data.templateId,
    values: data.values,
    clauses: data.clauses,
    manualOverride: Boolean(data.manualOverride),
  };
}

export function readSessionFile(file: File): Promise<SessionFile> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      try {
        resolve(parseSessionFile(String(reader.result ?? "")));
      } catch (err) {
        reject(err);
      }
    };
    reader.onerror = () => reject(new Error("No se pudo leer el archivo."));
    reader.readAsText(file);
  });
}
