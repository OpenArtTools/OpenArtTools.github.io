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
    "Condiciones para exhibir, prestar o ceder temporalmente una obra: custodia, seguro, uso de imagen, venta y responsabilidad.",
  steps: [
    {
      id: "titularidad",
      title: "Autoría",
      blurb:
        "Datos de quien tiene la autoría. Si firma un representante del autor, indícalo en ese bloque.",
    },
    {
      id: "solicitante",
      title: "Solicitante de la obra",
      blurb:
        "Datos completos de quien solicita la exhibición, el préstamo o la cesión. El representante del solicitante es opcional.",
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
      blurb:
        "Solo activa lo que necesitéis. Lo desactivado no aparece en el documento.",
    },
  ],
  fields: [
    // —— Parties ——
    {
      id: "author_name",
      label: "Nombre completo — autoría",
      placeholder: "Nombre y apellidos",
      emptyMarker: "[nombre completo — autoría]",
      type: "text",
      path: "parties.author.name",
      required: true,
      step: "titularidad",
    },
    {
      id: "author_doc",
      label: "Documento de identidad — autoría",
      placeholder: "DNI, NIE u otro documento",
      emptyMarker: "[documento de identidad — autoría]",
      type: "text",
      path: "parties.author.doc",
      required: true,
      step: "titularidad",
    },
    {
      id: "author_role",
      label: "Calidad en el documento — autoría",
      placeholder: "p. ej. práctica artística",
      emptyMarker: "[calidad — autoría]",
      type: "text",
      path: "parties.author.role",
      required: true,
      step: "titularidad",
    },
    {
      id: "author_address",
      label: "Domicilio — autoría",
      placeholder: "Calle, número, ciudad",
      emptyMarker: "[domicilio — autoría]",
      type: "text",
      path: "parties.author.address",
      step: "titularidad",
    },
    {
      id: "author_email",
      label: "Email — autoría",
      placeholder: "email@ejemplo.com",
      emptyMarker: "[email — autoría]",
      type: "text",
      path: "parties.author.email",
      step: "titularidad",
    },
    {
      id: "author_phone",
      label: "Teléfono — autoría",
      placeholder: "Con prefijo si aplica",
      emptyMarker: "[teléfono — autoría]",
      type: "text",
      path: "parties.author.phone",
      step: "titularidad",
    },
    {
      id: "author_rep_name",
      label: "Nombre — representante del autor",
      placeholder: "Nombre y apellidos de quien firma",
      emptyMarker: "[nombre — representante del autor]",
      type: "text",
      path: "parties.author.repName",
      step: "titularidad",
      group: "Representante del autor (opcional)",
    },
    {
      id: "author_rep_doc",
      label: "Documento — representante del autor",
      placeholder: "DNI, NIE u otro documento",
      emptyMarker: "[documento — representante del autor]",
      type: "text",
      path: "parties.author.repDoc",
      step: "titularidad",
      group: "Representante del autor (opcional)",
    },
    {
      id: "author_rep_role",
      label: "Cargo — representante del autor",
      placeholder: "Cargo con el que firma",
      emptyMarker: "[cargo — representante del autor]",
      type: "text",
      path: "parties.author.repRole",
      step: "titularidad",
      group: "Representante del autor (opcional)",
    },
    {
      id: "org_name",
      label: "Nombre o razón social — solicitante",
      placeholder: "Nombre completo o razón social",
      emptyMarker: "[nombre o razón social — solicitante]",
      type: "text",
      path: "parties.org.name",
      required: true,
      step: "solicitante",
    },
    {
      id: "org_cif",
      label: "Documento — solicitante",
      placeholder: "CIF, NIF, DNI, NIE u otro documento",
      emptyMarker: "[documento — solicitante]",
      type: "text",
      path: "parties.org.cif",
      required: true,
      step: "solicitante",
    },
    {
      id: "org_quality",
      label: "Calidad en el documento — solicitante",
      placeholder: "p. ej. persona física, asociación, empresa o entidad",
      emptyMarker: "[calidad — solicitante]",
      type: "text",
      path: "parties.org.quality",
      required: true,
      step: "solicitante",
    },
    {
      id: "org_role_desc",
      label: "Rol en el evento — solicitante",
      placeholder: "p. ej. organización del evento, galería o espacio",
      emptyMarker: "[rol — solicitante]",
      type: "text",
      path: "parties.org.roleDesc",
      required: true,
      step: "solicitante",
    },
    {
      id: "org_address",
      label: "Domicilio — solicitante",
      placeholder: "Calle, número, ciudad, código postal",
      emptyMarker: "[domicilio — solicitante]",
      type: "text",
      path: "parties.org.address",
      required: true,
      step: "solicitante",
    },
    {
      id: "org_email",
      label: "Email — solicitante",
      placeholder: "email@ejemplo.com",
      emptyMarker: "[email — solicitante]",
      type: "text",
      path: "parties.org.email",
      required: true,
      step: "solicitante",
    },
    {
      id: "org_phone",
      label: "Teléfono — solicitante",
      placeholder: "Con prefijo si aplica",
      emptyMarker: "[teléfono — solicitante]",
      type: "text",
      path: "parties.org.phone",
      required: true,
      step: "solicitante",
    },
    {
      id: "org_web",
      label: "Web — solicitante (opcional)",
      placeholder: "https://…",
      emptyMarker: "[web — solicitante]",
      type: "text",
      path: "parties.org.web",
      step: "solicitante",
    },
    {
      id: "org_rep_name",
      label: "Nombre — representante del solicitante",
      placeholder: "Nombre y apellidos de quien firma",
      emptyMarker: "[nombre — representante del solicitante]",
      type: "text",
      path: "parties.org.repName",
      step: "solicitante",
      group: "Representante del solicitante (opcional)",
    },
    {
      id: "org_rep_doc",
      label: "Documento — representante del solicitante",
      placeholder: "DNI, NIE u otro documento",
      emptyMarker: "[documento — representante del solicitante]",
      type: "text",
      path: "parties.org.repDoc",
      step: "solicitante",
      group: "Representante del solicitante (opcional)",
    },
    {
      id: "org_rep_role",
      label: "Cargo — representante del solicitante",
      placeholder: "Cargo con el que firma",
      emptyMarker: "[cargo — representante del solicitante]",
      type: "text",
      path: "parties.org.repRole",
      step: "solicitante",
      group: "Representante del solicitante (opcional)",
    },

    // —— Project ——
    {
      id: "city",
      label: "Ciudad de firma",
      placeholder: "Ciudad",
      emptyMarker: "[ciudad de firma]",
      type: "text",
      path: "project.city",
      required: true,
      step: "project",
    },
    {
      id: "sign_date",
      label: "Fecha del anexo",
      placeholder: "Fecha del anexo",
      emptyMarker: "[fecha del anexo]",
      type: "date",
      path: "project.signDate",
      required: true,
      step: "project",
    },
    {
      id: "base_agreement_date",
      label: "Fecha del acuerdo de participación",
      placeholder: "Fecha del acuerdo principal",
      emptyMarker: "[fecha del acuerdo de participación]",
      type: "date",
      path: "project.baseAgreementDate",
      required: true,
      step: "project",
    },
    {
      id: "event_name",
      label: "Nombre del evento",
      placeholder: "Festival, exposición o evento",
      emptyMarker: "[nombre del evento]",
      type: "text",
      path: "project.eventName",
      required: true,
      step: "project",
    },
    {
      id: "work_title",
      label: "Título de la obra o instalación",
      placeholder: "Título exacto de la obra",
      emptyMarker: "[título de la obra o instalación]",
      type: "text",
      path: "project.workTitle",
      required: true,
      step: "project",
    },
    {
      id: "venue",
      label: "Lugar de exhibición (opcional)",
      placeholder: "Recinto, sala o dirección",
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
      label: "Montaje y desmontaje solo por la Parte Autora",
      placeholder: "Activa si solo monta y desmonta la Parte Autora",
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
      placeholder: "Activa si el solicitante de la obra debe proteger frente a clima",
      emptyMarker: "",
      type: "toggle",
      path: "custody.weatherProtect",
      step: "custody",
    },

    // —— Insurance / value ——
    {
      id: "has_rc",
      label: "Declarar cobertura de responsabilidad civil",
      placeholder: "Activa si el solicitante de la obra declara RC del evento",
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

    // —— Optional: loan / image / sale + other clauses ——
    {
      id: "opt_loan",
      label: "Incluir marco de préstamo o cesión temporal",
      placeholder:
        "Activa si la obra se presta o cede temporalmente sin transmitir la autoría",
      emptyMarker: "",
      type: "toggle",
      path: "options.loanFrame",
      step: "options",
      group: "Préstamo / cesión temporal",
    },
    {
      id: "loan_purpose",
      label: "Finalidad del préstamo o cesión",
      placeholder:
        "Escribe la finalidad (por ejemplo: exhibición temporal en el evento)",
      emptyMarker: "[finalidad del préstamo o cesión]",
      type: "text",
      path: "options.loanPurpose",
      step: "options",
      group: "Préstamo / cesión temporal",
      showIf: "options.loanFrame",
      required: true,
    },
    {
      id: "opt_image",
      label: "Incluir autorización de uso de imagen y reproducción",
      placeholder:
        "Activa para autorizar fotos, vídeo o reproducción de la obra en ciertos medios",
      emptyMarker: "",
      type: "toggle",
      path: "options.imageUse",
      step: "options",
      group: "Uso de imagen / reproducción",
    },
    {
      id: "image_scope",
      label: "Ámbito de la autorización",
      placeholder:
        "Describe qué se puede captar o reproducir (obra completa, detalles, montaje…)",
      emptyMarker: "[ámbito de la autorización de imagen]",
      type: "textarea",
      path: "options.imageScope",
      step: "options",
      group: "Uso de imagen / reproducción",
      showIf: "options.imageUse",
      required: true,
    },
    {
      id: "image_media",
      label: "Medios autorizados",
      placeholder:
        "Escribe los medios (web, redes, catálogo, prensa, dossier…)",
      emptyMarker: "[medios autorizados]",
      type: "text",
      path: "options.imageMedia",
      step: "options",
      group: "Uso de imagen / reproducción",
      showIf: "options.imageUse",
      required: true,
    },
    {
      id: "image_duration",
      label: "Duración de la autorización",
      placeholder:
        "Escribe el período (por ejemplo: durante el evento y seis meses después)",
      emptyMarker: "[duración de la autorización]",
      type: "text",
      path: "options.imageDuration",
      step: "options",
      group: "Uso de imagen / reproducción",
      showIf: "options.imageUse",
      required: true,
    },
    {
      id: "image_credit",
      label: "Crédito obligatorio",
      placeholder:
        "Escribe cómo debe citarse la obra y a quien tiene la autoría",
      emptyMarker: "[crédito obligatorio]",
      type: "text",
      path: "options.imageCredit",
      step: "options",
      group: "Uso de imagen / reproducción",
      showIf: "options.imageUse",
      required: true,
    },
    {
      id: "image_commercial",
      label: "Uso comercial autorizado",
      placeholder:
        "Activa solo si se permite uso con fines comerciales o publicitarios",
      emptyMarker: "",
      type: "toggle",
      path: "options.imageCommercial",
      step: "options",
      group: "Uso de imagen / reproducción",
      showIf: "options.imageUse",
    },
    {
      id: "image_adapt",
      label: "Permitir recortes o adaptaciones menores",
      placeholder:
        "Activa si se permiten recortes, reencuadres o adaptaciones técnicas menores",
      emptyMarker: "",
      type: "toggle",
      path: "options.imageAdapt",
      step: "options",
      group: "Uso de imagen / reproducción",
      showIf: "options.imageUse",
    },
    {
      id: "opt_sale",
      label: "Incluir condiciones de venta de la obra",
      placeholder:
        "Activa si este acuerdo también regula una posible venta de la obra",
      emptyMarker: "",
      type: "toggle",
      path: "options.saleTerms",
      step: "options",
      group: "Condiciones de venta",
    },
    {
      id: "sale_price",
      label: "Precio de venta (€, impuestos aparte si aplica)",
      placeholder: "Escribe el precio acordado o el precio de referencia",
      emptyMarker: "[precio de venta]",
      type: "money",
      path: "options.salePrice",
      step: "options",
      group: "Condiciones de venta",
      showIf: "options.saleTerms",
      required: true,
    },
    {
      id: "sale_reservation",
      label: "Reserva o señal",
      placeholder:
        "Escribe si hay reserva, señal o condiciones para apartar la obra",
      emptyMarker: "[condiciones de reserva o señal]",
      type: "text",
      path: "options.saleReservation",
      step: "options",
      group: "Condiciones de venta",
      showIf: "options.saleTerms",
    },
    {
      id: "sale_delivery",
      label: "Entrega tras la venta",
      placeholder:
        "Escribe cuándo y cómo se entrega la obra tras la venta",
      emptyMarker: "[condiciones de entrega tras la venta]",
      type: "text",
      path: "options.saleDelivery",
      step: "options",
      group: "Condiciones de venta",
      showIf: "options.saleTerms",
      required: true,
    },
    {
      id: "sale_no_exclusivity",
      label: "La venta no implica representación exclusiva",
      placeholder:
        "Activa para dejar claro que vender no otorga exclusividad de representación",
      emptyMarker: "",
      type: "toggle",
      path: "options.saleNoExclusivity",
      step: "options",
      group: "Condiciones de venta",
      showIf: "options.saleTerms",
    },
    {
      id: "sale_notes",
      label: "Otras condiciones de venta",
      placeholder: "Escribe cualquier otra condición relevante de la venta",
      emptyMarker: "[otras condiciones de venta]",
      type: "textarea",
      path: "options.saleNotes",
      step: "options",
      group: "Condiciones de venta",
      showIf: "options.saleTerms",
    },
    {
      id: "opt_transport",
      label: "Incluir transporte (ida y vuelta)",
      placeholder: "Activa para repartir quién organiza, quién paga y los puntos de recogida/entrega",
      emptyMarker: "",
      type: "toggle",
      path: "options.transport",
      step: "options",
      group: "Transporte",
    },
    {
      id: "transport_organizer",
      label: "Quién organiza el transporte",
      placeholder: "Escribe quién organiza la ida y la vuelta",
      emptyMarker: "[quién organiza el transporte]",
      type: "text",
      path: "options.transportOrganizer",
      step: "options",
      group: "Transporte",
      showIf: "options.transport",
      required: true,
    },
    {
      id: "transport_payer",
      label: "Quién paga el transporte",
      placeholder: "Escribe quién asume el coste del transporte",
      emptyMarker: "[quién paga el transporte]",
      type: "text",
      path: "options.transportPayer",
      step: "options",
      group: "Transporte",
      showIf: "options.transport",
      required: true,
    },
    {
      id: "transport_pickup",
      label: "Punto de recogida (ida)",
      placeholder: "Escribe dirección o lugar de recogida",
      emptyMarker: "[punto de recogida]",
      type: "text",
      path: "options.transportPickup",
      step: "options",
      group: "Transporte",
      showIf: "options.transport",
      required: true,
    },
    {
      id: "transport_return",
      label: "Punto de entrega (vuelta)",
      placeholder: "Escribe dirección o lugar de devolución",
      emptyMarker: "[punto de entrega de vuelta]",
      type: "text",
      path: "options.transportReturn",
      step: "options",
      group: "Transporte",
      showIf: "options.transport",
      required: true,
    },
    {
      id: "transport_notes",
      label: "Notas de transporte / seguro en tránsito",
      placeholder: "Escribe condiciones extra (embalaje, seguro en tránsito, horarios…)",
      emptyMarker: "[notas de transporte]",
      type: "textarea",
      path: "options.transportNotes",
      step: "options",
      group: "Transporte",
      showIf: "options.transport",
    },
    {
      id: "opt_costs",
      label: "Incluir costes y pagos",
      placeholder: "Activa para repartir honorarios, producción, dietas u otros gastos",
      emptyMarker: "",
      type: "toggle",
      path: "options.costs",
      step: "options",
      group: "Costes y pagos",
    },
    {
      id: "costs_no_fee",
      label: "Sin contraprestación económica por la exhibición",
      placeholder: "Activa si no hay honorario ni pago por participar",
      emptyMarker: "",
      type: "toggle",
      path: "options.costsNoFee",
      step: "options",
      group: "Costes y pagos",
      showIf: "options.costs",
    },
    {
      id: "costs_summary",
      label: "Reparto de costes y pagos",
      placeholder:
        "Ej.: honorario —; producción a cargo de…; dietas a cargo de…; material de montaje a cargo de…",
      emptyMarker: "[reparto de costes y pagos]",
      type: "textarea",
      path: "options.costsSummary",
      step: "options",
      group: "Costes y pagos",
      showIf: "options.costs",
      required: true,
    },
    {
      id: "opt_cancellation",
      label: "Incluir cancelación y retirada anticipada",
      placeholder:
        "Activa para regular cancelación del evento o retirada de la obra",
      emptyMarker: "",
      type: "toggle",
      path: "options.cancellation",
      step: "options",
      group: "Cancelación / retirada",
    },
    {
      id: "cancellation_terms",
      label: "Cancelación del evento o del acuerdo",
      placeholder:
        "Describe qué ocurre si el evento o el acuerdo se cancelan",
      emptyMarker: "[condiciones de cancelación]",
      type: "textarea",
      path: "options.cancellationTerms",
      step: "options",
      group: "Cancelación / retirada",
      showIf: "options.cancellation",
      required: true,
    },
    {
      id: "withdrawal_terms",
      label: "Retirada anticipada de la obra",
      placeholder:
        "Describe cuándo se puede retirar la obra (falta de seguros, condiciones incumplidas…)",
      emptyMarker: "[condiciones de retirada anticipada]",
      type: "textarea",
      path: "options.withdrawalTerms",
      step: "options",
      group: "Cancelación / retirada",
      showIf: "options.cancellation",
      required: true,
    },
    {
      id: "opt_contacts",
      label: "Incluir contactos operativos",
      placeholder:
        "Activa para fijar personas de referencia durante montaje y exhibición",
      emptyMarker: "",
      type: "toggle",
      path: "options.contacts",
      step: "options",
      group: "Contactos operativos",
    },
    {
      id: "contact_titular_name",
      label: "Contacto — autoría (nombre)",
      placeholder: "Nombre de la persona de referencia",
      emptyMarker: "[contacto autoría — nombre]",
      type: "text",
      path: "options.contactTitularName",
      step: "options",
      group: "Contactos operativos",
      showIf: "options.contacts",
      required: true,
    },
    {
      id: "contact_titular_phone",
      label: "Contacto — autoría (teléfono)",
      placeholder: "Teléfono de contacto operativo",
      emptyMarker: "[contacto autoría — teléfono]",
      type: "text",
      path: "options.contactTitularPhone",
      step: "options",
      group: "Contactos operativos",
      showIf: "options.contacts",
      required: true,
    },
    {
      id: "contact_titular_email",
      label: "Contacto — autoría (email)",
      placeholder: "Email de contacto operativo",
      emptyMarker: "[contacto autoría — email]",
      type: "text",
      path: "options.contactTitularEmail",
      step: "options",
      group: "Contactos operativos",
      showIf: "options.contacts",
      required: true,
    },
    {
      id: "contact_org_name",
      label: "Contacto — solicitante de la obra (nombre)",
      placeholder: "Nombre de la persona de referencia",
      emptyMarker: "[contacto solicitante de la obra — nombre]",
      type: "text",
      path: "options.contactOrgName",
      step: "options",
      group: "Contactos operativos",
      showIf: "options.contacts",
      required: true,
    },
    {
      id: "contact_org_phone",
      label: "Contacto — solicitante de la obra (teléfono)",
      placeholder: "Teléfono de contacto operativo",
      emptyMarker: "[contacto solicitante de la obra — teléfono]",
      type: "text",
      path: "options.contactOrgPhone",
      step: "options",
      group: "Contactos operativos",
      showIf: "options.contacts",
      required: true,
    },
    {
      id: "contact_org_email",
      label: "Contacto — solicitante de la obra (email)",
      placeholder: "Email de contacto operativo",
      emptyMarker: "[contacto solicitante de la obra — email]",
      type: "text",
      path: "options.contactOrgEmail",
      step: "options",
      group: "Contactos operativos",
      showIf: "options.contacts",
      required: true,
    },
    {
      id: "opt_inventory",
      label: "Incluir inventario de componentes",
      placeholder:
        "Activa para anexar la lista de piezas, cables, controladores, etc.",
      emptyMarker: "",
      type: "toggle",
      path: "options.inventory",
      step: "options",
      group: "Inventario de componentes",
    },
    {
      id: "inventory_list",
      label: "Inventario",
      placeholder:
        "Lista cada componente (una línea por elemento: piezas, cables, controladores…)",
      emptyMarker: "[inventario de componentes]",
      type: "textarea",
      path: "options.inventoryList",
      step: "options",
      group: "Inventario de componentes",
      showIf: "options.inventory",
      required: true,
    },
    {
      id: "opt_space",
      label: "Incluir espacio y accesos",
      placeholder:
        "Activa para fijar sala, horarios técnicos y quién aporta barreras o cartelas",
      emptyMarker: "",
      type: "toggle",
      path: "options.spaceAccess",
      step: "options",
      group: "Espacio y accesos",
    },
    {
      id: "space_description",
      label: "Espacio de exhibición",
      placeholder: "Sala, medidas mínimas u otras condiciones del espacio",
      emptyMarker: "[espacio de exhibición]",
      type: "text",
      path: "options.spaceDescription",
      step: "options",
      group: "Espacio y accesos",
      showIf: "options.spaceAccess",
      required: true,
    },
    {
      id: "space_hours",
      label: "Horarios de acceso técnico",
      placeholder: "Horarios para montaje, mantenimiento o acceso técnico",
      emptyMarker: "[horarios de acceso técnico]",
      type: "text",
      path: "options.spaceHours",
      step: "options",
      group: "Espacio y accesos",
      showIf: "options.spaceAccess",
      required: true,
    },
    {
      id: "space_equipment",
      label: "Quién aporta barreras, cartelas, pedestales u otros",
      placeholder: "Describe qué aporta cada parte (barreras, cartelas, pedestales…)",
      emptyMarker: "[aporte de barreras, cartelas u otros]",
      type: "textarea",
      path: "options.spaceEquipment",
      step: "options",
      group: "Espacio y accesos",
      showIf: "options.spaceAccess",
      required: true,
    },
    {
      id: "opt_subcontract",
      label: "Incluir subcontratación / terceros",
      placeholder:
        "Activa si pueden intervenir montadores, seguridad u otros terceros",
      emptyMarker: "",
      type: "toggle",
      path: "options.subcontract",
      step: "options",
      group: "Subcontratación",
    },
    {
      id: "subcontract_terms",
      label: "Condiciones de subcontratación",
      placeholder:
        "Ej.: seguridad del recinto y transporte interno; no el montaje artístico",
      emptyMarker: "[condiciones de subcontratación]",
      type: "textarea",
      path: "options.subcontractTerms",
      step: "options",
      group: "Subcontratación",
      showIf: "options.subcontract",
      required: true,
    },
    {
      id: "opt_ip",
      label: "Incluir propiedad intelectual (más allá de imagen)",
      placeholder:
        "Activa para dejar claro que no hay cesión de derechos ni obras derivadas",
      emptyMarker: "",
      type: "toggle",
      path: "options.ipRights",
      step: "options",
      group: "Propiedad intelectual",
    },
    {
      id: "ip_name_use",
      label: "Uso de nombre, crédito o marca",
      placeholder:
        "Describe cómo puede usarse el nombre o crédito de quien tiene la autoría",
      emptyMarker: "[uso de nombre, crédito o marca]",
      type: "text",
      path: "options.ipNameUse",
      step: "options",
      group: "Propiedad intelectual",
      showIf: "options.ipRights",
      required: true,
    },
    {
      id: "opt_amendments",
      label: "Incluir que las modificaciones sean por escrito",
      placeholder:
        "Activa para exigir que cualquier cambio al anexo conste por escrito",
      emptyMarker: "",
      type: "toggle",
      path: "options.amendments",
      step: "options",
      group: "Modificaciones y notificaciones",
    },
    {
      id: "opt_notices",
      label: "Incluir notificaciones formales",
      placeholder: "Activa para fijar los emails válidos para avisos formales",
      emptyMarker: "",
      type: "toggle",
      path: "options.notices",
      step: "options",
      group: "Modificaciones y notificaciones",
    },
    {
      id: "notice_email_titular",
      label: "Email para notificaciones — autoría",
      placeholder: "Escribe el email que vale para avisos formales",
      emptyMarker: "[email de notificaciones — autoría]",
      type: "text",
      path: "options.noticeEmailTitular",
      step: "options",
      group: "Modificaciones y notificaciones",
      showIf: "options.notices",
      required: true,
    },
    {
      id: "notice_email_org",
      label: "Email para notificaciones — solicitante de la obra",
      placeholder: "Escribe el email que vale para avisos formales",
      emptyMarker: "[email de notificaciones — solicitante de la obra]",
      type: "text",
      path: "options.noticeEmailOrg",
      step: "options",
      group: "Modificaciones y notificaciones",
      showIf: "options.notices",
      required: true,
    },
    {
      id: "opt_delivery_act",
      label: "Incluir acta de entrega y devolución",
      placeholder: "Activa para exigir acta con estado de la obra",
      emptyMarker: "",
      type: "toggle",
      path: "options.deliveryAct",
      step: "options",
      group: "Otras cláusulas",
    },
    {
      id: "opt_policy_certs",
      label: "Exigir certificados de póliza previos",
      placeholder: "Activa para exigir acreditación de seguros antes del transporte",
      emptyMarker: "",
      type: "toggle",
      path: "options.policyCerts",
      step: "options",
      group: "Otras cláusulas",
    },
    {
      id: "opt_franchise",
      label: "Franquicia a cargo del solicitante de la obra",
      placeholder: "Activa para dejar claro quién asume la franquicia",
      emptyMarker: "",
      type: "toggle",
      path: "options.franchise",
      step: "options",
      group: "Otras cláusulas",
    },
    {
      id: "opt_jurisdiction",
      label: "Incluir ley aplicable y jurisdicción",
      placeholder: "Activa para fijar ley y tribunales",
      emptyMarker: "",
      type: "toggle",
      path: "options.jurisdiction",
      step: "options",
      group: "Otras cláusulas",
    },
    {
      id: "law_text",
      label: "Ley aplicable",
      placeholder: "Escribe la ley aplicable (ej.: legislación española)",
      emptyMarker: "[ley aplicable]",
      type: "text",
      path: "options.lawText",
      step: "options",
      group: "Otras cláusulas",
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
      group: "Otras cláusulas",
      showIf: "options.jurisdiction",
      required: true,
    },
    {
      id: "opt_expert",
      label: "Perito independiente para pérdida artística",
      placeholder: "Activa para no dejar la calificación solo a la Parte Autora",
      emptyMarker: "",
      type: "toggle",
      path: "options.independentExpert",
      step: "options",
      group: "Otras cláusulas",
    },
    {
      id: "opt_force_majeure",
      label: "Cláusula de fuerza mayor",
      placeholder: "Activa para regular eventos de fuerza mayor",
      emptyMarker: "",
      type: "toggle",
      path: "options.forceMajeure",
      step: "options",
      group: "Otras cláusulas",
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
{{parties.author.name}}, con documento {{parties.author.doc}}, {{parties.author.role}}, en adelante, quien ostenta la autoría («Parte Autora»).{{parties.author.repBlock}}{{parties.author.extra}}

Y de otra,
{{parties.org.name}}, con documento {{parties.org.cif}}, {{parties.org.quality}}, {{parties.org.roleDesc}} de {{project.eventName}}, en adelante, solicitante de la obra («Parte Solicitante»).{{parties.org.repBlock}}{{parties.org.extra}}

Ambas partes, reconociéndose capacidad legal suficiente para obligarse,`,
    },
    {
      id: "manifest",
      title: "MANIFIESTAN",
      body: `I. Que con fecha {{project.baseAgreementDate}} ambas partes suscribieron el Acuerdo de Participación correspondiente a la exhibición de la instalación artística de la Parte Autora durante {{project.eventName}}.
II. Que, debido a las características técnicas y de funcionamiento de la instalación, ambas partes consideran conveniente regular expresamente las condiciones particulares de su exhibición, custodia, conservación y responsabilidad.
III. Que el presente Anexo constituye un acuerdo específico negociado y aceptado libremente por ambas partes, complementa el Acuerdo de Participación y, exclusivamente respecto de la instalación artística objeto del mismo, prevalecerá sobre cualquier cláusula del citado Acuerdo que resulte incompatible con lo aquí establecido.`,
    },
    {
      id: "primera",
      title: "PRIMERA. Objeto",
      body: `La Parte Autora cede temporalmente la instalación artística «{{project.workTitle}}» para su exhibición durante {{project.eventName}}, a solicitud de la Parte Solicitante.{{project.exhibitPeriod}}`,
    },
    {
      id: "segunda",
      title: "SEGUNDA. Conocimiento y aceptación de la instalación",
      body: `La Parte Solicitante declara haber recibido con carácter previo a la firma del presente Anexo toda la información técnica necesaria relativa a la instalación, incluyendo su funcionamiento, necesidades eléctricas, características mecánicas, condiciones de seguridad, conservación, operación y exhibición.
Asimismo, declara haber recibido respuesta a todas las consultas técnicas formuladas durante la preparación del proyecto y manifiesta haber comprendido y aceptado expresamente todas las condiciones comunicadas por la Parte Autora.
La Parte Solicitante reconoce expresamente conocer que la instalación:
{{features.list}}
La Parte Solicitante declara conocer plenamente estas características y acepta expresamente la exhibición pública de la instalación en dichas condiciones.`,
    },
    {
      id: "tercera",
      title: "TERCERA. Montaje y desmontaje",
      body: `El montaje y el desmontaje de la instalación serán realizados exclusivamente por la Parte Autora. La entrega de la instalación se entenderá producida una vez finalizado el montaje y aceptada su recepción por la Parte Solicitante. Desde ese momento y hasta su devolución a la Parte Autora para proceder a su desmontaje, la Parte Solicitante asumirá íntegramente su custodia.`,
      requireAll: ["custody.authorMounts"],
    },
    {
      id: "tercera_alt",
      title: "TERCERA. Montaje y desmontaje",
      body: `El montaje y el desmontaje de la instalación se realizarán según lo acordado entre las partes. La entrega de la instalación se entenderá producida una vez finalizado el montaje y aceptada su recepción por la Parte Solicitante. Desde ese momento y hasta su devolución a la Parte Autora, la Parte Solicitante asumirá íntegramente su custodia.`,
      excludeIf: ["custody.authorMounts"],
    },
    {
      id: "cuarta",
      title: "CUARTA. Custodia, vigilancia y protección",
      body: `Desde la entrega de la instalación hasta su devolución a la Parte Autora, la Parte Solicitante asumirá íntegramente su custodia, conservación, vigilancia y protección.
En particular, la Parte Solicitante se compromete a:
{{custody.duties}}
La obligación de mantener vigilancia permanente constituye una condición esencial para la exhibición de la instalación y ha sido expresamente aceptada por la Parte Solicitante, cuando resulte de aplicación conforme a las características de la obra.
La ausencia de vigilancia o la falta de adopción de las medidas de protección necesarias se considerará un incumplimiento de las obligaciones de custodia asumidas por la Parte Solicitante.`,
    },
    {
      id: "quinta",
      title: "QUINTA. Almacenamiento y manipulación de las piezas",
      body: `Con el fin de preservar la integridad de la obra, las {{features.sculptureCount}} piezas podrán ser retiradas diariamente de la instalación para su almacenamiento temporal fuera del horario de exhibición y repuestas nuevamente para su apertura al público.
Las operaciones de retirada, almacenamiento, custodia, manipulación y posterior reposición serán realizadas bajo la exclusiva responsabilidad de la Parte Solicitante.
La Parte Solicitante responderá de cualquier pérdida, robo, hurto, desaparición, desperfecto, deterioro o daño que pudiera producirse durante dichas operaciones, así como de cualquier daño al sistema mecánico, eléctrico y electrónico de la instalación durante todo el período de custodia.`,
      requireAll: ["features.hasSculptures", "custody.dailyRemove"],
    },
    {
      id: "sexta",
      title: "SEXTA. Responsabilidad civil",
      body: `La Parte Solicitante declara que la instalación artística objeto del presente Anexo se encuentra debidamente cubierta por la póliza de Responsabilidad Civil correspondiente a {{project.eventName}} durante todo el período en que permanezca bajo su custodia y exhibición.
La Parte Solicitante asume íntegramente la responsabilidad derivada de la exhibición pública de la instalación, de su funcionamiento, de la interacción del público con la misma y de todas las medidas de seguridad necesarias para garantizar la protección de las personas, de la propia obra y de las instalaciones durante todo el período en que la instalación permanezca bajo su custodia.
La Parte Solicitante declara que la decisión de exhibir públicamente la instalación ha sido adoptada libremente, tras haber recibido toda la información técnica y de seguridad facilitada por la Parte Autora, conocer las características y riesgos inherentes a la obra y aceptar expresamente las condiciones necesarias para su correcta exhibición.
La existencia, alcance, validez o eficacia de la póliza de Responsabilidad Civil no limitará, en ningún caso, las obligaciones asumidas por la Parte Solicitante mediante el presente Anexo.`,
      requireAll: ["insurance.hasRc"],
    },
    {
      id: "septima",
      title: "SÉPTIMA. Seguro de daños de la instalación",
      body: `La Parte Solicitante declara que la instalación artística objeto del presente Anexo se encuentra debidamente cubierta mediante una póliza de seguro de daños a todo riesgo («clavo a clavo»), plenamente vigente, que garantiza la integridad patrimonial de la obra durante todo el período de su participación en {{project.eventName}}.
Dicha cobertura comprenderá, como mínimo: el transporte de ida y vuelta; las operaciones de carga y descarga; el montaje y desmontaje; la permanencia en el recinto; la exhibición pública; el almacenamiento temporal de piezas y elementos; y la manipulación necesaria para su conservación y reposición.
La cobertura incluirá, entre otros, los riesgos de pérdida, robo, hurto, desaparición, desperfecto, deterioro, vandalismo, incendio, agua, lluvia, viento, humedad, fenómenos meteorológicos, accidente, manipulación y cualquier otro daño accidental o fortuito.
La cobertura de seguro comenzará en el momento en que la instalación abandone físicamente su lugar de almacenamiento y finalizará únicamente cuando, tras el transporte de retorno, haya sido descargada e introducida nuevamente en el interior de dicho lugar.
La existencia, alcance o condiciones de la póliza de seguro de daños no limitarán, en ningún caso, las obligaciones de custodia, conservación, protección e indemnización asumidas por la Parte Solicitante.
La suma asegurada será, como mínimo, igual al valor declarado de la instalación establecido en la cláusula de valor declarado del presente Anexo.`,
      requireAll: ["insurance.hasNailToNail"],
    },
    {
      id: "octava",
      title: "OCTAVA. Responsabilidad sobre la instalación",
      body: `La Parte Solicitante responderá frente a la Parte Autora por cualquier pérdida, robo, hurto, desaparición, destrucción, desperfecto o deterioro total o parcial que pueda sufrir la instalación o cualquiera de sus componentes desde el momento de su entrega por la Parte Autora tras el montaje y hasta su devolución a la Parte Autora para proceder a su desmontaje.
Se considerarán expresamente incluidos, entre otros, los daños derivados de: robo; hurto; vandalismo; incendio; agua; lluvia; viento; humedad; fenómenos meteorológicos; manipulación por terceros; manipulación y almacenamiento de piezas; falta o insuficiencia de vigilancia; falta de protección; incumplimiento de las instrucciones técnicas de la Parte Autora; y cualquier actuación u omisión que implique una custodia insuficiente o inadecuada.
En caso de pérdida total, destrucción o robo de la instalación, la Parte Solicitante indemnizará a la Parte Autora por el valor declarado establecido en la cláusula de valor declarado.
En caso de daños parciales, la Parte Solicitante asumirá íntegramente los costes de reparación, restauración, sustitución de componentes, materiales, mano de obra especializada y cualquier otro gasto necesario para devolver la instalación al estado en que fue entregada.
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
      body: `El presente Anexo entrará en vigor desde el momento de su firma y permanecerá vigente desde la entrega efectiva de la instalación a la Parte Solicitante hasta su devolución a la Parte Autora para proceder a su desmontaje.
Las partes manifiestan que el presente Anexo ha sido negociado y aceptado libremente, refleja los acuerdos específicos alcanzados para la exhibición de la instalación artística y forma parte integrante del Acuerdo de Participación, constituyendo ambos documentos una única unidad contractual y debiendo interpretarse conjuntamente.`,
    },
    {
      id: "opt_acta",
      title: "Acta de entrega y devolución",
      body: `La entrega y la devolución de la instalación se documentarán mediante acta firmada por ambas partes, que incluirá la fecha, el estado aparente de la instalación, un inventario de componentes y, cuando sea posible, registro fotográfico. La falta de acta no exime a la Parte Solicitante de sus obligaciones de custodia.`,
      requireAll: ["options.deliveryAct"],
    },
    {
      id: "opt_certs",
      title: "Acreditación de seguros",
      body: `Con carácter previo al transporte de la instalación desde su lugar de almacenamiento, la Parte Solicitante entregará a la Parte Autora certificado o extracto de las pólizas de Responsabilidad Civil y de daños que acredite la vigencia, los límites, la inclusión de la obra y el período de cobertura. La falta de acreditación autorizará a la Parte Autora a suspender la entrega sin perjuicio de las demás acciones que le correspondan.`,
      requireAll: ["options.policyCerts"],
    },
    {
      id: "opt_franq",
      title: "Franquicia",
      body: `Cualquier franquicia, deducible o importe no cubierto por las pólizas será asumido íntegramente por la Parte Solicitante, sin que pueda trasladarse a la Parte Autora.`,
      requireAll: ["options.franchise"],
    },
    {
      id: "opt_jur",
      title: "Ley aplicable y jurisdicción",
      body: `El presente Anexo se rige por {{options.lawText}}. Para la resolución de cualquier controversia derivada del mismo, las partes se someten a los {{options.courtsText}}, con renuncia a cualquier otro fuero que pudiera corresponderles.`,
      requireAll: ["options.jurisdiction"],
    },
    {
      id: "opt_expert",
      title: "Valoración de pérdida artística",
      body: `La valoración sobre la afectación irreversible de las características artísticas de la obra podrá ser realizada por la Parte Autora y, a solicitud de cualquiera de las partes, contrastada por un perito independiente de común acuerdo. A falta de acuerdo sobre el perito en el plazo de quince (15) días, podrá designarse conforme a la práctica habitual de arbitraje pericial o por el colegio profesional competente.`,
      requireAll: ["options.independentExpert"],
    },
    {
      id: "opt_fm",
      title: "Fuerza mayor",
      body: `Ninguna de las partes será responsable por el incumplimiento de obligaciones cuando dicho incumplimiento derive de causas de fuerza mayor debidamente acreditadas. Ello no exime a la Parte Solicitante de sus deberes de protección razonable de la instalación ni de las coberturas de seguro comprometidas, en la medida en que resulten aplicables.`,
      requireAll: ["options.forceMajeure"],
    },
    {
      id: "opt_loan",
      title: "Préstamo o cesión temporal",
      body: `Las partes acuerdan que la puesta a disposición de la obra o instalación «{{project.workTitle}}» tiene carácter de préstamo o cesión temporal con la siguiente finalidad: {{options.loanPurpose}}.
Dicha puesta a disposición no transmite la autoría ni la propiedad de la obra ni ningún derecho de explotación distinto de los expresamente regulados en el presente Anexo. La Parte Solicitante recibe la obra en calidad de depositaria / cesionaria temporal a los solos efectos de su exhibición y custodia durante el período acordado, debiendo devolverla a la Parte Autora en los términos previstos en este Anexo.
Cualquier uso, traslado o manipulación no contemplado requerirá autorización expresa de la Parte Autora.`,
      requireAll: ["options.loanFrame"],
    },
    {
      id: "opt_image",
      title: "Uso de imagen y reproducción",
      body: `La Parte Autora autoriza a la Parte Solicitante a captar, reproducir y difundir imágenes (fijas o en movimiento) de la obra «{{project.workTitle}}» en el siguiente ámbito: {{options.imageScope}}.
Medios autorizados: {{options.imageMedia}}.
Duración de la autorización: {{options.imageDuration}}.
Crédito obligatorio en cada uso: {{options.imageCredit}}.
{{options.imageCommercialText}}
{{options.imageAdaptText}}
Fuera de este ámbito, cualquier reproducción o uso de imagen requerirá autorización adicional y expresa de la Parte Autora. Esta autorización no implica cesión de derechos de autor ni de la autoría de la obra.`,
      requireAll: ["options.imageUse"],
    },
    {
      id: "opt_sale",
      title: "Condiciones de venta",
      body: `Sin perjuicio de la exhibición y custodia reguladas en este Anexo, las partes dejan constancia de las siguientes condiciones para una eventual venta de la obra «{{project.workTitle}}»:
Precio: {{options.salePrice}} € (impuestos aparte, si resultan aplicables).
{{options.saleReservationText}}
Entrega: {{options.saleDelivery}}.
{{options.saleExclusivityText}}
{{options.saleNotesText}}
La venta, si se formaliza, se documentará de forma expresa. Mientras no conste acuerdo de venta perfeccionado, la obra permanece bajo la autoría de la Parte Autora y sujeta a las obligaciones de custodia y devolución de este Anexo.`,
      requireAll: ["options.saleTerms"],
    },
    {
      id: "opt_transport",
      title: "Transporte",
      body: `El transporte de ida y vuelta de la obra o instalación «{{project.workTitle}}» se reparte así:
— Quién organiza el transporte: {{options.transportOrganizer}}.
— Asunción del coste: {{options.transportPayer}}.
— Punto de recogida (ida): {{options.transportPickup}}.
— Punto de entrega o devolución (vuelta): {{options.transportReturn}}.
{{options.transportNotesText}}
Quien organice el transporte cuidará un embalaje adecuado y la coordinación de horarios. El riesgo durante el tránsito se alineará con las coberturas de seguro y con las obligaciones de custodia de este Anexo, salvo pacto escrito distinto. La falta de coordinación del transporte no exime de las obligaciones de custodia, entrega y devolución aquí previstas.`,
      requireAll: ["options.transport"],
    },
    {
      id: "opt_costs",
      title: "Costes y pagos",
      body: `{{options.costsNoFeeText}}
Reparto concreto de costes y pagos (honorarios, producción, dietas, material de montaje u otros): {{options.costsSummary}}.
Cada parte asume únicamente los conceptos que le correspondan según ese reparto. Cualquier gasto adicional, extraordinario o no previsto requerirá acuerdo expreso previo. La existencia de un pago o reembolso no altera la autoría de la obra ni las obligaciones de custodia, seguro y devolución de este Anexo.`,
      requireAll: ["options.costs"],
    },
    {
      id: "opt_cancellation",
      title: "Cancelación y retirada anticipada",
      body: `Si el evento, la exhibición o este Anexo se cancelan, se aplicará lo siguiente: {{options.cancellationTerms}}.
Además, la Parte Autora podrá retirar anticipadamente la obra cuando concurra alguna de estas circunstancias o las que se detallen a continuación: falta o insuficiencia de seguros exigidos; incumplimiento grave de custodia, vigilancia o seguridad; o condiciones del espacio incompatibles con la integridad de la obra. Condiciones adicionales de retirada: {{options.withdrawalTerms}}.
En caso de retirada anticipada justificada, la Parte Solicitante facilitará el acceso y la logística razonables para recuperar la obra y seguirá respondiendo de las obligaciones nacidas hasta ese momento, incluidos daños ya producidos.`,
      requireAll: ["options.cancellation"],
    },
    {
      id: "opt_contacts",
      title: "Contactos operativos",
      body: `Durante el montaje, la exhibición y la devolución, las personas de referencia serán:
Por la Parte Autora: {{options.contactTitularName}}, teléfono {{options.contactTitularPhone}}, email {{options.contactTitularEmail}}.
Por la Parte Solicitante: {{options.contactOrgName}}, teléfono {{options.contactOrgPhone}}, email {{options.contactOrgEmail}}.
Estas personas servirán para coordinación operativa. Las notificaciones formales, si se pactan, se regirán por la cláusula de notificaciones.`,
      requireAll: ["options.contacts"],
    },
    {
      id: "opt_inventory",
      title: "Inventario de componentes",
      body: `Las partes dejan constancia del siguiente inventario de componentes de la obra o instalación «{{project.workTitle}}»:
{{options.inventoryFormatted}}
Este inventario es referencia vinculante para la entrega y la devolución. Si existe acta de entrega y devolución, el inventario se incorporará a dicha acta o se anexará a ella. Cualquier falta, sustitución, extravío o daño respecto del inventario se hará constar por escrito y se regirá por las obligaciones de custodia e indemnización de este Anexo.`,
      requireAll: ["options.inventory"],
    },
    {
      id: "opt_space",
      title: "Espacio y accesos",
      body: `La Parte Solicitante pondrá a disposición un espacio adecuado para la obra «{{project.workTitle}}» con estas condiciones:
— Espacio de exhibición: {{options.spaceDescription}}.
— Horarios de acceso técnico (montaje, mantenimiento, desmontaje): {{options.spaceHours}}.
— Quién aporta barreras, cartelas, pedestales u otros elementos de presentación o protección: {{options.spaceEquipment}}.
La Parte Solicitante garantiza que el espacio, los accesos y los medios aportados permitan un montaje, exhibición y desmontaje seguros, conformes a las instrucciones técnicas de la Parte Autora y compatibles con la integridad de la obra y la seguridad de las personas.`,
      requireAll: ["options.spaceAccess"],
    },
    {
      id: "opt_subcontract",
      title: "Subcontratación",
      body: `La Parte Solicitante podrá valerse de terceros para determinadas tareas solo en el siguiente marco: {{options.subcontractTerms}}.
Aunque intervengan montadores, seguridad, transporte u otros subcontratistas, la Parte Solicitante sigue siendo plenamente responsable frente a la Parte Autora del cumplimiento de este Anexo (custodia, seguro, daños, plazos y condiciones de exhibición). La Parte Solicitante se obliga a transmitir a dichos terceros las instrucciones técnicas relevantes y a vigilar su cumplimiento.`,
      requireAll: ["options.subcontract"],
    },
    {
      id: "opt_ip",
      title: "Propiedad intelectual",
      body: `La exhibición o puesta a disposición temporal de la obra «{{project.workTitle}}» no implica cesión de derechos de autor, derechos conexos ni de la autoría de la obra.
Salvo lo expresamente autorizado en este Anexo (incluida, en su caso, la cláusula de uso de imagen y reproducción), queda prohibido reproducir, comunicar públicamente fuera del ámbito pactado, transformar, crear obras derivadas o explotar la obra o sus elementos distintivos.
Uso autorizado del nombre, crédito o marca vinculados a la obra o a quien ostenta la autoría: {{options.ipNameUse}}.
Cualquier uso distinto requerirá autorización adicional y expresa de la Parte Autora.`,
      requireAll: ["options.ipRights"],
    },
    {
      id: "opt_amendments",
      title: "Modificaciones",
      body: `Cualquier modificación, ampliación o excepción a este Anexo deberá constar por escrito y ser aceptada por ambas partes. No tendrán validez los pactos verbales que contradigan lo aquí acordado.`,
      requireAll: ["options.amendments"],
    },
    {
      id: "opt_notices",
      title: "Notificaciones",
      body: `Las notificaciones formales entre las partes relacionadas con este Anexo se dirigirán a:
Parte Autora: {{options.noticeEmailTitular}}.
Parte Solicitante: {{options.noticeEmailOrg}}.
Se entenderán recibidas cuando conste su envío a dichas direcciones, sin perjuicio de otros medios admitidos en derecho.`,
      requireAll: ["options.notices"],
    },
    {
      id: "signatures",
      title: "Firmas",
      body: `Y para que así conste, ambas partes firman el presente documento por duplicado y a un solo efecto.

En {{project.city}}, a {{project.signDate}}.

AUTORÍA
{{parties.author.name}}
Documento: {{parties.author.doc}}
{{parties.author.sigRep}}Firma:




POR LA PARTE SOLICITANTE
{{parties.org.name}}
Documento: {{parties.org.cif}}
{{parties.org.sigRep}}Firma:
Sello (si procede)`,
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

  const repName = String(v["parties.author.repName"] ?? "").trim();
  const repDoc = String(v["parties.author.repDoc"] ?? "").trim();
  const repRole = String(v["parties.author.repRole"] ?? "").trim();
  if (repName) {
    const docBit = repDoc || "[documento — representante del autor]";
    const roleBit = repRole || "[cargo — representante del autor]";
    v["parties.author.repBlock"] =
      `\nActuando en este acto a través de ${repName}, con documento ${docBit}, en calidad de ${roleBit} (representante del autor).`;
    v["parties.author.sigRep"] =
      `Representante del autor: ${repName}\nDocumento: ${docBit}\nCargo: ${roleBit}\n`;
  } else {
    v["parties.author.repBlock"] = "";
    v["parties.author.sigRep"] = "";
  }

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
  if (v["parties.org.web"]) {
    orgBits.push(`Web: ${v["parties.org.web"]}.`);
  }
  v["parties.org.extra"] = orgBits.length > 0 ? `\n${orgBits.join(" ")}` : "";

  const orgRepName = String(v["parties.org.repName"] ?? "").trim();
  const orgRepDoc = String(v["parties.org.repDoc"] ?? "").trim();
  const orgRepRole = String(v["parties.org.repRole"] ?? "").trim();
  if (orgRepName) {
    const docBit = orgRepDoc || "[documento — representante del solicitante]";
    const roleBit = orgRepRole || "[cargo — representante del solicitante]";
    v["parties.org.repBlock"] =
      `\nActuando en este acto a través de ${orgRepName}, con documento ${docBit}, en calidad de ${roleBit} (representante del solicitante).`;
    v["parties.org.sigRep"] =
      `Representante del solicitante: ${orgRepName}\nDocumento: ${docBit}\nCargo: ${roleBit}\n`;
  } else {
    v["parties.org.repBlock"] = "";
    v["parties.org.sigRep"] = "";
  }

  if (v["options.imageCommercial"]) {
    v["options.imageCommercialText"] =
      "Se autoriza el uso con fines comerciales o publicitarios dentro del ámbito y medios indicados.";
  } else {
    v["options.imageCommercialText"] =
      "Queda excluido el uso con fines comerciales o publicitarios, salvo autorización adicional y expresa.";
  }

  if (v["options.imageAdapt"]) {
    v["options.imageAdaptText"] =
      "Se permiten recortes, reencuadres o adaptaciones técnicas menores que no alteren el sentido de la obra.";
  } else {
    v["options.imageAdaptText"] =
      "No se permiten recortes, reencuadres ni adaptaciones sin autorización adicional y expresa.";
  }

  const reservation = String(v["options.saleReservation"] ?? "").trim();
  v["options.saleReservationText"] = reservation
    ? `Reserva o señal: ${reservation}.`
    : "No se ha pactado en este Anexo una reserva o señal específica.";

  if (v["options.saleNoExclusivity"]) {
    v["options.saleExclusivityText"] =
      "La eventual venta no otorga a la Parte Solicitante representación exclusiva ni mandato de venta en exclusiva.";
  } else {
    v["options.saleExclusivityText"] =
      "Las partes no han regulado en este Anexo un régimen de exclusividad de representación o venta.";
  }

  const saleNotes = String(v["options.saleNotes"] ?? "").trim();
  v["options.saleNotesText"] = saleNotes
    ? `Otras condiciones: ${saleNotes}`
    : "";

  const transportNotes = String(v["options.transportNotes"] ?? "").trim();
  v["options.transportNotesText"] = transportNotes
    ? `Condiciones adicionales de transporte: ${transportNotes}`
    : "";

  if (v["options.costsNoFee"]) {
    v["options.costsNoFeeText"] =
      "Las partes dejan constancia de que la exhibición o puesta a disposición de la obra no lleva aparejada contraprestación económica por participación, salvo los costes expresamente repartidos a continuación.";
  } else {
    v["options.costsNoFeeText"] =
      "Las partes regulan los costes y pagos asociados a la exhibición o puesta a disposición de la obra según lo siguiente.";
  }

  const inventoryRaw = String(v["options.inventoryList"] ?? "").trim();
  if (inventoryRaw) {
    v["options.inventoryFormatted"] = inventoryRaw
      .split(/\n+/)
      .map((line) => line.trim())
      .filter(Boolean)
      .map((line) => (line.startsWith("—") ? line : `— ${line}`))
      .join("\n");
  } else {
    v["options.inventoryFormatted"] = "— [inventario de componentes]";
  }

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
      "— Adoptar todas las medidas de seguridad necesarias derivadas de las condiciones especiales de riesgo declaradas y de las instrucciones técnicas facilitadas por la Parte Autora.",
    );
  }
  duties.push("— Cumplir en todo momento las instrucciones técnicas facilitadas por la Parte Autora.");
  duties.push(
    "— No modificar la configuración, programación, cableado, componentes o condiciones de funcionamiento de la instalación sin autorización expresa de la Parte Autora.",
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
