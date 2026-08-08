/**
 * Copyright 2026 Gerard Valls Montaño
 * Licensed under the Apache License, Version 2.0
 */

import "./styles/main.css";
import {
  fieldVisible,
  fieldsForStep,
  missingRequired,
  refreshFromValues,
  ensurePlaceAtEnd,
} from "./engine/assemble";
import type { AppValues, Clause, SessionState } from "./engine/types";
import {
  downloadHtml,
  downloadText,
  exportPdfViaPrint,
  copyText,
  clausesToHtml,
} from "./export/pdf";
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
import { PLATFORM, TOOLS } from "./platform";

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

function rebuildClauses(): void {
  const t = template();
  const enriched = enrichDerivedValues(state.values);
  state.clauses = refreshFromValues(
    t,
    enriched,
    state.clauses,
    state.manualOverride,
  );
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

function setValue(path: string, value: string | boolean | number): void {
  state.values = { ...state.values, [path]: value };
  if (!state.manualOverride) rebuildClauses();
}

function render(): void {
  const app = document.getElementById("app");
  if (!app) return;
  app.innerHTML = "";
  app.append(renderHeader(), renderPrivacyStrip(), renderMain(), renderFooter());
  bindGlobal();
}

function renderHeader(): HTMLElement {
  const header = el("header", "oat-header");
  const brand = el("button", "oat-brand") as HTMLButtonElement;
  brand.type = "button";
  brand.textContent = PLATFORM.name;
  brand.addEventListener("click", () => {
    state.phase = "home";
    render();
  });

  const nav = el("nav", "oat-nav");
  nav.append(
    navBtn("Inicio", "home", state.phase === "home"),
    navBtn("Privacidad", "privacy", state.phase === "privacy"),
  );

  header.append(brand, nav);
  return header;
}

function navBtn(label: string, phase: SessionState["phase"], current: boolean) {
  const b = el("button") as HTMLButtonElement;
  b.type = "button";
  b.textContent = label;
  if (current) b.setAttribute("aria-current", "page");
  b.addEventListener("click", () => {
    state.phase = phase;
    render();
  });
  return b;
}

function renderPrivacyStrip(): HTMLElement {
  const strip = el("div", "oat-privacy-strip");
  strip.innerHTML =
    "<strong>Transparencia:</strong> Open Art Tools no almacena absolutamente nada. La sesión vive solo en memoria; si quieres reutilizar datos, descarga un archivo y cárgalo después.";
  return strip;
}

function renderFooter(): HTMLElement {
  const footer = el("footer", "oat-footer");
  footer.innerHTML = `${PLATFORM.name} — plataforma open source gratuita para artistas · idea, design &amp; creation by ${PLATFORM.author} · Apache-2.0 · No revisado por abogados ni profesionales del derecho; no constituye asesoramiento legal.`;
  return footer;
}

function renderMain(): HTMLElement {
  const main = el("main");
  main.id = "main";
  if (state.phase === "home") main.append(renderHome());
  else if (state.phase === "privacy") main.append(renderPrivacy());
  else if (state.phase === "wizard") main.append(renderWizard());
  else if (state.phase === "accept") main.append(renderAccept());
  else main.append(renderReview());
  return main;
}

const LEGAL_DISCLAIMER =
  "Este documento no ha sido revisado por abogados ni por ningún profesional del derecho. Es una plantilla orientativa generada por Open Art Tools y no constituye asesoramiento legal.";

function legalDisclaimer(): HTMLElement {
  const d = el("aside", "oat-legal-disclaimer");
  d.setAttribute("role", "note");
  d.textContent = LEGAL_DISCLAIMER;
  return d;
}

function renderHome(): HTMLElement {
  const wrap = el("div", "oat-hero");
  wrap.append(legalDisclaimer());

  const h1 = el("h1");
  h1.textContent = PLATFORM.name;
  const lede = el("p", "lede");
  lede.textContent = PLATFORM.tagline;
  const support = el("p", "lede");
  support.style.marginTop = "-0.75rem";
  support.textContent =
    "Completamente open source. Sin cuentas. No almacena nada: descarga un archivo de sesión si quieres reutilizar datos más tarde.";
  wrap.append(h1, lede, support);

  const list = el("div");
  list.style.marginTop = "2.25rem";
  const h = el("h2");
  h.textContent = "Herramientas";
  h.style.fontWeight = "400";
  h.style.fontSize = "1.25rem";
  h.style.marginBottom = "0.35rem";
  list.append(h);

  const sub = el("p", "lede");
  sub.style.marginBottom = "1rem";
  sub.textContent =
    "La primera herramienta sirve para crear acuerdos de exhibición de obra en festivales, galerías o cualquier otro lugar.";
  list.append(sub);

  for (const tool of TOOLS) {
    if (tool.status !== "available" || !tool.templateId) continue;
    const card = el("button", "oat-card") as HTMLButtonElement;
    card.type = "button";
    card.innerHTML = `<h3>${escape(tool.name)}</h3><p>${escape(tool.blurb)}</p>`;
    card.addEventListener("click", () => {
      state = emptySession();
      state.templateId = tool.templateId!;
      state.phase = "wizard";
      state.stepIndex = 0;
      rebuildClauses();
      render();
    });
    list.append(card);
  }

  const fileActions = el("div", "oat-actions");
  fileActions.style.marginTop = "1.25rem";
  fileActions.append(
    btn("Cargar sesión desde archivo", "oat-btn oat-btn-ghost", () => {
      pickSessionFile();
    }),
  );
  list.append(fileActions);

  wrap.append(list);
  wrap.append(legalDisclaimer());
  return wrap;
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

function renderPrivacy(): HTMLElement {
  const wrap = el("div", "oat-prose");
  wrap.innerHTML = `
    <h2>Privacidad</h2>
    <p><strong>Open Art Tools no almacena absolutamente nada</strong> en el navegador, en GitHub ni en ningún servidor.</p>
    <p>Los datos viven solo en la memoria de esta sesión. Al cerrar la pestaña, desaparecen.</p>
    <p>Si quieres ahorrar tiempo la próxima vez, <strong>descarga un archivo de sesión</strong> (.json) y vuelve a cargarlo cuando quieras. Ese archivo lo guardas tú donde elijas.</p>
    <p>No hay cuentas cloud ni trackers.</p>
  `;
  return wrap;
}

function renderWizard(): HTMLElement {
  const t = template();
  const step = t.steps[state.stepIndex];
  const wrap = el("div", "oat-step");
  wrap.style.animation = "oat-in 0.35s var(--ease)";

  wrap.append(legalDisclaimer());

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

  const fields = fieldsForStep(t, step.id).filter((f) =>
    fieldVisible(f, state.values),
  );
  let lastGroup = "";
  for (const field of fields) {
    if (field.group && field.group !== lastGroup) {
      lastGroup = field.group;
      const g = el("div", "oat-group-label");
      g.textContent = field.group;
      wrap.append(g);
    }
    wrap.append(renderField(field));
  }

  wrap.append(renderSessionFiles());

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
      if (isLast) {
        rebuildClauses();
        state.acceptedFinal = false;
        state.phase = "review";
        render();
        return;
      }
      state.stepIndex += 1;
      render();
    }),
  );
  wrap.append(nav);
  wrap.append(legalDisclaimer());
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
    ta.value = val !== undefined && val !== null ? String(val) : "";
    ta.addEventListener("input", () => setValue(field.path, ta.value));
    box.append(ta);
  } else {
    const input = document.createElement("input");
    input.id = field.id;
    input.type =
      field.type === "money" || field.type === "number"
        ? "number"
        : field.type === "date"
          ? "date"
          : "text";
    input.placeholder = field.placeholder;
    input.value = val !== undefined && val !== null ? String(val) : "";
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
  }
  return box;
}

function renderSessionFiles(): HTMLElement {
  const box = el("div", "oat-optin");
  const note = el("p", "oat-review-note");
  note.style.marginBottom = "0.75rem";
  note.textContent =
    "Nada se guarda en el navegador. Descarga un archivo de sesión para reutilizarlo más tarde, o carga uno que ya tengas.";
  const actions = el("div", "oat-actions");
  actions.append(
    btn("Descargar sesión (.json)", "oat-btn oat-btn-ghost", () => {
      downloadCurrentSession();
    }),
    btn("Cargar sesión", "oat-btn oat-btn-ghost", () => {
      pickSessionFile();
    }),
  );
  box.append(note, actions);
  return box;
}

function renderReview(): HTMLElement {
  const t = template();
  state.clauses = ensurePlaceAtEnd(state.clauses, t);

  const wrap = el("div");
  wrap.style.animation = "oat-in 0.35s var(--ease)";

  wrap.append(legalDisclaimer());

  const h2 = el("h2");
  h2.textContent = "Revisión del documento";
  h2.style.fontWeight = "400";
  h2.style.fontSize = "var(--type-display)";
  h2.style.letterSpacing = "-0.02em";
  h2.style.marginBottom = "0.5rem";
  wrap.append(h2);

  const note = el("p", "oat-review-note");
  note.textContent =
    "Edita cualquier cláusula. Puedes desactivar, reordenar, duplicar o añadir texto libre. Las firmas quedan siempre al final. Los huecos sin rellenar aparecen entre corchetes.";
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
      const id = `user-${crypto.randomUUID().slice(0, 8)}`;
      const insertAt = state.clauses.findIndex((c) => c.placeAtEnd);
      const clause: Clause = {
        id,
        title: "Nueva cláusula",
        body: "Escribe aquí el texto de la cláusula.",
        enabled: true,
        source: "user",
      };
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
  wrap.append(renderSessionFiles());

  state.clauses.forEach((clause, index) => {
    wrap.append(renderClauseEditor(clause, index));
  });

  wrap.append(legalDisclaimer());
  return wrap;
}

function renderAccept(): HTMLElement {
  const t = template();
  state.clauses = ensurePlaceAtEnd(state.clauses, t);

  const wrap = el("div");
  wrap.style.animation = "oat-in 0.35s var(--ease)";

  wrap.append(legalDisclaimer());

  const h2 = el("h2");
  h2.textContent = "Aceptación y previsualización";
  h2.style.fontWeight = "400";
  h2.style.fontSize = "var(--type-display)";
  h2.style.letterSpacing = "-0.02em";
  h2.style.marginBottom = "0.5rem";
  wrap.append(h2);

  const note = el("p", "oat-review-note");
  note.textContent =
    "Revisa cómo queda el documento final. Si está correcto, confírmalo y exporta. Las páginas se numeran al imprimir o guardar como PDF.";
  wrap.append(note);

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
  const exportPdf = btn("Exportar PDF", "oat-btn", () => {
    exportPdfViaPrint(state.clauses, t.name);
  });
  const exportHtml = btn("Descargar HTML", "oat-btn oat-btn-ghost", () => {
    downloadHtml(state.clauses, t.name);
  });
  const exportTxt = btn("Descargar TXT", "oat-btn oat-btn-ghost", () => {
    downloadText(state.clauses, t.name);
  });
  const exportCopy = btn("Copiar texto", "oat-btn oat-btn-ghost", async () => {
    try {
      await copyText(state.clauses);
      alert("Texto copiado al portapapeles.");
    } catch {
      alert("No se pudo copiar. Prueba a descargar TXT.");
    }
  });

  for (const b of [exportPdf, exportHtml, exportTxt, exportCopy]) {
    b.disabled = !state.acceptedFinal;
    exports.append(b);
  }

  if (!state.acceptedFinal) {
    const hint = el("p", "oat-review-note");
    hint.textContent =
      "Marca la casilla de aceptación para habilitar las opciones de exportación.";
    wrap.append(hint);
  }

  wrap.append(toolbar, exports);
  wrap.append(renderSessionFiles());

  const previewLabel = el("h3");
  previewLabel.className = "oat-group-label";
  previewLabel.textContent = "Previsualización";
  wrap.append(previewLabel);

  const frame = document.createElement("iframe");
  frame.className = "oat-preview-frame";
  frame.title = "Previsualización del documento";
  frame.srcdoc = clausesToHtml(state.clauses, t.name);
  wrap.append(frame);

  wrap.append(legalDisclaimer());
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
  if (!clause.placeAtEnd) {
    actions.append(
      mini("Subir", () => moveClause(index, -1)),
      mini("Bajar", () => moveClause(index, 1)),
      mini("Duplicar", () => {
        state.manualOverride = true;
        const copy: Clause = {
          ...clause,
          id: `user-${crypto.randomUUID().slice(0, 8)}`,
          source: "user",
          placeAtEnd: false,
        };
        state.clauses.splice(index + 1, 0, copy);
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
  } else {
    const lock = el("span", "oat-review-note");
    lock.textContent = "Bloque de firmas — siempre al final del documento.";
    actions.append(lock);
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

function bindGlobal(): void {
  // reserved for future shortcuts
}

function el(tag: string, className?: string): HTMLElement {
  const node = document.createElement(tag);
  if (className) node.className = className;
  return node;
}

function btn(label: string, className: string, onClick: () => void): HTMLButtonElement {
  const b = document.createElement("button");
  b.type = "button";
  b.className = className;
  b.textContent = label;
  b.addEventListener("click", onClick);
  return b;
}

function mini(label: string, onClick: () => void): HTMLButtonElement {
  return btn(label, "oat-mini", onClick);
}

function escape(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

render();
