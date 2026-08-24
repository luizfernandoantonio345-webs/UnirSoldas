import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/cn';
import { site, whatsappUrl } from '@/lib/site';
import logo from '@/assets/logo.jpg';

const navItems = [
  { href: '#servicos', label: 'Serviços' },
  { href: '#processo', label: 'Processo' },
  { href: '#porque', label: 'Por que nós' },
  { href: '#trabalhos', label: 'Trabalhos' },
  { href: '#contato', label: 'Contato' },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-40 border-b border-transparent transition-colors duration-300',
        scrolled && 'border-line bg-black/85 backdrop-blur-md',
      )}
    >
      <div className="mx-auto flex max-w-content items-center justify-between px-[26px] py-[14px]">
        <a href="#top" aria-label={`${site.name} — início`}>
          <img src={logo} alt={site.name} className="h-[46px] w-auto" />
        </a>
        <nav aria-label="Navegação principal" className="hidden md:block">
          <ul className="flex gap-[30px]">
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="font-cond text-base uppercase tracking-wide text-steel-light transition-colors hover:text-paper focus-visible:text-brand-hi focus-visible:outline-none"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <Button as="a" href={whatsappUrl()} target="_blank" rel="noopener noreferrer">
          Orçamento
        </Button>
      </div>
    </header>
  );
}
