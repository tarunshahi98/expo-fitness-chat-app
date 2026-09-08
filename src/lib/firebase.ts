import AsyncStorage from "@react-native-async-storage/async-storage";
import { getApp, getApps, initializeApp } from "firebase/app";
import {
  Auth,
  getAuth,
  // @ts-expect-error - getReactNativePersistence is exported in React Native entry of firebase/auth
  getReactNativePersistence,
  initializeAuth,
} from "firebase/auth";
import {
  Firestore,
  getFirestore,
  initializeFirestore,
  persistentLocalCache,
  persistentSingleTabManager,
} from "firebase/firestore";
import { IS_WEB, PLATFORM } from "@/utils/platform";

// 1. Live Production Firebase Configuration from Environment
const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY || "",
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN || "",
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID || "expo-chat-app-defd7",
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "",
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID || "",
};

// 2. Initialize Firebase App (Singleton Pattern)
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// 3. Initialize Auth with React Native AsyncStorage Persistence & Fast Refresh Guard
let auth: Auth;
try {
  if (IS_WEB) {
    auth = getAuth(app);
  } else {
    auth = initializeAuth(app, {
      persistence: getReactNativePersistence(AsyncStorage),
    });
  }
} catch {
  auth = getAuth(app);
}

// 4. Initialize Firestore with Web & Native Persistent Disk Cache
let db: Firestore;
try {
  const localCache = IS_WEB
    ? persistentLocalCache({ tabManager: persistentSingleTabManager({}) })
    : persistentLocalCache();

  db = initializeFirestore(app, {
    localCache,
    experimentalForceLongPolling: true,
  });
} catch {
  db = getFirestore(app);
}

// 5. Environment Notice (Logged once)
const globalScope = globalThis as typeof globalThis & {
  _hasLoggedFirebaseEnv?: boolean;
};

if (!globalScope._hasLoggedFirebaseEnv) {
  globalScope._hasLoggedFirebaseEnv = true;
  console.log(
    `==================================================\n` +
      `🚀 FIREBASE ENVIRONMENT: LIVE SERVER\n` +
      `--------------------------------------------------\n` +
      `• Project ID: ${firebaseConfig.projectId}\n` +
      `• Platform:   ${PLATFORM}\n` +
      `==================================================`
  );
}

export { app, auth, db };
