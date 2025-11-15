import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";
import svgr from "vite-plugin-svgr";
export default defineConfig({
  server: {
    host: true,
  },
  plugins: [
    react(),
    svgr(),
    VitePWA({
      registerType: "autoUpdate",
      injectRegister: "auto",
      devOptions: {
        enabled: false, // disable SW in development
      },
      workbox: {
        skipWaiting: true, // activate new SW as soon as it's finished installing without waiting for all tabs to close; Without it: User opens your app -> you deploy update -> user keeps tab open for hours -> they're stuck on old version until they close ALL tabs
        clientsClaim: true, // take control of uncontrolled clients as soon as the SW becomes active; Without it: old pages stay controlled by old SW, new pages use new SW => mixed versions running
        globPatterns: [
          "**/*.{js,css,html,ico,png,jpg,jpeg,svg,woff2}",
          "assets/**/*",
        ],
        cleanupOutdatedCaches: true, // automatically deletes old cache versions when a new SW activates. Only current version's cache exists => cleaner, less storage used.
        dontCacheBustURLsMatching: /\.[0-9a-f]{8}\./, // avoid cache busting for files with hash in their name
      },
      srcDir: "src",
      filename: "firebase-messaging-sw.js",
      strategies: "injectManifest", // use our custom SW which imports Workbox and Firebase scripts but still inject the manifest into it
      manifest: {
        name: "BRAIN",
        short_name: "BRAIN",
        start_url: "/",
        display: "standalone",
        background_color: "#660000",
        theme_color: "#660000",
        icons: [
          {
            src: "icons/manifest-icon-192.maskable.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "icons/manifest-icon-192.maskable.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "maskable",
          },
          {
            src: "icons/manifest-icon-512.maskable.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "icons/manifest-icon-512.maskable.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
        ],
      },
    }),
  ],
});
