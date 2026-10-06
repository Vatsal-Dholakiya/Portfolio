/** Resolves when the preloader has finished (or immediately if it is not shown). The hero waits for it. */
let resolveIntro: () => void = () => {}
export const introDone = new Promise<void>((resolve) => {
  resolveIntro = resolve
})
export const finishIntro = () => resolveIntro()
