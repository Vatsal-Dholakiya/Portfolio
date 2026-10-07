import { m } from 'framer-motion'
import { EASE } from '../lib/animations'
import { Reveal } from './ui/Reveal'

/** "01." mono label, h2 title, and a gradient underline that grows from the left when visible. */
export function SectionTitle({ index, title, id }: { index: number; title: string; id: string }) {
  return (
    <Reveal className="mb-12 md:mb-16">
      <p className="mono-label mb-3">{String(index).padStart(2, '0')}.</p>
      <h2 id={id} className="text-[clamp(2rem,4.5vw,3rem)] leading-[1.1] font-bold text-text">
        {title}
      </h2>
      <m.span
        aria-hidden="true"
        data-reveal
        className="bg-gradient mt-5 block h-1 w-16 origin-left rounded-full"
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true, amount: 1 }}
        transition={{ duration: 0.8, ease: EASE, delay: 0.2 }}
      />
    </Reveal>
  )
}
