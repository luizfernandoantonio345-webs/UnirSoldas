import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

interface SectionProps {
  id?: string;
  className?: string;
  children: ReactNode;
  label?: string;
}

export function Section({ id, className, children, label }: SectionProps) {
  return (
    <section id={id} aria-label={label} className={cn('relative z-[2] py-[70px] md:py-[110px]', className)}>
      <div className="mx-auto w-full max-w-content px-[20px] md:px-[26px]">{children}</div>
    </section>
  );
}
