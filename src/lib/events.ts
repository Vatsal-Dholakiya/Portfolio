/** Asks the featured project to expand its Key Features (used by "See project →" in Experience). */
export const OPEN_PROJECT_EVENT = 'vd:open-project'

export const requestOpenProject = (id: string) => window.dispatchEvent(new CustomEvent(OPEN_PROJECT_EVENT, { detail: id }))
