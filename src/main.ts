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
} from "./engine/assemble";
import type { AppValues, Clause, SessionState } from "./engine/types";
import {
  downloadHtml,
  downloadText,
  exportPdfViaPrint,
  copyText,
} from "./export/pdf";
import {
  clearAllLocal,
  loadDraft,
  loadFlags,
  loadProfile,
  profileFromValues,
  saveDraft,
  saveFlags,
  saveProfile,
} from "./storage/local";
import {
  TEMPLATES,
  enrichDerivedValues,
  exhibitionCustodyEs,
  getTemplate,
} from "./templates/exhibition-custody-es";

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
  const flags = loadFlags();
  const profile = loadProfile();
  return {
    templateId: exhibitionCustodyEs.id,
    values: { ...DEFAULT_TOGGLES, ...profile },
    clauses: [],
    stepIndex: 0,
    phase: "home",
    manualOverride: false,
    rememberPersonal: flags.rememberPersonal,
    rememberDraft: flags.rememberDraft,
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

function persistIfNeeded(): void {
  saveFlags({
    rememberPersonal: state.rememberPersonal,
    rememberDraft: state.rememberDraft,
  });
  if (state.rememberPersonal) {
    saveProfile(profileFromValues(state.values));
  }
  if (state.rememberDraft) {
    saveDraft({
      templateId: state.templateId,
      values: state.values,
      clauses: state.clauses,
      manualOverride: state.manualOverride,
      savedAt: new Date().toISOString(),
    });
  }
}

function setValue(path: string, value: string | boolean | number): void {
  state.values = { ...state.values, [path]: value };
  if (!state.manualOverride) rebuildClauses();
  persistIfNeeded();
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
  brand.textContent = "OpenArtTools";
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
    "<strong>Transparencia:</strong> esta app no guarda nada a menos que tú lo actives. Sin cuentas en la nube, sin analytics, sin telemetría.";
  return strip;
}

function renderFooter(): HTMLElement {
  const footer = el("footer", "oat-footer");
  footer.innerHTML =
    "OpenArtTools — idea, design &amp; creation by Gerard Valls Montaño · Apache-2.0 · Plantilla orientativa; no sustituye asesoramiento legal.";
  return footer;
}

function renderMain(): HTMLElement {
  const main = el("main");
  main.id = "main";
  if (state.phase === "home") main.append(renderHome());
  else if (state.phase === "privacy") main.append(renderPrivacy());
  else if (state.phase === "wizard") main.append(renderWizard());
  else main.append(renderReview());
  return main;
}

function renderHome(): HTMLElement {
  const wrap = el("div", "oat-hero");
  wrap.innerHTML = `
    <h1>OpenArtTools</h1>
    <p class="lede">Genera contratos y anexos para obras artísticas paso a paso. Local-first. Open source. Tú controlas cada cláusula.</p>
  `;
  const actions = el("div", "oat-actions");
  const start = btn("Crear contrato", "oat-btn", () => {
    state = emptySession();
    state.phase = "wizard";
    state.stepIndex = 0;
    rebuildClauses();
    render();
  });
  actions.append(start);

  const draft = loadDraft();
  if (draft && loadFlags().rememberDraft) {
    actions.append(
      btn("Continuar borrador guardado", "oat-btn oat-btn-ghost", () => {
        state.templateId = draft.templateId;
        state.values = draft.values;
        state.clauses = draft.clauses;
        state.manualOverride = draft.manualOverride;
        state.rememberDraft = true;
        state.rememberPersonal = loadFlags().rememberPersonal;
        state.phase = "review";
        render();
      }),
    );
  }

  wrap.append(actions);

  const list = el("div");
  list.style.marginTop = "2.5rem";
  const h = el("h2");
  h.textContent = "Plantillas";
  h.style.fontWeight = "400";
  h.style.fontSize = "1.25rem";
  h.style.marginBottom = "0.85rem";
  list.append(h);

  for (const t of TEMPLATES) {
    const card = el("button", "oat-card") as HTMLButtonElement;
    card.type = "button";
    card.innerHTML = `<h3>${escape(t.name)}</h3><p>${escape(t.description)}</p>`;
    card.addEventListener("click", () => {
      state = emptySession();
      state.templateId = t.id;
      state.phase = "wizard";
      state.stepIndex = 0;
      rebuildClauses();
      render();
    });
    list.append(card);
  }
  wrap.append(list);
  return wrap;
}

function renderPrivacy(): HTMLElement {
  const wrap = el("div", "oat-prose");
  wrap.innerHTML = `
    <h2>Privacidad</h2>
    <p><strong>Por defecto no se almacena nada.</strong> Los datos del contrato viven solo en la memoria de esta sesión. Al cerrar la ventana, desaparecen.</p>
    <p>Puedes marcar casillas explícitas para:</p>
    <ul>
      <li>Guardar tus datos personales (autor) en este dispositivo para la próxima vez.</li>
      <li>Guardar el borrador del documento actual en este dispositivo.</li>
    </ul>
    <p>Nunca se envían datos a un servidor de OpenArtTools. No hay cuentas cloud ni trackers.</p>
  `;
  wrap.append(
    btn("Borrar todos los datos locales ahora", "oat-btn oat-btn-ghost", () => {
      clearAllLocal();
      state.rememberPersonal = false;
      state.rememberDraft = false;
      alert("Datos locales borrados.");
      render();
    }),
  );
  return wrap;
}

function renderWizard(): HTMLElement {
  const t = template();
  const step = t.steps[state.stepIndex];
  const wrap = el("div", "oat-step");
  wrap.style.animation = "oat-in 0.35s var(--ease)";

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

  wrap.append(renderOptIn());

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
        state.phase = "review";
        persistIfNeeded();
        render();
        return;
      }
      state.stepIndex += 1;
      render();
    }),
  );
  wrap.append(nav);
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

function renderOptIn(): HTMLElement {
  const box = el("div", "oat-optin");
  const a = el("label");
  const ca = document.createElement("input");
  ca.type = "checkbox";
  ca.checked = state.rememberPersonal;
  ca.addEventListener("change", () => {
    state.rememberPersonal = ca.checked;
    persistIfNeeded();
  });
  const ta = el("span");
  ta.textContent =
    "Guardar mis datos personales (autor) en este dispositivo para la próxima vez.";
  a.append(ca, ta);

  const b = el("label");
  const cb = document.createElement("input");
  cb.type = "checkbox";
  cb.checked = state.rememberDraft;
  cb.addEventListener("change", () => {
    state.rememberDraft = cb.checked;
    persistIfNeeded();
  });
  const tb = el("span");
  tb.textContent =
    "Guardar también el borrador de este documento en este dispositivo.";
  b.append(cb, tb);

  box.append(a, b);
  return box;
}

function renderReview(): HTMLElement {
  const t = template();
  const wrap = el("div");
  wrap.style.animation = "oat-in 0.35s var(--ease)";

  const h2 = el("h2");
  h2.textContent = "Revisión del documento";
  h2.style.fontWeight = "400";
  h2.style.fontSize = "var(--type-display)";
  h2.style.letterSpacing = "-0.02em";
  h2.style.marginBottom = "0.5rem";
  wrap.append(h2);

  const note = el("p", "oat-review-note");
  note.textContent =
    "Edita cualquier cláusula. Puedes desactivar, reordenar, duplicar o añadir texto libre. Los huecos sin rellenar aparecen entre corchetes.";
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
      state.clauses.push({
        id,
        title: "Nueva cláusula",
        body: "Escribe aquí el texto de la cláusula.",
        enabled: true,
        source: "user",
      });
      persistIfNeeded();
      render();
    }),
    btn("Exportar PDF", "oat-btn", () => {
      exportPdfViaPrint(state.clauses, t.name);
    }),
    btn("Descargar HTML", "oat-btn oat-btn-ghost", () => {
      downloadHtml(state.clauses, t.name);
    }),
    btn("Descargar TXT", "oat-btn oat-btn-ghost", () => {
      downloadText(state.clauses, t.name);
    }),
    btn("Copiar texto", "oat-btn oat-btn-ghost", async () => {
      try {
        await copyText(state.clauses);
        alert("Texto copiado al portapapeles.");
      } catch {
        alert("No se pudo copiar. Prueba a descargar TXT.");
      }
    }),
  );
  wrap.append(toolbar);
  wrap.append(renderOptIn());

  state.clauses.forEach((clause, index) => {
    wrap.append(renderClauseEditor(clause, index));
  });

  return wrap;
}

function renderClauseEditor(clause: Clause, index: number): HTMLElement {
  const box = el("article", "oat-clause");
  box.dataset.disabled = String(!clause.enabled);

  const head = el("div", "oat-clause-head");
  const enabled = document.createElement("input");
  enabled.type = "checkbox";
  enabled.checked = clause.enabled;
  enabled.title = "Incluir en el documento";
  enabled.addEventListener("change", () => {
    state.manualOverride = true;
    state.clauses[index] = { ...clause, enabled: enabled.checked };
    persistIfNeeded();
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
    persistIfNeeded();
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
    persistIfNeeded();
  });
  box.append(body);

  const actions = el("div", "oat-clause-actions");
  actions.append(
    mini("Subir", () => moveClause(index, -1)),
    mini("Bajar", () => moveClause(index, 1)),
    mini("Duplicar", () => {
      state.manualOverride = true;
      const copy: Clause = {
        ...clause,
        id: `user-${crypto.randomUUID().slice(0, 8)}`,
        source: "user",
      };
      state.clauses.splice(index + 1, 0, copy);
      persistIfNeeded();
      render();
    }),
    mini("Eliminar", () => {
      state.manualOverride = true;
      state.clauses.splice(index, 1);
      persistIfNeeded();
      render();
    }),
  );
  box.append(actions);
  return box;
}

function moveClause(index: number, delta: number): void {
  const next = index + delta;
  if (next < 0 || next >= state.clauses.length) return;
  state.manualOverride = true;
  const arr = [...state.clauses];
  const [item] = arr.splice(index, 1);
  arr.splice(next, 0, item);
  state.clauses = arr;
  persistIfNeeded();
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
