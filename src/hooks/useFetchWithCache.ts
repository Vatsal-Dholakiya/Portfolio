import { useCallback, useEffect, useState } from 'react'

const HOUR = 60 * 60 * 1000

export type FetchState<T> = { status: 'loading' } | { status: 'ready'; data: T } | { status: 'fallback'; data: T; reason: string }

interface Options<T> {
  /** sessionStorage key */
  key: string
  url: string
  /** Turns the JSON response into the data the component needs; throw to use the fallback */
  parse: (json: unknown) => T
  fallback: T
  ttl?: number
  timeout?: number
}

function readCache<T>(key: string, ttl: number): T | null {
  try {
    const raw = sessionStorage.getItem(key)
    if (!raw) return null
    const { time, data } = JSON.parse(raw) as { time: number; data: T }
    return Date.now() - time < ttl ? data : null
  } catch {
    return null
  }
}

function writeCache<T>(key: string, data: T) {
  try {
    sessionStorage.setItem(key, JSON.stringify({ time: Date.now(), data }))
  } catch {
    /* storage full or blocked: caching is optional */
  }
}

/**
 * Fetches JSON once per session (cached in sessionStorage for 1 hour by default).
 * On network errors, time-outs or rate limits it returns `fallback` with a reason.
 */
export function useFetchWithCache<T>({ key, url, parse, fallback, ttl = HOUR, timeout = 8000 }: Options<T>) {
  const [state, setState] = useState<FetchState<T>>({ status: 'loading' })
  const [attempt, setAttempt] = useState(0)

  const retry = useCallback(() => {
    try {
      sessionStorage.removeItem(key)
    } catch {
      /* ignore */
    }
    setState({ status: 'loading' })
    setAttempt((a) => a + 1)
  }, [key])

  useEffect(() => {
    const controller = new AbortController()
    let cancelled = false
    let timedOut = false
    const timer = window.setTimeout(() => {
      timedOut = true
      controller.abort()
    }, timeout)

    const load = async () => {
      const cached = readCache<T>(key, ttl)
      if (cached) {
        setState({ status: 'ready', data: cached })
        return
      }
      try {
        const res = await fetch(url, { signal: controller.signal })
        if (!res.ok) {
          throw new Error(res.status === 403 || res.status === 429 ? 'Rate limit reached' : `Request failed (${res.status})`)
        }
        const data = parse(await res.json())
        writeCache(key, data)
        if (!cancelled) setState({ status: 'ready', data })
      } catch (err) {
        if (cancelled) return
        const reason = timedOut ? 'Request timed out' : err instanceof Error ? err.message : 'Network error'
        setState({ status: 'fallback', data: fallback, reason })
      } finally {
        window.clearTimeout(timer)
      }
    }
    void load()

    return () => {
      cancelled = true
      window.clearTimeout(timer)
      controller.abort()
    }
    // parse and fallback come from static content; re-fetch only on retry
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key, url, ttl, timeout, attempt])

  return { state, retry }
}
