import { useEffect, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { ArrowRight, KeyRound, Mail, ShieldCheck } from "lucide-react";

import { signInAdmin, useAdminSession } from "@/lib/admin-auth";
import { sendStaffPasswordReset } from "@/lib/staff-auth";

/**
 * Master Control sign-in.
 *
 * Access is a Supabase Auth account listed in `public.staff`. The "Forgot
 * password?" flow emails a Supabase recovery link that lands on /reset-password,
 * where the new password is saved with `supabase.auth.updateUser`.
 */
export function MasterAdminLoginPage() {
  const navigate = useNavigate();
  const { ready, session } = useAdminSession();

  const [mode, setMode] = useState<"signin" | "forgot">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const forgot = mode === "forgot";

  useEffect(() => {
    if (ready && session) void navigate({ to: "/master-admin", replace: true });
  }, [ready, session, navigate]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    setNotice(null);

    if (forgot) {
      const trimmed = email.trim();
      if (!/^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/.test(trimmed)) {
        setError("Enter the email address for your staff account.");
        return;
      }
      setBusy(true);
      try {
        const result = await sendStaffPasswordReset(trimmed);
        if (!result.ok) {
          setError(result.error ?? "The reset email could not be sent.");
          return;
        }
        setNotice(
          `If a staff account exists for ${trimmed}, a reset link is on its way. Open it on this device to choose a new password.`,
        );
      } catch {
        setError("The reset email could not be sent. Please try again.");
      } finally {
        setBusy(false);
      }
      return;
    }

    setBusy(true);
    try {
      const result = await signInAdmin(email, password);
      if (!result.ok) {
        setError(result.error);
        return;
      }
      await navigate({ to: "/master-admin", replace: true });
    } catch {
      setError("Sign-in could not complete. Please try again.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="mw-admin mw-admin-gate">
      <div className="mw-admin-gate-wrap">
        <section className="mw-admin-gate-intro">
          <span className="mw-admin-eyebrow">
            <ShieldCheck size={15} /> Master Control Room
          </span>
          <h1 className="mw-admin-gate-title">
            One console for <em>every</em> business case.
          </h1>
          <p className="mw-admin-gate-text">
            The live KPI overview, the unified Master Tracker, the employee and partner directories,
            banners and site settings.
          </p>
          <ul className="mw-admin-gate-list">
            <li>
              <span>01</span> Sign-in is a Supabase account, not a local password
            </li>
            <li>
              <span>02</span> Only users listed in <code>public.staff</code> get in
            </li>
            <li>
              <span>03</span> Every write is authorised by that account&apos;s token
            </li>
          </ul>
        </section>

        <section className="mw-admin-gate-card" aria-labelledby="admin-login-title">
          <div className="mw-admin-gate-cardhead">
            <div>
              <h2 id="admin-login-title">
                {forgot ? "Reset your password" : "Administrator sign in"}
              </h2>
              <p>
                {forgot
                  ? "We will email a Supabase password reset link for your staff account. The link opens a page where you choose a new password."
                  : "Use the email and password of your staff account."}
              </p>
            </div>
          </div>

          {forgot ? (
            <div className="mw-admin-setup-hint">
              <Mail size={16} />
              <p>
                This resets the <b>Supabase staff account</b> password — the same one used to sign
                in and authorise uploads and settings.
              </p>
            </div>
          ) : null}

          <form className="mw-admin-form" onSubmit={handleSubmit} noValidate>
            <label className="mw-admin-field">
              <span>{forgot ? "Staff account email" : "Email"}</span>
              <div className="mw-admin-input">
                <Mail size={16} />
                <input
                  type="email"
                  name="email"
                  autoComplete="username"
                  placeholder="you@motorwallahindia.com"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  data-testid="admin-email"
                  required
                />
              </div>
            </label>

            {!forgot ? (
              <label className="mw-admin-field">
                <span>Password</span>
                <div className="mw-admin-input">
                  <KeyRound size={16} />
                  <input
                    type="password"
                    name="password"
                    autoComplete="current-password"
                    placeholder="Your password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    data-testid="admin-password"
                    required
                  />
                </div>
              </label>
            ) : null}

            {notice ? (
              <div className="mw-admin-setup-hint" data-testid="admin-notice">
                <ShieldCheck size={16} />
                <p>{notice}</p>
              </div>
            ) : null}

            {error ? (
              <p className="mw-admin-error" role="alert" data-testid="admin-error">
                {error}
              </p>
            ) : null}

            <button
              type="submit"
              className="mw-admin-submit"
              disabled={busy || !email.trim() || (!forgot && !password)}
              data-testid="admin-submit"
            >
              {busy
                ? forgot
                  ? "Sending…"
                  : "Verifying…"
                : forgot
                  ? "Send reset link"
                  : "Enter control room"}
              <ArrowRight size={17} />
            </button>

            {!forgot ? (
              <button
                type="button"
                className="mw-admin-linkbtn"
                onClick={() => {
                  setMode("forgot");
                  setError(null);
                  setNotice(null);
                }}
                data-testid="admin-forgot-link"
              >
                Forgot password?
              </button>
            ) : null}
          </form>

          <div className="mw-admin-gate-foot">
            <span>
              {forgot
                ? "The reset link will redirect to /reset-password on this site."
                : "Access is limited to accounts listed in the staff table."}
            </span>
            {forgot ? (
              <button
                type="button"
                className="mw-admin-linkbtn"
                onClick={() => {
                  setMode("signin");
                  setError(null);
                  setNotice(null);
                }}
                data-testid="admin-signin-link"
              >
                Back to sign in
              </button>
            ) : null}
            <a href="/">← Back to Motor Wallah</a>
          </div>
        </section>
      </div>
    </div>
  );
}
