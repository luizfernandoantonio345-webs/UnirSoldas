import { Button } from '@/components/ui/Button';
import { EmberCanvas } from '@/components/ui/EmberCanvas';
import { site, whatsappUrl } from '@/lib/site';

const heroLines = ['Estrutura que', 'aguenta o peso', 'do seu projeto.'];

export function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-screen items-center overflow-hidden pb-[70px] pt-[120px]"
    >
      {/* fundo */}
      <div
        className="absolute inset-0 -z-20 bg-cover bg-[center_28%] brightness-[0.8] contrast-[1.08] grayscale-[30%]"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1745448797901-2a4c9d9af1c1?fm=jpg&q=72&w=2000&auto=format&fit=crop')",
        }}
      />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(95deg,rgba(8,9,10,0.98)_26%,rgba(8,9,10,0.7)_55%,rgba(8,9,10,0.25)_82%,rgba(8,9,10,0.55)_100%)]" />
      <EmberCanvas className="absolute inset-0 -z-[5] h-full w-full" />

      <div className="relative z-[2] mx-auto w-full max-w-content px-[26px]">
        <p className="mb-[26px] inline-flex items-center gap-3 font-mono text-xs uppercase tracking-[0.18em] text-brand-ember before:h-0.5 before:w-[34px] before:bg-brand-hi before:content-['']">
          {site.tagline}
        </p>
        <h1 className="max-w-[16ch] font-display text-[clamp(3rem,9vw,7rem)] uppercase leading-none text-paper">
          {heroLines.map((line, i) => (
            <span key={line} className="block overflow-hidden">
              <span
                className="block motion-safe:animate-slide-up motion-safe:[transform:translateY(105%)]"
                style={{ animationDelay: `${0.15 + i * 0.13}s` }}
              >
                {line === 'aguenta o peso' ? (
                  <>
                    aguenta o <span className="text-brand-hi">peso</span>
                  </>
                ) : (
                  line
                )}
              </span>
            </span>
          ))}
        </h1>
        <p className="my-[30px] max-w-[52ch] text-[clamp(16px,1.5vw,19px)] text-steel-light">
          Estruturas metálicas, tubulações, plataformas e soldagem especializada em Belo
          Horizonte e região. Do desenho à montagem em campo — com segurança documentada em
          cada solda.
        </p>
        <div className="flex flex-wrap gap-4">
          <Button as="a" href={whatsappUrl()} target="_blank" rel="noopener noreferrer">
            Solicitar orçamento
          </Button>
          <Button as="a" href="#trabalhos" variant="ghost">
            Ver trabalhos
          </Button>
        </div>
      </div>
    </section>
  );
}
