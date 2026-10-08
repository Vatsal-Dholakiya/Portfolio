import { useCallback, useEffect, useState } from 'react'

/** Shared open-tooltip state: only one tooltip is open at a time across all chip groups. */
export function useSkillTips() {
  const [openKey, setOpenKey] = useState<string | null>(null)
  const close = useCallback(() => setOpenKey(null), [])

  // Close on Escape, on a tap outside any chip, and on scroll (the tooltip is anchored to the viewport)
  useEffect(() => {
    if (!openKey) return
    const startY = window.scrollY
    const onScroll = () => Math.abs(window.scrollY - startY) > 40 && close()
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && close()
    const onDown = (e: PointerEvent) => {
      if (!(e.target as Element).closest('[data-skill-chip]')) close()
    }
    document.addEventListener('keydown', onKey)
    document.addEventListener('pointerdown', onDown)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('pointerdown', onDown)
      window.removeEventListener('scroll', onScroll)
    }
  }, [openKey, close])

  return { openKey, setOpenKey, close }
}
