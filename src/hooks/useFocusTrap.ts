import { useEffect, type RefObject } from 'react'

const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'

/** Keeps Tab focus inside `ref` while `active`, closes on Escape, and restores focus afterwards. */
export function useFocusTrap(ref: RefObject<HTMLElement | null>, active: boolean, onClose: () => void) {
  useEffect(() => {
    if (!active) return
    const opener = document.activeElement as HTMLElement | null
    const container = ref.current
    const first = container?.querySelector<HTMLElement>(FOCUSABLE)
    first?.focus()

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        onClose()
        return
      }
      if (e.key !== 'Tab' || !container) return
      const items = [...container.querySelectorAll<HTMLElement>(FOCUSABLE)]
      if (items.length === 0) return
      const firstItem = items[0]!
      const lastItem = items[items.length - 1]!
      if (e.shiftKey && document.activeElement === firstItem) {
        e.preventDefault()
        lastItem.focus()
      } else if (!e.shiftKey && document.activeElement === lastItem) {
        e.preventDefault()
        firstItem.focus()
      }
    }
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('keydown', onKey)
      // Return focus to the opener unless an action already moved it (e.g. a menu link focused its section)
      const now = document.activeElement
      if (!now || now === document.body || container?.contains(now)) opener?.focus({ preventScroll: true })
    }
  }, [ref, active, onClose])
}
