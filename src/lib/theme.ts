import { useSyncExternalStore } from 'react'

export type Theme = 'light' | 'dark'

const listeners = new Set<() => void>()
const read = (): Theme => (document.documentElement.dataset.theme === 'light' ? 'light' : 'dark')

function subscribe(cb: () => void) {
  listeners.add(cb)
  // Follow the system setting until the visitor makes a choice
  const media = window.matchMedia('(prefers-color-scheme: light)')
  const onSystem = () => {
    let saved: string | null = null
    try {
      saved = localStorage.getItem('theme')
    } catch {
      /* storage blocked */
    }
    if (!saved) setTheme(media.matches ? 'light' : 'dark', false)
  }
  media.addEventListener('change', onSystem)
  return () => {
    listeners.delete(cb)
    media.removeEventListener('change', onSystem)
  }
}

export function setTheme(theme: Theme, persist = true) {
  document.documentElement.dataset.theme = theme
  if (persist) {
    try {
      localStorage.setItem('theme', theme)
    } catch {
      /* storage blocked */
    }
  }
  listeners.forEach((l) => l())
}

export const useTheme = () => useSyncExternalStore(subscribe, read, () => 'dark' as Theme)
