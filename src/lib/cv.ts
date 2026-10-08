import { asset, person } from '../data/content'

type Downloads = { save: (r: { filename: string; data: Blob }) => Promise<{ status: string }> }
type ClaudeHost = { use: (name: 'downloads') => Promise<Downloads | null> }

const cvHref = () => asset(person.links.cv)
const host = () => (typeof window !== 'undefined' ? (window as unknown as { claude?: ClaudeHost }).claude : undefined)

/**
 * Inside the claude.ai preview the page is sandboxed and cannot open or download files itself, so CV links ask
 * the viewer to save the file through the preview's download prompt. On the real site the link works as usual.
 */
export function onCvClick(e: MouseEvent) {
  const claude = host()
  if (!claude?.use || e.defaultPrevented || e.button !== 0) return
  const link = (e.target as Element | null)?.closest?.('a[href]')
  if (!link || link.getAttribute('href') !== cvHref()) return
  e.preventDefault()
  void (async () => {
    const downloads = await claude.use('downloads').catch(() => null)
    try {
      if (!downloads) throw new Error('unavailable')
      const res = await fetch(cvHref())
      if (!res.ok) throw new Error(String(res.status))
      const name = `${person.firstName}_${person.lastName}_CV.pdf`
      await downloads.save({ filename: name, data: await res.blob() })
    } catch (err) {
      // The viewer declined: nothing more to do. Anything else: try opening the file directly.
      if ((err as { code?: string })?.code !== 'declined') window.open(cvHref(), '_blank', 'noopener,noreferrer')
    }
  })()
}
