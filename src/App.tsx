import { lazy, Suspense, useEffect } from 'react'
import { LazyMotion, domAnimation } from 'framer-motion'
import { nav } from './data/content'
import { ScrollTrigger } from './lib/gsap'
import { initSmoothScroll, onAnchorClick, onPopState, scrollToId } from './lib/lenis'
import { Cursor } from './components/extras/Cursor'
import { Grain } from './components/extras/Grain'
import { Hero } from './components/Hero'
import { Navbar } from './components/Navbar'
import { NotFound } from './components/NotFound'
import { StatsStrip } from './components/sections/StatsStrip'

// Below-the-fold sections are code-split
const named = <K extends string>(load: () => Promise<Record<K, React.ComponentType>>, key: K) =>
  lazy(() => load().then((mod) => ({ default: mod[key] })))
const Mission = named(() => import('./components/sections/Mission'), 'Mission')
const Pillars = named(() => import('./components/sections/Pillars'), 'Pillars')
const Story = named(() => import('./components/sections/Story'), 'Story')
const DeveloperFilm = named(() => import('./components/sections/DeveloperFilm'), 'DeveloperFilm')
const PhoneShowcase = named(() => import('./components/sections/PhoneShowcase'), 'PhoneShowcase')
const WhatIBuild = named(() => import('./components/sections/WhatIBuild'), 'WhatIBuild')
const FeaturedWork = named(() => import('./components/sections/FeaturedWork'), 'FeaturedWork')
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
    ScrollTrigger.refresh()
    const id = decodeURIComponent(location.hash.slice(1))
    if (id && document.getElementById(id)) scrollToId(id, { updateHash: false, focus: false, instant: true })
    // Fonts change text sizes; re-measure when they are ready
    void document.fonts.ready.then(() => ScrollTrigger.refresh())
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
        <StatsStrip />
        <Suspense fallback={null}>
          <Mission />
          <Pillars />
          <Story />
          <DeveloperFilm />
          <PhoneShowcase />
          <WhatIBuild />
          <FeaturedWork />
          <NextChapter />
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
