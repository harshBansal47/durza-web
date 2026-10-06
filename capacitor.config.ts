import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.savevero.app",
  appName: "Savevero",
  webDir: "out",
  server: {
    url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
    cleartext: true,
  },
  android: {
    allowMixedContent: true,
  },
  ios: {
    contentInset: "always",
  },
};

export default config;
