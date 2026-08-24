/** Configuração central do site — um único lugar para editar contato e CTA. */
export const site = {
  name: 'UnirSoldas',
  tagline: 'Montagem Industrial · Tudo em Aço',
  whatsapp: '5531994052953',
  whatsappMessage: 'Olá, quero um orçamento com a UnirSoldas',
  email: 'contato@unirsoldas.com.br',
  phoneDisplay: '(31) 99405-2953',
  location: 'Belo Horizonte / Ibirité — MG',
  hours: 'Seg a Sáb · 7h às 18h',
} as const;

export const whatsappUrl = (message: string = site.whatsappMessage): string =>
  `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
