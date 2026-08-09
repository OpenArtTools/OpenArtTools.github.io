/**
 * Copyright (C) 2026 Gerard Valls Montaño
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { describe, expect, it } from "vitest";
import {
  assembleClauses,
  fillPlaceholders,
  clauseAllowed,
} from "./assemble";
import {
  enrichDerivedValues,
  exhibitionCustodyEs,
} from "../templates/exhibition-custody-es";

describe("fillPlaceholders", () => {
  it("uses empty markers, never invented names", () => {
    const fields = exhibitionCustodyEs.fields;
    const out = fillPlaceholders(
      "Titularidad de la obra: {{parties.author.name}}",
      {},
      fields,
    );
    expect(out).toBe(
      "Titularidad de la obra: [nombre completo — titularidad de la obra]",
    );
    expect(out.toLowerCase()).not.toContain("gerard");
  });

  it("fills provided values", () => {
    const out = fillPlaceholders(
      "{{project.workTitle}}",
      { "project.workTitle": "Obra de prueba" },
      exhibitionCustodyEs.fields,
    );
    expect(out).toBe("Obra de prueba");
  });
});

describe("assembleClauses", () => {
  it("includes special risk content when toggle is on", () => {
    const values = enrichDerivedValues({
      "features.specialRisk": true,
      "features.specialRiskDesc":
        "elemento de alta temperatura integrado en el sistema artístico",
      "custody.authorMounts": true,
      "insurance.hasRc": true,
      "insurance.hasNailToNail": true,
      "features.needsWatch": true,
    });
    const clauses = assembleClauses(exhibitionCustodyEs, values);
    const segunda = clauses.find((c) => c.id === "segunda");
    expect(segunda?.body).toContain(
      "elemento de alta temperatura integrado en el sistema artístico",
    );
    expect(segunda?.body.toLowerCase()).not.toContain("pistola");
  });

  it("keeps signatures after optional clauses", () => {
    const values = enrichDerivedValues({
      "custody.authorMounts": true,
      "options.deliveryAct": true,
      "options.policyCerts": true,
      "options.franchise": true,
      "insurance.hasRc": true,
      "insurance.hasNailToNail": true,
    });
    const clauses = assembleClauses(exhibitionCustodyEs, values);
    const ids = clauses.map((c) => c.id);
    expect(ids[ids.length - 1]).toBe("signatures");
    expect(ids.indexOf("decima")).toBeLessThan(ids.indexOf("opt_acta"));
    expect(ids.indexOf("opt_franq")).toBeLessThan(ids.indexOf("signatures"));
    expect(clauses.find((c) => c.id === "decima")?.body).not.toContain(
      "TITULARIDAD DE LA OBRA",
    );
    expect(clauses.find((c) => c.id === "signatures")?.body).toContain(
      "TITULARIDAD DE LA OBRA",
    );
  });

  it("includes loan, image and sale optional clauses when enabled", () => {
    const values = enrichDerivedValues({
      "custody.authorMounts": true,
      "insurance.hasRc": true,
      "insurance.hasNailToNail": true,
      "options.loanFrame": true,
      "options.loanPurpose": "exhibición temporal en el evento",
      "options.imageUse": true,
      "options.imageScope": "vista general de la instalación",
      "options.imageMedia": "web y catálogo",
      "options.imageDuration": "durante el evento",
      "options.imageCredit": "crédito de la obra",
      "options.imageCommercial": false,
      "options.imageAdapt": true,
      "options.saleTerms": true,
      "options.salePrice": "12000",
      "options.saleDelivery": "tras el cierre del evento",
      "options.saleNoExclusivity": true,
    });
    const clauses = assembleClauses(exhibitionCustodyEs, values);
    const ids = clauses.map((c) => c.id);
    expect(ids).toContain("opt_loan");
    expect(ids).toContain("opt_image");
    expect(ids).toContain("opt_sale");
    expect(ids[ids.length - 1]).toBe("signatures");
    expect(clauses.find((c) => c.id === "opt_loan")?.body).toContain(
      "préstamo o cesión temporal",
    );
    expect(clauses.find((c) => c.id === "opt_image")?.body).toContain(
      "web y catálogo",
    );
    expect(clauses.find((c) => c.id === "opt_sale")?.body).toContain("12000");
  });

  it("includes the extended optional operational clauses when enabled", () => {
    const values = enrichDerivedValues({
      "custody.authorMounts": true,
      "insurance.hasRc": true,
      "insurance.hasNailToNail": true,
      "options.transport": true,
      "options.transportOrganizer": "la Parte Solicitante",
      "options.transportPayer": "la Parte Solicitante",
      "options.transportPickup": "taller",
      "options.transportReturn": "taller",
      "options.costs": true,
      "options.costsNoFee": true,
      "options.costsSummary": "material de montaje a cargo de la Parte Solicitante",
      "options.cancellation": true,
      "options.cancellationTerms": "si el evento se cancela, se devuelve la obra",
      "options.withdrawalTerms": "si faltan seguros, se puede retirar",
      "options.contacts": true,
      "options.contactTitularName": "Persona A",
      "options.contactTitularPhone": "600000000",
      "options.contactTitularEmail": "a@ejemplo.test",
      "options.contactOrgName": "Persona B",
      "options.contactOrgPhone": "600000001",
      "options.contactOrgEmail": "b@ejemplo.test",
      "options.inventory": true,
      "options.inventoryList": "pieza 1\npieza 2",
      "options.spaceAccess": true,
      "options.spaceDescription": "sala principal",
      "options.spaceHours": "9:00-14:00",
      "options.spaceEquipment": "barreras a cargo de la Parte Solicitante",
      "options.subcontract": true,
      "options.subcontractTerms": "puede subcontratarse seguridad",
      "options.ipRights": true,
      "options.ipNameUse": "crédito obligatorio en cartela",
      "options.amendments": true,
      "options.notices": true,
      "options.noticeEmailTitular": "avisos-a@ejemplo.test",
      "options.noticeEmailOrg": "avisos-b@ejemplo.test",
    });
    const clauses = assembleClauses(exhibitionCustodyEs, values);
    const ids = clauses.map((c) => c.id);
    for (const id of [
      "opt_transport",
      "opt_costs",
      "opt_cancellation",
      "opt_contacts",
      "opt_inventory",
      "opt_space",
      "opt_subcontract",
      "opt_ip",
      "opt_amendments",
      "opt_notices",
    ]) {
      expect(ids).toContain(id);
    }
    expect(ids[ids.length - 1]).toBe("signatures");
    expect(clauses.find((c) => c.id === "opt_inventory")?.body).toContain(
      "— pieza 1",
    );
    expect(clauses.find((c) => c.id === "opt_inventory")?.body).toContain(
      "referencia vinculante",
    );
    expect(clauses.find((c) => c.id === "opt_transport")?.body).toContain(
      "embalaje adecuado",
    );
    expect(clauses.find((c) => c.id === "opt_costs")?.body).toContain(
      "gasto adicional",
    );
    expect(clauses.find((c) => c.id === "opt_cancellation")?.body).toContain(
      "incumplimiento grave de custodia",
    );
    expect(clauses.find((c) => c.id === "opt_subcontract")?.body).toContain(
      "sigue siendo plenamente responsable",
    );
    expect(clauses.find((c) => c.id === "opt_space")?.body).toContain(
      "Parte Solicitante",
    );
    expect(clauses.find((c) => c.id === "opt_ip")?.body).toContain(
      "no implica cesión de derechos de autor",
    );
    expect(clauses.find((c) => c.id === "opt_space")?.title).toBe(
      "Espacio y accesos",
    );
    expect(clauses.find((c) => c.id === "opt_notices")?.body).toContain(
      "avisos-a@ejemplo.test",
    );
  });

  it("keeps fixed scaffolding when optional detail fields are empty markers", () => {
    const values = enrichDerivedValues({
      "custody.authorMounts": true,
      "insurance.hasRc": true,
      "insurance.hasNailToNail": true,
      "options.subcontract": true,
      "options.amendments": true,
      "options.notices": true,
    });
    const clauses = assembleClauses(exhibitionCustodyEs, values);
    expect(clauses.find((c) => c.id === "opt_subcontract")?.body).toContain(
      "sigue siendo plenamente responsable",
    );
    expect(clauses.find((c) => c.id === "opt_amendments")?.title).toBe(
      "Modificaciones",
    );
    expect(clauses.find((c) => c.id === "opt_notices")?.title).toBe(
      "Notificaciones",
    );
  });
});

describe("clauseAllowed", () => {
  it("requires all flags", () => {
    const clause = exhibitionCustodyEs.clauses.find((c) => c.id === "quinta")!;
    expect(clauseAllowed(clause, {})).toBe(false);
    expect(
      clauseAllowed(clause, {
        "features.hasSculptures": true,
        "custody.dailyRemove": true,
      }),
    ).toBe(true);
  });
});
