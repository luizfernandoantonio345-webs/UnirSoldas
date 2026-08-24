import { Section } from '@/components/ui/Section';
import { Reveal } from '@/components/ui/Reveal';
import { stats, type Stat } from '@/data/stats';
import { useCountUp } from '@/hooks/useCountUp';

function StatCard({ stat }: { stat: Stat }) {
  const isNumeric = typeof stat.value === 'number';
  const { ref, value } = useCountUp(isNumeric ? (stat.value as number) : 0);
  const Icon = stat.icon;

  return (
    <div className="group relative overflow-hidden bg-ink p-[28px_20px] transition-all duration-300 hover:bg-plate hover:[box-shadow:inset_0_1px_0_rgba(255,133,52,0.18),0_0_40px_rgba(226,104,29,0.07)] md:p-[40px_28px]">
      <span
        className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-brand to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        aria-hidden="true"
      />
      <Icon
        className="mb-3 h-6 w-6 text-brand/60 transition-colors duration-300 group-hover:text-brand-hi md:mb-4 md:h-7 md:w-7"
        strokeWidth={1.5}
      />
      <span
        ref={ref}
        className="block font-display text-[clamp(2rem,5vw,3.6rem)] leading-none text-brand-hi"
      >
        {isNumeric ? `${value}${stat.suffix ?? ''}` : stat.value}
      </span>
      <span className="mt-2 block font-cond text-xs uppercase tracking-wide text-steel-light md:mt-2.5 md:text-sm">
        {stat.label}
      </span>
    </div>
  );
}

export function Stats() {
  return (
    <Section label="Números da empresa" className="py-[70px] md:py-[110px]">
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
