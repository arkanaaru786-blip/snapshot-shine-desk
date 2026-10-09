// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import { copyFileSync, writeFileSync, existsSync } from "node:fs";
import { join } from "node:path";

export default defineConfig({
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
    // Generate a static index.html shell so the preview works without a running server.
    spa: { enabled: true },
  },
  nitro: {
    output: {
      dir: "dist",
      serverDir: "dist/server",
      publicDir: "dist",
    },
  },
  vite: {
    plugins: [
      {
        name: "spa-shell-index-html",
        apply: "build" as const,
        enforce: "post" as const,
        buildApp: {
          order: "post" as const,
          async handler() {
            const distDir = join(process.cwd(), "dist");
            const shell = join(distDir, "_shell.html");
            const indexHtml = join(distDir, "index.html");
            if (existsSync(shell)) {
              copyFileSync(shell, indexHtml);
            }
            writeFileSync(join(distDir, "_redirects"), "/*  /index.html  200\n");
          },
        },
      },
    ],
  },
});
