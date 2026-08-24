import { useState, type FormEvent } from 'react';
import { MessageCircle, Mail, MapPin, Clock } from 'lucide-react';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';
import { Button } from '@/components/ui/Button';
import { site, whatsappUrl } from '@/lib/site';
import { services } from '@/data/services';

const contactInfo = [
  { icon: MessageCircle, key: 'WhatsApp', value: site.phoneDisplay },
  { icon: Mail, key: 'E-mail', value: site.email },
  { icon: MapPin, key: 'Atendimento', value: site.location },
  { icon: Clock, key: 'Horário', value: site.hours },
];

export function Contact() {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const msg = [
      `Nome: ${data.get('nome')}`,
      `Empresa: ${data.get('empresa') || '—'}`,
      `Serviço: ${data.get('servico')}`,
      `Projeto: ${data.get('projeto')}`,
    ].join('\n');
    // Encaminha para o WhatsApp com os dados preenchidos.
    window.open(whatsappUrl(msg), '_blank', 'noopener');
    setSent(true);
  };

  return (
    <Section id="contato">
      <Reveal>
        <SectionHeading
          eyebrow="Contato"
          title="Fale sobre o seu projeto."
          subtitle="Responde mais rápido pelo WhatsApp. Se preferir, preencha os dados que retornamos com um orçamento."
        />
      </Reveal>
      <Reveal>
        <div className="mt-[56px] grid grid-cols-1 gap-11 md:grid-cols-[1.1fr_0.9fr] md:gap-16">
          <form onSubmit={handleSubmit} noValidate>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Field name="nome" label="Nome" placeholder="Seu nome" required />
              <Field name="empresa" label="Empresa" placeholder="Opcional" />
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Field name="telefone" label="WhatsApp" placeholder={site.phoneDisplay} required />
              <div className="mb-5">
                <label htmlFor="servico" className="mb-2.5 block font-mono text-[10px] uppercase tracking-[0.15em] text-steel">
                  Serviço
                </label>
                <select
                  id="servico"
                  name="servico"
                  className="w-full rounded-[2px] border border-[#303338] bg-charcoal px-[15px] py-3.5 text-sm text-paper focus:border-brand-hi focus:outline-none focus:ring-2 focus:ring-brand-hi/20"
                >
                  {services.map((s) => (
                    <option key={s.id}>{s.title}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="mb-5">
              <label htmlFor="projeto" className="mb-2.5 block font-mono text-[10px] uppercase tracking-[0.15em] text-steel">
                Descreva o projeto
              </label>
              <textarea
                id="projeto"
                name="projeto"
                required
                placeholder="Conte sobre a obra, o prazo e o local"
                className="min-h-[120px] w-full resize-y rounded-[2px] border border-[#303338] bg-charcoal px-[15px] py-3.5 text-sm text-paper focus:border-brand-hi focus:outline-none focus:ring-2 focus:ring-brand-hi/20"
              />
            </div>
            <Button type="submit" className="w-full">
              Enviar solicitação
            </Button>
            {sent && (
              <p role="status" className="mt-4 text-sm text-brand-ember">
                Abrimos o WhatsApp com a sua mensagem. Se não abriu, chame no{' '}
                {site.phoneDisplay}.
              </p>
            )}
          </form>

          <address className="not-italic">
            {contactInfo.map((c, i) => {
              const Icon = c.icon;
              return (
                <div
                  key={c.key}
                  className={`flex gap-4 py-[22px] ${i < contactInfo.length - 1 ? 'border-b border-line' : ''}`}
                >
                  <span className="flex h-11 w-11 flex-none items-center justify-center rounded-[2px] border border-[#303338] text-brand-hi">
                    <Icon className="h-[18px] w-[18px]" />
                  </span>
                  <div>
                    <p className="mb-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-steel">
                      {c.key}
                    </p>
                    <p className="font-cond text-[19px] text-paper">{c.value}</p>
                  </div>
                </div>
              );
            })}
          </address>
        </div>
      </Reveal>
    </Section>
  );
}

interface FieldProps {
  name: string;
  label: string;
  placeholder?: string;
  required?: boolean;
}

function Field({ name, label, placeholder, required }: FieldProps) {
  return (
    <div className="mb-5">
      <label htmlFor={name} className="mb-2.5 block font-mono text-[10px] uppercase tracking-[0.15em] text-steel">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type="text"
        required={required}
        placeholder={placeholder}
        className="w-full rounded-[2px] border border-[#303338] bg-charcoal px-[15px] py-3.5 text-sm text-paper focus:border-brand-hi focus:outline-none focus:ring-2 focus:ring-brand-hi/20"
      />
    </div>
  );
}
