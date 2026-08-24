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
      <h2 className="max-w-[20ch] font-cond text-[clamp(2.2rem,4.6vw,3.6rem)] uppercase leading-none text-paper">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-[18px] max-w-[56ch] text-base text-steel">{subtitle}</p>
      )}
    </header>
  );
}
