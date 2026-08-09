/**
 * Copyright (C) 2026 Gerard Valls Montaño
 * SPDX-License-Identifier: AGPL-3.0-or-later
 *
 * Default wizard toggles and optional-clause group masters for the exhibition tool.
 */

import type { AppValues } from "../engine/types";

/** Sensible defaults for the exhibition tool — all can be changed in the wizard. */
export const DEFAULT_TOGGLES: AppValues = {
  "features.interactive": true,
  "features.hasSculptures": false,
  "features.mechanical": true,
  "features.electrical": true,
  "features.electronics": false,
  "features.moving": false,
  "features.specialRisk": false,
  "features.hasExtra": false,
  "features.needsPower": true,
  "features.accessibleWhenOff": true,
  "features.needsWatch": true,
  "features.needsSecurityPerimeter": false,
  "features.outdoor": false,
  "custody.authorMounts": true,
  "custody.dailyRemove": false,
  "custody.weatherProtect": false,
  "insurance.hasRc": true,
  "insurance.hasNailToNail": true,
  "options.imageUse": false,
  "options.imageCommercial": false,
  "options.imageAdapt": false,
  "options.saleTerms": false,
  "options.saleNoExclusivity": true,
  "options.transport": false,
  "options.costs": false,
  "options.costsNoFee": false,
  "options.cancellation": false,
  "options.contacts": false,
  "options.inventory": false,
  "options.spaceAccess": false,
  "options.subcontract": false,
  "options.ipRights": false,
  "options.repairs": false,
  "options.amendments": true,
  "options.notices": true,
  "options.deliveryAct": true,
  "options.policyCerts": true,
  "options.franchise": true,
  "options.jurisdiction": false,
  "options.independentExpert": true,
  "options.forceMajeure": false,
};

/** Master toggle path for each options form group. */
export const OPTION_GROUP_MASTER: Record<string, string> = {
  "Espacio y accesos": "options.spaceAccess",
  Inventario: "options.inventory",
  "Acta de entrega y devolución": "options.deliveryAct",
  "Certificados de póliza": "options.policyCerts",
  "Franquicia del seguro": "options.franchise",
  "Peritaje si hay pérdida artística": "options.independentExpert",
  Transporte: "options.transport",
  "Remuneración y gastos": "options.costs",
  "Contactos del día a día": "options.contacts",
  Subcontratación: "options.subcontract",
  "Cambios de ubicación o instalación": "options.amendments",
  Reparaciones: "options.repairs",
  "Fotos, vídeo y reproducción": "options.imageUse",
  "Propiedad intelectual": "options.ipRights",
  "Si también se contempla vender la obra": "options.saleTerms",
  "Cancelación o retirada anticipada": "options.cancellation",
  "Emails para avisos formales": "options.notices",
  "Fuerza mayor": "options.forceMajeure",
  "Ley y tribunales": "options.jurisdiction",
};

export const ALL_OPTION_MASTERS = Object.values(OPTION_GROUP_MASTER);

export const OPTIONAL_SCOPE_LABELS = Object.entries(OPTION_GROUP_MASTER).map(
  ([label, path]) => ({ path, label }),
);
