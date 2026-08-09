/**
 * Copyright (C) 2026 Gerard Valls Montaño
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { describe, expect, it } from "vitest";
import {
  PROFILE_FILE_KIND,
  buildProfileFile,
  parseProfileFile,
  profileToAuthorValues,
} from "./profile";

describe("personal profile file", () => {
  it("round-trips personal data for cross-tool reuse", () => {
    const file = buildProfileFile({
      name: "Nombre Ejemplo",
      doc: "00000000X",
      address: "Calle 1",
      email: "hola@ejemplo.test",
    });
    expect(file.kind).toBe(PROFILE_FILE_KIND);
    const again = parseProfileFile(JSON.stringify(file));
    expect(again.profile.name).toBe("Nombre Ejemplo");
    expect(JSON.stringify(again)).not.toMatch(/contacts|cliente|orgName/i);
  });

  it("maps to exhibition titularidad-de-la-obra fields", () => {
    const values = profileToAuthorValues({
      name: "Parte Titular",
      doc: "1",
      email: "a@b.c",
    });
    expect(values["parties.author.name"]).toBe("Parte Titular");
    expect(values["parties.author.email"]).toBe("a@b.c");
  });

  it("rejects draft files", () => {
    expect(() =>
      parseProfileFile(JSON.stringify({ kind: "openarttools.draft" })),
    ).toThrow(/perfil/);
  });
});
