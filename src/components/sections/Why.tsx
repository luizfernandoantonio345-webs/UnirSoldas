import { BadgeCheck, ShieldCheck, Clock } from 'lucide-react';
import { Reveal } from '@/components/ui/Reveal';

const pillars = [
  {
    icon: BadgeCheck,
    title: 'Qualidade',
    text: 'Solda testada, material com procedência e um acabamento igual do primeiro ao último projeto.',
  },
  {
    icon: ShieldCheck,
    title: 'Segurança',
    text: 'Equipe treinada em NR-10, NR-35 e NR-12. Nenhuma obra começa sem análise de risco documentada.',
  },
  {
    icon: Clock,
    title: 'Compromisso',
    text: 'Prazo combinado é prazo entregue. Você acompanha o andamento da obra do início ao fim.',
  },
];

export function Why() {
  return (
    <section id="porque" className="relative z-[2]">
      <Reveal>
        <div className="grid grid-cols-1 items-stretch md:grid-cols-2">
          <div
            className="relative min-h-[440px] bg-cover bg-center contrast-[1.05] grayscale-[20%] after:absolute after:inset-0 after:bg-[linear-gradient(90deg,transparent_60%,#0e0f11)] after:content-['']"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1738162837408-5fbf53f0b97a?fm=jpg&q=75&w=1400&auto=format&fit=crop')",
            }}
            role="img"
            aria-label="Faíscas durante trabalho de soldagem"
          />
          <div className="bg-ink px-[26px] py-[50px] md:px-[60px] md:py-[70px]">
            <p className="mb-4 font-mono text-xs uppercase tracking-[0.18em] text-brand-hi">
              Por que a UnirSoldas
            </p>
            <h2 className="max-w-[20ch] font-cond text-[clamp(1.9rem,3.4vw,2.6rem)] uppercase leading-none text-paper">
              Três coisas que não negociamos.
            </h2>
            <ul className="mt-[30px]">
              {pillars.map((p, i) => {
                const Icon = p.icon;
                return (
                  <li
                    key={p.title}
                    className={`flex gap-5 py-[26px] ${i < pillars.length - 1 ? 'border-b border-line' : ''}`}
                  >
                    <span className="flex h-[38px] w-[38px] flex-none items-center justify-center rounded-[2px] border border-brand text-brand-hi">
                      <Icon className="h-[18px] w-[18px]" />
                    </span>
                    <div>
                      <h3 className="mb-1.5 font-cond text-xl uppercase text-paper">{p.title}</h3>
                      <p className="text-sm leading-relaxed text-steel">{p.text}</p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
