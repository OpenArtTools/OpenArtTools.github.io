/**
 * Copyright (C) 2026 Gerard Valls Montaño
 * SPDX-License-Identifier: AGPL-3.0-or-later
 *
 * Accessible modal dialogs — replace window.alert / window.confirm.
 */

function trapFocusPrimary(dialog: HTMLElement, primary: HTMLElement): void {
  primary.focus();
  dialog.addEventListener("keydown", (ev) => {
    if (ev.key !== "Tab") return;
    const focusable = dialog.querySelectorAll<HTMLElement>(
      'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
    );
    if (focusable.length === 0) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (ev.shiftKey && document.activeElement === first) {
      ev.preventDefault();
      last.focus();
    } else if (!ev.shiftKey && document.activeElement === last) {
      ev.preventDefault();
      first.focus();
    }
  });
}

function openDialog(opts: {
  message: string;
  confirmLabel: string;
  cancelLabel?: string;
}): Promise<boolean> {
  return new Promise((resolve) => {
    const backdrop = document.createElement("div");
    backdrop.className = "oat-dialog-backdrop";
    backdrop.setAttribute("role", "presentation");

    const dialog = document.createElement("div");
    dialog.className = "oat-dialog";
    dialog.setAttribute("role", "alertdialog");
    dialog.setAttribute("aria-modal", "true");
    dialog.setAttribute("aria-labelledby", "oat-dialog-message");

    const message = document.createElement("p");
    message.id = "oat-dialog-message";
    message.className = "oat-dialog-message";
    message.textContent = opts.message;

    const actions = document.createElement("div");
    actions.className = "oat-dialog-actions";

    const confirmBtn = document.createElement("button");
    confirmBtn.type = "button";
    confirmBtn.className = "oat-btn";
    confirmBtn.textContent = opts.confirmLabel;

    let settled = false;
    const close = (result: boolean) => {
      if (settled) return;
      settled = true;
      document.removeEventListener("keydown", onKey);
      backdrop.remove();
      resolve(result);
    };

    const onKey = (ev: KeyboardEvent) => {
      if (ev.key === "Escape") {
        ev.preventDefault();
        close(false);
      }
    };

    confirmBtn.addEventListener("click", () => close(true));
    actions.append(confirmBtn);

    if (opts.cancelLabel !== undefined) {
      const cancelBtn = document.createElement("button");
      cancelBtn.type = "button";
      cancelBtn.className = "oat-btn oat-btn-ghost";
      cancelBtn.textContent = opts.cancelLabel;
      cancelBtn.addEventListener("click", () => close(false));
      actions.append(cancelBtn);
    }

    dialog.append(message, actions);
    backdrop.append(dialog);
    document.body.append(backdrop);
    document.addEventListener("keydown", onKey);
    trapFocusPrimary(dialog, confirmBtn);
  });
}

/** Modal notice; Escape or primary button dismisses. */
export function notify(message: string): Promise<void> {
  return openDialog({ message, confirmLabel: "Aceptar" }).then(() => undefined);
}

/** Modal confirm; Escape / cancel → false, confirm → true. */
export function confirmAction(
  message: string,
  opts?: { confirmLabel?: string; cancelLabel?: string },
): Promise<boolean> {
  return openDialog({
    message,
    confirmLabel: opts?.confirmLabel ?? "Confirmar",
    cancelLabel: opts?.cancelLabel ?? "Cancelar",
  });
}
