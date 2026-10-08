import { StrictMode } from 'react'
import { renderToPipeableStream } from 'react-dom/server'
import { Writable } from 'node:stream'
import App from './App'

/** Renders the page (or the 404 view), waiting for every code-split section, to a string. */
export function render(notFound = false): Promise<string> {
  return new Promise((resolve, reject) => {
    // Copy each chunk's bytes right away (React reuses its write buffer) and decode once at the end,
    // so a multi-byte character split across two chunks stays intact
    const chunks: Buffer[] = []
    const sink = new Writable({
      write(chunk: Buffer | string, _enc, done) {
        chunks.push(Buffer.from(chunk))
        done()
      },
      final(done) {
        // React 18's stream writer can leave an unfilled zero byte where a multi-byte character meets a buffer
        // boundary (no text is lost); strip those padding bytes
        resolve(Buffer.concat(chunks).toString('utf8').replaceAll('\u0000', ''))
        done()
      },
    })
    const stream = renderToPipeableStream(
      <StrictMode>
        <App notFound={notFound} />
      </StrictMode>,
      {
        onAllReady: () => stream.pipe(sink),
        onShellError: reject,
        onError: reject,
      },
    )
  })
}
