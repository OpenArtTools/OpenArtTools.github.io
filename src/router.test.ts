/**
 * Copyright (C) 2026 Gerard Valls Montaño
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { describe, expect, it } from "vitest";
import {
  basePath,
  hrefForPath,
  parsePath,
  pathForPhase,
} from "./router";

describe("basePath", () => {
  it("strips trailing slash from Vite base", () => {
    expect(basePath("/")).toBe("");
    expect(basePath("/acuerdos-de-exhibicion/")).toBe(
      "/acuerdos-de-exhibicion",
    );
  });
});

describe("parsePath", () => {
  it("maps platform pages at site root", () => {
    expect(parsePath("/").kind).toBe("home");
    expect(parsePath("/transparencia").kind).toBe("privacy");
    expect(parsePath("/apoyo").kind).toBe("support");
  });

  it("maps exhibition app slug at site root", () => {
    const route = parsePath("/acuerdos-de-exhibicion");
    expect(route.kind).toBe("tool");
    if (route.kind === "tool") {
      expect(route.tool.slug).toBe("acuerdos-de-exhibicion");
    }
  });

  it("marks unknown slugs", () => {
    expect(parsePath("/no-existe").kind).toBe("unknown");
  });
});

describe("pathForPhase / hrefForPath", () => {
  it("builds tool and platform paths", () => {
    expect(pathForPhase("home", "exhibition-custody-es")).toBe("/");
    expect(pathForPhase("privacy", "exhibition-custody-es")).toBe(
      "/transparencia",
    );
    expect(pathForPhase("support", "exhibition-custody-es")).toBe("/apoyo");
    expect(pathForPhase("wizard", "exhibition-custody-es")).toBe(
      "/acuerdos-de-exhibicion",
    );
    expect(pathForPhase("review", "exhibition-custody-es")).toBe(
      "/acuerdos-de-exhibicion",
    );
    expect(pathForPhase("accept", "exhibition-custody-es")).toBe(
      "/acuerdos-de-exhibicion",
    );
  });

  it("uses root hrefs for the org site", () => {
    expect(hrefForPath("/", "")).toBe("/");
    expect(hrefForPath("/acuerdos-de-exhibicion", "")).toBe(
      "/acuerdos-de-exhibicion",
    );
    expect(hrefForPath("/apoyo", "")).toBe("/apoyo");
  });
});
