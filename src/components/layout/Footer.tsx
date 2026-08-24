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
        <div className="mx-auto flex max-w-content flex-wrap items-center justify-center gap-6 px-[26px] py-[26px]">
          {['Qualidade', 'Segurança', 'Compromisso'].map((p, i) => (
            <span key={p} className="flex items-center gap-6">
              <span className="font-cond text-base uppercase tracking-[0.16em] text-steel-light">
                {p}
              </span>
              {i < 2 && <span className="text-brand-hi">◆</span>}
            </span>
          ))}
        </div>
      </div>
      <footer className="py-14">
        <div className="mx-auto max-w-content px-[26px]">
          <div className="flex flex-wrap items-start justify-between gap-[30px]">
            <div>
              <img src={logo} alt={site.name} className="mb-[14px] h-11" />
              <p className="max-w-[36ch] text-[13px] leading-relaxed text-steel">
                Montagem industrial e estruturas metálicas em Belo Horizonte e região.
                Tudo em aço, do projeto à entrega.
              </p>
            </div>
            <nav aria-label="Rodapé">
              <ul className="flex flex-wrap gap-[26px]">
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
          <div className="mt-9 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-6">
            <p className="text-[12.5px] text-[#4a4d52]">
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
