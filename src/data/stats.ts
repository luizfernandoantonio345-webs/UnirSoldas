import type { LucideIcon } from 'lucide-react';
import { HardHat, Calendar, Factory, ShieldCheck } from 'lucide-react';

export interface Stat {
  readonly value: number | string;
  readonly suffix?: string;
  readonly label: string;
  readonly icon: LucideIcon;
}

export const stats: readonly Stat[] = [
  { value: 150, suffix: '+', label: 'Obras entregues', icon: HardHat },
  { value: 12, suffix: ' anos', label: 'De experiência', icon: Calendar },
  { value: 100, suffix: '%', label: 'Aço e mão de obra própria', icon: Factory },
  { value: 'NR-35', label: 'Norma de segurança', icon: ShieldCheck },
] as const;
