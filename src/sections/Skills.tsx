import type { ComponentType } from 'react'
import { m } from 'framer-motion'
import { Cloud, CodeXml, Database, Palette, Server, ShieldCheck, Smartphone, type LucideProps } from 'lucide-react'
import { content, type SkillIcon } from '../data/content'
import { EASE } from '../lib/env'
import { SectionHeading } from '../components/ui/SectionHeading'
import { RevealItem, Stagger } from '../components/ui/Reveal'
import { TiltCard } from '../components/ui/TiltCard'

const icons: Record<SkillIcon, ComponentType<LucideProps>> = {
  code: CodeXml,
  mobile: Smartphone,
  cloud: Cloud,
  database: Database,
  server: Server,
  shield: ShieldCheck,
  palette: Palette,
}

// Bento layout on large screens (6 columns): 2+2+2 / 2+4 / 3+3. On tablets the last card spans both columns.
const spans = [
  'lg:col-span-2',
  'lg:col-span-2',
  'lg:col-span-2',
  'lg:col-span-2',
  'lg:col-span-4',
  'lg:col-span-3',
  'md:col-span-2 lg:col-span-3',
]

export function Skills() {
  return (
    <section id="skills" aria-labelledby="skills-title" tabIndex={-1} className="relative py-20 outline-none md:py-28">
      <div className="container-x">
        <SectionHeading index="02" title="Skills" id="skills-title" />
        <Stagger as="ul" className="grid gap-4 md:grid-cols-2 lg:grid-cols-6 lg:gap-5" stagger={0.08} amount={0.1}>
          {content.skills.map((group, i) => {
            const Icon = icons[group.icon]
            return (
              <RevealItem as="li" key={group.title} className={spans[i] ?? 'lg:col-span-2'}>
                <TiltCard innerClassName="p-6 md:p-7">
                  <div className="flex items-center gap-4">
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-border bg-surface-2 text-primary-soft">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <h3 className="text-lg font-semibold text-text">{group.title}</h3>
                  </div>
                  <m.ul
                    className="mt-6 flex flex-wrap gap-2"
                    aria-label={`${group.title} skills`}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.5 }}
                    variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06, delayChildren: 0.15 } } }}
                  >
                    {group.items.map((item) => (
                      <m.li
                        key={item}
                        data-reveal
                        className="chip"
                        variants={{
                          hidden: { opacity: 0, y: 10, scale: 0.96 },
                          show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: EASE } },
                        }}
                      >
                        {item}
                      </m.li>
                    ))}
                  </m.ul>
                </TiltCard>
              </RevealItem>
            )
          })}
        </Stagger>
      </div>
    </section>
  )
}
