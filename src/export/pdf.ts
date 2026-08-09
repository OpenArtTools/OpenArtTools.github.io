/**
 * Copyright (C) 2026 Gerard Valls Montaño
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { documentText } from "../engine/assemble";
import type { Clause } from "../engine/types";
import { escapeHtml } from "../dom";
import { TRANSPARENCY } from "../platform";
import { downloadBlob } from "../storage/jsonFile";
import { notify } from "../ui/dialogs";

/**
 * Export HTML CSP (parity with draft HTML): default-src 'none'.
 * style-src 'unsafe-inline' is required so the embedded print stylesheet applies;
 * no scripts, frames, or network fetches are allowed in the exported document.
 */
const EXPORT_HTML_CSP =
  "default-src 'none'; style-src 'unsafe-inline'; img-src data:; base-uri 'none'; form-action 'none'; frame-ancestors 'none'; script-src 'none'";

function fileBaseName(docTitle: string): string {
  const cleaned = docTitle
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 56);
  return cleaned || "documento-openarttools";
}

function clausesToHtml(clauses: Clause[], docTitle: string): string {
  const blocks = clauses
    .filter((c) => c.enabled)
    .map((c) => {
      const endAttr = c.placeAtEnd ? ' data-end="true"' : "";
      const heading = c.title.trim()
        ? `<h2>${escapeHtml(c.title)}</h2>`
        : "";
      return `<section class="pdf-clause"${endAttr}>${heading}<pre class="pdf-body">${escapeHtml(c.body)}</pre></section>`;
    })
    .join("\n");

  return `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="utf-8"/>
<meta http-equiv="Content-Security-Policy" content="${EXPORT_HTML_CSP}"/>
<title>${escapeHtml(docTitle)}</title>
<style>
  @page {
    size: A4;
    margin: 22mm 18mm 24mm 18mm;
  }
  body {
    font-family: "Times New Roman", Times, serif;
    font-size: 11pt;
    line-height: 1.45;
    color: #111;
    max-width: 180mm;
    margin: 0 auto;
    padding: 12mm 12mm 20mm;
  }
  h1 { font-size: 14pt; margin: 0 0 1.2em; }
  h2 { font-size: 12pt; margin: 1.6em 0 0.6em; page-break-after: avoid; }
  .pdf-body {
    white-space: pre-wrap;
    font-family: inherit;
    font-size: inherit;
    margin: 0;
  }
  .pdf-clause { break-inside: avoid; }
  .pdf-clause[data-end="true"] { break-before: avoid; margin-top: 2em; }
  .hint {
    font-family: Helvetica, Arial, sans-serif;
    font-size: 9pt;
    color: #666;
    margin-bottom: 2em;
  }
  .screen-page-note {
    font-family: Helvetica, Arial, sans-serif;
    font-size: 8.5pt;
    color: #888;
    margin-top: 2.5em;
    border-top: 1px solid #ddd;
    padding-top: 0.6em;
  }
</style>
</head>
<body>
  <p class="hint">${escapeHtml(TRANSPARENCY.documentHint)}</p>
  <h1>${escapeHtml(docTitle)}</h1>
  ${blocks}
  <p class="screen-page-note">${escapeHtml(TRANSPARENCY.printPdfNote)}</p>
</body>
</html>`;
}

/** Open print dialog so the user can save as PDF locally (iframe, no popup blocker). */
export async function exportPdfViaPrint(
  clauses: Clause[],
  docTitle: string,
): Promise<void> {
  const html = clausesToHtml(clauses, docTitle);
  const iframe = document.createElement("iframe");
  iframe.setAttribute("aria-hidden", "true");
  // Print iframe sandbox: same-origin for print; no allow-scripts.
  iframe.setAttribute("sandbox", "allow-same-origin allow-modals");
  iframe.title = "Impresión";
  iframe.style.cssText =
    "position:fixed;right:0;bottom:0;width:0;height:0;border:0;opacity:0;pointer-events:none";
  document.body.appendChild(iframe);

  const w = iframe.contentWindow;
  if (!w) {
    iframe.remove();
    await notify("No se pudo preparar la impresión. Usa «Descargar HTML».");
    return;
  }

  w.document.open();
  w.document.write(html);
  w.document.close();

  const cleanup = () => {
    iframe.remove();
  };
  w.addEventListener("afterprint", cleanup);
  setTimeout(() => {
    try {
      w.focus();
      w.print();
    } catch {
      void notify("No se pudo abrir la impresión. Usa «Descargar HTML».");
    }
    setTimeout(cleanup, 2500);
  }, 300);
}

export function downloadHtml(clauses: Clause[], docTitle: string): void {
  downloadBlob(
    `${fileBaseName(docTitle)}.html`,
    new Blob([clausesToHtml(clauses, docTitle)], {
      type: "text/html;charset=utf-8",
    }),
  );
}

export function downloadText(clauses: Clause[], docTitle: string): void {
  const text = `${docTitle}\n\n${TRANSPARENCY.documentHint}\n\n${documentText(clauses)}`;
  downloadBlob(
    `${fileBaseName(docTitle)}.txt`,
    new Blob([text], { type: "text/plain;charset=utf-8" }),
  );
}

export function copyText(clauses: Clause[], docTitle?: string): Promise<void> {
  const body = documentText(clauses);
  const text = docTitle
    ? `${docTitle}\n\n${TRANSPARENCY.documentHint}\n\n${body}`
    : body;
  return navigator.clipboard.writeText(text);
}
