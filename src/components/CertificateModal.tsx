import { ExternalLink } from 'lucide-react'
import { asset, story, type Certificate } from '../data/content'
import { externalLink } from '../lib/helpers'
import { Modal } from './ui/Modal'

/** Accessible dialog showing a certificate image and its credential link (if any). */
export function CertificateModal({ cert, open, onClose }: { cert: Certificate | null; open: boolean; onClose: () => void }) {
  return (
    <Modal open={open} onClose={onClose} labelledBy="cert-modal-title" closeLabel={story.close}>
      {cert && (
        <div>
          {cert.image && (
            <div className="border-b border-line bg-void p-4 pt-16 sm:p-6 sm:pt-16">
              <img
                src={asset(cert.image)}
                alt={`${cert.title} certificate issued by ${cert.issuer}, ${cert.date}`}
                width={cert.width ?? 1600}
                height={cert.height ?? 1131}
                loading="lazy"
                decoding="async"
                className="mx-auto h-auto max-h-[70svh] w-auto max-w-full rounded-lg object-contain"
                style={{ aspectRatio: `${cert.width ?? 1600} / ${cert.height ?? 1131}` }}
              />
            </div>
          )}
          <div className={`p-6 sm:p-8 ${cert.image ? '' : 'pt-16'}`}>
            <h2 id="cert-modal-title" className="pr-12 text-2xl leading-tight font-bold text-bone">
              {cert.title}
            </h2>
            <p className="mt-2 text-ash">
              {cert.issuer} · {cert.date}
            </p>
            {cert.credential && (
              <a href={cert.credential} {...externalLink} className="btn btn-primary mt-6">
                {story.viewCredential} <ExternalLink className="h-5 w-5" aria-hidden="true" />
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            )}
          </div>
        </div>
      )}
    </Modal>
  )
}
