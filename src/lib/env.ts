const mq = (query: string) => typeof window !== 'undefined' && window.matchMedia(query).matches

export const prefersReducedMotion = () => mq('(prefers-reduced-motion: reduce)')

/** A mouse or trackpad that can hover (not touch). */
export const hasFinePointer = () => mq('(hover: hover) and (pointer: fine)')

export const EASE = [0.22, 1, 0.36, 1] as const
