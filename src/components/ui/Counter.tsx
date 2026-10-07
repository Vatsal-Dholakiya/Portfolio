import { useRef } from 'react'
import { useCountUp } from '../../hooks/useCountUp'

export function Counter({ value, prefix = '', suffix = '', className = '' }: { value: number; prefix?: string; suffix?: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  useCountUp(ref, value)
  return (
    <span className={`tabular-nums ${className}`}>
      {prefix}
      <span ref={ref}>{value}</span>
      {suffix}
    </span>
  )
}
