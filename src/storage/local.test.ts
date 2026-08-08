/**
 * Copyright 2026 Gerard Valls Montaño
 * Licensed under the Apache License, Version 2.0
 */

import { describe, expect, it } from "vitest";
import {
  buildSessionFile,
  parseSessionFile,
  SESSION_FILE_KIND,
} from "./local";

describe("session file", () => {
  it("round-trips without inventing storage", () => {
    const file = buildSessionFile({
      templateId: "exhibition-custody-es",
      values: { "parties.author.name": "Nombre de prueba" },
      clauses: [
        {
          id: "primera",
          title: "PRIMERA",
          body: "Texto",
          enabled: true,
          source: "template",
        },
      ],
      manualOverride: false,
    });
    expect(file.kind).toBe(SESSION_FILE_KIND);
    const again = parseSessionFile(JSON.stringify(file));
    expect(again.values["parties.author.name"]).toBe("Nombre de prueba");
    expect(again.clauses).toHaveLength(1);
  });

  it("rejects foreign files", () => {
    expect(() => parseSessionFile(JSON.stringify({ kind: "other" }))).toThrow(
      /Open Art Tools/,
    );
  });
});
