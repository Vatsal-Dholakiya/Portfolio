import { useId, useRef } from 'react'
import type { useSkillTips } from '../../hooks/useSkillTips'
import { m } from 'framer-motion'
import type { Skill } from '../../data/content'
import { chip, stagger } from '../../lib/animations'
import { hasFinePointer } from '../../lib/helpers'
import { Tooltip } from './Tooltip'

function SkillChip({
  skill,
  usedAtLabel,
  open,
  onOpen,
  onClose,
  tone,
}: {
  skill: Skill
  usedAtLabel: string
  open: boolean
  onOpen: () => void
  onClose: () => void
  tone: 'emerald' | 'ember'
}) {
  const ref = useRef<HTMLButtonElement>(null)
  const tipId = `tip-${useId().replace(/[^a-zA-Z0-9]/g, '')}`
  const hasTip = !!skill.full || skill.usedAt.length > 0
  const hover = tone === 'ember' ? 'hover:border-ember' : 'hover:border-emerald'

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
        data-skill-chip
        data-cursor="Info"
        className={`chip cursor-help transition-colors duration-200 ${hover} ${open ? (tone === 'ember' ? 'border-ember' : 'border-emerald') : ''}`}
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
          {skill.full && <span className="mt-0.5 block text-ash">{skill.full}</span>}
          {skill.usedAt.length > 0 && (
            <span className="mt-1.5 block text-mist">
              <span className={`font-mono text-[0.75rem] ${tone === 'ember' ? 'text-ember' : 'text-emerald'}`}>{usedAtLabel}: </span>
              {skill.usedAt.join(' · ')}
            </span>
          )}
        </Tooltip>
      )}
    </m.li>
  )
}

/** A list of skill chips; each opens a tooltip saying where the skill was used. */
export function SkillChips({
  group,
  skills,
  label,
  usedAtLabel,
  tips,
  tone = 'emerald',
  className = '',
}: {
  group: string
  skills: Skill[]
  label: string
  usedAtLabel: string
  tips: ReturnType<typeof useSkillTips>
  tone?: 'emerald' | 'ember'
  className?: string
}) {
  return (
    <m.ul
      className={`flex flex-wrap gap-2 ${className}`}
      aria-label={label}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
      variants={stagger(0.05, 0.1)}
    >
      {skills.map((skill) => {
        const key = `${group}:${skill.name}`
        return (
          <SkillChip
            key={key}
            skill={skill}
            usedAtLabel={usedAtLabel}
            tone={tone}
            open={tips.openKey === key}
            onOpen={() => tips.setOpenKey(key)}
            onClose={tips.close}
          />
        )
      })}
    </m.ul>
  )
}
