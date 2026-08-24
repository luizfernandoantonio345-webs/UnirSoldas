/** Configuração central do site — um único lugar para editar contato e CTA. */
export const site = {
  name: 'UnirSoldas',
  tagline: 'Montagem Industrial · Tudo em Aço',
  // TODO: trocar pelo número real (formato internacional, só dígitos)
  whatsapp: '5500000000000',
  whatsappMessage: 'Olá, quero um orçamento com a UnirSoldas',
  email: 'contato@unirsoldas.com.br',
  phoneDisplay: '(31) 00000-0000',
  location: 'Belo Horizonte / Ibirité — MG',
  hours: 'Seg a Sáb · 7h às 18h',
} as const;

export const whatsappUrl = (message: string = site.whatsappMessage): string =>
  `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
