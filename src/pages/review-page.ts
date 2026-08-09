/**
 * Copyright (C) 2026 Gerard Valls Montaño
 * SPDX-License-Identifier: AGPL-3.0-or-later
 *
 * Review (clause editor) and accept (editable preview + export) pages.
 */

import { btn, el } from "../dom";
import { ensurePlaceAtEnd, missingRequired } from "../engine/assemble";
import type { AppValues, Clause, TemplateDoc } from "../engine/types";
import {
  copyText,
  downloadHtml,
  downloadText,
  exportPdfViaPrint,
} from "../export/pdf";
import { legalDisclaimer } from "../shell";
import { enrichDerivedValues } from "../templates/exhibition-custody-es";
import { confirmAction, notify } from "../ui/dialogs";
import { renderEditablePreview } from "../ui/editable-preview";

export type ReviewPageDeps = {
  getTemplate: () => TemplateDoc;
  getValues: () => AppValues;
  getClauses: () => Clause[];
  setClauses: (clauses: Clause[]) => void;
  getAcceptedFinal: () => boolean;
  setAcceptedFinal: (value: boolean) => void;
  setManualOverride: (value: boolean) => void;
  setPhase: (phase: "wizard" | "review" | "accept") => void;
  setStepIndex: (index: number) => void;
  render: () => void;
  renderToolDraftBar: () => HTMLElement;
  activeOptionalScopeLabels: () => string[];
};

export function renderReview(deps: ReviewPageDeps): HTMLElement {
  const t = deps.getTemplate();
  deps.setClauses(ensurePlaceAtEnd(deps.getClauses(), t));
  const wrap = el("div", "oat-step");

  const h2 = el("h2");
  h2.textContent = "Revisión del documento";
  wrap.append(h2);

  const note = el("p", "oat-review-note");
  note.textContent =
    "Se puede editar cualquier cláusula. Las firmas quedan siempre al final. Los huecos sin rellenar aparecen entre corchetes.";
  wrap.append(note);

  const scope = el("p", "oat-scope-summary");
  const active = deps.activeOptionalScopeLabels();
  scope.textContent = active.length
    ? `Bloques opcionales activos: ${active.join(", ")}.`
    : "Bloques opcionales activos: ninguno extra.";
  wrap.append(scope);

  const missing = missingRequired(t, deps.getValues());
  if (missing.length) {
    const warn = el("p", "oat-gap-warn");
    warn.textContent = `Campos pendientes: ${missing.map((m) => m.label).join(", ")}.`;
    wrap.append(warn);
  }

  const goBack = () => {
    deps.setPhase("wizard");
    deps.setStepIndex(t.steps.length - 1);
    deps.render();
  };
  const goAccept = () => {
    deps.setClauses(ensurePlaceAtEnd(deps.getClauses(), t));
    deps.setAcceptedFinal(false);
    deps.setPhase("accept");
    deps.render();
  };
  const addClause = () => {
    deps.setManualOverride(true);
    const clause: Clause = {
      id: `user-${crypto.randomUUID().slice(0, 8)}`,
      title: "Nueva cláusula",
      body: "Indicar aquí el texto de la cláusula.",
      enabled: true,
      source: "user",
    };
    const clauses = [...deps.getClauses()];
    const insertAt = clauses.findIndex((c) => c.placeAtEnd);
    if (insertAt === -1) clauses.push(clause);
    else clauses.splice(insertAt, 0, clause);
    deps.setClauses(ensurePlaceAtEnd(clauses, t));
    deps.render();
  };

  const toolbar = el("div", "oat-review-toolbar");
  toolbar.append(
    btn("← Volver al asistente", "oat-btn oat-btn-ghost", goBack),
    btn("Añadir cláusula", "oat-btn oat-btn-ghost", addClause),
    btn("Continuar a aceptación", "oat-btn", goAccept),
  );
  wrap.append(toolbar);

  deps.getClauses().forEach((clause, index) => {
    wrap.append(renderClauseEditor(deps, clause, index));
  });

  const toolbarEnd = el("div", "oat-review-toolbar oat-review-toolbar-end");
  toolbarEnd.append(
    btn("← Volver al asistente", "oat-btn oat-btn-ghost", goBack),
    btn("Continuar a aceptación", "oat-btn", goAccept),
  );
  wrap.append(toolbarEnd, deps.renderToolDraftBar(), legalDisclaimer());
  return wrap;
}

export function renderAccept(deps: ReviewPageDeps): HTMLElement {
  const t = deps.getTemplate();
  deps.setClauses(ensurePlaceAtEnd(deps.getClauses(), t));
  const wrap = el("div", "oat-step");

  const h2 = el("h2");
  h2.textContent = "Aceptación y previsualización";
  wrap.append(h2);

  const note = el("p", "oat-review-note");
  note.textContent =
    "El documento se puede editar directamente en la previsualización. Cuando esté listo, se confirma debajo y se exporta. Para PDF se usa el diálogo de impresión del navegador.";
  wrap.append(note, legalDisclaimer());

  const gaps = missingRequired(t, deps.getValues());
  if (gaps.length) {
    const warn = el("p", "oat-gap-warn");
    warn.textContent = `Campos pendientes antes de exportar: ${gaps.map((m) => m.label).join(", ")}.`;
    wrap.append(warn);
  }

  const enriched = enrichDerivedValues(deps.getValues());
  const docTitle =
    String(enriched["document.title"] || "").trim() ||
    String(deps.getValues()["project.workTitle"] || "").trim() ||
    t.name;

  const previewLabel = el("div", "oat-group-label");
  previewLabel.textContent = "Previsualización editable";
  const previewHelp = el("p", "oat-review-note");
  previewHelp.textContent =
    "Se pueden editar títulos o textos haciendo clic. Los cambios se guardan en este documento (solo en esta pestaña).";

  const buttons: HTMLButtonElement[] = [];
  const hint = el("p", "oat-review-note");
  hint.textContent =
    "Marcar la casilla de aceptación para habilitar la exportación.";
  hint.hidden = Boolean(deps.getAcceptedFinal());

  const acceptBox = el("label", "oat-accept-box");
  const cb = document.createElement("input");
  cb.type = "checkbox";
  cb.checked = Boolean(deps.getAcceptedFinal());

  const syncAcceptUi = () => {
    for (const b of buttons) b.disabled = !deps.getAcceptedFinal();
    hint.hidden = Boolean(deps.getAcceptedFinal());
    cb.checked = Boolean(deps.getAcceptedFinal());
  };

  const markEdited = () => {
    deps.setManualOverride(true);
    if (deps.getAcceptedFinal()) {
      deps.setAcceptedFinal(false);
      syncAcceptUi();
    }
  };

  const paper = renderEditablePreview(deps.getClauses(), docTitle, {
    onEdit: markEdited,
    updateClause: (id, patch) => {
      const clauses = [...deps.getClauses()];
      const idx = clauses.findIndex((c) => c.id === id);
      if (idx < 0) return;
      clauses[idx] = {
        ...clauses[idx],
        ...patch,
        source: "user",
      };
      deps.setClauses(clauses);
    },
  });
  wrap.append(previewLabel, previewHelp, paper);

  const runExport = async (fn: () => void | Promise<void>) => {
    if (!deps.getAcceptedFinal()) return;
    const pending = missingRequired(t, deps.getValues());
    if (pending.length) {
      const ok = await confirmAction(
        `Hay campos sin rellenar (${pending.map((p) => p.label).join(", ")}). ¿Exportar igual con huecos entre corchetes?`,
      );
      if (!ok) return;
    }
    await fn();
  };

  const exports = el("div", "oat-review-toolbar");
  buttons.push(
    btn("Exportar PDF", "oat-btn", () =>
      void runExport(() => exportPdfViaPrint(deps.getClauses(), docTitle)),
    ),
    btn("Descargar HTML", "oat-btn oat-btn-ghost", () =>
      void runExport(() => downloadHtml(deps.getClauses(), docTitle)),
    ),
    btn("Descargar TXT", "oat-btn oat-btn-ghost", () =>
      void runExport(() => downloadText(deps.getClauses(), docTitle)),
    ),
    btn("Copiar texto", "oat-btn oat-btn-ghost", () =>
      void runExport(async () => {
        try {
          await copyText(deps.getClauses(), docTitle);
          await notify("Texto copiado al portapapeles.");
        } catch {
          await notify("No se pudo copiar. Prueba a descargar TXT.");
        }
      }),
    ),
  );
  for (const b of buttons) {
    b.disabled = !deps.getAcceptedFinal();
    exports.append(b);
  }

  cb.addEventListener("change", () => {
    deps.setAcceptedFinal(cb.checked);
    syncAcceptUi();
  });
  const span = el("span");
  span.textContent =
    "Se acepta el documento tal como está mostrado en la previsualización.";
  acceptBox.append(cb, span);

  const toolbar = el("div", "oat-review-toolbar");
  toolbar.append(
    btn("← Volver a editar", "oat-btn oat-btn-ghost", () => {
      deps.setAcceptedFinal(false);
      deps.setPhase("review");
      deps.render();
    }),
  );

  wrap.append(acceptBox, hint, toolbar, exports, deps.renderToolDraftBar());
  return wrap;
}

function renderClauseEditor(
  deps: ReviewPageDeps,
  clause: Clause,
  index: number,
): HTMLElement {
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
    deps.setManualOverride(true);
    const clauses = [...deps.getClauses()];
    clauses[index] = { ...clause, enabled: enabled.checked };
    deps.setClauses(clauses);
    deps.render();
  });

  const title = document.createElement("input");
  title.type = "text";
  title.value = clause.title;
  title.setAttribute("aria-label", "Título de la cláusula");
  title.addEventListener("input", () => {
    deps.setManualOverride(true);
    const clauses = [...deps.getClauses()];
    clauses[index] = {
      ...clauses[index],
      title: title.value,
      source: "user",
    };
    deps.setClauses(clauses);
  });
  head.append(enabled, title);
  box.append(head);

  const body = document.createElement("textarea");
  body.value = clause.body;
  body.setAttribute("aria-label", "Texto de la cláusula");
  body.addEventListener("input", () => {
    deps.setManualOverride(true);
    const clauses = [...deps.getClauses()];
    clauses[index] = {
      ...clauses[index],
      body: body.value,
      source: "user",
    };
    deps.setClauses(clauses);
  });
  box.append(body);

  const actions = el("div", "oat-clause-actions");
  if (clause.placeAtEnd) {
    const lock = el("span", "oat-review-note");
    lock.textContent = "Bloque de firmas — siempre al final del documento.";
    actions.append(lock);
  } else {
    actions.append(
      mini("Subir", () => moveClause(deps, index, -1)),
      mini("Bajar", () => moveClause(deps, index, 1)),
      mini("Duplicar", () => {
        deps.setManualOverride(true);
        const clauses = [...deps.getClauses()];
        clauses.splice(index + 1, 0, {
          ...clause,
          id: `user-${crypto.randomUUID().slice(0, 8)}`,
          source: "user",
          placeAtEnd: false,
        });
        deps.setClauses(ensurePlaceAtEnd(clauses, deps.getTemplate()));
        deps.render();
      }),
      mini("Eliminar", () => {
        deps.setManualOverride(true);
        const clauses = [...deps.getClauses()];
        clauses.splice(index, 1);
        deps.setClauses(ensurePlaceAtEnd(clauses, deps.getTemplate()));
        deps.render();
      }),
    );
  }
  box.append(actions);
  return box;
}

function moveClause(
  deps: ReviewPageDeps,
  index: number,
  delta: number,
): void {
  const clauses = deps.getClauses();
  const next = index + delta;
  if (next < 0 || next >= clauses.length) return;
  if (clauses[index]?.placeAtEnd) return;
  if (clauses[next]?.placeAtEnd && delta > 0) return;
  deps.setManualOverride(true);
  const arr = [...clauses];
  const [item] = arr.splice(index, 1);
  arr.splice(next, 0, item);
  deps.setClauses(ensurePlaceAtEnd(arr, deps.getTemplate()));
  deps.render();
}

function mini(label: string, onClick: () => void): HTMLButtonElement {
  return btn(label, "oat-mini", onClick);
}
