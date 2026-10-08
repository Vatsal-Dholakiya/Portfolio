import { developer, films, hero } from '../../data/content'
import { FilmSection } from '../film/FilmSection'
import { gsap } from '../../lib/gsap'

const glass = 'absolute rounded-xl border bg-carbon/85 shadow-[0_30px_80px_rgba(0,0,0,0.6)] backdrop-blur-[2px]'

function Bar({ title, tone = 'emerald' }: { title: string; tone?: 'emerald' | 'ember' }) {
  return (
    <div className="flex items-center gap-1.5 border-b border-line px-3 py-2">
      <span className={`h-1.5 w-1.5 rounded-full ${tone === 'ember' ? 'bg-ember' : 'bg-emerald'}`} />
      <span className={`font-mono text-[0.6rem] md:text-[0.7rem] ${tone === 'ember' ? 'text-ember' : 'text-ash'}`}>{title}</span>
    </div>
  )
}

/** Code-built stand-in for "The Developer" film: holographic screens around a desk; the camera pushes into the main monitor. */
function Scene() {
  const p = developer.panels
  return (
    <div aria-hidden="true" className="absolute inset-0 [perspective:1400px]">
      <div className="studio-light absolute inset-0 opacity-70" />
      <div data-dev-scene className="absolute inset-0 [transform-style:preserve-3d]">
        {/* Main monitor */}
        <div data-dev-main className={`${glass} top-[14%] left-1/2 w-[86vw] -translate-x-1/2 border-emerald/25 md:top-[20%] md:w-[44vw]`}>
          <Bar title={p.editor} />
          <div className="p-3 font-mono text-[0.6rem] leading-[1.8] md:p-5 md:text-[0.8rem]">
            {hero.pieces.code.map((line, i) => (
              <div key={i} className="whitespace-pre text-mist">
                <span className="mr-3 text-ash/60">{i + 1}</span>
                <span className={i === 1 ? 'text-bone' : i === 2 ? 'text-ember' : 'text-emerald'}>{line}</span>
              </div>
            ))}
            <div className="mt-2 text-emerald">
              <span className="blink">▍</span>
            </div>
          </div>
        </div>

        {/* Android Studio with a layout preview */}
        <div data-dev-panel="-1" className={`${glass} top-[12%] left-[4%] hidden w-[26vw] border-line md:block`}>
          <Bar title={p.studio} />
          <div className="flex gap-3 p-3">
            <div className="flex-1 space-y-1.5">
              {[70, 50, 85, 40, 60].map((w, i) => (
                <span key={i} className="block h-1.5 rounded-full bg-line-strong" style={{ width: `${w}%` }} />
              ))}
            </div>
            <div className="aspect-[9/17] w-[34%] rounded-md border border-line-strong bg-void p-1.5">
              <span className="block h-2 rounded-sm bg-emerald/70" />
              <span className="mt-1.5 block h-6 rounded-sm bg-graphite" />
              <span className="mt-1 block h-6 rounded-sm bg-graphite" />
            </div>
          </div>
        </div>

        {/* Terminal */}
        <div data-dev-panel="-1" className={`${glass} bottom-[16%] left-[6%] hidden w-[28vw] border-line md:block`}>
          <Bar title={p.terminal} />
          <div className="space-y-1 p-3 font-mono text-[0.58rem] text-mist md:text-[0.7rem]">
            <p>$ ./gradlew assembleRelease</p>
            <p className="text-ash">&gt; Task :app:compileReleaseJava</p>
            <p className="text-emerald">BUILD SUCCESSFUL in 14s</p>
          </div>
        </div>

        {/* API flow */}
        <div data-dev-panel="1" className={`${glass} top-[10%] right-[4%] hidden w-[24vw] border-line md:block`}>
          <Bar title={p.api} />
          <div className="space-y-1 p-3 font-mono text-[0.68rem] text-mist">
            <p>
              <span className="text-emerald">200</span> OK · 84 ms
            </p>
            <p className="text-ash">{'{ "orders": [ … ] }'}</p>
          </div>
        </div>

        {/* What he is learning (ember) */}
        <div
          data-dev-panel="1"
          className={`${glass} top-[46%] right-[5%] w-[44vw] border-ember/30 md:top-auto md:right-[6%] md:bottom-[20%] md:w-[22vw]`}
        >
          <Bar title={p.ai[0] ?? ''} tone="ember" />
          <svg viewBox="0 0 160 70" className="w-full p-3">
            {[15, 35, 55].map((y1) =>
              [10, 30, 50, 60].map((y2) => (
                <line key={`${y1}-${y2}`} x1="20" y1={y1} x2="80" y2={y2} stroke="rgba(255,138,61,0.35)" strokeWidth="0.6" />
              )),
            )}
            {[10, 30, 50, 60].map((y1) => (
              <line key={`b${y1}`} x1="80" y1={y1} x2="140" y2="35" stroke="rgba(255,138,61,0.35)" strokeWidth="0.6" />
            ))}
            {[15, 35, 55].map((y) => (
              <circle key={`a${y}`} cx="20" cy={y} r="3.5" fill="#FF8A3D" />
            ))}
            {[10, 30, 50, 60].map((y) => (
              <circle key={`c${y}`} cx="80" cy={y} r="3.5" fill="#131816" stroke="#FF8A3D" />
            ))}
            <circle cx="140" cy="35" r="4" fill="#FF8A3D" />
          </svg>
        </div>
        <div data-dev-panel="1" className={`${glass} right-[30%] bottom-[6%] hidden w-[18vw] border-ember/30 md:block`}>
          <Bar title={p.ai[1] ?? ''} tone="ember" />
          <svg viewBox="0 0 120 50" className="w-full p-3">
            <path d="M4 6 C 20 30, 40 38, 60 41 S 100 45, 116 46" fill="none" stroke="#FF8A3D" strokeWidth="1.5" />
            <path d="M4 46 H116" stroke="rgba(237,238,233,0.15)" />
          </svg>
        </div>
      </div>
    </div>
  )
}

export function DeveloperFilm() {
  return (
    <FilmSection
      id="developer"
      labelledBy="developer-title"
      film={films.developer}
      scene={<Scene />}
      length={2}
      animate={(tl, root, desktop) => {
        const scene = root.querySelector('[data-dev-scene]')
        const panels = root.querySelectorAll<HTMLElement>('[data-dev-panel]')
        // Slow orbit, panels drifting in depth, then a push into the main monitor
        gsap.set(scene, { transformOrigin: '50% 36%' })
        tl.fromTo(scene, { rotateY: desktop ? -16 : -8, rotateX: 6, scale: 0.92 }, { rotateY: 4, rotateX: 0, scale: 1, duration: 0.55 }, 0)
        panels.forEach((el, i) => {
          const side = Number(el.dataset.devPanel)
          tl.fromTo(
            el,
            { z: -200 - i * 60, x: side * 40, opacity: 0 },
            { z: 0, x: 0, opacity: 1, duration: 0.35, ease: 'power2.out' },
            0.05 + i * 0.05,
          )
          tl.to(el, { x: side * (desktop ? 520 : 260), opacity: 0, duration: 0.3, ease: 'power2.in' }, 0.62)
        })
        tl.to(scene, { scale: desktop ? 2.1 : 1.6, rotateY: 0, duration: 0.4, ease: 'power2.in' }, 0.6)
      }}
    >
      <div data-film-copy className="container-x absolute inset-x-0 bottom-0 pb-[clamp(2rem,8vh,5rem)]">
        <p className="label mb-5 flex items-center gap-3">
          <span className="text-emerald">04</span>
          <span className="h-px w-8 bg-line-strong" aria-hidden="true" />
          {developer.label}
        </p>
        <h2 id="developer-title" className="max-w-[14ch] text-[clamp(2.75rem,8vw,7.5rem)] leading-[0.92] font-extrabold tracking-[-0.05em]">
          {developer.title}
        </h2>
        <p className="mt-5 max-w-xl text-lg text-mist">{developer.text}</p>
      </div>
    </FilmSection>
  )
}
