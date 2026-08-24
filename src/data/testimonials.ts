export interface Testimonial {
  readonly quote: string;
  readonly author: string;
  readonly company: string;
  readonly role: string;
}

/** Substituir por depoimentos reais dos clientes antes do lançamento. */
export const testimonials: readonly Testimonial[] = [
  {
    quote: 'A UnirSoldas entregou a estrutura do galpão no prazo combinado e com acabamento impecável. Equipe técnica séria e comunicativa durante toda a obra.',
    author: 'Ricardo M.',
    company: 'Metalúrgica Solimões',
    role: 'Diretor de Operações',
  },
  {
    quote: 'Contratamos para a montagem das tubulações industriais. Solda de qualidade, laudo de ensaio em dia e zero acidentes no canteiro.',
    author: 'Fernanda C.',
    company: 'Indústria Química VRG',
    role: 'Coordenadora de Projetos',
  },
  {
    quote: 'Mais de três obras entregues juntos. Confiamos o serviço de manutenção preventiva porque sabemos que vem alguém que entende de aço de verdade.',
    author: 'Carlos Eduardo P.',
    company: 'Construtora Planck',
    role: 'Engenheiro Civil',
  },
] as const;
