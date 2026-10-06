import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import '@fontsource-variable/bricolage-grotesque/wght.css'
import '@fontsource-variable/source-serif-4/wght.css'
import './styles/index.css'
import App from './App'

const container = document.getElementById('root')!
const app = (
  <StrictMode>
    <App />
  </StrictMode>
)

// Production HTML is pre-rendered (readable without JavaScript), so hydrate it; dev renders from scratch.
if (container.firstElementChild) hydrateRoot(container, app)
else createRoot(container).render(app)
