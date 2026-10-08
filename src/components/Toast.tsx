import { AnimatePresence, m } from 'framer-motion'
import { Check } from 'lucide-react'
import { EASE } from '../lib/animations'

/** Small confirmation toast at the bottom of the screen, announced to screen readers. */
export function Toast({ show, message }: { show: boolean; message: string }) {
  return (
    <div aria-live="polite" className="pointer-events-none fixed inset-x-0 bottom-6 z-[90] flex justify-center px-4">
      <AnimatePresence>
        {show && (
          <m.div
            key="toast"
            role="status"
            className="flex items-center gap-2 rounded-full border border-line-strong bg-graphite px-5 py-3 text-sm font-medium text-bone shadow-[0_12px_40px_rgba(0,0,0,0.6)]"
            initial={{ opacity: 0, y: 24, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.97 }}
            transition={{ duration: 0.4, ease: EASE }}
          >
            <span className="bg-gradient grid h-5 w-5 place-items-center rounded-full text-on-accent">
              <Check className="h-3.5 w-3.5" aria-hidden="true" />
            </span>
            {message}
          </m.div>
        )}
      </AnimatePresence>
    </div>
  )
}
