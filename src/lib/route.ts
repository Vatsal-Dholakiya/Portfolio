/** True when the current path is the home page (taking the deploy base path into account). */
export function isHomePath(pathname: string, base = __BASE__) {
  const prefix = base.startsWith('/') ? base : '/'
  const rest = pathname.startsWith(prefix) ? pathname.slice(prefix.length) : pathname.replace(/^\//, '')
  return rest === '' || rest === 'index.html'
}
