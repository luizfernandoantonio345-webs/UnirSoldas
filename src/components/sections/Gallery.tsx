import { useState, useEffect, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';
import { gallery } from '@/data/gallery';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { cn } from '@/lib/cn';

export function Gallery() {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const reduced = useReducedMotion();

  const close = useCallback(() => setActiveIdx(null), []);
  const prev = useCallback(
    () => setActiveIdx((i) => (i === null ? null : (i - 1 + gallery.length) % gallery.length)),
    [],
  );
  const next = useCallback(
    () => setActiveIdx((i) => (i === null ? null : (i + 1) % gallery.length)),
    [],
  );

  useEffect(() => {
    if (activeIdx === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [activeIdx, close, prev, next]);

  useEffect(() => {
    if (activeIdx !== null) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [activeIdx]);

  const imgVariants = reduced
    ? {}
    : { initial: { scale: 0.88, opacity: 0 }, animate: { scale: 1, opacity: 1 }, exit: { scale: 0.88, opacity: 0 } };

  return (
    <Section id="trabalhos">
      <Reveal>
        <SectionHeading
          eyebrow="Trabalhos"
          title="Aço em movimento, na prática."
          subtitle="Uma amostra do tipo de serviço que entra e sai da oficina. Clique em uma foto para ampliar."
        />
      </Reveal>
      <Reveal>
        <div className="mt-[60px] grid auto-rows-[200px] grid-cols-2 gap-3.5 md:grid-cols-4">
          {gallery.map((item, i) => (
            <figure
              key={item.src}
              role="button"
              tabIndex={0}
              aria-label={`Ampliar: ${item.caption}`}
              onClick={() => setActiveIdx(i)}
              onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setActiveIdx(i)}
              className={cn(
                'group relative cursor-pointer overflow-hidden rounded-[3px] border border-line focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-hi',
                item.span === 'wide' && 'col-span-2',
                item.span === 'tall' && 'col-span-2 row-span-2 md:col-span-2',
              )}
            >
              <img
                src={item.src}
                alt={item.alt}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover contrast-[1.05] grayscale-[25%] transition-all duration-500 group-hover:scale-105 group-hover:grayscale-0"
              />
              <figcaption className="absolute inset-x-0 bottom-0 translate-y-2 bg-[linear-gradient(transparent,rgba(8,9,10,0.9))] p-5 font-cond text-[15px] uppercase tracking-wide text-paper opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100">
                {item.caption}
              </figcaption>
            </figure>
          ))}
        </div>
      </Reveal>

      {/* Lightbox */}
      <AnimatePresence>
        {activeIdx !== null && (
          <motion.div
            className="fixed inset-0 z-[90] flex items-center justify-center bg-black/92 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={close}
          >
            <motion.figure
              className="relative flex max-h-[90vh] max-w-[90vw] flex-col items-center"
              onClick={(e) => e.stopPropagation()}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              {...imgVariants}
            >
              <img
                src={gallery[activeIdx].src}
                alt={gallery[activeIdx].alt}
                className="max-h-[80vh] w-auto rounded-[3px] shadow-2xl"
              />
              <figcaption className="mt-3 self-start font-cond text-sm uppercase tracking-wide text-steel-light">
                {gallery[activeIdx].caption}
              </figcaption>
            </motion.figure>

            {/* Close */}
            <button
              onClick={close}
              aria-label="Fechar"
              className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-line bg-black/60 text-steel-light hover:border-brand hover:text-brand-hi"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Prev */}
            <button
              onClick={(e) => { e.stopPropagation(); prev(); }}
              aria-label="Anterior"
              className="absolute left-4 top-1/2 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full border border-line bg-black/60 text-steel-light hover:border-brand hover:text-brand-hi"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>

            {/* Next */}
            <button
              onClick={(e) => { e.stopPropagation(); next(); }}
              aria-label="Próximo"
              className="absolute right-4 top-1/2 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full border border-line bg-black/60 text-steel-light hover:border-brand hover:text-brand-hi"
            >
              <ChevronRight className="h-6 w-6" />
            </button>

            {/* Counter */}
            <p className="absolute bottom-4 left-1/2 -translate-x-1/2 font-mono text-[10px] uppercase tracking-[0.15em] text-steel">
              {activeIdx + 1} / {gallery.length}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  );
}
