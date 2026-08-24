import emailjs from '@emailjs/browser';

export interface ContactPayload {
  nome: string;
  empresa: string;
  telefone: string;
  servico: string;
  projeto: string;
  [key: string]: string;
}

export const sendContactEmail = (data: ContactPayload): Promise<void> =>
  emailjs
    .send(
      import.meta.env.VITE_EMAILJS_SERVICE_ID as string,
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string,
      data,
      import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string,
    )
    .then(() => undefined);
