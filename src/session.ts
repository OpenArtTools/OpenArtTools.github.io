/**
 * Copyright 2026 Gerard Valls Montaño
 * Licensed under the Apache License, Version 2.0
 */

import type { AppValues, Clause } from "./engine/types";
import type { PersonalProfile } from "./storage/profile";

export type ToolPhase = "wizard" | "review" | "accept";
export type AppPhase = "home" | "privacy" | "support" | ToolPhase;

export type SessionState = {
  templateId: string;
  values: AppValues;
  clauses: Clause[];
  stepIndex: number;
  phase: AppPhase;
  /** Last tool screen before leaving to home/privacy/support. */
  lastToolPhase: ToolPhase | null;
  manualOverride: boolean;
  acceptedFinal: boolean;
  personalProfile: PersonalProfile | null;
};

export function isToolPhase(phase: AppPhase): phase is ToolPhase {
  return phase === "wizard" || phase === "review" || phase === "accept";
}

export function createEmptySession(
  templateId: string,
  defaults: AppValues,
  profile: PersonalProfile | null = null,
): SessionState {
  return {
    templateId,
    values: { ...defaults },
    clauses: [],
    stepIndex: 0,
    phase: "home",
    lastToolPhase: null,
    manualOverride: false,
    acceptedFinal: false,
    personalProfile: profile,
  };
}

/** True if the user has started filling a document worth resuming. */
export function hasDocumentWork(state: SessionState, defaults: AppValues): boolean {
  if (state.clauses.some((c) => c.source === "user" || c.enabled === false)) {
    return true;
  }
  if (state.manualOverride) return true;
  for (const [key, value] of Object.entries(state.values)) {
    if (defaults[key] === value) continue;
    if (value === "" || value === undefined || value === null) continue;
    return true;
  }
  return false;
}
