import { useRef } from 'react'
import { formatNumber, useCountUp } from '../../hooks/useCountUp'

export function Counter({
  value,
  prefix = '',
  suffix = '',
  decimals = 0,
  className = '',
}: {
  value: number
  prefix?: string
  suffix?: string
  decimals?: number
  className?: string
}) {
  const ref = useRef<HTMLSpanElement>(null)
  useCountUp(ref, value, decimals)
  return (
    <span className={`tabular-nums ${className}`}>
      {prefix}
      <span ref={ref}>{formatNumber(value, decimals)}</span>
      {suffix}
    </span>
  )
}
