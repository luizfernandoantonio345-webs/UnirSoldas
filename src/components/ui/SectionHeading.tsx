interface SectionHeadingProps {
  eyebrow: string;
  title: React.ReactNode;
  subtitle?: string;
}

export function SectionHeading({ eyebrow, title, subtitle }: SectionHeadingProps) {
  return (
    <header>
      <p className="mb-4 font-mono text-xs uppercase tracking-[0.18em] text-brand-hi">
        {eyebrow}
      </p>
      <h2 className="font-cond text-[clamp(1.8rem,5vw,3.6rem)] uppercase leading-[1.05] text-paper">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-[18px] max-w-[56ch] text-[15px] leading-relaxed text-steel md:text-base">
          {subtitle}
        </p>
      )}
    </header>
  );
}
