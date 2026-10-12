# Durza: Coupon & Deals — PWA & Capacitor Setup

This guide covers the PWA (Progressive Web App) and Capacitor setup for Durza.

## What's Been Set Up

### Phase 1: PWA (Progressive Web App)

The app is now installable on Android and iOS devices:

- **Web App Manifest** (`public/manifest.json`) — App metadata, icons, shortcuts
- **Service Worker** (`public/sw.js`) — App shell caching, offline fallback, push notifications
- **Install Prompt** (`components/InstallPrompt.tsx`) — Custom install UI
- **Offline Page** (`public/offline.html`) — Friendly offline fallback
- **PWA Icons** — 192x192, 512x512, and maskable variants
- **Apple Meta Tags** — iOS-specific web app tags in `app/layout.tsx`

### Phase 2: Capacitor (Native App Shell)

The app can be built as a native Android/iOS app:

- **Capacitor Config** (`capacitor.config.ts`) — App ID, name, server URL
- **Android Platform** (`android/`) — Native Android project
- **iOS Platform** (`ios/`) — Native Xcode project
- **NPM Scripts** — Build, sync, and run commands

---

## PWA Usage

### Testing Locally

```bash
npm run dev
```

Then open Chrome DevTools → Application → Service Workers to verify the service worker is registered.

### Installing on Android

1. Open the app in Chrome on your Android device
2. Tap the menu (⋮) → "Add to Home screen" or "Install app"
3. The app will appear in your app drawer

### Installing on iOS

1. Open the app in Safari on your iOS device
2. Tap the Share button → "Add to Home Screen"
3. The app will appear on your home screen

### PWA Features

- **Offline support** — App shell loads from cache, shows offline page when network fails
- **Push notifications** — Works on Android and iOS 16.4+
- **Install prompt** — Custom install UI appears when the browser supports it
- **App shortcuts** — Long-press the app icon for quick access to Coupons, Deals, Saved

---

## Capacitor Usage

### Prerequisites

- **Android:** Android Studio, JDK 17+
- **iOS:** macOS with Xcode 14+

### Build for Production

```bash
# Build the Next.js app as static export
CAPACITOR_BUILD=true npm run build

# Sync with Capacitor
npx cap sync
```

### Open in Native IDE

```bash
# Open in Android Studio
npm run open:android

# Open in Xcode
npm run open:ios
```

### Run on Device/Simulator

```bash
# Run on Android device/emulator
npm run run:android

# Run on iOS simulator
npm run run:ios
```

### Development Workflow

For development, you can use the Next.js dev server with live reload:

```bash
# Terminal 1: Start Next.js dev server
npm run dev

# Terminal 2: Open in native IDE (the app will load from localhost:3000)
npm run open:android
# or
npm run open:ios
```

---

## App Configuration

### Changing the App Name/ID

Edit `capacitor.config.ts`:

```typescript
const config: CapacitorConfig = {
  appId: "in.durza.app",  // Change to your app ID
  appName: "Durza",         // Change to your app name
  // ...
};
```

### Changing the Server URL

The Capacitor app loads from the URL specified in `capacitor.config.ts`:

```typescript
server: {
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  cleartext: true,  // Allow HTTP (set to false for production)
},
```

For production, set `NEXT_PUBLIC_SITE_URL` to your deployed URL and remove `cleartext: true`.

---

## Project Structure

```
durza-web/
├── app/                    # Next.js App Router
│   ├── layout.tsx          # Root layout with PWA meta tags
│   ├── icon.tsx            # 32x32 favicon
│   └── apple-icon.tsx      # 180x180 Apple touch icon
├── components/
│   └── InstallPrompt.tsx   # PWA install prompt component
├── public/
│   ├── manifest.json       # PWA web app manifest
│   ├── sw.js               # Service worker
│   ├── offline.html        # Offline fallback page
│   ├── icon.svg            # SVG icon (the Durza "D" mark)
│   ├── logo.svg / logo.png            # Full lockup, for light backgrounds
│   ├── logo-reversed.svg / .png       # Full lockup, for orange/dark backgrounds
│   ├── favicon.ico, apple-touch-icon.png
│   ├── icon-192.png        # PWA icon (192x192)
│   ├── icon-512.png        # PWA icon (512x512)
│   └── icon-maskable-512.png  # Maskable PWA icon
├── android/                # Native Android project (Capacitor)
├── ios/                    # Native iOS project (Capacitor)
├── capacitor.config.ts     # Capacitor configuration
├── next.config.ts          # Next.js config (with Capacitor support)
└── scripts/
    └── brand/              # Logo + icon generator (see README.md there)
```

---

## Regenerating Icons

The icons and logo are generated from a single geometry definition. See
`scripts/brand/README.md`:

```bash
pip install cairosvg pillow fonttools
python3 scripts/brand/build.py && python3 scripts/brand/splash.py
```

Then copy the output into `public/`, `android/` and `ios/` as the table in that
README describes. Brand orange is `#EE5A0B` (white on it is 3.4:1); use
`#C2410C` for small orange text on light backgrounds.

---

## Troubleshooting

### PWA not installable

- Ensure the app is served over HTTPS (or localhost)
- Check that `manifest.json` is valid (use Chrome DevTools → Application → Manifest)
- Verify the service worker is registered (Chrome DevTools → Application → Service Workers)

### Capacitor sync fails

- Run `CAPACITOR_BUILD=true npm run build` first to generate the `out/` directory
- Then run `npx cap sync`

### iOS build fails

- Ensure you're on macOS with Xcode 14+
- Run `cd ios/App && pod install` if needed
- Open `ios/App/App.xcworkspace` (not `.xcodeproj`) in Xcode

### Android build fails

- Ensure Android Studio is installed
- Set `ANDROID_HOME` environment variable
- Run `npx cap open android` to open in Android Studio

---

## Next Steps

1. **Design proper icons** — Replace the generated placeholder icons with professionally designed ones
2. **Set up push notifications** — Configure APNs for iOS and FCM for Android
3. **App store submission** — Follow the Capacitor deployment guides:
   - [Android Play Store](https://capacitorjs.com/docs/android/deploying-to-google-play)
   - [iOS App Store](https://capacitorjs.com/docs/ios/app-store)
4. **Offline data** — Consider adding IndexedDB for offline data storage
5. **Analytics** — Add app analytics (the web app already has analytics built in)
