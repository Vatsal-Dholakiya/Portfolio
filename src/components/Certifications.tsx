import { useCallback, useEffect, useState } from 'react'
import { BadgeCheck, Maximize2 } from 'lucide-react'
import { certifications, type Certificate } from '../data/content'
import { externalLink } from '../lib/helpers'
import { announceOverlay, onOtherOverlay } from '../lib/overlay'
import { CertificateModal } from './CertificateModal'
import { IconTile } from './Icon'
import { SectionTitle } from './SectionTitle'
import { RevealItem, Stagger } from './ui/Reveal'
import { TiltCard } from './ui/TiltCard'

/** Keeps hyphenated or slashed words such as "UI/UX" on one line. */
function NoBreak({ text }: { text: string }) {
  return text.split(' ').map((word, i) => (
    <span key={i}>
      {i > 0 && ' '}
      {/[-/]/.test(word) ? <span className="whitespace-nowrap">{word}</span> : word}
    </span>
  ))
}

export function Certifications() {
  // The selected certificate stays set while the dialog animates out
  const [selected, setSelected] = useState<Certificate | null>(null)
  const [open, setOpen] = useState(false)
  const close = useCallback(() => setOpen(false), [])
  const show = (cert: Certificate) => {
    announceOverlay('certificate')
    setSelected(cert)
    setOpen(true)
  }
  useEffect(() => onOtherOverlay('certificate', close), [close])

  return (
    <section id="certifications" aria-labelledby="certifications-title" tabIndex={-1} className="section-y relative outline-none">
      <div className="container-x">
        <SectionTitle index={5} title={certifications.title} id="certifications-title" />
        <Stagger as="ul" className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5" stagger={0.08} amount={0.1}>
          {certifications.items.map((cert) => (
            <RevealItem as="li" key={cert.title} className="min-w-0">
              <TiltCard innerClassName="flex h-full flex-col p-6 sm:p-7">
                <div className="flex items-start justify-between gap-4">
                  <IconTile name={cert.icon} size="lg" />
                  {cert.image && <Maximize2 className="h-4 w-4 text-muted transition-colors group-hover:text-text" aria-hidden="true" />}
                </div>
                <h3 className="mt-5 text-lg leading-snug font-semibold text-text">
                  {cert.image ? (
                    // Stretched button: clicking anywhere on the card opens the certificate
                    <button type="button" onClick={() => show(cert)} aria-haspopup="dialog" className="rounded-md text-left">
                      <span className="absolute inset-0 rounded-2xl" aria-hidden="true" />
                      <NoBreak text={cert.title} />
                      <span className="sr-only">: {certifications.viewCertificate}</span>
                    </button>
                  ) : (
                    <NoBreak text={cert.title} />
                  )}
                </h3>
                <p className="mt-2 text-[0.9375rem] text-muted">{cert.issuer}</p>
                <p className="mt-1 font-mono text-xs text-accent">{cert.date}</p>
                {cert.credential && (
                  <a
                    href={cert.credential}
                    {...externalLink}
                    className="link relative z-10 mt-6 inline-flex w-fit items-center gap-2 text-sm font-medium"
                  >
                    <BadgeCheck className="h-4 w-4" aria-hidden="true" />
                    {certifications.viewCredential}
                    <span className="sr-only">: {cert.title} (opens in a new tab)</span>
                  </a>
                )}
              </TiltCard>
            </RevealItem>
          ))}
        </Stagger>
      </div>
      <CertificateModal cert={selected} open={open} onClose={close} />
    </section>
  )
}
