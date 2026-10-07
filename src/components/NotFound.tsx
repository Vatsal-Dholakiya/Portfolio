import { ArrowLeft } from 'lucide-react'
import { notFound } from '../data/content'
import { Monogram } from './ui/Monogram'

/** Shown for unknown paths (Vercel's SPA fallback serves index.html; this replaces the home page). */
export function NotFound() {
  return (
    <main id="main" className="relative grid min-h-[100svh] place-items-center overflow-hidden px-5 text-center">
      <div aria-hidden="true" className="dot-grid absolute inset-0" />
      <div className="relative">
        <Monogram className="mx-auto h-16 w-16" />
        <p className="mt-8 font-mono text-sm text-accent">404</p>
        <h1 className="mt-3 text-[clamp(2rem,6vw,3.5rem)] leading-tight font-bold text-text">{notFound.title}</h1>
        <p className="mt-4 text-body">{notFound.text}</p>
        <a href={__BASE__} className="btn btn-primary mt-10">
          <ArrowLeft className="h-5 w-5" aria-hidden="true" />
          {notFound.button}
        </a>
      </div>
    </main>
  )
}
