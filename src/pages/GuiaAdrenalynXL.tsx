import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SEOHead } from "@/components/SEOHead";
import { breadcrumbSchema, organizationSchema, faqPageJsonLd, injectJsonLd } from "@/lib/jsonld";

/* ── FAQ data for JSON-LD ── */
const faqItems = [
  { q: "Quantas cartas tem a coleção completa?", a: "A coleção principal tem 633 cartas (417 base + 216 especiais). Incluindo todas as Limited Edition de diversos produtos, o número total ultrapassa 700 cartas únicas." },
  { q: "Preciso do tabuleiro para jogar?", a: "O tabuleiro (gameboard) facilita muito a organização das cartas durante a partida, mas não é estritamente obrigatório. Para partidas informais, basta que cada jogador organize suas cartas em setores (defesa, meio e ataque). Porém, o tabuleiro oficial só vem no Starter Pack." },
  { q: "Quantas cartas preciso para jogar?", a: "No modo Clássico, 14 cartas (11 titulares + 3 reservas). No modo League Level, 11 cartas. No modo Master Level, 11 cartas. Na Disputa de Pênaltis, apenas 6 (1 goleiro + 5 cobradores)." },
  { q: "Posso misturar jogadores de seleções diferentes no mesmo time?", a: "Sim! Você pode montar o time dos seus sonhos com jogadores de qualquer seleção. A única vantagem de concentrar jogadores da mesma seleção é o bônus do Escudo (+5 em todos os atributos)." },
  { q: "O que são as cartas Golden Baller?", a: "São as 9 cartas mais poderosas da coleção, com valor 100 em todos os atributos. Incluem superestrelas como Messi, Mbappé e Haaland. São encontradas em aproximadamente 1 a cada 20 pacotes." },
  { q: "Qual é a diferença entre Adrenalyn XL e o álbum de figurinhas?", a: "O álbum de figurinhas é apenas para colecionar e colar figurinhas. O Adrenalyn XL é um Trading Card Game (TCG) — além de colecionar, as cartas têm atributos numéricos e você pode jogá-las em duelos estratégicos contra outros jogadores. São coleções separadas." },
  { q: "Posso jogar online?", a: "Sim! Cada pacote de cartas vem com um código de resgate para o app oficial. Você desbloqueia suas cartas digitalmente e pode desafiar jogadores do mundo todo em partidas Head-to-Head." },
  { q: "Quais são as cartas mais raras da coleção?", a: "As mais raras são os Eternos 22 e o Emblema Oficial em suas variantes coloridas (1 a cada 70 pacotes). Logo em seguida vêm os Golden Ballers (1 a cada 20 pacotes). As cartas Momentum e FIFA World Cup Master da Dream Box também são extremamente raras por serem exclusivas daquele produto." },
  { q: "Quando sai a atualização da coleção?", a: "A Panini planeja lançar o Upgrade Edition (com 48 cartas adicionais) em abril de 2026, após os play-ins de março definirem as últimas vagas da Copa." },
];

const tocItems = [
  "O Que É o Adrenalyn XL FIFA World Cup 2026?",
  "Conheça a Coleção Completa",
  "Tipos de Cartas: Base, Especiais e Ultra Raras",
  "Entendendo os Atributos das Cartas",
  "Por Onde Começar: Produtos e Kits",
  "Regras Completas: Como Jogar Passo a Passo",
  "Modos de Jogo",
  "Estratégias e Dicas para Vencer",
  "O Jogo Online e o App Oficial",
  "Dicas para Colecionadores",
  "Perguntas Frequentes (FAQ)",
];

/* ── Reusable sub-components ── */
const TipBox = ({ children }: { children: React.ReactNode }) => (
  <div className="bg-primary/10 border border-primary/40 rounded-lg p-5 my-5">
    <span className="text-lg mr-1">💡</span>{children}
  </div>
);
const StrategyBox = ({ children }: { children: React.ReactNode }) => (
  <div className="bg-accent/10 border border-accent/60 rounded-lg p-5 my-5">
    <span className="text-lg mr-1">🎯</span>{children}
  </div>
);
const WarningBox = ({ children }: { children: React.ReactNode }) => (
  <div className="bg-destructive/10 border border-destructive/40 rounded-lg p-5 my-5">
    <span className="text-lg mr-1">⚠️</span>{children}
  </div>
);

const Step = ({ n, children }: { n: number; children: React.ReactNode }) => (
  <div className="flex gap-4 my-5 items-start">
    <div className="bg-destructive text-destructive-foreground w-9 h-9 rounded-full flex items-center justify-center font-bold flex-shrink-0">{n}</div>
    <div className="flex-1 font-body">{children}</div>
  </div>
);

const SectionTitle = ({ id, n, children }: { id: string; n: number; children: React.ReactNode }) => (
  <h2 id={id} className="font-display text-2xl md:text-3xl tracking-wider uppercase text-foreground mt-12 mb-5 pb-2.5 border-b-[3px] border-destructive scroll-mt-24">
    {n}. {children}
  </h2>
);

const GuideImage = ({ src, alt, caption }: { src: string; alt: string; caption?: string }) => (
  <figure className="my-8 rounded-xl overflow-hidden border border-border/50 shadow-lg">
    <img src={src} alt={alt} className="w-full h-auto object-cover" loading="lazy" />
    {caption && (
      <figcaption className="bg-muted/80 text-muted-foreground text-sm text-center py-3 px-4 font-body italic">
        {caption}
      </figcaption>
    )}
  </figure>
);

const GuiaAdrenalynXL = () => {
  useEffect(() => {
    const c1 = injectJsonLd("guia-faq", faqPageJsonLd(faqItems));
    const c2 = injectJsonLd("guia-bc", breadcrumbSchema([
      { name: "Início", url: "https://bellafigurinha.com.br/" },
      { name: "Guia Adrenalyn XL", url: "https://bellafigurinha.com.br/guias/como-jogar-adrenalyn-xl-fifa-world-cup-2026" },
    ]));
    const c3 = injectJsonLd("guia-org", { "@context": "https://schema.org", ...organizationSchema });
    return () => { c1(); c2(); c3(); };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Guia Completo: Como Jogar Adrenalyn XL FIFA World Cup 2026 | Bella Figurinha"
        description="O guia definitivo de como jogar Adrenalyn XL FIFA World Cup 2026. Regras, estratégias, tipos de cartas, modos de jogo e dicas para iniciantes e avançados."
        canonical="https://bellafigurinha.com.br/guias/como-jogar-adrenalyn-xl-fifa-world-cup-2026"
      />
      <Header />

      {/* ── Hero with background image ── */}
      <section className="relative pt-32 pb-16 text-center text-white px-4 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/guia-hero-cards.jpg"
            alt="Cartas Adrenalyn XL FIFA World Cup 2026"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-foreground/85 via-foreground/70 to-foreground/90" />
        </div>
        <div className="relative z-10">
          <h1 className="font-display text-3xl md:text-5xl tracking-wider uppercase mb-4 drop-shadow-lg">
            Guia Completo: Como Jogar Adrenalyn XL<br />FIFA World Cup 2026™
          </h1>
          <p className="text-lg opacity-90 max-w-2xl mx-auto font-body drop-shadow-md">
            Tudo o que você precisa saber para colecionar, montar seu time dos sonhos e dominar os duelos — do iniciante ao jogador avançado.
          </p>
        </div>
      </section>

      {/* ── Content ── */}
      <main className="container mx-auto max-w-[860px] px-4 py-10">

        {/* TOC */}
        <nav className="bg-muted rounded-xl p-6 md:p-8 mb-10">
          <h2 className="font-display text-xl tracking-wider uppercase text-foreground mb-4">Índice do Guia</h2>
          <ol className="list-decimal pl-6 space-y-2">
            {tocItems.map((t, i) => (
              <li key={i}>
                <a href={`#secao-${i + 1}`} className="text-secondary font-medium hover:underline font-body">{t}</a>
              </li>
            ))}
          </ol>
        </nav>

        {/* 1 */}
        <SectionTitle id="secao-1" n={1}>O Que É o Adrenalyn XL FIFA World Cup 2026?</SectionTitle>
        <p className="font-body text-muted-foreground">O Adrenalyn XL FIFA World Cup 2026™ é o card game oficial da Copa do Mundo FIFA 2026, produzido pela Panini. Diferente de um álbum de figurinhas tradicional, o Adrenalyn XL é um Trading Card Game (TCG) — ou seja, além de colecionar, você pode jogar partidas de verdade usando as cartas, desafiando amigos em duelos estratégicos.</p>
        <p className="font-body text-muted-foreground">A Copa do Mundo de 2026 será histórica: pela primeira vez, o torneio será sediado por três países simultaneamente — Estados Unidos, Canadá e México — e contará com 48 seleções (42 já classificadas + 6 vagas definidas nos play-ins). Isso torna esta coleção a maior e mais ambiciosa da história do Adrenalyn XL em Copas do Mundo.</p>

        <GuideImage
          src="/images/guia-gameplay.jpg"
          alt="Dois jogadores disputando uma partida de Adrenalyn XL no tabuleiro oficial"
          caption="O Adrenalyn XL combina a emoção de colecionar com duelos estratégicos no tabuleiro"
        />

        <p className="font-body text-muted-foreground">Cada carta traz a imagem de um jogador real com atributos numéricos de Ataque, Defesa e Controle de Jogo, que são usados nos duelos. O jogo combina a emoção de colecionar com a estratégia de montar o time perfeito e tomar decisões táticas durante cada partida.</p>
        <p className="font-body text-muted-foreground">Além do jogo físico no tabuleiro (gameboard), existe também a versão digital oficial, onde você pode desbloquear suas cartas e desafiar jogadores do mundo inteiro online.</p>

        {/* 2 */}
        <SectionTitle id="secao-2" n={2}>Conheça a Coleção Completa</SectionTitle>
        <p className="font-body text-muted-foreground">A coleção FIFA World Cup 2026 Adrenalyn XL é composta por um total de 633 cartas, divididas entre 417 cartas base e 216 cartas especiais. Além dessas, existem dezenas de cartas de Edição Limitada, distribuídas exclusivamente em produtos específicos.</p>

        <h3 className="font-display text-xl tracking-wider uppercase text-foreground mt-8 mb-3">Estrutura por Seleções</h3>
        <p className="font-body text-muted-foreground">As 42 seleções já classificadas possuem um set completo de 12 cartas cada:</p>
        <ul className="list-disc pl-6 space-y-2 font-body text-muted-foreground mb-4">
          <li><strong className="text-foreground">9 cartas de jogadores (Heroes)</strong> — representando goleiros, defensores, meio-campistas e atacantes.</li>
          <li><strong className="text-foreground">1 carta de Escudo (Team Crest)</strong> — o brasão oficial, funciona como carta bônus.</li>
          <li><strong className="text-foreground">1 carta Fan Favourite</strong> — o jogador mais querido da torcida.</li>
          <li><strong className="text-foreground">1 carta Icon</strong> — uma lenda ou referência absoluta da seleção.</li>
        </ul>
        <p className="font-body text-muted-foreground">As 22 seleções que disputam os play-ins (repescagem) em março de 2026 têm representação através das cartas Contenders, com um número reduzido de jogadores por equipe.</p>

        <h3 className="font-display text-xl tracking-wider uppercase text-foreground mt-8 mb-3">Números da Coleção</h3>
        <div className="overflow-x-auto mb-6">
          <table className="w-full border-collapse">
            <thead><tr><th className="bg-foreground text-background p-3 text-left font-display tracking-wider uppercase text-sm">Categoria</th><th className="bg-foreground text-background p-3 text-left font-display tracking-wider uppercase text-sm">Quantidade</th></tr></thead>
            <tbody className="font-body text-muted-foreground">
              {[
                ["Cartas Base (Heroes)", "378"], ["Team Crests (Escudos)", "42"], ["Fan Favourites", "42"], ["Icons", "42"],
                ["Contenders (Play-ins)", "36"], ["Mascotes Oficiais", "3"], ["Top Keepers", "9"], ["Defensive Rocks", "9"],
                ["Midfield Maestros", "18"], ["Goal Machines", "22"], ["Master Rookies", "16"], ["Golden Ballers", "9"],
                ["Eternos 22", "3"], ["Emblema Oficial + Variantes", "5"], ["Total da Coleção", "633+"],
              ].map(([cat, qty], i) => (
                <tr key={i} className={i % 2 === 1 ? "bg-muted" : ""}>
                  <td className="p-2.5 px-4 border-b border-border">{cat}</td>
                  <td className="p-2.5 px-4 border-b border-border font-semibold">{qty}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* 3 */}
        <SectionTitle id="secao-3" n={3}>Tipos de Cartas: Base, Especiais e Ultra Raras</SectionTitle>
        <p className="font-body text-muted-foreground">Entender as categorias de cartas é fundamental tanto para completar a coleção quanto para montar um time competitivo nos duelos.</p>

        <h3 className="font-display text-xl tracking-wider uppercase text-foreground mt-8 mb-3">Cartas Base</h3>
        <p className="font-body text-muted-foreground">São a espinha dorsal da coleção e do jogo. As 378 cartas Heroes representam jogadores das 42 seleções classificadas, cobrindo todas as posições do campo. Cada jogador traz atributos de Ataque, Defesa e Controle de Jogo. Os 42 escudos (Team Crests) funcionam como cartas de suporte durante as partidas.</p>

        <h3 className="font-display text-xl tracking-wider uppercase text-foreground mt-8 mb-3">Cartas Especiais (encontradas nos pacotes)</h3>
        {[
          ["Fan Favourites", "Os jogadores mais populares de cada seleção. Possuem atributos geralmente acima da média."],
          ["Icons", "Lendas e referências absolutas de suas seleções. Alto valor de jogo e coleção."],
          ["Top Keepers", "Os 9 melhores goleiros do mundo. Essenciais para defesa sólida nos duelos."],
          ["Defensive Rocks", "Os 9 zagueiros mais impenetráveis. Altíssimos valores de Defesa."],
          ["Midfield Maestros", "18 craques do meio-campo. Destaque para Controle de Jogo."],
          ["Goal Machines", "22 artilheiros letais. Maiores valores de Ataque da coleção."],
          ["Master Rookies", "16 jovens promessas sub-23 com potencial de estrela."],
          ["Contenders", "36 jogadores das seleções nos play-ins."],
          ["Mascotes Oficiais", "Maple (Canadá), Zayu (México) e Clutch (EUA). Cartas 'coringa'."],
        ].map(([title, desc], i) => (
          <div key={i} className="bg-muted border-l-4 border-destructive p-4 my-3 rounded-r-lg">
            <strong className="text-foreground">{title}</strong> — <span className="font-body text-muted-foreground">{desc}</span>
          </div>
        ))}

        <h3 className="font-display text-xl tracking-wider uppercase text-foreground mt-8 mb-3">Cartas Ultra Raras</h3>
        {[
          ["Golden Ballers (9 cartas)", "As cartas mais poderosas do jogo, com valor 100 em TODOS os atributos. Incluem Messi, Mbappé e Haaland. Probabilidade: ~1 a cada 20 pacotes."],
          ["Eternos 22 (3 cartas)", "Homenagem aos campeões mundiais de 2022. Cartas #628, #629 e #630. Probabilidade: 1 a cada 70 pacotes."],
          ["Emblema Oficial", "Escudo da FIFA World Cup 2026 em versão Gold, com variantes paralelas em Blue, Green, Orange e Silver."],
        ].map(([title, desc], i) => (
          <div key={i} className="bg-muted border-l-4 border-primary p-4 my-3 rounded-r-lg">
            <strong className="text-foreground">{title}</strong> — <span className="font-body text-muted-foreground">{desc}</span>
          </div>
        ))}

        <h3 className="font-display text-xl tracking-wider uppercase text-foreground mt-8 mb-3">Cartas de Edição Limitada (fora dos pacotes comuns)</h3>
        <p className="font-body text-muted-foreground">Distribuídas exclusivamente em produtos específicos como Starter Pack, Tins, Premium Packs e a Dream Box. Incluem:</p>
        <ul className="list-disc pl-6 space-y-2 font-body text-muted-foreground my-4">
          <li><strong className="text-foreground">Limited Edition</strong> — 86+ cartas exclusivas dos multipacks e produtos premium.</li>
          <li><strong className="text-foreground">XXL Limited Edition</strong> — Versões em tamanho ampliado, 36+ cartas + 5 com holograma.</li>
          <li><strong className="text-foreground">Premium Limited Edition e Premium Gold</strong> — As mais exclusivas entre as Limited.</li>
          <li><strong className="text-foreground">Panini Hologram</strong> — 24 cartas com acabamento holográfico.</li>
          <li><strong className="text-foreground">Momentum (3 cartas)</strong> — Exclusivas da Dream Box, com design único.</li>
          <li><strong className="text-foreground">FIFA World Cup Master (24 cartas)</strong> — Lendas do futebol mundial, exclusivas da Dream Box.</li>
        </ul>
        <TipBox>As cartas de Edição Limitada NÃO fazem parte da coleção principal de 633 cartas, mas são altamente valorizadas por colecionadores e podem ser devastadoras nos duelos!</TipBox>

        {/* 4 */}
        <SectionTitle id="secao-4" n={4}>Entendendo os Atributos das Cartas</SectionTitle>
        <p className="font-body text-muted-foreground">Cada carta de jogador traz três atributos principais que determinam sua força nos duelos:</p>

        {/* Card anatomy image from game rules */}
        <GuideImage
          src="/images/game-rules-page1.jpg"
          alt="Regras oficiais do jogo Adrenalyn XL — anatomia da carta e como jogar"
          caption="Regras oficiais: anatomia da carta com atributos, como montar o time e mecânicas de Ataque, Defesa e Controle"
        />

        <h3 className="font-display text-xl tracking-wider uppercase text-foreground mt-8 mb-3">Ataque (ATK)</h3>
        <p className="font-body text-muted-foreground">Representa a capacidade ofensiva do jogador. Cartas de atacantes e pontas costumam ter os maiores valores, com destaque para as Goal Machines que podem chegar acima de 90.</p>

        <h3 className="font-display text-xl tracking-wider uppercase text-foreground mt-8 mb-3">Defesa (DEF)</h3>
        <p className="font-body text-muted-foreground">Mede a solidez defensiva. Goleiros, zagueiros e cartas Defensive Rocks possuem os maiores valores.</p>

        <h3 className="font-display text-xl tracking-wider uppercase text-foreground mt-8 mb-3">Controle de Jogo (CTR)</h3>
        <p className="font-body text-muted-foreground">O atributo mais estratégico. Quando escolhido, o oponente também deve usar Controle. Ideal para Midfield Maestros.</p>

        <h3 className="font-display text-xl tracking-wider uppercase text-foreground mt-8 mb-3">Como os Atributos Interagem nos Duelos</h3>
        <div className="overflow-x-auto mb-6">
          <table className="w-full border-collapse">
            <thead><tr><th className="bg-foreground text-background p-3 text-left font-display tracking-wider uppercase text-sm">Você Escolhe</th><th className="bg-foreground text-background p-3 text-left font-display tracking-wider uppercase text-sm">Adversário Usa</th><th className="bg-foreground text-background p-3 text-left font-display tracking-wider uppercase text-sm">Quem Ganha</th></tr></thead>
            <tbody className="font-body text-muted-foreground">
              <tr><td className="p-2.5 px-4 border-b border-border">Ataque</td><td className="p-2.5 px-4 border-b border-border">Defesa</td><td className="p-2.5 px-4 border-b border-border">Maior valor vence</td></tr>
              <tr className="bg-muted"><td className="p-2.5 px-4 border-b border-border">Defesa</td><td className="p-2.5 px-4 border-b border-border">Ataque</td><td className="p-2.5 px-4 border-b border-border">Maior valor vence</td></tr>
              <tr><td className="p-2.5 px-4 border-b border-border">Controle</td><td className="p-2.5 px-4 border-b border-border">Controle</td><td className="p-2.5 px-4 border-b border-border">Maior valor vence</td></tr>
            </tbody>
          </table>
        </div>

        <h3 className="font-display text-xl tracking-wider uppercase text-foreground mt-8 mb-3">Cartas Bônus</h3>
        <p className="font-body text-muted-foreground">As cartas de Escudo (Team Crest) e Escalação adicionam <strong className="text-foreground">+5 pontos</strong> a todos os atributos quando combinadas com jogadores do mesmo time. O Emblema Oficial da Copa concede <strong className="text-foreground">+10 pontos</strong> em todos os valores de qualquer jogador.</p>
        <StrategyBox>Ter um escudo do mesmo time de vários jogadores do seu deck pode transformar cartas medianas em verdadeiras armas. Planeje sinergia de seleções ao montar seu time!</StrategyBox>

        {/* 5 */}
        <SectionTitle id="secao-5" n={5}>Por Onde Começar: Produtos e Kits</SectionTitle>
        <p className="font-body text-muted-foreground">Se você está entrando no mundo do Adrenalyn XL agora, escolher o produto certo faz toda a diferença:</p>

        <h3 className="font-display text-xl tracking-wider uppercase text-foreground mt-8 mb-3">Starter Pack (Kit Inicial) — O Ponto de Partida Ideal</h3>
        <p className="font-body text-muted-foreground">Indispensável para quem está começando. Vem com tudo para jogar imediatamente:</p>
        <ul className="list-disc pl-6 space-y-1 font-body text-muted-foreground my-3">
          <li>1 fichário (binder) de 40 páginas</li>
          <li>3 pacotes de cartas (24 cartas no total)</li>
          <li>1 tabuleiro de jogo (gameboard)</li>
          <li>Guia oficial com regras e checklist</li>
          <li>3 cartas Limited Edition exclusivas</li>
          <li>1 Golden Baller (Messi)</li>
          <li>2 cartas XXL Limited Edition</li>
          <li>1 carta de moeda + Código para o jogo online</li>
        </ul>
        <TipBox>Só o Starter Pack vem com o tabuleiro e o guia oficial de regras. Se você quer jogar o jogo físico, este produto é essencial.</TipBox>

        <h3 className="font-display text-xl tracking-wider uppercase text-foreground mt-8 mb-3">Pacotes (Booster Packs)</h3>
        <p className="font-body text-muted-foreground">Cada pacote contém 8 cartas + 1 código para o jogo online. Chance de encontrar um Golden Baller (1:20).</p>

        <h3 className="font-display text-xl tracking-wider uppercase text-foreground mt-8 mb-3">Fat Pack</h3>
        <p className="font-body text-muted-foreground">26 cartas por embalagem, aumentando significativamente suas chances de cartas especiais e raras.</p>

        <h3 className="font-display text-xl tracking-wider uppercase text-foreground mt-8 mb-3">Latas (Tins)</h3>
        <p className="font-body text-muted-foreground">Caixas metálicas colecionáveis com pacotes + cartas de Edição Limitada exclusivas. A Classic Tin inclui uma Trophy Card exclusiva.</p>

        <h3 className="font-display text-xl tracking-wider uppercase text-foreground mt-8 mb-3">Premium Pack e Premium Gold Pack</h3>
        <p className="font-body text-muted-foreground">Para colecionadores mais dedicados, com cartas Premium Limited Edition e acabamentos especiais.</p>

        <h3 className="font-display text-xl tracking-wider uppercase text-foreground mt-8 mb-3">Dream Box — O Produto Ultimate</h3>
        <p className="font-body text-muted-foreground">O produto mais completo e exclusivo da coleção. Contém 24 cartas de lendas (FIFA World Cup Master) exclusivas + 3 cartas Momentum + múltiplos pacotes.</p>

        <h3 className="font-display text-xl tracking-wider uppercase text-foreground mt-8 mb-3">Omni Set — A Coleção Completa</h3>
        <p className="font-body text-muted-foreground">Caixa de luxo com todas as 630 cartas da coleção, incluindo os 9 Golden Ballers e os 3 Eternos 22. Cada caixa é individualmente numerada de 1/2026 a 2026/2026.</p>

        {/* CTA Box */}
        <div className="bg-gradient-to-br from-foreground to-secondary rounded-xl p-8 text-center my-10">
          <h3 className="font-display text-2xl tracking-wider uppercase text-white mb-3">Monte Sua Coleção na Bella Figurinha!</h3>
          <p className="text-white/90 font-body mb-4">Encontre todos os produtos oficiais Adrenalyn XL FIFA World Cup 2026 com os melhores preços.</p>
          <Link to="/#produtos" className="inline-block bg-destructive text-white py-3.5 px-8 rounded-lg font-bold text-lg hover:opacity-90 transition-opacity font-display tracking-wider uppercase">
            Ver Produtos Disponíveis
          </Link>
        </div>

        {/* 6 */}
        <SectionTitle id="secao-6" n={6}>Regras Completas: Como Jogar Passo a Passo</SectionTitle>
        <p className="font-body text-muted-foreground">O jogo é disputado entre dois jogadores, cada um com seu time de cartas, sobre o tabuleiro oficial (gameboard).</p>

        <h3 className="font-display text-xl tracking-wider uppercase text-foreground mt-8 mb-3">Preparação: Montando Seu Time</h3>
        <Step n={1}><strong className="text-foreground">Escolha 14 cartas</strong> — 11 titulares + 3 reservas. Monte um elenco completo.</Step>
        <Step n={2}><strong className="text-foreground">Inclua 1 goleiro obrigatoriamente</strong> — Essencial nas cobranças de pênalti.</Step>
        <Step n={3}><strong className="text-foreground">Limite de 5 jogadores por setor</strong> — Máx. 5 defensores, 5 meio-campistas e 5 atacantes.</Step>
        <Step n={4}><strong className="text-foreground">Posicione as cartas viradas para baixo</strong> no tabuleiro, cada uma em sua posição correspondente.</Step>
        <TipBox>Lance a moeda (incluída no Starter Pack) para decidir quem começa atacando.</TipBox>

        <h3 className="font-display text-xl tracking-wider uppercase text-foreground mt-8 mb-3">Fluxo da Partida</h3>
        <Step n={1}>O jogador da vez escolhe uma carta e decide qual atributo vai usar: Ataque, Defesa ou Controle.</Step>
        <Step n={2}>O oponente escolhe simultaneamente uma carta para responder. Ataque vs Defesa, ou Controle vs Controle.</Step>
        <Step n={3}>Ambos revelam as cartas e comparam os valores. O maior número vence e marca um gol!</Step>
        <Step n={4}>Em caso de empate, ninguém marca. As cartas são descartadas.</Step>
        <Step n={5}>Quem venceu mantém a posse de bola. Se perdeu, a vez passa para o adversário.</Step>
        <Step n={6}>As cartas usadas saem do jogo. A partida continua até todos os jogadores serem utilizados.</Step>

        <h3 className="font-display text-xl tracking-wider uppercase text-foreground mt-8 mb-3">Cobrança de Pênalti</h3>
        <p className="font-body text-muted-foreground">Quando você está defendendo, antes do oponente revelar sua jogada, você pode gritar "PÊNALTI!". Compare os ícones de shoot-out das cartas. Se o goleiro defende o chute, o defensor vence a rodada!</p>

        {/* Page 2 of game rules — penalties, subs, bonus, other modes */}
        <GuideImage
          src="/images/game-rules-page2.jpg"
          alt="Regras oficiais — Pênaltis, Substituições, Cartas Bônus e Modos Alternativos"
          caption="Regras oficiais: Cobranças de pênalti, substituições, cartas bônus e modos alternativos de jogo"
        />

        <WarningBox>Pedir pênalti é uma aposta. Se o chute não for na direção do goleiro, você perde automaticamente a rodada. Use com sabedoria!</WarningBox>

        <h3 className="font-display text-xl tracking-wider uppercase text-foreground mt-8 mb-3">Substituições</h3>
        <p className="font-body text-muted-foreground">Suas 3 cartas reservas podem ser usadas estrategicamente ao longo da partida em qualquer momento do jogo.</p>

        <h3 className="font-display text-xl tracking-wider uppercase text-foreground mt-8 mb-3">Fim da Partida</h3>
        <p className="font-body text-muted-foreground">Quando todas as cartas forem utilizadas, o jogador com mais gols vence! Em caso de empate, o jogo vai para disputa de pênaltis usando os ícones de shoot-out.</p>

        {/* 7 */}
        <SectionTitle id="secao-7" n={7}>Modos de Jogo</SectionTitle>
        {[
          ["Modo Clássico", "O modo principal com 11 titulares + 3 reservas, tabuleiro completo e todas as mecânicas."],
          ["Modo League Level", "Versão simplificada: 6 cartas base, 3 cartas Hero e 2 cartas especiais. Mais dinâmico."],
          ["Modo Master Level", "O mais competitivo: 8 cartas base, 2 cartas Hero e apenas 1 carta especial."],
          ["Disputa de Pênaltis", "Modo rápido! 1 goleiro + 5 cobradores. Alternando cobranças como na vida real."],
          ["Total Football", "O mais rápido. Revelam-se todas as cartas e compara o valor total (soma de atributos)."],
          ["Tiki-Taka", "Modo avançado de blefe e antecipação. Jogadores escolhem livremente qual atributo usar a cada rodada."],
        ].map(([title, desc], i) => (
          <div key={i} className="bg-muted border-l-4 border-secondary p-4 my-3 rounded-r-lg">
            <strong className="text-foreground font-display tracking-wider">{title}</strong>
            <p className="font-body text-muted-foreground mt-1 mb-0">{desc}</p>
          </div>
        ))}
        <StrategyBox>Comece pelo modo League Level para aprender as mecânicas, evolua para o Clássico quando se sentir confiante, e desafie os melhores no Master Level!</StrategyBox>

        {/* 8 */}
        <SectionTitle id="secao-8" n={8}>Estratégias e Dicas para Vencer</SectionTitle>

        <GuideImage
          src="/images/guia-estrategia.jpg"
          alt="Estratégia no Adrenalyn XL — pensamento tático com cartas"
          caption="No Adrenalyn XL, cada decisão conta — monte seu time com estratégia e surpreenda seus adversários"
        />

        <h3 className="font-display text-xl tracking-wider uppercase text-foreground mt-8 mb-3">Estratégias de Construção do Time</h3>
        <div className="space-y-4 font-body text-muted-foreground">
          <div><strong className="text-foreground">Equilibre seu elenco</strong> — Não adianta ter 5 atacantes devastadores se sua defesa é fraca. Monte um time equilibrado com pelo menos 2-3 cartas fortes em cada setor.</div>
          <div><strong className="text-foreground">Explore sinergias de seleção</strong> — As cartas de Escudo adicionam +5 pontos a jogadores da mesma seleção. Concentrar jogadores de uma ou duas seleções pode ser mais eficiente.</div>
          <div><strong className="text-foreground">Guarde seu Golden Baller para o momento certo</strong> — Com 100 em todos os atributos, não desperdice essa carta no início. Guarde para um momento decisivo.</div>
          <div><strong className="text-foreground">Tenha reservas estratégicos</strong> — Escolha reservas que complementem seus titulares — por exemplo, um atacante reserva para as rodadas finais.</div>
        </div>

        <h3 className="font-display text-xl tracking-wider uppercase text-foreground mt-8 mb-3">Estratégias Durante o Jogo</h3>
        <div className="space-y-4 font-body text-muted-foreground">
          <div><strong className="text-foreground">Leia o tabuleiro do adversário</strong> — Preste atenção em quais posições o adversário já usou cartas. Ajuste sua estratégia de acordo.</div>
          <div><strong className="text-foreground">Gerencie o Controle de Jogo</strong> — Se você tem um Midfield Maestro com Controle altíssimo, usar essa opção pode ser mais seguro que o confronto Ataque vs Defesa.</div>
          <div><strong className="text-foreground">Saiba quando pedir Pênalti</strong> — Jogada de alto risco e alta recompensa. Use quando sentir que a carta do adversário é muito forte.</div>
          <div><strong className="text-foreground">Blefe e psicologia</strong> — Varie sua abordagem: às vezes, começar com cartas médias e guardar as bombas para o final pode pegar o oponente desprevenido.</div>
        </div>

        <h3 className="font-display text-xl tracking-wider uppercase text-foreground mt-8 mb-3">Estratégias Avançadas</h3>
        <div className="space-y-4 font-body text-muted-foreground">
          <div><strong className="text-foreground">Construa decks temáticos para cada modo</strong> — No Master Level, onde você só tem 1 carta especial, essa única carta precisa ser a melhor possível.</div>
          <div><strong className="text-foreground">Conheça os valores do adversário</strong> — Se vocês jogam frequentemente, memorize as cartas principais do rival.</div>
          <div><strong className="text-foreground">Use cartas coringa (Mascotes) estrategicamente</strong> — Maple, Zayu e Clutch podem surpreender com atributos inesperados.</div>
        </div>
        <TipBox>Jogue muitas partidas! A experiência é o melhor professor. Quanto mais você joga, melhor entende os valores das suas cartas.</TipBox>

        {/* 9 */}
        <SectionTitle id="secao-9" n={9}>O Jogo Online e o App Oficial</SectionTitle>

        <GuideImage
          src="/images/guia-app-online.jpg"
          alt="App oficial do Adrenalyn XL com cartas digitais no smartphone"
          caption="Desbloqueie suas cartas no app oficial e desafie jogadores do mundo inteiro"
        />

        <h3 className="font-display text-xl tracking-wider uppercase text-foreground mt-8 mb-3">Como Funciona</h3>
        <p className="font-body text-muted-foreground">Cada pacote de cartas físicas inclui um código de resgate que desbloqueia as mesmas cartas na versão digital. Cada carta que você compra vale em dobro — no mundo físico e no virtual.</p>

        <h3 className="font-display text-xl tracking-wider uppercase text-foreground mt-8 mb-3">Modos Online</h3>
        <p className="font-body text-muted-foreground">No app, você pode desafiar jogadores do mundo inteiro em partidas Head-to-Head. O modo online segue as mesmas mecânicas do jogo físico, mas com animações e matchmaking automático.</p>

        <h3 className="font-display text-xl tracking-wider uppercase text-foreground mt-8 mb-3">Vantagens do Jogo Online</h3>
        <p className="font-body text-muted-foreground">Jogue a qualquer hora, contra adversários de diferentes níveis. Perfeita para praticar estratégias, testar formações e se preparar para duelos presenciais.</p>
        <TipBox>Não descarte os códigos de resgate dos seus pacotes! Cada código desbloqueia suas cartas no jogo digital.</TipBox>

        {/* 10 */}
        <SectionTitle id="secao-10" n={10}>Dicas para Colecionadores</SectionTitle>

        <GuideImage
          src="/images/guia-colecao.jpg"
          alt="Colecionador organizando cartas Adrenalyn XL em fichário com protetores"
          caption="Organize sua coleção desde o primeiro dia — use o fichário e protetores para manter suas cartas em perfeito estado"
        />

        <div className="space-y-4 font-body text-muted-foreground">
          <div><strong className="text-foreground">Organize desde o primeiro dia</strong> — Use o fichário do Starter Pack e a checklist oficial. Com 633+ cartas, organização é fundamental.</div>
          <div><strong className="text-foreground">Troque cartas repetidas</strong> — Encontre outros colecionadores em grupos de redes sociais ou eventos. Trocas são mais eficientes do que comprar mais pacotes.</div>
        </div>

        <h3 className="font-display text-xl tracking-wider uppercase text-foreground mt-8 mb-3">Entenda as Probabilidades</h3>
        <div className="overflow-x-auto mb-6">
          <table className="w-full border-collapse">
            <thead><tr><th className="bg-foreground text-background p-3 text-left font-display tracking-wider uppercase text-sm">Tipo de Carta</th><th className="bg-foreground text-background p-3 text-left font-display tracking-wider uppercase text-sm">Probabilidade</th></tr></thead>
            <tbody className="font-body text-muted-foreground">
              {[
                ["Cartas Base (Heroes)", "Comum (todo pacote)"],
                ["Special 2 (Top Keepers, Defensive Rocks, etc.)", "~1 por pacote"],
                ["Special 1 (Master Rookies)", "~1 por pacote"],
                ["Golden Ballers", "1 a cada 20 pacotes"],
                ["Eternos 22 / Emblema Ultra Raro", "1 a cada 70 pacotes"],
              ].map(([tipo, prob], i) => (
                <tr key={i} className={i % 2 === 1 ? "bg-muted" : ""}>
                  <td className="p-2.5 px-4 border-b border-border">{tipo}</td>
                  <td className="p-2.5 px-4 border-b border-border">{prob}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="space-y-4 font-body text-muted-foreground">
          <div><strong className="text-foreground">Diversifique seus produtos</strong> — Cada tipo traz cartas exclusivas diferentes: Tins têm Trophy Cards, Premium Packs têm Premium Limited Edition, Dream Box tem FIFA World Cup Master e Momentum.</div>
          <div><strong className="text-foreground">Proteja suas melhores cartas</strong> — Use sleeves (protetores plásticos) para manter cartas raras em perfeito estado.</div>
          <div><strong className="text-foreground">Fique atento ao Update Edition</strong> — A Panini prevê um set de 48 cartas extras para abril de 2026, incluindo seleções classificadas nos play-ins.</div>
        </div>

        {/* 11 */}
        <SectionTitle id="secao-11" n={11}>Perguntas Frequentes (FAQ)</SectionTitle>
        <div className="space-y-6">
          {faqItems.map((item, i) => (
            <div key={i} className="border-b border-border pb-4">
              <h4 className="font-display text-base tracking-wider uppercase text-destructive mb-2">{item.q}</h4>
              <p className="font-body text-muted-foreground">{item.a}</p>
            </div>
          ))}
        </div>

        {/* Final CTA */}
        <div className="bg-gradient-to-br from-foreground to-secondary rounded-xl p-8 text-center my-10">
          <h3 className="font-display text-2xl tracking-wider uppercase text-white mb-3">Pronto para Começar Sua Coleção?</h3>
          <p className="text-white/90 font-body mb-4">Na Bella Figurinha você encontra todos os produtos oficiais do Adrenalyn XL FIFA World Cup 2026™ — do Starter Pack à Dream Box.</p>
          <Link to="/#produtos" className="inline-block bg-destructive text-white py-3.5 px-8 rounded-lg font-bold text-lg hover:opacity-90 transition-opacity font-display tracking-wider uppercase">
            Comprar Agora na Bella Figurinha
          </Link>
        </div>

        {/* Disclaimer */}
        <div className="text-center text-xs text-muted-foreground mt-10 space-y-1">
          <p>Sobre este guia: Este conteúdo foi produzido pela equipe Bella Figurinha com base nas informações oficiais da Panini e nas regras do jogo Adrenalyn XL FIFA World Cup 2026™.</p>
          <p>FIFA World Cup 2026™ e Adrenalyn XL™ são marcas registradas de seus respectivos proprietários.</p>
          <p>Última atualização: Março de 2026</p>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default GuiaAdrenalynXL;
