import { lazy, Suspense, useEffect } from 'react'
import { LazyMotion, domAnimation } from 'framer-motion'
import { nav } from './data/content'
import { ScrollTrigger } from './lib/gsap'
import { initSmoothScroll, onAnchorClick, onPopState, scrollToId } from './lib/lenis'
import { afterPinsMeasured, markSectionsReady } from './lib/ready'
import { onCvClick } from './lib/cv'
import { Cursor } from './components/extras/Cursor'
import { Grain } from './components/extras/Grain'
import { Hero } from './components/Hero'
import { Navbar } from './components/Navbar'
import { NotFound } from './components/NotFound'
import { StatsStrip } from './components/sections/StatsStrip'

// Below-the-fold sections are code-split and load one after another when the browser is idle, so each one
// hydrates in its own short task instead of all at once
let chain: Promise<unknown> = Promise.resolve()
const idle = () =>
  new Promise<void>((resolve) => {
    if (typeof window === 'undefined') resolve()
    else if (typeof window.requestIdleCallback === 'function') window.requestIdleCallback(() => resolve(), { timeout: 400 })
    else window.setTimeout(resolve, 30)
  })
const named = <K extends string>(load: () => Promise<Record<K, React.ComponentType>>, key: K) =>
  lazy(() => {
    const next = chain.then(idle).then(load)
    chain = next
    return next.then((mod) => ({ default: mod[key] }))
  })
const BuildSequence = named(() => import('./components/sections/BuildSequence'), 'BuildSequence')
const About = named(() => import('./components/sections/About'), 'About')
const Skills = named(() => import('./components/sections/Skills'), 'Skills')
const Story = named(() => import('./components/sections/Story'), 'Story')
const Process = named(() => import('./components/sections/Process'), 'Process')
const Projects = named(() => import('./components/sections/Projects'), 'Projects')
const NextChapter = named(() => import('./components/sections/NextChapter'), 'NextChapter')
const Contact = named(() => import('./components/Contact'), 'Contact')
const Footer = named(() => import('./components/Footer'), 'Footer')
const Terminal = named(() => import('./components/extras/Terminal'), 'Terminal')

declare global {
  interface Window {
    __vdReady?: boolean
  }
}

/** Once the code-split sections are on the page: measure pinned scenes again, then open a direct link such as /#work. */
function AfterSections() {
  useEffect(() => {
    markSectionsReady()
    // A shared link such as /#projects opens at that section; the hash is then removed so a reload starts at the top
    const id = decodeURIComponent(location.hash.slice(1))
    if (id)
      afterPinsMeasured(() => {
        if (document.getElementById(id)) scrollToId(id, { focus: false, instant: true })
        history.replaceState(null, '', location.pathname + location.search)
      })
    // Fonts change text sizes; re-measure when they are ready
    void document.fonts.ready.then(() => ScrollTrigger.refresh())
  }, [])
  return null
}

export default function App({ notFound = false }: { notFound?: boolean }) {
  useEffect(() => {
    window.__vdReady = true
    document.documentElement.classList.remove('nf')
    // Always open at the top: the browser must not restore an old scroll position
    ScrollTrigger.clearScrollMemory('manual')
    if (!location.hash) window.scrollTo(0, 0)
    if (notFound) return
    const destroy = initSmoothScroll()
    document.addEventListener('click', onCvClick, true)
    document.addEventListener('click', onAnchorClick)
    window.addEventListener('popstate', onPopState)
    return () => {
      document.removeEventListener('click', onCvClick, true)
      document.removeEventListener('click', onAnchorClick)
      window.removeEventListener('popstate', onPopState)
      destroy()
    }
  }, [notFound])

  if (notFound) {
    return (
      <LazyMotion features={domAnimation} strict>
        <NotFound />
        <Grain />
      </LazyMotion>
    )
  }

  return (
    <LazyMotion features={domAnimation} strict>
      <a
        href="#main"
        className="sr-only z-[110] rounded-lg bg-graphite px-4 py-2 font-medium text-bone focus:not-sr-only focus:fixed focus:top-4 focus:left-4"
      >
        {nav.skipLink}
      </a>
      <Navbar />
      <main id="main" tabIndex={-1} className="relative outline-none">
        <Hero />
        <Suspense fallback={null}>
          <BuildSequence />
        </Suspense>
        <StatsStrip />
        {/* One boundary per section: React hydrates them separately and yields to the browser in between */}
        {[About, Skills, Story, Process, Projects, NextChapter].map((Section, i) => (
          <Suspense key={i} fallback={null}>
            <Section />
          </Suspense>
        ))}
        <Suspense fallback={null}>
          <Contact />
          <AfterSections />
        </Suspense>
      </main>
      <Suspense fallback={null}>
        <Footer />
        <Terminal />
      </Suspense>
      <Grain />
      <Cursor />
    </LazyMotion>
  )
}
