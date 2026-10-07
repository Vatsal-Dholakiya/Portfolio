import { useCallback, useState, type ComponentType } from 'react'
import { Award, BadgeCheck, Cloud, CodeXml, ExternalLink, GitBranch, Palette, ShieldCheck, type LucideProps } from 'lucide-react'
import { asset, content, type CertIcon, type Certificate } from '../data/content'
import { Modal } from '../components/ui/Modal'
import { RevealItem, Stagger } from '../components/ui/Reveal'
import { SectionHeading } from '../components/ui/SectionHeading'
import { TiltCard } from '../components/ui/TiltCard'

/** Keeps hyphenated words such as "UI-UX" on one line instead of breaking at the hyphen. */
function NoBreakHyphens({ text }: { text: string }) {
  return text.split(' ').map((word, i) => (
    <span key={i}>
      {i > 0 && ' '}
      {word.includes('-') ? <span className="whitespace-nowrap">{word}</span> : word}
    </span>
  ))
}

const icons: Record<CertIcon, ComponentType<LucideProps>> = {
  shield: ShieldCheck,
  cloud: Cloud,
  code: CodeXml,
  git: GitBranch,
  palette: Palette,
  award: Award,
}

export function Certifications() {
  // The selected certificate stays set while the dialog animates out
  const [selected, setSelected] = useState<Certificate | null>(null)
  const [isOpen, setIsOpen] = useState(false)
  const close = useCallback(() => setIsOpen(false), [])
  const show = (cert: Certificate) => {
    setSelected(cert)
    setIsOpen(true)
  }
  const open = selected

  return (
    <section id="certifications" aria-labelledby="certifications-title" tabIndex={-1} className="relative py-20 outline-none md:py-28">
      <div className="container-x">
        <SectionHeading index="05" title="Certifications" id="certifications-title" />
        {/* Add a certificate by adding an entry to content.certificates; the grid adapts */}
        <Stagger as="ul" className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5" stagger={0.08} amount={0.15}>
          {content.certificates.map((cert) => {
            const Icon = icons[cert.icon]
            return (
              <RevealItem as="li" key={cert.url}>
                <TiltCard innerClassName="flex h-full flex-col p-6 sm:p-7">
                  <span className="grid h-12 w-12 place-items-center rounded-xl border border-border bg-surface-2 text-primary-soft">
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <h3 className="mt-5 text-lg font-semibold leading-snug text-text">
                    <NoBreakHyphens text={cert.title} />
                  </h3>
                  <p className="mt-2 text-[0.9375rem] text-muted">{cert.issuer}</p>
                  <p className="mt-1 font-mono text-xs text-accent">{cert.date}</p>
                  <button
                    type="button"
                    onClick={() => show(cert)}
                    aria-haspopup="dialog"
                    className="mt-6 inline-flex w-fit items-center gap-2 rounded-lg text-sm font-medium text-primary-soft transition-colors hover:text-text"
                  >
                    <span className="absolute inset-0 rounded-[1.25rem]" aria-hidden="true" />
                    <BadgeCheck className="h-4 w-4" aria-hidden="true" />
                    View Credential
                    <span className="sr-only">: {cert.title}</span>
                  </button>
                </TiltCard>
              </RevealItem>
            )
          })}
        </Stagger>
      </div>

      <Modal open={isOpen} onClose={close} labelledBy="cert-modal-title">
        {open && (
          <div>
            {open.image ? (
              <div className="border-b border-border bg-bg p-4 pt-16 sm:p-6 sm:pt-16">
                <img
                  src={asset(open.image)}
                  alt={`Certificate: ${open.title}, issued by ${open.issuer}, ${open.date}`}
                  width={1600}
                  height={1131}
                  loading="lazy"
                  decoding="async"
                  className="mx-auto aspect-[1600/1131] h-auto w-full rounded-lg object-contain"
                />
              </div>
            ) : null}
            <div className="p-6 sm:p-8">
              <p className="mono-label">Certification</p>
              <h2 id="cert-modal-title" className="mt-2 pr-12 text-2xl font-bold leading-tight text-text">
                <NoBreakHyphens text={open.title} />
              </h2>
              <p className="mt-2 text-muted">
                {open.issuer} · {open.date}
              </p>
              <a href={open.url} target="_blank" rel="noopener noreferrer" className="btn btn-primary mt-6">
                View Credential <ExternalLink className="h-5 w-5" aria-hidden="true" />
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            </div>
          </div>
        )}
      </Modal>
    </section>
  )
}
