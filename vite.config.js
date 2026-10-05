import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// Static SPA build for Cloudflare Pages: pure `dist` output, no SSR.
// `base: './'` keeps asset paths relative so the site also works when opened
// directly from a folder or served from a sub-path on Cloudflare Pages.
export default defineConfig({
  base: './',
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    target: 'es2019',
    sourcemap: false,
  },
  server: {
    port: 5173,
    host: true,
  },
})
