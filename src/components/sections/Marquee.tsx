import { services } from '@/data/services';

export function Marquee() {
  const items = [...services, ...services];
  return (
    <div className="overflow-hidden border-y border-line bg-ink py-5" aria-hidden="true">
      <div className="flex w-max animate-scroll gap-[60px] whitespace-nowrap motion-reduce:animate-none">
        {items.map((s, i) => (
          <span
            key={`${s.id}-${i}`}
            className="flex items-center gap-[60px] font-cond text-2xl uppercase tracking-wide text-steel after:text-xs after:text-brand after:content-['◆']"
          >
            {s.title}
          </span>
        ))}
      </div>
    </div>
  );
}
