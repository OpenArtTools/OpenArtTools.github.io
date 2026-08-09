/**
 * Copyright (C) 2026 Gerard Valls Montaño
 * SPDX-License-Identifier: AGPL-3.0-or-later
 *
 * Platform home / support / transparency / authorship profile pages.
 */

import { btn, el, escapeHtml } from "../dom";
import {
  PLATFORM,
  SUPPORT,
  TOOLS,
  TRANSPARENCY,
} from "../platform";
import type { AppPhase } from "../session";
import type { PersonalProfile } from "../storage/profile";
import {
  profileHasData,
  profileLabel,
} from "../storage/profile";
import { renderHomeSupport } from "../shell";

export type PlatformPageDeps = {
  go: (phase: AppPhase) => void;
  openTool: (templateId: string) => void;
  getProfile: () => PersonalProfile | null;
  isProfilePanelOpen: () => boolean;
  setProfilePanelOpen: (open: boolean) => void;
  setProfileField: (key: keyof PersonalProfile, value: string) => void;
  pickProfileFile: () => void;
  downloadCurrentProfile: () => void;
};

function list(items: readonly string[]): HTMLElement {
  const ul = document.createElement("ul");
  for (const item of items) {
    const li = document.createElement("li");
    li.textContent = item;
    ul.append(li);
  }
  return ul;
}

/** Platform-level: personal data for any tool (intro always visible; form collapsible). */
export function renderPlatformProfile(deps: PlatformPageDeps): HTMLElement {
  const section = el("section", "oat-files-shelf oat-platform-profile");

  const heading = el("h2");
  heading.textContent = "Datos personales — Autoría · Opcional";

  const note = el("p", "lede");
  note.textContent =
    "Datos de quien ostenta la autoría (nombre, documento, domicilio…). Destinado a artistas y creadores; el representante de la Parte Autora se indica en el paso Autoría del acuerdo. Sirven para rellenar esa parte en las herramientas. Viven en un .json que se descarga y se carga. La plataforma no los almacena. No es una agenda de clientes.";

  const box = document.createElement("details");
  box.className = "oat-platform-profile-form";
  box.open = deps.isProfilePanelOpen();
  box.addEventListener("toggle", () => {
    deps.setProfilePanelOpen(box.open);
  });

  const summary = document.createElement("summary");
  summary.className = "oat-disclosure-summary";
  const title = el("span", "oat-disclosure-title");
  title.textContent = "Introducir o cargar datos";
  const hint = el("span", "oat-disclosure-hint");
  const profile = deps.getProfile();
  if (profileHasData(profile)) {
    hint.textContent = profileLabel(profile!);
    summary.append(title, hint);
  } else {
    summary.append(title);
  }

  const body = el("div", "oat-disclosure-body");

  const status = el("p", "oat-file-status");
  status.textContent = profileHasData(profile)
    ? `En memoria ahora: ${profileLabel(profile!)} (se borran al cerrar la pestaña).`
    : "Ningún dato en memoria. Rellena el formulario o carga un archivo.";

  const actions = el("div", "oat-actions");
  actions.append(
    btn("Cargar datos (.json)", "oat-btn oat-btn-ghost", () => {
      deps.pickProfileFile();
    }),
    btn("Descargar datos (.json)", "oat-btn oat-btn-ghost", () => {
      deps.downloadCurrentProfile();
    }),
  );

  const fields = el("div", "oat-profile-fields");
  const current = profile ?? {};
  const specs: { key: keyof PersonalProfile; label: string; placeholder: string }[] = [
    { key: "name", label: "Nombre completo", placeholder: "Nombre y apellidos" },
    { key: "doc", label: "Documento", placeholder: "DNI, NIE u otro documento" },
    { key: "role", label: "Rol o profesión", placeholder: "p. ej. práctica artística" },
    { key: "address", label: "Domicilio", placeholder: "Domicilio" },
    { key: "email", label: "Email", placeholder: "Email" },
    { key: "phone", label: "Teléfono", placeholder: "Teléfono" },
  ];
  for (const spec of specs) {
    const field = el("div", "oat-field");
    const label = el("label") as HTMLLabelElement;
    label.htmlFor = `profile-${spec.key}`;
    label.textContent = spec.label;
    const input = document.createElement("input");
    input.id = `profile-${spec.key}`;
    input.type = spec.key === "email" ? "email" : "text";
    input.placeholder = spec.placeholder;
    input.value = current[spec.key] ?? "";
    input.addEventListener("input", () => {
      deps.setProfileField(spec.key, input.value);
      const next = deps.getProfile();
      if (profileHasData(next)) {
        hint.textContent = profileLabel(next!);
        if (!hint.isConnected) summary.append(hint);
      } else {
        hint.remove();
      }
      status.textContent = profileHasData(next)
        ? `En memoria ahora: ${profileLabel(next!)} (se borran al cerrar la pestaña).`
        : "Ningún dato en memoria. Rellena el formulario o carga un archivo.";
    });
    field.append(label, input);
    fields.append(field);
  }

  body.append(status, actions, fields);
  box.append(summary, body);
  section.append(heading, note, box);
  return section;
}

export function renderHome(deps: PlatformPageDeps): HTMLElement {
  const wrap = el("div", "oat-hero");

  const eyebrow = el("p", "oat-eyebrow");
  eyebrow.textContent = "Plataforma";
  const h1 = el("h1");
  h1.textContent = PLATFORM.name;
  const lede = el("p", "lede");
  lede.textContent = PLATFORM.tagline;
  const about = el("p", "lede");
  about.textContent = PLATFORM.about;
  wrap.append(eyebrow, h1, lede, about);

  const shelf = el("section", "oat-tools-shelf");
  const h = el("h2");
  h.textContent = "Herramientas";
  const sub = el("p", "lede");
  sub.textContent = "Elige una herramienta alojada en la plataforma.";
  shelf.append(h, sub);

  for (const tool of TOOLS) {
    const card = el("button", "oat-card") as HTMLButtonElement;
    card.type = "button";
    const status = tool.status === "available" ? "Disponible" : "Próximamente";
    card.innerHTML = `<p class="oat-card-kicker">Herramienta · ${escapeHtml(status)}</p><h3>${escapeHtml(tool.name)}</h3><p>${escapeHtml(tool.blurb)}</p>`;
    if (tool.status !== "available" || !tool.templateId) {
      card.disabled = true;
    } else {
      const templateId = tool.templateId;
      card.addEventListener("click", () => deps.openTool(templateId));
    }
    shelf.append(card);
  }

  wrap.append(shelf);
  wrap.append(renderPlatformProfile(deps));
  wrap.append(renderHomeSupport(() => deps.go("support")));

  const meta = el("p", "oat-home-meta");
  meta.textContent = `${TRANSPARENCY.strip}. ${TRANSPARENCY.legal}`;
  wrap.append(meta);
  return wrap;
}

export function renderSupport(deps: PlatformPageDeps): HTMLElement {
  const wrap = el("div", "oat-prose oat-support");
  const h2 = el("h2");
  h2.textContent = SUPPORT.title;
  wrap.append(h2);

  const intro = el("p");
  intro.textContent = SUPPORT.intro;
  const voluntary = el("p");
  voluntary.textContent = SUPPORT.voluntary;
  wrap.append(intro, voluntary);

  const forTitle = el("h3");
  forTitle.textContent = SUPPORT.whatForTitle;
  wrap.append(forTitle);
  wrap.append(list(SUPPORT.whatFor));

  const notTitle = el("h3");
  notTitle.textContent = SUPPORT.whatNotTitle;
  wrap.append(notTitle);
  wrap.append(list(SUPPORT.whatNot));

  const privTitle = el("h3");
  privTitle.textContent = SUPPORT.privacyTitle;
  const priv = el("p");
  priv.textContent = SUPPORT.privacy;
  wrap.append(privTitle, priv);

  const actions = el("div", "oat-support-actions");
  const donateUrl = SUPPORT.donateUrl.trim();
  if (donateUrl) {
    const a = document.createElement("a");
    a.className = "oat-btn";
    a.href = donateUrl;
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    a.textContent = SUPPORT.donateLabel;
    actions.append(a);

    const note = el("p", "oat-review-note");
    note.textContent =
      "Se abre fuera de Open Art Tools. La cantidad se elige en el proveedor. Se puede cancelar en cualquier momento antes de confirmar allí.";
    actions.append(note);
  } else {
    const pending = el("p", "oat-support-pending");
    pending.textContent =
      "Todavía no hay un enlace de pago público configurado. Si se desea aportar, se puede contactar con quien desarrolla el proyecto para indicar cómo hacerlo con total claridad.";
    actions.append(pending);

    const contact = document.createElement("a");
    contact.className = "oat-btn oat-btn-ghost";
    contact.href = SUPPORT.contactUrl;
    contact.target = "_blank";
    contact.rel = "noopener noreferrer";
    contact.textContent = SUPPORT.contactLabel;
    actions.append(contact);
  }
  wrap.append(actions);

  const thanks = el("p", "oat-support-thanks");
  thanks.textContent = SUPPORT.thanks;
  wrap.append(thanks);

  const back = el("p");
  back.append(
    btn("Volver a Transparencia", "oat-link-btn", () => deps.go("privacy")),
    document.createTextNode(" · "),
    btn("Volver a la plataforma", "oat-link-btn", () => deps.go("home")),
  );
  wrap.append(back);
  return wrap;
}

export function renderTransparency(deps: PlatformPageDeps): HTMLElement {
  const wrap = el("div", "oat-prose");
  const h2 = el("h2");
  h2.textContent = "Transparencia";
  wrap.append(h2);

  const intro = el("p");
  intro.textContent =
    "Open Art Tools promete transparencia total: código abierto, sin vigilancia y sin almacenar datos personales. Aquí va el resumen; el detalle está en el repositorio.";
  wrap.append(intro);

  for (const point of TRANSPARENCY.points) {
    const block = el("section", "oat-transparency-point");
    const title = el("h3");
    title.textContent = point.title;
    const body = el("p");
    body.textContent = point.body;
    block.append(title, body);
    wrap.append(block);
  }

  const supportNote = el("p");
  supportNote.append(
    document.createTextNode("Si se desea saber cómo funciona el apoyo voluntario: "),
    btn("ver Apoyo", "oat-link-btn", () => deps.go("support")),
    document.createTextNode("."),
  );
  wrap.append(supportNote);

  const links = el("p");
  links.innerHTML = `Documentación completa: <a href="${PLATFORM.repoUrl}/blob/main/README.md" target="_blank" rel="noopener noreferrer">README.md</a> · <a href="${PLATFORM.repoUrl}/blob/main/PRIVACY.md" target="_blank" rel="noopener noreferrer">PRIVACY.md</a> · <a href="${PLATFORM.repoUrl}/blob/main/AUDITABILITY.md" target="_blank" rel="noopener noreferrer">AUDITABILITY.md</a> · <a href="${PLATFORM.repoUrl}/blob/main/SUPPORT.md" target="_blank" rel="noopener noreferrer">SUPPORT.md</a> · <a href="${PLATFORM.repoUrl}/blob/main/NOTICE" target="_blank" rel="noopener noreferrer">NOTICE</a> · <a href="${PLATFORM.repoUrl}/blob/main/LICENSE" target="_blank" rel="noopener noreferrer">LICENSE</a> · <a href="${PLATFORM.repoUrl}" target="_blank" rel="noopener noreferrer">código / origen</a>`;
  wrap.append(links);

  const back = el("p");
  back.append(btn("Volver a la plataforma", "oat-link-btn", () => deps.go("home")));
  wrap.append(back);
  return wrap;
}
