import { defineConfig } from "vite";

// GitHub Pages project site: https://openarttools.github.io/contract-studio/
const base = process.env.VITE_BASE ?? "/";

export default defineConfig({
  base,
  clearScreen: false,
  server: {
    port: 5173,
    strictPort: true,
  },
  build: {
    target: "es2022",
    outDir: "dist",
  },
});
