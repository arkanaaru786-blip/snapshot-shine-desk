-- ---------------------------------------------------------------------------
-- Who is allowed to write through the Master Control Room
--
-- The admin panel's own password check is a device-local convenience. Every
-- privileged database call it makes — saving site settings, editing banners,
-- uploading artwork to Storage — is authorised by Supabase, which only trusts a
-- real signed-in user whose id appears in public.staff (`is_staff()`).
--
-- Without that row, an upload that looks fine in the panel is rejected by the
-- bucket policy with
--   42501 new row violates row-level security policy
-- and any settings save fails the same way.
--
-- One-time setup, per administrator:
--
--   1. Supabase Dashboard → Authentication → Users → Add user.
--      Use the same email and password the person types into /master-admin, and
--      tick "Auto confirm user" so no email round-trip is needed.
--
--   2. Run the block below in SQL Editor with that email.
--
--   3. Sign out and back in at /master-admin. The panel now stores a Supabase
--      session next to its own, and supabase-js sends `Authorization: Bearer …`
--      on every table read, RPC and Storage upload.
--
-- The panel shows a red notice at the top of every control-room page while the
-- signed-in email has no staff session, so a missing step is visible instead of
-- surfacing later as a failed upload.
-- ---------------------------------------------------------------------------

-- Step 2 — add (or re-add) a staff member by email.
insert into public.staff (user_id, email, role)
select id, email, 'admin'
from auth.users
where lower(email) = lower('admin@motorwallah.in') -- ← change this email
on conflict (user_id) do update
  set email = excluded.email,
      role  = excluded.role;

-- Check it worked: while signed in as that user in the panel, this returns true.
-- select public.is_staff();

-- See who is on the allow-list (the table is not readable from the browser
-- beyond your own row, so this belongs in the SQL editor).
select s.user_id, s.email, s.role, s.created_at
from public.staff s
order by s.created_at;
