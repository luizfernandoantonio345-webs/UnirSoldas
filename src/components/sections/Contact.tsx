import { useState, type FormEvent } from 'react';
import { AnimatePresence } from 'framer-motion';
import { MessageCircle, Mail, MapPin, Clock } from 'lucide-react';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';
import { Button } from '@/components/ui/Button';
import { Toast } from '@/components/ui/Toast';
import { useBrazilianPhone } from '@/hooks/useBrazilianPhone';
import { sendContactEmail } from '@/lib/emailjs';
import { site, whatsappUrl } from '@/lib/site';
import { services } from '@/data/services';

const contactInfo = [
  { icon: MessageCircle, key: 'WhatsApp', value: site.phoneDisplay },
  { icon: Mail, key: 'E-mail', value: site.email },
  { icon: MapPin, key: 'Atendimento', value: site.location },
  { icon: Clock, key: 'Horário', value: site.hours },
];

type FormErrors = Partial<Record<'nome' | 'telefone' | 'projeto', string>>;

interface ToastState {
  message: string;
  type: 'success' | 'error';
}

export function Contact() {
  const [sent, setSent] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [toast, setToast] = useState<ToastState | null>(null);
  const phone = useBrazilianPhone();

  const validate = (data: FormData): FormErrors => {
    const e: FormErrors = {};
    if (!String(data.get('nome')).trim()) e.nome = 'Informe seu nome.';
    if (!phone.isValid) e.telefone = 'WhatsApp inválido — use DDD + número.';
    if (!String(data.get('projeto')).trim()) e.projeto = 'Descreva o projeto brevemente.';
    return e;
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const errs = validate(data);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});

    const payload = {
      nome: String(data.get('nome')),
      empresa: String(data.get('empresa') || '—'),
      telefone: phone.value,
      servico: String(data.get('servico')),
      projeto: String(data.get('projeto')),
    };

    const msg = [
      `Nome: ${payload.nome}`,
      `Empresa: ${payload.empresa}`,
      `WhatsApp: ${payload.telefone}`,
      `Serviço: ${payload.servico}`,
      `Projeto: ${payload.projeto}`,
    ].join('\n');

    // Primary: WhatsApp redirect
    window.open(whatsappUrl(msg), '_blank', 'noopener');
    setSent(true);
    setToast({ message: 'WhatsApp aberto! Retornaremos em breve.', type: 'success' });

    // Secondary: email copy (non-blocking, silent on failure)
    sendContactEmail(payload).catch(() => undefined);
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
              <Field
                name="nome"
                label="Nome"
                placeholder="Seu nome"
                required
                error={errors.nome}
              />
              <Field name="empresa" label="Empresa" placeholder="Opcional" />
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {/* Phone field with Brazilian mask */}
              <div className="mb-5">
                <label
                  htmlFor="telefone"
                  className="mb-2.5 block font-mono text-[10px] uppercase tracking-[0.15em] text-steel"
                >
                  WhatsApp
                </label>
                <input
                  id="telefone"
                  name="telefone"
                  type="tel"
                  inputMode="numeric"
                  placeholder={site.phoneDisplay}
                  value={phone.value}
                  onChange={phone.onChange}
                  aria-invalid={!!errors.telefone}
                  aria-describedby={errors.telefone ? 'telefone-error' : undefined}
                  className="w-full rounded-[2px] border border-[#303338] bg-charcoal px-[15px] py-3.5 text-sm text-paper focus:border-brand-hi focus:outline-none focus:ring-2 focus:ring-brand-hi/20 aria-[invalid=true]:border-red-500"
                />
                {errors.telefone && (
                  <p id="telefone-error" role="alert" className="mt-1 text-xs text-red-400">
                    {errors.telefone}
                  </p>
                )}
              </div>
              <div className="mb-5">
                <label
                  htmlFor="servico"
                  className="mb-2.5 block font-mono text-[10px] uppercase tracking-[0.15em] text-steel"
                >
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
              <label
                htmlFor="projeto"
                className="mb-2.5 block font-mono text-[10px] uppercase tracking-[0.15em] text-steel"
              >
                Descreva o projeto
              </label>
              <textarea
                id="projeto"
                name="projeto"
                required
                placeholder="Conte sobre a obra, o prazo e o local"
                aria-invalid={!!errors.projeto}
                aria-describedby={errors.projeto ? 'projeto-error' : undefined}
                className="min-h-[120px] w-full resize-y rounded-[2px] border border-[#303338] bg-charcoal px-[15px] py-3.5 text-sm text-paper focus:border-brand-hi focus:outline-none focus:ring-2 focus:ring-brand-hi/20 aria-[invalid=true]:border-red-500"
              />
              {errors.projeto && (
                <p id="projeto-error" role="alert" className="mt-1 text-xs text-red-400">
                  {errors.projeto}
                </p>
              )}
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

      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={() => setToast(null)}
          />
        )}
      </AnimatePresence>
    </Section>
  );
}

interface FieldProps {
  name: string;
  label: string;
  placeholder?: string;
  required?: boolean;
  error?: string;
}

function Field({ name, label, placeholder, required, error }: FieldProps) {
  return (
    <div className="mb-5">
      <label
        htmlFor={name}
        className="mb-2.5 block font-mono text-[10px] uppercase tracking-[0.15em] text-steel"
      >
        {label}
      </label>
      <input
        id={name}
        name={name}
        type="text"
        required={required}
        placeholder={placeholder}
        aria-invalid={!!error}
        aria-describedby={error ? `${name}-error` : undefined}
        className="w-full rounded-[2px] border border-[#303338] bg-charcoal px-[15px] py-3.5 text-sm text-paper focus:border-brand-hi focus:outline-none focus:ring-2 focus:ring-brand-hi/20 aria-[invalid=true]:border-red-500"
      />
      {error && (
        <p id={`${name}-error`} role="alert" className="mt-1 text-xs text-red-400">
          {error}
        </p>
      )}
    </div>
  );
}
