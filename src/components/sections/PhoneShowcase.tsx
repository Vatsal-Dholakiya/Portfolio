import { films, hero, whatIBuild } from '../../data/content'
import { FilmSection } from '../film/FilmSection'

/** Code-built stand-in for the "Project Showcase" film: a phone lifts, code streams in, the app snaps together and launches. */
function Scene() {
  const app = whatIBuild.phoneApp
  return (
    <div aria-hidden="true" className="absolute inset-0 grid place-items-center [perspective:1200px]">
      {/* Emerald strip light over the desk */}
      <div className="absolute top-[18%] left-1/2 h-px w-[50vw] -translate-x-1/2 bg-emerald/70 shadow-[0_0_40px_8px_rgba(46,230,166,0.35)]" />
      <div className="absolute top-[18%] left-1/2 h-[60%] w-[60vw] -translate-x-1/2 bg-[radial-gradient(ellipse_50%_60%_at_50%_0%,rgba(46,230,166,0.12),transparent_70%)]" />
      <div
        data-glow
        className="absolute h-[60vmin] w-[60vmin] rounded-full bg-[radial-gradient(circle,rgba(46,230,166,0.22),transparent_65%)] opacity-60"
      />

      <div data-phone className="relative -mt-[18vh] w-[min(54vw,250px)] [transform-style:preserve-3d] md:mt-0 md:w-[min(22vw,290px)]">
        <div className="relative aspect-[9/19] overflow-hidden rounded-[2.4rem] border-[7px] border-graphite bg-void shadow-[0_0_0_1px_rgba(237,238,233,0.1),0_50px_120px_rgba(0,0,0,0.7)]">
          {/* Streaming code (shown only while the app assembles) */}
          <div
            data-code
            className="absolute inset-0 space-y-1.5 p-4 pt-8 font-mono text-[0.55rem] leading-relaxed text-emerald/80 opacity-0 md:text-[0.62rem]"
          >
            {[
              ...hero.pieces.code,
              'setContentView(R.layout.orders);',
              'adapter.submitList(orders);',
              'button.setOnClickListener(send);',
            ].map((line, i) => (
              <p key={i} data-code-line className="whitespace-pre">
                {line}
              </p>
            ))}
          </div>

          {/* The assembled Android app */}
          <div className="absolute inset-0 flex flex-col p-3 pt-7">
            <div data-ui className="flex items-center justify-between rounded-xl bg-graphite px-3 py-2.5">
              <span className="font-display text-sm font-semibold text-bone">{app.title}</span>
              <span className="h-5 w-5 rounded-full bg-emerald/80" />
            </div>
            <div className="relative mt-3 flex-1 overflow-hidden">
              <div data-list className="space-y-2">
                {[...app.items, ...app.items].map((item, i) => (
                  <div key={i} data-ui className="flex items-center gap-2.5 rounded-xl border border-line bg-carbon p-2.5">
                    <span className={`h-7 w-7 shrink-0 rounded-lg ${i % 3 === 1 ? 'bg-ember/80' : 'bg-emerald/70'}`} />
                    <span className="min-w-0">
                      <span className="block truncate text-[0.68rem] font-medium text-bone">{item}</span>
                      <span className="mt-1 block h-1 w-12 rounded-full bg-line-strong" />
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div
              data-ui
              className="mt-3 rounded-full bg-emerald py-2.5 text-center font-display text-[0.72rem] font-semibold text-on-accent"
            >
              {app.button}
            </div>
          </div>
          <div data-launch className="absolute inset-0 bg-emerald/25 opacity-0" />
        </div>
      </div>
    </div>
  )
}

export function PhoneShowcase() {
  return (
    <FilmSection
      id="showcase"
      labelledBy="showcase-title"
      film={films.showcase}
      scene={<Scene />}
      length={2}
      animate={(tl, root) => {
        const q = gsapScope(root)
        tl.fromTo(
          q('[data-phone]'),
          { rotateX: 72, rotateZ: -14, yPercent: 30, scale: 0.8 },
          { rotateX: 0, rotateZ: 0, yPercent: 0, scale: 1, duration: 0.3, ease: 'power2.out' },
          0,
        )
          .fromTo(q('[data-glow]'), { opacity: 0.2, scale: 0.6 }, { opacity: 0.6, scale: 1, duration: 0.3 }, 0)
          .to(q('[data-code]'), { opacity: 1, duration: 0.05 }, 0.25)
          .from(q('[data-code-line]'), { xPercent: -40, opacity: 0, stagger: 0.02, duration: 0.08 }, 0.27)
          .to(q('[data-code]'), { opacity: 0, duration: 0.06 }, 0.48)
          .fromTo(
            q('[data-ui]'),
            { opacity: 0, y: 30, scale: 0.85 },
            { opacity: 1, y: 0, scale: 1, stagger: 0.025, duration: 0.12, ease: 'back.out(2)' },
            0.5,
          )
          .fromTo(q('[data-launch]'), { opacity: 0 }, { opacity: 1, duration: 0.04 }, 0.78)
          .to(q('[data-launch]'), { opacity: 0, duration: 0.08 }, 0.82)
          .to(q('[data-list]'), { yPercent: -40, duration: 0.18, ease: 'power1.inOut' }, 0.82)
      }}
    >
      <div
        data-film-copy
        className="container-x absolute inset-x-0 bottom-0 pb-[clamp(2rem,8vh,5rem)] md:top-0 md:bottom-auto md:pt-[calc(var(--nav-h)+3rem)]"
      >
        <p className="label mb-4 text-emerald">{whatIBuild.label}</p>
        <h2 id="showcase-title" className="max-w-[10ch] text-[clamp(2.5rem,6.5vw,6rem)] leading-[0.92] font-extrabold tracking-[-0.05em]">
          {whatIBuild.showcaseCaption}
        </h2>
      </div>
    </FilmSection>
  )
}

const gsapScope = (root: HTMLElement) => (sel: string) => root.querySelectorAll(sel)
