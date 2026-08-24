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
        <ol className="mt-16 grid grid-cols-1 md:grid-cols-4">
          {processSteps.map((s) => (
            <li key={s.step} className="border-t-2 border-line py-[34px] pr-[30px]">
              <span className="-mt-[17px] mb-5 flex h-[34px] w-[34px] items-center justify-center rounded-full bg-brand-hi font-display text-[15px] text-black">
                {s.step}
              </span>
              <h3 className="mb-2.5 font-cond text-xl uppercase text-paper">{s.title}</h3>
              <p className="text-sm leading-relaxed text-steel">{s.description}</p>
            </li>
          ))}
        </ol>
      </Reveal>
    </Section>
  );
}
