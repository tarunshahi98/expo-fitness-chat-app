/**
 * Single change point for backend decoupling (Repository pattern).
 * Swap exports here to change backend provider (e.g. Firebase -> Supabase).
 */

export { chatRepo } from "./chatRepository";
export { userRepo } from "./userRepository";
export { authRepo } from "./authRepository";
export { contactRepo } from "./contactRepository";
