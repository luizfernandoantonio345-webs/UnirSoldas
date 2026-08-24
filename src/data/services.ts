import {
  Building2,
  Waypoints,
  StretchHorizontal,
  Flame,
  Wrench,
  Settings,
  type LucideIcon,
} from 'lucide-react';

export interface Service {
  readonly id: string;
  readonly icon: LucideIcon;
  readonly title: string;
  readonly description: string;
}

export const services: readonly Service[] = [
  {
    id: 'estruturas',
    icon: Building2,
    title: 'Estruturas Metálicas',
    description:
      'Galpões, mezaninos e estruturas de sustentação dimensionados para a carga real de operação.',
  },
  {
    id: 'tubulacoes',
    icon: Waypoints,
    title: 'Tubulações Industriais',
    description:
      'Fabricação e montagem de linhas de tubulação com solda testada e rastreável.',
  },
  {
    id: 'plataformas',
    icon: StretchHorizontal,
    title: 'Plataformas e Passarelas',
    description: 'Acessos elevados e passarelas de circulação atendendo NR-12 e NR-35.',
  },
  {
    id: 'soldagem',
    icon: Flame,
    title: 'Soldagem Especializada',
    description:
      'MIG, TIG e eletrodo revestido com soldadores qualificados em aço carbono e inox.',
  },
  {
    id: 'manutencao',
    icon: Wrench,
    title: 'Manutenção Industrial',
    description:
      'Manutenção preventiva e corretiva em estruturas e equipamentos metálicos.',
  },
  {
    id: 'montagem',
    icon: Settings,
    title: 'Montagem Industrial',
    description: 'Instalação e montagem de equipamentos e linhas de produção completas.',
  },
] as const;
