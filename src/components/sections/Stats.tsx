import { Section } from '@/components/ui/Section';
import { Reveal } from '@/components/ui/Reveal';
import { stats, type Stat } from '@/data/stats';
import { useCountUp } from '@/hooks/useCountUp';

function StatCard({ stat }: { stat: Stat }) {
  const isNumeric = typeof stat.value === 'number';
  const { ref, value } = useCountUp(isNumeric ? (stat.value as number) : 0);
  return (
    <div className="bg-ink p-[40px_28px]">
      <span
        ref={ref}
        className="block font-display text-[clamp(2.6rem,5vw,3.6rem)] leading-none text-brand-hi"
      >
        {isNumeric ? `${value}${stat.suffix ?? ''}` : stat.value}
      </span>
      <span className="mt-2.5 block font-cond text-sm uppercase tracking-wide text-steel-light">
        {stat.label}
      </span>
    </div>
  );
}

export function Stats() {
  return (
    <Section label="Números da empresa" className="py-[110px]">
      <Reveal>
        <div className="grid grid-cols-2 gap-px border border-line bg-line md:grid-cols-4">
          {stats.map((s) => (
            <StatCard key={s.label} stat={s} />
          ))}
        </div>
      </Reveal>
    </Section>
  );
}
