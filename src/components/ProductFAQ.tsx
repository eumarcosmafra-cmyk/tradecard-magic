import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

type FaqItem = { q: string; a: string };

/** FAQs genéricos da coleção Adrenalyn XL (compartilhados entre todos os produtos) */
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

const preOrderFaq: FaqItem = {
  q: "Quando o produto estará disponível para envio?",
  a: "Este produto está em pré-venda. O despacho ocorrerá assim que os itens chegarem ao estoque. Você receberá um e-mail com rastreamento assim que seu pedido for enviado.",
};

const albumCapaDuraOuroFaqItems: FaqItem[] = [
  {
    q: "Este produto vem com envelopes ou figurinhas?",
    a: "Não. Este produto contém apenas o álbum oficial em capa dura com acabamento metalizado dourado. Os envelopes com figurinhas (7 cromos cada) são vendidos separadamente. Para completar a coleção, você pode comprar envelopes avulsos, kits ou caixas na Bella Figurinha.",
  },
  {
    q: "Qual a diferença entre o capa dura ouro e a versão brochura mais barata?",
    a: "O conteúdo interno é o mesmo nas duas versões: 112 páginas + capa, com espaço para os 980 cromos da coleção. A diferença está na construção do álbum. A versão brochura tem capa flexível em 4 cores e custa menos. A versão capa dura ouro tem capa rígida com acabamento metalizado dourado, indicada para colecionadores que querem preservar a edição como item de memória de longo prazo.",
  },
  {
    q: "Vale a pena pagar mais pela versão capa dura ouro?",
    a: "Depende do uso. Se você é colecionador e pretende guardar o álbum completo como peça de memória da Copa, a capa dura ouro é mais durável e tem apelo visual maior — é a versão premium da Panini. Se o álbum é para uso casual ou para a criançada colar as figurinhas, a versão brochura cumpre a função pela metade do preço.",
  },
  {
    q: "Quando o produto será enviado?",
    a: "Este produto está em pré-venda. O envio será realizado antes do início da Copa do Mundo FIFA 2026™ (11 de junho a 19 de julho de 2026).",
  },
  {
    q: "É um produto oficial Panini?",
    a: "Sim, é o álbum oficial licenciado pela FIFA e produzido pela Panini Brasil. A Bella Figurinha é distribuidora oficial Panini — todos os produtos vêm direto da editora, sem revenda de marketplace.",
  },
];

const albumCapaDuraTradicionalFaqItems: FaqItem[] = [
  {
    q: "Este produto vem com envelopes ou figurinhas?",
    a: "Não. Este produto contém apenas o álbum oficial em capa dura tradicional. Os envelopes com figurinhas (7 cromos cada) são vendidos separadamente. Para completar a coleção, você pode comprar envelopes avulsos, kits ou caixas na Bella Figurinha.",
  },
  {
    q: "Qual a diferença entre o capa dura tradicional e a versão brochura?",
    a: "O conteúdo interno é o mesmo nas duas versões: 112 páginas + capa, com espaço para os 980 cromos da coleção. A diferença é a construção: a versão brochura tem capa flexível em 4 cores, enquanto a capa dura tradicional tem capa rígida, mais resistente para o uso e armazenamento de longo prazo.",
  },
  {
    q: "Qual a diferença entre a capa dura tradicional e as versões metalizadas (ouro e prata)?",
    a: "O conteúdo interno é idêntico nas três versões — 112 páginas + capa para os 980 cromos. A diferença é puramente estética. A capa dura tradicional traz o acabamento clássico da edição em capa rígida, sem efeito metalizado. As versões ouro e prata têm acabamento metalizado e geralmente são posicionadas como edições premium da Panini. A escolha é uma questão de preferência visual e orçamento.",
  },
  {
    q: "Quando o produto será enviado?",
    a: "Este produto está em pré-venda. O envio será realizado antes do início da Copa do Mundo FIFA 2026™ (11 de junho a 19 de julho de 2026).",
  },
  {
    q: "É um produto oficial Panini?",
    a: "Sim, é o álbum oficial licenciado pela FIFA e produzido pela Panini Brasil. A Bella Figurinha é distribuidora oficial Panini — todos os produtos vêm direto da editora, sem revenda de marketplace.",
  },
];

const albumCapaDuraPrataFaqItems: FaqItem[] = [
  {
    q: "Este produto vem com envelopes ou figurinhas?",
    a: "Não. Este produto contém apenas o álbum oficial em capa dura com acabamento metalizado prateado. Os envelopes com figurinhas (7 cromos cada) são vendidos separadamente. Para completar a coleção, você pode comprar envelopes avulsos, kits ou caixas na Bella Figurinha.",
  },
  {
    q: "Qual a diferença entre o capa dura prata e a versão brochura mais barata?",
    a: "O conteúdo interno é o mesmo nas duas versões: 112 páginas + capa, com espaço para os 980 cromos da coleção. A diferença está na construção do álbum. A versão brochura tem capa flexível em 4 cores e custa menos. A versão capa dura prata tem capa rígida com acabamento metalizado prateado, indicada para colecionadores que querem preservar a edição como item de memória de longo prazo.",
  },
  {
    q: "Qual a diferença entre a versão capa dura prata e a versão capa dura ouro?",
    a: "O conteúdo interno é idêntico nas duas versões — 112 páginas + capa para os 980 cromos. A diferença é puramente estética: a capa dura ouro tem acabamento metalizado dourado e costuma ser posicionada como a edição premium da Panini, enquanto a capa dura prata traz acabamento metalizado prateado, com visual mais discreto e geralmente preço mais acessível. A escolha é uma questão de preferência visual.",
  },
  {
    q: "Quando o produto será enviado?",
    a: "Este produto está em pré-venda. O envio será realizado antes do início da Copa do Mundo FIFA 2026™ (11 de junho a 19 de julho de 2026).",
  },
  {
    q: "É um produto oficial Panini?",
    a: "Sim, é o álbum oficial licenciado pela FIFA e produzido pela Panini Brasil. A Bella Figurinha é distribuidora oficial Panini — todos os produtos vêm direto da editora, sem revenda de marketplace.",
  },
];

const albumBrochuraFaqItems: FaqItem[] = [
  {
    q: "Este produto vem com envelopes ou figurinhas?",
    a: "Não. Este produto contém apenas o álbum oficial em formato brochura (capa flexível). Os envelopes com figurinhas (7 cromos cada) são vendidos separadamente. Para completar a coleção, você pode comprar envelopes avulsos, kits ou caixas na Bella Figurinha.",
  },
  {
    q: "Qual a diferença entre a brochura e as versões capa dura?",
    a: "O conteúdo interno é o mesmo em todas as versões: 112 páginas + capa, com espaço para os 980 cromos da coleção. A diferença está na construção do álbum. A brochura tem capa flexível em 4 cores e é a versão mais acessível. As versões capa dura têm capa rígida e podem ter acabamento metalizado (Ouro ou Prata), indicadas para colecionadores que querem preservar o álbum como item de memória.",
  },
  {
    q: "A versão brochura é mais frágil?",
    a: "A capa flexível é menos resistente que a versão capa dura para uso intenso ou armazenamento de longo prazo, mas é totalmente adequada para colar figurinhas e acompanhar a Copa. Se o álbum vai ser usado por crianças ou se você quer guardá-lo por muitos anos, a capa dura é a melhor escolha.",
  },
  {
    q: "Quando o produto será enviado?",
    a: "Este produto está em pré-venda. O envio será realizado antes do início da Copa do Mundo FIFA 2026™ (11 de junho a 19 de julho de 2026).",
  },
  {
    q: "É um produto oficial Panini?",
    a: "Sim, é o álbum oficial licenciado pela FIFA e produzido pela Panini Brasil. A Bella Figurinha é distribuidora oficial Panini — todos os produtos vêm direto da editora, sem revenda de marketplace.",
  },
];

export function getFaqItemsForHandle(handle?: string): FaqItem[] {
  const h = handle?.toLowerCase() || "";

  if (h.includes("album") && h.includes("envelope")) {
    const match = h.match(/(\d+)[-_]?\s*envelope/);
    const count = match ? parseInt(match[1], 10) : 12;
    const total = count * 7;
    const percent = ((total / 980) * 100).toFixed(1);
    const albumType = h.includes("capa-dura-ouro")
      ? "capa dura ouro"
      : h.includes("capa-dura-prata")
      ? "capa dura prata"
      : h.includes("capa-dura")
      ? "capa dura"
      : "brochura";
    return [
      {
        q: "O álbum desse kit é o brochura ou capa dura?",
        a: `Este combo vem com o álbum oficial no formato ${albumType}. Se preferir outra versão (brochura, capa dura comum, capa dura ouro ou prata), verifique os outros produtos disponíveis na Bella Figurinha — todos têm o mesmo conteúdo interno (112 páginas, 980 espaços).`,
      },
      {
        q: "Quantas figurinhas vêm no total?",
        a: `São ${total} figurinhas no total: ${count} envelopes lacrados × 7 cromos por envelope = ${total} cromos. Eles vêm distribuídos aleatoriamente entre as 48 seleções da Copa do Mundo 2026.`,
      },
      {
        q: `${total} cromos é suficiente para completar o álbum?`,
        a: `Não. A coleção completa tem 980 cromos, então ${total} cromos preenchem apenas cerca de ${percent}% do álbum (e isso sem contar as figurinhas repetidas que costumam aparecer). Este combo é o ponto de partida ideal para começar a colar — para completar, você vai precisar comprar mais envelopes ou fazer trocas com outros colecionadores.`,
      },
      {
        q: "As figurinhas vêm repetidas?",
        a: "Os envelopes são lacrados de fábrica pela Panini e a distribuição dos cromos é aleatória. Comprando vários envelopes, é normal aparecerem figurinhas repetidas — é parte do processo de colecionar. As repetidas geralmente são usadas para troca com outros colecionadores.",
      },
      {
        q: "Vale mais a pena este combo ou comprar álbum e envelopes separados?",
        a: "Depende. Se você está começando do zero e quer abrir tudo de uma vez, o combo é mais prático e geralmente sai com preço melhor que comprar separado. Se você já tem o álbum, vale comprar só envelopes avulsos. Se já tem envelopes, compre só o álbum.",
      },
      {
        q: "Quando o produto será enviado?",
        a: "Este produto está em pré-venda. A previsão de envio aparece em destaque no topo da página. O envio é feito antes do início da Copa do Mundo FIFA 2026™ (11 de junho a 19 de julho de 2026).",
      },
    ];
  }

  if ((h.includes("envelope") || h.includes("kit") || h.includes("caixa")) && !h.includes("album")) {
    const match = h.match(/(\d+)[-_]?\s*envelope/) || h.match(/kit[- ]?(\d+)/);
    const count = match ? parseInt(match[1], 10) : 12;
    const total = count * 7;
    return [
      {
        q: "O álbum vem incluído neste kit?",
        a: `Não. Este produto contém apenas ${count} envelopes lacrados com figurinhas (7 cromos por envelope). O álbum oficial é vendido separadamente — você pode escolher entre as versões brochura, capa dura comum, capa dura ouro ou capa dura prata na Bella Figurinha.`,
      },
      {
        q: "Quantas figurinhas vêm no total?",
        a: `São ${total} figurinhas no total. Cada envelope contém 7 cromos originais Panini, e o kit traz ${count} envelopes lacrados (${count} × 7 = ${total} cromos).`,
      },
      {
        q: "Quantos envelopes preciso para completar o álbum?",
        a: "A coleção completa tem 980 cromos. Em teoria, seriam necessários cerca de 140 envelopes — mas na prática, como os cromos vêm aleatórios, são necessários muito mais envelopes que isso para completar sem trocas. A forma mais eficiente de completar é combinar a compra de envelopes com trocas com outros colecionadores.",
      },
      {
        q: "As figurinhas vêm repetidas?",
        a: "Os envelopes são lacrados de fábrica pela Panini e a distribuição dos cromos é aleatória. Comprando vários envelopes, é normal aparecerem figurinhas repetidas — é parte do processo de colecionar. A Bella Figurinha não escolhe nem garante figurinhas específicas dentro dos envelopes.",
      },
      {
        q: "Quando o produto será enviado?",
        a: "Este produto está em pré-venda com previsão de envio para a segunda quinzena de abril/2026, antes do início da Copa do Mundo FIFA 2026™ (11 de junho a 19 de julho de 2026).",
      },
      {
        q: "As figurinhas são originais Panini?",
        a: "Sim, 100% originais. A Bella Figurinha é distribuidora oficial Panini no Brasil — todos os envelopes vêm direto da editora, lacrados de fábrica, sem revenda de marketplace.",
      },
    ];
  }

  if ((h.includes("album-brochura") || h.includes("album-capa-cartao")) && !h.includes("envelope")) {
    return albumBrochuraFaqItems;
  }

  if (h.includes("album-capa-dura") && h.endsWith("-copy") && !h.includes("prata")) {
    return albumCapaDuraTradicionalFaqItems;
  }

  if (h.includes("album-capa-dura-prata")) {
    return albumCapaDuraPrataFaqItems;
  }

  if (
    h.includes("album-capa-dura-ouro") ||
    h === "copa-do-mundo-2026-kit-com-12-envelopes-fifa-world-cup-2026™️-copy" ||
    h === "copa-do-mundo-2026-kit-com-12-envelopes-fifa-world-cup-2026-copy"
  ) {
    return albumCapaDuraOuroFaqItems;
  }

  let specific: FaqItem[];
  if (h.includes("lata-classic-tin") || h.includes("classic-tin")) {
    specific = classicTinFaqItems;
  } else if (h.includes("starter-pack")) {
    specific = starterPackFaqItems;
  } else {
    specific = getEnvelopeFaqItems(h);
  }

  return [...specific, ...sharedFaqItems, preOrderFaq];
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
