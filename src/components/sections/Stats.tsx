import { Section } from '@/components/ui/Section';
import { Reveal } from '@/components/ui/Reveal';
import { stats, type Stat } from '@/data/stats';
import { useCountUp } from '@/hooks/useCountUp';

function StatCard({ stat }: { stat: Stat }) {
  const isNumeric = typeof stat.value === 'number';
  const { ref, value } = useCountUp(isNumeric ? (stat.value as number) : 0);
  const Icon = stat.icon;

  return (
    <div className="group relative overflow-hidden bg-ink p-[40px_28px] transition-all duration-300 hover:bg-plate hover:[box-shadow:inset_0_1px_0_rgba(255,133,52,0.18),0_0_40px_rgba(226,104,29,0.07)]">
      {/* Top glow line on hover */}
      <span
        className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-brand to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        aria-hidden="true"
      />
      <Icon
        className="mb-4 h-7 w-7 text-brand/60 transition-colors duration-300 group-hover:text-brand-hi"
        strokeWidth={1.5}
      />
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
