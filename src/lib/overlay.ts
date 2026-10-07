/**
 * Only one overlay (mobile menu or certificate dialog) may be open at a time.
 * Opening one announces itself; the others close.
 */
type Listener = (id: string) => void
const listeners = new Set<Listener>()

export const announceOverlay = (id: string) => listeners.forEach((l) => l(id))

export function onOtherOverlay(id: string, close: () => void) {
  const l: Listener = (opened) => opened !== id && close()
  listeners.add(l)
  return () => {
    listeners.delete(l)
  }
}
