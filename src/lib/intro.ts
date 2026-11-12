// Shared timing so the hero and nav arrive as the preloader curtain lifts,
// instead of animating unseen underneath it.
export const PRELOADER_HOLD_MS = 1100;
export const PRELOADER_EXIT_S = 0.85;
/** Seconds after mount at which page content should begin its entrance. */
export const INTRO_DELAY = PRELOADER_HOLD_MS / 1000 + 0.15;
