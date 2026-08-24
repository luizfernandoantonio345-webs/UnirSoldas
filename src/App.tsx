import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { WhatsAppFab } from '@/components/layout/WhatsAppFab';
import { Hero } from '@/components/sections/Hero';
import { Marquee } from '@/components/sections/Marquee';
import { Stats } from '@/components/sections/Stats';
import { Services } from '@/components/sections/Services';
import { Process } from '@/components/sections/Process';
import { Why } from '@/components/sections/Why';
import { Gallery } from '@/components/sections/Gallery';
import { CtaBand } from '@/components/sections/CtaBand';
import { Contact } from '@/components/sections/Contact';

export default function App() {
  return (
    <>
      {/* Link de pular navegação — acessibilidade por teclado. */}
      <a
        href="#top"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded focus:bg-brand focus:px-4 focus:py-2 focus:text-black"
      >
        Pular para o conteúdo
      </a>
      <Header />
      <main>
        <Hero />
        <Marquee />
        <Stats />
        <Services />
        <Process />
        <Why />
        <Gallery />
        <CtaBand />
        <Contact />
      </main>
      <Footer />
      <WhatsAppFab />
    </>
  );
}
