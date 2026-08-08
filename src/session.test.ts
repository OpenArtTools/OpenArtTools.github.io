/**
 * Copyright (C) 2026 Gerard Valls Montaño
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { describe, expect, it } from "vitest";
import {
  createEmptySession,
  hasDocumentWork,
  isToolPhase,
} from "./session";

const defaults = {
  "features.interactive": true,
  "parties.author.name": "",
};

describe("isToolPhase", () => {
  it("recognizes wizard/review/accept", () => {
    expect(isToolPhase("wizard")).toBe(true);
    expect(isToolPhase("review")).toBe(true);
    expect(isToolPhase("accept")).toBe(true);
    expect(isToolPhase("home")).toBe(false);
    expect(isToolPhase("privacy")).toBe(false);
  });
});

describe("hasDocumentWork", () => {
  it("is false for a fresh session", () => {
    const state = createEmptySession("exhibition-custody-es", defaults);
    expect(hasDocumentWork(state, defaults)).toBe(false);
  });

  it("is true when a value differs from defaults", () => {
    const state = createEmptySession("exhibition-custody-es", defaults);
    state.values["parties.author.name"] = "Ana";
    expect(hasDocumentWork(state, defaults)).toBe(true);
  });

  it("is true when the user edited clauses", () => {
    const state = createEmptySession("exhibition-custody-es", defaults);
    state.clauses = [
      {
        id: "c1",
        title: "X",
        body: "Y",
        enabled: true,
        source: "user",
      },
    ];
    expect(hasDocumentWork(state, defaults)).toBe(true);
  });
});
