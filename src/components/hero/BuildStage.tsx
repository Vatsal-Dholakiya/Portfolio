import type { ReactNode } from 'react'
import { BrainCircuit, Check } from 'lucide-react'
import { hero } from '../../data/content'

/** Arrow cursor drawn on each piece while it is being "dragged" onto the screen. */
function DragCursor() {
  return (
    <svg
      data-drag-cursor
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="absolute -right-3 -bottom-4 h-7 w-7 drop-shadow-[0_4px_8px_rgba(0,0,0,0.6)]"
    >
      <path d="M4 2.5 19.5 12l-7 1.6-3.4 6.9z" fill="#EDEEE9" stroke="#050607" strokeWidth="1.4" strokeLinejoin="round" />
    </svg>
  )
}

/** One interface piece. Position classes place it inside the device screen (phone first, laptop from md). */
function Piece({
  id,
  from,
  className,
  children,
}: {
  id: string
  from: 'left' | 'right' | 'top' | 'bottom'
  className: string
  children: ReactNode
}) {
  return (
    <div data-piece={id} data-from={from} className={`absolute ${className}`}>
      <div data-piece-body className="relative h-full w-full">
        {/* Snap flash when the piece lands */}
        <span data-piece-flash aria-hidden="true" className="absolute -inset-1.5 rounded-xl border border-emerald opacity-0" />
        {children}
        <DragCursor />
      </div>
    </div>
  )
}

function MiniPhone({ title, rows, accent }: { title: string; rows: number; accent?: boolean }) {
  return (
    <div className="flex h-full w-full flex-col overflow-hidden rounded-[0.9rem] border border-line-strong bg-carbon p-[6%] shadow-[0_18px_40px_rgba(0,0,0,0.5)]">
      <div className="mb-[8%] flex items-center justify-between">
        <span className="font-display text-[0.6rem] font-semibold text-bone md:text-[0.7rem]">{title}</span>
        <span className="h-1.5 w-1.5 rounded-full bg-emerald" />
      </div>
      {Array.from({ length: rows }, (_, i) => (
        <div key={i} className="mb-[6%] flex items-center gap-[6%] rounded-md bg-graphite p-[5%]">
          <span className={`h-3 w-3 shrink-0 rounded-full ${accent && i === 0 ? 'bg-ember' : 'bg-emerald/70'}`} />
          <span className="h-1.5 flex-1 rounded-full bg-line-strong" />
        </div>
      ))}
      <div className="mt-auto rounded-md bg-emerald py-[5%] text-center font-display text-[0.55rem] font-semibold text-on-accent md:text-[0.65rem]">
        {hero.pieces.button}
      </div>
    </div>
  )
}

/**
 * The scene the visitor's scroll assembles: a device (laptop from md, phone below) and interface pieces.
 * Purely decorative — the real content is the final hero underneath — so it is hidden from assistive tech.
 */
export function BuildStage({ onSkip }: { onSkip: () => void }) {
  const p = hero.pieces
  return (
    <div data-build-stage className="absolute inset-0 overflow-hidden">
      <div aria-hidden="true" className="studio-light absolute inset-0 opacity-60" />

      {/* Status label + scroll hint */}
      <div aria-hidden="true" className="absolute inset-x-0 top-[calc(var(--nav-h)+1.25rem)] z-10 text-center">
        <p data-build-label className="label text-mist">
          {hero.buildLabel}
          <span className="blink ml-1 text-emerald">_</span>
        </p>
      </div>
      <div className="absolute inset-x-0 bottom-6 z-20 flex items-center justify-center gap-4">
        <p data-build-hint aria-hidden="true" className="label flex items-center gap-2 text-mist">
          <span className="inline-block h-4 w-px bg-emerald" />
          {hero.scrollHint}
        </p>
        <button
          type="button"
          onClick={onSkip}
          className="label rounded-full border border-line-strong px-3 py-1.5 text-mist hover:border-emerald hover:text-bone"
        >
          {hero.skipIntro}
        </button>
      </div>

      {/* Device */}
      <div aria-hidden="true" className="absolute inset-0 grid place-items-center [perspective:1600px]">
        <div data-device className="relative will-change-transform">
          <div
            data-screen
            className="relative aspect-[9/19] w-[min(58vw,280px)] overflow-hidden rounded-[2.2rem] border-[6px] border-graphite bg-void shadow-[0_0_0_1px_rgba(237,238,233,0.08),0_40px_120px_rgba(46,230,166,0.12)] md:aspect-[16/10] md:w-[min(74vw,1000px)] md:rounded-[1.1rem] md:border-[10px]"
          >
            {/* Screen glow + grid */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_30%,rgba(46,230,166,0.10),transparent_60%)]" />
            <div className="absolute inset-0 bg-[linear-gradient(rgba(237,238,233,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(237,238,233,0.035)_1px,transparent_1px)] bg-[size:28px_28px]" />

            {/* Pieces: phone layout first, laptop layout from md */}
            <Piece id="code" from="left" className="top-[5%] left-[6%] h-[24%] w-[88%] md:top-[7%] md:left-[4%] md:h-[40%] md:w-[44%]">
              <div className="h-full w-full overflow-hidden rounded-xl border border-line-strong bg-carbon p-[4%] font-mono text-[0.55rem] leading-[1.7] shadow-[0_18px_40px_rgba(0,0,0,0.5)] md:text-[0.8rem]">
                <div className="mb-2 flex gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-ember/80" />
                  <span className="h-2 w-2 rounded-full bg-ash/60" />
                  <span className="h-2 w-2 rounded-full bg-emerald/80" />
                </div>
                {p.code.map((line, i) => (
                  <div key={i} className="whitespace-pre text-mist">
                    <span className="mr-3 text-ash/60">{i + 1}</span>
                    <span className={i === 0 || i === p.code.length - 1 ? 'text-emerald' : i === 1 ? 'text-bone' : 'text-ember'}>
                      {line}
                    </span>
                  </div>
                ))}
              </div>
            </Piece>

            <Piece id="app1" from="top" className="top-[33%] left-[6%] h-[38%] w-[42%] md:top-[6%] md:left-[52%] md:h-[58%] md:w-[19%]">
              <MiniPhone title={p.appTitle} rows={3} accent />
            </Piece>

            <Piece id="app2" from="right" className="hidden md:block md:top-[12%] md:left-[75%] md:h-[58%] md:w-[19%]">
              <MiniPhone title="Customers" rows={4} />
            </Piece>

            <Piece id="chat" from="right" className="top-[33%] left-[52%] h-[38%] w-[42%] md:top-[52%] md:left-[4%] md:h-[38%] md:w-[30%]">
              <div className="flex h-full w-full flex-col gap-[6%] rounded-xl border border-ember/30 bg-carbon p-[6%] shadow-[0_18px_40px_rgba(0,0,0,0.5)]">
                <div className="flex items-center gap-2">
                  <BrainCircuit className="h-3.5 w-3.5 text-ember md:h-4 md:w-4" />
                  <span className="font-mono text-[0.5rem] tracking-wider text-ember uppercase md:text-[0.65rem]">{p.chat.title}</span>
                </div>
                <div className="ml-auto max-w-[85%] rounded-lg bg-graphite px-2 py-1.5 text-[0.5rem] text-bone md:text-[0.72rem]">
                  {p.chat.question}
                </div>
                <div className="max-w-[85%] rounded-lg border border-ember/20 bg-ember/10 px-2 py-1.5 text-[0.5rem] text-bone md:text-[0.72rem]">
                  {p.chat.answer}
                </div>
              </div>
            </Piece>

            <Piece
              id="button"
              from="bottom"
              className="top-[75%] left-[6%] h-[8%] w-[42%] md:top-[54%] md:left-[37%] md:h-[11%] md:w-[13%]"
            >
              <div className="grid h-full w-full place-items-center rounded-full bg-emerald font-display text-[0.65rem] font-semibold text-on-accent shadow-[0_10px_30px_rgba(46,230,166,0.35)] md:text-[0.85rem]">
                {p.button}
              </div>
            </Piece>

            <Piece
              id="stat"
              from="bottom"
              className="top-[75%] left-[52%] h-[18%] w-[42%] md:top-[70%] md:left-[37%] md:h-[20%] md:w-[13%]"
            >
              <div className="flex h-full w-full flex-col justify-center rounded-xl border border-line-strong bg-carbon p-[8%] shadow-[0_18px_40px_rgba(0,0,0,0.5)]">
                <span className="font-display text-[1.1rem] leading-none font-extrabold text-emerald md:text-[1.4rem]">{p.stat.value}</span>
                <span className="mt-1 text-[0.5rem] leading-tight text-mist md:text-[0.62rem]">{p.stat.label}</span>
              </div>
            </Piece>

            <Piece id="skills" from="bottom" className="hidden md:block md:top-[74%] md:left-[53%] md:h-[17%] md:w-[41%]">
              <div className="flex h-full w-full flex-wrap content-center gap-2 rounded-xl border border-line-strong bg-carbon p-[3%] shadow-[0_18px_40px_rgba(0,0,0,0.5)]">
                {p.skills.map((s) => (
                  <span key={s} className="rounded-full border border-line bg-graphite px-2.5 py-1 text-[0.7rem] font-medium text-bone">
                    {s}
                  </span>
                ))}
              </div>
            </Piece>

            {/* Build status */}
            <div
              data-build-done
              className="absolute right-[4%] bottom-[2%] flex items-center gap-1.5 font-mono text-[0.55rem] text-emerald opacity-0 md:bottom-[3%] md:text-[0.75rem]"
            >
              <Check className="h-3 w-3 md:h-3.5 md:w-3.5" />
              {hero.buildDone}
            </div>
          </div>

          {/* Laptop base (hidden on phones) */}
          <div
            data-base
            className="-mx-[6%] hidden h-[clamp(10px,1.4vw,18px)] w-[112%] rounded-b-[1.2rem] bg-gradient-to-b from-graphite to-carbon shadow-[0_30px_60px_rgba(0,0,0,0.6)] md:block"
          >
            <div className="mx-auto h-1.5 w-[16%] rounded-b-lg bg-void/60" />
          </div>
        </div>
      </div>
    </div>
  )
}
