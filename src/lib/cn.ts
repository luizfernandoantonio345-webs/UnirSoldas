import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Une classes condicionais e resolve conflitos do Tailwind.
 * Padrão amplamente usado em design systems (shadcn/ui).
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
