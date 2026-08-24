import { MessageCircle } from 'lucide-react';
import { whatsappUrl } from '@/lib/site';

export function WhatsAppFab() {
  return (
    <a
      href={whatsappUrl()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar no WhatsApp"
      className="fixed bottom-6 right-6 z-[60] flex h-14 w-14 items-center justify-center rounded-full bg-[#25d366] shadow-[0_6px_24px_rgba(37,211,102,0.45)] transition-transform hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
    >
      <MessageCircle className="h-7 w-7 text-white" />
    </a>
  );
}
