import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import {
  SUPABASE_PUBLISHABLE_KEY,
  SUPABASE_URL,
  describeSupabaseError,
  supabaseConfigured,
} from "@/lib/supabase";

/**
 * Staff sign-in.
 *
 * Editing site settings, banners and ads are staff-only writes (`is_staff()` in
 * supabase/schema.sql), so the admin panel needs a Supabase session that really
 * belongs to a staff member. It deliberately does **not** reuse the visitor
 * client from `supabase.ts`: that one holds the anonymous session which owns the
 * cart, shortlist and chats, and swapping its identity for a staff login would
 * strand every row already written under the visitor's id.
 *
 * So this is a second, separate client with its own storage key. Signing in here
 * gives the admin panel a staff JWT for privileged reads and writes while the
 * public site keeps its anonymous session untouched. The session is persisted in
 * localStorage under `mw_staff_auth` and refreshed before privileged calls, so a
 * token is always present when a write or upload leaves the browser.
 */
let client: SupabaseClient | null = null;

const STAFF_STORAGE_KEY = "mw_staff_auth";

/** True when this browser has a staff session stored (a UI hint, not a check). */
export const STAFF_SESSION_KEY = STAFF_STORAGE_KEY;

export function staffClient(): SupabaseClient | null {
  if (!supabaseConfigured || typeof window === "undefined") return null;
  if (!client) {
    client = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: false,
        storageKey: STAFF_STORAGE_KEY,
        storage: window.localStorage,
      },
      global: { headers: { "x-application-name": "motor-wallah-staff" } },
    });
  }
  return client;
}

/** A token with less than this left is refreshed before it is used. */
const REFRESH_WINDOW_MS = 60_000;

export type StaffSession = {
  email: string;
  userId: string;
  /** Epoch ms, 0 when the token carries no expiry. */
  expiresAt: number;
  accessToken: string;
};

/**
 * The stored staff session, refreshed if it is about to expire.
 *
 * supabase-js persists the session itself; this wrapper exists so a privileged
 * call can guarantee it sends a live token rather than an expired one (an
 * expired token is what makes PostgREST and Storage answer "not authorised" on
 * an otherwise correct request).
 */
export async function staffSession(): Promise<StaffSession | null> {
  const supabase = staffClient();
  if (!supabase) return null;

  const { data } = await supabase.auth.getSession();
  let session = data.session;

  const expiresAt = (session?.expires_at ?? 0) * 1000;
  const stale = Boolean(session) && expiresAt > 0 && expiresAt - Date.now() < REFRESH_WINDOW_MS;

  if (stale) {
    const { data: refreshed } = await supabase.auth.refreshSession();
    session = refreshed.session ?? session;
  }

  if (!session?.user) return null;
  return {
    email: session.user.email ?? "",
    userId: session.user.id,
    expiresAt: (session.expires_at ?? 0) * 1000,
    accessToken: session.access_token,
  };
}

/** The bearer token for a request that has to carry one explicitly. */
export async function staffAccessToken(): Promise<string | null> {
  return (await staffSession())?.accessToken ?? null;
}

export type StaffState = {
  email: string;
  userId: string;
  /** Whether the signed-in Supabase user is listed in public.staff. */
  isStaff: boolean;
  /** How the answer was obtained: the RPC, a direct row read, or not at all. */
  checked: "rpc" | "table" | "none";
  /** Why the check could not complete — shown to the admin instead of guessing. */
  error: string | null;
};

/**
 * The signed-in staff user, or null when nobody is signed in.
 *
 * `is_staff()` is the authoritative answer, but reporting "not staff" whenever
 * that call fails hides the real cause (a missing function, a stale token, a
 * database that has not had schema.sql run). So a failed RPC falls back to
 * reading the caller's own `staff` row — RLS allows exactly that — and anything
 * still unproven is reported as an error rather than as "not a staff member".
 */
export async function currentStaff(): Promise<StaffState | null> {
  const session = await staffSession();
  const supabase = staffClient();
  if (!session || !supabase) return null;

  const { data, error } = await supabase.rpc("is_staff");
  if (!error) {
    return {
      email: session.email,
      userId: session.userId,
      isStaff: Boolean(data),
      checked: "rpc",
      error: null,
    };
  }

  const { data: row, error: rowError } = await supabase
    .from("staff")
    .select("user_id")
    .eq("user_id", session.userId)
    .maybeSingle();

  if (rowError) {
    return {
      email: session.email,
      userId: session.userId,
      isStaff: false,
      checked: "none",
      error: `${describeSupabaseError(error)} · ${describeSupabaseError(rowError)}`,
    };
  }

  return {
    email: session.email,
    userId: session.userId,
    isStaff: Boolean(row),
    checked: "table",
    error: null,
  };
}

export async function staffSignIn(
  email: string,
  password: string,
): Promise<{ ok: boolean; error?: string; isStaff?: boolean }> {
  const supabase = staffClient();
  if (!supabase) return { ok: false, error: "The database is not configured for this build." };

  const { error } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
  if (error) {
    const message = describeSupabaseError(error);
    const friendly = /invalid login credentials/i.test(message)
      ? "That email and password do not match a user in this project."
      : /email not confirmed/i.test(message)
        ? "That account still needs its email confirmed in the Supabase dashboard."
        : message;
    return { ok: false, error: friendly };
  }

  const state = await currentStaff();
  return { ok: true, isStaff: state?.isStaff ?? false };
}

export async function staffSignOut(): Promise<void> {
  await staffClient()?.auth.signOut();
}

/**
 * Re-attach the staff session after a reload.
 *
 * supabase-js keeps the access token in storage, but the in-memory client is
 * rebuilt on every page load; `getSession()` reads it back and
 * `refreshSession()` renews an expired token instead of dropping the person to
 * the signed-out state.
 */
export async function restoreStaffSession(): Promise<StaffState | null> {
  const supabase = staffClient();
  if (!supabase) return null;
  const existing = await currentStaff();
  if (existing) return existing;
  const { data } = await supabase.auth.refreshSession();
  if (!data.session) return null;
  return currentStaff();
}

/** Whether the current staff session may write settings (true only for staff). */
export async function staffMayWrite(): Promise<boolean> {
  return (await currentStaff())?.isStaff ?? false;
}
