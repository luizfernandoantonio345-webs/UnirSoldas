export interface ProcessStep {
  readonly step: number;
  readonly title: string;
  readonly description: string;
}

export const processSteps: readonly ProcessStep[] = [
  { step: 1, title: 'Levantamento', description: 'Visita técnica, medições e entendimento do que a operação realmente precisa.' },
  { step: 2, title: 'Projeto e orçamento', description: 'Detalhamento, lista de materiais e prazo fechado antes de qualquer corte.' },
  { step: 3, title: 'Fabricação', description: 'Corte, dobra e soldagem na oficina, com controle de qualidade em cada peça.' },
  { step: 4, title: 'Montagem em campo', description: 'Instalação segura no local, com análise de risco e entrega documentada.' },
] as const;
