/**
 * Copyright (C) 2026 Gerard Valls Montaño
 * SPDX-License-Identifier: AGPL-3.0-or-later
 *
 * Persistent chrome: header, transparency strip, footer.
 */

import { btn, el } from "./dom";
import { PLATFORM, SUPPORT, TRANSPARENCY, findToolByTemplateId } from "./platform";
import type { AppPhase } from "./session";
import { isToolPhase } from "./session";

export function renderHeader(
  phase: AppPhase,
  templateId: string,
  go: (phase: AppPhase) => void,
): HTMLElement {
  const header = el("header", "oat-header");

  const brandWrap = el("div", "oat-brand-wrap");
  const brand = btn(PLATFORM.name, "oat-brand", () => go("home"));
  brand.title = "Volver a la plataforma";

  const role = el("span", "oat-brand-role");
  role.textContent = PLATFORM.role;
  brandWrap.append(brand, role);

  if (isToolPhase(phase)) {
    const tool = findToolByTemplateId(templateId);
    if (tool) {
      const label = el("span", "oat-header-tool");
      label.textContent = tool.name;
      brandWrap.append(label);
    }
  }

  const nav = el("nav", "oat-nav");
  nav.setAttribute("aria-label", "Principal");
  nav.append(
    navBtn("Plataforma", "home", phase, go),
    navBtn("Transparencia", "privacy", phase, go),
    navBtn(SUPPORT.navLabel, "support", phase, go),
  );

  header.append(brandWrap, nav);
  return header;
}

function navBtn(
  label: string,
  target: AppPhase,
  current: AppPhase,
  go: (phase: AppPhase) => void,
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
  text.className = "oat-transparency-full";
  text.textContent = TRANSPARENCY.strip;

  const textShort = el("p");
  textShort.className = "oat-transparency-short";
  textShort.textContent = TRANSPARENCY.stripShort;

  const more = btn("Ver transparencia", "oat-link-btn", goTransparency);
  more.title = "Código abierto, auditoría, datos y límites legales";

  strip.append(text, textShort, more);
  return strip;
}

/**
 * Always visible: tab-close clears data.
 * Draft download only inside a document tool (not on the platform home).
 */
export function renderSessionStrip(opts: {
  showDraftDownload: boolean;
  onDownloadDraft?: () => void;
}): HTMLElement {
  const strip = el("div", "oat-session-strip");
  strip.setAttribute("role", "status");

  const text = el("p");
  text.textContent = opts.showDraftDownload
    ? TRANSPARENCY.sessionClearInTool
    : TRANSPARENCY.sessionClear;

  strip.append(text);

  if (opts.showDraftDownload && opts.onDownloadDraft) {
    const download = btn(
      TRANSPARENCY.draftDownloadLabel,
      "oat-btn oat-btn-ghost oat-session-draft-btn",
      opts.onDownloadDraft,
    );
    download.title =
      "Descarga el borrador de este acuerdo tal como está ahora. Solo existe dentro de esta herramienta.";
    strip.append(download);
  }

  return strip;
}

export function renderFooter(goSupport?: () => void): HTMLElement {
  const footer = el("footer", "oat-footer");
  const line = el("p", "oat-footer-line");
  line.innerHTML = `${PLATFORM.name} · v${PLATFORM.version} · código abierto · ${PLATFORM.author} · ${PLATFORM.license} · <a href="${PLATFORM.repoUrl}" target="_blank" rel="noopener noreferrer">código / origen</a> · <a href="${PLATFORM.repoUrl}/blob/main/NOTICE" target="_blank" rel="noopener noreferrer">NOTICE</a>`;
  footer.append(line);

  if (goSupport) {
    const support = el("p", "oat-footer-support");
    const link = btn(SUPPORT.footerLabel, "oat-link-btn", goSupport);
    link.title = "Aportación voluntaria — nunca obligatoria";
    support.append(document.createTextNode("Opcional · "), link);
    footer.append(support);
  }

  return footer;
}

export function legalDisclaimer(): HTMLElement {
  const d = el("aside", "oat-legal-disclaimer");
  d.setAttribute("role", "note");
  d.textContent = TRANSPARENCY.legal;
  return d;
}

/** Visible, honest home section — after tools, never inside the wizard. */
export function renderHomeSupport(goSupport: () => void): HTMLElement {
  const box = el("section", "oat-support-home");
  const h = el("h2");
  h.textContent = SUPPORT.homeTitle;
  const lead = el("p");
  lead.textContent = SUPPORT.homeLead;
  const body = el("p");
  body.textContent = SUPPORT.homeBody;
  const actions = el("div", "oat-actions");
  actions.append(btn(SUPPORT.homeCtaLabel, "oat-btn oat-btn-ghost", goSupport));
  box.append(h, lead, body, actions);
  return box;
}
