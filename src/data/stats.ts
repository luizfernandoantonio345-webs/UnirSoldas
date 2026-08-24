export interface Stat {
  readonly value: number | string;
  readonly suffix?: string;
  readonly label: string;
}

export const stats: readonly Stat[] = [
  { value: 150, suffix: '+', label: 'Obras entregues' },
  { value: 12, suffix: ' anos', label: 'De experiência' },
  { value: 100, suffix: '%', label: 'Aço e mão de obra própria' },
  { value: 'NR-35', label: 'Norma de segurança' },
] as const;
