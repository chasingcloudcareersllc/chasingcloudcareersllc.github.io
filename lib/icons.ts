import {
  Compass,
  Monitor,
  Cpu,
  Terminal,
  PenTool,
  FileCode,
  Code,
  GitBranch,
  Network,
  RefreshCw,
  Container,
  Ship,
  Blocks,
  Plug,
  Shield,
  Layers,
  Database,
  BrainCircuit,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

const iconRegistry: Record<string, LucideIcon> = {
  compass: Compass,
  monitor: Monitor,
  cpu: Cpu,
  terminal: Terminal,
  'pen-tool': PenTool,
  'file-code': FileCode,
  code: Code,
  'git-branch': GitBranch,
  network: Network,
  'refresh-cw': RefreshCw,
  container: Container,
  ship: Ship,
  blocks: Blocks,
  plug: Plug,
  shield: Shield,
  layers: Layers,
  database: Database,
  'brain-circuit': BrainCircuit,
}

export const defaultIcon = Blocks

export function getIcon(name?: string): LucideIcon {
  if (!name) return defaultIcon
  return iconRegistry[name] ?? defaultIcon
}
