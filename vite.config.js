import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import sitemap from "vite-plugin-sitemap";

import { publicRoutes } from "./src/routes/publicRoutes.jsx";

// Alleen echte URL's (geen dynamische :id routes)
const dynamicRoutes = publicRoutes
    .map(route => route.path)
    .filter(routePath => !routePath.includes(":"));

export default defineConfig({
  plugins: [
    react(),
    sitemap({
      hostname: "https://bhvvoorneaanzee.nl",
      dynamicRoutes
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
