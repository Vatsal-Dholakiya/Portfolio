import { lazy, Suspense, useEffect } from 'react'
import { LazyMotion, domAnimation } from 'framer-motion'
import { nav } from './data/content'
import { initSmoothScroll, onAnchorClick, onPopState, scrollToId } from './lib/lenis'
import { CursorGlow } from './components/CursorGlow'
import { Hero } from './components/Hero'
import { Loader } from './components/Loader'
import { Navbar } from './components/Navbar'
import { NotFound } from './components/NotFound'
import { ScrollProgress } from './components/ScrollProgress'

// Below-the-fold sections are code-split
const named = <K extends string>(load: () => Promise<Record<K, React.ComponentType>>, key: K) =>
  lazy(() => load().then((mod) => ({ default: mod[key] })))
const About = named(() => import('./components/About'), 'About')
const Skills = named(() => import('./components/Skills'), 'Skills')
const Experience = named(() => import('./components/Experience'), 'Experience')
const Projects = named(() => import('./components/Projects'), 'Projects')
const Certifications = named(() => import('./components/Certifications'), 'Certifications')
const Education = named(() => import('./components/Education'), 'Education')
const Contact = named(() => import('./components/Contact'), 'Contact')
const Footer = named(() => import('./components/Footer'), 'Footer')

declare global {
  interface Window {
    __vdReady?: boolean
  }
}

/** Opens a direct link such as /#projects once the code-split sections are on the page. */
function ScrollToHashOnLoad() {
  useEffect(() => {
    const id = decodeURIComponent(location.hash.slice(1))
    if (id && document.getElementById(id)) scrollToId(id, { updateHash: false, focus: false, instant: true })
  }, [])
  return null
}

export default function App({ notFound = false }: { notFound?: boolean }) {
  useEffect(() => {
    window.__vdReady = true
    document.documentElement.classList.remove('nf')
    if (notFound) return
    const destroy = initSmoothScroll()
    document.addEventListener('click', onAnchorClick)
    window.addEventListener('popstate', onPopState)
    return () => {
      document.removeEventListener('click', onAnchorClick)
      window.removeEventListener('popstate', onPopState)
      destroy()
    }
  }, [notFound])

  if (notFound) {
    return (
      <LazyMotion features={domAnimation} strict>
        <NotFound />
      </LazyMotion>
    )
  }

  return (
    <LazyMotion features={domAnimation} strict>
      <a
        href="#main"
        className="sr-only z-[110] rounded-lg bg-surface-2 px-4 py-2 font-medium text-text focus:not-sr-only focus:fixed focus:top-4 focus:left-4"
      >
        {nav.skipLink}
      </a>
      <Loader />
      <ScrollProgress />
      <CursorGlow />
      <Navbar />
      <main id="main" tabIndex={-1} className="relative z-[2] outline-none">
        <Hero />
        <Suspense fallback={null}>
          <About />
          <Skills />
          <Experience />
          <Projects />
          <Certifications />
          <Education />
          <Contact />
          <ScrollToHashOnLoad />
        </Suspense>
      </main>
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </LazyMotion>
  )
}
