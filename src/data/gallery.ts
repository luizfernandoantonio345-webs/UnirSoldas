export interface GalleryItem {
  readonly src: string;
  readonly alt: string;
  readonly caption: string;
  readonly span?: 'wide' | 'tall';
}

/** Trocar por fotos reais das obras da empresa. */
export const gallery: readonly GalleryItem[] = [
  {
    src: 'https://images.unsplash.com/photo-1745448797901-2a4c9d9af1c1?fm=jpg&q=75&w=1400&auto=format&fit=crop',
    alt: 'Soldador em operação com faíscas',
    caption: 'Soldagem especializada — em campo',
    span: 'tall',
  },
  {
    src: 'https://images.unsplash.com/photo-1441796522229-b3a3cb3d58fd?fm=jpg&q=75&w=900&auto=format&fit=crop',
    alt: 'Estrutura metálica em ângulo',
    caption: 'Estrutura metálica',
  },
  {
    src: 'https://images.unsplash.com/photo-1738162837408-5fbf53f0b97a?fm=jpg&q=75&w=900&auto=format&fit=crop',
    alt: 'Faíscas durante corte de metal',
    caption: 'Corte e acabamento',
  },
  {
    src: 'https://plus.unsplash.com/premium_photo-1663099422090-4215b5e3ad34?fm=jpg&q=75&w=1400&auto=format&fit=crop',
    alt: 'Estrutura de aço em construção',
    caption: 'Montagem de estrutura em obra',
    span: 'wide',
  },
] as const;
