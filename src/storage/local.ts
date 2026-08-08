/**
 * Copyright 2026 Gerard Valls Montaño
 * Licensed under the Apache License, Version 2.0
 *
 * Opt-in local storage only. Nothing is written unless the user checks the box.
 */

const PROFILE_KEY = "oat.profile.v1";
const DRAFT_KEY = "oat.draft.v1";
const FLAGS_KEY = "oat.flags.v1";

export type PersonalProfile = {
  "parties.author.name"?: string;
  "parties.author.doc"?: string;
  "parties.author.role"?: string;
};

export type Flags = {
  rememberPersonal: boolean;
  rememberDraft: boolean;
};

export function loadFlags(): Flags {
  try {
    const raw = localStorage.getItem(FLAGS_KEY);
    if (!raw) return { rememberPersonal: false, rememberDraft: false };
    return { rememberPersonal: false, rememberDraft: false, ...JSON.parse(raw) };
  } catch {
    return { rememberPersonal: false, rememberDraft: false };
  }
}

export function saveFlags(flags: Flags): void {
  localStorage.setItem(FLAGS_KEY, JSON.stringify(flags));
  if (!flags.rememberPersonal) localStorage.removeItem(PROFILE_KEY);
  if (!flags.rememberDraft) localStorage.removeItem(DRAFT_KEY);
}

export function loadProfile(): PersonalProfile {
  if (!loadFlags().rememberPersonal) return {};
  try {
    const raw = localStorage.getItem(PROFILE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export function saveProfile(profile: PersonalProfile): void {
  if (!loadFlags().rememberPersonal) return;
  localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
}

export function clearAllLocal(): void {
  localStorage.removeItem(PROFILE_KEY);
  localStorage.removeItem(DRAFT_KEY);
  localStorage.removeItem(FLAGS_KEY);
}

export type DraftPayload = {
  templateId: string;
  values: Record<string, string | boolean | number>;
  clauses: {
    id: string;
    title: string;
    body: string;
    enabled: boolean;
    source: "template" | "user";
  }[];
  manualOverride: boolean;
  savedAt: string;
};

export function loadDraft(): DraftPayload | null {
  if (!loadFlags().rememberDraft) return null;
  try {
    const raw = localStorage.getItem(DRAFT_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function saveDraft(draft: DraftPayload): void {
  if (!loadFlags().rememberDraft) return;
  localStorage.setItem(DRAFT_KEY, JSON.stringify(draft));
}

export function profileFromValues(
  values: Record<string, string | boolean | number>,
): PersonalProfile {
  return {
    "parties.author.name": String(values["parties.author.name"] ?? ""),
    "parties.author.doc": String(values["parties.author.doc"] ?? ""),
    "parties.author.role": String(values["parties.author.role"] ?? ""),
  };
}
