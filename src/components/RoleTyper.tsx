import { useEffect, useState } from 'react'
import { useReducedMotion } from '../hooks/useReducedMotion'

const TYPE_MS = 65
const DELETE_MS = 35
const HOLD_MS = 1900

/** Types and deletes each role in turn. Starts after `start`; static list with reduced motion. */
export function RoleTyper({ roles, start }: { roles: string[]; start: boolean }) {
  const [text, setText] = useState(roles[0] ?? '')
  const reduced = useReducedMotion()

  useEffect(() => {
    if (!start || reduced || roles.length < 2) return
    let index = 0
    let current = roles[0] ?? ''
    let deleting = true
    let timer = 0
    const tick = () => {
      if (deleting) {
        current = current.slice(0, -1)
        setText(current)
        if (current.length === 0) {
          deleting = false
          index = (index + 1) % roles.length
        }
        timer = window.setTimeout(tick, DELETE_MS)
        return
      }
      const next = roles[index] ?? ''
      current = next.slice(0, current.length + 1)
      setText(current)
      if (current === next) {
        deleting = true
        timer = window.setTimeout(tick, HOLD_MS)
      } else {
        timer = window.setTimeout(tick, TYPE_MS)
      }
    }
    timer = window.setTimeout(tick, HOLD_MS)
    return () => window.clearTimeout(timer)
  }, [roles, start, reduced])

  return (
    <>
      {/* Screen readers get the full list once, not every keystroke */}
      <span className="sr-only">{roles.join(', ')}</span>
      <span aria-hidden="true" className="motion-reduce:hidden">
        <span className="text-text">{text}</span>
        <span className="caret bg-gradient ml-1 inline-block h-[0.9em] w-[3px] translate-y-[0.12em] rounded-full" />
      </span>
      <span aria-hidden="true" className="hidden text-text motion-reduce:inline">
        {roles.join(' · ')}
      </span>
    </>
  )
}
