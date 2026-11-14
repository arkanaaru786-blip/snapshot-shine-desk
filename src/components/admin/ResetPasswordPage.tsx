import { useEffect, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { ArrowRight, KeyRound, Mail, ShieldCheck } from "lucide-react";

import { MIN_PASSWORD_LENGTH, validatePasswordStrength } from "@/lib/admin-crypto";
import { staffClient } from "@/lib/staff-auth";
import { describeSupabaseError } from "@/lib/supabase";

/**
 * Password reset landing page for Supabase recovery links.
 *
 * Supabase appends the session to the URL fragment
 *   #access_token=…&refresh_token=…&type=recovery
 * The staff client is created with detectSessionInUrl:false (it shares no storage
 * with the visitor client), so this page reads the fragment itself, establishes
 * the session, and then lets the person choose a new password.
 */
export function ResetPasswordPage() {
  const navigate = useNavigate();
  const [status, setStatus] = useState<"checking" | "ready" | "invalid" | "done">("checking");
  const [message, setMessage] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    let alive = true;

    const apply = async () => {
      const raw = window.location.hash.replace(/^#/, "");
      if (!raw) {
        if (alive) {
          setStatus("invalid");
          setMessage(
            "This reset link is missing its sign-in token. Open the most recent reset email on this device, or request a new link.",
          );
        }
        return;
      }

      const params = new URLSearchParams(raw);
      const type = params.get("type");
      const accessToken = params.get("access_token");
      const refreshToken = params.get("refresh_token") ?? "";
      const hashError = params.get("error_description") ?? params.get("error");

      // Remove the token from the address bar as soon as it is read.
      window.history.replaceState(null, "", window.location.pathname + window.location.search);

      if (hashError) {
        if (alive) {
          setStatus("invalid");
          setMessage(decodeURIComponent(hashError.replace(/\+/g, " ")));
        }
        return;
      }

      if (type !== "recovery" || !accessToken) {
        if (alive) {
          setStatus("invalid");
          setMessage(
            "This link is not a password reset link, or it has already been used. Request a new reset email and try again.",
          );
        }
        return;
      }

      const client = staffClient();
      if (!client) {
        if (alive) {
          setStatus("invalid");
          setMessage(
            "The database is not configured for this build, so the password cannot be reset here.",
          );
        }
        return;
      }

      const { data, error: sessionError } = await client.auth.setSession({
        access_token: accessToken,
        refresh_token: refreshToken,
      });

      if (!alive) return;

      if (sessionError || !data.session) {
        setStatus("invalid");
        setMessage(
          sessionError
            ? `${describeSupabaseError(sessionError)} This reset link may have expired — request a new one.`
            : "This reset link could not be verified. It may have expired — request a new one.",
        );
        return;
      }

      setEmail(data.session.user.email ?? null);
      setStatus("ready");
    };

    void apply();
    return () => {
      alive = false;
    };
  }, []);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);

    const weak = validatePasswordStrength(password);
    if (weak) {
      setError(weak);
      return;
    }
    if (password !== confirm) {
      setError("Both passwords must match.");
      return;
    }

    const client = staffClient();
    if (!client) {
      setError("The database is not configured for this build.");
      return;
    }

    setBusy(true);
    try {
      const { error: updateError } = await client.auth.updateUser({ password });
      if (updateError) {
        setError(describeSupabaseError(updateError));
        return;
      }
      setStatus("done");
      setMessage("Your password has been updated. You can sign in with it now.");
      window.setTimeout(() => {
        void navigate({ to: "/master-admin/login", replace: true });
      }, 1400);
    } catch {
      setError("The password could not be updated. Please try again.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="mw-admin mw-admin-gate">
      <div className="mw-admin-gate-wrap">
        <section className="mw-admin-gate-intro">
          <span className="mw-admin-eyebrow">
            <ShieldCheck size={15} /> Account recovery
          </span>
          <h1 className="mw-admin-gate-title">
            Choose a <em>new</em> password.
          </h1>
          <p className="mw-admin-gate-text">
            This page only works from the reset link sent to your staff email. The link signs you in
            once so you can set a new password for the same account.
          </p>
          <ul className="mw-admin-gate-list">
            <li>
              <span>01</span> Use at least {MIN_PASSWORD_LENGTH} characters with a letter and a
              number
            </li>
            <li>
              <span>02</span> The reset link expires and can be used only once
            </li>
            <li>
              <span>03</span> After saving, sign in at the control room with the new password
            </li>
          </ul>
        </section>

        <section className="mw-admin-gate-card" aria-labelledby="reset-password-title">
          <div className="mw-admin-gate-cardhead">
            <div>
              <h2 id="reset-password-title">Reset your password</h2>
              <p>
                {status === "ready" && email
                  ? `Setting a new password for ${email}.`
                  : "Confirm the reset link, then choose a new password."}
              </p>
            </div>
            <span className="mw-admin-badge">Recovery</span>
          </div>

          {status === "checking" ? (
            <div className="mw-admin-setup-hint" data-testid="reset-checking">
              <KeyRound size={16} />
              <p>Checking your reset link…</p>
            </div>
          ) : null}

          {status === "invalid" ? (
            <>
              <div className="mw-admin-error" role="alert" data-testid="reset-invalid">
                {message ?? "This reset link is not valid."}
              </div>
              <div className="mw-admin-gate-foot">
                <span>Ask for a new link from the sign-in page.</span>
                <a href="/master-admin/login">Back to sign in</a>
              </div>
            </>
          ) : null}

          {status === "done" ? (
            <>
              <div className="mw-admin-setup-hint" data-testid="reset-done">
                <ShieldCheck size={16} />
                <p>{message ?? "Your password has been updated."}</p>
              </div>
              <div className="mw-admin-gate-foot">
                <span>Taking you to sign in…</span>
                <a href="/master-admin/login">Sign in now</a>
              </div>
            </>
          ) : null}

          {status === "ready" ? (
            <form className="mw-admin-form" onSubmit={handleSubmit} noValidate>
              {email ? (
                <label className="mw-admin-field">
                  <span>Account email</span>
                  <div className="mw-admin-input">
                    <Mail size={16} />
                    <input type="email" value={email} readOnly autoComplete="username" />
                  </div>
                </label>
              ) : null}

              <label className="mw-admin-field">
                <span>New password</span>
                <div className="mw-admin-input">
                  <KeyRound size={16} />
                  <input
                    type="password"
                    name="password"
                    autoComplete="new-password"
                    placeholder={`At least ${MIN_PASSWORD_LENGTH} characters`}
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    data-testid="reset-password"
                    required
                  />
                </div>
              </label>

              <label className="mw-admin-field">
                <span>Confirm new password</span>
                <div className="mw-admin-input">
                  <KeyRound size={16} />
                  <input
                    type="password"
                    name="confirm"
                    autoComplete="new-password"
                    placeholder="Repeat the new password"
                    value={confirm}
                    onChange={(event) => setConfirm(event.target.value)}
                    data-testid="reset-confirm"
                    required
                  />
                </div>
              </label>

              {error ? (
                <p className="mw-admin-error" role="alert" data-testid="reset-error">
                  {error}
                </p>
              ) : null}

              <button
                type="submit"
                className="mw-admin-submit"
                disabled={busy}
                data-testid="reset-submit"
              >
                {busy ? "Saving…" : "Save new password"}
                <ArrowRight size={17} />
              </button>

              <div className="mw-admin-gate-foot">
                <span>Remembered it after all?</span>
                <a href="/master-admin/login">Back to sign in</a>
              </div>
            </form>
          ) : null}
        </section>
      </div>
    </div>
  );
}
