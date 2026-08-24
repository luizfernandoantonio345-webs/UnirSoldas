import { services } from '@/data/services';

export function Marquee() {
  const items = [...services, ...services];
  return (
    <div className="overflow-hidden border-y border-line bg-ink py-5" aria-hidden="true">
      <div className="flex w-max animate-[scroll_26s_linear_infinite] gap-[60px] whitespace-nowrap motion-reduce:anim-none">
        {items.map((s, i) => (
          <span
            key={`${s.id}-${i}`}
            className="flex items-center gap-[60px] font-cond text-2xl uppercase tracking-wide text-steel after:text-xs after:text-brand after:content-['◆']"
          >
            {s.title}
          </span>
        ))}
      </div>
      <style>{`@keyframes scroll{to{transform:translateX(-50%)}}`}</style>
    </div>
  );
}
