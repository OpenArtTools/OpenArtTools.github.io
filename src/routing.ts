/**
 * Copyright (C) 2026 Gerard Valls Montaño
 * SPDX-License-Identifier: AGPL-3.0-or-later
 *
 * Path-based routes for the platform SPA (GitHub Pages).
 * Tools live at /{toolId}; platform pages at /transparencia and /apoyo.
 */

import type { AppPhase } from "./session";
import { isToolPhase } from "./session";
import { TOOLS, type OpenArtTool } from "./platform";

/** Older bookmarks for the exhibition tool. */
const TOOL_ID_ALIASES: Record<string, string> = {
  "exhibition-agreements": "acuerdos-de-exhibicion",
};

export type AppRoute =
  | { kind: "home" }
  | { kind: "privacy" }
  | { kind: "support" }
  | { kind: "tool"; toolId: string }
  | { kind: "unknown"; raw: string };

function basePrefix(): string {
  const raw = import.meta.env.BASE_URL || "/";
  return raw.replace(/\/$/, "");
}

/** Normalize a pathname for comparison (no trailing slash except root). */
export function normalizePath(pathname: string): string {
  const base = basePrefix();
  let path = pathname || "/";
  if (base && path.startsWith(base)) {
    path = path.slice(base.length) || "/";
  }
  if (path.length > 1 && path.endsWith("/")) {
    path = path.slice(0, -1);
  }
  return path.startsWith("/") ? path : `/${path}`;
}

export function findToolById(id: string): OpenArtTool | undefined {
  const canonical = TOOL_ID_ALIASES[id] ?? id;
  return TOOLS.find((t) => t.id === canonical);
}

export function parsePath(pathname: string): AppRoute {
  const path = normalizePath(pathname);
  if (path === "/") return { kind: "home" };
  if (path === "/transparencia") return { kind: "privacy" };
  if (path === "/apoyo") return { kind: "support" };

  const segment = path.slice(1);
  if (!segment.includes("/")) {
    const tool = findToolById(segment);
    if (tool) return { kind: "tool", toolId: tool.id };
  }
  return { kind: "unknown", raw: path };
}

export function pathForPhase(
  phase: AppPhase,
  toolId?: string | null,
): string {
  const base = basePrefix();
  const join = (suffix: string) =>
    suffix === "/" ? `${base}/` || "/" : `${base}${suffix}`;

  if (phase === "home") return join("/");
  if (phase === "privacy") return join("/transparencia");
  if (phase === "support") return join("/apoyo");
  if (isToolPhase(phase) && toolId) return join(`/${toolId}`);
  return join("/");
}

export function syncBrowserUrl(
  path: string,
  mode: "push" | "replace",
): void {
  const target = path || "/";
  if (normalizePath(location.pathname) === normalizePath(target)) {
    // Still rewrite aliases / trailing slashes.
    if (location.pathname !== target && mode === "replace") {
      history.replaceState(null, "", target);
    }
    return;
  }
  if (mode === "push") history.pushState(null, "", target);
  else history.replaceState(null, "", target);
}
