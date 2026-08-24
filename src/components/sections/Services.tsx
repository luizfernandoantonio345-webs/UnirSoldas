import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';
import { services } from '@/data/services';

export function Services() {
  return (
    <Section id="servicos" className="pt-0">
      <Reveal>
        <SectionHeading
          eyebrow="O que fazemos"
          title={
            <>
              Seis frentes.
              <br />
              Um só padrão de acabamento.
            </>
          }
          subtitle="Cada serviço sai da mesma oficina, com o mesmo controle de qualidade — do primeiro corte à última solda."
        />
      </Reveal>
      <Reveal>
        <ul className="mt-[60px] grid grid-cols-1 gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => {
            const Icon = s.icon;
            return (
              <li
                key={s.id}
                className="group relative overflow-hidden bg-charcoal p-[42px_32px] transition-colors hover:bg-plate"
              >
                <span
                  className="absolute left-0 top-0 h-full w-[3px] origin-top scale-y-0 bg-brand transition-transform duration-300 group-hover:scale-y-100"
                  aria-hidden="true"
                />
                <span className="absolute right-8 top-7 font-mono text-xs text-[#4a4d52]">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <Icon className="mb-[26px] h-[46px] w-[46px] text-brand-hi" strokeWidth={1.5} />
                <h3 className="mb-3 font-cond text-[22px] uppercase tracking-wide text-paper">
                  {s.title}
                </h3>
                <p className="text-[14.5px] leading-relaxed text-steel">{s.description}</p>
              </li>
            );
          })}
        </ul>
      </Reveal>
    </Section>
  );
}
