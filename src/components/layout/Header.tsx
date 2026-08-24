import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/cn';
import { site, whatsappUrl } from '@/lib/site';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import logo from '@/assets/logo.jpg';

const navItems = [
  { href: '#servicos', label: 'Serviços' },
  { href: '#processo', label: 'Processo' },
  { href: '#porque', label: 'Por que nós' },
  { href: '#depoimentos', label: 'Depoimentos' },
  { href: '#trabalhos', label: 'Trabalhos' },
  { href: '#contato', label: 'Contato' },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  const overlayVariants = reduced
    ? {}
    : { initial: { x: '100%' }, animate: { x: 0 }, exit: { x: '100%' } };

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

        {/* Desktop nav */}
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

        <div className="flex items-center gap-3">
          <Button as="a" href={whatsappUrl()} target="_blank" rel="noopener noreferrer">
            Orçamento
          </Button>

          {/* Hamburger button — mobile only */}
          <button
            className="flex h-10 w-10 items-center justify-center rounded-[2px] border border-line text-steel-light transition-colors hover:border-brand hover:text-brand-hi md:hidden"
            aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            onClick={() => setMenuOpen((v) => !v)}
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-nav"
            role="dialog"
            aria-modal="true"
            aria-label="Menu de navegação"
            className="fixed inset-0 z-50 flex flex-col bg-black/97 backdrop-blur-md md:hidden"
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            {...overlayVariants}
          >
            {/* Close button */}
            <div className="flex items-center justify-between px-[26px] py-[14px]">
              <a href="#top" aria-label={`${site.name} — início`} onClick={closeMenu}>
                <img src={logo} alt={site.name} className="h-[46px] w-auto" />
              </a>
              <button
                className="flex h-10 w-10 items-center justify-center rounded-[2px] border border-line text-steel-light hover:border-brand hover:text-brand-hi"
                aria-label="Fechar menu"
                onClick={closeMenu}
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Nav links */}
            <nav className="flex flex-1 flex-col items-center justify-center gap-2">
              {navItems.map((item, i) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  onClick={closeMenu}
                  className="font-cond text-[clamp(2rem,8vw,3rem)] uppercase tracking-wide text-steel-light transition-colors hover:text-paper"
                  initial={reduced ? {} : { opacity: 0, y: 16 }}
                  animate={reduced ? {} : { opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.05, duration: 0.3 }}
                >
                  {item.label}
                </motion.a>
              ))}
            </nav>

            {/* Bottom CTA */}
            <div className="border-t border-line px-[26px] py-6">
              <Button
                as="a"
                href={whatsappUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full justify-center"
                onClick={closeMenu}
              >
                Solicitar orçamento
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
