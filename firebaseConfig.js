/**
 * Root firebaseConfig entry module.
 * Re-exports the singleton Firebase instances initialized in src/lib/firebase.ts.
 */
export { app, auth, db } from "./src/lib/firebase";
