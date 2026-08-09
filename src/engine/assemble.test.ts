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
      "Autoría: {{parties.author.name}}",
      {},
      fields,
    );
    expect(out).toBe("Autoría: [nombre completo — autoría]");
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
    // Delivery / space before insurance block
    expect(ids.indexOf("quinta")).toBeLessThan(ids.indexOf("opt_acta"));
    expect(ids.indexOf("opt_acta")).toBeLessThan(ids.indexOf("sexta"));
    // Insurance complements sit with RC / daños / valor
    expect(ids.indexOf("septima")).toBeLessThan(ids.indexOf("opt_certs"));
    expect(ids.indexOf("opt_franq")).toBeLessThan(ids.indexOf("octava"));
    // Duration near the end, before boilerplate
    expect(ids.indexOf("opt_acta")).toBeLessThan(ids.indexOf("decima"));
    expect(ids.indexOf("decima")).toBeLessThan(ids.indexOf("signatures"));
    expect(ids.indexOf("opt_franq")).toBeLessThan(ids.indexOf("signatures"));
    expect(clauses.find((c) => c.id === "decima")?.body).not.toContain(
      "AUTORÍA",
    );
    expect(clauses.find((c) => c.id === "signatures")?.body).toContain(
      "POR LA PARTE AUTORA",
    );
    expect(clauses.find((c) => c.id === "signatures")?.body).toContain(
      "POR LA PARTE SOLICITANTE",
    );
  });

  it("defaults to a standalone agreement, not an annex", () => {
    const standalone = enrichDerivedValues({
      "custody.authorMounts": true,
      "insurance.hasRc": true,
      "insurance.hasNailToNail": true,
    });
    const alone = assembleClauses(exhibitionCustodyEs, standalone);
    expect(alone.find((c) => c.id === "header")?.title).toContain("ACUERDO");
    expect(alone.some((c) => c.id === "manifest")).toBe(true);
    expect(alone.some((c) => c.id === "manifest_annex")).toBe(false);
    expect(alone.find((c) => c.id === "decima")?.body).toContain(
      "presente Acuerdo",
    );

    const annex = enrichDerivedValues({
      "project.isAnnex": true,
      "project.mainAgreementName": "Acuerdo de participación",
      "project.baseAgreementDate": "2026-01-10",
      "project.annexTitle": "ANEXO I",
      "custody.authorMounts": true,
      "insurance.hasRc": true,
      "insurance.hasNailToNail": true,
    });
    const annexed = assembleClauses(exhibitionCustodyEs, annex);
    expect(annexed.find((c) => c.id === "header")?.title).toBe("ANEXO I");
    expect(annexed.some((c) => c.id === "manifest_annex")).toBe(true);
    expect(annexed.some((c) => c.id === "manifest")).toBe(false);
    expect(annexed.find((c) => c.id === "decima_annex")?.body).toContain(
      "Acuerdo de participación",
    );
    expect(annexed.find((c) => c.id === "header")?.body).toContain("ANEXO —");
    expect(annexed.find((c) => c.id === "manifest_annex")?.body).toContain(
      "anexo específico",
    );
  });

  it("keeps object, RC interaction, weather and certs congruent with toggles", () => {
    const base = {
      "custody.authorMounts": true,
      "insurance.hasRc": true,
      "insurance.hasNailToNail": false,
      "features.interactive": false,
      "features.outdoor": true,
      "custody.weatherProtect": false,
      "options.policyCerts": true,
    };
    const off = enrichDerivedValues(base);
    const offClauses = assembleClauses(exhibitionCustodyEs, off);
    expect(offClauses.find((c) => c.id === "primera")?.body).toContain(
      "cede temporalmente",
    );
    expect(offClauses.find((c) => c.id === "primera")?.body).toContain(
      "posesión y el uso",
    );
    expect(offClauses.find((c) => c.id === "primera")?.body).toContain(
      "no transmite la autoría",
    );
    expect(offClauses.find((c) => c.id === "sexta")?.body).not.toContain(
      "interacción del público",
    );
    expect(String(off["custody.duties"])).not.toContain("lluvia, viento");
    expect(offClauses.find((c) => c.id === "opt_certs")?.body).toContain(
      "Responsabilidad Civil",
    );
    expect(offClauses.find((c) => c.id === "opt_certs")?.body).not.toContain(
      "clavo a clavo",
    );

    const on = enrichDerivedValues({
      ...base,
      "features.interactive": true,
      "custody.weatherProtect": true,
      "insurance.hasNailToNail": true,
      "features.needsWatch": true,
    });
    const onClauses = assembleClauses(exhibitionCustodyEs, on);
    expect(onClauses.find((c) => c.id === "sexta")?.body).toContain(
      "interacción del público",
    );
    expect(String(on["custody.duties"])).toContain("lluvia, viento");
    expect(String(on["custody.watchEssentialText"])).toContain(
      "vigilancia permanente",
    );
    expect(onClauses.find((c) => c.id === "opt_certs")?.body).toContain(
      "clavo a clavo",
    );
  });

  it("includes image and sale optional clauses when enabled", () => {
    const values = enrichDerivedValues({
      "custody.authorMounts": true,
      "insurance.hasRc": true,
      "insurance.hasNailToNail": true,
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
    expect(ids).not.toContain("opt_loan");
    expect(ids).toContain("opt_image");
    expect(ids).toContain("opt_sale");
    expect(ids[ids.length - 1]).toBe("signatures");
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
      "options.repairs": true,
      "options.repairsWho":
        "solo la Parte Autora o personal técnico autorizado por la Parte Autora",
      "options.repairsHow": "aviso previo por escrito y materiales originales",
      "options.repairsAllowed": "ajustes menores y reposición de consumibles",
      "options.repairsForbidden": "abrir electrónica o alterar programación",
      "options.repairsCost": "coste a cargo de la Parte Solicitante",
      "options.amendments": true,
      "options.amendmentTerms":
        "cambio de sala, iluminación o redistribución requiere autorización escrita",
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
      "opt_repairs",
      "opt_amendments",
      "opt_notices",
    ]) {
      expect(ids).toContain(id);
    }
    expect(ids[ids.length - 1]).toBe("signatures");
    expect(ids.indexOf("opt_space")).toBeLessThan(ids.indexOf("opt_inventory"));
    expect(ids.indexOf("opt_inventory")).toBeLessThan(ids.indexOf("opt_transport"));
    expect(ids.indexOf("opt_transport")).toBeLessThan(ids.indexOf("opt_costs"));
    expect(ids.indexOf("opt_costs")).toBeLessThan(ids.indexOf("opt_contacts"));
    expect(ids.indexOf("opt_contacts")).toBeLessThan(ids.indexOf("opt_subcontract"));
    expect(ids.indexOf("opt_repairs")).toBeLessThan(ids.indexOf("opt_ip"));
    expect(ids.indexOf("opt_ip")).toBeLessThan(ids.indexOf("opt_cancellation"));
    expect(ids.indexOf("opt_cancellation")).toBeLessThan(ids.indexOf("decima"));
    expect(ids.indexOf("decima")).toBeLessThan(ids.indexOf("opt_notices"));
    expect(ids.indexOf("opt_notices")).toBeLessThan(ids.indexOf("signatures"));
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
    expect(clauses.find((c) => c.id === "opt_costs")?.title).toBe(
      "Remuneración y gastos",
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
    expect(clauses.find((c) => c.id === "opt_repairs")?.body).toContain(
      "abrir electrónica",
    );
    expect(clauses.find((c) => c.id === "opt_repairs")?.body).toContain(
      "coste a cargo de la Parte Solicitante",
    );
    expect(clauses.find((c) => c.id === "opt_amendments")?.body).toContain(
      "iluminación",
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
      "Cambios en la instalación",
    );
    expect(clauses.find((c) => c.id === "opt_notices")?.title).toBe(
      "Notificaciones formales",
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
