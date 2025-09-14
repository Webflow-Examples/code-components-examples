// @ts-check
import { defineConfig } from "astro/config";
import cloudflare from "@astrojs/cloudflare"; // Import the Cloudflare adapter
import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  output: "server",
  base: "/map",
  build: {
    assets: "static",
  },
  adapter: cloudflare({
    platformProxy: {
      persist: true,
    },
  }),
  integrations: [react()],
  // Optimize the build configuration for the Edge runtime
  vite: {
    resolve: {
      // Use react-dom/server.edge instead of react-dom/server.browser for React 19.
      // Without this, MessageChannel from node:worker_threads needs to be polyfilled.
      alias: import.meta.env.PROD
        ? {
            "react-dom/server": "react-dom/server.edge",
          }
        : undefined,
    },
  },
});
