/**
 * Copyright (C) 2026 Gerard Valls Montaño
 * SPDX-License-Identifier: AGPL-3.0-or-later
 *
 * Tool wizard: steps, fields, and optional-clause options UI.
 */

import { OPTION_GROUP_MASTER } from "../app/defaults";
import { btn, el } from "../dom";
import { fieldVisible, fieldsForStep } from "../engine/assemble";
import type { AppValues, TemplateDoc } from "../engine/types";
import { legalDisclaimer } from "../shell";

export type WizardPageDeps = {
  getTemplate: () => TemplateDoc;
  getValues: () => AppValues;
  getStepIndex: () => number;
  setStepIndex: (index: number) => void;
  setValue: (path: string, value: string | boolean | number) => void;
  render: () => void;
  rebuildClauses: () => void;
  resetCurrentStep: () => void | Promise<void>;
  renderApplyPlatformProfile: () => HTMLElement;
  renderToolDraftBar: () => HTMLElement;
  isOn: (path: string) => boolean;
  autofillContactsFromParties: () => void;
  autofillNoticesFromParties: () => void;
  applyOptionsPreset: (kind: "essential" | "full" | "all") => void;
  goToReview: () => void;
};

export function renderWizard(deps: WizardPageDeps): HTMLElement {
  const t = deps.getTemplate();
  const maxStep = Math.max(0, t.steps.length - 1);
  let stepIndex = deps.getStepIndex();
  if (stepIndex > maxStep) {
    stepIndex = maxStep;
    deps.setStepIndex(maxStep);
  }
  if (stepIndex < 0) {
    stepIndex = 0;
    deps.setStepIndex(0);
  }
  const step = t.steps[stepIndex];
  const wrap = el("div", "oat-step");

  const progress = el("ol", "oat-progress");
  progress.setAttribute(
    "aria-label",
    `Paso ${stepIndex + 1} de ${t.steps.length}`,
  );
  t.steps.forEach((s, i) => {
    const li = el("li");
    li.textContent = `${i + 1}. ${s.title}`;
    li.dataset.active = String(i === stepIndex);
    li.dataset.done = String(i < stepIndex);
    if (i < stepIndex) {
      li.tabIndex = 0;
      li.setAttribute("role", "button");
      li.title = `Ir a ${s.title}`;
      const goStep = () => {
        deps.setStepIndex(i);
        deps.render();
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

  const heading = el("div", "oat-step-heading");
  const headingText = el("div", "oat-step-heading-text");
  const h2 = el("h2");
  h2.textContent = step.title;
  const blurb = el("p", "blurb");
  blurb.textContent = step.blurb;
  headingText.append(h2, blurb);
  const resetStep = btn(
    "Restablecer sección",
    "oat-btn oat-btn-ghost oat-step-reset-btn",
    () => {
      void deps.resetCurrentStep();
    },
  );
  resetStep.title = `Vacía solo los campos de «${step.title}»`;
  heading.append(headingText, resetStep);
  wrap.append(heading);

  if (step.id === "titularidad") {
    wrap.append(deps.renderApplyPlatformProfile());
  }

  if (step.id === "options") {
    wrap.append(renderOptionsStep(deps, t));
  } else {
    let lastGroup = "";
    let grid: HTMLElement | null = null;
    for (const field of fieldsForStep(t, step.id).filter((f) =>
      fieldVisible(f, deps.getValues()),
    )) {
      if (field.group && field.group !== lastGroup) {
        lastGroup = field.group;
        grid = null;
        const g = el("div", "oat-group-label");
        g.textContent = field.group;
        wrap.append(g);
      }
      const node = renderField(deps, field);
      if (node.classList.contains("oat-toggle")) {
        grid = null;
        wrap.append(node);
        continue;
      }
      if (!grid) {
        grid = el("div", "oat-fields");
        wrap.append(grid);
      }
      grid.append(node);
    }
  }

  const nav = el("div", "oat-step-nav");
  if (stepIndex > 0) {
    nav.append(
      btn("Atrás", "oat-btn oat-btn-ghost", () => {
        deps.setStepIndex(stepIndex - 1);
        deps.render();
      }),
    );
  }
  const isLast = stepIndex >= t.steps.length - 1;
  nav.append(
    btn(isLast ? "Revisar documento" : "Siguiente", "oat-btn", () => {
      if (!isLast) {
        deps.setStepIndex(stepIndex + 1);
        deps.render();
        return;
      }
      deps.goToReview();
    }),
  );
  wrap.append(nav);
  wrap.append(deps.renderToolDraftBar());
  if (isLast) {
    wrap.append(legalDisclaimer());
  }
  return wrap;
}

function renderField(
  deps: WizardPageDeps,
  field: {
    id: string;
    label: string;
    placeholder: string;
    type: string;
    path: string;
  },
): HTMLElement {
  const val = deps.getValues()[field.path];

  if (field.type === "toggle") {
    const row = el("label", "oat-toggle");
    const input = document.createElement("input");
    input.type = "checkbox";
    input.checked = val === true || val === "true";
    input.addEventListener("change", () => {
      deps.setValue(field.path, input.checked);
      deps.render();
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
    ta.addEventListener("input", () => deps.setValue(field.path, ta.value));
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
        deps.setValue(field.path, "");
        return;
      }
      const n = Number(input.value);
      if (Number.isNaN(n)) return;
      deps.setValue(field.path, n);
    } else {
      deps.setValue(field.path, input.value);
    }
  });
  box.append(input);
  return box;
}

function renderOptionsStep(
  deps: WizardPageDeps,
  t: TemplateDoc,
): HTMLElement {
  if (deps.isOn("options.contacts")) deps.autofillContactsFromParties();
  if (deps.isOn("options.notices")) deps.autofillNoticesFromParties();

  const wrap = el("div", "oat-options-step");

  const tip = el("p", "oat-options-tip");
  tip.textContent =
    "Cada bloque es opcional. Abrir solo lo que haga falta; lo demás no se incluye. El orden del documento sigue la lógica contractual (custodia → seguros → valor → operación → cierre); algunos bloques del formulario se reordenan ahí.";
  wrap.append(tip);

  const presets = el("div", "oat-presets");
  presets.setAttribute("role", "group");
  presets.setAttribute("aria-label", "Presets de cláusulas opcionales");
  presets.append(
    btn("Esencial", "oat-btn oat-btn-ghost oat-preset-btn", () =>
      deps.applyOptionsPreset("essential"),
    ),
    btn("Exhibición completa", "oat-btn oat-btn-ghost oat-preset-btn", () =>
      deps.applyOptionsPreset("full"),
    ),
    btn("Todo", "oat-btn oat-btn-ghost oat-preset-btn", () =>
      deps.applyOptionsPreset("all"),
    ),
  );
  const presetHelp = el("p", "oat-preset-help");
  presetHelp.textContent =
    "Atajos: Esencial (acta, certificados, franquicia, peritaje, cambios y avisos). Exhibición completa (+ espacio, transporte, contactos, imagen, PI y reparaciones). Todo (todos los bloques).";
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
    const master = OPTION_GROUP_MASTER[group.name];
    const included = master ? deps.isOn(master) : true;
    const visibleFields = group.fields.filter((f) =>
      fieldVisible(f, deps.getValues()),
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
    let grid: HTMLElement | null = null;
    for (const field of visibleFields) {
      const node = renderField(deps, field);
      if (node.classList.contains("oat-toggle")) {
        grid = null;
        body.append(node);
        continue;
      }
      if (!grid) {
        grid = el("div", "oat-fields");
        body.append(grid);
      }
      grid.append(node);
    }
    details.append(body);
    wrap.append(details);
  }

  return wrap;
}
