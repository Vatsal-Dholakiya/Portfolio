import { useCallback, useEffect, useState } from 'react'
import { BadgeCheck, Maximize2 } from 'lucide-react'
import { asset, story, type Certificate } from '../../data/content'
import { externalLink } from '../../lib/helpers'
import { announceOverlay, onOtherOverlay } from '../../lib/overlay'
import { CertificateModal } from '../CertificateModal'
import { Icon } from '../Icon'
import { RevealItem, Stagger } from '../ui/Reveal'
import { TiltCard } from '../ui/TiltCard'

/** Keeps hyphenated or slashed words such as "UI/UX" on one line. */
function NoBreak({ text }: { text: string }) {
  return text.split(' ').map((word, i) => (
    <span key={i}>
      {i > 0 && ' '}
      {/[-/]/.test(word) ? <span className="whitespace-nowrap">{word}</span> : word}
    </span>
  ))
}

/** Strip of certificate cards; a card opens the full certificate in an accessible dialog. */
export function Certificates() {
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

  if (!story.certificates.length) return null

  return (
    <div id="certificates" className="container-x pt-[var(--section-py)]">
      <div className="mb-8 flex items-end justify-between gap-4">
        <h3 className="text-[clamp(1.75rem,3.5vw,2.75rem)] leading-none font-extrabold">{story.certificatesTitle}</h3>
        <span className="font-mono text-sm text-ash">{String(story.certificates.length).padStart(2, '0')}</span>
      </div>
      <Stagger as="ul" className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" stagger={0.07} amount={0.1}>
        {story.certificates.map((cert) => (
          <RevealItem as="li" key={cert.title} className="min-w-0">
            <TiltCard innerClassName="flex h-full flex-col overflow-hidden">
              {cert.image ? (
                <div className="relative aspect-[1600/1131] overflow-hidden border-b border-line bg-void">
                  <img
                    src={asset(cert.image)}
                    alt=""
                    width={cert.width ?? 1600}
                    height={cert.height ?? 1131}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover object-top opacity-80 transition-[opacity,transform] duration-500 group-hover:scale-[1.03] group-hover:opacity-100"
                  />
                  <span className="absolute top-3 right-3 grid h-8 w-8 place-items-center rounded-full bg-void/80 text-mist">
                    <Maximize2 className="h-3.5 w-3.5" aria-hidden="true" />
                  </span>
                </div>
              ) : (
                <div className="flex items-center gap-3 border-b border-line p-5 text-emerald">
                  <Icon name={cert.icon} className="h-6 w-6" />
                </div>
              )}
              <div className="flex flex-1 flex-col p-5">
                <h4 className="text-base leading-snug font-semibold text-bone">
                  {cert.image ? (
                    // Stretched button: clicking anywhere on the card opens the certificate
                    <button
                      type="button"
                      onClick={() => show(cert)}
                      aria-haspopup="dialog"
                      className="rounded-md text-left"
                      data-cursor="Open"
                    >
                      <span className="absolute inset-0 rounded-2xl" aria-hidden="true" />
                      <NoBreak text={cert.title} />
                      <span className="sr-only">: {story.viewCertificate}</span>
                    </button>
                  ) : (
                    <NoBreak text={cert.title} />
                  )}
                </h4>
                <p className="mt-1.5 text-sm text-ash">{cert.issuer}</p>
                <p className="mt-1 font-mono text-xs text-emerald">{cert.date}</p>
                {cert.credential && (
                  <a
                    href={cert.credential}
                    {...externalLink}
                    className="link relative z-10 mt-auto inline-flex w-fit items-center gap-2 pt-5 text-sm font-medium"
                  >
                    <BadgeCheck className="h-4 w-4" aria-hidden="true" />
                    {story.viewCredential}
                    <span className="sr-only">: {cert.title} (opens in a new tab)</span>
                  </a>
                )}
              </div>
            </TiltCard>
          </RevealItem>
        ))}
      </Stagger>
      <CertificateModal cert={selected} open={open} onClose={close} />
    </div>
  )
}
