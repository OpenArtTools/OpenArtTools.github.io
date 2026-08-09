/**
 * Copyright (C) 2026 Gerard Valls Montaño
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { describe, expect, it } from "vitest";
import {
  DRAFT_FILE_KIND,
  DRAFT_FILE_VERSION,
  buildDraftFile,
  draftToHtml,
  parseDraftFile,
} from "./draft";

describe("draft file", () => {
  it("round-trips form values and clauses via readable HTML", () => {
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
          body: "Texto visible del borrador",
          enabled: true,
          source: "user",
        },
      ],
      manualOverride: true,
      stepIndex: 2,
    });
    expect(file.kind).toBe(DRAFT_FILE_KIND);
    expect(file.version).toBe(DRAFT_FILE_VERSION);

    const html = draftToHtml(file);
    expect(html).toContain("<!DOCTYPE html>");
    expect(html).toContain("Texto visible del borrador");
    expect(html).toContain("Nombre de prueba");
    expect(html).toContain("openarttools-draft-data");

    const again = parseDraftFile(html);
    expect(again.values["parties.author.name"]).toBe("Nombre de prueba");
    expect(again.clauses).toHaveLength(1);
    expect(again.manualOverride).toBe(true);
    expect(again.stepIndex).toBe(2);
  });

  it("accepts legacy JSON drafts", () => {
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

  it("embeds a restrictive CSP in HTML drafts", () => {
    const html = draftToHtml(
      buildDraftFile({
        templateId: "exhibition-custody-es",
        values: {},
        clauses: [],
        manualOverride: false,
        stepIndex: 0,
      }),
    );
    expect(html).toContain('http-equiv="Content-Security-Policy"');
    expect(html).toContain("default-src 'none'");
  });

  it("drops unsafe keys and non-scalar values when loading", () => {
    const raw = `{
      "kind": "${DRAFT_FILE_KIND}",
      "version": 1,
      "templateId": "exhibition-custody-es",
      "values": {
        "project.workTitle": "Obra",
        "__proto__": { "polluted": true },
        "nested": { "x": 1 }
      },
      "clauses": [
        { "id": "ok", "title": "T", "body": "B", "enabled": true, "source": "user" },
        { "id": "bad", "title": "T", "enabled": true },
        null
      ]
    }`;
    const again = parseDraftFile(raw);
    expect(again.values["project.workTitle"]).toBe("Obra");
    expect(Object.prototype.hasOwnProperty.call(again.values, "__proto__")).toBe(
      false,
    );
    expect(again.values).not.toHaveProperty("nested");
    expect(again.clauses).toHaveLength(1);
    expect(again.clauses[0]?.body).toBe("B");
  });
});
