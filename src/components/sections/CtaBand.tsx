import { Button } from '@/components/ui/Button';
import { whatsappUrl } from '@/lib/site';

export function CtaBand() {
  return (
    <section className="relative z-[2] overflow-hidden bg-[linear-gradient(100deg,#e2681d_0%,#c2560f_100%)] text-black">
      <div className="relative mx-auto flex max-w-content flex-col items-center gap-6 px-[20px] py-12 text-center md:flex-row md:justify-between md:gap-[30px] md:px-[26px] md:py-16 md:text-left">
        <h2 className="font-cond text-[clamp(1.6rem,4vw,3rem)] uppercase leading-tight">
          Tem um projeto em aço? A gente resolve.
        </h2>
        <Button as="a" href={whatsappUrl()} target="_blank" rel="noopener noreferrer" variant="dark" className="w-full sm:w-auto flex-none">
          Falar no WhatsApp
        </Button>
      </div>
    </section>
  );
}
