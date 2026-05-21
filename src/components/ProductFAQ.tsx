import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

type FaqItem = { q: string; a: string };

/** FAQs genéricos da coleção Adrenalyn XL (compartilhados entre produtos de cards) */
const sharedFaqItems: FaqItem[] = [
  {
    q: "Quais são os 9 Golden Ballers?",
    a: "Os 9 Golden Ballers oficiais são: Messi (ARG), Vinícius Júnior (BRA), Salah (EGY), Kane (ENG), Mbappé (FRA), Son (KOR), Haaland (NOR), Ronaldo (POR) e Yamal (ESP). São os cards mais cobiçados da coleção.",
  },
  {
    q: "O que são os Eternos 22?",
    a: "Os Eternos 22 são uma homenagem especial aos heróis da Argentina campeã do mundo em 2022. São 3 cards (números #628, #629 e #630), divididos por posição: Defensores, Meio-campistas e Atacantes. O card #630 é o último e mais precioso da coleção completa de 630 itens.",
  },
  {
    q: "Como funcionam os cards bônus Team Logo e Official Emblem?",
    a: "Os Team Logos (42 cards, um por seleção) adicionam +5 pontos em todos os valores quando usados junto com um TEAM MATE da mesma seleção. O Official Emblem (1 card) dá +10 pontos em todos os valores quando combinado com qualquer TEAM MATE!",
  },
];

/** FAQs específicas do Álbum Brochura + 24 Envelopes (figurinhas/cromos) */
const albumBrochuraFaqItems: FaqItem[] = [
  {
    q: "Quantas figurinhas vêm no total?",
    a: "São 168 figurinhas no total. Cada envelope contém 7 cromos (figurinhas) e você recebe 24 envelopes lacrados. Total: 24 × 7 = 168 cromos para colar no álbum.",
  },
  {
    q: "O que vem exatamente no kit?",
    a: "O kit contém 1 álbum capa-cartão (capa dura em formato brochura) com 80 páginas para colar as figurinhas + 24 envelopes lacrados da coleção FIFA World Cup 2026™, cada um com 7 cromos. Total de 168 figurinhas.",
  },
  {
    q: "As figurinhas são autocolantes?",
    a: "Sim, todos os cromos são autocolantes (self-adhesive). Basta retirar a proteção do verso e colar no álbum, sem necessidade de cola adicional.",
  },
  {
    q: "O álbum tem espaço para toda a coleção?",
    a: "Sim. O álbum capa-cartão tem 80 páginas e acomoda toda a coleção completa da FIFA World Cup 2026™. Mesmo que o kit venha com 168 cromos, o álbum comporta todas as figurinhas da coleção para você completar depois.",
  },
  {
    q: "Posso escolher as figurinhas que vêm nos envelopes?",
    a: "Não, as figurinhas em cada envelope são sortidas e os envelopes são lacrados de fábrica. A emoção da coleção está justamente na surpresa de completar o álbum!",
  },
];

/** Gera FAQs específicos de envelope com base na quantidade do handle */
function getEnvelopeFaqItems(handle: string): FaqItem[] {
  const h = handle.toLowerCase();
  // Detecta quantidade no handle (ex: kit-10, kit-20, kit-50, kit-100)
  const match = h.match(/kit[- ]?(\d+)/);
  const qty = match ? parseInt(match[1], 10) : null;
  const totalCards = qty ? qty * 8 : null;

  const items: FaqItem[] = [
    {
      q: "Quantos cards vêm em cada envelope?",
      a: "Cada envelope contém 8 cards oficiais da coleção FIFA World Cup 2026™ Adrenalyn XL™, além de 1 cupom exclusivo para resgate de benefícios em paniniAdrenalyn.com.",
    },
  ];

  if (qty) {
    items.push({
      q: `O que vem no Kit ${qty} Envelopes?`,
      a: `O kit contém ${qty} envelopes lacrados com 8 cards cada, totalizando ${totalCards} cards + ${qty} cupons digitais. Todos são originais e lacrados de fábrica.`,
    });
  }

  return items;
}

const classicTinFaqItems: FaqItem[] = [
  {
    q: "O que vem na Lata Classic Tin?",
    a: "A Lata Classic Tin contém 8 envelopes com 8 cards cada (64 cards no total), 1 card de Edição Limitada (Limited Edition) exclusivo, e a lata colecionável em cores sortidas: Prata, Bronze, Azul ou Verde.",
  },
  {
    q: "Posso escolher a cor da Lata Classic Tin?",
    a: "Não, a cor da lata é sortida (Prata, Bronze, Azul ou Verde). O envio é aleatório conforme disponibilidade em estoque.",
  },
];

const starterPackFaqItems: FaqItem[] = [
  {
    q: "O que vem no Starter Pack?",
    a: "O Starter Pack é o kit inicial ideal e geralmente inclui: o Binder oficial (pasta com plásticos para guardar os cards), envelopes com cards base, cards de Edição Limitada exclusivos, o tabuleiro para jogar partidas físicas e o guia de regras.",
  },
  {
    q: "Preciso do Starter Pack para começar a colecionar?",
    a: "Não é obrigatório, mas é a maneira mais completa de iniciar. O Binder mantém seus cards organizados e protegidos, e o tabuleiro permite disputar partidas físicas com amigos.",
  },
];

export function getFaqItemsForHandle(handle?: string): FaqItem[] {
  const h = handle?.toLowerCase() || "";
  let specific: FaqItem[];

  if (h.includes("album-capa-cartao") || h.includes("album-brochura")) {
    specific = albumBrochuraFaqItems;
  } else if (h.includes("lata-classic-tin") || h.includes("classic-tin")) {
    specific = classicTinFaqItems;
  } else if (h.includes("starter-pack")) {
    specific = starterPackFaqItems;
  } else {
    specific = getEnvelopeFaqItems(h);
  }

  // Produtos de álbum não usam os FAQs de Adrenalyn XL (cards)
  if (h.includes("album-capa-cartao") || h.includes("album-brochura")) {
    return specific;
  }

  return [...specific, ...sharedFaqItems];
}

interface ProductFAQProps {
  productHandle?: string;
}

export const ProductFAQ = ({ productHandle }: ProductFAQProps) => {
  const faqItems = getFaqItemsForHandle(productHandle);

  return (
    <section className="mt-20">
      <div className="text-center mb-8">
        <p className="text-sm font-display tracking-widest uppercase text-primary mb-2">Dúvidas Frequentes</p>
        <h2 className="font-display text-4xl md:text-5xl tracking-wider uppercase text-foreground">Perguntas e respostas</h2>
      </div>

      <div className="max-w-3xl mx-auto">
        <Accordion type="single" collapsible className="space-y-3">
          {faqItems.map((item, i) => (
            <AccordionItem key={i} value={`faq-${i}`} className="bg-card border border-border rounded-xl px-5 data-[state=open]:border-primary/40">
              <AccordionTrigger className="font-display text-base tracking-wider uppercase text-foreground hover:no-underline py-5">
                {item.q}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground font-body leading-relaxed pb-5">
                {item.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};
