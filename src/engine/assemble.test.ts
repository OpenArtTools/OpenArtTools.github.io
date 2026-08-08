/**
 * Copyright 2026 Gerard Valls Montaño
 * Licensed under the Apache License, Version 2.0
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

  it("excludes optional jurisdiction when off", () => {
    const values = enrichDerivedValues({
      "custody.authorMounts": true,
      "options.jurisdiction": false,
    });
    const clauses = assembleClauses(exhibitionCustodyEs, values);
    expect(clauses.some((c) => c.id === "opt_jur")).toBe(false);
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
