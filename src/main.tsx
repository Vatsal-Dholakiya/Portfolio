import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import 'lenis/dist/lenis.css'
import './styles/globals.css'
import App from './App'
import { isHomePath } from './lib/route'

const container = document.getElementById('root')!
// Unknown paths (e.g. Vercel's SPA fallback) show the 404 view; relative builds ('./') are always home
const notFound = __BASE__.startsWith('/') && !isHomePath(location.pathname)
const app = (
  <StrictMode>
    <App notFound={notFound} />
  </StrictMode>
)

// The production HTML is the pre-rendered home page: hydrate it. Render from scratch in dev or for the 404 view.
if (container.firstElementChild && !notFound) hydrateRoot(container, app)
else {
  container.textContent = ''
  createRoot(container).render(app)
}
