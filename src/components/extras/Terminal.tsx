import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, m } from 'framer-motion'
import { X } from 'lucide-react'
import { asset, person, terminal } from '../../data/content'
import { EASE } from '../../lib/animations'
import { announceOverlay, onOtherOverlay } from '../../lib/overlay'
import { useFocusTrap } from '../../hooks/useFocusTrap'

type Line = { kind: 'in' | 'out'; text: string }

/** Developer terminal easter egg: press ` (backtick) to open, Escape to close. */
export function Terminal() {
  const [open, setOpen] = useState(false)
  const [lines, setLines] = useState<Line[]>([])
  const [value, setValue] = useState('')
  const panel = useRef<HTMLDivElement>(null)
  const input = useRef<HTMLInputElement>(null)
  const log = useRef<HTMLDivElement>(null)
  const close = useCallback(() => setOpen(false), [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== '`' || e.metaKey || e.ctrlKey || e.altKey) return
      const t = e.target as HTMLElement
      if (t.closest('input, textarea, [contenteditable="true"]') && !panel.current?.contains(t)) return
      e.preventDefault()
      setOpen((o) => {
        if (!o) announceOverlay('terminal')
        return !o
      })
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [])
  useEffect(() => onOtherOverlay('terminal', close), [close])
  useFocusTrap(panel, open, close)
  useEffect(() => {
    if (open) input.current?.focus()
  }, [open])

  useEffect(() => {
    log.current?.scrollTo({ top: log.current.scrollHeight })
  }, [lines])

  const run = (raw: string) => {
    const cmd = raw.trim().toLowerCase()
    if (!cmd) return
    if (cmd === 'clear') {
      setLines([])
      return
    }
    if (cmd === 'cv') window.open(asset(person.links.cv), '_blank', 'noopener,noreferrer')
    if (cmd === 'exit') {
      close()
      return
    }
    setLines((l) => [...l, { kind: 'in', text: raw }, { kind: 'out', text: terminal.commands[cmd] ?? terminal.unknown }])
  }

  return (
    <AnimatePresence>
      {open && (
        <m.div
          ref={panel}
          role="dialog"
          aria-modal="true"
          aria-labelledby="terminal-title"
          className="fixed inset-x-3 bottom-3 z-[90] mx-auto max-w-2xl overflow-hidden rounded-xl border border-line-strong bg-carbon/95 shadow-[0_30px_80px_rgba(0,0,0,0.7)] backdrop-blur-xl sm:bottom-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3, ease: EASE }}
        >
          <div className="flex items-center justify-between border-b border-line px-4 py-2">
            <h2 id="terminal-title" className="flex items-center gap-2 font-mono text-xs font-normal tracking-normal text-ash">
              <span className="h-2 w-2 rounded-full bg-emerald" aria-hidden="true" />
              {terminal.title}
            </h2>
            <button
              type="button"
              onClick={close}
              className="grid h-8 w-8 place-items-center rounded-md text-ash hover:text-bone"
              aria-label="Close terminal"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
          <div
            ref={log}
            aria-live="polite"
            className="max-h-[40vh] space-y-1 overflow-y-auto px-4 pt-3 font-mono text-[0.8125rem] leading-relaxed"
          >
            <p className="text-ash">{terminal.welcome}</p>
            {lines.map((l, i) => (
              <p key={i} className={l.kind === 'in' ? 'text-bone' : 'text-mist'}>
                {l.kind === 'in' && <span className="text-emerald">$ </span>}
                {l.text}
              </p>
            ))}
          </div>
          <form
            className="flex items-center gap-2 border-t border-transparent px-4 pt-1 pb-3 font-mono text-[0.8125rem] focus-within:bg-graphite/60"
            onSubmit={(e) => {
              e.preventDefault()
              run(value)
              setValue('')
            }}
          >
            <span className="text-emerald" aria-hidden="true">
              $
            </span>
            <label htmlFor="terminal-input" className="sr-only">
              Command
            </label>
            <input
              ref={input}
              id="terminal-input"
              value={value}
              onChange={(e) => setValue(e.target.value.replace('`', ''))}
              autoComplete="off"
              spellCheck={false}
              className="min-w-0 flex-1 bg-transparent text-bone caret-emerald outline-none"
            />
          </form>
        </m.div>
      )}
    </AnimatePresence>
  )
}
