import { AnimatePresence, m } from 'motion/react'
import { setTheme, useTheme } from '../lib/theme'
import { Icon } from './Icon'

export function ThemeToggle() {
  const theme = useTheme()
  const next = theme === 'dark' ? 'light' : 'dark'
  return (
    <button
      type="button"
      onClick={() => setTheme(next)}
      aria-label={`Switch to ${next} theme`}
      className="relative grid h-11 w-11 place-items-center overflow-hidden rounded-full border border-line text-ink transition-colors hover:border-accent"
    >
      <AnimatePresence mode="wait" initial={false}>
        <m.span
          key={theme}
          initial={{ y: 14, opacity: 0, rotate: -60 }}
          animate={{ y: 0, opacity: 1, rotate: 0 }}
          exit={{ y: -14, opacity: 0, rotate: 60 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="grid place-items-center"
        >
          <Icon name={theme === 'dark' ? 'moon' : 'sun'} className="h-[18px] w-[18px]" />
        </m.span>
      </AnimatePresence>
    </button>
  )
}
