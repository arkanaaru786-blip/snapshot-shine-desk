import { useEffect, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { ArrowRight, KeyRound, Mail, ShieldCheck } from "lucide-react";
import { signInAdmin, useAdminSession } from "@/lib/admin-auth";

/**
 * Master Control sign-in.
 *
 * One path only: the email and password of a Supabase Auth user whose id is
 * listed in `public.staff`. There is no first-run setup, no environment
 * password and no device-local account — anything else is refused by the
 * database.
 */
export function MasterAdminLoginPage() {
  const navigate = useNavigate();
  const { ready, session } = useAdminSession();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (ready && session) void navigate({ to: "/master-admin", replace: true });
  }, [ready, session, navigate]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
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
            The live KPI overview, the unified Master Tracker, the employee and partner
            directories, banners and site settings.
          </p>
          <ul className="mw-admin-gate-list">
            <li>
              <span>01</span> Sign-in is a Supabase account, not a local password
            </li>
            <li>
              <span>02</span> Only users listed in <code>public.staff</code> get in
            </li>
            <li>
              <span>03</span> Every write is authorised by that account's token
            </li>
          </ul>
        </section>

        <section className="mw-admin-gate-card" aria-labelledby="admin-login-title">
          <div className="mw-admin-gate-cardhead">
            <div>
              <h2 id="admin-login-title">Administrator sign in</h2>
              <p>Use the email and password of your staff account.</p>
            </div>
          </div>

          <form className="mw-admin-form" onSubmit={handleSubmit} noValidate>
            <label className="mw-admin-field">
              <span>Email</span>
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

            {error ? (
              <p className="mw-admin-error" role="alert" data-testid="admin-error">
                {error}
              </p>
            ) : null}

            <button
              type="submit"
              className="mw-admin-submit"
              disabled={busy || !email.trim() || !password}
              data-testid="admin-submit"
            >
              {busy ? "Verifying…" : "Enter control room"}
              <ArrowRight size={17} />
            </button>
          </form>

          <div className="mw-admin-gate-foot">
            <span>Access is limited to accounts listed in the staff table.</span>
            <a href="/">← Back to Motor Wallah</a>
          </div>
        </section>
      </div>
    </div>
  );
}
