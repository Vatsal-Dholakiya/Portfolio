import { useEffect } from 'react'
import { LazyMotion } from 'motion/react'
import { gsap, ScrollTrigger, useGSAP } from './lib/gsap'
import { fontsReady, prefersReducedMotion } from './lib/motion'
import { initSmoothScroll } from './lib/smoothScroll'
import { Cursor } from './components/Cursor'
import { Footer } from './components/Footer'
import { Navbar } from './components/Navbar'
import { Preloader } from './components/Preloader'
import { ScrollProgress } from './components/ScrollProgress'
import { About } from './sections/About'
import { Certificates } from './sections/Certificates'
import { Contact } from './sections/Contact'
import { Education } from './sections/Education'
import { Experience } from './sections/Experience'
import { Hero } from './sections/Hero'
import { Skills } from './sections/Skills'
import { StackOverflow } from './sections/StackOverflow'
import { Work } from './sections/Work'

const loadMotionFeatures = () => import('./lib/motionFeatures').then((m) => m.default)

declare global {
  interface Window {
    __vdReady?: boolean
  }
}

export default function App() {
  useEffect(() => {
    window.__vdReady = true
    const stop = initSmoothScroll()
    fontsReady().then(() => ScrollTrigger.refresh())
    // Open the section in the URL hash (e.g. shared link to #contact)
    if (location.hash) {
      const el = document.getElementById(location.hash.slice(1))
      if (el) requestAnimationFrame(() => el.scrollIntoView())
    }
    return stop
  }, [])

  // Generic fade-up for content blocks marked with data-reveal
  useGSAP(() => {
    if (prefersReducedMotion()) return
    gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((el) => {
      gsap.from(el, {
        y: 28,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 90%', once: true },
      })
    })
  })

  return (
    <LazyMotion features={loadMotionFeatures} strict>
      <a
        href="#main"
        className="sr-only z-[110] rounded-full bg-accent px-4 py-2 font-display font-semibold text-accent-ink focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Skip to content
      </a>
      <Preloader />
      <ScrollProgress />
      <Navbar />
      <main id="main" tabIndex={-1} className="outline-none">
        <Hero />
        <About />
        <Work />
        <StackOverflow />
        <Experience />
        <Skills />
        <Certificates />
        <Education />
        <Contact />
      </main>
      <Footer />
      <Cursor />
    </LazyMotion>
  )
}
