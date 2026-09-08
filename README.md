# 💬 Expo Chat App

### A production-ready, cross-platform real-time messaging and lifestyle application for iOS, Android, and Web — powered by React Native, Expo SDK 57, and Firebase.

---

## 📖 Overview

**Expo Chat App** is a full-featured messaging and lifestyle application built with **React Native**, **Expo SDK 57**, **Expo Router**, and **Firebase**. It showcases:

* **5-Tab Native Navigation:** Seamless switching between Chats, Explore feed, Fitness tracking, Shop catalog, and Settings.
* **Inverted Real-Time Messaging:** Instant bottom-pinned message streaming with zero scroll jitter and memoized 60fps typing performance.
* **Atomic Database Transactions:** Zero-race-condition username reservations via Firestore transactions.
* **Decoupled Repository Pattern:** Complete abstraction of Firebase SDK from UI components.
* **Figma Blue Design System:** High-contrast slate typography, Figma Blue (`#3B82F6`) branding, and dynamic Dark/Light theme switching.
* **Universal State Management:** Secure token persistence, real-time Firestore listeners, theme switching, and live network connectivity detection.
* **Modular TypeScript Architecture:** Strict type contracts with zero `any` compromises.

> ✅ **Expo SDK 57** · **React Native 0.86** · **React 19** · **TypeScript 7 (0 Errors)** · **oxlint Validated**

---

## ✨ Key Features

| Feature | Description |
|---|---|
| 💬 **Chats Tab** | Active conversation threads with real-time unread badges (`tabBarBadge`), message snippets, and instant directory search. |
| ⚡ **Inverted Chat Experience** | Real-time chat stream rendered with an inverted list (`inverted={true}`), auto-pinning to latest messages on load and send. |
| 🧭 **Explore Tab** | Multi-category social feed (*For You*, *Lifestyle*, *News*), interactive like counters, and Floating Action Button (FAB) for post creation. |
| 🏃 **Fitness Tab** | Daily metrics tracking (calories burned, steps taken) with division-by-zero protected progress bars and 1-tap Coach discussion linking into chat. |
| 🛍️ **Shop Tab** | 2-column e-commerce grid with wishlist heart toggles and instant cart/bag notifications. |
| ⚙️ **Settings Suite** | Complete configuration hub: Edit profile with avatar photo picker/cropper, Appearance theme switcher, Notifications, Blocked users, Privacy, Media storage, Help FAQ, and safe Account Deletion. |
| 🔐 **Authentication** | Email/password sign-up, sign-in, and password reset with real-time field validation, password strength metering, and social sign-in buttons (Google & Apple). |
| 🛡️ **Atomic Username Uniqueness** | Guaranteed collision-free handles via dedicated `/usernames/{username}` Firestore transactions (`runTransaction`). |
| 🌓 **Dark & Light Mode** | System-aware theme provider with instant switching, obsidian navy dark palette, and persistent `AsyncStorage` cache. |
| 📡 **Network & Offline Detection** | Real-time connectivity monitor with custom sliding offline status banners and automatic request guards. |
| 🔔 **Interactive Banner System** | Gesture-driven, swipe-to-dismiss global alert manager using `react-native-reanimated` for errors, success states, and notices. |
| 🖼️ **In-App Avatar Processing** | Photo selection with client-side downsampling and compression (`expo-image-manipulator`) stored seamlessly. |
| 📱 **True Cross-Platform** | Pixel-perfect experience across iOS, Android, and Web from a single unified codebase. |

---

## 🛠️ Tech Stack

### Core Framework
| Technology | Version | Purpose |
|---|---|---|
| [React Native](https://reactnative.dev/) | 0.86.2 | Cross-platform native UI framework |
| [Expo](https://expo.dev/) | ~57.0.9 | Managed workflow, SDK, and build toolchain |
| [Expo Router](https://docs.expo.dev/router/introduction/) | ~57.0.9 | File-based routing with deep link and nested stack/tab support |
| [TypeScript](https://www.typescriptlang.org/) | ^7.0.2 | Strict static typing throughout the entire codebase |
| [oxlint](https://oxc.rs/docs/guide/usage/linter.html) | ^1.79.0 | High-performance JavaScript / TypeScript linter |

### Backend & Cloud Infrastructure
| Technology | Version | Purpose |
|---|---|---|
| [Firebase](https://firebase.google.com/) | ^12.15.0 | Modular Web SDK for Auth and Firestore |
| [Firebase Auth](https://firebase.google.com/products/auth) | via firebase | User session management and credentials |
| [Cloud Firestore](https://firebase.google.com/products/firestore) | via firebase | Real-time NoSQL database with atomic transactions |

### UI, Gestures & Animation
| Technology | Version | Purpose |
|---|---|---|
| [Lucide React Native](https://lucide.dev/) | ^1.23.0 | Modern icon set |
| [Expo Linear Gradient](https://docs.expo.dev/versions/latest/sdk/linear-gradient/) | ~57.0.0 | Gradient headers, buttons, and accents |
| [Expo Image](https://docs.expo.dev/versions/latest/sdk/image/) | ~57.0.0 | High-performance cached image rendering |
| [React Native Reanimated](https://docs.swmansion.com/react-native-reanimated/) | 4.5.1 | Fluid UI transitions & gesture spring animations |
| [React Native Gesture Handler](https://docs.swmansion.com/react-native-gesture-handler/) | ~2.32.0 | Native swipe and pan gesture recognition |
| [React Native SVG](https://github.com/software-mansion/react-native-svg) | 15.15.4 | Vector graphics and custom illustrations |
| [React Native Screens](https://github.com/software-mansion/react-native-screens) | 4.26.2 | Native screen memory management & transitions |

### Device & Platform
| Technology | Purpose |
|---|---|
| [@react-native-async-storage/async-storage](https://react-native-async-storage.github.io/async-storage/) | Persistent key-value storage for Auth sessions and theme preferences |
| [expo-image-picker](https://docs.expo.dev/versions/latest/sdk/imagepicker/) | Native media library integration for profile picture selection |
| [expo-image-manipulator](https://docs.expo.dev/versions/latest/sdk/imagemanipulator/) | Client-side compression and resizing for fast avatar uploads |
| [react-native-safe-area-context](https://github.com/th3rdwave/react-native-safe-area-context) | Dynamic notch and navigation bar insets across devices |

---

## 🏗️ Architecture & Project Structure

```text
expo-chat-app/
├── src/
│   ├── app/                         # Expo Router file-based navigation
│   │   ├── (auth)/                  # Authentication screens (sign-in, sign-up, forget-password)
│   │   ├── (main)/                  # Protected navigation area (Stack wrapping Tabs)
│   │   │   ├── (tabs)/              # 5-Tab Native Navigation
│   │   │   │   ├── contacts.tsx     # Chats tab (conversations list & unread badges)
│   │   │   │   ├── explore.tsx      # Explore feed (For You, Lifestyle, News + FAB)
│   │   │   │   ├── fitness.tsx      # Fitness tracking & Coach chat link
│   │   │   │   ├── shopping.tsx     # 2-column e-commerce store
│   │   │   │   ├── settings/        # Settings & profile suite (index, edit, appearance, etc.)
│   │   │   │   └── _layout.tsx      # Tab bar layout configuration & theme styling
│   │   │   ├── chat.tsx             # Inverted 1-on-1 real-time chat screen
│   │   │   ├── search-contacts.tsx  # Instant directory search screen
│   │   │   └── _layout.tsx          # Main Stack layout (modal/push transitions)
│   │   ├── index.tsx                # Entry redirect
│   │   └── _layout.tsx              # Root layout with AuthRouteGuard, ThemeProvider & Banner
│   │
│   ├── components/                  # Reusable UI widgets
│   │   ├── auth/                    # AuthHeroHeader, etc.
│   │   ├── common/                  # CommonComponents (AppText, SubmitButton), CommonInputs
│   │   ├── settings/                # SubScreenShell, SettingRow
│   │   ├── ui/                      # OptionPillGroup, etc.
│   │   ├── Avatar.tsx               # User avatar with fallback initials
│   │   ├── ContactRow.tsx           # Contact list row with online dot and unread badge
│   │   ├── GlobalBanner.tsx         # Gesture-driven animated banner notification
│   │   └── MessageItem.tsx          # Memoized chat message bubble (sent / received)
│   │
│   ├── constants/                   # Design system & tokens
│   │   ├── appTheme.ts              # Light & Dark theme tokens (Figma Blue #3B82F6)
│   │   ├── settingsConfig.ts        # Settings menu items configuration
│   │   └── typography.ts            # Scaled typography system
│   │
│   ├── contexts/                    # Global React Contexts
│   │   ├── AuthContext.tsx          # User session, login, registration, deletion
│   │   ├── BannerContext.tsx        # Toast / banner dispatch and auto-dismiss
│   │   ├── NetworkContext.tsx       # Live connectivity and pre-flight guards
│   │   └── ThemeContext.tsx         # Dynamic dark/light theme switching with AsyncStorage
│   │
│   ├── hooks/                       # Custom React hooks
│   │   ├── useChatMessages.ts       # Real-time chat message subscription & sending
│   │   ├── useContactsList.ts       # Real-time contacts & conversation subscription
│   │   └── useHeaderInset.ts        # Edge-to-edge safe area inset normalizer
│   │
│   ├── lib/                         # Platform infrastructure
│   │   ├── firebase.ts              # Firebase initialization & persistence configuration
│   │   ├── firebaseAuth.native.ts   # Native platform auth stubs
│   │   └── firebaseAuth.web.ts      # Web platform auth handling
│   │
│   ├── repository/                  # Data access layer (Repository Pattern)
│   │   ├── authRepository.ts        # Authentication methods & session persistence
│   │   ├── chatRepository.ts        # Messages subcollection & conversation metadata
│   │   ├── contactRepository.ts     # Contact filtering, search, and avatar hashing
│   │   ├── userRepository.ts        # User profile CRUD & atomic username reservations
│   │   └── index.ts                 # Central barrel export
│   │
│   ├── styles/                      # 7 modular StyleSheet modules
│   │   ├── authStyles.ts            # Authentication form & hero styles
│   │   ├── chatStyles.ts            # Chat conversation & contacts list styles
│   │   ├── settingsStyles.ts        # Profile & settings screen styles
│   │   ├── sharedStyles.ts          # Common shared layout styles
│   │   ├── tabScreenStyles.ts       # Explore, Fitness, and Shop screen styles
│   │   ├── uiStyles.ts              # Modal, pill, and control styles
│   │   └── index.ts                 # Central stylesheet barrel export
│   │
│   ├── types/                       # Strict TypeScript type definitions
│   │   ├── app.ts                   # Theme, banner, and context type contracts
│   │   ├── chat.ts                  # Chat hook result types
│   │   ├── components.ts            # Component prop interfaces
│   │   ├── models.ts                # Domain models (User, Contact, Message, Profile)
│   │   └── index.ts                 # Central type barrel export
│   │
│   └── utils/                       # Shared platform & business utilities
│       ├── alert.ts                 # Cross-platform alerts (Alert.alert / window.confirm)
│       ├── authErrors.ts            # Friendly Firebase error message mapping
│       ├── date.ts                  # Timestamp normalization & formatting
│       ├── network.ts               # Connectivity probing & reachability checks
│       ├── platform.ts              # Platform helpers (IS_WEB, IS_APPLE_DEVICE, keyboard)
│       └── validations.ts           # Email, password, and username validation rules
│
├── android/                         # Bare Android native project & Gradle wrapper
├── firestore.rules                  # Granular Firestore security & schema validation rules
├── app.json                         # Expo configuration & build metadata
├── package.json                     # Project dependencies & npm scripts
└── tsconfig.json                    # Strict TypeScript configuration
```

### Architectural Highlights

- **Repository Pattern** — All Firestore and Auth operations are encapsulated in `src/repository/`. UI screens and custom hooks never invoke raw Firebase SDK methods directly, ensuring testability and modularity.
- **Inverted FlatList with `React.memo`** — The chat screen uses `inverted={true}` so conversations open pinned to the bottom. Messages are memoized to avoid re-rendering bubbles on keystrokes.
- **Atomic Username Uniqueness** — Guaranteed handle uniqueness by using the lowercase username as the document ID in `/usernames/{username}` within an atomic `runTransaction` batch.
- **Single Source of Truth Contexts** — `AuthContext`, `ThemeContext`, `BannerContext`, and `NetworkContext` encapsulate global states with clean declarative hooks (`useAuth()`, `useAppTheme()`, `useBanner()`, `useNetwork()`).
- **Strict Package Manager Convention** — All tooling and development workflows strictly use `npm`.

---

## 💻 How to Run on Your System (Step-by-Step)

Follow these instructions to clone, configure, and run the application on your local machine.

### 1. Prerequisites

Make sure you have the following installed:
* [Node.js](https://nodejs.org/) (version **18.x** or **20.x** recommended)
* [npm](https://www.npmjs.com/) (bundled with Node)
* [Git](https://git-scm.com/)
* *(Optional for mobile testing)* **Expo Go** app on your physical iOS/Android device, or an iOS Simulator / Android Studio Emulator.

---

### 2. Clone the Repository & Install Dependencies

```bash
# Clone the repository
git clone https://github.com/your-username/expo-chat-app.git

# Navigate into the project folder
cd expo-chat-app

# Install dependencies using npm
npm install
```

---

### 3. Set Up Free Firebase Backend

The app runs 100% within the free **Firebase Spark Tier**.

1. Go to the [Firebase Console](https://console.firebase.google.com/) and click **Add Project**.
2. **Enable Authentication:**
   * Go to **Build** → **Authentication** → **Get Started**.
   * Under the **Sign-in method** tab, enable **Email/Password**.
3. **Enable Firestore Database:**
   * Go to **Build** → **Firestore Database** → **Create Database**.
   * Choose any region close to you and start in **Test mode** or **Production mode**.
4. **Deploy Security Rules (Critical):**
   * In Firestore Database, click the **Rules** tab.
   * Copy the entire contents of [`firestore.rules`](firestore.rules) from this repository and paste it into the editor.
   * Click **Publish**.

---

### 4. Configure Environment Variables

1. In the Firebase Console, go to **Project Settings** (⚙️ icon) → **General**.
2. Scroll down to **Your apps**, click the **Web** (`</>`) icon, and register an app (e.g., `expo-chat-web`).
3. Copy the `firebaseConfig` object values.
4. Create a `.env` file in the root of your project:

```bash
cp .env.example .env
```

5. Fill in your Firebase configuration values in `.env`:

```env
EXPO_PUBLIC_FIREBASE_API_KEY=AIzaSy...
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
EXPO_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789012
EXPO_PUBLIC_FIREBASE_APP_ID=1:123456789012:web:abcdef...
```

---

### 5. Launch the Application

Start the Expo development server:

```bash
# Start development server
npm start
```

#### Choose Your Platform:
* **Web (Instant in browser):** Press `w` in the terminal or run `npm run web`. Opens at `http://localhost:8081`.
* **Android Device / Emulator:** Press `a` in the terminal or run `npm run android`.
* **iOS Simulator (macOS only):** Press `i` in the terminal or run `npm run ios`.
* **Physical Phone:** Scan the terminal QR code using the **Expo Go** app (Android) or **Camera app** (iOS).

---

### 6. Verify Code Quality

```bash
# Typecheck with TypeScript compiler (0 errors)
npx tsc --noEmit

# Run fast code linting via oxlint
npm run lint
```

---

### 7. 🤖 Build Standalone Android APKs

To generate standalone release APKs directly using the Gradle wrapper:

```bash
# Navigate to the Android directory
cd android

# Build the release APKs
.\gradlew.bat assembleRelease   # Windows
# or: ./gradlew assembleRelease # macOS / Linux
```

The compiled APKs will be generated in `android/app/build/outputs/apk/release/`:
* `app-universal-release.apk` — Installs on any Android device architecture.
* `app-arm64-v8a-release.apk` — Optimized for modern physical 64-bit Android smartphones.
* `app-x86_64-release.apk` — Optimized for 64-bit Android emulators and Chromebooks.

---

## 📄 License

Distributed under the [MIT License](LICENSE).
