import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';
import { gallery } from '@/data/gallery';
import { cn } from '@/lib/cn';

export function Gallery() {
  return (
    <Section id="trabalhos">
      <Reveal>
        <SectionHeading
          eyebrow="Trabalhos"
          title="Aço em movimento, na prática."
          subtitle="Uma amostra do tipo de serviço que entra e sai da oficina. Substitua pelas fotos das suas próprias obras."
        />
      </Reveal>
      <Reveal>
        <div className="mt-[60px] grid auto-rows-[200px] grid-cols-2 gap-3.5 md:grid-cols-4">
          {gallery.map((item) => (
            <figure
              key={item.src}
              className={cn(
                'group relative overflow-hidden rounded-[3px] border border-line',
                item.span === 'wide' && 'col-span-2',
                item.span === 'tall' && 'col-span-2 row-span-2 md:col-span-2',
              )}
            >
              <img
                src={item.src}
                alt={item.alt}
                loading="lazy"
                className="h-full w-full object-cover contrast-[1.05] grayscale-[25%] transition-all duration-500 group-hover:scale-105 group-hover:grayscale-0"
              />
              <figcaption className="absolute inset-x-0 bottom-0 translate-y-2 bg-[linear-gradient(transparent,rgba(8,9,10,0.9))] p-5 font-cond text-[15px] uppercase tracking-wide text-paper opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100">
                {item.caption}
              </figcaption>
            </figure>
          ))}
        </div>
      </Reveal>
    </Section>
  );
}
