/**
 * Copyright 2026 Gerard Valls Montaño
 * Licensed under the Apache License, Version 2.0
 *
 * Open Art Tools — app entry.
 * Flow: platform home → tool wizard → review → accept → export.
 * Nothing is stored by the app; sessions are downloadable JSON files.
 */

import "./styles/main.css";
import {
  ensurePlaceAtEnd,
  fieldVisible,
  fieldsForStep,
  missingRequired,
  refreshFromValues,
} from "./engine/assemble";
import type { AppValues, Clause, SessionState } from "./engine/types";
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
  renderTransparencyStrip,
} from "./shell";
import {
  buildSessionFile,
  downloadSessionFile,
  readSessionFile,
} from "./storage/local";
import {
  enrichDerivedValues,
  exhibitionCustodyEs,
  getTemplate,
} from "./templates/exhibition-custody-es";
import { PLATFORM, TOOLS, TRANSPARENCY } from "./platform";

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
  "options.deliveryAct": true,
  "options.policyCerts": true,
  "options.franchise": true,
  "options.jurisdiction": false,
  "options.independentExpert": true,
  "options.forceMajeure": false,
};

function emptySession(): SessionState {
  return {
    templateId: exhibitionCustodyEs.id,
    values: { ...DEFAULT_TOGGLES },
    clauses: [],
    stepIndex: 0,
    phase: "home",
    manualOverride: false,
    acceptedFinal: false,
  };
}

let state: SessionState = emptySession();

function template() {
  return getTemplate(state.templateId) ?? exhibitionCustodyEs;
}

function go(phase: SessionState["phase"]): void {
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

function setValue(path: string, value: string | boolean | number): void {
  state.values = { ...state.values, [path]: value };
  if (!state.manualOverride) rebuildClauses();
}

function downloadCurrentSession(): void {
  downloadSessionFile(
    buildSessionFile({
      templateId: state.templateId,
      values: state.values,
      clauses: state.clauses,
      manualOverride: state.manualOverride,
    }),
  );
}

async function importSessionFromFile(file: File): Promise<void> {
  const data = await readSessionFile(file);
  state = emptySession();
  state.templateId = data.templateId;
  state.values = { ...DEFAULT_TOGGLES, ...data.values };
  state.clauses = ensurePlaceAtEnd(data.clauses, getTemplate(data.templateId));
  state.manualOverride = data.manualOverride;
  state.acceptedFinal = false;
  state.phase = "review";
  render();
}

function pickSessionFile(): void {
  const input = document.createElement("input");
  input.type = "file";
  input.accept = "application/json,.json";
  input.addEventListener("change", async () => {
    const file = input.files?.[0];
    if (!file) return;
    try {
      await importSessionFromFile(file);
    } catch (err) {
      alert(err instanceof Error ? err.message : "No se pudo cargar el archivo.");
    }
  });
  input.click();
}

function render(): void {
  const app = document.getElementById("app");
  if (!app) return;
  app.replaceChildren(
    renderHeader(state.phase, state.templateId, go),
    renderTransparencyStrip(() => go("privacy")),
    renderMain(),
    renderFooter(),
  );
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
    case "wizard":
      main.append(renderWizard());
      break;
    case "accept":
      main.append(renderAccept());
      break;
    default:
      main.append(renderReview());
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
      card.addEventListener("click", () => {
        state = emptySession();
        state.templateId = tool.templateId!;
        state.phase = "wizard";
        state.stepIndex = 0;
        rebuildClauses();
        render();
      });
    }
    shelf.append(card);
  }

  const actions = el("div", "oat-actions");
  actions.append(
    btn("Cargar sesión (.json)", "oat-btn oat-btn-ghost", pickSessionFile),
  );
  shelf.append(actions);
  wrap.append(shelf);

  const meta = el("p", "oat-home-meta");
  meta.textContent = `${TRANSPARENCY.strip}. ${TRANSPARENCY.legal}`;
  wrap.append(meta);
  return wrap;
}

function renderTransparency(): HTMLElement {
  const wrap = el("div", "oat-prose");
  const h2 = el("h2");
  h2.textContent = "Transparencia";
  wrap.append(h2);

  const intro = el("p");
  intro.textContent =
    "Open Art Tools promete transparencia total: código abierto, sin vigilancia y sin almacenar tus datos.";
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

  const links = el("p");
  links.innerHTML = `Documentación en el repositorio: <a href="${PLATFORM.repoUrl}/blob/main/PRIVACY.md" target="_blank" rel="noopener noreferrer">PRIVACY.md</a> · <a href="${PLATFORM.repoUrl}/blob/main/AUDITABILITY.md" target="_blank" rel="noopener noreferrer">AUDITABILITY.md</a> · <a href="${PLATFORM.repoUrl}" target="_blank" rel="noopener noreferrer">código fuente</a>`;
  wrap.append(links);
  return wrap;
}

function renderWizard(): HTMLElement {
  const t = template();
  const step = t.steps[state.stepIndex];
  const wrap = el("div", "oat-step");

  const progress = el("ol", "oat-progress");
  t.steps.forEach((s, i) => {
    const li = el("li");
    li.textContent = `${i + 1}. ${s.title}`;
    li.dataset.active = String(i === state.stepIndex);
    li.dataset.done = String(i < state.stepIndex);
    progress.append(li);
  });
  wrap.append(progress);

  const h2 = el("h2");
  h2.textContent = step.title;
  const blurb = el("p", "blurb");
  blurb.textContent = step.blurb;
  wrap.append(h2, blurb);

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
  if (isLast) {
    wrap.append(renderSessionFiles());
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
        : "text";
  input.placeholder = field.placeholder;
  input.value = val != null ? String(val) : "";
  if (field.type === "money" || field.type === "number") {
    input.step = field.type === "money" ? "0.01" : "1";
    input.min = "0";
  }
  input.addEventListener("input", () => {
    if (field.type === "number" || field.type === "money") {
      setValue(field.path, input.value === "" ? "" : Number(input.value));
    } else {
      setValue(field.path, input.value);
    }
  });
  box.append(input);
  return box;
}

function renderSessionFiles(): HTMLElement {
  const box = el("div", "oat-session-bar");
  const note = el("p", "oat-review-note");
  note.textContent =
    "Nada se guarda en el navegador. Descarga un .json para reutilizar la sesión, o carga uno que ya tengas.";
  const actions = el("div", "oat-actions");
  actions.style.marginTop = "0";
  actions.append(
    btn("Descargar sesión", "oat-btn oat-btn-ghost", downloadCurrentSession),
    btn("Cargar sesión", "oat-btn oat-btn-ghost", pickSessionFile),
  );
  box.append(note, actions);
  return box;
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
    btn("Aceptar borrador", "oat-btn", () => {
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

  wrap.append(renderSessionFiles(), legalDisclaimer());
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
    "Revisa el documento final. Si está correcto, confírmalo y exporta. Las páginas se numeran al imprimir o guardar como PDF.";
  wrap.append(note, legalDisclaimer());

  const acceptBox = el("label", "oat-accept-box");
  const cb = document.createElement("input");
  cb.type = "checkbox";
  cb.checked = Boolean(state.acceptedFinal);
  cb.addEventListener("change", () => {
    state.acceptedFinal = cb.checked;
    render();
  });
  const span = el("span");
  span.textContent =
    "Acepto el documento tal como está mostrado en la previsualización.";
  acceptBox.append(cb, span);
  wrap.append(acceptBox);

  const toolbar = el("div", "oat-review-toolbar");
  toolbar.append(
    btn("← Volver a editar", "oat-btn oat-btn-ghost", () => {
      state.acceptedFinal = false;
      state.phase = "review";
      render();
    }),
  );

  const exports = el("div", "oat-review-toolbar");
  const buttons = [
    btn("Exportar PDF", "oat-btn", () => exportPdfViaPrint(state.clauses, t.name)),
    btn("Descargar HTML", "oat-btn oat-btn-ghost", () =>
      downloadHtml(state.clauses, t.name),
    ),
    btn("Descargar TXT", "oat-btn oat-btn-ghost", () =>
      downloadText(state.clauses, t.name),
    ),
    btn("Copiar texto", "oat-btn oat-btn-ghost", async () => {
      try {
        await copyText(state.clauses);
        alert("Texto copiado al portapapeles.");
      } catch {
        alert("No se pudo copiar. Prueba a descargar TXT.");
      }
    }),
  ];
  for (const b of buttons) {
    b.disabled = !state.acceptedFinal;
    exports.append(b);
  }

  if (!state.acceptedFinal) {
    const hint = el("p", "oat-review-note");
    hint.textContent =
      "Marca la casilla de aceptación para habilitar la exportación.";
    wrap.append(hint);
  }

  wrap.append(toolbar, exports, renderSessionFiles());

  const previewLabel = el("div", "oat-group-label");
  previewLabel.textContent = "Previsualización";
  const frame = document.createElement("iframe");
  frame.className = "oat-preview-frame";
  frame.title = "Previsualización del documento";
  frame.srcdoc = clausesToHtml(state.clauses, t.name);
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
  enabled.disabled = Boolean(clause.placeAtEnd);
  enabled.addEventListener("change", () => {
    state.manualOverride = true;
    state.clauses[index] = { ...clause, enabled: enabled.checked };
    render();
  });

  const title = document.createElement("input");
  title.type = "text";
  title.value = clause.title;
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

render();
