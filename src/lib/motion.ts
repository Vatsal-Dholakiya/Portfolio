const mq = (query: string) => typeof window !== 'undefined' && window.matchMedia(query).matches

export const prefersReducedMotion = () => mq('(prefers-reduced-motion: reduce)')

/** Desktop pointer: a mouse or trackpad that can hover. */
export const hasFinePointer = () => mq('(hover: hover) and (pointer: fine)')

/** Resolves when web fonts are ready, so text is split and measured with final metrics. */
export const fontsReady = (): Promise<unknown> =>
  typeof document !== 'undefined' && document.fonts ? document.fonts.ready : Promise.resolve()
