import { copyFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";
import { defineConfig, type Plugin } from "vite";

// GitHub Pages org site: https://openarttools.github.io/
const base = process.env.VITE_BASE ?? "/";

/** Copy index.html → 404.html so deep links work on GitHub Pages. */
function spaGithubPagesFallback(): Plugin {
  return {
    name: "spa-github-pages-fallback",
    closeBundle() {
      const dist = resolve(__dirname, "dist");
      const index = resolve(dist, "index.html");
      const fallback = resolve(dist, "404.html");
      if (existsSync(index)) copyFileSync(index, fallback);
    },
  };
}

export default defineConfig({
  base,
  plugins: [spaGithubPagesFallback()],
  server: {
    port: 5173,
  },
  build: {
    target: "es2022",
    outDir: "dist",
  },
});
