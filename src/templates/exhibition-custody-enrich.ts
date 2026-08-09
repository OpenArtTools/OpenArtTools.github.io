/**
 * Copyright (C) 2026 Gerard Valls Montaño
 * SPDX-License-Identifier: AGPL-3.0-or-later
 *
 * Derived values for the exhibition / custody template
 * (dates, party blocks, feature lists, insurance labels, etc.).
 */

function formatSpanishDate(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  if (!y || !m || !d) return iso;
  const months = [
    "enero",
    "febrero",
    "marzo",
    "abril",
    "mayo",
    "junio",
    "julio",
    "agosto",
    "septiembre",
    "octubre",
    "noviembre",
    "diciembre",
  ];
  return `${d} de ${months[m - 1]} de ${y}`;
}

function contactExtraLines(
  ...bits: Array<string | false | 0 | "" | undefined | null>
): string {
  const parts = bits.filter(Boolean) as string[];
  return parts.length > 0 ? `\n${parts.join(" ")}` : "";
}

function representativeBlocks(
  partyLabel: string,
  nameRaw: unknown,
  docRaw: unknown,
  roleRaw: unknown,
): { repBlock: string; sigRep: string } {
  const name = String(nameRaw ?? "").trim();
  if (!name) return { repBlock: "", sigRep: "" };
  const docBit =
    String(docRaw ?? "").trim() ||
    `[documento — representante de la ${partyLabel}]`;
  const roleBit =
    String(roleRaw ?? "").trim() ||
    `[cargo — representante de la ${partyLabel}]`;
  return {
    repBlock: `\nActuando en este acto a través de ${name}, con documento ${docBit}, en calidad de ${roleBit} (representante de la ${partyLabel}).`,
    sigRep: `Representante de la ${partyLabel}: ${name}\nDocumento: ${docBit}\nCargo: ${roleBit}\n`,
  };
}

/** Fill derived clause placeholders from toggles and party fields. */
export function enrichDerivedValues(
  values: Record<string, string | boolean | number>,
): Record<string, string | boolean | number> {
  const v = { ...values };

  const isAnnex =
    v["project.isAnnex"] === true || v["project.isAnnex"] === "true";
  const annexTitle = String(v["project.annexTitle"] ?? "").trim();
  const mainName = String(v["project.mainAgreementName"] ?? "").trim();
  const hasRc = v["insurance.hasRc"] === true || v["insurance.hasRc"] === "true";
  const hasNail =
    v["insurance.hasNailToNail"] === true ||
    v["insurance.hasNailToNail"] === "true";
  const hasInsurance = hasRc || hasNail;

  if (isAnnex) {
    v["project.mainAgreementName"] = mainName || "el acuerdo principal";
    v["document.title"] = annexTitle || "ANEXO AL ACUERDO PRINCIPAL";
    v["document.headerKind"] = hasInsurance
      ? "ANEXO — CONDICIONES ESPECÍFICAS DE EXHIBICIÓN, CUSTODIA, SEGURO Y RESPONSABILIDAD"
      : "ANEXO — CONDICIONES ESPECÍFICAS DE EXHIBICIÓN, CUSTODIA Y RESPONSABILIDAD";
    v["document.this"] = "el presente Anexo";
    v["document.This"] = "El presente Anexo";
    v["document.ofThis"] = "del presente Anexo";
    v["document.inThis"] = "en este Anexo";
  } else {
    v["document.title"] = hasInsurance
      ? "ACUERDO DE EXHIBICIÓN, CUSTODIA, SEGURO Y RESPONSABILIDAD"
      : "ACUERDO DE EXHIBICIÓN, CUSTODIA Y RESPONSABILIDAD";
    v["document.headerKind"] = hasInsurance
      ? "CONDICIONES ESPECÍFICAS DE EXHIBICIÓN, CUSTODIA, SEGURO Y RESPONSABILIDAD"
      : "CONDICIONES ESPECÍFICAS DE EXHIBICIÓN, CUSTODIA Y RESPONSABILIDAD";
    v["document.this"] = "el presente Acuerdo";
    v["document.This"] = "El presente Acuerdo";
    v["document.ofThis"] = "del presente Acuerdo";
    v["document.inThis"] = "en este Acuerdo";
  }
  v["document.manifestScope"] = hasInsurance
    ? "exhibición, custodia, conservación, seguro y responsabilidad"
    : "exhibición, custodia, conservación y responsabilidad";
  v["document.forceMajeureInsuranceBit"] = hasInsurance
    ? " ni de las coberturas de seguro comprometidas"
    : "";
  v["document.transportRiskAlign"] = hasInsurance
    ? "las coberturas de seguro"
    : "las obligaciones de responsabilidad patrimonial";
  v["document.custodyDutiesScope"] = hasInsurance
    ? "custodia, seguro y devolución"
    : "custodia y devolución";
  v["document.subcontractScope"] = hasInsurance
    ? "custodia, seguro, daños"
    : "custodia, daños";
  v["document.repairsDutiesScope"] = hasInsurance
    ? "seguro e indemnización"
    : "indemnización";
  v["document.cancellationInsuranceBit"] = hasInsurance
    ? "falta o insuficiencia de seguros exigidos; "
    : "";

  // Orphan insurance complements must not survive when no policies are provided.
  if (!hasInsurance) {
    v["options.policyCerts"] = false;
    v["options.franchise"] = false;
  }

  for (const path of [
    "project.signDate",
    "project.baseAgreementDate",
    "project.exhibitFrom",
    "project.exhibitTo",
  ]) {
    if (typeof v[path] === "string" && /^\d{4}-\d{2}-\d{2}$/.test(v[path] as string)) {
      v[path] = formatSpanishDate(v[path] as string);
    }
  }

  v["parties.author.extra"] = contactExtraLines(
    v["parties.author.address"] && `Domicilio: ${v["parties.author.address"]}.`,
    v["parties.author.email"] && `Email: ${v["parties.author.email"]}.`,
    v["parties.author.phone"] && `Teléfono: ${v["parties.author.phone"]}.`,
  );
  const authorRep = representativeBlocks(
    "Parte Autora",
    v["parties.author.repName"],
    v["parties.author.repDoc"],
    v["parties.author.repRole"],
  );
  v["parties.author.repBlock"] = authorRep.repBlock;
  v["parties.author.sigRep"] = authorRep.sigRep;

  v["parties.org.extra"] = contactExtraLines(
    v["parties.org.address"] && `Domicilio: ${v["parties.org.address"]}.`,
    v["parties.org.email"] && `Email: ${v["parties.org.email"]}.`,
    v["parties.org.phone"] && `Teléfono: ${v["parties.org.phone"]}.`,
    v["parties.org.web"] && `Web: ${v["parties.org.web"]}.`,
  );
  const orgRep = representativeBlocks(
    "Parte Solicitante",
    v["parties.org.repName"],
    v["parties.org.repDoc"],
    v["parties.org.repRole"],
  );
  v["parties.org.repBlock"] = orgRep.repBlock;
  v["parties.org.sigRep"] = orgRep.sigRep;

  v["options.imageCommercialText"] = v["options.imageCommercial"]
    ? "Se autoriza el uso con fines comerciales o publicitarios dentro del ámbito y medios indicados."
    : "Queda excluido el uso con fines comerciales o publicitarios, salvo autorización adicional y expresa.";
  v["options.imageAdaptText"] = v["options.imageAdapt"]
    ? "Se permiten recortes, reencuadres o adaptaciones técnicas menores que no alteren el sentido de la obra."
    : "No se permiten recortes, reencuadres ni adaptaciones sin autorización adicional y expresa.";

  const inThisDoc = String(v["document.inThis"]);
  const reservation = String(v["options.saleReservation"] ?? "").trim();
  v["options.saleReservationText"] = reservation
    ? `Reserva o señal: ${reservation}.`
    : `No se ha pactado ${inThisDoc} una reserva o señal específica.`;
  v["options.saleExclusivityText"] = v["options.saleNoExclusivity"]
    ? "La eventual venta no otorga a la Parte Solicitante representación exclusiva ni mandato de venta en exclusiva."
    : `Las partes no han regulado ${inThisDoc} un régimen de exclusividad de representación o venta.`;
  const saleNotes = String(v["options.saleNotes"] ?? "").trim();
  v["options.saleNotesText"] = saleNotes
    ? `Otras condiciones: ${saleNotes}`
    : "";
  const transportNotes = String(v["options.transportNotes"] ?? "").trim();
  v["options.transportNotesText"] = transportNotes
    ? `Condiciones adicionales de transporte: ${transportNotes}`
    : "";
  v["options.costsNoFeeText"] = v["options.costsNoFee"]
    ? "Las partes dejan constancia de que no hay remuneración económica a la Parte Autora por la cesión temporal de la obra para su exhibición, sin perjuicio del reparto de gastos que se detalla a continuación."
    : "Las partes regulan la remuneración (si la hay) y el reparto de gastos asociados a la cesión temporal y exhibición de la obra según lo siguiente.";

  const inventoryRaw = String(v["options.inventoryList"] ?? "").trim();
  v["options.inventoryFormatted"] = inventoryRaw
    ? inventoryRaw
        .split(/\n+/)
        .map((line) => line.trim())
        .filter(Boolean)
        .map((line) => (line.startsWith("—") ? line : `— ${line}`))
        .join("\n")
    : "— [inventario de componentes]";

  // Daily removal only applies when there are individual pieces.
  if (!v["features.hasSculptures"]) {
    v["custody.dailyRemove"] = false;
  }

  const bullets: string[] = [];

  // Legacy drafts may still have publicInteraction; treat it as interactive.
  if (v["features.interactive"] || v["features.publicInteraction"]) {
    bullets.push(
      "— Se destina a la interacción del público con la obra.",
    );
  }
  if (v["features.hasSculptures"]) {
    const n = v["features.sculptureCount"] || "[número de piezas individuales]";
    bullets.push(
      `— Incorpora un conjunto de ${n} pieza(s) individual(es) que requieren trato aparte respecto del resto de la instalación.`,
    );
  }
  // Legacy drafts may still carry features.hasSystem; treat it as mechanical.
  if (v["features.mechanical"] || v["features.hasSystem"]) {
    bullets.push("— Incorpora elementos mecánicos diseñados para la obra.");
  }
  if (v["features.electrical"]) {
    bullets.push("— Incorpora elementos eléctricos (potencia, cableado o iluminación eléctrica).");
  }
  if (v["features.electronics"]) {
    bullets.push(
      "— Incorpora elementos electrónicos (control, sensores, señal o programación).",
    );
  }
  if (v["features.moving"]) {
    bullets.push("— Incorpora elementos móviles durante el funcionamiento.");
  }
  if (v["features.specialRisk"]) {
    const desc =
      v["features.specialRiskDesc"] ||
      "[descripción de las condiciones especiales de seguridad o riesgo]";
    bullets.push(`— Incorpora o implica las siguientes condiciones especiales de seguridad o riesgo: ${desc}`);
  }
  if (v["features.needsPower"]) {
    bullets.push("— Requiere alimentación eléctrica para su funcionamiento.");
  }
  if (v["features.accessibleWhenOff"]) {
    bullets.push(
      "— El público puede seguir acercándose o acceder al espacio de la obra también cuando esté apagada o inactiva.",
    );
  }
  if (v["features.needsWatch"]) {
    bullets.push(
      "— Requiere vigilancia presencial permanente mientras permanezca accesible al público.",
    );
  }
  if (v["features.needsSecurityPerimeter"]) {
    bullets.push(
      "— Requiere carteles indicativos de seguridad y/o perímetro de protección de la instalación o de una zona concreta.",
    );
  }
  if (v["features.outdoor"]) {
    bullets.push(
      "— Está prevista para un entorno exterior o expuesto a condiciones meteorológicas.",
    );
  }
  if (v["features.hasExtra"] && v["features.extraText"]) {
    const extra = String(v["features.extraText"])
      .split(/\n+/)
      .map((line) => line.trim())
      .filter(Boolean);
    for (const line of extra) {
      bullets.push(line.startsWith("—") ? line : `— ${line}`);
    }
  }
  bullets.push(
    "— Requiere determinadas condiciones de protección y conservación para garantizar la seguridad de las personas y la integridad de la obra.",
  );
  v["features.list"] =
    bullets.length > 0
      ? bullets.join("\n")
      : "— [completar las características de la instalación en el paso correspondiente]";

  const duties: string[] = [];
  if (v["features.needsWatch"]) {
    duties.push(
      "— Mantener vigilancia presencial permanente sobre la instalación durante todo el tiempo en que permanezca instalada y accesible al público, independientemente de que se encuentre en funcionamiento o apagada.",
    );
  }
  if (v["features.needsSecurityPerimeter"]) {
    duties.push(
      "— Mantener visibles los carteles indicativos de seguridad exigidos y respetar el perímetro de protección de la instalación o de la zona señalada, impidiendo el acceso no autorizado a dichas áreas.",
    );
  }
  if (v["features.needsPower"]) {
    duties.push(
      "— Garantizar el correcto suministro eléctrico necesario para su funcionamiento.",
    );
  }
  duties.push("— Impedir cualquier manipulación no autorizada.");
  if (v["custody.weatherProtect"] || v["features.outdoor"]) {
    duties.push(
      "— Adoptar todas las medidas necesarias para proteger la instalación frente a lluvia, viento, humedad, polvo, radiación solar, fenómenos meteorológicos y cualquier otra circunstancia que pueda afectar a su funcionamiento o integridad.",
    );
    duties.push(
      "— Cubrir, proteger, desconectar o suspender el funcionamiento de la instalación cuando las condiciones meteorológicas o de seguridad así lo aconsejen.",
    );
  }
  if (v["features.specialRisk"]) {
    duties.push(
      "— Adoptar todas las medidas de seguridad necesarias derivadas de las condiciones especiales de riesgo declaradas y de las instrucciones técnicas facilitadas por la Parte Autora.",
    );
  }
  duties.push("— Cumplir en todo momento las instrucciones técnicas facilitadas por la Parte Autora.");
  duties.push(
    "— No modificar la configuración, programación, cableado, componentes o condiciones de funcionamiento de la instalación sin autorización expresa de la Parte Autora.",
  );
  v["custody.duties"] = duties.join("\n");

  v["custody.watchEssentialText"] = v["features.needsWatch"]
    ? "La obligación de mantener vigilancia permanente constituye una condición esencial para la exhibición de la instalación y ha sido expresamente aceptada por la Parte Solicitante."
    : "";

  v["insurance.rcInteractionBit"] =
    v["features.interactive"] || v["features.publicInteraction"]
      ? ", de la interacción del público con la misma"
      : "";

  const certParts: string[] = [];
  if (hasRc) certParts.push("Responsabilidad Civil");
  if (hasNail) {
    certParts.push("seguro de daños a todo riesgo (clavo a clavo)");
  }
  if (certParts.length === 0) {
    v["options.policyCertsDetail"] = "";
  } else if (certParts.length === 1) {
    v["options.policyCertsDetail"] = `la póliza de ${certParts[0]}`;
  } else {
    v["options.policyCertsDetail"] = `las pólizas de ${certParts.join(" y de ")}`;
  }

  const breakdown: string[] = [];
  const hasTechSystem =
    Boolean(v["features.mechanical"]) ||
    Boolean(v["features.electrical"]) ||
    Boolean(v["features.electronics"]) ||
    Boolean(v["features.hasSystem"]);
  const hasPieces = Boolean(v["features.hasSculptures"]);
  const showSystemValue = hasTechSystem || hasPieces;
  if (showSystemValue) {
    const systemLabel = hasPieces
      ? "Sistema técnico o instalación (sin las piezas individuales)"
      : "Sistema técnico (mecánico / eléctrico / electrónico)";
    const systemVal =
      v["insurance.systemValue"] || "[valor del sistema o instalación]";
    breakdown.push(`— ${systemLabel}: ${systemVal} € (IVA no incluido).`);
  }
  if (hasPieces) {
    const n = v["features.sculptureCount"] || "[número]";
    const unit =
      v["insurance.pieceUnitValue"] || "[valor unitario de cada pieza individual]";
    breakdown.push(
      `— ${n} pieza(s) individual(es): ${unit} € cada una (IVA no incluido).`,
    );
  }
  v["insurance.valueBreakdownBlock"] =
    breakdown.length > 0 ? `\n${breakdown.join("\n")}` : "";

  const from = v["project.exhibitFrom"];
  const to = v["project.exhibitTo"];
  const venue = v["project.venue"];
  const periodBits: string[] = [];
  if (from && to) {
    periodBits.push(`El período de exhibición previsto es del ${from} al ${to}.`);
  } else if (from) {
    periodBits.push(`El período de exhibición previsto comienza el ${from}.`);
  } else if (to) {
    periodBits.push(`El período de exhibición previsto finaliza el ${to}.`);
  }
  if (venue) {
    periodBits.push(`Lugar de exhibición: ${venue}.`);
  }
  v["project.exhibitPeriod"] =
    periodBits.length > 0 ? ` ${periodBits.join(" ")}` : "";

  return v;
}
