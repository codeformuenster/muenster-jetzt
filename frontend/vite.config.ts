/// <reference types="vitest/config" />
import { defineConfig, loadEnv, Plugin } from "vite";
import react from "@vitejs/plugin-react";

// Content Security Policy, formerly injected by csp-html-webpack-plugin.
// Vite emits no inline scripts, so 'self' is enough for script-src.
const cspPolicy = (backendBasePath: string): string =>
  Object.entries({
    "default-src": ["'none'"],
    "base-uri": ["'self'"],
    "object-src": ["'none'"],
    "script-src": ["'self'"],
    "style-src": ["'self'"],
    "img-src": [
      "'self'",
      "https://muenster-update.de",
      "https://www.bleker-it.de",
      "https://www.muensterhack.de",
      "https://gobeta.de",
    ],
    "font-src": ["'self'", "data:"],
    "frame-src": [
      "https://bike-frontend.azurewebsites.net",
      "https://db-muenster.veomo.com/",
    ],
    "connect-src": ["'self'", backendBasePath],
    "media-src": ["https://muenster-update.de"],
  })
    .map(([directive, sources]) => `${directive} ${sources.join(" ")}`)
    .join("; ");

const csp = (backendBasePath: string): Plugin => ({
  name: "csp-meta-tag",
  apply: "build",
  transformIndexHtml: () => [
    {
      tag: "meta",
      attrs: {
        "http-equiv": "Content-Security-Policy",
        content: cspPolicy(backendBasePath),
      },
      injectTo: "head",
    },
  ],
});

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "REACT_APP_");
  const backendBasePath =
    env.REACT_APP_BACKEND_BASE_PATH || "http://localhost:8000";

  return {
    // Keep the CRA env variable names used by CI and docs
    envPrefix: "REACT_APP_",
    plugins: [react(), csp(backendBasePath)],
    // Some dependencies (restful-react) still expect the Node `global`
    define: { global: "globalThis" },
    build: {
      outDir: "build",
      // CSP has no data: in img-src, so never inline assets
      assetsInlineLimit: 0,
    },
    css: {
      preprocessorOptions: {
        scss: {
          // Bootstrap 4 and the existing styles still use @import & co.
          silenceDeprecations: [
            "import",
            "global-builtin",
            "color-functions",
            "slash-div",
            "abs-percent",
            "legacy-js-api",
          ],
          quietDeps: true,
        },
      },
    },
    server: { port: 3000 },
    test: {
      environment: "jsdom",
      globals: true,
      setupFiles: "./src/setupTests.ts",
    },
  };
});
