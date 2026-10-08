/**
 * Resolves once every code-split section is on the page. Pinned scenes are created then, all in the same frame,
 * so ScrollTrigger measures the page once instead of once per scene; in-page jumps wait for it too.
 */
let mark = () => {}
export const sectionsReady = new Promise<void>((resolve) => {
  mark = resolve
})
export const markSectionsReady = () => mark()

/** Runs `fn` after the sections are ready and the pins they create have been measured (two frames later). */
export const afterPinsMeasured = (fn: () => void) => void sectionsReady.then(() => requestAnimationFrame(() => requestAnimationFrame(fn)))
