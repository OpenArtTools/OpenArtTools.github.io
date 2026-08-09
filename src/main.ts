/**
 * Copyright (C) 2026 Gerard Valls Montaño
 * SPDX-License-Identifier: AGPL-3.0-or-later
 *
 * Open Art Tools — web entry.
 * Flow: platform home → tool wizard → review → accept → export.
 * Nothing is stored by the platform. Optional profile .json / draft .html files stay on the user's device.
 */

import "./styles/main.css";
import {
  ensurePlaceAtEnd,
  fieldVisible,
  fieldsForStep,
  missingRequired,
  refreshFromValues,
} from "./engine/assemble";
import type { AppValues, Clause } from "./engine/types";
import {
  clausesToHtml,
  copyText,
  downloadHtml,
  downloadText,
  exportPdfViaPrint,
} from "./export/pdf";
import { btn, el, escapeHtml } from "./dom";
import {
  legalDisclaimer,
  renderFooter,
  renderHeader,
  renderHomeSupport,
  renderSessionStrip,
  renderTransparencyStrip,
} from "./shell";
import {
  enrichDerivedValues,
  exhibitionCustodyEs,
  getTemplate,
} from "./templates/exhibition-custody-es";
import {
  PLATFORM,
  SUPPORT,
  TOOLS,
  TRANSPARENCY,
  findToolByTemplateId,
} from "./platform";
import {
  buildDraftFile,
  downloadDraftFile,
  pickAndReadDraftFile,
} from "./storage/draft";
import type { PersonalProfile } from "./storage/profile";
import {
  buildProfileFile,
  downloadProfileFile,
  pickAndReadProfileFile,
  profileHasData,
  profileLabel,
  profileToAuthorValues,
} from "./storage/profile";
import {
  type AppPhase,
  type SessionState,
  type ToolPhase,
  createEmptySession,
  hasDocumentWork,
  isToolPhase,
} from "./session";

/** Sensible defaults for the exhibition tool — all can be changed in the wizard. */
const DEFAULT_TOGGLES: AppValues = {
  "features.interactive": true,
  "features.publicInteraction": true,
  "features.hasSculptures": false,
  "features.hasSystem": true,
  "features.electrical": true,
  "features.moving": false,
  "features.specialRisk": false,
  "features.hasExtra": false,
  "features.needsPower": true,
  "features.accessibleWhenOff": true,
  "features.needsWatch": true,
  "features.outdoor": false,
  "custody.authorMounts": true,
  "custody.dailyRemove": false,
  "custody.weatherProtect": true,
  "insurance.hasRc": true,
  "insurance.hasNailToNail": true,
  "options.loanFrame": false,
  "options.imageUse": false,
  "options.imageCommercial": false,
  "options.imageAdapt": false,
  "options.saleTerms": false,
  "options.saleNoExclusivity": true,
  "options.transport": false,
  "options.costs": false,
  "options.costsNoFee": false,
  "options.cancellation": false,
  "options.contacts": false,
  "options.inventory": false,
  "options.spaceAccess": false,
  "options.subcontract": false,
  "options.ipRights": false,
  "options.amendments": true,
  "options.notices": true,
  "options.deliveryAct": true,
  "options.policyCerts": true,
  "options.franchise": true,
  "options.jurisdiction": false,
  "options.independentExpert": true,
  "options.forceMajeure": false,
};

let state: SessionState = createEmptySession(
  exhibitionCustodyEs.id,
  DEFAULT_TOGGLES,
);

function template() {
  return getTemplate(state.templateId) ?? exhibitionCustodyEs;
}

function go(phase: AppPhase): void {
  if (isToolPhase(state.phase) && !isToolPhase(phase)) {
    state.lastToolPhase = state.phase;
  }
  state.phase = phase;
  render();
}

function rebuildClauses(): void {
  const t = template();
  state.clauses = refreshFromValues(
    t,
    enrichDerivedValues(state.values),
    state.clauses,
    state.manualOverride,
  );
}

/** Master toggles that decide if an options group is “included”. */
const OPTION_GROUP_MASTERS: Record<string, string[]> = {
  "Préstamo / cesión temporal": ["options.loanFrame"],
  "Uso de imagen / reproducción": ["options.imageUse"],
  "Condiciones de venta": ["options.saleTerms"],
  Transporte: ["options.transport"],
  "Costes y pagos": ["options.costs"],
  "Cancelación / retirada": ["options.cancellation"],
  "Contactos operativos": ["options.contacts"],
  "Inventario de componentes": ["options.inventory"],
  "Espacio y accesos": ["options.spaceAccess"],
  Subcontratación: ["options.subcontract"],
  "Propiedad intelectual": ["options.ipRights"],
  "Modificaciones y notificaciones": ["options.amendments", "options.notices"],
  "Otras cláusulas": [
    "options.deliveryAct",
    "options.policyCerts",
    "options.franchise",
    "options.jurisdiction",
    "options.independentExpert",
    "options.forceMajeure",
  ],
};

const OPTIONAL_SCOPE_LABELS: { path: string; label: string }[] = [
  { path: "options.loanFrame", label: "Préstamo / cesión" },
  { path: "options.imageUse", label: "Uso de imagen" },
  { path: "options.saleTerms", label: "Condiciones de venta" },
  { path: "options.transport", label: "Transporte" },
  { path: "options.costs", label: "Costes y pagos" },
  { path: "options.cancellation", label: "Cancelación / retirada" },
  { path: "options.contacts", label: "Contactos operativos" },
  { path: "options.inventory", label: "Inventario" },
  { path: "options.spaceAccess", label: "Espacio y accesos" },
  { path: "options.subcontract", label: "Subcontratación" },
  { path: "options.ipRights", label: "Propiedad intelectual" },
  { path: "options.amendments", label: "Modificaciones" },
  { path: "options.notices", label: "Notificaciones" },
  { path: "options.deliveryAct", label: "Acta de entrega" },
  { path: "options.policyCerts", label: "Certificados de póliza" },
  { path: "options.franchise", label: "Franquicia" },
  { path: "options.jurisdiction", label: "Ley y jurisdicción" },
  { path: "options.independentExpert", label: "Perito independiente" },
  { path: "options.forceMajeure", label: "Fuerza mayor" },
];

const ALL_OPTION_MASTERS = [
  "options.loanFrame",
  "options.imageUse",
  "options.saleTerms",
  "options.transport",
  "options.costs",
  "options.cancellation",
  "options.contacts",
  "options.inventory",
  "options.spaceAccess",
  "options.subcontract",
  "options.ipRights",
  "options.amendments",
  "options.notices",
  "options.deliveryAct",
  "options.policyCerts",
  "options.franchise",
  "options.jurisdiction",
  "options.independentExpert",
  "options.forceMajeure",
] as const;

function isOn(path: string): boolean {
  const v = state.values[path];
  return v === true || v === "true";
}

function emptyPath(path: string): boolean {
  return !String(state.values[path] ?? "").trim();
}

function autofillContactsFromParties(): void {
  const map: [string, string][] = [
    ["options.contactTitularName", "parties.author.name"],
    ["options.contactTitularPhone", "parties.author.phone"],
    ["options.contactTitularEmail", "parties.author.email"],
    ["options.contactOrgName", "parties.org.repName"],
    ["options.contactOrgPhone", "parties.org.phone"],
    ["options.contactOrgEmail", "parties.org.email"],
  ];
  for (const [to, from] of map) {
    if (emptyPath(to) && !emptyPath(from)) {
      state.values[to] = state.values[from];
    }
  }
}

function autofillNoticesFromParties(): void {
  if (emptyPath("options.noticeEmailTitular") && !emptyPath("parties.author.email")) {
    state.values["options.noticeEmailTitular"] = state.values["parties.author.email"];
  }
  if (emptyPath("options.noticeEmailOrg") && !emptyPath("parties.org.email")) {
    state.values["options.noticeEmailOrg"] = state.values["parties.org.email"];
  }
}

function setValue(path: string, value: string | boolean | number): void {
  state.values = { ...state.values, [path]: value };
  if (path === "options.contacts" && value === true) {
    autofillContactsFromParties();
  }
  if (path === "options.notices" && value === true) {
    autofillNoticesFromParties();
  }
  if (!state.manualOverride) rebuildClauses();
}

function applyOptionsPreset(kind: "essential" | "full" | "all"): void {
  const next: AppValues = { ...state.values };
  for (const path of ALL_OPTION_MASTERS) next[path] = false;

  const essential = [
    "options.deliveryAct",
    "options.policyCerts",
    "options.franchise",
    "options.independentExpert",
    "options.amendments",
    "options.notices",
  ] as const;
  for (const path of essential) next[path] = true;

  if (kind === "full" || kind === "all") {
    for (const path of [
      "options.loanFrame",
      "options.imageUse",
      "options.transport",
      "options.contacts",
      "options.spaceAccess",
      "options.ipRights",
    ] as const) {
      next[path] = true;
    }
  }

  if (kind === "all") {
    for (const path of ALL_OPTION_MASTERS) next[path] = true;
  }

  state.values = next;
  if (isOn("options.contacts")) autofillContactsFromParties();
  if (isOn("options.notices")) autofillNoticesFromParties();
  if (!state.manualOverride) rebuildClauses();
  render();
}

function activeOptionalScopeLabels(): string[] {
  return OPTIONAL_SCOPE_LABELS.filter((item) => isOn(item.path)).map(
    (item) => item.label,
  );
}

function applyAuthorFromProfile(profile: PersonalProfile): void {
  state.values = { ...state.values, ...profileToAuthorValues(profile) };
  if (!state.manualOverride) rebuildClauses();
}

function downloadCurrentDraft(): void {
  downloadDraftFile(
    buildDraftFile({
      templateId: state.templateId,
      values: state.values,
      clauses: state.clauses,
      manualOverride: state.manualOverride,
      stepIndex: state.stepIndex,
    }),
  );
}

function downloadCurrentProfile(): void {
  const profile = state.personalProfile;
  if (!profile || !profileHasData(profile)) {
    alert(
      "No hay datos de autoría o posesión de la obra que guardar. Rellénalos abajo o carga un archivo primero.",
    );
    return;
  }
  downloadProfileFile(buildProfileFile(profile));
}

function setProfileField(key: keyof PersonalProfile, value: string): void {
  state.personalProfile = {
    ...(state.personalProfile ?? {}),
    [key]: value.trim() || undefined,
  };
}

function showDraftDownload(): boolean {
  return hasDocumentWork(state, DEFAULT_TOGGLES) || isToolPhase(state.phase);
}

async function pickDraftFile(): Promise<void> {
  try {
    const draft = await pickAndReadDraftFile();
    if (!draft) return;
    const known = getTemplate(draft.templateId);
    if (!known) {
      alert(
        "Este borrador pertenece a una herramienta no disponible en esta versión de la plataforma.",
      );
      return;
    }
    const keptProfile = state.personalProfile;
    state = createEmptySession(draft.templateId, DEFAULT_TOGGLES, keptProfile);
    state.values = { ...DEFAULT_TOGGLES, ...draft.values };
    state.clauses = draft.clauses;
    state.manualOverride = draft.manualOverride;
    const maxStep = Math.max(0, known.steps.length - 1);
    state.stepIndex = Math.min(Math.max(0, draft.stepIndex), maxStep);
    state.phase = "wizard";
    state.acceptedFinal = false;
    if (!state.manualOverride) rebuildClauses();
    else state.clauses = ensurePlaceAtEnd(state.clauses, known);
    render();
  } catch (err) {
    alert(err instanceof Error ? err.message : "No se pudo cargar el borrador.");
  }
}

async function pickProfileFile(): Promise<void> {
  try {
    const loaded = await pickAndReadProfileFile();
    if (!loaded) return;
    state.personalProfile = loaded.profile;
    profilePanelOpen = true;
    render();
  } catch (err) {
    alert(err instanceof Error ? err.message : "No se pudo cargar el perfil.");
  }
}

function startFreshTool(templateId: string, profile: PersonalProfile | null): void {
  state = createEmptySession(templateId, DEFAULT_TOGGLES, profile);
  state.phase = "wizard";
  state.stepIndex = 0;
  if (profileHasData(profile)) applyAuthorFromProfile(profile!);
  else rebuildClauses();
  render();
}

function openTool(templateId: string): void {
  if (
    templateId === state.templateId &&
    hasDocumentWork(state, DEFAULT_TOGGLES)
  ) {
    const resume = confirm("¿Retomar el documento en curso?");
    if (resume) {
      const phase: ToolPhase = state.lastToolPhase ?? "wizard";
      state.phase = phase;
      render();
      return;
    }
    startFreshTool(templateId, state.personalProfile);
    return;
  }
  startFreshTool(templateId, state.personalProfile);
}

let profilePanelOpen = false;

/** Platform-level: personal data for any tool (collapsible). */
function renderPlatformProfile(): HTMLElement {
  const box = document.createElement("details");
  box.className = "oat-files-shelf oat-platform-profile";
  box.open = profilePanelOpen;
  box.addEventListener("toggle", () => {
    profilePanelOpen = box.open;
  });

  const summary = document.createElement("summary");
  summary.className = "oat-disclosure-summary";
  const title = el("span", "oat-disclosure-title");
  title.textContent = "Datos personales — autoría o posesión de la obra";
  const hint = el("span", "oat-disclosure-hint");
  hint.textContent = profileHasData(state.personalProfile)
    ? profileLabel(state.personalProfile!)
    : "Cerrado · opcional";
  summary.append(title, hint);

  const body = el("div", "oat-disclosure-body");
  const note = el("p", "lede");
  note.textContent =
    "Son los datos de quien tiene la autoría o la posesión de la obra (nombre, documento, domicilio…). Sirven para rellenar esa parte en las herramientas. Viven en un .json que tú descargas y cargas. La plataforma no los almacena. No es una agenda de clientes.";

  const status = el("p", "oat-file-status");
  status.textContent = profileHasData(state.personalProfile)
    ? `En memoria ahora: ${profileLabel(state.personalProfile!)} (se borran al cerrar la pestaña).`
    : "Ningún dato en memoria. Rellena el formulario o carga un archivo.";

  const actions = el("div", "oat-actions");
  actions.append(
    btn("Cargar datos (.json)", "oat-btn oat-btn-ghost", () => {
      void pickProfileFile();
    }),
    btn("Descargar datos (.json)", "oat-btn oat-btn-ghost", downloadCurrentProfile),
  );

  const fields = el("div", "oat-profile-fields");
  const profile = state.personalProfile ?? {};
  const specs: { key: keyof PersonalProfile; label: string; placeholder: string }[] = [
    { key: "name", label: "Nombre completo", placeholder: "Tu nombre y apellidos" },
    { key: "doc", label: "Documento", placeholder: "DNI, NIE u otro documento" },
    { key: "role", label: "Rol o profesión", placeholder: "Por ejemplo: práctica artística" },
    { key: "address", label: "Domicilio", placeholder: "Tu domicilio" },
    { key: "email", label: "Email", placeholder: "Tu email" },
    { key: "phone", label: "Teléfono", placeholder: "Tu teléfono" },
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
    input.value = profile[spec.key] ?? "";
    input.addEventListener("input", () => {
      setProfileField(spec.key, input.value);
      hint.textContent = profileHasData(state.personalProfile)
        ? profileLabel(state.personalProfile!)
        : "Cerrado · opcional";
      status.textContent = profileHasData(state.personalProfile)
        ? `En memoria ahora: ${profileLabel(state.personalProfile!)} (se borran al cerrar la pestaña).`
        : "Ningún dato en memoria. Rellena el formulario o carga un archivo.";
    });
    field.append(label, input);
    fields.append(field);
  }

  body.append(note, status, actions, fields);
  box.append(summary, body);
  return box;
}

/** Tool-level: draft for the current exhibition agreement. */
function renderToolDraftBar(): HTMLElement {
  const box = el("aside", "oat-file-bar oat-draft-bar");
  box.setAttribute("role", "note");
  const title = el("h3");
  title.textContent = "Borrador de este acuerdo";
  const note = el("p", "oat-review-note");
  note.textContent =
    "Solo de esta herramienta. Se descarga como HTML legible (se abre en cualquier navegador) y se puede volver a cargar aquí para retomar el trabajo.";
  const actions = el("div", "oat-actions");
  actions.style.marginTop = "0";
  actions.append(
    btn("Descargar borrador", "oat-btn oat-btn-ghost", downloadCurrentDraft),
    btn("Cargar borrador", "oat-btn oat-btn-ghost", () => {
      void pickDraftFile();
    }),
  );
  box.append(title, note, actions);
  return box;
}

/** Light reminder inside a tool — management stays on the platform home. */
function renderApplyPlatformProfile(): HTMLElement {
  const box = el("aside", "oat-apply-profile");
  const note = el("p", "oat-review-note");
  if (profileHasData(state.personalProfile)) {
    note.textContent = `Datos en memoria (autoría o posesión de la obra): ${profileLabel(state.personalProfile!)}. Se usan para rellenar la titularidad de la obra, no la de clientes.`;
    const actions = el("div", "oat-actions");
    actions.style.marginTop = "0";
    actions.append(
      btn(
        "Rellenar titularidad de la obra con esos datos",
        "oat-btn oat-btn-ghost",
        () => {
          applyAuthorFromProfile(state.personalProfile!);
          render();
        },
      ),
    );
    box.append(note, actions);
  } else {
    note.textContent =
      "En la página de la plataforma puedes cargar los datos de quien tiene la autoría o la posesión de la obra. Aquí solo rellenan la titularidad de la obra de este documento.";
    box.append(note);
  }
  return box;
}

function render(): void {
  const app = document.getElementById("app");
  if (!app) return;

  const tool = isToolPhase(state.phase)
    ? findToolByTemplateId(state.templateId)
    : undefined;
  document.title = tool
    ? `${tool.name} · ${PLATFORM.name}`
    : `${PLATFORM.name} — herramientas open source para artistas`;

  const chrome = el("div", "oat-chrome");
  chrome.append(
    renderHeader(state.phase, state.templateId, go),
    renderTransparencyStrip(() => go("privacy")),
    renderSessionStrip({
      showDraftDownload: showDraftDownload(),
      onDownloadDraft: downloadCurrentDraft,
    }),
  );
  app.replaceChildren(chrome, renderMain(), renderFooter(() => go("support")));
}

function renderMain(): HTMLElement {
  const main = el("main");
  main.id = "main";
  switch (state.phase) {
    case "home":
      main.append(renderHome());
      break;
    case "privacy":
      main.append(renderTransparency());
      break;
    case "support":
      main.append(renderSupport());
      break;
    case "wizard":
      main.append(renderWizard());
      break;
    case "review":
      main.append(renderReview());
      break;
    case "accept":
      main.append(renderAccept());
      break;
  }
  return main;
}

function renderHome(): HTMLElement {
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
      card.addEventListener("click", () => openTool(templateId));
    }
    shelf.append(card);
  }

  wrap.append(shelf);
  wrap.append(renderPlatformProfile());
  wrap.append(renderHomeSupport(() => go("support")));

  const meta = el("p", "oat-home-meta");
  meta.textContent = `${TRANSPARENCY.strip}. ${TRANSPARENCY.legal}`;
  wrap.append(meta);
  return wrap;
}

function renderSupport(): HTMLElement {
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
      "Se abre fuera de Open Art Tools. La cantidad la eliges tú. Puedes cancelar en cualquier momento antes de confirmar en el proveedor.";
    actions.append(note);
  } else {
    const pending = el("p", "oat-support-pending");
    pending.textContent =
      "Todavía no hay un enlace de pago público configurado. Si quieres aportar, puedes contactar con quien desarrolla el proyecto y te indicará cómo hacerlo con total claridad.";
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
    btn("Volver a Transparencia", "oat-link-btn", () => go("privacy")),
    document.createTextNode(" · "),
    btn("Volver a la plataforma", "oat-link-btn", () => go("home")),
  );
  wrap.append(back);
  return wrap;
}

function list(items: readonly string[]): HTMLElement {
  const ul = document.createElement("ul");
  for (const item of items) {
    const li = document.createElement("li");
    li.textContent = item;
    ul.append(li);
  }
  return ul;
}

function renderTransparency(): HTMLElement {
  const wrap = el("div", "oat-prose");
  const h2 = el("h2");
  h2.textContent = "Transparencia";
  wrap.append(h2);

  const intro = el("p");
  intro.textContent =
    "Open Art Tools promete transparencia total: código abierto, sin vigilancia y sin almacenar tus datos. Aquí va el resumen; el detalle está en el repositorio.";
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
    document.createTextNode("Si quieres saber cómo funciona el apoyo voluntario: "),
    btn("ver Apoyo", "oat-link-btn", () => go("support")),
    document.createTextNode("."),
  );
  wrap.append(supportNote);

  const links = el("p");
  links.innerHTML = `Documentación completa: <a href="${PLATFORM.repoUrl}/blob/main/README.md" target="_blank" rel="noopener noreferrer">README.md</a> · <a href="${PLATFORM.repoUrl}/blob/main/PRIVACY.md" target="_blank" rel="noopener noreferrer">PRIVACY.md</a> · <a href="${PLATFORM.repoUrl}/blob/main/AUDITABILITY.md" target="_blank" rel="noopener noreferrer">AUDITABILITY.md</a> · <a href="${PLATFORM.repoUrl}/blob/main/SUPPORT.md" target="_blank" rel="noopener noreferrer">SUPPORT.md</a> · <a href="${PLATFORM.repoUrl}/blob/main/NOTICE" target="_blank" rel="noopener noreferrer">NOTICE</a> · <a href="${PLATFORM.repoUrl}/blob/main/LICENSE" target="_blank" rel="noopener noreferrer">LICENSE</a> · <a href="${PLATFORM.repoUrl}" target="_blank" rel="noopener noreferrer">código / origen</a>`;
  wrap.append(links);

  const back = el("p");
  back.append(btn("Volver a la plataforma", "oat-link-btn", () => go("home")));
  wrap.append(back);
  return wrap;
}

function renderWizard(): HTMLElement {
  const t = template();
  const maxStep = Math.max(0, t.steps.length - 1);
  if (state.stepIndex > maxStep) state.stepIndex = maxStep;
  if (state.stepIndex < 0) state.stepIndex = 0;
  const step = t.steps[state.stepIndex];
  const wrap = el("div", "oat-step");

  const progress = el("ol", "oat-progress");
  progress.setAttribute(
    "aria-label",
    `Paso ${state.stepIndex + 1} de ${t.steps.length}`,
  );
  t.steps.forEach((s, i) => {
    const li = el("li");
    li.textContent = `${i + 1}. ${s.title}`;
    li.dataset.active = String(i === state.stepIndex);
    li.dataset.done = String(i < state.stepIndex);
    if (i < state.stepIndex) {
      li.tabIndex = 0;
      li.setAttribute("role", "button");
      li.title = `Ir a ${s.title}`;
      const goStep = () => {
        state.stepIndex = i;
        render();
      };
      li.addEventListener("click", goStep);
      li.addEventListener("keydown", (ev) => {
        if (ev.key === "Enter" || ev.key === " ") {
          ev.preventDefault();
          goStep();
        }
      });
    }
    progress.append(li);
  });
  wrap.append(progress);

  const h2 = el("h2");
  h2.textContent = step.title;
  const blurb = el("p", "blurb");
  blurb.textContent = step.blurb;
  wrap.append(h2, blurb);

  if (step.id === "titularidad") {
    wrap.append(renderApplyPlatformProfile());
  }

  if (step.id === "options") {
    wrap.append(renderOptionsStep(t));
  } else {
    let lastGroup = "";
    for (const field of fieldsForStep(t, step.id).filter((f) =>
      fieldVisible(f, state.values),
    )) {
      if (field.group && field.group !== lastGroup) {
        lastGroup = field.group;
        const g = el("div", "oat-group-label");
        g.textContent = field.group;
        wrap.append(g);
      }
      wrap.append(renderField(field));
    }
  }

  const nav = el("div", "oat-step-nav");
  if (state.stepIndex > 0) {
    nav.append(
      btn("Atrás", "oat-btn oat-btn-ghost", () => {
        state.stepIndex -= 1;
        render();
      }),
    );
  }
  const isLast = state.stepIndex >= t.steps.length - 1;
  nav.append(
    btn(isLast ? "Revisar documento" : "Siguiente", "oat-btn", () => {
      if (!isLast) {
        state.stepIndex += 1;
        render();
        return;
      }
      rebuildClauses();
      state.acceptedFinal = false;
      state.phase = "review";
      render();
    }),
  );
  wrap.append(nav);
  wrap.append(renderToolDraftBar());
  if (isLast) {
    wrap.append(legalDisclaimer());
  }
  return wrap;
}

function renderField(field: {
  id: string;
  label: string;
  placeholder: string;
  type: string;
  path: string;
}): HTMLElement {
  const val = state.values[field.path];

  if (field.type === "toggle") {
    const row = el("label", "oat-toggle");
    const input = document.createElement("input");
    input.type = "checkbox";
    input.checked = val === true || val === "true";
    input.addEventListener("change", () => {
      setValue(field.path, input.checked);
      render();
    });
    const text = el("div");
    const title = el("div");
    title.textContent = field.label;
    const meta = el("div", "meta");
    meta.textContent = field.placeholder;
    text.append(title, meta);
    row.append(input, text);
    return row;
  }

  const box = el("div", "oat-field");
  const label = el("label") as HTMLLabelElement;
  label.htmlFor = field.id;
  label.textContent = field.label;
  box.append(label);

  if (field.type === "textarea") {
    const ta = document.createElement("textarea");
    ta.id = field.id;
    ta.placeholder = field.placeholder;
    ta.value = val != null ? String(val) : "";
    ta.addEventListener("input", () => setValue(field.path, ta.value));
    box.append(ta);
    return box;
  }

  const input = document.createElement("input");
  input.id = field.id;
  input.type =
    field.type === "money" || field.type === "number"
      ? "number"
      : field.type === "date"
        ? "date"
        : field.path.endsWith(".email")
          ? "email"
          : "text";
  input.placeholder = field.placeholder;
  input.value = val != null ? String(val) : "";
  if (field.type === "money" || field.type === "number") {
    input.step = field.type === "money" ? "0.01" : "1";
    input.min = "0";
  }
  input.addEventListener("input", () => {
    if (field.type === "number" || field.type === "money") {
      if (input.value === "") {
        setValue(field.path, "");
        return;
      }
      const n = Number(input.value);
      if (Number.isNaN(n)) return;
      setValue(field.path, n);
    } else {
      setValue(field.path, input.value);
    }
  });
  box.append(input);
  return box;
}

function renderOptionsStep(t: ReturnType<typeof template>): HTMLElement {
  if (isOn("options.contacts")) autofillContactsFromParties();
  if (isOn("options.notices")) autofillNoticesFromParties();

  const wrap = el("div", "oat-options-step");

  const tip = el("p", "oat-options-tip");
  tip.textContent =
    "Solo activa lo que necesitéis. Lo desactivado no aparece en el documento. Puedes usar un preset y luego ajustar.";
  wrap.append(tip);

  const presets = el("div", "oat-presets");
  presets.setAttribute("role", "group");
  presets.setAttribute("aria-label", "Presets de cláusulas opcionales");
  presets.append(
    btn("Esencial", "oat-btn oat-btn-ghost oat-preset-btn", () =>
      applyOptionsPreset("essential"),
    ),
    btn("Exhibición completa", "oat-btn oat-btn-ghost oat-preset-btn", () =>
      applyOptionsPreset("full"),
    ),
    btn("Todo", "oat-btn oat-btn-ghost oat-preset-btn", () =>
      applyOptionsPreset("all"),
    ),
  );
  const presetHelp = el("p", "oat-preset-help");
  presetHelp.textContent =
    "Esencial: acta, seguros, franquicia, perito, modificaciones y notificaciones. Exhibición completa: esencial + préstamo, imagen, transporte, contactos, espacio y PI. Todo: todos los bloques.";
  wrap.append(presets, presetHelp);

  const fields = fieldsForStep(t, "options");
  const groups: { name: string; fields: typeof fields }[] = [];
  let current: { name: string; fields: typeof fields } | null = null;
  for (const field of fields) {
    const name = field.group || "Otros";
    if (!current || current.name !== name) {
      current = { name, fields: [] };
      groups.push(current);
    }
    current.fields.push(field);
  }

  for (const group of groups) {
    const masters = OPTION_GROUP_MASTERS[group.name] ?? [];
    const included =
      masters.length === 0 ? true : masters.some((path) => isOn(path));
    const visibleFields = group.fields.filter((f) =>
      fieldVisible(f, state.values),
    );
    if (!visibleFields.length) continue;

    const details = document.createElement("details");
    details.className = "oat-option-block";
    details.open = included;

    const summary = document.createElement("summary");
    summary.className = "oat-option-summary";
    const title = el("span", "oat-option-summary-title");
    title.textContent = group.name;
    const status = el("span", "oat-option-summary-status");
    status.textContent = included ? "Incluido" : "No incluido";
    status.dataset.on = String(included);
    summary.append(title, status);
    details.append(summary);

    const body = el("div", "oat-option-body");
    for (const field of visibleFields) {
      body.append(renderField(field));
    }
    details.append(body);
    wrap.append(details);
  }

  return wrap;
}

function renderReview(): HTMLElement {
  const t = template();
  state.clauses = ensurePlaceAtEnd(state.clauses, t);
  const wrap = el("div", "oat-step");

  const h2 = el("h2");
  h2.textContent = "Revisión del documento";
  wrap.append(h2);

  const note = el("p", "oat-review-note");
  note.textContent =
    "Edita cualquier cláusula. Las firmas quedan siempre al final. Los huecos sin rellenar aparecen entre corchetes.";
  wrap.append(note);

  const scope = el("p", "oat-scope-summary");
  const active = activeOptionalScopeLabels();
  scope.textContent = active.length
    ? `Bloques opcionales activos: ${active.join(", ")}.`
    : "Bloques opcionales activos: ninguno extra.";
  wrap.append(scope);

  const missing = missingRequired(t, state.values);
  if (missing.length) {
    const warn = el("p", "oat-gap-warn");
    warn.textContent = `Campos pendientes: ${missing.map((m) => m.label).join(", ")}.`;
    wrap.append(warn);
  }

  const toolbar = el("div", "oat-review-toolbar");
  toolbar.append(
    btn("← Volver al asistente", "oat-btn oat-btn-ghost", () => {
      state.phase = "wizard";
      state.stepIndex = t.steps.length - 1;
      render();
    }),
    btn("Añadir cláusula", "oat-btn oat-btn-ghost", () => {
      state.manualOverride = true;
      const clause: Clause = {
        id: `user-${crypto.randomUUID().slice(0, 8)}`,
        title: "Nueva cláusula",
        body: "Escribe aquí el texto de la cláusula.",
        enabled: true,
        source: "user",
      };
      const insertAt = state.clauses.findIndex((c) => c.placeAtEnd);
      if (insertAt === -1) state.clauses.push(clause);
      else state.clauses.splice(insertAt, 0, clause);
      state.clauses = ensurePlaceAtEnd(state.clauses, t);
      render();
    }),
    btn("Continuar a aceptación", "oat-btn", () => {
      state.clauses = ensurePlaceAtEnd(state.clauses, t);
      state.acceptedFinal = false;
      state.phase = "accept";
      render();
    }),
  );
  wrap.append(toolbar);

  state.clauses.forEach((clause, index) => {
    wrap.append(renderClauseEditor(clause, index));
  });

  wrap.append(renderToolDraftBar(), legalDisclaimer());
  return wrap;
}

function renderAccept(): HTMLElement {
  const t = template();
  state.clauses = ensurePlaceAtEnd(state.clauses, t);
  const wrap = el("div", "oat-step");

  const h2 = el("h2");
  h2.textContent = "Aceptación y previsualización";
  wrap.append(h2);

  const note = el("p", "oat-review-note");
  note.textContent =
    "Revisa el documento final. Si está correcto, confírmalo y exporta. Para PDF usa el diálogo de impresión del navegador (puedes activar numeración de páginas ahí si está disponible).";
  wrap.append(note, legalDisclaimer());

  const gaps = missingRequired(t, state.values);
  if (gaps.length) {
    const warn = el("p", "oat-gap-warn");
    warn.textContent = `Campos pendientes antes de exportar: ${gaps.map((m) => m.label).join(", ")}.`;
    wrap.append(warn);
  }

  const docTitle =
    String(state.values["project.workTitle"] || "").trim() || t.name;

  const runExport = (fn: () => void) => {
    if (!state.acceptedFinal) return;
    const pending = missingRequired(t, state.values);
    if (pending.length) {
      const ok = confirm(
        `Hay campos sin rellenar (${pending.map((p) => p.label).join(", ")}). ¿Exportar igual con huecos entre corchetes?`,
      );
      if (!ok) return;
    }
    fn();
  };

  const exports = el("div", "oat-review-toolbar");
  const buttons = [
    btn("Exportar PDF", "oat-btn", () =>
      runExport(() => exportPdfViaPrint(state.clauses, docTitle)),
    ),
    btn("Descargar HTML", "oat-btn oat-btn-ghost", () =>
      runExport(() => downloadHtml(state.clauses, docTitle)),
    ),
    btn("Descargar TXT", "oat-btn oat-btn-ghost", () =>
      runExport(() => downloadText(state.clauses, docTitle)),
    ),
    btn("Copiar texto", "oat-btn oat-btn-ghost", () =>
      runExport(() => {
        void copyText(state.clauses, docTitle)
          .then(() => alert("Texto copiado al portapapeles."))
          .catch(() =>
            alert("No se pudo copiar. Prueba a descargar TXT."),
          );
      }),
    ),
  ];
  for (const b of buttons) {
    b.disabled = !state.acceptedFinal;
    exports.append(b);
  }

  const hint = el("p", "oat-review-note");
  hint.textContent =
    "Marca la casilla de aceptación para habilitar la exportación.";
  hint.hidden = Boolean(state.acceptedFinal);

  const acceptBox = el("label", "oat-accept-box");
  const cb = document.createElement("input");
  cb.type = "checkbox";
  cb.checked = Boolean(state.acceptedFinal);
  cb.addEventListener("change", () => {
    state.acceptedFinal = cb.checked;
    for (const b of buttons) b.disabled = !cb.checked;
    hint.hidden = cb.checked;
  });
  const span = el("span");
  span.textContent =
    "Acepto el documento tal como está mostrado en la previsualización.";
  acceptBox.append(cb, span);
  wrap.append(acceptBox, hint);

  const toolbar = el("div", "oat-review-toolbar");
  toolbar.append(
    btn("← Volver a editar", "oat-btn oat-btn-ghost", () => {
      state.acceptedFinal = false;
      state.phase = "review";
      render();
    }),
  );

  wrap.append(toolbar, exports);
  wrap.append(renderToolDraftBar());

  const previewLabel = el("div", "oat-group-label");
  previewLabel.textContent = "Previsualización";
  const frame = document.createElement("iframe");
  frame.className = "oat-preview-frame";
  frame.title = "Previsualización del documento";
  frame.setAttribute("sandbox", "allow-same-origin");
  frame.srcdoc = clausesToHtml(state.clauses, docTitle);
  wrap.append(previewLabel, frame);
  return wrap;
}

function renderClauseEditor(clause: Clause, index: number): HTMLElement {
  const box = el("article", "oat-clause");
  box.dataset.disabled = String(!clause.enabled);
  if (clause.placeAtEnd) box.dataset.end = "true";

  const head = el("div", "oat-clause-head");
  const enabled = document.createElement("input");
  enabled.type = "checkbox";
  enabled.checked = clause.enabled;
  enabled.title = "Incluir en el documento";
  enabled.setAttribute("aria-label", "Incluir en el documento");
  enabled.disabled = Boolean(clause.placeAtEnd);
  enabled.addEventListener("change", () => {
    state.manualOverride = true;
    state.clauses[index] = { ...clause, enabled: enabled.checked };
    render();
  });

  const title = document.createElement("input");
  title.type = "text";
  title.value = clause.title;
  title.setAttribute("aria-label", "Título de la cláusula");
  title.addEventListener("input", () => {
    state.manualOverride = true;
    state.clauses[index] = {
      ...state.clauses[index],
      title: title.value,
      source: "user",
    };
  });
  head.append(enabled, title);
  box.append(head);

  const body = document.createElement("textarea");
  body.value = clause.body;
  body.setAttribute("aria-label", "Texto de la cláusula");
  body.addEventListener("input", () => {
    state.manualOverride = true;
    state.clauses[index] = {
      ...state.clauses[index],
      body: body.value,
      source: "user",
    };
  });
  box.append(body);

  const actions = el("div", "oat-clause-actions");
  if (clause.placeAtEnd) {
    const lock = el("span", "oat-review-note");
    lock.textContent = "Bloque de firmas — siempre al final del documento.";
    actions.append(lock);
  } else {
    actions.append(
      mini("Subir", () => moveClause(index, -1)),
      mini("Bajar", () => moveClause(index, 1)),
      mini("Duplicar", () => {
        state.manualOverride = true;
        state.clauses.splice(index + 1, 0, {
          ...clause,
          id: `user-${crypto.randomUUID().slice(0, 8)}`,
          source: "user",
          placeAtEnd: false,
        });
        state.clauses = ensurePlaceAtEnd(state.clauses, template());
        render();
      }),
      mini("Eliminar", () => {
        state.manualOverride = true;
        state.clauses.splice(index, 1);
        state.clauses = ensurePlaceAtEnd(state.clauses, template());
        render();
      }),
    );
  }
  box.append(actions);
  return box;
}

function moveClause(index: number, delta: number): void {
  const next = index + delta;
  if (next < 0 || next >= state.clauses.length) return;
  if (state.clauses[index]?.placeAtEnd) return;
  if (state.clauses[next]?.placeAtEnd && delta > 0) return;
  state.manualOverride = true;
  const arr = [...state.clauses];
  const [item] = arr.splice(index, 1);
  arr.splice(next, 0, item);
  state.clauses = ensurePlaceAtEnd(arr, template());
  render();
}

function mini(label: string, onClick: () => void): HTMLButtonElement {
  return btn(label, "oat-mini", onClick);
}

window.addEventListener("beforeunload", (event) => {
  if (
    hasDocumentWork(state, DEFAULT_TOGGLES) ||
    profileHasData(state.personalProfile)
  ) {
    event.preventDefault();
    event.returnValue = "";
  }
});

render();
