/**
 * Copyright (C) 2026 Gerard Valls Montaño
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { describe, expect, it } from "vitest";
import {
  findToolById,
  normalizePath,
  parsePath,
  pathForPhase,
} from "./routing";

describe("routing", () => {
  it("parses home and platform pages", () => {
    expect(parsePath("/")).toEqual({ kind: "home" });
    expect(parsePath("/transparencia")).toEqual({ kind: "privacy" });
    expect(parsePath("/apoyo")).toEqual({ kind: "support" });
    expect(parsePath("/transparencia/")).toEqual({ kind: "privacy" });
  });

  it("parses the exhibition tool slug and legacy alias", () => {
    expect(parsePath("/acuerdos-de-exhibicion")).toEqual({
      kind: "tool",
      toolId: "acuerdos-de-exhibicion",
    });
    expect(parsePath("/exhibition-agreements")).toEqual({
      kind: "tool",
      toolId: "acuerdos-de-exhibicion",
    });
    expect(findToolById("exhibition-agreements")?.id).toBe(
      "acuerdos-de-exhibicion",
    );
  });

  it("rejects unknown paths", () => {
    expect(parsePath("/no-existe").kind).toBe("unknown");
    expect(parsePath("/acuerdos-de-exhibicion/extra").kind).toBe("unknown");
  });

  it("builds paths for phases", () => {
    expect(pathForPhase("home")).toBe("/");
    expect(pathForPhase("privacy")).toBe("/transparencia");
    expect(pathForPhase("support")).toBe("/apoyo");
    expect(pathForPhase("wizard", "acuerdos-de-exhibicion")).toBe(
      "/acuerdos-de-exhibicion",
    );
    expect(pathForPhase("review", "acuerdos-de-exhibicion")).toBe(
      "/acuerdos-de-exhibicion",
    );
  });

  it("normalizes trailing slashes", () => {
    expect(normalizePath("/apoyo/")).toBe("/apoyo");
    expect(normalizePath("/")).toBe("/");
  });
});
