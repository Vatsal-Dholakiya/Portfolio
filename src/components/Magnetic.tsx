import { useRef, type ReactNode } from 'react'
import { useMagnetic } from '../hooks/useMagnetic'

/** Wraps a button or link so it pulls slightly toward the cursor on hover. */
export function Magnetic({ children, strength }: { children: ReactNode; strength?: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  useMagnetic(ref, strength)
  return (
    <span ref={ref} className="inline-block">
      {children}
    </span>
  )
}
