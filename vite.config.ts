import { defineConfig } from "vite";

// GitHub Pages org site: https://openarttools.github.io/
const base = process.env.VITE_BASE ?? "/";

/** Production-only: keeps Vite HMR working in dev. */
const PRODUCTION_CSP = [
  "default-src 'self'",
  "script-src 'self'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data:",
  "font-src 'self'",
  "connect-src 'self'",
  "base-uri 'none'",
  "form-action 'none'",
  "frame-src 'self' blob:",
  "object-src 'none'",
  "worker-src 'none'",
].join("; ");

export default defineConfig({
  base,
  server: {
    port: 5173,
  },
  build: {
    target: "es2022",
    outDir: "dist",
  },
  plugins: [
    {
      name: "openarttools-production-csp",
      transformIndexHtml: {
        order: "pre",
        handler(html, ctx) {
          if (ctx.server) return html;
          const meta = `    <meta http-equiv="Content-Security-Policy" content="${PRODUCTION_CSP}" />\n`;
          return html.replace("<title>", `${meta}    <title>`);
        },
      },
    },
  ],
});
