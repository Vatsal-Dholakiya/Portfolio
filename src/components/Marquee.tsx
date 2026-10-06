/** Infinite, slow marquee of skill names. Decorative: the full list is shown below it. Pauses on hover. */
export function Marquee({ items }: { items: string[] }) {
  const row = (copy: boolean) => (
    <ul className={`flex shrink-0 items-center ${copy ? 'marquee-copy' : ''}`}>
      {items.map((s) => (
        <li key={s} className="flex items-center whitespace-nowrap font-display text-[clamp(2rem,5vw,3.75rem)] font-extrabold tracking-tight">
          <span className="px-6 md:px-8">{s}</span>
          <span className="text-accent text-[0.5em]">✦</span>
        </li>
      ))}
    </ul>
  )
  return (
    <div aria-hidden="true" className="marquee mb-20 overflow-hidden border-y border-line py-6 md:mb-24">
      <div className="marquee-track flex w-max">
        {row(false)}
        {row(true)}
      </div>
    </div>
  )
}
