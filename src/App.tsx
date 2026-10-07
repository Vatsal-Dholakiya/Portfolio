import { useEffect } from 'react'
import { LazyMotion, domAnimation } from 'framer-motion'
import { initSmoothScroll, onAnchorClick } from './lib/scroll'
import { CursorGlow } from './components/CursorGlow'
import { Footer } from './components/Footer'
import { Intro } from './components/Intro'
import { Navbar } from './components/Navbar'
import { ScrollProgress } from './components/ScrollProgress'
import { About } from './sections/About'
import { Certifications } from './sections/Certifications'
import { Contact } from './sections/Contact'
import { Education } from './sections/Education'
import { Experience } from './sections/Experience'
import { Hero } from './sections/Hero'
import { Projects } from './sections/Projects'
import { Skills } from './sections/Skills'

declare global {
  interface Window {
    __vdReady?: boolean
  }
}

export default function App() {
  useEffect(() => {
    window.__vdReady = true
    const destroy = initSmoothScroll()
    document.addEventListener('click', onAnchorClick)
    return () => {
      document.removeEventListener('click', onAnchorClick)
      destroy()
    }
  }, [])

  return (
    <LazyMotion features={domAnimation} strict>
      <a
        href="#main"
        className="sr-only z-[110] rounded-lg bg-surface-2 px-4 py-2 font-medium text-text focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Skip to content
      </a>
      <Intro />
      <ScrollProgress />
      <CursorGlow />
      <Navbar />
      <main id="main" tabIndex={-1} className="relative z-[2] outline-none">
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Certifications />
        <Education />
        <Contact />
      </main>
      <Footer />
    </LazyMotion>
  )
}
