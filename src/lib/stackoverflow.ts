import type { StackOverflowStats } from '../data/content'

interface ApiResponse {
  items?: { reputation: number; badge_counts: { gold: number; silver: number; bronze: number } }[]
}

export const parseStackOverflow = (json: unknown): StackOverflowStats => {
  const user = (json as ApiResponse).items?.[0]
  if (!user) throw new Error('User not found')
  return { reputation: user.reputation, ...user.badge_counts }
}
