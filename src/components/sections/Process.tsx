import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';
import { processSteps } from '@/data/process';

export function Process() {
  return (
    <Section id="processo" className="bg-ink">
      <Reveal>
        <SectionHeading
          eyebrow="Como trabalhamos"
          title="Do desenho ao aço montado."
          subtitle="Um fluxo direto, sem etapa escondida. Você sabe onde a obra está o tempo todo."
        />
      </Reveal>
      <Reveal>
        <ol className="mt-10 grid grid-cols-1 gap-px border border-line bg-line sm:grid-cols-2 md:mt-16 md:grid-cols-4">
          {processSteps.map((s) => (
            <li key={s.step} className="bg-ink px-[20px] py-[28px] md:border-t-2 md:border-line md:bg-transparent md:px-0 md:py-[34px] md:pr-[30px]">
              <span className="mb-4 flex h-[34px] w-[34px] items-center justify-center rounded-full bg-brand-hi font-display text-[15px] text-black md:-mt-[17px] md:mb-5">
                {s.step}
              </span>
              <h3 className="mb-2 font-cond text-lg uppercase text-paper md:mb-2.5 md:text-xl">{s.title}</h3>
              <p className="text-[13px] leading-relaxed text-steel md:text-sm">{s.description}</p>
            </li>
          ))}
        </ol>
      </Reveal>
    </Section>
  );
}
