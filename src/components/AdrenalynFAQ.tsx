import { useEffect } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { injectJsonLd } from "@/lib/jsonld";

const faqItems = [
  {
    q: "O que é a coleção Adrenalyn XL da Panini?",
    a: "A Adrenalyn XL é uma linha de trading cards colecionáveis produzida pela Panini, focada em futebol. Cada card traz estatísticas reais dos jogadores, escudos oficiais dos times e diferentes níveis de raridade. Além de colecionar, você pode usar os cards para disputar partidas estratégicas em um tabuleiro físico ou no aplicativo oficial da Panini. É a combinação perfeita entre coleção de figurinhas e jogo de estratégia.",
  },
  {
    q: "Quais são os tipos de cards Adrenalyn XL disponíveis?",
    a: "A coleção Adrenalyn XL possui cards Base (comuns) e diversas categorias especiais, incluindo: Heroes, Fan Favourites, Golden Ballers, Eternos, Power, Gold, World e Rare. Existem também cards de Edição Limitada (Limited Edition) e versões XXL, disponíveis em produtos especiais como blisters, multipacks e caixas premium. Quanto mais raro o card, mais forte ele é no jogo e mais valorizado entre colecionadores.",
  },
  {
    q: "Qual a diferença entre Adrenalyn XL e o álbum de figurinhas tradicional?",
    a: "O álbum de figurinhas tradicional da Panini é uma coleção para colar adesivos em um livro ilustrado. Já o Adrenalyn XL são trading cards soltos — cards rígidos que você coleciona e também usa para jogar partidas estratégicas. Os cards Adrenalyn XL possuem estatísticas de ataque, defesa e poder, permitindo disputas entre amigos no tabuleiro físico ou no app. São coleções complementares que agradam públicos diferentes.",
  },
  {
    q: "O que vem dentro de um envelope (booster pack) de Adrenalyn XL?",
    a: "Cada envelope padrão (booster pack) de Adrenalyn XL contém 8 cards aleatórios, que podem incluir cards base e especiais. Já os envelopes Premium trazem 6 cards base, 3 cards especiais e 1 card de Edição Limitada. A composição pode variar conforme a edição da coleção (Brasileirão, FIFA World Cup 2026, FIFA 365, etc.).",
  },
  {
    q: "O que é o Starter Pack de Adrenalyn XL?",
    a: "O Starter Pack é o kit inicial ideal para quem está começando a colecionar. Geralmente inclui: o Binder oficial (pasta com plásticos para guardar os cards), envelopes com cards base, cards de Edição Limitada exclusivos, o tabuleiro para jogar partidas físicas e o guia de regras. É a maneira mais completa de iniciar sua coleção Adrenalyn XL.",
  },
  {
    q: "Como jogar com os cards Adrenalyn XL?",
    a: "O jogo Adrenalyn XL é fácil de aprender. Cada jogador monta um time com seus cards e disputa partidas comparando as estatísticas de ataque, defesa e poder dos jogadores. Você pode jogar de duas formas: no tabuleiro físico (incluso no Starter Pack) usando os cards reais, ou no aplicativo oficial da Panini, digitalizando seus cards através de códigos exclusivos. É diversão garantida para todas as idades.",
  },
  {
    q: "Os cards Adrenalyn XL da Copa do Mundo FIFA 2026 já estão disponíveis?",
    a: "Sim! A coleção Adrenalyn XL da FIFA World Cup 2026 já foi lançada pela Panini. Ela conta com 630 cards no total, cobrindo 37 seleções com escudos e uniformes oficiais. Os destaques incluem os 9 icônicos Golden Ballers, cards Momentum de estrelas como Bellingham, Dembélé e Pulisic, além de cards especiais nas categorias Heroes, Fan Favourites e os raríssimos Eternos 22. Confira a disponibilidade aqui na Bella Figurinha.",
  },
  {
    q: "Como guardar e proteger meus cards Adrenalyn XL?",
    a: "A Panini oferece o Binder oficial, uma pasta com folhas plásticas projetadas para acomodar os cards Adrenalyn XL com segurança. Para transporte, existe a Lata Pocket, ideal para levar sua escalação favorita para jogar com amigos. Também é recomendável usar sleeves (capinhas protetoras individuais) para cards raros e de Edição Limitada, preservando seu valor de coleção.",
  },
  {
    q: "Quais coleções Adrenalyn XL existem?",
    a: "A Panini lança diversas edições de Adrenalyn XL ao longo do ano. As principais incluem: Adrenalyn XL Brasileirão (atualizada a cada temporada com os clubes da Série A e B), Adrenalyn XL FIFA World Cup 2026 (edição especial da Copa do Mundo), e Adrenalyn XL FIFA 365 (coleção anual com clubes e ligas internacionais). Cada edição possui checklist próprio, cards exclusivos e diferentes níveis de raridade.",
  },
  {
    q: "É seguro comprar cards Adrenalyn XL na Bella Figurinha?",
    a: "Sim! A Bella Figurinha é uma loja especializada em figurinhas e cards colecionáveis, trabalhando exclusivamente com produtos originais e lacrados da Panini. Todos os envelopes, blisters, starter packs e caixas são autênticos, garantindo que você receba cards genuínos para sua coleção. A loja oferece envio para todo o Brasil com embalagem segura para proteger seus cards durante o transporte.",
  },
  {
    q: "Adrenalyn XL é indicado para qual faixa etária?",
    a: "Os cards Adrenalyn XL são indicados para crianças a partir de 6 anos, adolescentes e adultos. As regras do jogo são simples e intuitivas, tornando-o acessível para os mais novos, enquanto a estratégia de montar escalações e a busca por cards raros atraem colecionadores de todas as idades. É uma ótima atividade para compartilhar em família e entre amigos.",
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.a,
    },
  })),
};

const AdrenalynFAQ = () => {
  useEffect(() => {
    const cleanup = injectJsonLd("faq-adrenalyn", faqJsonLd);
    return cleanup;
  }, []);

  return (
    <section className="container mx-auto px-6 py-16 max-w-3xl">
      <div className="text-center mb-10">
        <p className="text-sm font-display tracking-widest uppercase text-primary mb-2">
          Dúvidas Frequentes
        </p>
        <h2 className="font-display text-4xl md:text-5xl tracking-wider uppercase text-foreground">
          Perguntas e <span className="text-primary">Respostas</span>
        </h2>
      </div>

      <Accordion type="single" collapsible className="space-y-3">
        {faqItems.map((item, i) => (
          <AccordionItem
            key={i}
            value={`faq-${i}`}
            className="bg-card border border-border rounded-xl px-5 data-[state=open]:border-primary/40"
          >
            <AccordionTrigger className="font-display text-base tracking-wider uppercase text-foreground hover:no-underline py-5">
              {item.q}
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground font-body leading-relaxed pb-5">
              {item.a}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
};

export default AdrenalynFAQ;
