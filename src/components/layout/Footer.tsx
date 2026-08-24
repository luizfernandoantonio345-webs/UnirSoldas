import { site } from '@/lib/site';
import logo from '@/assets/logo.jpg';

const links = [
  { href: '#servicos', label: 'Serviços' },
  { href: '#processo', label: 'Processo' },
  { href: '#porque', label: 'Por que nós' },
  { href: '#trabalhos', label: 'Trabalhos' },
  { href: '#contato', label: 'Contato' },
];

export function Footer() {
  return (
    <>
      <div className="border-y border-line bg-ink">
        <div className="mx-auto flex max-w-content flex-wrap items-center justify-center gap-4 px-[20px] py-[22px] md:gap-6 md:px-[26px] md:py-[26px]">
          {['Qualidade', 'Segurança', 'Compromisso'].map((p, i) => (
            <span key={p} className="flex items-center gap-4 md:gap-6">
              <span className="font-cond text-sm uppercase tracking-[0.14em] text-steel-light md:text-base md:tracking-[0.16em]">
                {p}
              </span>
              {i < 2 && <span className="text-brand-hi text-xs">◆</span>}
            </span>
          ))}
        </div>
      </div>
      <footer className="py-10 md:py-14">
        <div className="mx-auto max-w-content px-[20px] md:px-[26px]">
          <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between md:gap-[30px]">
            <div>
              <img src={logo} alt={site.name} className="mb-[12px] h-10 md:mb-[14px] md:h-11" />
              <p className="max-w-[36ch] text-[13px] leading-relaxed text-steel">
                Montagem industrial e estruturas metálicas em Belo Horizonte e região.
                Tudo em aço, do projeto à entrega.
              </p>
            </div>
            <nav aria-label="Rodapé">
              <ul className="grid grid-cols-2 gap-x-8 gap-y-3 sm:flex sm:flex-wrap sm:gap-[26px]">
                {links.map((l) => (
                  <li key={l.href}>
                    <a
                      href={l.href}
                      className="font-cond text-[15px] uppercase tracking-wide text-steel transition-colors hover:text-brand-hi"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
          <div className="mt-8 flex flex-col gap-3 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between md:mt-9">
            <p className="text-[12px] text-[#4a4d52] md:text-[12.5px]">
              © {new Date().getFullYear()} {site.name} — Montagem Industrial · Tudo em Aço.
              Todos os direitos reservados.
            </p>
            <a
              href="https://www.instagram.com/luuiz.dev/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-[#4a4d52] transition-colors hover:text-brand-hi"
            >
              Desenvolvido por{' '}
              <span className="text-brand/70 hover:text-brand-hi">@luuiz.dev</span>
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
