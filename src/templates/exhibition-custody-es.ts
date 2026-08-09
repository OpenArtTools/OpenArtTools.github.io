/**
 * Copyright (C) 2026 Gerard Valls Montaño
 * SPDX-License-Identifier: AGPL-3.0-or-later
 *
 * Generic exhibition / custody / insurance annex template.
 * No real personal or project data — only instructional placeholders.
 */

import type { TemplateDoc } from "../engine/types";

export const exhibitionCustodyEs: TemplateDoc = {
  id: "exhibition-custody-es",
  name: "Acuerdo de exhibición, custodia, seguro y responsabilidad",
  description:
    "Condiciones para exhibir una instalación u obra en un festival, galería u otro espacio: custodia, seguro y responsabilidad.",
  steps: [
    {
      id: "parties",
      title: "Partes",
      blurb: "Identifica a quien ostenta la titularidad de la obra y a la organización receptora.",
    },
    {
      id: "project",
      title: "Proyecto y obra",
      blurb: "Datos del evento, la obra y las fechas del acuerdo.",
    },
    {
      id: "features",
      title: "Características",
      blurb: "Marca qué aplica a la instalación. Cada opción ajusta las cláusulas.",
    },
    {
      id: "custody",
      title: "Montaje y custodia",
      blurb: "Quién monta, vigilancia, protección y manipulación de piezas.",
    },
    {
      id: "insurance",
      title: "Seguros y valor",
      blurb: "Responsabilidad civil, seguro de daños y valor declarado.",
    },
    {
      id: "options",
      title: "Cláusulas opcionales",
      blurb: "Activa bloques extra según lo que necesites negociar.",
    },
  ],
  fields: [
    // —— Parties ——
    {
      id: "author_name",
      label: "Nombre completo — titularidad de la obra",
      placeholder: "Escribe el nombre completo de quien ostenta la titularidad de la obra",
      emptyMarker: "[nombre completo — titularidad de la obra]",
      type: "text",
      path: "parties.author.name",
      required: true,
      step: "parties",
      group: "Titularidad de la obra",
    },
    {
      id: "author_doc",
      label: "Documento de identidad — titularidad de la obra",
      placeholder: "Escribe el DNI, NIE u otro documento de identidad",
      emptyMarker: "[documento de identidad — titularidad de la obra]",
      type: "text",
      path: "parties.author.doc",
      required: true,
      step: "parties",
      group: "Titularidad de la obra",
    },
    {
      id: "author_role",
      label: "Calidad en el documento — titularidad de la obra",
      placeholder: "Escribe la calidad con la que actúa quien ostenta la titularidad de la obra",
      emptyMarker: "[calidad — titularidad de la obra]",
      type: "text",
      path: "parties.author.role",
      required: true,
      step: "parties",
      group: "Titularidad de la obra",
    },
    {
      id: "author_address",
      label: "Domicilio — titularidad de la obra",
      placeholder: "Escribe el domicilio de quien ostenta la titularidad de la obra",
      emptyMarker: "[domicilio — titularidad de la obra]",
      type: "text",
      path: "parties.author.address",
      step: "parties",
      group: "Titularidad de la obra",
    },
    {
      id: "author_email",
      label: "Email — titularidad de la obra",
      placeholder: "Escribe el email de contacto de quien ostenta la titularidad de la obra",
      emptyMarker: "[email — titularidad de la obra]",
      type: "text",
      path: "parties.author.email",
      step: "parties",
      group: "Titularidad de la obra",
    },
    {
      id: "author_phone",
      label: "Teléfono — titularidad de la obra",
      placeholder: "Escribe el teléfono de contacto de quien ostenta la titularidad de la obra",
      emptyMarker: "[teléfono — titularidad de la obra]",
      type: "text",
      path: "parties.author.phone",
      step: "parties",
      group: "Titularidad de la obra",
    },
    {
      id: "org_name",
      label: "Razón social de la organización",
      placeholder: "Escribe la razón social completa de la organización",
      emptyMarker: "[razón social de la organización]",
      type: "text",
      path: "parties.org.name",
      required: true,
      step: "parties",
      group: "Organización / cliente",
    },
    {
      id: "org_cif",
      label: "CIF / NIF de la organización",
      placeholder: "Escribe el CIF o NIF de la organización",
      emptyMarker: "[CIF o NIF de la organización]",
      type: "text",
      path: "parties.org.cif",
      required: true,
      step: "parties",
      group: "Organización / cliente",
    },
    {
      id: "org_rep_name",
      label: "Nombre del representante",
      placeholder: "Escribe el nombre completo de quien firma por la organización",
      emptyMarker: "[nombre del representante]",
      type: "text",
      path: "parties.org.repName",
      required: true,
      step: "parties",
      group: "Organización / cliente",
    },
    {
      id: "org_rep_doc",
      label: "Documento del representante",
      placeholder: "Escribe el DNI o NIE del representante",
      emptyMarker: "[documento del representante]",
      type: "text",
      path: "parties.org.repDoc",
      required: true,
      step: "parties",
      group: "Organización / cliente",
    },
    {
      id: "org_rep_role",
      label: "Cargo del representante",
      placeholder: "Escribe el cargo con el que firma",
      emptyMarker: "[cargo del representante]",
      type: "text",
      path: "parties.org.repRole",
      required: true,
      step: "parties",
      group: "Organización / cliente",
    },
    {
      id: "org_role_desc",
      label: "Rol de la organización en el evento",
      placeholder: "Escribe el rol de la organización respecto al evento",
      emptyMarker: "[rol de la organización]",
      type: "text",
      path: "parties.org.roleDesc",
      required: true,
      step: "parties",
      group: "Organización / cliente",
    },
    {
      id: "org_address",
      label: "Domicilio de la organización",
      placeholder: "Escribe el domicilio social o de notificación",
      emptyMarker: "[domicilio de la organización]",
      type: "text",
      path: "parties.org.address",
      step: "parties",
      group: "Organización / cliente",
    },
    {
      id: "org_email",
      label: "Email de la organización",
      placeholder: "Escribe el email de contacto",
      emptyMarker: "[email de la organización]",
      type: "text",
      path: "parties.org.email",
      step: "parties",
      group: "Organización / cliente",
    },
    {
      id: "org_phone",
      label: "Teléfono de la organización",
      placeholder: "Escribe el teléfono de contacto",
      emptyMarker: "[teléfono de la organización]",
      type: "text",
      path: "parties.org.phone",
      step: "parties",
      group: "Organización / cliente",
    },

    // —— Project ——
    {
      id: "city",
      label: "Ciudad de firma",
      placeholder: "Escribe la ciudad donde se firma el documento",
      emptyMarker: "[ciudad de firma]",
      type: "text",
      path: "project.city",
      required: true,
      step: "project",
    },
    {
      id: "sign_date",
      label: "Fecha del anexo",
      placeholder: "Selecciona o escribe la fecha del anexo",
      emptyMarker: "[fecha del anexo]",
      type: "date",
      path: "project.signDate",
      required: true,
      step: "project",
    },
    {
      id: "base_agreement_date",
      label: "Fecha del acuerdo de participación",
      placeholder: "Escribe la fecha del acuerdo principal al que se anexa",
      emptyMarker: "[fecha del acuerdo de participación]",
      type: "date",
      path: "project.baseAgreementDate",
      required: true,
      step: "project",
    },
    {
      id: "event_name",
      label: "Nombre del evento",
      placeholder: "Escribe el nombre del festival, exposición o evento",
      emptyMarker: "[nombre del evento]",
      type: "text",
      path: "project.eventName",
      required: true,
      step: "project",
    },
    {
      id: "work_title",
      label: "Título de la obra o instalación",
      placeholder: "Escribe el título exacto de la obra o instalación",
      emptyMarker: "[título de la obra o instalación]",
      type: "text",
      path: "project.workTitle",
      required: true,
      step: "project",
    },
    {
      id: "venue",
      label: "Lugar de exhibición (opcional)",
      placeholder: "Escribe el recinto, sala o dirección donde se exhibirá",
      emptyMarker: "[lugar de exhibición]",
      type: "text",
      path: "project.venue",
      step: "project",
    },
    {
      id: "exhibit_from",
      label: "Inicio del período de exhibición (opcional)",
      placeholder: "Escribe o selecciona la fecha de inicio",
      emptyMarker: "[fecha de inicio de exhibición]",
      type: "date",
      path: "project.exhibitFrom",
      step: "project",
    },
    {
      id: "exhibit_to",
      label: "Fin del período de exhibición (opcional)",
      placeholder: "Escribe o selecciona la fecha de fin",
      emptyMarker: "[fecha de fin de exhibición]",
      type: "date",
      path: "project.exhibitTo",
      step: "project",
    },
    {
      id: "annex_title",
      label: "Título del anexo (opcional)",
      placeholder:
        "Déjalo vacío para usar el título estándar, o escribe uno personalizado",
      emptyMarker: "[título del anexo]",
      type: "text",
      path: "project.annexTitle",
      step: "project",
    },

    // —— Features (toggles) ——
    {
      id: "feat_interactive",
      label: "Instalación artística interactiva",
      placeholder: "Activa si el público puede interactuar con la obra",
      emptyMarker: "",
      type: "toggle",
      path: "features.interactive",
      step: "features",
    },
    {
      id: "feat_public",
      label: "Destinada a la interacción del público",
      placeholder: "Activa si está pensada para uso público",
      emptyMarker: "",
      type: "toggle",
      path: "features.publicInteraction",
      step: "features",
    },
    {
      id: "feat_sculptures",
      label: "Incluye piezas u objetos originales separables",
      placeholder: "Activa si hay piezas físicas originales que puedan retirarse o almacenarse por separado",
      emptyMarker: "",
      type: "toggle",
      path: "features.hasSculptures",
      step: "features",
    },
    {
      id: "sculpture_count",
      label: "Número de piezas u objetos",
      placeholder: "Escribe el número de piezas",
      emptyMarker: "[número de piezas u objetos]",
      type: "number",
      path: "features.sculptureCount",
      step: "features",
      showIf: "features.hasSculptures",
      required: true,
    },
    {
      id: "feat_system",
      label: "Sistema mecánico, eléctrico y/o electrónico específico",
      placeholder: "Activa si hay un sistema técnico diseñado para la obra",
      emptyMarker: "",
      type: "toggle",
      path: "features.hasSystem",
      step: "features",
    },
    {
      id: "feat_electrical",
      label: "Componentes eléctricos o electrónicos",
      placeholder: "Activa si hay componentes eléctricos o electrónicos",
      emptyMarker: "",
      type: "toggle",
      path: "features.electrical",
      step: "features",
    },
    {
      id: "feat_moving",
      label: "Elementos móviles",
      placeholder: "Activa si hay partes móviles",
      emptyMarker: "",
      type: "toggle",
      path: "features.moving",
      step: "features",
    },
    {
      id: "feat_special_risk",
      label: "Condiciones especiales de seguridad o riesgo",
      placeholder:
        "Activa si la obra implica riesgos o condiciones especiales que deban declararse (calor, frío, líquidos, cortes, altura, láser, etc.)",
      emptyMarker: "",
      type: "toggle",
      path: "features.specialRisk",
      step: "features",
    },
    {
      id: "special_risk_desc",
      label: "Descripción de las condiciones especiales",
      placeholder:
        "Describe con precisión las condiciones o riesgos especiales de la instalación",
      emptyMarker: "[descripción de las condiciones especiales de seguridad o riesgo]",
      type: "textarea",
      path: "features.specialRiskDesc",
      step: "features",
      showIf: "features.specialRisk",
      required: true,
    },
    {
      id: "feat_power",
      label: "Requiere alimentación eléctrica",
      placeholder: "Activa si necesita corriente para funcionar",
      emptyMarker: "",
      type: "toggle",
      path: "features.needsPower",
      step: "features",
    },
    {
      id: "feat_access_off",
      label: "Puede permanecer accesible apagada o inactiva",
      placeholder:
        "Activa si el público puede acercarse también con la obra apagada o fuera de funcionamiento",
      emptyMarker: "",
      type: "toggle",
      path: "features.accessibleWhenOff",
      step: "features",
    },
    {
      id: "feat_watch",
      label: "Requiere vigilancia presencial permanente",
      placeholder: "Activa si hace falta vigilancia mientras sea accesible",
      emptyMarker: "",
      type: "toggle",
      path: "features.needsWatch",
      step: "features",
    },
    {
      id: "feat_outdoor",
      label: "Exposición en exterior o a la intemperie",
      placeholder: "Activa si puede estar a la intemperie o sin protección fija",
      emptyMarker: "",
      type: "toggle",
      path: "features.outdoor",
      step: "features",
    },
    {
      id: "feat_extra",
      label: "Añadir características adicionales en texto libre",
      placeholder: "Activa para incluir otras características que no estén en la lista",
      emptyMarker: "",
      type: "toggle",
      path: "features.hasExtra",
      step: "features",
    },
    {
      id: "extra_chars",
      label: "Características adicionales",
      placeholder:
        "Escribe otras características relevantes de la instalación, una por línea si es posible",
      emptyMarker: "[características adicionales de la instalación]",
      type: "textarea",
      path: "features.extraText",
      step: "features",
      showIf: "features.hasExtra",
      required: true,
    },

    // —— Custody ——
    {
      id: "author_mounts",
      label: "Montaje y desmontaje solo por la parte con titularidad de la obra",
      placeholder: "Activa si solo monta y desmonta quien ostenta la titularidad de la obra",
      emptyMarker: "",
      type: "toggle",
      path: "custody.authorMounts",
      step: "custody",
    },
    {
      id: "daily_remove",
      label: "Retirada diaria de piezas fuera de horario",
      placeholder: "Activa si las piezas se retiran y reponen cada día",
      emptyMarker: "",
      type: "toggle",
      path: "custody.dailyRemove",
      step: "custody",
    },
    {
      id: "weather_protect",
      label: "Obligación de protección meteorológica",
      placeholder: "Activa si la organización debe proteger frente a clima",
      emptyMarker: "",
      type: "toggle",
      path: "custody.weatherProtect",
      step: "custody",
    },

    // —— Insurance / value ——
    {
      id: "has_rc",
      label: "Declarar cobertura de responsabilidad civil",
      placeholder: "Activa si la organización declara RC del evento",
      emptyMarker: "",
      type: "toggle",
      path: "insurance.hasRc",
      step: "insurance",
    },
    {
      id: "has_nail",
      label: "Seguro de daños clavo a clavo",
      placeholder: "Activa si hay (o se exige) seguro de daños a todo riesgo",
      emptyMarker: "",
      type: "toggle",
      path: "insurance.hasNailToNail",
      step: "insurance",
    },
    {
      id: "system_value",
      label: "Valor del sistema técnico (€, sin IVA)",
      placeholder: "Escribe el valor del sistema mecánico/eléctrico/electrónico",
      emptyMarker: "[valor del sistema técnico]",
      type: "money",
      path: "insurance.systemValue",
      step: "insurance",
      showIf: "features.hasSystem",
    },
    {
      id: "piece_unit_value",
      label: "Valor unitario de cada pieza (€, sin IVA)",
      placeholder: "Escribe el valor de cada pieza u objeto",
      emptyMarker: "[valor unitario de cada pieza]",
      type: "money",
      path: "insurance.pieceUnitValue",
      step: "insurance",
      showIf: "features.hasSculptures",
    },
    {
      id: "total_value",
      label: "Valor total declarado (€, sin IVA)",
      placeholder: "Escribe el valor total declarado de la instalación",
      emptyMarker: "[valor total declarado]",
      type: "money",
      path: "insurance.totalValue",
      required: true,
      step: "insurance",
    },

    // —— Optional clauses toggles ——
    {
      id: "opt_delivery_act",
      label: "Incluir acta de entrega y devolución",
      placeholder: "Activa para exigir acta con estado de la obra",
      emptyMarker: "",
      type: "toggle",
      path: "options.deliveryAct",
      step: "options",
    },
    {
      id: "opt_policy_certs",
      label: "Exigir certificados de póliza previos",
      placeholder: "Activa para exigir acreditación de seguros antes del transporte",
      emptyMarker: "",
      type: "toggle",
      path: "options.policyCerts",
      step: "options",
    },
    {
      id: "opt_franchise",
      label: "Franquicia a cargo de la organización",
      placeholder: "Activa para dejar claro quién asume la franquicia",
      emptyMarker: "",
      type: "toggle",
      path: "options.franchise",
      step: "options",
    },
    {
      id: "opt_jurisdiction",
      label: "Incluir ley aplicable y jurisdicción",
      placeholder: "Activa para fijar ley y tribunales",
      emptyMarker: "",
      type: "toggle",
      path: "options.jurisdiction",
      step: "options",
    },
    {
      id: "law_text",
      label: "Ley aplicable",
      placeholder: "Escribe la ley aplicable (ej.: legislación española)",
      emptyMarker: "[ley aplicable]",
      type: "text",
      path: "options.lawText",
      step: "options",
      showIf: "options.jurisdiction",
      required: true,
    },
    {
      id: "courts_text",
      label: "Tribunales / jurisdicción",
      placeholder: "Escribe los juzgados o tribunales competentes",
      emptyMarker: "[tribunales competentes]",
      type: "text",
      path: "options.courtsText",
      step: "options",
      showIf: "options.jurisdiction",
      required: true,
    },
    {
      id: "opt_expert",
      label: "Perito independiente para pérdida artística",
      placeholder: "Activa para no dejar la calificación solo a quien ostenta la titularidad de la obra",
      emptyMarker: "",
      type: "toggle",
      path: "options.independentExpert",
      step: "options",
    },
    {
      id: "opt_force_majeure",
      label: "Cláusula de fuerza mayor",
      placeholder: "Activa para regular eventos de fuerza mayor",
      emptyMarker: "",
      type: "toggle",
      path: "options.forceMajeure",
      step: "options",
    },
  ],
  clauses: [
    {
      id: "header",
      title: "{{document.annexTitle}}",
      body: `CONDICIONES ESPECÍFICAS DE EXHIBICIÓN, CUSTODIA, SEGURO Y RESPONSABILIDAD DE LA INSTALACIÓN ARTÍSTICA «{{project.workTitle}}»

En {{project.city}}, a {{project.signDate}}`,
    },
    {
      id: "reunidos",
      title: "REUNIDOS",
      body: `De una parte
{{parties.author.name}}, con documento {{parties.author.doc}}, {{parties.author.role}}, en adelante, quien ostenta la titularidad de la obra («Parte Titular»).{{parties.author.extra}}

Y de otra,
{{parties.org.name}}, con CIF/NIF {{parties.org.cif}}, {{parties.org.roleDesc}} de {{project.eventName}}, representada en este acto por {{parties.org.repName}}, con documento {{parties.org.repDoc}}, en calidad de {{parties.org.repRole}}, en adelante, la Organización.{{parties.org.extra}}

Ambas partes, reconociéndose capacidad legal suficiente para obligarse,`,
    },
    {
      id: "manifest",
      title: "MANIFIESTAN",
      body: `I. Que con fecha {{project.baseAgreementDate}} ambas partes suscribieron el Acuerdo de Participación correspondiente a la exhibición de la instalación artística de la Parte Titular durante {{project.eventName}}.
II. Que, debido a las características técnicas y de funcionamiento de la instalación, ambas partes consideran conveniente regular expresamente las condiciones particulares de su exhibición, custodia, conservación y responsabilidad.
III. Que el presente Anexo constituye un acuerdo específico negociado y aceptado libremente por ambas partes, complementa el Acuerdo de Participación y, exclusivamente respecto de la instalación artística objeto del mismo, prevalecerá sobre cualquier cláusula del citado Acuerdo que resulte incompatible con lo aquí establecido.`,
    },
    {
      id: "primera",
      title: "PRIMERA. Objeto",
      body: `La Parte Titular cede temporalmente la instalación artística «{{project.workTitle}}» para su exhibición durante {{project.eventName}}, a solicitud de la Organización.{{project.exhibitPeriod}}`,
    },
    {
      id: "segunda",
      title: "SEGUNDA. Conocimiento y aceptación de la instalación",
      body: `La Organización declara haber recibido con carácter previo a la firma del presente Anexo toda la información técnica necesaria relativa a la instalación, incluyendo su funcionamiento, necesidades eléctricas, características mecánicas, condiciones de seguridad, conservación, operación y exhibición.
Asimismo, declara haber recibido respuesta a todas las consultas técnicas formuladas durante la preparación del proyecto y manifiesta haber comprendido y aceptado expresamente todas las condiciones comunicadas por la Parte Titular.
La Organización reconoce expresamente conocer que la instalación:
{{features.list}}
La Organización declara conocer plenamente estas características y acepta expresamente la exhibición pública de la instalación en dichas condiciones.`,
    },
    {
      id: "tercera",
      title: "TERCERA. Montaje y desmontaje",
      body: `El montaje y el desmontaje de la instalación serán realizados exclusivamente por la Parte Titular. La entrega de la instalación se entenderá producida una vez finalizado el montaje y aceptada su recepción por la Organización. Desde ese momento y hasta su devolución a la Parte Titular para proceder a su desmontaje, la Organización asumirá íntegramente su custodia.`,
      requireAll: ["custody.authorMounts"],
    },
    {
      id: "tercera_alt",
      title: "TERCERA. Montaje y desmontaje",
      body: `El montaje y el desmontaje de la instalación se realizarán según lo acordado entre las partes. La entrega de la instalación se entenderá producida una vez finalizado el montaje y aceptada su recepción por la Organización. Desde ese momento y hasta su devolución a la Parte Titular, la Organización asumirá íntegramente su custodia.`,
      excludeIf: ["custody.authorMounts"],
    },
    {
      id: "cuarta",
      title: "CUARTA. Custodia, vigilancia y protección",
      body: `Desde la entrega de la instalación hasta su devolución a la Parte Titular, la Organización asumirá íntegramente su custodia, conservación, vigilancia y protección.
En particular, la Organización se compromete a:
{{custody.duties}}
La obligación de mantener vigilancia permanente constituye una condición esencial para la exhibición de la instalación y ha sido expresamente aceptada por la Organización, cuando resulte de aplicación conforme a las características de la obra.
La ausencia de vigilancia o la falta de adopción de las medidas de protección necesarias se considerará un incumplimiento de las obligaciones de custodia asumidas por la Organización.`,
    },
    {
      id: "quinta",
      title: "QUINTA. Almacenamiento y manipulación de las piezas",
      body: `Con el fin de preservar la integridad de la obra, las {{features.sculptureCount}} piezas podrán ser retiradas diariamente de la instalación para su almacenamiento temporal fuera del horario de exhibición y repuestas nuevamente para su apertura al público.
Las operaciones de retirada, almacenamiento, custodia, manipulación y posterior reposición serán realizadas bajo la exclusiva responsabilidad de la Organización.
La Organización responderá de cualquier pérdida, robo, hurto, desaparición, desperfecto, deterioro o daño que pudiera producirse durante dichas operaciones, así como de cualquier daño al sistema mecánico, eléctrico y electrónico de la instalación durante todo el período de custodia.`,
      requireAll: ["features.hasSculptures", "custody.dailyRemove"],
    },
    {
      id: "sexta",
      title: "SEXTA. Responsabilidad civil",
      body: `La Organización declara que la instalación artística objeto del presente Anexo se encuentra debidamente cubierta por la póliza de Responsabilidad Civil correspondiente a {{project.eventName}} durante todo el período en que permanezca bajo su custodia y exhibición.
La Organización asume íntegramente la responsabilidad derivada de la exhibición pública de la instalación, de su funcionamiento, de la interacción del público con la misma y de todas las medidas de seguridad necesarias para garantizar la protección de las personas, de la propia obra y de las instalaciones durante todo el período en que la instalación permanezca bajo su custodia.
La Organización declara que la decisión de exhibir públicamente la instalación ha sido adoptada libremente, tras haber recibido toda la información técnica y de seguridad facilitada por la Parte Titular, conocer las características y riesgos inherentes a la obra y aceptar expresamente las condiciones necesarias para su correcta exhibición.
La existencia, alcance, validez o eficacia de la póliza de Responsabilidad Civil no limitará, en ningún caso, las obligaciones asumidas por la Organización mediante el presente Anexo.`,
      requireAll: ["insurance.hasRc"],
    },
    {
      id: "septima",
      title: "SÉPTIMA. Seguro de daños de la instalación",
      body: `La Organización declara que la instalación artística objeto del presente Anexo se encuentra debidamente cubierta mediante una póliza de seguro de daños a todo riesgo («clavo a clavo»), plenamente vigente, que garantiza la integridad patrimonial de la obra durante todo el período de su participación en {{project.eventName}}.
Dicha cobertura comprenderá, como mínimo: el transporte de ida y vuelta; las operaciones de carga y descarga; el montaje y desmontaje; la permanencia en el recinto; la exhibición pública; el almacenamiento temporal de piezas y elementos; y la manipulación necesaria para su conservación y reposición.
La cobertura incluirá, entre otros, los riesgos de pérdida, robo, hurto, desaparición, desperfecto, deterioro, vandalismo, incendio, agua, lluvia, viento, humedad, fenómenos meteorológicos, accidente, manipulación y cualquier otro daño accidental o fortuito.
La cobertura de seguro comenzará en el momento en que la instalación abandone físicamente su lugar de almacenamiento y finalizará únicamente cuando, tras el transporte de retorno, haya sido descargada e introducida nuevamente en el interior de dicho lugar.
La existencia, alcance o condiciones de la póliza de seguro de daños no limitarán, en ningún caso, las obligaciones de custodia, conservación, protección e indemnización asumidas por la Organización.
La suma asegurada será, como mínimo, igual al valor declarado de la instalación establecido en la cláusula de valor declarado del presente Anexo.`,
      requireAll: ["insurance.hasNailToNail"],
    },
    {
      id: "octava",
      title: "OCTAVA. Responsabilidad sobre la instalación",
      body: `La Organización responderá frente a la Parte Titular por cualquier pérdida, robo, hurto, desaparición, destrucción, desperfecto o deterioro total o parcial que pueda sufrir la instalación o cualquiera de sus componentes desde el momento de su entrega por la Parte Titular tras el montaje y hasta su devolución a la Parte Titular para proceder a su desmontaje.
Se considerarán expresamente incluidos, entre otros, los daños derivados de: robo; hurto; vandalismo; incendio; agua; lluvia; viento; humedad; fenómenos meteorológicos; manipulación por terceros; manipulación y almacenamiento de piezas; falta o insuficiencia de vigilancia; falta de protección; incumplimiento de las instrucciones técnicas de la Parte Titular; y cualquier actuación u omisión que implique una custodia insuficiente o inadecuada.
En caso de pérdida total, destrucción o robo de la instalación, la Organización indemnizará a la Parte Titular por el valor declarado establecido en la cláusula de valor declarado.
En caso de daños parciales, la Organización asumirá íntegramente los costes de reparación, restauración, sustitución de componentes, materiales, mano de obra especializada y cualquier otro gasto necesario para devolver la instalación al estado en que fue entregada.
En caso de que la reparación o restauración no resulte técnicamente posible o implique una pérdida irreversible de las características artísticas de la obra, se considerará pérdida total a los efectos del presente Anexo.`,
    },
    {
      id: "novena",
      title: "NOVENA. Valor declarado",
      body: `Las partes acuerdan fijar el siguiente valor económico de la instalación, exclusivamente a efectos de responsabilidad patrimonial:
{{insurance.valueBreakdown}}

Valor total declarado de la instalación: {{insurance.totalValue}} € (impuestos no incluidos).`,
    },
    {
      id: "decima",
      title: "DÉCIMA. Vigencia",
      body: `El presente Anexo entrará en vigor desde el momento de su firma y permanecerá vigente desde la entrega efectiva de la instalación a la Organización hasta su devolución a la Parte Titular para proceder a su desmontaje.
Las partes manifiestan que el presente Anexo ha sido negociado y aceptado libremente, refleja los acuerdos específicos alcanzados para la exhibición de la instalación artística y forma parte integrante del Acuerdo de Participación, constituyendo ambos documentos una única unidad contractual y debiendo interpretarse conjuntamente.`,
    },
    {
      id: "opt_acta",
      title: "UNDÉCIMA. Acta de entrega y devolución",
      body: `La entrega y la devolución de la instalación se documentarán mediante acta firmada por ambas partes, que incluirá la fecha, el estado aparente de la instalación, un inventario de componentes y, cuando sea posible, registro fotográfico. La falta de acta no exime a la Organización de sus obligaciones de custodia.`,
      requireAll: ["options.deliveryAct"],
    },
    {
      id: "opt_certs",
      title: "DUODÉCIMA. Acreditación de seguros",
      body: `Con carácter previo al transporte de la instalación desde su lugar de almacenamiento, la Organización entregará a la Parte Titular certificado o extracto de las pólizas de Responsabilidad Civil y de daños que acredite la vigencia, los límites, la inclusión de la obra y el período de cobertura. La falta de acreditación autorizará a la Parte Titular a suspender la entrega sin perjuicio de las demás acciones que le correspondan.`,
      requireAll: ["options.policyCerts"],
    },
    {
      id: "opt_franq",
      title: "DECIMOTERCERA. Franquicia",
      body: `Cualquier franquicia, deducible o importe no cubierto por las pólizas será asumido íntegramente por la Organización, sin que pueda trasladarse a la Parte Titular.`,
      requireAll: ["options.franchise"],
    },
    {
      id: "opt_jur",
      title: "DECIMOCUARTA. Ley aplicable y jurisdicción",
      body: `El presente Anexo se rige por {{options.lawText}}. Para la resolución de cualquier controversia derivada del mismo, las partes se someten a los {{options.courtsText}}, con renuncia a cualquier otro fuero que pudiera corresponderles.`,
      requireAll: ["options.jurisdiction"],
    },
    {
      id: "opt_expert",
      title: "DECIMOQUINTA. Valoración de pérdida artística",
      body: `La valoración sobre la afectación irreversible de las características artísticas de la obra podrá ser realizada por la Parte Titular y, a solicitud de cualquiera de las partes, contrastada por un perito independiente de común acuerdo. A falta de acuerdo sobre el perito en el plazo de quince (15) días, podrá designarse conforme a la práctica habitual de arbitraje pericial o por el colegio profesional competente.`,
      requireAll: ["options.independentExpert"],
    },
    {
      id: "opt_fm",
      title: "DECIMOSEXTA. Fuerza mayor",
      body: `Ninguna de las partes será responsable por el incumplimiento de obligaciones cuando dicho incumplimiento derive de causas de fuerza mayor debidamente acreditadas. Ello no exime a la Organización de sus deberes de protección razonable de la instalación ni de las coberturas de seguro comprometidas, en la medida en que resulten aplicables.`,
      requireAll: ["options.forceMajeure"],
    },
    {
      id: "signatures",
      title: "Firmas",
      body: `Y para que así conste, ambas partes firman el presente documento por duplicado y a un solo efecto.

En {{project.city}}, a {{project.signDate}}.

TITULARIDAD DE LA OBRA
{{parties.author.name}}
Documento: {{parties.author.doc}}
Firma:




POR {{parties.org.name}}
Representante: {{parties.org.repName}}
Documento: {{parties.org.repDoc}}
Cargo: {{parties.org.repRole}}
Firma:
Sello de la empresa`,
      placeAtEnd: true,
    },
  ],
};

/** Build dynamic list bullets and duty lists into values before assemble. */
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

export function enrichDerivedValues(
  values: Record<string, string | boolean | number>,
): Record<string, string | boolean | number> {
  const v = { ...values };

  const annex = String(v["project.annexTitle"] ?? "").trim();
  v["document.annexTitle"] = annex || "ANEXO I AL ACUERDO DE PARTICIPACIÓN";

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

  const authorBits: string[] = [];
  if (v["parties.author.address"]) {
    authorBits.push(`Domicilio: ${v["parties.author.address"]}.`);
  }
  if (v["parties.author.email"]) {
    authorBits.push(`Email: ${v["parties.author.email"]}.`);
  }
  if (v["parties.author.phone"]) {
    authorBits.push(`Teléfono: ${v["parties.author.phone"]}.`);
  }
  v["parties.author.extra"] =
    authorBits.length > 0 ? `\n${authorBits.join(" ")}` : "";

  const orgBits: string[] = [];
  if (v["parties.org.address"]) {
    orgBits.push(`Domicilio: ${v["parties.org.address"]}.`);
  }
  if (v["parties.org.email"]) {
    orgBits.push(`Email: ${v["parties.org.email"]}.`);
  }
  if (v["parties.org.phone"]) {
    orgBits.push(`Teléfono: ${v["parties.org.phone"]}.`);
  }
  v["parties.org.extra"] = orgBits.length > 0 ? `\n${orgBits.join(" ")}` : "";

  const bullets: string[] = [];

  if (v["features.interactive"]) {
    bullets.push("— Es una instalación artística interactiva.");
  }
  if (v["features.publicInteraction"]) {
    bullets.push("— Está destinada a la interacción del público.");
  }
  if (v["features.hasSculptures"]) {
    const n = v["features.sculptureCount"] || "[número de piezas u objetos]";
    bullets.push(
      `— Está compuesta por ${n} pieza(s) original(es) y, en su caso, un sistema técnico diseñado específicamente para la obra.`,
    );
  }
  if (v["features.hasSystem"]) {
    bullets.push(
      "— Incorpora un sistema mecánico, eléctrico y/o electrónico diseñado específicamente para la obra.",
    );
  }
  if (v["features.electrical"]) {
    bullets.push("— Incorpora componentes eléctricos y electrónicos.");
  }
  if (v["features.moving"]) {
    bullets.push("— Incorpora elementos móviles.");
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
      "— Puede permanecer accesible al público tanto en funcionamiento como apagada o inactiva.",
    );
  }
  if (v["features.needsWatch"]) {
    bullets.push(
      "— Requiere vigilancia presencial permanente mientras permanezca accesible al público.",
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
      : "— [completa las características de la instalación en el paso correspondiente]";

  const duties: string[] = [];
  if (v["features.needsWatch"]) {
    duties.push(
      "— Mantener vigilancia presencial permanente sobre la instalación durante todo el tiempo en que permanezca instalada y accesible al público, independientemente de que se encuentre en funcionamiento o apagada.",
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
      "— Adoptar todas las medidas de seguridad necesarias derivadas de las condiciones especiales de riesgo declaradas y de las instrucciones técnicas facilitadas por la Parte Titular.",
    );
  }
  duties.push("— Cumplir en todo momento las instrucciones técnicas facilitadas por la Parte Titular.");
  duties.push(
    "— No modificar la configuración, programación, cableado, componentes o condiciones de funcionamiento de la instalación sin autorización expresa de la Parte Titular.",
  );
  v["custody.duties"] = duties.join("\n");

  const breakdown: string[] = [];
  if (v["features.hasSystem"] && v["insurance.systemValue"]) {
    breakdown.push(
      `— Sistema mecánico, eléctrico y electrónico: ${v["insurance.systemValue"]} € (IVA no incluido).`,
    );
  } else if (v["features.hasSystem"]) {
    breakdown.push(
      "— Sistema mecánico, eléctrico y electrónico: [valor del sistema técnico] € (IVA no incluido).",
    );
  }
  if (v["features.hasSculptures"]) {
    const n = v["features.sculptureCount"] || "[número]";
    const unit = v["insurance.pieceUnitValue"] || "[valor unitario de cada pieza]";
    breakdown.push(
      `— ${n} pieza(s) original(es): ${unit} € cada una (IVA no incluido).`,
    );
  }
  if (breakdown.length === 0) {
    breakdown.push(
      "— [desglose del valor declarado según componentes de la instalación]",
    );
  }
  v["insurance.valueBreakdown"] = breakdown.join("\n");

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

export const TEMPLATES: TemplateDoc[] = [exhibitionCustodyEs];

export function getTemplate(id: string): TemplateDoc | undefined {
  return TEMPLATES.find((t) => t.id === id);
}
