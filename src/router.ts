/**
 * Copyright (C) 2026 Gerard Valls Montaño
 * SPDX-License-Identifier: AGPL-3.0-or-later
 *
 * Path router for the Open ArtCore umbrella:
 *   /                              → home
 *   /transparencia                 → transparency
 *   /apoyo                         → support
 *   /acuerdos-de-exhibicion        → app (exhibition agreements)
 */

import { TOOLS, findToolBySlug, type OpenArtTool } from "./platform";
import type { AppPhase } from "./session";
import { isToolPhase } from "./session";

export type Route =
  | { kind: "home" }
  | { kind: "privacy" }
  | { kind: "support" }
  | { kind: "tool"; tool: OpenArtTool }
  | { kind: "unknown" };

/** Vite base without trailing slash ("" for "/", or a project subpath). */
export function basePath(envBase: string = import.meta.env.BASE_URL || "/"): string {
  if (!envBase || envBase === "/") return "";
  return envBase.endsWith("/") ? envBase.slice(0, -1) : envBase;
}

export function pathForPhase(
  phase: AppPhase,
  templateId: string,
): string {
  if (phase === "home") return "/";
  if (phase === "privacy") return "/transparencia";
  if (phase === "support") return "/apoyo";
  if (isToolPhase(phase)) {
    const tool = TOOLS.find((t) => t.templateId === templateId);
    return tool ? `/${tool.slug}` : "/";
  }
  return "/";
}

export function parsePath(
  pathname: string,
  base: string = basePath(),
): Route {
  let path = pathname;
  if (base && (path === base || path.startsWith(`${base}/`))) {
    path = path.slice(base.length) || "/";
  }
  if (!path.startsWith("/")) path = `/${path}`;
  if (path.length > 1 && path.endsWith("/")) path = path.slice(0, -1);

  if (path === "/" || path === "") return { kind: "home" };
  if (path === "/transparencia") return { kind: "privacy" };
  if (path === "/apoyo") return { kind: "support" };

  const slug = path.replace(/^\//, "").split("/")[0] ?? "";
  if (!slug) return { kind: "home" };
  const tool = findToolBySlug(slug);
  if (tool) return { kind: "tool", tool };
  return { kind: "unknown" };
}

export function hrefForPath(path: string, base: string = basePath()): string {
  if (path === "/") return `${base}/` || "/";
  return `${base}${path}`;
}

function normalizePathname(path: string): string {
  if (!path || path === "/") return "/";
  return path.endsWith("/") ? path.slice(0, -1) : path;
}

export function navigate(path: string, replace = false): void {
  const url = hrefForPath(path);
  const here = normalizePathname(window.location.pathname);
  const there = normalizePathname(url);
  if (here === there) {
    if (replace) history.replaceState({}, "", url);
    return;
  }
  if (replace) history.replaceState({}, "", url);
  else history.pushState({}, "", url);
}

export function currentRoute(): Route {
  return parsePath(window.location.pathname);
}
