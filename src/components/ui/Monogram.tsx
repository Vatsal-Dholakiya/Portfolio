import { useId } from 'react'

/** "VD" monogram with the signature gradient. */
export function Monogram({ className = 'h-9 w-9' }: { className?: string }) {
  const id = `vd${useId().replace(/[^a-zA-Z0-9]/g, '')}`
  return (
    <svg viewBox="0 0 40 40" fill="none" aria-hidden="true" focusable="false" className={className}>
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#2EE6A6" />
          <stop offset="1" stopColor="#FF8A3D" />
        </linearGradient>
      </defs>
      <rect x="0.75" y="0.75" width="38.5" height="38.5" rx="11" fill="#0B0E0D" stroke={`url(#${id})`} strokeWidth="1.5" />
      <path
        d="M9 12.5 13.6 27.5 18.2 12.5M21.8 12.5V27.5H25.4C29.4 27.5 31.6 24.6 31.6 20S29.4 12.5 25.4 12.5Z"
        fill="none"
        stroke={`url(#${id})`}
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
