import { useRef, useState } from 'react'
import { Maximize2 } from 'lucide-react'
import { asset, projects, type CaseStudy } from '../../data/content'
import { gsap, useGSAP } from '../../lib/gsap'
import { Modal } from '../ui/Modal'

type Shot = NonNullable<CaseStudy['images']>[number]

/** A screenshot that opens full size in a dialog. */
function ShotButton({
  shot,
  onOpen,
  className = '',
  imgClassName = '',
}: {
  shot: Shot
  onOpen: (s: Shot) => void
  className?: string
  imgClassName?: string
}) {
  return (
    <button
      type="button"
      onClick={() => onOpen(shot)}
      aria-haspopup="dialog"
      data-cursor="Open"
      className={`group relative block w-full rounded-[inherit] text-left ${className}`}
    >
      <img
        src={asset(shot.src)}
        alt={shot.alt}
        width={shot.width}
        height={shot.height}
        loading="lazy"
        decoding="async"
        className={`block h-auto w-full ${imgClassName}`}
      />
      <span className="absolute top-3 right-3 grid h-8 w-8 place-items-center rounded-full bg-void/80 text-mist opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
        <Maximize2 className="h-3.5 w-3.5" aria-hidden="true" />
        <span className="sr-only">{projects.enlarge}</span>
      </span>
    </button>
  )
}

function Lightbox({ shot, open, onClose }: { shot: Shot | null; open: boolean; onClose: () => void }) {
  return (
    <Modal open={open} onClose={onClose} labelledBy="shot-title" closeLabel={projects.close}>
      {shot && (
        <div className="p-4 pt-16 sm:p-6 sm:pt-16">
          <h2 id="shot-title" className="sr-only">
            {shot.alt}
          </h2>
          <img
            src={asset(shot.src)}
            alt={shot.alt}
            width={shot.width}
            height={shot.height}
            className="mx-auto h-auto max-h-[78svh] w-auto max-w-full rounded-lg object-contain"
          />
          <p className="mt-4 text-sm text-mist">{shot.alt}</p>
        </div>
      )}
    </Modal>
  )
}

function useLightbox() {
  const [shot, setShot] = useState<Shot | null>(null)
  const [open, setOpen] = useState(false)
  return {
    shot,
    open,
    show: (s: Shot) => {
      setShot(s)
      setOpen(true)
    },
    close: () => setOpen(false),
  }
}

/**
 * Two phone screenshots. As the case study scrolls into view the phones fan out from a stack into a tilted pair;
 * afterwards they float gently. The resting layout is plain CSS, so without motion they simply sit side by side.
 */
export function PhoneShots({ images }: { images: Shot[] }) {
  const root = useRef<HTMLDivElement>(null)
  const box = useLightbox()
  const [front, back] = images

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const scrollTrigger = { trigger: root.current, start: 'top 90%', end: 'center 50%', scrub: 0.8 }
        gsap.fromTo(
          '[data-back]',
          { xPercent: 45, yPercent: 8, rotation: 6, scale: 0.92 },
          { xPercent: 0, yPercent: 0, rotation: 0, scale: 1, ease: 'none', scrollTrigger },
        )
        gsap.fromTo(
          '[data-front]',
          { xPercent: -45, yPercent: 14, rotation: -5 },
          { xPercent: 0, yPercent: 0, rotation: 0, ease: 'none', scrollTrigger },
        )
      })
    },
    { scope: root },
  )

  return (
    <div ref={root} className="relative mx-auto aspect-[1/1.08] w-full max-w-[34rem]">
      <div
        aria-hidden="true"
        className="absolute inset-[8%] rounded-full bg-[radial-gradient(circle,rgba(46,230,166,0.18),transparent_65%)]"
      />
      {back && (
        <div data-back className="absolute top-[2%] left-[4%] w-[47%] -rotate-6">
          <div className="float-slow rounded-[2rem] drop-shadow-[0_30px_50px_rgba(0,0,0,0.55)]">
            <ShotButton shot={back} onOpen={box.show} />
          </div>
        </div>
      )}
      {front && (
        <div data-front className="absolute top-[9%] right-[4%] w-[47%] rotate-[5deg]">
          <div className="float-slow-delayed rounded-[2rem] drop-shadow-[0_40px_60px_rgba(0,0,0,0.6)]">
            <ShotButton shot={front} onOpen={box.show} />
          </div>
        </div>
      )}
      <Lightbox shot={box.shot} open={box.open} onClose={box.close} />
    </div>
  )
}

function WindowFrame({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="overflow-hidden rounded-xl border border-line-strong bg-carbon shadow-[0_40px_90px_rgba(0,0,0,0.6)]">
      <div className="flex items-center gap-1.5 border-b border-line bg-graphite px-3 py-2" aria-hidden="true">
        <span className="h-2 w-2 rounded-full bg-ember/80" />
        <span className="h-2 w-2 rounded-full bg-ash/60" />
        <span className="h-2 w-2 rounded-full bg-emerald/80" />
        <span className="ml-2 truncate font-mono text-[0.68rem] text-ash">{title}</span>
      </div>
      {children}
    </div>
  )
}

/**
 * Two desktop screenshots. The main window tilts upright as it scrolls into view and the second window slides in
 * over its lower corner. The resting layout is plain CSS.
 */
export function DesktopShots({ images, title }: { images: Shot[]; title: string }) {
  const root = useRef<HTMLDivElement>(null)
  const box = useLightbox()
  const [main, second] = images

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const scrollTrigger = { trigger: root.current, start: 'top 90%', end: 'center 50%', scrub: 0.8 }
        gsap.fromTo(
          '[data-main]',
          { rotateX: 16, yPercent: 10, scale: 0.92 },
          { rotateX: 0, yPercent: 0, scale: 1, ease: 'none', scrollTrigger },
        )
        gsap.fromTo(
          '[data-second]',
          { xPercent: 35, yPercent: 30, opacity: 0 },
          { xPercent: 0, yPercent: 0, opacity: 1, ease: 'none', scrollTrigger },
        )
      })
    },
    { scope: root },
  )

  return (
    <div ref={root} className="relative w-full pb-[22%] [perspective:1400px]">
      <div
        aria-hidden="true"
        className="absolute -inset-6 rounded-[3rem] bg-[radial-gradient(ellipse,rgba(46,230,166,0.12),transparent_65%)]"
      />
      {main && (
        <div data-main className="relative w-[92%] origin-bottom">
          <WindowFrame title={title}>
            <ShotButton shot={main} onOpen={box.show} />
          </WindowFrame>
        </div>
      )}
      {second && (
        <div data-second className="absolute right-0 bottom-0 w-[62%]">
          <div className="float-slow">
            <WindowFrame title="Number Filter">
              <ShotButton shot={second} onOpen={box.show} />
            </WindowFrame>
          </div>
        </div>
      )}
      <Lightbox shot={box.shot} open={box.open} onClose={box.close} />
    </div>
  )
}
