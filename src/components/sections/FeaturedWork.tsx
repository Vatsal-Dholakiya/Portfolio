import { Check, Lock } from 'lucide-react'
import { featured } from '../../data/content'
import { GitHubRepos } from '../GitHubRepos'
import { StackOverflowCard } from '../StackOverflowCard'
import { Counter } from '../ui/Counter'
import { Reveal, RevealItem, Stagger } from '../ui/Reveal'
import { SectionHead } from '../ui/SectionHead'

/** WhatsApp Business Automation Suite case study, then live GitHub repositories and Stack Overflow stats. */
export function FeaturedWork() {
  return (
    <section id="work" aria-labelledby="work-title" tabIndex={-1} className="section-y relative outline-none">
      <div className="container-x">
        <SectionHead index={6} label={featured.label} title={featured.title} id="work-title">
          <p className="mt-6 inline-flex items-center gap-2 rounded-full border border-line-strong px-3.5 py-1.5 font-mono text-xs tracking-[0.08em] text-mist uppercase">
            <Lock className="h-3.5 w-3.5 text-emerald" aria-hidden="true" />
            {featured.badge}
          </p>
        </SectionHead>

        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-16">
          <Reveal className="min-w-0">
            <p className="text-xl leading-relaxed text-mist md:text-2xl">{featured.summary}</p>
            <div className="mt-10 border-t border-line pt-8">
              <p className="font-display text-[clamp(4rem,10vw,8rem)] leading-[0.8] font-extrabold tracking-[-0.06em] text-emerald">
                <Counter value={featured.impact.value} prefix={featured.impact.prefix} suffix={featured.impact.suffix} />
              </p>
              <p className="mt-4 text-lg text-bone">{featured.impact.label}</p>
            </div>
          </Reveal>

          <Stagger as="ol" className="min-w-0 space-y-4" stagger={0.12} amount={0.15}>
            {featured.steps.map((step, i) => (
              <RevealItem as="li" key={step.title} className="card grid grid-cols-[auto_minmax(0,1fr)] gap-5 p-6 sm:p-7">
                <span className="font-mono text-sm text-emerald">{String(i + 1).padStart(2, '0')}</span>
                <div>
                  <h3 className="text-xl font-bold">{step.title}</h3>
                  <p className="mt-2 text-mist">{step.text}</p>
                </div>
              </RevealItem>
            ))}
          </Stagger>
        </div>

        <div className="mt-16 grid gap-10 lg:grid-cols-[minmax(0,14rem)_minmax(0,1fr)] lg:gap-16">
          <h3 className="label pt-1 text-mist">{featured.featuresLabel}</h3>
          <Stagger as="ul" className="grid gap-x-10 md:grid-cols-2" stagger={0.06} amount={0.1}>
            {featured.features.map((f) => (
              <RevealItem as="li" key={f} className="flex items-start gap-3 border-b border-line py-4 text-mist">
                <Check className="mt-1 h-4 w-4 shrink-0 text-emerald" aria-hidden="true" />
                {f}
              </RevealItem>
            ))}
          </Stagger>
        </div>

        <ul className="mt-10 flex flex-wrap gap-2 lg:ml-[calc(14rem+4rem)]" aria-label={`${featured.title} technologies`}>
          {featured.tags.map((t) => (
            <li key={t} className="chip">
              {t}
            </li>
          ))}
        </ul>

        <div className="mt-[var(--section-py)] grid gap-10 lg:grid-cols-[minmax(0,1.9fr)_minmax(0,1fr)] lg:gap-8">
          <GitHubRepos />
          <div className="min-w-0 lg:pt-[5.5rem]">
            <StackOverflowCard />
          </div>
        </div>
      </div>
    </section>
  )
}
