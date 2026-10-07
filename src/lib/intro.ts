/** Resolves when the intro overlay has finished (or immediately when it is skipped). */
let resolveIntro: () => void = () => {}
export const introDone = new Promise<void>((resolve) => {
  resolveIntro = resolve
})
export const finishIntro = () => resolveIntro()
