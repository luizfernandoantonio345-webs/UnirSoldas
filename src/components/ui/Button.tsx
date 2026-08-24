import { forwardRef } from 'react';
import type { ButtonHTMLAttributes, AnchorHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/cn';

type Variant = 'primary' | 'ghost' | 'dark';

const base =
  'inline-flex items-center justify-center gap-2 font-cond font-semibold uppercase tracking-wide text-base px-6 py-3 rounded-[2px] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-hi focus-visible:ring-offset-2 focus-visible:ring-offset-black disabled:opacity-50 disabled:pointer-events-none';

const variants: Record<Variant, string> = {
  primary: 'bg-brand text-black hover:bg-brand-hi hover:-translate-y-0.5 hover:shadow-[0_6px_26px_rgba(255,133,52,0.42)]',
  ghost: 'border border-[#3a3d42] text-paper hover:border-brand-hi hover:text-brand-hi',
  dark: 'bg-black text-paper hover:bg-[#000] hover:-translate-y-0.5',
};

interface CommonProps {
  variant?: Variant;
  children: ReactNode;
  className?: string;
}

type ButtonProps = CommonProps & ButtonHTMLAttributes<HTMLButtonElement> & { as?: 'button' };
type LinkProps = CommonProps & AnchorHTMLAttributes<HTMLAnchorElement> & { as: 'a' };

export type ButtonOrLinkProps = ButtonProps | LinkProps;

/**
 * Botão polimórfico: renderiza <button> ou <a> (as="a").
 * Foco visível por teclado garantido via ring — requisito de acessibilidade.
 */
export const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonOrLinkProps>(
  ({ variant = 'primary', className, children, ...props }, ref) => {
    const classes = cn(base, variants[variant], className);
    if (props.as === 'a') {
      const { as, ...rest } = props;
      void as;
      return (
        <a ref={ref as React.Ref<HTMLAnchorElement>} className={classes} {...rest}>
          {children}
        </a>
      );
    }
    const { as, ...rest } = props as ButtonProps;
    void as;
    return (
      <button ref={ref as React.Ref<HTMLButtonElement>} className={classes} {...rest}>
        {children}
      </button>
    );
  },
);
Button.displayName = 'Button';
