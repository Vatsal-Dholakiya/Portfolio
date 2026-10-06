import { useEffect, useState } from 'react'

/** Returns the id of the section currently crossing the middle of the viewport. */
export function useActiveSection(ids: string[]) {
  const [active, setActive] = useState<string | null>(null)
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) if (entry.isIntersecting) setActive(entry.target.id)
      },
      { rootMargin: '-50% 0px -50% 0px' },
    )
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[]
    els.forEach((el) => observer.observe(el))
    const onScroll = () => {
      if (window.scrollY < window.innerHeight * 0.4) setActive(null)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', onScroll)
    }
  }, [ids])
  return active
}
