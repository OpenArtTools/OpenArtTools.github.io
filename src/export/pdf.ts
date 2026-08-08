/**
 * Copyright 2026 Gerard Valls Montaño
 * Licensed under the Apache License, Version 2.0
 */

import type { Clause } from "../engine/types";

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

const LEGAL_HINT =
  "Open Art Tools — plantilla orientativa. Este documento no ha sido revisado por abogados ni por ningún profesional del derecho y no constituye asesoramiento legal.";

export function clausesToHtml(clauses: Clause[], docTitle: string): string {
  const blocks = clauses
    .filter((c) => c.enabled)
    .map(
      (c) =>
        `<section class="pdf-clause"><h2>${escapeHtml(c.title)}</h2><pre class="pdf-body">${escapeHtml(c.body)}</pre></section>`,
    )
    .join("\n");

  return `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="utf-8"/>
<title>${escapeHtml(docTitle)}</title>
<style>
  @page {
    size: A4;
    margin: 22mm 18mm 28mm 18mm;
    @bottom-center {
      content: "Página " counter(page) " de " counter(pages);
      font-family: Helvetica, Arial, sans-serif;
      font-size: 9pt;
      color: #444;
    }
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
  <p class="hint">${escapeHtml(LEGAL_HINT)}</p>
  <h1>${escapeHtml(docTitle)}</h1>
  ${blocks}
  <p class="screen-page-note">Al imprimir o guardar como PDF, cada página se numera automáticamente («Página X de Y»).</p>
</body>
</html>`;
}

/** Open print dialog so the user can save as PDF locally. */
export function exportPdfViaPrint(clauses: Clause[], docTitle: string): void {
  const html = clausesToHtml(clauses, docTitle);
  const w = window.open("", "_blank", "noopener,noreferrer,width=900,height=700");
  if (!w) {
    alert(
      "No se pudo abrir la ventana de impresión. Permite ventanas emergentes o usa «Descargar HTML».",
    );
    return;
  }
  w.document.open();
  w.document.write(html);
  w.document.close();
  w.focus();
  setTimeout(() => {
    w.print();
  }, 250);
}

export function downloadHtml(clauses: Clause[], docTitle: string): void {
  const html = clausesToHtml(clauses, docTitle);
  const blob = new Blob([html], { type: "text/html;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "contrato-openarttools.html";
  a.click();
  URL.revokeObjectURL(url);
}

export function downloadText(clauses: Clause[], docTitle: string): void {
  const text =
    `${docTitle}\n\n${LEGAL_HINT}\n\n` +
    clauses
      .filter((c) => c.enabled)
      .map((c) => `${c.title}\n\n${c.body}`)
      .join("\n\n────────────────\n\n");
  const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "contrato-openarttools.txt";
  a.click();
  URL.revokeObjectURL(url);
}

export function copyText(clauses: Clause[]): Promise<void> {
  const text = clauses
    .filter((c) => c.enabled)
    .map((c) => `${c.title}\n\n${c.body}`)
    .join("\n\n");
  return navigator.clipboard.writeText(text);
}

export { LEGAL_HINT };
