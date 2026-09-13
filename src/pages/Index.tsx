import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SEOHead } from "@/components/SEOHead";
import { ProductCard } from "@/components/ProductCard";
import { Countdown } from "@/components/Countdown";
import { useProducts } from "@/hooks/useProducts";
import { Loader2, Package, Truck, Shield, Sparkles, MapPin, Star, ArrowRight } from "lucide-react";
import { type ShopifyProduct } from "@/lib/shopify";
import { homePageJsonLd, injectJsonLd } from "@/lib/jsonld";
import { trackEvent } from "@/lib/analytics";
import { DROP_DATE_LABEL } from "@/lib/drop";
import heroCards from "@/assets/hero-cards-2026.jpg";
import dropCards from "@/assets/drop-cards.jpg";
import logo from "@/assets/logo-bella.png";
import weAre26Video from "@/assets/we-are-26.mp4.asset.json";

/** Palavras-chave que identificam produtos de Figurinhas/Álbuns da Copa */
const isCopaStickerProduct = (p: ShopifyProduct) => {
  const text = (p.node.title + " " + p.node.handle).toLowerCase();
  return (
    text.includes("album") ||
    text.includes("álbum") ||
    text.includes("figurinha") ||
    text.includes("sticker") ||
    text.includes("we are 26") ||
    (text.includes("envelope") && !text.includes("adrenalyn"))
  );
};

const comingSoon = [
  { title: "Booster Packs", text: "Pacotes individuais para abrir e colecionar." },
  { title: "Boxes", text: "Caixas fechadas com maior volume e melhores chances." },
  { title: "Coleções Especiais", text: "Edições comemorativas e lançamentos limitados." },
  { title: "Acessórios", text: "Sleeves, binders e tudo para proteger a coleção." },
  { title: "Outros Colecionáveis", text: "Novas linhas que chegam a cada drop." },
];

const Index = () => {
  const { data: products, isLoading, error } = useProducts();
  const location = useLocation();

  const copaProducts =
    products?.filter(isCopaStickerProduct).sort((a, b) => {
      const aWeAre26 = (a.node.title + " " + a.node.handle).toLowerCase().includes("we are 26");
      const bWeAre26 = (b.node.title + " " + b.node.handle).toLowerCase().includes("we are 26");
      if (aWeAre26 && !bWeAre26) return -1;
      if (!aWeAre26 && bWeAre26) return 1;
      return 0;
    }) || [];
  const adrenalynProducts = products?.filter((p) => !isCopaStickerProduct(p)) || [];

  useEffect(() => {
    if (location.hash) {
      const el = document.querySelector(location.hash);
      if (el) setTimeout(() => el.scrollIntoView({ behavior: "smooth" }), 100);
    }
  }, [location.hash]);

  useEffect(() => {
    trackEvent("landing_view", { page: "home" });
    return injectJsonLd("home", homePageJsonLd());
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Bella Figurinha | Cards, Coleções e Raridades"
        description="Um novo universo de cards e colecionáveis. Cards Pokémon, COPAG, Copa 2026 e mais. Primeiro drop e quiosque no Palladium em 25 de setembro."
        canonical="https://bellafigurinha.com.br/"
      />
      <Header />

      {/* ====== HERO — nova Bella ====== */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-ink">
        <div className="absolute inset-0">
          <img
            src={heroCards}
            alt="Cards colecionáveis em destaque"
            width={1920}
            height={1080}
            fetchPriority="high"
            decoding="async"
            className="w-full h-full object-cover opacity-70"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/60 to-ink" />
        </div>

        <div className="container mx-auto px-4 relative z-10 pt-32 pb-20">
          <div className="flex flex-col items-center text-center space-y-7">
            <img src={logo} alt="Bella Figurinha" className="w-36 md:w-52 drop-shadow-2xl floating" />

            <span className="inline-flex items-center gap-2 bg-electric/15 text-electric font-display text-sm md:text-base tracking-widest uppercase px-5 py-1.5 rounded-full">
              <Sparkles size={16} /> 30 anos de cards
            </span>

            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl tracking-wider leading-none text-white">
              Um novo universo está chegando à{" "}
              <span className="text-gradient-electric">Bella</span>
            </h1>

            <p className="font-display text-2xl md:text-4xl tracking-widest uppercase text-white/90">
              Cards. Coleções. Raridades.
            </p>

            <p className="font-body text-base md:text-lg text-white/75 max-w-2xl">
              Comemoramos os 30 anos da coleção de cards mais amada do mundo abrindo nosso quiosque no Shopping
              Palladium e lançando o primeiro drop em {DROP_DATE_LABEL}.
            </p>

            <Countdown className="justify-center flex-wrap" />

            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <Link
                to="/acesso-antecipado"
                onClick={() => trackEvent("early_access_cta_click", { location: "hero" })}
                className="bg-gradient-electric text-ink font-display text-xl tracking-wider uppercase px-10 py-4 rounded-xl shadow-electric hover:opacity-90 transition-opacity"
              >
                Quero acesso antecipado
              </Link>
              <a
                href="#o-que-esta-chegando"
                className="border border-white/25 text-white font-display text-xl tracking-wider uppercase px-10 py-4 rounded-xl hover:bg-white/10 transition-colors"
              >
                Descobrir a nova Bella
              </a>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 bg-black/50 backdrop-blur-sm border-t border-white/10">
          <div className="container mx-auto px-4 py-4">
            <div className="flex flex-wrap justify-center gap-6 md:gap-12 text-white/70 text-sm font-body">
              <div className="flex items-center gap-2">
                <Truck size={18} className="text-electric" />
                <span>Envio para todo o Brasil</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield size={18} className="text-electric" />
                <span>Produtos 100% originais</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={18} className="text-electric" />
                <span>Quiosque no Shopping Palladium</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====== DESTAQUE — cards Pokémon ====== */}
      <section className="bg-arena text-white py-20">
        <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-10 items-center">
          <div className="relative rounded-3xl overflow-hidden holo-border">
            <img src={dropCards} alt="Cards colecionáveis do primeiro drop" className="w-full h-full object-cover" loading="lazy" />
          </div>
          <div className="space-y-5">
            <span className="inline-block bg-electric/15 text-electric font-display text-sm tracking-widest uppercase px-4 py-1.5 rounded-full">
              O principal destaque
            </span>
            <h2 className="font-display text-4xl md:text-6xl tracking-wider uppercase leading-none">
              Cards <span className="text-gradient-electric">Pokémon</span> na Bella
            </h2>
            <p className="font-body text-white/80 text-lg">
              Booster packs, boxes, coleções especiais e acessórios. Quem entrar na lista de acesso antecipado recebe o
              aviso primeiro e acessa a condição promocional de lançamento em produtos Pokémon selecionados — 1 item por
              CPF, enquanto durar o estoque.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/acesso-antecipado"
                onClick={() => trackEvent("early_access_cta_click", { location: "pokemon_block" })}
                className="bg-gradient-electric text-ink font-display text-lg tracking-widest uppercase px-8 py-3 rounded-xl shadow-electric"
              >
                Entrar na lista
              </Link>
              <Link
                to="/pokemon"
                className="inline-flex items-center gap-2 border border-white/25 font-display text-lg tracking-widest uppercase px-8 py-3 rounded-xl hover:bg-white/10 transition-colors"
              >
                Ver a categoria <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ====== O QUE ESTÁ CHEGANDO ====== */}
      <section id="o-que-esta-chegando" className="container mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="font-display text-4xl md:text-6xl tracking-wider uppercase">O que está chegando</h2>
          <p className="font-body text-muted-foreground mt-3 max-w-2xl mx-auto">
            As linhas que abrem a nova fase da Bella. Os primeiros produtos entram no catálogo a partir do drop de{" "}
            {DROP_DATE_LABEL}.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {comingSoon.map((item) => (
            <Link
              key={item.title}
              to="/cards-e-colecionaveis"
              className="group rounded-2xl border border-border bg-card p-6 hover:border-secondary transition-colors"
            >
              <span className="inline-block bg-secondary/10 text-secondary font-display text-xs tracking-widest uppercase px-3 py-1 rounded-full">
                Em breve
              </span>
              <h3 className="font-display text-2xl tracking-wider uppercase mt-4">{item.title}</h3>
              <p className="font-body text-sm text-muted-foreground mt-2">{item.text}</p>
              <span className="inline-flex items-center gap-1 font-body text-sm text-secondary mt-4 group-hover:gap-2 transition-all">
                Saiba mais <ArrowRight size={14} />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* ====== QUIOSQUE PALLADIUM ====== */}
      <section className="bg-muted py-20">
        <div className="container mx-auto px-4 text-center space-y-5">
          <span className="inline-flex items-center gap-2 bg-secondary/10 text-secondary font-display text-sm tracking-widest uppercase px-4 py-1.5 rounded-full">
            <MapPin size={16} /> Shopping Palladium · Curitiba
          </span>
          <h2 className="font-display text-4xl md:text-6xl tracking-wider uppercase">Venha colecionar com a gente</h2>
          <p className="font-body text-muted-foreground max-w-2xl mx-auto">
            Nosso quiosque abre em {DROP_DATE_LABEL} para comemorar os 30 anos dos cards. É lá que a condição de
            lançamento da lista de acesso antecipado é resgatada, pessoalmente, com o CPF cadastrado.
          </p>
          <Link
            to="/loja-fisica"
            className="inline-block bg-gradient-yellow text-primary-foreground font-display text-lg tracking-widest uppercase px-8 py-4 rounded-xl shadow-yellow"
          >
            Ver a loja física
          </Link>
        </div>
      </section>

      {/* ====== MUITO ALÉM DOS CARDS — COPAG ====== */}
      <section className="container mx-auto px-4 py-20">
        <div className="rounded-3xl border border-border bg-card p-8 md:p-14 text-center space-y-5">
          <h2 className="font-display text-4xl md:text-6xl tracking-wider uppercase">Muito além dos cards</h2>
          <p className="font-body text-muted-foreground max-w-2xl mx-auto">
            Jogos e colecionáveis COPAG para reunir pessoas dentro e fora da mesa. Uma linha que amplia a experiência da
            Bella para toda a família.
          </p>
          <Link
            to="/copag"
            className="inline-flex items-center gap-2 font-display text-lg tracking-widest uppercase text-secondary"
          >
            Conhecer a linha COPAG <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      {/* ====== BANNER — Box Premium "We Are 26" ====== */}
      <section className="container mx-auto px-4 pb-4">
        <div className="relative overflow-hidden rounded-3xl border border-primary/30 bg-gradient-to-br from-black via-zinc-900 to-black shadow-yellow-lg">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 items-center">
            <div className="relative aspect-[9/16] lg:aspect-auto lg:h-[600px] bg-black">
              <video src={weAre26Video.url} autoPlay muted loop playsInline controls className="w-full h-full object-cover" />
            </div>

            <div className="p-8 md:p-12 lg:p-14 space-y-6">
              <span className="inline-block bg-primary/15 text-primary font-display text-xs md:text-sm tracking-widest uppercase px-4 py-1.5 rounded-full">
                Novidade Exclusiva
              </span>
              <h2 className="font-display text-4xl md:text-5xl lg:text-6xl tracking-wider uppercase text-white leading-none">
                Box Premium <span className="text-gradient-yellow">"We Are 26"</span>
              </h2>
              <p className="text-white/80 font-body text-base md:text-lg leading-relaxed">Ele inclui:</p>
              <ul className="space-y-3 text-white/90 font-body">
                {[
                  <>1 álbum oficial capa dura <strong>dourado</strong></>,
                  <>1 álbum oficial capa dura <strong>prata</strong></>,
                  <>40 envelopes oficiais Panini</>,
                  <>Box colecionador premium exclusivo</>,
                  <>Embalagem especial temática "We Are 26"</>,
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Star className="text-primary mt-0.5 shrink-0" size={18} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <a
                href="#produtos"
                className="inline-block bg-gradient-yellow text-primary-foreground font-display text-lg md:text-xl tracking-wider uppercase px-8 py-4 rounded-xl hover:opacity-90 transition-opacity shadow-yellow-lg"
              >
                Garantir o meu
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ====== CATEGORIA — Copa 2026 ====== */}
      <section id="produtos" className="container mx-auto px-4 pt-16 pb-10">
        <div className="text-center mb-14">
          <span className="inline-block bg-secondary/10 text-secondary font-display text-sm tracking-widest uppercase px-4 py-1.5 rounded-full mb-4">
            Categoria
          </span>
          <h2 className="font-display text-4xl md:text-6xl tracking-wider uppercase text-foreground">
            Álbum & Figurinhas <span className="text-gradient-yellow">Copa 2026</span>
          </h2>
          <p className="text-muted-foreground mt-3 font-body max-w-2xl mx-auto">
            Álbuns, envelopes e cards oficiais da FIFA World Cup 2026™ continuam disponíveis com envio para todo o
            Brasil.
          </p>
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

        {!isLoading && !error && copaProducts.length === 0 && (
          <div className="text-center py-12">
            <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground font-body">Em breve — produtos da Copa serão adicionados.</p>
          </div>
        )}

        {copaProducts.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {copaProducts.map((product) => (
              <ProductCard key={product.node.id} product={product} />
            ))}
          </div>
        )}
      </section>

      {/* ====== CATEGORIA — Adrenalyn XL ====== */}
      {!isLoading && !error && adrenalynProducts.length > 0 && (
        <section className="container mx-auto px-4 pt-10 pb-20">
          <div className="text-center mb-14">
            <span className="inline-block bg-secondary/10 text-secondary font-display text-sm tracking-widest uppercase px-4 py-1.5 rounded-full mb-4">
              Categoria
            </span>
            <h2 className="font-display text-4xl md:text-6xl tracking-wider uppercase text-foreground">
              Cards <span className="text-gradient-yellow">Adrenalyn XL</span>
            </h2>
            <p className="text-muted-foreground mt-3 font-body">
              A coleção oficial de trading cards FIFA World Cup 2026™
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {adrenalynProducts.map((product) => (
              <ProductCard key={product.node.id} product={product} />
            ))}
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
};

export default Index;
