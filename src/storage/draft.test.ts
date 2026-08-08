/**
 * Copyright (C) 2026 Gerard Valls Montaño
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { describe, expect, it } from "vitest";
import {
  DRAFT_FILE_KIND,
  DRAFT_FILE_VERSION,
  buildDraftFile,
  parseDraftFile,
} from "./draft";

describe("draft file", () => {
  it("round-trips form values and clauses", () => {
    const file = buildDraftFile({
      templateId: "exhibition-custody-es",
      values: {
        "parties.author.name": "Nombre de prueba",
        "features.electrical": true,
      },
      clauses: [
        {
          id: "c1",
          title: "Cláusula",
          body: "Texto",
          enabled: true,
          source: "user",
        },
      ],
      manualOverride: true,
      stepIndex: 2,
    });
    expect(file.kind).toBe(DRAFT_FILE_KIND);
    expect(file.version).toBe(DRAFT_FILE_VERSION);
    const again = parseDraftFile(JSON.stringify(file));
    expect(again.values["parties.author.name"]).toBe("Nombre de prueba");
    expect(again.clauses).toHaveLength(1);
    expect(again.manualOverride).toBe(true);
    expect(again.stepIndex).toBe(2);
  });

  it("accepts legacy v1 drafts without clauses", () => {
    const legacy = {
      kind: DRAFT_FILE_KIND,
      version: 1,
      savedAt: "2026-01-01T00:00:00.000Z",
      templateId: "exhibition-custody-es",
      values: { "project.workTitle": "Obra" },
    };
    const again = parseDraftFile(JSON.stringify(legacy));
    expect(again.clauses).toEqual([]);
    expect(again.values["project.workTitle"]).toBe("Obra");
  });

  it("rejects foreign files", () => {
    expect(() =>
      parseDraftFile(JSON.stringify({ kind: "openarttools.contacts" })),
    ).toThrow(/borrador/);
  });
});
