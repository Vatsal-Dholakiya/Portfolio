import { films, nextChapter } from '../../data/content'
import { FilmSection } from '../film/FilmSection'
import { RevealItem, Stagger } from '../ui/Reveal'
import { Accented } from '../ui/SectionHead'

const DEPTHS = [0, -500, -1000]

/** Code-built stand-in for "The Next Chapter": a corridor of screens — work behind (emerald), AI ahead (ember). */
function Scene() {
  const wall = (side: 'left' | 'right') =>
    DEPTHS.map((z, i) => {
      const behind = i === 0
      const label = behind
        ? nextChapter.behind[side === 'left' ? 0 : 1]
        : (nextChapter.ahead[(i - 1) * 2 + (side === 'left' ? 0 : 1)] ?? nextChapter.ahead[0])
      return (
        <div
          key={`${side}-${z}`}
          className={`absolute top-1/2 h-[34vh] w-[42vh] -translate-y-1/2 rounded-xl border p-4 ${
            behind ? 'border-emerald/40 bg-emerald/[0.06]' : 'border-ember/40 bg-ember/[0.07]'
          } ${side === 'left' ? 'left-1/2 -ml-[min(48vw,36rem)]' : 'right-1/2 -mr-[min(48vw,36rem)]'}`}
          style={{ transform: `translateZ(${z}px) rotateY(${side === 'left' ? 62 : -62}deg)` }}
        >
          <p className={`font-mono text-[0.7rem] ${behind ? 'text-emerald' : 'text-ember'}`}>{label}</p>
          {behind ? (
            <div className="mt-4 space-y-2">
              {[80, 55, 70, 40].map((w, j) => (
                <span key={j} className="block h-2 rounded-full bg-emerald/25" style={{ width: `${w}%` }} />
              ))}
            </div>
          ) : (
            <svg viewBox="0 0 100 60" className="mt-3 w-full">
              {[10, 30, 50].map((y) =>
                [15, 45].map((y2) => (
                  <line key={`${y}${y2}`} x1="15" y1={y} x2="85" y2={y2} stroke="rgba(255,138,61,0.4)" strokeWidth="0.6" />
                )),
              )}
              {[10, 30, 50].map((y) => (
                <circle key={y} cx="15" cy={y} r="3" fill="#FF8A3D" />
              ))}
              {[15, 45].map((y) => (
                <circle key={y} cx="85" cy={y} r="3" fill="#FF8A3D" />
              ))}
            </svg>
          )}
        </div>
      )
    })

  return (
    <div aria-hidden="true" className="absolute inset-0 overflow-hidden [perspective:900px]">
      {/* Warm light at the end of the corridor */}
      <div
        data-ahead
        className="absolute top-1/2 left-1/2 h-[70vmin] w-[70vmin] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,138,61,0.28),transparent_65%)] opacity-50"
      />
      {/* Floor reflection line */}
      <div className="absolute inset-x-0 top-[68%] h-px bg-gradient-to-r from-transparent via-ember/30 to-transparent" />
      <div data-corridor className="absolute inset-0 [transform-style:preserve-3d]">
        {wall('left')}
        {wall('right')}
      </div>
    </div>
  )
}

export function NextChapter() {
  return (
    <FilmSection
      id="next"
      labelledBy="next-title"
      film={films.nextChapter}
      scene={<Scene />}
      length={1.5}
      mobileLength={1.2}
      animate={(tl, root) => {
        tl.fromTo(root.querySelector('[data-corridor]'), { z: -200 }, { z: 900, duration: 1, ease: 'power1.inOut' }, 0).fromTo(
          root.querySelector('[data-ahead]'),
          { opacity: 0.35, scale: 0.7 },
          { opacity: 1, scale: 1.3, duration: 1 },
          0,
        )
      }}
      after={
        nextChapter.log.length > 0 && (
          <div className="container-x pt-16 pb-[var(--section-py)]">
            <div className="grid gap-8 lg:grid-cols-[minmax(0,14rem)_minmax(0,1fr)] lg:gap-16">
              <h3 className="label flex items-center gap-2 pt-1 text-mist">
                <span className="blink text-ember">●</span>
                {nextChapter.logTitle}
              </h3>
              <Stagger as="ol" className="min-w-0 border-t border-line" stagger={0.08} amount={0.2}>
                {nextChapter.log.map((entry) => (
                  <RevealItem
                    as="li"
                    key={entry.topic}
                    className="grid gap-x-8 gap-y-1 border-b border-line py-5 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_auto] md:items-center"
                  >
                    <span className="font-semibold text-bone">{entry.topic}</span>
                    <span className="text-mist">{entry.note}</span>
                    <span
                      className={`mt-2 w-fit rounded-full border px-2.5 py-0.5 font-mono text-[0.7rem] tracking-[0.08em] uppercase md:mt-0 ${
                        entry.status === 'In progress' ? 'border-ember/30 text-ember' : 'border-line-strong text-ash'
                      }`}
                    >
                      {entry.status}
                    </span>
                  </RevealItem>
                ))}
              </Stagger>
            </div>
          </div>
        )
      }
    >
      <div data-film-copy className="container-x absolute inset-x-0 bottom-0 pb-[clamp(2rem,8vh,5rem)]">
        <p className="label mb-5 flex items-center gap-3">
          <span className="text-ember">07</span>
          <span className="h-px w-8 bg-line-strong" aria-hidden="true" />
          {nextChapter.label}
        </p>
        <h2 id="next-title" className="max-w-[16ch] text-[clamp(2rem,4.5vw,3.75rem)] leading-[1] font-extrabold tracking-[-0.04em]">
          <Accented text={nextChapter.title} words={['AI.']} className="text-ember" />
        </h2>
        <p className="mt-5 max-w-xl text-lg text-mist">{nextChapter.text}</p>
      </div>
    </FilmSection>
  )
}
