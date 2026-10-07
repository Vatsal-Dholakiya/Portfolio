import { useSyncExternalStore } from 'react'

const query = '(hover: hover) and (pointer: fine)'
const subscribe = (cb: () => void) => {
  const mq = window.matchMedia(query)
  mq.addEventListener('change', cb)
  return () => mq.removeEventListener('change', cb)
}

/** True on touch-first devices (no fine, hovering pointer). Always false during pre-rendering. */
export const useIsTouch = () =>
  useSyncExternalStore(
    subscribe,
    () => !window.matchMedia(query).matches,
    () => false,
  )
