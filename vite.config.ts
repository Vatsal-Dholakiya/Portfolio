import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// BASE_PATH is set by the GitHub Pages workflow (e.g. "/Portfolio/"). Vercel and local use "/".
const base = process.env.BASE_PATH ?? '/'

export default defineConfig({
  base,
  // Same value in the browser and pre-render builds (Vite resets BASE_URL to "/" for SSR when base is relative)
  define: { __BASE__: JSON.stringify(base) },
  plugins: [react(), tailwindcss()],
  // React + GSAP + Lenis form one ~150 kB (gzip) bundle; the page HTML is pre-rendered so this does not delay first paint
  build: { chunkSizeWarningLimit: 500 * 1.2 },
})
