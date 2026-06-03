import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "app.nexus.personal",
  appName: "Nexus",
  webDir: "dist",
  server: {
    androidScheme: "https"
  }
};

export default config;
