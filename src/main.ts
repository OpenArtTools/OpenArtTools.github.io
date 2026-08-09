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
  ALL_OPTION_MASTERS,
  DEFAULT_TOGGLES,
  OPTIONAL_SCOPE_LABELS,
} from "./app/defaults";
import {
  ensurePlaceAtEnd,
  fieldsForStep,
  isTruthy,
  refreshFromValues,
} from "./engine/assemble";
import type { AppValues, Clause } from "./engine/types";
import { btn, el } from "./dom";
import {
  renderHome,
  renderSupport,
  renderTransparency,
  type PlatformPageDeps,
} from "./pages/platform-pages";
import {
  renderAccept,
  renderReview,
  type ReviewPageDeps,
} from "./pages/review-page";
import {
  renderWizard,
  type WizardPageDeps,
} from "./pages/wizard-page";
import {
  renderFooter,
  renderHeader,
  renderSessionStrip,
  renderTransparencyStrip,
} from "./shell";
import {
  enrichDerivedValues,
  exhibitionCustodyEs,
  getTemplate,
} from "./templates/exhibition-custody-es";
import { PLATFORM, findToolByTemplateId } from "./platform";
import {
  findToolById,
  parsePath,
  pathForPhase,
  syncBrowserUrl,
} from "./routing";
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
import { confirmAction, notify } from "./ui/dialogs";

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
  syncUrlForState("push");
  render();
}

function currentToolId(): string | undefined {
  return findToolByTemplateId(state.templateId)?.id;
}

function syncUrlForState(mode: "push" | "replace"): void {
  syncBrowserUrl(pathForPhase(state.phase, currentToolId()), mode);
}

/** Apply the current browser path to session phase (no history write unless normalizing). */
function applyRouteFromLocation(normalizeAliases = true): void {
  const route = parsePath(location.pathname);

  if (route.kind === "unknown") {
    if (isToolPhase(state.phase)) state.lastToolPhase = state.phase;
    state.phase = "home";
    syncBrowserUrl(pathForPhase("home"), "replace");
    return;
  }

  if (route.kind === "home") {
    if (isToolPhase(state.phase)) state.lastToolPhase = state.phase;
    state.phase = "home";
  } else if (route.kind === "privacy") {
    if (isToolPhase(state.phase)) state.lastToolPhase = state.phase;
    state.phase = "privacy";
  } else if (route.kind === "support") {
    if (isToolPhase(state.phase)) state.lastToolPhase = state.phase;
    state.phase = "support";
  } else if (route.kind === "tool") {
    const tool = findToolById(route.toolId);
    if (!tool?.templateId) {
      state.phase = "home";
      syncBrowserUrl(pathForPhase("home"), "replace");
      return;
    }
    if (state.templateId !== tool.templateId) {
      const profile = state.personalProfile;
      state = createEmptySession(tool.templateId, DEFAULT_TOGGLES, profile);
      state.phase = "wizard";
      if (profileHasData(profile)) applyAuthorFromProfile(profile!);
      else rebuildClauses();
    } else if (!isToolPhase(state.phase)) {
      state.phase = state.lastToolPhase ?? "wizard";
    }
    if (normalizeAliases) {
      syncBrowserUrl(pathForPhase(state.phase, tool.id), "replace");
    }
  }
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

function isOn(path: string): boolean {
  return isTruthy(state.values, path);
}

function emptyPath(path: string): boolean {
  return !String(state.values[path] ?? "").trim();
}

function autofillContactsFromParties(): void {
  const orgContactName = !emptyPath("parties.org.repName")
    ? "parties.org.repName"
    : "parties.org.name";
  const map: [string, string][] = [
    ["options.contactTitularName", "parties.author.name"],
    ["options.contactTitularPhone", "parties.author.phone"],
    ["options.contactTitularEmail", "parties.author.email"],
    ["options.contactOrgName", orgContactName],
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
      "options.imageUse",
      "options.transport",
      "options.contacts",
      "options.spaceAccess",
      "options.ipRights",
      "options.repairs",
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

async function downloadCurrentProfile(): Promise<void> {
  const profile = state.personalProfile;
  if (!profile || !profileHasData(profile)) {
    await notify(
      "No hay datos de autoría que guardar. Completar el formulario abajo o cargar un archivo primero.",
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
      await notify(
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
    syncUrlForState("push");
    render();
  } catch (err) {
    await notify(
      err instanceof Error ? err.message : "No se pudo cargar el borrador.",
    );
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
    await notify(
      err instanceof Error ? err.message : "No se pudo cargar el perfil.",
    );
  }
}

function emptyValueForField(type: string, path: string): string | boolean {
  if (Object.prototype.hasOwnProperty.call(DEFAULT_TOGGLES, path)) {
    return DEFAULT_TOGGLES[path] as boolean;
  }
  if (type === "toggle") return false;
  return "";
}

async function resetEntireForm(): Promise<void> {
  const ok = await confirmAction(
    "¿Restablecer todo el acuerdo a cero?\n\nSe borran todos los campos, cláusulas editadas y la aceptación. Se vuelve al primer paso. Los datos de autoría en memoria de la plataforma no se tocan.",
  );
  if (!ok) return;
  const profile = state.personalProfile;
  const templateId = state.templateId;
  state = createEmptySession(templateId, DEFAULT_TOGGLES, profile);
  state.phase = "wizard";
  state.stepIndex = 0;
  rebuildClauses();
  render();
}

async function resetCurrentStep(): Promise<void> {
  const t = template();
  const step = t.steps[state.stepIndex];
  if (!step) return;
  const ok = await confirmAction(
    `¿Restablecer a cero la sección «${step.title}»?\n\nSolo se vacían los campos de esta sección.`,
  );
  if (!ok) return;
  const next: AppValues = { ...state.values };
  for (const field of fieldsForStep(t, step.id)) {
    next[field.path] = emptyValueForField(field.type, field.path);
  }
  state.values = next;
  state.acceptedFinal = false;
  if (!state.manualOverride) rebuildClauses();
  render();
}

function startFreshTool(templateId: string, profile: PersonalProfile | null): void {
  state = createEmptySession(templateId, DEFAULT_TOGGLES, profile);
  state.phase = "wizard";
  state.stepIndex = 0;
  if (profileHasData(profile)) applyAuthorFromProfile(profile!);
  else rebuildClauses();
  syncUrlForState("push");
  render();
}

async function openTool(templateId: string): Promise<void> {
  if (
    templateId === state.templateId &&
    hasDocumentWork(state, DEFAULT_TOGGLES)
  ) {
    const resume = await confirmAction("¿Retomar el documento en curso?");
    if (resume) {
      const phase: ToolPhase = state.lastToolPhase ?? "wizard";
      state.phase = phase;
      syncUrlForState("push");
      render();
      return;
    }
    startFreshTool(templateId, state.personalProfile);
    return;
  }
  startFreshTool(templateId, state.personalProfile);
}

let profilePanelOpen = false;

function platformPageDeps(): PlatformPageDeps {
  return {
    go,
    openTool: (templateId) => {
      void openTool(templateId);
    },
    getProfile: () => state.personalProfile,
    isProfilePanelOpen: () => profilePanelOpen,
    setProfilePanelOpen: (open) => {
      profilePanelOpen = open;
    },
    setProfileField,
    pickProfileFile: () => {
      void pickProfileFile();
    },
    downloadCurrentProfile: () => {
      void downloadCurrentProfile();
    },
  };
}

function wizardPageDeps(): WizardPageDeps {
  return {
    getTemplate: template,
    getValues: () => state.values,
    getStepIndex: () => state.stepIndex,
    setStepIndex: (index) => {
      state.stepIndex = index;
    },
    setValue,
    render,
    rebuildClauses,
    resetCurrentStep,
    renderApplyPlatformProfile,
    renderToolDraftBar,
    isOn,
    autofillContactsFromParties,
    autofillNoticesFromParties,
    applyOptionsPreset,
    goToReview: () => {
      rebuildClauses();
      state.acceptedFinal = false;
      state.phase = "review";
      render();
    },
  };
}

function reviewPageDeps(): ReviewPageDeps {
  return {
    getTemplate: template,
    getValues: () => state.values,
    getClauses: () => state.clauses,
    setClauses: (clauses: Clause[]) => {
      state.clauses = clauses;
    },
    getAcceptedFinal: () => state.acceptedFinal,
    setAcceptedFinal: (value) => {
      state.acceptedFinal = value;
    },
    setManualOverride: (value) => {
      state.manualOverride = value;
    },
    setPhase: (phase) => {
      state.phase = phase;
    },
    setStepIndex: (index) => {
      state.stepIndex = index;
    },
    render,
    renderToolDraftBar,
    activeOptionalScopeLabels,
  };
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
    note.textContent = `Datos en memoria (autoría): ${profileLabel(state.personalProfile!)}. Se usan para rellenar la autoría en este documento, no datos de clientes.`;
    const actions = el("div", "oat-actions");
    actions.style.marginTop = "0";
    actions.append(
      btn(
        "Rellenar autoría con esos datos",
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
      "En la página de la plataforma se pueden cargar los datos de autoría. Aquí solo rellenan la autoría de este documento.";
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
      showResetForm: isToolPhase(state.phase),
      onResetForm: () => {
        void resetEntireForm();
      },
    }),
  );
  app.replaceChildren(chrome, renderMain(), renderFooter(() => go("support")));
}

function renderMain(): HTMLElement {
  const main = el("main");
  main.id = "main";
  const deps = platformPageDeps();
  switch (state.phase) {
    case "home":
      main.append(renderHome(deps));
      break;
    case "privacy":
      main.append(renderTransparency(deps));
      break;
    case "support":
      main.append(renderSupport(deps));
      break;
    case "wizard":
      main.append(renderWizard(wizardPageDeps()));
      break;
    case "review":
      main.append(renderReview(reviewPageDeps()));
      break;
    case "accept":
      main.append(renderAccept(reviewPageDeps()));
      break;
  }
  return main;
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

window.addEventListener("popstate", () => {
  applyRouteFromLocation(false);
  render();
});

applyRouteFromLocation();
render();
