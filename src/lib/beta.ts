/**
 * Beta-mode flag and beta-specific values. Single source of truth — flip
 * `IS_BETA` to `false` (and redeploy) at paid launch to revert pricing UI,
 * checkout button, regular signup bonus, etc.
 *
 * Used by both server (credits, API errors) and client (landing, sidebar).
 * Bundlers inline the constant so client bundles tree-shake the unused branch.
 */

export const IS_BETA = false;

export const BETA_FEEDBACK_EMAIL = 'leejahun0@gmail.com';
export const BETA_SIGNUP_BONUS = 200;

/** Server-side error returned by chat APIs when a user is out of credits. */
export function noCreditsErrorMessage(): string {
  return 'No credits remaining. Buy a credit pack to keep going.';
}
