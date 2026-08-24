import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

interface SectionProps {
  id?: string;
  className?: string;
  children: ReactNode;
  /** aria-label opcional para leitores de tela quando não há título visível. */
  label?: string;
}

/** Container semântico de seção com largura máxima e padding vertical padrão. */
export function Section({ id, className, children, label }: SectionProps) {
  return (
    <section id={id} aria-label={label} className={cn('relative z-[2] py-[110px]', className)}>
      <div className="mx-auto w-full max-w-content px-[26px]">{children}</div>
    </section>
  );
}
