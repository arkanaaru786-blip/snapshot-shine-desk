/**
 * Production switches.
 *
 * The site shipped with a seeded catalogue, seeded dealer logins and demo
 * labels so the flows could be reviewed before real data existed. Those are off
 * now: every page starts empty and fills from what the team actually adds.
 *
 * Nothing here is a silent toggle — reads are gated in one place so a future
 * "sample data" feature has to be asked for explicitly.
 */
export const DEMO_CONTENT_ENABLED = false;
