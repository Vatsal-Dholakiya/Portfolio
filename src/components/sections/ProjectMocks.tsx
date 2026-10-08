import { Check, FileText, Paperclip, Send } from 'lucide-react'
import { projects } from '../../data/content'

/** Illustration of the PostFactory app: template picker, live business card preview and editing tools. */
export function PhoneMock() {
  const app = projects.phoneApp
  const swatches = ['bg-emerald', 'bg-ember', 'bg-bone', 'bg-[#6C8CFF]']
  return (
    <div aria-hidden="true" className="relative mx-auto w-[min(100%,300px)]">
      <div className="absolute -inset-10 rounded-full bg-[radial-gradient(circle,rgba(46,230,166,0.16),transparent_65%)]" />
      <div className="relative aspect-[9/18.5] overflow-hidden rounded-[2.4rem] border-[7px] border-graphite bg-void shadow-[0_0_0_1px_rgba(237,238,233,0.1),0_40px_100px_rgba(0,0,0,0.6)]">
        <div className="flex h-full flex-col gap-3 p-4 pt-7">
          <div className="flex items-center justify-between">
            <span className="font-display text-sm font-semibold text-bone">{app.title}</span>
            <span className="h-6 w-6 rounded-full bg-emerald/80" />
          </div>
          <div className="flex gap-1.5 overflow-hidden">
            {app.templates.map((t, i) => (
              <span
                key={t}
                className={`shrink-0 rounded-full border px-2.5 py-1 text-[0.62rem] font-medium ${
                  i === 1 ? 'border-emerald bg-emerald/15 text-emerald' : 'border-line text-mist'
                }`}
              >
                {t}
              </span>
            ))}
          </div>

          {/* Business card preview */}
          <div className="relative mt-1 aspect-[1.75/1] overflow-hidden rounded-xl bg-gradient-to-br from-graphite to-carbon p-3.5 shadow-[0_14px_30px_rgba(0,0,0,0.5)] ring-1 ring-line-strong">
            <span className="absolute -top-6 -right-6 h-20 w-20 rounded-full bg-emerald/25" />
            <span className="block h-2.5 w-24 rounded-full bg-bone/90" />
            <span className="mt-1.5 block h-1.5 w-16 rounded-full bg-emerald/80" />
            <div className="absolute bottom-3 left-3.5 space-y-1">
              <span className="block h-1 w-20 rounded-full bg-mist/50" />
              <span className="block h-1 w-14 rounded-full bg-mist/50" />
              <span className="block h-1 w-16 rounded-full bg-mist/50" />
            </div>
            <span className="absolute right-3 bottom-3 grid h-7 w-7 place-items-center rounded-md border border-line-strong text-[0.5rem] text-mist">
              QR
            </span>
          </div>

          {/* Editing tools */}
          <div className="grid grid-cols-4 gap-1.5">
            {['Font', 'Colour', 'Icon', 'Layout'].map((t) => (
              <span key={t} className="rounded-lg bg-graphite py-2 text-center text-[0.58rem] text-mist">
                {t}
              </span>
            ))}
          </div>
          <div className="flex items-center gap-2">
            {swatches.map((c, i) => (
              <span key={c} className={`h-5 w-5 rounded-full ${c} ${i === 0 ? 'ring-2 ring-bone ring-offset-2 ring-offset-void' : ''}`} />
            ))}
          </div>

          <div className="mt-auto rounded-full bg-emerald py-2.5 text-center font-display text-[0.72rem] font-semibold text-on-accent">
            {app.button}
          </div>
        </div>
      </div>
    </div>
  )
}

/** Illustration of the WhatsApp automation desktop app: toolbar, recipients and attachments, composer, sending log. */
export function DesktopMock() {
  const app = projects.desktopApp
  return (
    <div aria-hidden="true" className="relative w-full">
      <div className="absolute -inset-8 rounded-[3rem] bg-[radial-gradient(ellipse,rgba(46,230,166,0.12),transparent_65%)]" />
      <div className="relative overflow-hidden rounded-xl border border-line-strong bg-carbon text-[0.62rem] shadow-[0_40px_100px_rgba(0,0,0,0.6)] sm:text-[0.7rem]">
        {/* Title bar */}
        <div className="flex items-center gap-2 border-b border-line bg-graphite px-3 py-2">
          <span className="h-2 w-2 rounded-full bg-ember/80" />
          <span className="h-2 w-2 rounded-full bg-ash/60" />
          <span className="h-2 w-2 rounded-full bg-emerald/80" />
          <span className="ml-2 font-medium text-mist">{app.title}</span>
        </div>
        {/* Toolbar */}
        <div className="flex gap-1.5 border-b border-line px-3 py-2">
          {app.toolbar.map((t) => (
            <span key={t} className="rounded-md border border-line px-2 py-1 text-mist">
              {t}
            </span>
          ))}
        </div>

        <div className="grid grid-cols-[minmax(0,0.9fr)_minmax(0,1.3fr)]">
          {/* Recipients and attachments */}
          <div className="border-r border-line p-3">
            <p className="mb-2 font-semibold text-bone">Recipients · 1,248</p>
            <ul className="space-y-1.5">
              {app.recipients.map((r, i) => (
                <li key={r} className="flex items-center gap-2 text-mist">
                  <span
                    className={`grid h-3 w-3 place-items-center rounded-sm ${i === 3 ? 'border border-line-strong' : 'bg-emerald text-on-accent'}`}
                  >
                    {i !== 3 && <Check className="h-2.5 w-2.5" />}
                  </span>
                  <span className="truncate">{r}</span>
                </li>
              ))}
            </ul>
            <div className="mt-3 flex items-center gap-1.5 rounded-md border border-dashed border-line-strong px-2 py-1.5 text-ash">
              <Paperclip className="h-3 w-3" />
              <span className="truncate">offer-poster.jpg</span>
            </div>
          </div>

          {/* Composer and log */}
          <div className="flex flex-col p-3">
            <p className="mb-2 font-semibold text-bone">Message</p>
            <p className="rounded-md bg-graphite p-2 leading-relaxed text-mist">
              {app.message.split('{name}')[0]}
              <span className="rounded bg-emerald/20 px-1 text-emerald">{'{name}'}</span>
              {app.message.split('{name}')[1]}
            </p>
            <span className="mt-2.5 flex items-center justify-center gap-1.5 rounded-md bg-emerald py-2 font-display text-[0.8rem] font-semibold text-on-accent">
              <Send className="h-3.5 w-3.5" />
              {app.send}
            </span>
            <p className="mt-3 mb-1.5 flex items-center gap-1.5 font-semibold text-bone">
              <FileText className="h-3 w-3" />
              {app.log}
            </p>
            <ul className="space-y-1">
              {app.recipients.slice(0, 3).map((r) => (
                <li key={r} className="flex items-center justify-between gap-2 rounded bg-void/60 px-2 py-1 text-ash">
                  <span className="truncate">{r}</span>
                  <span className="shrink-0 text-emerald">Delivered</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
