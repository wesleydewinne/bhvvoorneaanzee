import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import sitemap from "vite-plugin-sitemap";
import { SITEMAP_PATHS } from "./src/routes/sitemapPaths.js";

export default defineConfig({
  plugins: [
    react(),
    sitemap({
      hostname: "https://bhvvoorneaanzee.nl",
      dynamicRoutes: SITEMAP_PATHS,

      robots: false
    })
  ],

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },

  build: {
    outDir: "dist",
    sourcemap: false,
  },
});
