/**
 * Copyright (C) 2026 Gerard Valls Montaño
 * SPDX-License-Identifier: AGPL-3.0-or-later
 *
 * Contenteditable document preview (in-page, not an iframe).
 */

import type { Clause } from "../engine/types";
import { el } from "../dom";
import { TRANSPARENCY } from "../platform";

export type EditablePreviewCallbacks = {
  onEdit: () => void;
  updateClause: (
    id: string,
    patch: { title?: string; body?: string },
  ) => void;
};

/** White paper preview: edit titles/bodies in place; syncs via callbacks. */
export function renderEditablePreview(
  clauses: Clause[],
  docTitle: string,
  callbacks: EditablePreviewCallbacks,
): HTMLElement {
  const paper = el("div", "oat-live-preview");
  paper.setAttribute("role", "region");
  paper.setAttribute("aria-label", "Previsualización editable del documento");

  const hint = el("p", "oat-live-preview-hint");
  hint.textContent = TRANSPARENCY.documentHint;

  const title = document.createElement("h1");
  title.className = "oat-live-preview-title";
  title.textContent = docTitle;

  paper.append(hint, title);

  for (const clause of clauses) {
    if (!clause.enabled) continue;
    const section = el("section", "oat-live-clause");
    if (clause.placeAtEnd) section.dataset.end = "true";
    section.dataset.clauseId = clause.id;

    const heading = document.createElement("h2");
    heading.contentEditable = "true";
    heading.spellcheck = true;
    heading.setAttribute("aria-label", "Título de la cláusula");
    heading.textContent = clause.title;
    if (!clause.title.trim()) {
      heading.hidden = true;
    }
    heading.addEventListener("keydown", (ev) => {
      if (ev.key === "Enter") ev.preventDefault();
    });
    heading.addEventListener("paste", (ev) => {
      ev.preventDefault();
      const text = ev.clipboardData?.getData("text/plain") ?? "";
      document.execCommand("insertText", false, text.replace(/\s+/g, " ").trim());
    });
    heading.addEventListener("input", () => {
      callbacks.updateClause(clause.id, { title: heading.textContent ?? "" });
      callbacks.onEdit();
    });

    const body = document.createElement("div");
    body.className = "oat-live-clause-body";
    body.contentEditable = "true";
    body.spellcheck = true;
    body.setAttribute("role", "textbox");
    body.setAttribute("aria-multiline", "true");
    const labelTitle = clause.title.trim() || "cláusula";
    body.setAttribute("aria-label", `Texto de la cláusula: ${labelTitle}`);
    body.textContent = clause.body;
    body.addEventListener("paste", (ev) => {
      ev.preventDefault();
      const text = ev.clipboardData?.getData("text/plain") ?? "";
      document.execCommand("insertText", false, text);
    });
    body.addEventListener("input", () => {
      callbacks.updateClause(clause.id, {
        body: body.innerText.replace(/\u00a0/g, " "),
      });
      callbacks.onEdit();
    });

    section.append(heading, body);
    paper.append(section);
  }

  const foot = el("p", "oat-live-preview-foot");
  foot.textContent = TRANSPARENCY.printPdfNote;
  paper.append(foot);
  return paper;
}
