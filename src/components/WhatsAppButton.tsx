import { MessageCircle } from "lucide-react";

const WHATSAPP_NUMBER = "5511976609139";
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=Ol%C3%A1%21%20Gostaria%20de%20mais%20informa%C3%A7%C3%B5es.`;

export const WhatsAppButton = () => (
  <a
    href={WHATSAPP_URL}
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Fale conosco pelo WhatsApp"
    className="fixed bottom-6 right-6 z-[9999] flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_4px_20px_rgba(37,211,102,0.5)] transition-transform hover:scale-110 active:scale-95"
  >
    <MessageCircle size={28} fill="white" stroke="none" />
  </a>
);
