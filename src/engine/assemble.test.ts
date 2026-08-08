/**
 * Copyright (C) 2026 Gerard Valls Montaño
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { describe, expect, it } from "vitest";
import {
  assembleClauses,
  fillPlaceholders,
  clauseAllowed,
} from "./assemble";
import {
  enrichDerivedValues,
  exhibitionCustodyEs,
} from "../templates/exhibition-custody-es";

describe("fillPlaceholders", () => {
  it("uses empty markers, never invented names", () => {
    const fields = exhibitionCustodyEs.fields;
    const out = fillPlaceholders(
      "Autor: {{parties.author.name}}",
      {},
      fields,
    );
    expect(out).toBe("Autor: [nombre completo del autor o titular]");
    expect(out.toLowerCase()).not.toContain("gerard");
  });

  it("fills provided values", () => {
    const out = fillPlaceholders(
      "{{project.workTitle}}",
      { "project.workTitle": "Obra de prueba" },
      exhibitionCustodyEs.fields,
    );
    expect(out).toBe("Obra de prueba");
  });
});

describe("assembleClauses", () => {
  it("includes special risk content when toggle is on", () => {
    const values = enrichDerivedValues({
      "features.specialRisk": true,
      "features.specialRiskDesc":
        "elemento de alta temperatura integrado en el sistema artístico",
      "custody.authorMounts": true,
      "insurance.hasRc": true,
      "insurance.hasNailToNail": true,
      "features.needsWatch": true,
    });
    const clauses = assembleClauses(exhibitionCustodyEs, values);
    const segunda = clauses.find((c) => c.id === "segunda");
    expect(segunda?.body).toContain(
      "elemento de alta temperatura integrado en el sistema artístico",
    );
    expect(segunda?.body.toLowerCase()).not.toContain("pistola");
  });

  it("keeps signatures after optional clauses", () => {
    const values = enrichDerivedValues({
      "custody.authorMounts": true,
      "options.deliveryAct": true,
      "options.policyCerts": true,
      "options.franchise": true,
      "insurance.hasRc": true,
      "insurance.hasNailToNail": true,
    });
    const clauses = assembleClauses(exhibitionCustodyEs, values);
    const ids = clauses.map((c) => c.id);
    expect(ids[ids.length - 1]).toBe("signatures");
    expect(ids.indexOf("decima")).toBeLessThan(ids.indexOf("opt_acta"));
    expect(ids.indexOf("opt_franq")).toBeLessThan(ids.indexOf("signatures"));
    expect(clauses.find((c) => c.id === "decima")?.body).not.toContain("EL AUTOR");
    expect(clauses.find((c) => c.id === "signatures")?.body).toContain("EL AUTOR");
  });
});

describe("clauseAllowed", () => {
  it("requires all flags", () => {
    const clause = exhibitionCustodyEs.clauses.find((c) => c.id === "quinta")!;
    expect(clauseAllowed(clause, {})).toBe(false);
    expect(
      clauseAllowed(clause, {
        "features.hasSculptures": true,
        "custody.dailyRemove": true,
      }),
    ).toBe(true);
  });
});
