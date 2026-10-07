import { useCallback, useEffect, useId, useRef, useState } from 'react'
import { m } from 'framer-motion'
import { skills, type Skill } from '../data/content'
import { chip, stagger } from '../lib/animations'
import { hasFinePointer } from '../lib/helpers'
import { IconTile } from './Icon'
import { SectionTitle } from './SectionTitle'
import { RevealItem, Stagger } from './ui/Reveal'
import { TiltCard } from './ui/TiltCard'
import { Tooltip } from './ui/Tooltip'

function SkillChip({ skill, open, onOpen, onClose }: { skill: Skill; open: boolean; onOpen: () => void; onClose: () => void }) {
  const ref = useRef<HTMLButtonElement>(null)
  const tipId = `tip-${useId().replace(/[^a-zA-Z0-9]/g, '')}`
  const hasTip = !!skill.full || skill.usedAt.length > 0

  if (!hasTip) {
    return (
      <m.li variants={chip} data-reveal className="chip">
        {skill.name}
      </m.li>
    )
  }

  return (
    <m.li variants={chip} data-reveal>
      <button
        ref={ref}
        type="button"
        className={`chip cursor-help transition-colors duration-200 hover:border-primary-soft ${open ? 'border-primary-soft bg-surface' : ''}`}
        aria-describedby={open ? tipId : undefined}
        aria-expanded={open}
        onMouseEnter={() => hasFinePointer() && onOpen()}
        onMouseLeave={() => hasFinePointer() && onClose()}
        // Keyboard focus opens it; a mouse uses hover; a tap toggles it
        onFocus={(e) => e.currentTarget.matches(':focus-visible') && onOpen()}
        onBlur={onClose}
        onClick={(e) => {
          if (hasFinePointer() && e.detail > 0) return
          if (open) onClose()
          else onOpen()
        }}
      >
        {skill.name}
      </button>
      {open && (
        <Tooltip id={tipId} anchor={ref}>
          <span className="block font-semibold">{skill.name}</span>
          {skill.full && <span className="mt-0.5 block text-muted">{skill.full}</span>}
          {skill.usedAt.length > 0 && (
            <span className="mt-1.5 block text-body">
              <span className="font-mono text-[0.75rem] text-accent">{skills.usedAtLabel}: </span>
              {skill.usedAt.join(' · ')}
            </span>
          )}
        </Tooltip>
      )}
    </m.li>
  )
}

export function Skills() {
  const [openKey, setOpenKey] = useState<string | null>(null)
  const close = useCallback(() => setOpenKey(null), [])

  // Close on Escape, on a tap outside any chip, and on scroll (the tooltip is anchored to the viewport)
  useEffect(() => {
    if (!openKey) return
    const startY = window.scrollY
    const onScroll = () => Math.abs(window.scrollY - startY) > 40 && close()
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && close()
    const onDown = (e: PointerEvent) => {
      if (!(e.target as Element).closest('#skills button.chip')) close()
    }
    document.addEventListener('keydown', onKey)
    document.addEventListener('pointerdown', onDown)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('pointerdown', onDown)
      window.removeEventListener('scroll', onScroll)
    }
  }, [openKey, close])

  return (
    <section id="skills" aria-labelledby="skills-title" tabIndex={-1} className="section-y relative outline-none">
      <div className="container-x">
        <SectionTitle index={2} title={skills.title} id="skills-title" />
        <p className="-mt-6 mb-10 text-sm text-muted md:-mt-10">{skills.hint}</p>
        <Stagger as="ul" className="grid gap-4 md:grid-cols-2 lg:gap-5" stagger={0.08} amount={0.05}>
          {skills.categories.map((cat) => (
            <RevealItem as="li" key={cat.title} className="min-w-0">
              <TiltCard innerClassName="p-6 md:p-7">
                <div className="flex min-w-0 items-center gap-4">
                  <IconTile name={cat.icon} />
                  <div className="min-w-0">
                    <h3 className="text-lg leading-snug font-semibold text-text">{cat.title}</h3>
                    {cat.label && (
                      <span className="mt-1 inline-block rounded-full border border-border px-2.5 py-0.5 font-mono text-[0.6875rem] text-muted">
                        {cat.label}
                      </span>
                    )}
                  </div>
                </div>
                <m.ul
                  className="mt-6 flex flex-wrap gap-2"
                  aria-label={`${cat.title} skills`}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.4 }}
                  variants={stagger(0.06, 0.1)}
                >
                  {cat.skills.map((skill) => {
                    const key = `${cat.title}:${skill.name}`
                    return (
                      <SkillChip
                        key={key}
                        skill={skill}
                        open={openKey === key}
                        onOpen={() => setOpenKey(key)}
                        onClose={() => setOpenKey((k) => (k === key ? null : k))}
                      />
                    )
                  })}
                </m.ul>
              </TiltCard>
            </RevealItem>
          ))}
        </Stagger>
      </div>
    </section>
  )
}
