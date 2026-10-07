import { StrictMode } from 'react'
import { renderToPipeableStream } from 'react-dom/server'
import { Writable } from 'node:stream'
import App from './App'

/** Renders the page (or the 404 view), waiting for every code-split section, to a string. */
export function render(notFound = false): Promise<string> {
  return new Promise((resolve, reject) => {
    let html = ''
    const sink = new Writable({
      write(chunk, _enc, done) {
        html += chunk.toString()
        done()
      },
      final(done) {
        resolve(html)
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
