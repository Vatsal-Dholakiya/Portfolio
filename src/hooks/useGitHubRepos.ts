import { useCallback, useEffect, useState } from 'react'
import { content, type Repo } from '../data/content'

const CACHE_KEY = 'gh-repos-v1'
const CACHE_MS = 60 * 60 * 1000 // 1 hour
const TIMEOUT_MS = 8000

export type RepoState =
  | { status: 'loading' }
  | { status: 'ready'; repos: Repo[] }
  | { status: 'fallback'; repos: Repo[]; reason: string }

interface ApiRepo {
  name: string
  description: string | null
  language: string | null
  stargazers_count: number
  pushed_at: string
  html_url: string
  homepage: string | null
}

const { github } = content
const withDescription = (r: Repo): Repo => ({ ...r, description: r.description || github.descriptions[r.name] || '' })
const fallback = () => github.fallback.map(withDescription)

function readCache(): Repo[] | null {
  try {
    const raw = sessionStorage.getItem(CACHE_KEY)
    if (!raw) return null
    const { time, repos } = JSON.parse(raw) as { time: number; repos: Repo[] }
    return Date.now() - time < CACHE_MS ? repos : null
  } catch {
    return null
  }
}

function writeCache(repos: Repo[]) {
  try {
    sessionStorage.setItem(CACHE_KEY, JSON.stringify({ time: Date.now(), repos }))
  } catch {
    /* storage full or blocked */
  }
}

/** Latest public repositories from the GitHub API, with a 1-hour session cache and a static fallback. */
export function useGitHubRepos() {
  const [state, setState] = useState<RepoState>({ status: 'loading' })
  const [attempt, setAttempt] = useState(0)
  const retry = useCallback(() => {
    try {
      sessionStorage.removeItem(CACHE_KEY)
    } catch {
      /* ignore */
    }
    setState({ status: 'loading' })
    setAttempt((a) => a + 1)
  }, [])

  useEffect(() => {
    const controller = new AbortController()
    let cancelled = false
    let timedOut = false
    const timer = window.setTimeout(() => {
      timedOut = true
      controller.abort()
    }, TIMEOUT_MS)

    const load = async () => {
      const cached = readCache()
      if (cached) {
        setState({ status: 'ready', repos: cached.map(withDescription) })
        return
      }
      try {
        const res = await fetch(github.api, { signal: controller.signal, headers: { Accept: 'application/vnd.github+json' } })
        if (!res.ok) {
          const limited = res.status === 403 || res.status === 429
          throw new Error(limited ? 'GitHub rate limit reached' : `GitHub returned ${res.status}`)
        }
        const data = (await res.json()) as ApiRepo[]
        const repos: Repo[] = data
          .filter((r) => !github.hide.includes(r.name))
          .slice(0, 6)
          .map((r) => ({
            name: r.name,
            description: r.description ?? '',
            language: r.language,
            stars: r.stargazers_count,
            updated: r.pushed_at,
            url: r.html_url,
            homepage: r.homepage ?? undefined,
          }))
        writeCache(repos)
        setState({ status: 'ready', repos: repos.map(withDescription) })
      } catch (err) {
        if (cancelled) return
        const reason = timedOut ? 'GitHub took too long to respond' : err instanceof Error ? err.message : 'GitHub could not be reached'
        setState({ status: 'fallback', repos: fallback(), reason })
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
  }, [attempt])

  return { state, retry }
}
