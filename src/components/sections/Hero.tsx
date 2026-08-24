import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { EmberCanvas } from '@/components/ui/EmberCanvas';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { site, whatsappUrl } from '@/lib/site';

const heroLines = ['Estrutura que', 'aguenta o peso', 'do seu projeto.'];

export function Hero() {
  const reduced = useReducedMotion();
  const { scrollY } = useScroll();
  const bgY = useTransform(scrollY, [0, 600], ['0%', '18%']);

  return (
    <section
      id="top"
      className="relative flex min-h-screen items-center overflow-hidden pb-[60px] pt-[100px] md:pb-[70px] md:pt-[120px]"
    >
      {/* fundo com parallax */}
      <motion.div
        className="absolute inset-0 -z-20 bg-cover bg-[center_28%] brightness-[0.8] contrast-[1.08] grayscale-[30%]"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1745448797901-2a4c9d9af1c1?fm=webp&q=72&w=2000&auto=format&fit=crop')",
          backgroundPositionY: reduced ? undefined : bgY,
        }}
      />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(95deg,rgba(8,9,10,0.98)_26%,rgba(8,9,10,0.7)_55%,rgba(8,9,10,0.25)_82%,rgba(8,9,10,0.55)_100%)]" />
      <EmberCanvas className="absolute inset-0 -z-[5] h-full w-full" />

      <div className="relative z-[2] mx-auto w-full max-w-content px-[20px] md:px-[26px]">
        <p className="mb-[20px] inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.16em] text-brand-ember before:h-0.5 before:w-[24px] before:bg-brand-hi before:content-[''] md:mb-[26px] md:gap-3 md:text-xs md:tracking-[0.18em] md:before:w-[34px]">
          {site.tagline}
        </p>
        <h1 className="font-display text-[clamp(2.4rem,8vw,7rem)] uppercase leading-[0.95] text-paper">
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
        <p className="my-[24px] max-w-[52ch] text-[15px] leading-relaxed text-steel-light md:my-[30px] md:text-[clamp(16px,1.5vw,19px)]">
          Estruturas metálicas, tubulações, plataformas e soldagem especializada em Belo
          Horizonte e região. Do desenho à montagem em campo — com segurança documentada em
          cada solda.
        </p>
        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
          <Button as="a" href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
            Solicitar orçamento
          </Button>
          <Button as="a" href="#trabalhos" variant="ghost" className="w-full sm:w-auto">
            Ver trabalhos
          </Button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 z-[3] -translate-x-1/2 flex flex-col items-center gap-2 motion-safe:animate-bounce">
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-steel">
          Scroll
        </span>
        <ChevronDown className="h-4 w-4 text-brand-hi" />
      </div>
    </section>
  );
}
