/**
 * Copyright 2026 Gerard Valls Montaño
 * Licensed under the Apache License, Version 2.0
 *
 * Persistent chrome: header, transparency strip, footer.
 */

import { btn, el } from "./dom";
import { PLATFORM, TRANSPARENCY, findToolByTemplateId } from "./platform";
import type { SessionState } from "./engine/types";

type NavPhase = SessionState["phase"];

export function renderHeader(
  phase: NavPhase,
  templateId: string,
  go: (phase: NavPhase) => void,
): HTMLElement {
  const header = el("header", "oat-header");

  const brandWrap = el("div", "oat-brand-wrap");
  const brand = btn(PLATFORM.name, "oat-brand", () => go("home"));
  brand.title = "Volver a la plataforma";

  const role = el("span", "oat-brand-role");
  role.textContent = PLATFORM.role;
  brandWrap.append(brand, role);

  const tool = findToolByTemplateId(templateId);
  if (phase !== "home" && phase !== "privacy" && tool) {
    const label = el("span", "oat-header-tool");
    label.textContent = tool.name;
    brandWrap.append(label);
  }

  const nav = el("nav", "oat-nav");
  nav.append(
    navBtn("Plataforma", "home", phase, go),
    navBtn("Transparencia", "privacy", phase, go),
  );

  header.append(brandWrap, nav);
  return header;
}

function navBtn(
  label: string,
  target: NavPhase,
  current: NavPhase,
  go: (phase: NavPhase) => void,
): HTMLButtonElement {
  const b = btn(label, "", () => go(target));
  if (current === target) b.setAttribute("aria-current", "page");
  return b;
}

/** Always visible — total transparency promise. */
export function renderTransparencyStrip(
  goTransparency: () => void,
): HTMLElement {
  const strip = el("div", "oat-transparency");
  strip.setAttribute("role", "note");

  const text = el("p");
  text.textContent = TRANSPARENCY.strip;

  const more = btn("Ver transparencia", "oat-link-btn", goTransparency);
  more.title = "Open source, auditoría, datos y límites legales";

  strip.append(text, more);
  return strip;
}

export function renderFooter(): HTMLElement {
  const footer = el("footer", "oat-footer");
  footer.innerHTML = `${PLATFORM.name} · plataforma open source · ${PLATFORM.author} · ${PLATFORM.license} · <a href="${PLATFORM.repoUrl}" target="_blank" rel="noopener noreferrer">código público</a>`;
  return footer;
}

export function legalDisclaimer(): HTMLElement {
  const d = el("aside", "oat-legal-disclaimer");
  d.setAttribute("role", "note");
  d.textContent = TRANSPARENCY.legal;
  return d;
}
