import { useEffect, type RefObject } from 'react'

const FOCUSABLE = 'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])'

/**
 * While `active`: moves focus into `ref`, keeps Tab inside it and closes on Escape.
 * On close, focus returns to `returnTo` (or the element focused before opening),
 * unless an action already moved focus elsewhere (e.g. a menu link focused its section).
 */
export function useFocusTrap(
  ref: RefObject<HTMLElement | null>,
  active: boolean,
  onClose: () => void,
  returnTo?: RefObject<HTMLElement | null>,
) {
  useEffect(() => {
    if (!active) return
    const opener = (returnTo?.current ?? document.activeElement) as HTMLElement | null
    const container = ref.current
    container?.querySelector<HTMLElement>(FOCUSABLE)?.focus()

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        onClose()
        return
      }
      if (e.key !== 'Tab' || !container) return
      const items = [...container.querySelectorAll<HTMLElement>(FOCUSABLE)]
      if (items.length === 0) return
      const first = items[0]!
      const last = items[items.length - 1]!
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('keydown', onKey)
      const now = document.activeElement
      if (!now || now === document.body || container?.contains(now)) opener?.focus({ preventScroll: true })
    }
  }, [ref, active, onClose, returnTo])
}
