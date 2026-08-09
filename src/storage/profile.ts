/**
 * Copyright (C) 2026 Gerard Valls Montaño
 * SPDX-License-Identifier: AGPL-3.0-or-later
 *
 * Personal profile file (openarttools.profile).
 * YOUR identity only — authorship (authors/creators), platform home, reusable across tools.
 * Not a client agenda. Not browser storage. Not uploaded by the platform.
 * See README.md and PRIVACY.md.
 */

import { downloadJson, pickJsonFile, readTextFile } from "./jsonFile";

export const PROFILE_FILE_KIND = "openarttools.profile" as const;
export const PROFILE_FILE_VERSION = 1 as const;

export type PersonalProfile = {
  name?: string;
  doc?: string;
  role?: string;
  address?: string;
  email?: string;
  phone?: string;
};

export type ProfileFile = {
  kind: typeof PROFILE_FILE_KIND;
  version: typeof PROFILE_FILE_VERSION;
  savedAt: string;
  profile: PersonalProfile;
};

export function buildProfileFile(profile: PersonalProfile): ProfileFile {
  return {
    kind: PROFILE_FILE_KIND,
    version: PROFILE_FILE_VERSION,
    savedAt: new Date().toISOString(),
    profile: normalizeProfile(profile),
  };
}

function normalizeProfile(p: PersonalProfile): PersonalProfile {
  return {
    name: clean(p.name),
    doc: clean(p.doc),
    role: clean(p.role),
    address: clean(p.address),
    email: clean(p.email),
    phone: clean(p.phone),
  };
}

function clean(v: string | undefined): string | undefined {
  const t = v?.trim();
  return t ? t : undefined;
}

export function downloadProfileFile(file: ProfileFile): void {
  const payload = buildProfileFile(file.profile);
  downloadJson(
    `open-art-tools-mis-datos-${payload.savedAt.slice(0, 10)}.json`,
    payload,
  );
}

export function parseProfileFile(raw: string): ProfileFile {
  const data = JSON.parse(raw) as Partial<ProfileFile>;
  if (data.kind !== PROFILE_FILE_KIND) {
    throw new Error(
      "El archivo no es un perfil de autoría de Open Art Tools.",
    );
  }
  if (data.version !== PROFILE_FILE_VERSION) {
    throw new Error("Versión de perfil no compatible.");
  }
  if (!data.profile || typeof data.profile !== "object") {
    throw new Error("El perfil está incompleto o dañado.");
  }
  return buildProfileFile(data.profile as PersonalProfile);
}

async function readProfileFile(file: File): Promise<ProfileFile> {
  return parseProfileFile(await readTextFile(file));
}

export async function pickAndReadProfileFile(): Promise<ProfileFile | null> {
  const file = await pickJsonFile();
  if (!file) return null;
  return readProfileFile(file);
}

/** Exhibition tool: profile → author fields. */
export function profileToAuthorValues(
  profile: PersonalProfile,
): Record<string, string> {
  return {
    "parties.author.name": profile.name || "",
    "parties.author.doc": profile.doc || "",
    "parties.author.role": profile.role || "",
    "parties.author.address": profile.address || "",
    "parties.author.email": profile.email || "",
    "parties.author.phone": profile.phone || "",
  };
}

export function profileLabel(profile: PersonalProfile): string {
  return profile.name?.trim() || profile.email?.trim() || "Sin nombre";
}

export function profileHasData(profile: PersonalProfile | null | undefined): boolean {
  if (!profile) return false;
  return Boolean(
    profile.name ||
      profile.doc ||
      profile.role ||
      profile.address ||
      profile.email ||
      profile.phone,
  );
}
