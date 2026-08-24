import { Button } from '@/components/ui/Button';
import { whatsappUrl } from '@/lib/site';

export function CtaBand() {
  return (
    <section className="relative z-[2] overflow-hidden bg-[linear-gradient(100deg,#e2681d_0%,#c2560f_100%)] text-black">
      <div className="relative mx-auto flex max-w-content flex-wrap items-center justify-between gap-[30px] px-[26px] py-16">
        <h2 className="max-w-[18ch] font-cond text-[clamp(1.8rem,4vw,3rem)] uppercase leading-none">
          Tem um projeto em aço? A gente resolve.
        </h2>
        <Button as="a" href={whatsappUrl()} target="_blank" rel="noopener noreferrer" variant="dark">
          Falar no WhatsApp
        </Button>
      </div>
    </section>
  );
}
