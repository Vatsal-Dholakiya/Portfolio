import type { ComponentType } from 'react'
import {
  BrainCircuit,
  Cloud,
  CodeXml,
  Cpu,
  Database,
  GitBranch,
  Monitor,
  Palette,
  ShieldCheck,
  Smartphone,
  TabletSmartphone,
  type LucideProps,
} from 'lucide-react'
import type { IconName } from '../data/content'

const icons: Record<IconName, ComponentType<LucideProps>> = {
  android: TabletSmartphone,
  monitor: Monitor,
  code: CodeXml,
  database: Database,
  git: GitBranch,
  cloud: Cloud,
  brain: BrainCircuit,
  shield: ShieldCheck,
  cpu: Cpu,
  smartphone: Smartphone,
  palette: Palette,
}

/** Maps an icon name from content.ts to a lucide-react icon. */
export function Icon({ name, className = 'h-5 w-5' }: { name: IconName; className?: string }) {
  const Component = icons[name]
  return <Component className={className} aria-hidden="true" />
}

/** Icon inside the standard rounded tile used on cards. */
export function IconTile({ name, size = 'md' }: { name: IconName; size?: 'md' | 'lg' }) {
  return (
    <span
      className={`grid shrink-0 place-items-center rounded-xl border border-border bg-surface-2 text-primary-soft ${
        size === 'lg' ? 'h-12 w-12' : 'h-11 w-11'
      }`}
    >
      <Icon name={name} className={size === 'lg' ? 'h-6 w-6' : 'h-5 w-5'} />
    </span>
  )
}
