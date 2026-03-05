import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SEOHead } from "@/components/SEOHead";
import { ProductCard } from "@/components/ProductCard";
import { useProducts } from "@/hooks/useProducts";
import { Loader2, Package, Truck, Shield, Award, ArrowDown } from "lucide-react";
import { homePageJsonLd, injectJsonLd } from "@/lib/jsonld";
import heroBg from "@/assets/hero-bg.jpg";
import logo from "@/assets/logo-bella.png";

const Index = () => {
  const { data: products, isLoading, error } = useProducts();
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const el = document.querySelector(location.hash);
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: "smooth" }), 100);
      }
    }
  }, [location.hash]);

  // Inject Home page JSON-LD
  useEffect(() => {
    return injectJsonLd("home", homePageJsonLd());
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Bella Figurinha | Comprar Figurinhas e Cards FIFA World Cup 2026 Panini"
        description="Distribuidor oficial Panini. Compre figurinhas e cards Adrenalyn XL FIFA World Cup 2026™ com envio para todo Brasil. Produto original, frete grátis nos kits."
        canonical="https://bellafigurinha.com.br/"
      />
      <Header />
      {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "Como Jogar Adrenalyn XL FIFA World Cup 2026",
  "description": "Guia completo de como jogar o card game oficial da Copa do Mundo FIFA 2026. Aprenda as regras, monte seu time, dispute partidas e domine todos os modos de jogo do Adrenalyn XL da Panini.",
  "url": "https://bellafigurinha.com.br/guias/como-jogar-adrenalyn-xl-fifa-world-cup-2026",
  "image": {
    "@type": "ImageObject",
    "url": "https://bellafigurinha.com.br/images/guias/adrenalyn-xl-como-jogar-cover.jpg",
    "width": 1200,
    "height": 630
  },
  "totalTime": "PT20M",
  "estimatedCost": {
    "@type": "MonetaryAmount",
    "currency": "BRL",
    "value": "0",
    "description": "Gratuito — basta ter as cartas e o tabuleiro do Starter Pack"
  },
  "supply": [
    {
      "@type": "HowToSupply",
      "name": "Starter Pack Adrenalyn XL FIFA World Cup 2026",
      "description": "Inclui tabuleiro (gameboard), guia oficial de regras, cartas, moeda e Limited Editions"
    },
    {
      "@type": "HowToSupply",
      "name": "Cartas de jogadores (mínimo 14 por jogador)",
      "description": "11 titulares + 3 reservas por time para o modo Clássico"
    },
    {
      "@type": "HowToSupply",
      "name": "Cartas Bônus (opcional)",
      "description": "Cartas de Escudo do Time ou Emblema Oficial da FIFA World Cup 2026 para aumentar atributos em +5 ou +10 pontos"
    },
    {
      "@type": "HowToSupply",
      "name": "Moeda",
      "description": "Para o sorteio do pontapé inicial (incluída no Starter Pack)"
    }
  ],
  "tool": [
    {
      "@type": "HowToTool",
      "name": "Tabuleiro de jogo (Gameboard)",
      "description": "Superfície oficial para posicionar as cartas nas posições de goleiro, defesa, meio-campo e ataque"
    }
  ],
  "step": [
    {
      "@type": "HowToSection",
      "name": "Preparação da Partida",
      "position": 1,
      "itemListElement": [
        {
          "@type": "HowToStep",
          "position": 1,
          "name": "Selecione Seu Time",
          "text": "Comece formando o melhor time a partir das suas cartas. Você deve ter 11 jogadores titulares e 5 reservas. Inclua obrigatoriamente 1 goleiro e no máximo 5 jogadores em cada setor (defesa, meio-campo e ataque).",
          "image": {
            "@type": "ImageObject",
            "url": "https://bellafigurinha.com.br/images/guias/passo-1-selecione-seu-time.jpg"
          },
          "url": "https://bellafigurinha.com.br/guias/como-jogar-adrenalyn-xl-fifa-world-cup-2026#selecione-seu-time"
        },
        {
          "@type": "HowToStep",
          "position": 2,
          "name": "Defina Sua Escalação",
          "text": "Escolha sua formação tática no tabuleiro: defesa de 3 ou 4? Dois ou três atacantes? Todas as formações possíveis são permitidas — a escolha é sua!",
          "image": {
            "@type": "ImageObject",
            "url": "https://bellafigurinha.com.br/images/guias/passo-2-escalacao.jpg"
          },
          "url": "https://bellafigurinha.com.br/guias/como-jogar-adrenalyn-xl-fifa-world-cup-2026#escalacao"
        },
        {
          "@type": "HowToStep",
          "position": 3,
          "name": "Posicione as Cartas no Tabuleiro",
          "text": "Coloque todas as suas cartas viradas para baixo no tabuleiro, cada uma na posição correspondente (goleiro, defesa, meio-campo, ataque). Durante o jogo você não pode espiar as cartas — um bom técnico conhece seu time de cor!",
          "image": {
            "@type": "ImageObject",
            "url": "https://bellafigurinha.com.br/images/guias/passo-3-posicione-cartas.jpg"
          },
          "url": "https://bellafigurinha.com.br/guias/como-jogar-adrenalyn-xl-fifa-world-cup-2026#prepare-se-para-jogar"
        }
      ]
    },
    {
      "@type": "HowToSection",
      "name": "Jogando a Partida",
      "position": 2,
      "itemListElement": [
        {
          "@type": "HowToStep",
          "position": 4,
          "name": "Pontapé Inicial: Sorteie Quem Começa",
          "text": "Lance a moeda para decidir quem dá o pontapé inicial. O vencedor do sorteio escolhe uma de suas cartas e decide se vai atacar, defender ou controlar o jogo — sem revelar a carta ainda.",
          "image": {
            "@type": "ImageObject",
            "url": "https://bellafigurinha.com.br/images/guias/passo-4-kick-off.jpg"
          },
          "url": "https://bellafigurinha.com.br/guias/como-jogar-adrenalyn-xl-fifa-world-cup-2026#pontape-inicial"
        },
        {
          "@type": "HowToStep",
          "position": 5,
          "name": "Dispute o Duelo: Ataque, Defesa ou Controle",
          "text": "O adversário responde escolhendo uma de suas cartas ao mesmo tempo. Se você atacou, ele defende (e vice-versa). Se escolheu Controle, ele também usa Controle. Ambos revelam as cartas: o maior valor vence, marca um gol e mantém a posse de bola. Em empate, compare os valores totais.",
          "image": {
            "@type": "ImageObject",
            "url": "https://bellafigurinha.com.br/images/guias/passo-5-duelo.jpg"
          },
          "url": "https://bellafigurinha.com.br/guias/como-jogar-adrenalyn-xl-fifa-world-cup-2026#kick-off"
        },
        {
          "@type": "HowToStep",
          "position": 6,
          "name": "Use Pênaltis Como Coringa Defensivo",
          "text": "Se você estiver defendendo, antes do adversário revelar sua jogada, você pode gritar 'Pênalti!'. Compare os ícones de shoot-out: se a direção do chute bater com a defesa do seu goleiro, você vence o desafio — mesmo que o valor numérico adversário seja maior.",
          "image": {
            "@type": "ImageObject",
            "url": "https://bellafigurinha.com.br/images/guias/passo-6-penalti.jpg"
          },
          "url": "https://bellafigurinha.com.br/guias/como-jogar-adrenalyn-xl-fifa-world-cup-2026#penalti"
        },
        {
          "@type": "HowToStep",
          "position": 7,
          "name": "Faça Substituições Estratégicas",
          "text": "Você pode usar até 5 reservas ao longo da partida. Para substituir, troque um reserva por uma carta que já está em campo antes do próximo duelo. Use com sabedoria: substituições podem virar o resultado!",
          "image": {
            "@type": "ImageObject",
            "url": "https://bellafigurinha.com.br/images/guias/passo-7-substituicao.jpg"
          },
          "url": "https://bellafigurinha.com.br/guias/como-jogar-adrenalyn-xl-fifa-world-cup-2026#substituicao"
        },
        {
          "@type": "HowToStep",
          "position": 8,
          "name": "Ative as Cartas Bônus",
          "text": "Jogue uma carta de Escudo do Time junto com jogadores do mesmo time para ganhar +5 pontos em todos os atributos. O Emblema Oficial da FIFA World Cup 2026 concede +10 pontos e pode ser usado com qualquer jogador. As cartas bônus são descartadas após o uso.",
          "image": {
            "@type": "ImageObject",
            "url": "https://bellafigurinha.com.br/images/guias/passo-8-carta-bonus.jpg"
          },
          "url": "https://bellafigurinha.com.br/guias/como-jogar-adrenalyn-xl-fifa-world-cup-2026#carta-bonus"
        }
      ]
    },
    {
      "@type": "HowToSection",
      "name": "Fim da Partida",
      "position": 3,
      "itemListElement": [
        {
          "@type": "HowToStep",
          "position": 9,
          "name": "Apito Final: Conte os Gols e Vença",
          "text": "Quando todas as cartas forem usadas, quem marcou mais gols vence a partida! Em empate no placar, use o modo Disputa de Pênaltis (1 goleiro + 5 cobradores) para definir o campeão.",
          "image": {
            "@type": "ImageObject",
            "url": "https://bellafigurinha.com.br/images/guias/passo-9-apito-final.jpg"
          },
          "url": "https://bellafigurinha.com.br/guias/como-jogar-adrenalyn-xl-fifa-world-cup-2026#apito-final"
        }
      ]
    }
  ],
  "about": {
    "@type": "Thing",
    "name": "Adrenalyn XL FIFA World Cup 2026",
    "description": "Card game oficial da Copa do Mundo FIFA 2026, produzido pela Panini. Coleção com 633 cartas incluindo Heroes, Icons, Fan Favourites, Golden Ballers e Eternos 22."
  },
  "mentions": [
    {
      "@type": "Brand",
      "name": "Panini",
      "url": "https://fifaworldcup26.paniniadrenalyn.com"
    },
    {
      "@type": "SportsEvent",
      "name": "FIFA World Cup 2026",
      "location": {
        "@type": "Place",
        "name": "Estados Unidos, Canadá e México"
      },
      "startDate": "2026-06-11",
      "endDate": "2026-07-19"
    }
  ],
  "publisher": {
    "@type": "Organization",
    "name": "Bella Figurinha",
    "url": "https://bellafigurinha.com.br",
    "logo": {
      "@type": "ImageObject",
      "url": "https://bellafigurinha.com.br/images/logo-bella-figurinha.png"
    }
  },
  "inLanguage": "pt-BR",
  "datePublished": "2026-03-05",
  "dateModified": "2026-03-05"
}

      {/* Hero */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroBg} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/70" />
        </div>

        <div className="container mx-auto px-4 relative z-10 pt-24 pb-16">
          <div className="flex flex-col items-center text-center space-y-8">
            <div className="floating opacity-0 animate-fade-in">
              <img src={logo} alt="Bella Figurinha" className="w-44 md:w-64 drop-shadow-2xl" />
            </div>

            <span className="inline-block bg-secondary/90 text-secondary-foreground font-display text-sm md:text-base tracking-widest uppercase px-5 py-1.5 rounded-full opacity-0 animate-fade-in [animation-delay:0.1s]">
              Distribuidor Oficial Panini
            </span>

            <h1 className="font-display text-5xl md:text-8xl lg:text-9xl tracking-wider leading-none text-white opacity-0 animate-fade-in [animation-delay:0.15s] drop-shadow-lg">
              COLECIONE{" "}
              <span className="text-gradient-yellow">MEMÓRIAS!</span>
            </h1>

            <p className="text-lg md:text-xl text-white/90 max-w-2xl font-body opacity-0 animate-fade-in [animation-delay:0.3s] drop-shadow">
              Cards FIFA World Cup 2026™ Adrenalyn XL™ — Os melhores cards e figurinhas colecionáveis. Confira nosso catálogo!
            </p>

            <div className="flex flex-col sm:flex-row gap-4 opacity-0 animate-fade-in [animation-delay:0.45s]">
              <a
                href="#produtos"
                className="bg-gradient-yellow text-primary-foreground font-display text-xl md:text-2xl tracking-wider uppercase px-12 py-5 rounded-xl hover:opacity-90 transition-opacity shadow-yellow-lg animate-pulse-glow"
              >
                Ver Catálogo
              </a>
            </div>
          </div>
        </div>

        {/* Trust strip */}
        <div className="absolute bottom-0 left-0 right-0 bg-black/50 backdrop-blur-sm border-t border-white/10">
          <div className="container mx-auto px-4 py-4">
            <div className="flex flex-wrap justify-center gap-6 md:gap-12 text-white/70 text-sm font-body">
              <div className="flex items-center gap-2">
                <Truck size={18} className="text-primary" />
                <span>Envio para todo Brasil</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield size={18} className="text-primary" />
                <span>Produto 100% Original</span>
              </div>
              <div className="flex items-center gap-2">
                <Award size={18} className="text-primary" />
                <span>Distribuidor Oficial Panini</span>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 animate-bounce opacity-40">
          <ArrowDown size={24} className="text-white" />
        </div>
      </section>

      {/* Products */}
      <section id="produtos" className="container mx-auto px-4 py-20">
        <div className="text-center mb-14">
          <span className="inline-block bg-secondary/10 text-secondary font-display text-sm tracking-widest uppercase px-4 py-1.5 rounded-full mb-4">
            Catálogo
          </span>
          <h2 className="font-display text-4xl md:text-6xl tracking-wider uppercase text-foreground">
            Nossos <span className="text-gradient-yellow">Produtos</span>
          </h2>
          <p className="text-muted-foreground mt-3 font-body">Confira os lançamentos disponíveis</p>
        </div>

        {isLoading && (
          <div className="flex justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        )}

        {error && (
          <div className="text-center py-20 text-destructive">
            <p className="font-body">Erro ao carregar produtos. Tente novamente mais tarde.</p>
          </div>
        )}

        {!isLoading && !error && products && products.length === 0 && (
          <div className="text-center py-20">
            <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground font-body">Nenhum produto encontrado.</p>
          </div>
        )}

        {products && products.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <ProductCard key={product.node.id} product={product} />
            ))}
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
};

export default Index;
