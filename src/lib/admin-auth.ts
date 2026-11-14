import { useSyncExternalStore } from "react";

import { ROLES, ROLE_LABEL, type Department, type Role } from "./admin-rbac";
import {
  currentStaff,
  restoreStaffSession,
  staffClient,
  staffSession,
  staffSignIn,
  staffSignOut,
} from "./staff-auth";

/**
 * Master Admin authentication — Supabase only.
 *
 * There is no device-local password anywhere in this file. A panel login is a
 * real `supabase.auth.signInWithPassword()` call, and the person is only let in
 * when their user id is listed in `public.staff` (checked through `is_staff()`).
 * The role shown in the panel comes from that same row, so permissions are
 * decided by the database rather than by a browser credential.
 *
 * What is cached on the device is only the *result* of that sign-in — a small
 * copy of the staff identity, so the route guards (`beforeLoad`) can answer
 * synchronously during hydration. It grants nothing on its own: every read and
 * write is authorised by the Supabase JWT that `staff-auth.ts` keeps and
 * refreshes.
 */

const SESSION_KEY = "mw_admin_session";

/** A panel session ends after 8 hours or 30 idle minutes, like the token. */
const SESSION_TTL_MS = 8 * 60 * 60 * 1000;
const IDLE_TTL_MS = 30 * 60 * 1000;

export type AdminSession = {
  /** Supabase auth user id — this is what `public.staff.user_id` must contain. */
  employeeId: string;
  email: string;
  name: string;
  role: Role;
  /** null only for a super admin, who works across every desk. */
  department: Department | null;
  /** Always the database now; kept so older call sites still read it. */
  source: "database";
  /** Whether the staff check passed for this session. */
  database?: "staff" | "not-staff" | "unverified";
  issuedAt: string;
  lastSeenAt: number;
  expiresAt: number;
};

export type AdminAuthSnapshot = {
  /** false during SSR / hydration, before the stored session is read. */
  ready: boolean;
  session: AdminSession | null;
  /** Always false: there is no first-run setup any more. */
  needsSetup: boolean;
};

const SIGNED_OUT: AdminAuthSnapshot = { ready: false, session: null, needsSetup: false };

/* --------------------------------------------------------------- storage */

function readSession(): AdminSession | null {
  if (typeof window === "undefined") return null;
  try {
    const parsed = JSON.parse(
      window.localStorage.getItem(SESSION_KEY) ?? "null",
    ) as AdminSession | null;
    if (!parsed || typeof parsed !== "object" || typeof parsed.email !== "string") return null;
    if (typeof parsed.employeeId !== "string") return null;
    if (!ROLES.includes(parsed.role as Role)) return null;
    return parsed;
  } catch {
    return null;
  }
}

function writeSession(session: AdminSession | null): boolean {
  try {
    if (session === null) window.localStorage.removeItem(SESSION_KEY);
    else window.localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    return true;
  } catch {
    return false;
  }
}

/* ------------------------------------------------------------- snapshots */

function isExpired(session: AdminSession): boolean {
  const now = Date.now();
  return now >= session.expiresAt || now - session.lastSeenAt > IDLE_TTL_MS;
}

/** Keeps the idle timer alive without writing on every render. */
function touchIdle(session: AdminSession): AdminSession {
  const now = Date.now();
  if (now - session.lastSeenAt < 60_000) return session;
  const next: AdminSession = { ...session, lastSeenAt: now };
  writeSession(next);
  return next;
}

function computeSnapshot(): AdminAuthSnapshot {
  const session = readSession();
  return {
    ready: true,
    session: session && !isExpired(session) ? touchIdle(session) : null,
    needsSetup: false,
  };
}

let snapshot: AdminAuthSnapshot = SIGNED_OUT;
if (typeof window !== "undefined") {
  snapshot = computeSnapshot();
  if (snapshot.session) void syncDatabaseSession();
}

const listeners = new Set<() => void>();

function emit() {
  snapshot = computeSnapshot();
  listeners.forEach((listener) => listener());
}

const subscribe = (listener: () => void) => {
  listeners.add(listener);
  const onStorage = (event: StorageEvent) => {
    if (!event.key || event.key === SESSION_KEY) emit();
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
};

const getSnapshot = () => snapshot;
const getServerSnapshot = (): AdminAuthSnapshot => SIGNED_OUT;

function noopSubscribe() {
  return () => {};
}

export function useAdminSession() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

/** `true` once the panel has read storage, so guards never guess during SSR. */
export function useAdminReady() {
  return useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false,
  );
}

/* ------------------------------------------------------- database session */

/**
 * Re-check the Supabase session behind a cached panel session.
 *
 * If the token is gone, expired beyond refresh, or the person is no longer in
 * `public.staff`, the panel session is dropped and they sign in again. The
 * password is never re-asked for.
 */
export async function syncDatabaseSession(): Promise<"staff" | "not-staff" | "unverified"> {
  const session = readSession();
  if (!session || typeof window === "undefined") return "unverified";
  if (!staffClient()) return "unverified";

  let staff = null;
  try {
    staff = await restoreStaffSession();
  } catch {
    staff = null;
  }

  const database = staff?.isStaff ? "staff" : "not-staff";
  if (database === "not-staff") {
    writeSession(null);
    emit();
    return database;
  }
  if (session.database !== database) {
    writeSession({ ...session, database });
    emit();
  }
  return database;
}

/* ------------------------------------------------------------------- API */

/** Synchronous guard read — null when absent, expired or idle. */
export function currentAdmin(): AdminSession | null {
  const session = readSession();
  if (!session) return null;
  if (isExpired(session)) {
    writeSession(null);
    return null;
  }
  return session;
}

/** Kept for older call sites: there is no first-run setup any more. */
export function adminNeedsSetup(): boolean {
  return false;
}

export type SignInResult = { ok: true; session: AdminSession } | { ok: false; error: string };

const asRole = (value: unknown): Role | null =>
  typeof value === "string" && ROLES.includes(value as Role) ? (value as Role) : null;

const displayName = (email: string) => {
  const local = email.split("@")[0] ?? "";
  const words = local
    .split(/[._-]+/)
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1));
  return words.join(" ") || email;
};

/**
 * Sign in with the email and password of a Supabase user that is listed in
 * `public.staff`. Nothing else is accepted — no device credential, no
 * environment password, no demo account.
 */
export async function signInAdmin(emailInput: string, password: string): Promise<SignInResult> {
  const email = emailInput.trim().toLowerCase();
  if (!email) return { ok: false, error: "Enter your email address." };
  if (!password) return { ok: false, error: "Enter your password." };

  const client = staffClient();
  if (!client) {
    return { ok: false, error: "The database is not configured for this build." };
  }

  const signIn = await staffSignIn(email, password);
  if (!signIn.ok) {
    return { ok: false, error: signIn.error ?? "That email and password were not accepted." };
  }

  const staff = await currentStaff();
  if (!staff) {
    void staffSignOut();
    return { ok: false, error: "Supabase accepted the password but returned no session. Try again." };
  }
  if (!staff.isStaff) {
    void staffSignOut();
    return {
      ok: false,
      error:
        staff.checked === "none"
          ? `Signed in, but the staff check could not run: ${staff.error ?? "unknown error"}. Run supabase/schema.sql, then try again.`
          : `This account (user id ${staff.userId}) is not in public.staff, so it cannot open the control room. Add that user id with role 'super_admin'.`,
    };
  }

  // The role comes from the staff row, which is the single source of truth.
  let role: Role = "super_admin";
  try {
    const { data } = await client
      .from("staff")
      .select("role")
      .eq("user_id", staff.userId)
      .maybeSingle();
    role = asRole((data as { role?: string } | null)?.role) ?? "super_admin";
  } catch {
    role = "super_admin";
  }

  const session = await staffSession();
  const now = Date.now();
  const panelSession: AdminSession = {
    employeeId: staff.userId,
    email: staff.email || email,
    name: displayName(staff.email || email),
    role,
    department: null,
    source: "database",
    database: "staff",
    issuedAt: new Date(now).toISOString(),
    lastSeenAt: now,
    expiresAt: Math.min(
      now + SESSION_TTL_MS,
      session?.expiresAt && session.expiresAt > now ? session.expiresAt : now + SESSION_TTL_MS,
    ),
  };

  writeSession(panelSession);
  emit();
  return { ok: true, session: panelSession };
}

export function signOutAdmin() {
  writeSession(null);
  emit();
  // Drop the Supabase session too, so the next person on this browser cannot
  // reuse its staff token.
  void staffSignOut();
}

/** Human labels for the credential source shown in the panel footer. */
export const ADMIN_SOURCE_LABEL: Record<AdminSession["source"], string> = {
  database: "Supabase staff account",
};

/** Human label for the signed-in role, used in the shell header. */
export const sessionRoleLabel = (session: AdminSession): string =>
  `${ROLE_LABEL[session.role]}${session.department ? ` · ${session.department}` : ""}`;
