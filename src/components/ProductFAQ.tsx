import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqItems = [
  {
    q: "Quantos cards vêm em cada envelope?",
    a: "Cada envelope contém 8 cards oficiais da coleção FIFA World Cup 2026™ Adrenalyn XL™, além de 1 cupom exclusivo para resgate de benefícios em paniniAdrenalyn.com.",
  },
  {
    q: "O que vem na caixa de 100 envelopes?",
    a: "A caixa contém 100 envelopes lacrados com 8 cards cada, totalizando 800 cards + 100 cupons digitais. Todos são originais e lacrados de fábrica.",
  },
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
  {
    q: "Quando o produto estará disponível para envio?",
    a: "Este produto está em pré-venda. O despacho ocorrerá assim que os itens chegarem ao estoque. Você receberá um e-mail com rastreamento assim que seu pedido for enviado.",
  },
];

export const ProductFAQ = () => (
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
