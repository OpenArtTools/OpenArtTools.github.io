/**
 * Copyright (C) 2026 Gerard Valls Montaño
 * SPDX-License-Identifier: AGPL-3.0-or-later
 *
 * Exhibition / custody / insurance agreement template (standalone by default;
 * optional annex mode when linked to a main contract).
 * No real personal or project data — only instructional placeholders.
 */

import type { TemplateDoc } from "../engine/types";

export const exhibitionCustodyEs: TemplateDoc = {
  id: "exhibition-custody-es",
  name: "Acuerdo de exhibición, custodia, seguro y responsabilidad",
  description:
    "Acuerdo (o anexo a un acuerdo principal) para exhibir temporalmente una obra: custodia, seguro, uso de imagen, venta y responsabilidad.",
  steps: [
    {
      id: "titularidad",
      title: "Autoría",
      blurb:
        "Datos de quien tiene la autoría. Si firma un representante de la Parte Autora, se indica en ese bloque.",
    },
    {
      id: "solicitante",
      title: "Solicitante de la obra",
      blurb:
        "Datos completos de quien solicita la cesión temporal de la obra para su exhibición. El representante de la Parte Solicitante es opcional.",
    },
    {
      id: "project",
      title: "Proyecto y obra",
      blurb:
        "Datos del evento, la obra y la firma. Por defecto es un acuerdo autónomo; se marca como anexo solo si complementa un acuerdo principal.",
    },
    {
      id: "features",
      title: "Características",
      blurb: "Indicar qué aplica a la instalación. Cada opción debe ser distinta: conviene leer la descripción antes de incluirla.",
    },
    {
      id: "custody",
      title: "Montaje y custodia",
      blurb:
        "Quién monta y qué obligaciones de protección aplican. La retirada diaria de piezas solo aparece si en Características se han marcado piezas individuales.",
    },
    {
      id: "insurance",
      title: "Seguros y valor",
      blurb:
        "Incluir solo lo que aporta la Parte Solicitante. Si hay piezas individuales, desglosar el valor del sistema técnico o instalación y el de las piezas individuales.",
    },
    {
      id: "options",
      title: "Cláusulas opcionales",
      blurb:
        "Incluir solo lo necesario. Lo desactivado no aparece en el documento.",
    },
  ],
  fields: [
    // —— Autoría ——
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
      id: "author_address",
      label: "Domicilio — autoría",
      placeholder: "Calle, número, ciudad",
      emptyMarker: "[domicilio — autoría]",
      type: "text",
      path: "parties.author.address",
      step: "titularidad",
    },
    {
      id: "author_rep_name",
      label: "Nombre — representante de la Parte Autora",
      placeholder: "Nombre y apellidos de quien firma",
      emptyMarker: "[nombre — representante de la Parte Autora]",
      type: "text",
      path: "parties.author.repName",
      step: "titularidad",
      group: "Representante de la Parte Autora (opcional)",
    },
    {
      id: "author_rep_doc",
      label: "Documento — representante de la Parte Autora",
      placeholder: "DNI, NIE u otro documento",
      emptyMarker: "[documento — representante de la Parte Autora]",
      type: "text",
      path: "parties.author.repDoc",
      step: "titularidad",
      group: "Representante de la Parte Autora (opcional)",
    },
    {
      id: "author_rep_role",
      label: "Cargo — representante de la Parte Autora",
      placeholder: "Cargo con el que firma",
      emptyMarker: "[cargo — representante de la Parte Autora]",
      type: "text",
      path: "parties.author.repRole",
      step: "titularidad",
      group: "Representante de la Parte Autora (opcional)",
    },
    // —— Solicitante ——
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
      label: "Nombre — representante de la Parte Solicitante",
      placeholder: "Nombre y apellidos de quien firma",
      emptyMarker: "[nombre — representante de la Parte Solicitante]",
      type: "text",
      path: "parties.org.repName",
      step: "solicitante",
      group: "Representante de la Parte Solicitante (opcional)",
    },
    {
      id: "org_rep_doc",
      label: "Documento — representante de la Parte Solicitante",
      placeholder: "DNI, NIE u otro documento",
      emptyMarker: "[documento — representante de la Parte Solicitante]",
      type: "text",
      path: "parties.org.repDoc",
      step: "solicitante",
      group: "Representante de la Parte Solicitante (opcional)",
    },
    {
      id: "org_rep_role",
      label: "Cargo — representante de la Parte Solicitante",
      placeholder: "Cargo con el que firma",
      emptyMarker: "[cargo — representante de la Parte Solicitante]",
      type: "text",
      path: "parties.org.repRole",
      step: "solicitante",
      group: "Representante de la Parte Solicitante (opcional)",
    },
    // —— Proyecto y obra ——
    {
      id: "work_title",
      label: "Título de la obra o instalación",
      placeholder: "Título exacto de la obra",
      emptyMarker: "[título de la obra o instalación]",
      type: "text",
      path: "project.workTitle",
      required: true,
      step: "project",
      group: "Obra y evento",
    },
    {
      id: "event_name",
      label: "Nombre del evento",
      placeholder: "Festival, exhibición o evento",
      emptyMarker: "[nombre del evento]",
      type: "text",
      path: "project.eventName",
      required: true,
      step: "project",
      group: "Obra y evento",
    },
    {
      id: "venue",
      label: "Lugar de exhibición (opcional)",
      placeholder: "Recinto, sala o dirección",
      emptyMarker: "[lugar de exhibición]",
      type: "text",
      path: "project.venue",
      step: "project",
      group: "Obra y evento",
    },
    {
      id: "exhibit_from",
      label: "Inicio del período de exhibición (opcional)",
      placeholder: "Indicar o seleccionar la fecha de inicio",
      emptyMarker: "[fecha de inicio de exhibición]",
      type: "date",
      path: "project.exhibitFrom",
      step: "project",
      group: "Período de exhibición",
    },
    {
      id: "exhibit_to",
      label: "Fin del período de exhibición (opcional)",
      placeholder: "Indicar o seleccionar la fecha de fin",
      emptyMarker: "[fecha de fin de exhibición]",
      type: "date",
      path: "project.exhibitTo",
      step: "project",
      group: "Período de exhibición",
    },
    {
      id: "city",
      label: "Ciudad de firma",
      placeholder: "Ciudad",
      emptyMarker: "[ciudad de firma]",
      type: "text",
      path: "project.city",
      required: true,
      step: "project",
      group: "Firma del documento",
    },
    {
      id: "sign_date",
      label: "Fecha de firma",
      placeholder: "Fecha de firma del documento",
      emptyMarker: "[fecha de firma]",
      type: "date",
      path: "project.signDate",
      required: true,
      step: "project",
      group: "Firma del documento",
    },
    {
      id: "is_annex",
      label: "Este documento es un anexo a un acuerdo principal",
      placeholder:
        "Incluir solo cuando este texto complementa un acuerdo principal ya firmado (p. ej. un acuerdo de participación)",
      emptyMarker: "",
      type: "toggle",
      path: "project.isAnnex",
      step: "project",
      group: "Anexo a un acuerdo principal",
    },
    {
      id: "main_agreement_name",
      label: "Nombre del acuerdo principal",
      placeholder: "p. ej. Acuerdo de participación",
      emptyMarker: "[nombre del acuerdo principal]",
      type: "text",
      path: "project.mainAgreementName",
      required: true,
      step: "project",
      group: "Anexo a un acuerdo principal",
      showIf: "project.isAnnex",
    },
    {
      id: "base_agreement_date",
      label: "Fecha del acuerdo principal",
      placeholder: "Fecha del acuerdo principal al que se anexa",
      emptyMarker: "[fecha del acuerdo principal]",
      type: "date",
      path: "project.baseAgreementDate",
      required: true,
      step: "project",
      group: "Anexo a un acuerdo principal",
      showIf: "project.isAnnex",
    },
    {
      id: "annex_title",
      label: "Título del anexo",
      placeholder: "p. ej. ANEXO I AL ACUERDO DE PARTICIPACIÓN",
      emptyMarker: "[título del anexo]",
      type: "text",
      path: "project.annexTitle",
      step: "project",
      group: "Anexo a un acuerdo principal",
      showIf: "project.isAnnex",
    },
    // —— Características ——
    {
      id: "feat_interactive",
      label: "El público puede interactuar con la obra",
      placeholder:
        "Incluir cuando la instalación está pensada para que el público la toque, active, use o participe en ella",
      emptyMarker: "",
      type: "toggle",
      path: "features.interactive",
      step: "features",
      group: "Naturaleza de la obra",
    },
    {
      id: "feat_sculptures",
      label: "Piezas individuales que requieren trato aparte",
      placeholder:
        "Incluir cuando hay un sistema generador u un conjunto de piezas físicas individuales que, por su naturaleza, no forman un bloque fijo con la instalación y pueden moverse, reponerse o almacenarse de forma separada",
      emptyMarker: "",
      type: "toggle",
      path: "features.hasSculptures",
      step: "features",
      group: "Naturaleza de la obra",
    },
    {
      id: "sculpture_count",
      label: "Número de piezas individuales",
      placeholder: "Indicar el número de piezas",
      emptyMarker: "[número de piezas individuales]",
      type: "number",
      path: "features.sculptureCount",
      step: "features",
      group: "Naturaleza de la obra",
      showIf: "features.hasSculptures",
      required: true,
    },
    {
      id: "feat_mechanical",
      label: "Elementos mecánicos",
      placeholder:
        "Incluir cuando hay mecanismos físicos: motores, engranajes, estructuras motorizadas, automatismos, etc.",
      emptyMarker: "",
      type: "toggle",
      path: "features.mechanical",
      step: "features",
      group: "Sistemas técnicos",
    },
    {
      id: "feat_electrical",
      label: "Elementos eléctricos",
      placeholder:
        "Incluir cuando hay instalación eléctrica: cableado de potencia, tomas, iluminación eléctrica, etc. (no confundir con electrónica de control)",
      emptyMarker: "",
      type: "toggle",
      path: "features.electrical",
      step: "features",
      group: "Sistemas técnicos",
    },
    {
      id: "feat_electronics",
      label: "Elementos electrónicos",
      placeholder:
        "Incluir cuando hay electrónica de control o señal: placas, sensores, pantallas, audio digital, programación, etc.",
      emptyMarker: "",
      type: "toggle",
      path: "features.electronics",
      step: "features",
      group: "Sistemas técnicos",
    },
    {
      id: "feat_moving",
      label: "Elementos móviles",
      placeholder:
        "Incluir cuando hay partes que se desplazan, giran, suben, bajan o cambian de posición durante el funcionamiento",
      emptyMarker: "",
      type: "toggle",
      path: "features.moving",
      step: "features",
      group: "Sistemas técnicos",
    },
    {
      id: "feat_power",
      label: "Requiere alimentación eléctrica",
      placeholder: "Incluir cuando necesita corriente de red (o equivalente) para funcionar",
      emptyMarker: "",
      type: "toggle",
      path: "features.needsPower",
      step: "features",
      group: "Sistemas técnicos",
    },
    {
      id: "feat_special_risk",
      label: "Condiciones especiales de seguridad o riesgo",
      placeholder:
        "Incluir cuando la obra implica riesgos o condiciones especiales que deban declararse (calor, frío, líquidos, cortes, altura, láser, etc.)",
      emptyMarker: "",
      type: "toggle",
      path: "features.specialRisk",
      step: "features",
      group: "Entorno y riesgos",
    },
    {
      id: "special_risk_desc",
      label: "Descripción de las condiciones especiales",
      placeholder:
        "Describir con precisión las condiciones o riesgos especiales de la instalación",
      emptyMarker: "[descripción de las condiciones especiales de seguridad o riesgo]",
      type: "textarea",
      path: "features.specialRiskDesc",
      step: "features",
      group: "Entorno y riesgos",
      showIf: "features.specialRisk",
      required: true,
    },
    {
      id: "feat_outdoor",
      label: "Exhibición en exterior o a la intemperie",
      placeholder: "Incluir cuando puede estar a la intemperie o sin protección fija",
      emptyMarker: "",
      type: "toggle",
      path: "features.outdoor",
      step: "features",
      group: "Entorno y riesgos",
    },
    {
      id: "feat_access_off",
      label: "Accesible también cuando está apagada o inactiva",
      placeholder:
        "Incluir cuando el público puede seguir acercándose o acceder al espacio de la obra aunque esté apagada, en pausa o fuera de funcionamiento (la custodia sigue aplicando)",
      emptyMarker: "",
      type: "toggle",
      path: "features.accessibleWhenOff",
      step: "features",
      group: "Acceso público y vigilancia",
    },
    {
      id: "feat_watch",
      label: "Requiere vigilancia presencial permanente",
      placeholder:
        "Incluir cuando hace falta una persona vigilando mientras la obra esté accesible al público",
      emptyMarker: "",
      type: "toggle",
      path: "features.needsWatch",
      step: "features",
      group: "Acceso público y vigilancia",
    },
    {
      id: "feat_signage",
      label: "Requiere carteles de seguridad o perímetro de protección",
      placeholder:
        "Incluir cuando deben mostrarse carteles indicativos de seguridad y/o perimetrar toda la instalación o una zona concreta por seguridad",
      emptyMarker: "",
      type: "toggle",
      path: "features.needsSecurityPerimeter",
      step: "features",
      group: "Acceso público y vigilancia",
    },
    {
      id: "feat_extra",
      label: "Añadir características adicionales en texto libre",
      placeholder: "Incluir para incluir otras características que no estén en la lista",
      emptyMarker: "",
      type: "toggle",
      path: "features.hasExtra",
      step: "features",
    },
    {
      id: "extra_chars",
      label: "Características adicionales",
      placeholder:
        "Indicar otras características relevantes de la instalación, una por línea si es posible",
      emptyMarker: "[características adicionales de la instalación]",
      type: "textarea",
      path: "features.extraText",
      step: "features",
      showIf: "features.hasExtra",
      required: true,
    },
    // —— Montaje y custodia ——
    {
      id: "author_mounts",
      label: "Montaje y desmontaje solo por la Parte Autora",
      placeholder: "Incluir cuando solo monta y desmonta la Parte Autora",
      emptyMarker: "",
      type: "toggle",
      path: "custody.authorMounts",
      step: "custody",
      group: "Montaje y piezas",
    },
    {
      id: "daily_remove",
      label: "Retirada y reposición diaria fuera del horario de exhibición",
      placeholder:
        "Incluir solo cuando, además de existir piezas individuales, se acuerda retirarlas al cerrar cada jornada y reponerlas al abrir (régimen diario de almacenamiento temporal)",
      emptyMarker: "",
      type: "toggle",
      path: "custody.dailyRemove",
      step: "custody",
      group: "Montaje y piezas",
      showIf: "features.hasSculptures",
    },
    {
      id: "weather_protect",
      label: "Obligación de protección meteorológica",
      placeholder: "Incluir cuando el solicitante de la obra debe proteger frente a clima",
      emptyMarker: "",
      type: "toggle",
      path: "custody.weatherProtect",
      step: "custody",
      group: "Protección climática",
    },
    // —— Seguros y valor ——
    {
      id: "has_rc",
      label: "La Parte Solicitante aporta cobertura de responsabilidad civil",
      placeholder:
        "Incluir solo cuando el solicitante de la obra es quien proporciona la RC del evento; si no la aporta, déjalo sin marcar",
      emptyMarker: "",
      type: "toggle",
      path: "insurance.hasRc",
      step: "insurance",
      group: "Coberturas de la Parte Solicitante",
    },
    {
      id: "has_nail",
      label: "La Parte Solicitante aporta seguro de daños clavo a clavo",
      placeholder:
        "Incluir solo cuando el solicitante de la obra es quien proporciona el seguro de daños a todo riesgo; si no lo aporta, déjalo sin marcar",
      emptyMarker: "",
      type: "toggle",
      path: "insurance.hasNailToNail",
      step: "insurance",
      group: "Coberturas de la Parte Solicitante",
    },
    {
      id: "system_value",
      label: "Valor del sistema o instalación (€, sin IVA)",
      placeholder:
        "Valor del sistema / instalación (mecánico, eléctrico, electrónico o generador), sin contar las piezas individuales si las hay",
      emptyMarker: "[valor del sistema o instalación]",
      type: "money",
      path: "insurance.systemValue",
      step: "insurance",
      group: "Valor declarado",
      showIfAny: [
        "features.mechanical",
        "features.electrical",
        "features.electronics",
        "features.hasSystem",
        "features.hasSculptures",
      ],
      required: true,
    },
    {
      id: "piece_unit_value",
      label: "Valor unitario de cada pieza individual (€, sin IVA)",
      placeholder:
        "Valor de cada pieza individual tratada aparte (sin incluir el sistema técnico o instalación)",
      emptyMarker: "[valor unitario de cada pieza individual]",
      type: "money",
      path: "insurance.pieceUnitValue",
      step: "insurance",
      group: "Valor declarado",
      showIf: "features.hasSculptures",
      required: true,
    },
    {
      id: "total_value",
      label: "Valor total declarado (€, sin IVA)",
      placeholder:
        "Suma del sistema técnico o instalación y, si aplica, de todas las piezas individuales (u otro total acordado)",
      emptyMarker: "[valor total declarado]",
      type: "money",
      path: "insurance.totalValue",
      required: true,
      step: "insurance",
      group: "Valor declarado",
    },
    // —— Opcionales: espacio e inventario ——
    {
      id: "opt_space",
      label: "Incluir espacio y accesos",
      placeholder:
        "Incluir para fijar sala, horarios técnicos y quién aporta barreras o cartelas",
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
      placeholder: "Describir qué aporta cada parte (barreras, cartelas, pedestales…)",
      emptyMarker: "[aporte de barreras, cartelas u otros]",
      type: "textarea",
      path: "options.spaceEquipment",
      step: "options",
      group: "Espacio y accesos",
      showIf: "options.spaceAccess",
      required: true,
    },
    {
      id: "opt_inventory",
      label: "Incluir inventario de componentes",
      placeholder:
        "Incluir para listar piezas, cables, controladores, etc. en el inventario del documento",
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
        "Listar cada componente (una línea por elemento: piezas, cables, controladores…)",
      emptyMarker: "[inventario de componentes]",
      type: "textarea",
      path: "options.inventoryList",
      step: "options",
      group: "Inventario de componentes",
      showIf: "options.inventory",
      required: true,
    },
    // —— Opcionales: contactos y avisos ——
    {
      id: "opt_contacts",
      label: "Incluir contactos operativos",
      placeholder:
        "Incluir para fijar personas de referencia durante montaje y exhibición",
      emptyMarker: "",
      type: "toggle",
      path: "options.contacts",
      step: "options",
      group: "Contactos y avisos",
    },
    {
      id: "contact_titular_name",
      label: "Contacto — autoría (nombre)",
      placeholder: "Nombre de la persona de referencia",
      emptyMarker: "[contacto autoría — nombre]",
      type: "text",
      path: "options.contactTitularName",
      step: "options",
      group: "Contactos y avisos",
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
      group: "Contactos y avisos",
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
      group: "Contactos y avisos",
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
      group: "Contactos y avisos",
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
      group: "Contactos y avisos",
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
      group: "Contactos y avisos",
      showIf: "options.contacts",
      required: true,
    },
    {
      id: "opt_notices",
      label: "Incluir emails para avisos formales",
      placeholder:
        "Incluir para fijar a qué correos deben enviarse las notificaciones formales entre las partes (no son los contactos operativos del día a día)",
      emptyMarker: "",
      type: "toggle",
      path: "options.notices",
      step: "options",
      group: "Contactos y avisos",
    },
    {
      id: "notice_email_titular",
      label: "Email para notificaciones — autoría",
      placeholder: "Email válido para avisos formales a la Parte Autora",
      emptyMarker: "[email de notificaciones — autoría]",
      type: "text",
      path: "options.noticeEmailTitular",
      step: "options",
      group: "Contactos y avisos",
      showIf: "options.notices",
      required: true,
    },
    {
      id: "notice_email_org",
      label: "Email para notificaciones — solicitante de la obra",
      placeholder: "Email válido para avisos formales a la Parte Solicitante",
      emptyMarker: "[email de notificaciones — solicitante de la obra]",
      type: "text",
      path: "options.noticeEmailOrg",
      step: "options",
      group: "Contactos y avisos",
      showIf: "options.notices",
      required: true,
    },
    // —— Opcionales: operación en sala ——
    {
      id: "opt_subcontract",
      label: "Incluir subcontratación / terceros",
      placeholder:
        "Incluir cuando pueden intervenir personal de montaje, seguridad u otros terceros",
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
      id: "opt_install_changes",
      label: "Incluir cambios de ubicación, iluminación o configuración",
      placeholder:
        "Incluir para exigir autorización si se mueve la obra, se cambia la iluminación, se redistribuye el espacio o se altera la configuración",
      emptyMarker: "",
      type: "toggle",
      path: "options.amendments",
      step: "options",
      group: "Cambios en la instalación",
    },
    {
      id: "install_changes_terms",
      label: "Qué cambios requieren autorización y cómo se piden",
      placeholder:
        "Ej.: cambio de sala o ubicación; modificar iluminación; redistribuir piezas o perímetro; alterar programación. Indica si hace falta aviso escrito y plazo",
      emptyMarker: "[régimen de cambios en la instalación]",
      type: "textarea",
      path: "options.amendmentTerms",
      step: "options",
      group: "Cambios en la instalación",
      showIf: "options.amendments",
      required: true,
    },
    {
      id: "opt_repairs",
      label: "Incluir régimen de reparaciones",
      placeholder:
        "Incluir para fijar quién puede reparar, cómo, qué tipos están permitidas o prohibidas y quién cubre el coste",
      emptyMarker: "",
      type: "toggle",
      path: "options.repairs",
      step: "options",
      group: "Reparaciones",
    },
    {
      id: "repairs_who",
      label: "Quién puede realizar reparaciones",
      placeholder:
        "Ej.: solo la Parte Autora; la Parte Solicitante con autorización previa; personal técnico designado por…",
      emptyMarker: "[quién puede realizar reparaciones]",
      type: "text",
      path: "options.repairsWho",
      step: "options",
      group: "Reparaciones",
      showIf: "options.repairs",
      required: true,
    },
    {
      id: "repairs_how",
      label: "Cómo deben hacerse",
      placeholder:
        "Describir el procedimiento (aviso previo, autorización escrita, materiales, plazos, supervisión…)",
      emptyMarker: "[procedimiento de reparaciones]",
      type: "textarea",
      path: "options.repairsHow",
      step: "options",
      group: "Reparaciones",
      showIf: "options.repairs",
      required: true,
    },
    {
      id: "repairs_allowed",
      label: "Reparaciones permitidas",
      placeholder:
        "Ej.: reposición de consumibles, ajustes menores de funcionamiento, limpieza superficial…",
      emptyMarker: "[reparaciones permitidas]",
      type: "textarea",
      path: "options.repairsAllowed",
      step: "options",
      group: "Reparaciones",
      showIf: "options.repairs",
      required: true,
    },
    {
      id: "repairs_forbidden",
      label: "Reparaciones no permitidas",
      placeholder:
        "Ej.: abrir el sistema electrónico, soldar, sustituir piezas originales, alterar la programación…",
      emptyMarker: "[reparaciones no permitidas]",
      type: "textarea",
      path: "options.repairsForbidden",
      step: "options",
      group: "Reparaciones",
      showIf: "options.repairs",
      required: true,
    },
    {
      id: "repairs_cost",
      label: "Quién cubre el coste de las reparaciones",
      placeholder:
        "Ej.: a cargo de la Parte Solicitante; a cargo de la Parte Autora si el daño es por vicio propio; materiales a cargo de… y mano de obra a cargo de…",
      emptyMarker: "[quién cubre el coste de las reparaciones]",
      type: "textarea",
      path: "options.repairsCost",
      step: "options",
      group: "Reparaciones",
      showIf: "options.repairs",
      required: true,
    },
    // —— Opcionales: logística y economía ——
    {
      id: "opt_transport",
      label: "Incluir transporte (ida y vuelta)",
      placeholder: "Incluir para repartir quién organiza, quién paga y los puntos de recogida/entrega",
      emptyMarker: "",
      type: "toggle",
      path: "options.transport",
      step: "options",
      group: "Transporte",
    },
    {
      id: "transport_organizer",
      label: "Quién organiza el transporte",
      placeholder: "Indicar quién organiza la ida y la vuelta",
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
      placeholder: "Indicar quién asume el coste del transporte",
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
      placeholder: "Indicar dirección o lugar de recogida",
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
      placeholder: "Indicar dirección o lugar de devolución",
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
      placeholder: "Indicar condiciones extra (embalaje, seguro en tránsito, horarios…)",
      emptyMarker: "[notas de transporte]",
      type: "textarea",
      path: "options.transportNotes",
      step: "options",
      group: "Transporte",
      showIf: "options.transport",
    },
    {
      id: "opt_costs",
      label: "Incluir si hay o no remuneración y el reparto de gastos",
      placeholder:
        "Incluir para dejar claro si la Parte Autora cobra por la exhibición y quién asume honorarios, producción, dietas u otros gastos",
      emptyMarker: "",
      type: "toggle",
      path: "options.costs",
      step: "options",
      group: "Remuneración y gastos",
    },
    {
      id: "costs_no_fee",
      label: "Sin remuneración por la exhibición",
      placeholder:
        "Incluir cuando no hay honorario ni pago a la Parte Autora por la cesión temporal de la obra para su exhibición",
      emptyMarker: "",
      type: "toggle",
      path: "options.costsNoFee",
      step: "options",
      group: "Remuneración y gastos",
      showIf: "options.costs",
    },
    {
      id: "costs_summary",
      label: "Detalle de remuneración y gastos",
      placeholder:
        "Ej.: honorario sí/no y importe; producción a cargo de…; dietas a cargo de…; material de montaje a cargo de…",
      emptyMarker: "[detalle de remuneración y gastos]",
      type: "textarea",
      path: "options.costsSummary",
      step: "options",
      group: "Remuneración y gastos",
      showIf: "options.costs",
      required: true,
    },
    {
      id: "opt_cancellation",
      label: "Incluir cancelación y retirada anticipada",
      placeholder:
        "Incluir para regular cancelación del evento o retirada de la obra",
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
        "Describir qué ocurre si el evento o el acuerdo se cancelan",
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
        "Describir cuándo se puede retirar la obra (falta de seguros, condiciones incumplidas…)",
      emptyMarker: "[condiciones de retirada anticipada]",
      type: "textarea",
      path: "options.withdrawalTerms",
      step: "options",
      group: "Cancelación / retirada",
      showIf: "options.cancellation",
      required: true,
    },
    // —— Opcionales: imagen, PI y venta ——
    {
      id: "opt_image",
      label: "Incluir autorización de uso de imagen y reproducción",
      placeholder:
        "Incluir para autorizar fotos, vídeo o reproducción de la obra en ciertos medios",
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
        "Describir qué se puede captar o reproducir (obra completa, detalles, montaje…)",
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
        "Indicar los medios (web, redes, catálogo, prensa, dossier…)",
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
        "Indicar el período (por ejemplo: durante el evento y seis meses después)",
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
        "Indicar cómo debe citarse la obra y a quien tiene la autoría",
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
        "Incluir solo cuando se permite uso con fines comerciales o publicitarios",
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
        "Incluir cuando se permiten recortes, reencuadres o adaptaciones técnicas menores",
      emptyMarker: "",
      type: "toggle",
      path: "options.imageAdapt",
      step: "options",
      group: "Uso de imagen / reproducción",
      showIf: "options.imageUse",
    },
    {
      id: "opt_ip",
      label: "Incluir propiedad intelectual (más allá de imagen)",
      placeholder:
        "Incluir para dejar claro que no hay cesión de derechos ni obras derivadas",
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
        "Describir cómo puede usarse el nombre o crédito de quien tiene la autoría",
      emptyMarker: "[uso de nombre, crédito o marca]",
      type: "text",
      path: "options.ipNameUse",
      step: "options",
      group: "Propiedad intelectual",
      showIf: "options.ipRights",
      required: true,
    },
    {
      id: "opt_sale",
      label: "Incluir condiciones de venta de la obra",
      placeholder:
        "Incluir cuando este acuerdo también regula una posible venta de la obra",
      emptyMarker: "",
      type: "toggle",
      path: "options.saleTerms",
      step: "options",
      group: "Condiciones de venta",
    },
    {
      id: "sale_price",
      label: "Precio de venta (€, impuestos aparte si aplica)",
      placeholder: "Indicar el precio acordado o el precio de referencia",
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
        "Indicar si hay reserva, señal o condiciones para apartar la obra",
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
        "Indicar cuándo y cómo se entrega la obra tras la venta",
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
        "Incluir para dejar claro que vender no otorga exclusividad de representación",
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
      placeholder: "Indicar cualquier otra condición relevante de la venta",
      emptyMarker: "[otras condiciones de venta]",
      type: "textarea",
      path: "options.saleNotes",
      step: "options",
      group: "Condiciones de venta",
      showIf: "options.saleTerms",
    },
    // —— Opcionales: cierre y marco legal ——
    {
      id: "opt_delivery_act",
      label: "Incluir acta de entrega y devolución",
      placeholder: "Incluir para exigir acta con estado de la obra",
      emptyMarker: "",
      type: "toggle",
      path: "options.deliveryAct",
      step: "options",
      group: "Cierre documental y seguros",
    },
    {
      id: "opt_policy_certs",
      label: "Exigir certificados de póliza previos",
      placeholder: "Incluir para exigir acreditación de seguros antes del transporte",
      emptyMarker: "",
      type: "toggle",
      path: "options.policyCerts",
      step: "options",
      group: "Cierre documental y seguros",
    },
    {
      id: "opt_franchise",
      label: "Franquicia a cargo del solicitante de la obra",
      placeholder: "Incluir para dejar claro quién asume la franquicia",
      emptyMarker: "",
      type: "toggle",
      path: "options.franchise",
      step: "options",
      group: "Cierre documental y seguros",
    },
    {
      id: "opt_expert",
      label: "Peritaje independiente para pérdida artística",
      placeholder: "Incluir para no dejar la calificación solo a la Parte Autora",
      emptyMarker: "",
      type: "toggle",
      path: "options.independentExpert",
      step: "options",
      group: "Cierre documental y seguros",
    },
    {
      id: "opt_force_majeure",
      label: "Cláusula de fuerza mayor",
      placeholder: "Incluir para regular eventos de fuerza mayor",
      emptyMarker: "",
      type: "toggle",
      path: "options.forceMajeure",
      step: "options",
      group: "Marco legal",
    },
    {
      id: "opt_jurisdiction",
      label: "Incluir ley aplicable y jurisdicción",
      placeholder: "Incluir para fijar ley y tribunales",
      emptyMarker: "",
      type: "toggle",
      path: "options.jurisdiction",
      step: "options",
      group: "Marco legal",
    },
    {
      id: "law_text",
      label: "Ley aplicable",
      placeholder: "Indicar la ley aplicable (ej.: legislación española)",
      emptyMarker: "[ley aplicable]",
      type: "text",
      path: "options.lawText",
      step: "options",
      group: "Marco legal",
      showIf: "options.jurisdiction",
      required: true,
    },
    {
      id: "courts_text",
      label: "Tribunales / jurisdicción",
      placeholder: "Indicar los juzgados o tribunales competentes",
      emptyMarker: "[tribunales competentes]",
      type: "text",
      path: "options.courtsText",
      step: "options",
      group: "Marco legal",
      showIf: "options.jurisdiction",
      required: true,
    },

  ],
  clauses: [
    {
      id: "header",
      title: "{{document.title}}",
      body: `{{document.headerKind}} DE LA INSTALACIÓN ARTÍSTICA «{{project.workTitle}}»

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
      body: `I. Que ambas partes desean regular las condiciones de exhibición, custodia, conservación, seguro y responsabilidad de la instalación artística «{{project.workTitle}}» durante {{project.eventName}}.
II. Que, debido a las características técnicas y de funcionamiento de la instalación, ambas partes consideran conveniente formalizar expresamente dichas condiciones particulares.
III. Que {{document.this}} constituye un acuerdo específico negociado y aceptado libremente por ambas partes.`,
      excludeIf: ["project.isAnnex"],
    },
    {
      id: "manifest_annex",
      title: "MANIFIESTAN",
      body: `I. Que con fecha {{project.baseAgreementDate}} ambas partes suscribieron {{project.mainAgreementName}} correspondiente a la exhibición de la instalación artística de la Parte Autora durante {{project.eventName}}.
II. Que, debido a las características técnicas y de funcionamiento de la instalación, ambas partes consideran conveniente regular expresamente las condiciones particulares de su exhibición, custodia, conservación y responsabilidad.
III. Que {{document.this}} constituye un anexo específico negociado y aceptado libremente por ambas partes, complementa {{project.mainAgreementName}} y, exclusivamente respecto de la instalación artística objeto del mismo, prevalecerá sobre cualquier cláusula del citado acuerdo principal que resulte incompatible con lo aquí establecido.`,
      requireAll: ["project.isAnnex"],
    },
    {
      id: "primera",
      title: "PRIMERA. Objeto",
      body: `La Parte Autora cede temporalmente a la Parte Solicitante la posesión y el uso de la instalación artística «{{project.workTitle}}» a los solos efectos de su exhibición pública durante {{project.eventName}}.{{project.exhibitPeriod}}
Dicha cesión temporal no transmite la autoría, la propiedad de la obra ni ningún derecho de explotación distinto de los expresamente regulados {{document.inThis}}. La Parte Solicitante recibe la instalación en calidad de cesionaria temporal para su exhibición y custodia durante el período acordado, debiendo devolverla a la Parte Autora en los términos previstos {{document.inThis}}.`,
    },
    {
      id: "segunda",
      title: "SEGUNDA. Conocimiento y aceptación de la instalación",
      body: `La Parte Solicitante declara haber recibido con carácter previo a la firma de {{document.this}} toda la información técnica necesaria relativa a la instalación, incluyendo su funcionamiento, necesidades eléctricas, características mecánicas, condiciones de seguridad, conservación, operación y exhibición.
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
{{custody.watchEssentialText}}
La ausencia de vigilancia o la falta de adopción de las medidas de protección necesarias se considerará un incumplimiento de las obligaciones de custodia asumidas por la Parte Solicitante.`,
    },
    {
      id: "quinta",
      title: "QUINTA. Almacenamiento y manipulación de las piezas",
      body: `Con el fin de preservar la integridad de la obra, las {{features.sculptureCount}} piezas individuales podrán ser retiradas diariamente de la instalación para su almacenamiento temporal fuera del horario de exhibición y repuestas nuevamente para su apertura al público.
Las operaciones de retirada, almacenamiento, custodia, manipulación y posterior reposición serán realizadas bajo la exclusiva responsabilidad de la Parte Solicitante.
La Parte Solicitante responderá de cualquier pérdida, robo, hurto, desaparición, desperfecto, deterioro o daño que pudiera producirse durante dichas operaciones, así como de cualquier daño a la instalación o a sus componentes durante todo el período de custodia.`,
      requireAll: ["features.hasSculptures", "custody.dailyRemove"],
    },
    {
      id: "sexta",
      title: "SEXTA. Responsabilidad civil",
      body: `La Parte Solicitante declara que la instalación artística objeto {{document.ofThis}} se encuentra debidamente cubierta por la póliza de Responsabilidad Civil correspondiente a {{project.eventName}} durante todo el período en que permanezca bajo su custodia y exhibición.
La Parte Solicitante asume íntegramente la responsabilidad derivada de la exhibición pública de la instalación, de su funcionamiento{{insurance.rcInteractionBit}} y de todas las medidas de seguridad necesarias para garantizar la protección de las personas, de la propia obra y de las instalaciones durante todo el período en que la instalación permanezca bajo su custodia.
La Parte Solicitante declara que la decisión de exhibir públicamente la instalación ha sido adoptada libremente, tras haber recibido toda la información técnica y de seguridad facilitada por la Parte Autora, conocer las características y riesgos inherentes a la obra y aceptar expresamente las condiciones necesarias para su correcta exhibición.
La existencia, alcance, validez o eficacia de la póliza de Responsabilidad Civil no limitará, en ningún caso, las obligaciones asumidas por la Parte Solicitante mediante {{document.this}}.`,
      requireAll: ["insurance.hasRc"],
    },
    {
      id: "septima",
      title: "SÉPTIMA. Seguro de daños de la instalación",
      body: `La Parte Solicitante declara que la instalación artística objeto {{document.ofThis}} se encuentra debidamente cubierta mediante una póliza de seguro de daños a todo riesgo («clavo a clavo»), plenamente vigente, que garantiza la integridad patrimonial de la obra durante todo el período de su participación en {{project.eventName}}.
Dicha cobertura comprenderá, como mínimo: el transporte de ida y vuelta; las operaciones de carga y descarga; el montaje y desmontaje; la permanencia en el recinto; la exhibición pública; el almacenamiento temporal de piezas y elementos; y la manipulación necesaria para su conservación y reposición.
La cobertura incluirá, entre otros, los riesgos de pérdida, robo, hurto, desaparición, desperfecto, deterioro, vandalismo, incendio, agua, lluvia, viento, humedad, fenómenos meteorológicos, accidente, manipulación y cualquier otro daño accidental o fortuito.
La cobertura de seguro comenzará en el momento en que la instalación abandone físicamente su lugar de almacenamiento y finalizará únicamente cuando, tras el transporte de retorno, haya sido descargada e introducida nuevamente en el interior de dicho lugar.
La existencia, alcance o condiciones de la póliza de seguro de daños no limitarán, en ningún caso, las obligaciones de custodia, conservación, protección e indemnización asumidas por la Parte Solicitante.
La suma asegurada será, como mínimo, igual al valor declarado de la instalación establecido en la cláusula de valor declarado {{document.ofThis}}.`,
      requireAll: ["insurance.hasNailToNail"],
    },
    {
      id: "octava",
      title: "OCTAVA. Responsabilidad sobre la instalación",
      body: `La Parte Solicitante responderá frente a la Parte Autora por cualquier pérdida, robo, hurto, desaparición, destrucción, desperfecto o deterioro total o parcial que pueda sufrir la instalación o cualquiera de sus componentes desde el momento de su entrega por la Parte Autora tras el montaje y hasta su devolución a la Parte Autora para proceder a su desmontaje.
Se considerarán expresamente incluidos, entre otros, los daños derivados de: robo; hurto; vandalismo; incendio; agua; lluvia; viento; humedad; fenómenos meteorológicos; manipulación por terceros; manipulación y almacenamiento de piezas; falta o insuficiencia de vigilancia; falta de protección; incumplimiento de las instrucciones técnicas de la Parte Autora; y cualquier actuación u omisión que implique una custodia insuficiente o inadecuada.
En caso de pérdida total, destrucción o robo de la instalación, la Parte Solicitante indemnizará a la Parte Autora por el valor declarado establecido en la cláusula de valor declarado.
En caso de daños parciales, la Parte Solicitante asumirá íntegramente los costes de reparación, restauración, sustitución de componentes, materiales, mano de obra especializada y cualquier otro gasto necesario para devolver la instalación al estado en que fue entregada.
En caso de que la reparación o restauración no resulte técnicamente posible o implique una pérdida irreversible de las características artísticas de la obra, se considerará pérdida total a los efectos {{document.ofThis}}.`,
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
      body: `{{document.This}} entrará en vigor desde el momento de su firma y permanecerá vigente desde la entrega efectiva de la instalación a la Parte Solicitante hasta su devolución a la Parte Autora para proceder a su desmontaje.
Las partes manifiestan que {{document.this}} ha sido negociado y aceptado libremente y refleja los pactos alcanzados para la exhibición de la instalación artística.`,
      excludeIf: ["project.isAnnex"],
    },
    {
      id: "decima_annex",
      title: "DÉCIMA. Vigencia",
      body: `{{document.This}} entrará en vigor desde el momento de su firma y permanecerá vigente desde la entrega efectiva de la instalación a la Parte Solicitante hasta su devolución a la Parte Autora para proceder a su desmontaje.
Las partes manifiestan que {{document.this}} ha sido negociado y aceptado libremente, refleja los pactos alcanzados para la exhibición de la instalación artística y forma parte integrante de {{project.mainAgreementName}}, constituyendo ambos documentos una única unidad contractual y debiendo interpretarse conjuntamente.`,
      requireAll: ["project.isAnnex"],
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
      id: "opt_inventory",
      title: "Inventario de componentes",
      body: `Las partes dejan constancia del siguiente inventario de componentes de la obra o instalación «{{project.workTitle}}»:
{{options.inventoryFormatted}}
Este inventario es referencia vinculante para la entrega y la devolución. Si existe acta de entrega y devolución, el inventario se incorporará a dicha acta o se anexará a ella. Cualquier falta, sustitución, extravío o daño respecto del inventario se hará constar por escrito y se regirá por las obligaciones de custodia e indemnización de {{document.this}}.`,
      requireAll: ["options.inventory"],
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
      id: "opt_notices",
      title: "Notificaciones formales",
      body: `Las notificaciones formales entre las partes relacionadas con {{document.this}} (avisos jurídicos o contractuales, no la coordinación operativa cotidiana) se dirigirán a:
Parte Autora: {{options.noticeEmailTitular}}.
Parte Solicitante: {{options.noticeEmailOrg}}.
Se entenderán recibidas cuando conste su envío a dichas direcciones, sin perjuicio de otros medios admitidos en derecho.`,
      requireAll: ["options.notices"],
    },
    {
      id: "opt_subcontract",
      title: "Subcontratación",
      body: `La Parte Solicitante podrá valerse de terceros para determinadas tareas solo en el siguiente marco: {{options.subcontractTerms}}.
Aunque intervengan personal de montaje, seguridad, transporte u otros subcontratistas, la Parte Solicitante sigue siendo plenamente responsable frente a la Parte Autora del cumplimiento de {{document.this}} (custodia, seguro, daños, plazos y condiciones de exhibición). La Parte Solicitante se obliga a transmitir a dichos terceros las instrucciones técnicas relevantes y a vigilar su cumplimiento.`,
      requireAll: ["options.subcontract"],
    },
    {
      id: "opt_amendments",
      title: "Cambios en la instalación",
      body: `Cualquier cambio de ubicación, iluminación, redistribución espacial, perímetro de protección, configuración, programación u otra condición de exhibición de la obra «{{project.workTitle}}» requerirá autorización previa y expresa de la Parte Autora, preferentemente por escrito.
Régimen concreto de estos cambios: {{options.amendmentTerms}}.
Los cambios no autorizados se considerarán incumplimiento de las obligaciones de custodia. Esta cláusula no sustituye la necesidad de acuerdo escrito para modificar el resto de pactos de {{document.this}}.`,
      requireAll: ["options.amendments"],
    },
    {
      id: "opt_repairs",
      title: "Reparaciones",
      body: `Las reparaciones de la obra o instalación «{{project.workTitle}}» durante el período de custodia se regirán por lo siguiente:
— Quién puede realizarlas: {{options.repairsWho}}.
— Procedimiento: {{options.repairsHow}}.
— Reparaciones permitidas: {{options.repairsAllowed}}.
— Reparaciones no permitidas: {{options.repairsForbidden}}.
— Quién cubre el coste (materiales, mano de obra, transporte técnico u otros): {{options.repairsCost}}.
Salvo autorización expresa de la Parte Autora, queda prohibida cualquier intervención no contemplada como permitida. Las reparaciones no eximen a la Parte Solicitante de su responsabilidad por daños ni de las obligaciones de seguro e indemnización de {{document.this}}.`,
      requireAll: ["options.repairs"],
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
Quien organice el transporte cuidará un embalaje adecuado y la coordinación de horarios. El riesgo durante el tránsito se alineará con las coberturas de seguro y con las obligaciones de custodia de {{document.this}}, salvo pacto escrito distinto. La falta de coordinación del transporte no exime de las obligaciones de custodia, entrega y devolución aquí previstas.`,
      requireAll: ["options.transport"],
    },
    {
      id: "opt_costs",
      title: "Remuneración y gastos",
      body: `{{options.costsNoFeeText}}
Detalle concreto de la remuneración (si la hay) y del reparto de gastos (honorarios, producción, dietas, material de montaje u otros): {{options.costsSummary}}.
Cada parte asume únicamente los conceptos que le correspondan según ese detalle. Cualquier gasto adicional, extraordinario o no previsto requerirá acuerdo expreso previo. La existencia o no de remuneración no altera la autoría de la obra ni las obligaciones de custodia, seguro y devolución de {{document.this}}.`,
      requireAll: ["options.costs"],
    },
    {
      id: "opt_cancellation",
      title: "Cancelación y retirada anticipada",
      body: `Si el evento, la exhibición o {{document.this}} se cancelan, se aplicará lo siguiente: {{options.cancellationTerms}}.
Además, la Parte Autora podrá retirar anticipadamente la obra cuando concurra alguna de estas circunstancias o las que se detallen a continuación: falta o insuficiencia de seguros exigidos; incumplimiento grave de custodia, vigilancia o seguridad; o condiciones del espacio incompatibles con la integridad de la obra. Condiciones adicionales de retirada: {{options.withdrawalTerms}}.
En caso de retirada anticipada justificada, la Parte Solicitante facilitará el acceso y la logística razonables para recuperar la obra y seguirá respondiendo de las obligaciones nacidas hasta ese momento, incluidos daños ya producidos.`,
      requireAll: ["options.cancellation"],
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
      id: "opt_ip",
      title: "Propiedad intelectual",
      body: `La cesión temporal de la posesión y uso de la obra «{{project.workTitle}}» para su exhibición no implica cesión de derechos de autor, derechos conexos ni de la autoría de la obra.
Salvo lo expresamente autorizado {{document.inThis}} (incluida, en su caso, la cláusula de uso de imagen y reproducción), queda prohibido reproducir, comunicar públicamente fuera del ámbito pactado, transformar, crear obras derivadas o explotar la obra o sus elementos distintivos.
Uso autorizado del nombre, crédito o marca vinculados a la obra o a quien ostenta la autoría: {{options.ipNameUse}}.
Cualquier uso distinto requerirá autorización adicional y expresa de la Parte Autora.`,
      requireAll: ["options.ipRights"],
    },
    {
      id: "opt_sale",
      title: "Condiciones de venta",
      body: `Sin perjuicio de la exhibición y custodia reguladas {{document.inThis}}, las partes dejan constancia de las siguientes condiciones para una eventual venta de la obra «{{project.workTitle}}»:
Precio: {{options.salePrice}} € (impuestos aparte, si resultan aplicables).
{{options.saleReservationText}}
Entrega: {{options.saleDelivery}}.
{{options.saleExclusivityText}}
{{options.saleNotesText}}
La venta, si se formaliza, se documentará de forma expresa. Mientras no conste acuerdo de venta perfeccionado, la obra permanece bajo la autoría de la Parte Autora y sujeta a las obligaciones de custodia y devolución de {{document.this}}.`,
      requireAll: ["options.saleTerms"],
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
      body: `Con carácter previo al transporte de la instalación desde su lugar de almacenamiento, la Parte Solicitante entregará a la Parte Autora certificado o extracto de {{options.policyCertsDetail}} que acredite la vigencia, los límites, la inclusión de la obra y el período de cobertura. La falta de acreditación autorizará a la Parte Autora a suspender la entrega sin perjuicio de las demás acciones que le correspondan.`,
      requireAll: ["options.policyCerts"],
    },
    {
      id: "opt_franq",
      title: "Franquicia",
      body: `Cualquier franquicia, deducible o importe no cubierto por las pólizas será asumido íntegramente por la Parte Solicitante, sin que pueda trasladarse a la Parte Autora.`,
      requireAll: ["options.franchise"],
    },
    {
      id: "opt_expert",
      title: "Valoración de pérdida artística",
      body: `La valoración sobre la afectación irreversible de las características artísticas de la obra podrá ser realizada por la Parte Autora y, a solicitud de cualquiera de las partes, contrastada por una persona perita independiente de común acuerdo. A falta de acuerdo sobre esa persona perita en el plazo de quince (15) días, podrá designarse conforme a la práctica habitual de arbitraje pericial o por el colegio profesional competente.`,
      requireAll: ["options.independentExpert"],
    },
    {
      id: "opt_fm",
      title: "Fuerza mayor",
      body: `Ninguna de las partes será responsable por el incumplimiento de obligaciones cuando dicho incumplimiento derive de causas de fuerza mayor debidamente acreditadas. Ello no exime a la Parte Solicitante de sus deberes de protección razonable de la instalación ni de las coberturas de seguro comprometidas, en la medida en que resulten aplicables.`,
      requireAll: ["options.forceMajeure"],
    },
    {
      id: "opt_jur",
      title: "Ley aplicable y jurisdicción",
      body: `{{document.This}} se rige por {{options.lawText}}. Para la resolución de cualquier controversia derivada del mismo, las partes se someten a los {{options.courtsText}}, con renuncia a cualquier otro fuero que pudiera corresponderles.`,
      requireAll: ["options.jurisdiction"],
    },
    {
      id: "signatures",
      title: "Firmas",
      body: `Y para que así conste, ambas partes firman {{document.this}} por duplicado y a un solo efecto.

En {{project.city}}, a {{project.signDate}}.

POR LA PARTE AUTORA
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

  const isAnnex =
    v["project.isAnnex"] === true || v["project.isAnnex"] === "true";
  const annexTitle = String(v["project.annexTitle"] ?? "").trim();
  const mainName = String(v["project.mainAgreementName"] ?? "").trim();
  if (isAnnex) {
    v["project.mainAgreementName"] = mainName || "el acuerdo principal";
    v["document.title"] = annexTitle || "ANEXO AL ACUERDO PRINCIPAL";
    v["document.headerKind"] =
      "ANEXO — CONDICIONES ESPECÍFICAS DE EXHIBICIÓN, CUSTODIA, SEGURO Y RESPONSABILIDAD";
    v["document.this"] = "el presente Anexo";
    v["document.This"] = "El presente Anexo";
    v["document.ofThis"] = "del presente Anexo";
    v["document.inThis"] = "en este Anexo";
    v["document.toThis"] = "a este Anexo";
    v["document.withThis"] = "mediante el presente Anexo";
  } else {
    v["document.title"] =
      "ACUERDO DE EXHIBICIÓN, CUSTODIA, SEGURO Y RESPONSABILIDAD";
    v["document.headerKind"] =
      "CONDICIONES ESPECÍFICAS DE EXHIBICIÓN, CUSTODIA, SEGURO Y RESPONSABILIDAD";
    v["document.this"] = "el presente Acuerdo";
    v["document.This"] = "El presente Acuerdo";
    v["document.ofThis"] = "del presente Acuerdo";
    v["document.inThis"] = "en este Acuerdo";
    v["document.toThis"] = "a este Acuerdo";
    v["document.withThis"] = "mediante el presente Acuerdo";
  }
  // Keep legacy key for older drafts that still reference it.
  v["document.annexTitle"] = String(v["document.title"]);

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
    const docBit = repDoc || "[documento — representante de la Parte Autora]";
    const roleBit = repRole || "[cargo — representante de la Parte Autora]";
    v["parties.author.repBlock"] =
      `\nActuando en este acto a través de ${repName}, con documento ${docBit}, en calidad de ${roleBit} (representante de la Parte Autora).`;
    v["parties.author.sigRep"] =
      `Representante de la Parte Autora: ${repName}\nDocumento: ${docBit}\nCargo: ${roleBit}\n`;
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
    const docBit = orgRepDoc || "[documento — representante de la Parte Solicitante]";
    const roleBit = orgRepRole || "[cargo — representante de la Parte Solicitante]";
    v["parties.org.repBlock"] =
      `\nActuando en este acto a través de ${orgRepName}, con documento ${docBit}, en calidad de ${roleBit} (representante de la Parte Solicitante).`;
    v["parties.org.sigRep"] =
      `Representante de la Parte Solicitante: ${orgRepName}\nDocumento: ${docBit}\nCargo: ${roleBit}\n`;
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

  const inThisDoc = String(v["document.inThis"]);
  const reservation = String(v["options.saleReservation"] ?? "").trim();
  v["options.saleReservationText"] = reservation
    ? `Reserva o señal: ${reservation}.`
    : `No se ha pactado ${inThisDoc} una reserva o señal específica.`;

  if (v["options.saleNoExclusivity"]) {
    v["options.saleExclusivityText"] =
      "La eventual venta no otorga a la Parte Solicitante representación exclusiva ni mandato de venta en exclusiva.";
  } else {
    v["options.saleExclusivityText"] =
      `Las partes no han regulado ${inThisDoc} un régimen de exclusividad de representación o venta.`;
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
      "Las partes dejan constancia de que no hay remuneración económica a la Parte Autora por la cesión temporal de la obra para su exhibición, sin perjuicio del reparto de gastos que se detalla a continuación.";
  } else {
    v["options.costsNoFeeText"] =
      "Las partes regulan la remuneración (si la hay) y el reparto de gastos asociados a la cesión temporal y exhibición de la obra según lo siguiente.";
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
      `— Incorpora un sistema generador o conjunto de ${n} pieza(s) individual(es) que requieren trato aparte respecto del resto de la instalación.`,
    );
  }
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
  if (v["custody.weatherProtect"]) {
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
  if (v["insurance.hasRc"]) certParts.push("Responsabilidad Civil");
  if (v["insurance.hasNailToNail"]) {
    certParts.push("seguro de daños a todo riesgo (clavo a clavo)");
  }
  if (certParts.length === 0) {
    v["options.policyCertsDetail"] =
      `las pólizas de seguro exigidas ${v["document.inThis"]}`;
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
