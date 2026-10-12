import type { CapacitorConfig } from "@capacitor/cli";

const isProduction = process.env.NODE_ENV === "production";
const serverUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? (isProduction ? undefined : "http://localhost:3000");

if (isProduction && serverUrl && !serverUrl.startsWith("https://")) {
  throw new Error("NEXT_PUBLIC_SITE_URL must use HTTPS in production Capacitor builds");
}

const config: CapacitorConfig = {
  appId: "in.durza.app",
  appName: "Durza",
  webDir: "out",
  server: {
    ...(serverUrl ? { url: serverUrl } : {}),
    cleartext: !isProduction,
  },
  android: {
    allowMixedContent: !isProduction,
  },
  ios: {
    contentInset: "always",
  },
};

export default config;
