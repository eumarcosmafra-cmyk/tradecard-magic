import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SEOHead } from "@/components/SEOHead";
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
    a: "Os Eternos 22 são uma homenagem especial aos heróis da Argentina campeã do mundo em 2022. São 3 cards (números #628, #629 e #630), divididos por posição: Defensores, Meio-campistas e Atacantes.",
  },
  {
    q: "Os produtos da Bella Figurinha são originais?",
    a: "Sim! A Bella Figurinha é distribuidor oficial Panini. Todos os produtos são 100% originais, lacrados de fábrica e licenciados pela FIFA.",
  },
  {
    q: "Vocês enviam para todo o Brasil?",
    a: "Sim, realizamos envios para todos os estados do Brasil. O frete é calculado no checkout e oferecemos frete grátis em kits selecionados.",
  },
  {
    q: "Quando os produtos em pré-venda serão enviados?",
    a: "Produtos em pré-venda serão despachados assim que chegarem ao nosso estoque. Você receberá um e-mail com rastreamento assim que seu pedido for enviado.",
  },
  {
    q: "Quais formas de pagamento vocês aceitam?",
    a: "Aceitamos cartão de crédito, PIX, boleto bancário e outras formas de pagamento através da nossa plataforma segura de checkout.",
  },
  {
    q: "Como faço para trocar ou devolver um produto?",
    a: "Consulte nossa Política de Trocas e Devoluções para informações detalhadas. Em resumo, aceitamos devoluções em até 7 dias após o recebimento, desde que o produto esteja lacrado e em perfeito estado.",
  },
  {
    q: "Como entro em contato com a Bella Figurinha?",
    a: "Você pode entrar em contato pelo WhatsApp (47) 9 9286-1752, e-mail contato@bellafigurinha.com.br, ou através da nossa página de Contato.",
  },
];

const FAQ = () => (
  <div className="min-h-screen bg-background">
    <SEOHead
      title="Perguntas Frequentes (FAQ) | Bella Figurinha"
      description="Perguntas frequentes sobre figurinhas e cards Panini FIFA World Cup 2026. Tire suas dúvidas sobre envio, pagamento, produtos e mais."
      canonical="https://bellafigurinha.com.br/perguntas-frequentes"
    />
    <Header />

    <main className="container mx-auto px-4 pt-28 pb-20 max-w-3xl">
      <div className="text-center mb-12">
        <span className="inline-block bg-secondary/10 text-secondary font-display text-sm tracking-widest uppercase px-4 py-1.5 rounded-full mb-4">
          FAQ
        </span>
        <h1 className="font-display text-4xl md:text-5xl tracking-wider uppercase text-foreground">
          Perguntas <span className="text-gradient-yellow">Frequentes</span>
        </h1>
        <p className="text-muted-foreground mt-3 font-body">Tire suas dúvidas sobre nossos produtos e serviços</p>
      </div>

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
    </main>

    <Footer />
  </div>
);

export default FAQ;
