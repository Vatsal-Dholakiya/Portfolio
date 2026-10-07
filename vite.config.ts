import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// BASE_PATH is set by the GitHub Pages workflow (e.g. "/Portfolio/"). Vercel, Netlify and local use "/".
const base = process.env.BASE_PATH ?? '/'

export default defineConfig({
  base,
  // Same value in the browser build and the pre-render build
  define: { __BASE__: JSON.stringify(base) },
  plugins: [react(), tailwindcss()],
  build: { chunkSizeWarningLimit: 600 },
})
