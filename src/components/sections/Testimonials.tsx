import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';
import { testimonials } from '@/data/testimonials';

export function Testimonials() {
  return (
    <Section id="depoimentos" className="bg-ink">
      <Reveal>
        <SectionHeading
          eyebrow="Depoimentos"
          title="Quem trabalhou, aprovou."
          subtitle="A palavra de quem contratou e viu o resultado em campo."
        />
      </Reveal>
      <div className="mt-[60px] grid grid-cols-1 gap-px border border-line bg-line md:grid-cols-3">
        {testimonials.map((t, i) => (
          <Reveal key={t.author} delay={i * 0.12}>
            <figure className="relative overflow-hidden bg-charcoal p-[36px_30px] transition-colors duration-300 hover:bg-plate">
              {/* Decorative quote mark */}
              <span
                className="absolute left-5 top-4 select-none font-display text-[80px] leading-none text-brand/15"
                aria-hidden="true"
              >
                "
              </span>
              <blockquote className="relative z-[1] text-[15px] italic leading-relaxed text-steel-light">
                {t.quote}
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3">
                <span className="flex h-9 w-9 flex-none items-center justify-center rounded-full bg-brand/20 font-cond text-sm uppercase text-brand-ember">
                  {t.author.charAt(0)}
                </span>
                <div>
                  <p className="font-cond text-[17px] uppercase text-paper">{t.author}</p>
                  <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-steel">
                    {t.role} · {t.company}
                  </p>
                </div>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
