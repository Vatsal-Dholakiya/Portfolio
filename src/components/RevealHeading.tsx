import { useRef, type ElementType } from 'react'
import { SplitText, gsap, useGSAP } from '../lib/gsap'
import { fontsReady, prefersReducedMotion } from '../lib/motion'

type Props = { as?: ElementType; id?: string; className?: string; text: string; by?: 'words' | 'chars' }

/**
 * Heading whose words (or letters) rise from behind a mask as it enters the screen.
 * The text is only split when the heading comes near the viewport, keeping start-up work low.
 */
export function RevealHeading({ as: Tag = 'h2', id, className, text, by = 'words' }: Props) {
  const ref = useRef<HTMLElement>(null)

  useGSAP(() => {
    const el = ref.current
    if (!el || prefersReducedMotion()) return
    let split: SplitText | undefined
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        io.disconnect()
        fontsReady().then(() => {
          if (!el.isConnected) return
          split = SplitText.create(el, {
            type: by === 'chars' ? 'words,chars' : 'words',
            mask: 'words',
            wordsClass: 'split-word',
          })
          gsap.from(by === 'chars' ? split.chars : split.words, {
            yPercent: 110,
            duration: by === 'chars' ? 0.9 : 0.8,
            ease: 'power4.out',
            stagger: by === 'chars' ? 0.03 : 0.08,
          })
        })
      },
      // Split just before the heading scrolls into view
      { rootMargin: '0px 0px -12% 0px' },
    )
    io.observe(el)
    return () => {
      io.disconnect()
      split?.revert()
    }
  })

  return (
    <Tag ref={ref} id={id} className={className}>
      {text}
    </Tag>
  )
}
