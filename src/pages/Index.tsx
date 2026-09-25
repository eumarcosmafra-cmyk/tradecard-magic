import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SEOHead } from "@/components/SEOHead";
import { Pokemon30Showcase } from "@/components/Pokemon30Showcase";
import { HomeProducts } from "@/components/HomeProducts";
import { Truck, Shield, MapPin, ArrowRight, Clock, Navigation } from "lucide-react";
import { homePageJsonLd, injectJsonLd } from "@/lib/jsonld";
import { trackEvent } from "@/lib/analytics";
import { MAPS_URL } from "@/lib/drop";
import logo from "@/assets/logo-bella.png";
import quiosqueArena from "@/assets/quiosque-arena.png.asset.json";

const categories = [
  { title: "Pokémon", to: "/pokemon", text: "Coleções comemorativas de 30 anos de cards." },
  { title: "Cards & Colecionáveis", to: "/cards-e-colecionaveis", text: "Boosters, boxes e acessórios para colecionar." },
  { title: "COPAG", to: "/copag", text: "Jogos e colecionáveis para reunir a mesa." },
  { title: "Copa 2026", to: "/copa-2026", text: "Álbuns, envelopes e Adrenalyn XL da Copa." },
];

const Index = () => {
  const location = useLocation();

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
        title="Bella Figurinha | Pokémon 30 anos no Palladium"
        description="Quiosque Pokémon 30 anos aberto no Shopping Palladium, Curitiba. Cards, boxes, boosters e colecionáveis — visite ou compre online."
        canonical="https://bellafigurinha.com.br/"
      />
      <Header />

      {/* ====== HERO ====== */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-ink">
        <div className="absolute inset-0">
          <img
            src={quiosqueArena.url}
            alt="Quiosque Bella Figurinha no Shopping Palladium"
            fetchPriority="high"
            decoding="async"
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/60 to-ink" />
        </div>

        <div className="container mx-auto px-4 relative z-10 pt-32 pb-24">
          <div className="flex flex-col items-center text-center space-y-7">
            <img src={logo} alt="Bella Figurinha" className="w-36 md:w-52 drop-shadow-2xl floating" />

            <span className="inline-flex items-center gap-2 bg-electric/15 text-electric font-display text-sm md:text-base tracking-widest uppercase px-5 py-1.5 rounded-full">
              <span className="h-2 w-2 rounded-full bg-electric animate-pulse" /> Aberto agora · Shopping Palladium · Curitiba
            </span>

            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl tracking-wider leading-none text-white">
              Pokémon 30 anos chegou à <span className="text-gradient-electric">Bella</span>
            </h1>

            <p className="font-display text-2xl md:text-4xl tracking-widest uppercase text-white/90">
              Cards. Coleções. Raridades.
            </p>

            <p className="font-body text-lg text-white/85 max-w-2xl">
              Nosso quiosque está aberto e funcionando. Venha conhecer as coleções comemorativas de 30 anos de perto.
            </p>

            <p className="inline-flex items-center gap-2 font-body text-base text-white/80">
              <Clock size={18} className="text-electric" /> Shopping Palladium · Curitiba · Aberto no horário do shopping
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href={MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent("store_directions_click", { placement: "hero" })}
                className="inline-flex items-center justify-center gap-2 bg-gradient-electric text-ink font-display text-xl tracking-wider uppercase px-10 py-4 rounded-xl shadow-electric hover:opacity-90 transition-opacity"
              >
                <Navigation size={20} /> Como chegar
              </a>
              <Link
                to="/pokemon"
                className="inline-flex items-center justify-center border border-white/30 text-white font-display text-xl tracking-wider uppercase px-10 py-4 rounded-xl hover:bg-white/10 transition-colors"
              >
                Comprar online
              </Link>
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

      {/* ====== PRODUTOS NA LOJA ====== */}
      <HomeProducts />


      {/* ====== O QUE VEM EM CADA COLEÇÃO ====== */}
      <Pokemon30Showcase />

      {/* ====== QUIOSQUE PALLADIUM ====== */}
      <section className="bg-muted py-20">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-10 items-center">
          <div className="rounded-3xl overflow-hidden border border-border shadow-yellow">
            <img
              src={quiosqueArena.url}
              alt="Quiosque da Bella Figurinha com arena de cards no shopping"
              loading="lazy"
              className="w-full h-full object-cover aspect-[4/3]"
            />
          </div>
          <div className="space-y-5 text-center md:text-left">
            <span className="inline-flex items-center gap-2 bg-secondary/10 text-secondary font-display text-sm tracking-widest uppercase px-4 py-1.5 rounded-full">
              <MapPin size={16} /> Shopping Palladium · Curitiba
            </span>
            <h2 className="font-display text-4xl md:text-6xl tracking-wider uppercase">Venha colecionar com a gente</h2>
            <p className="font-body text-muted-foreground max-w-2xl">
              Nosso quiosque está aberto e funcionando no Shopping Palladium, em Curitiba, comemorando os 30 anos dos
              cards. Venha ver as coleções de perto, tirar dúvidas e levar a sua.
            </p>
            <Link
              to="/loja-fisica"
              className="inline-flex items-center gap-2 font-display text-lg tracking-widest uppercase text-secondary"
            >
              Ver a loja física <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* ====== CATEGORIAS ====== */}
      <section id="o-que-esta-chegando" className="container mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="font-display text-4xl md:text-6xl tracking-wider uppercase">Navegue por categoria</h2>
          <p className="font-body text-muted-foreground mt-3 max-w-2xl mx-auto">
            Tudo que a Bella tem hoje, em quatro caminhos.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((item) => (
            <Link
              key={item.title}
              to={item.to}
              className="group rounded-2xl border border-border bg-card p-6 hover:border-secondary transition-colors"
            >
              <h3 className="font-display text-2xl tracking-wider uppercase">{item.title}</h3>
              <p className="font-body text-sm text-muted-foreground mt-2">{item.text}</p>
              <span className="inline-flex items-center gap-1 font-body text-sm text-secondary mt-4 group-hover:gap-2 transition-all">
                Ver produtos <ArrowRight size={14} />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* ====== CTA FINAL — visite o quiosque ====== */}
      <section className="bg-arena text-white py-20">
        <div className="container mx-auto px-4 text-center space-y-5">
          <h2 className="font-display text-4xl md:text-6xl tracking-wider uppercase leading-none">
            Te esperamos no Palladium
          </h2>
          <p className="font-body text-white/80 max-w-2xl mx-auto">
            O quiosque Bella Figurinha Pokémon 30 anos está aberto no Shopping Palladium, em Curitiba. Venha conhecer
            as coleções de perto — ou compre online e receba em casa.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent("store_directions_click", { placement: "home_footer_cta" })}
              className="inline-flex items-center justify-center gap-2 bg-gradient-electric text-ink font-display text-xl tracking-widest uppercase px-10 py-4 rounded-xl shadow-electric"
            >
              <Navigation size={20} /> Como chegar
            </a>
            <Link
              to="/pokemon"
              className="inline-flex items-center justify-center border border-white/30 text-white font-display text-xl tracking-widest uppercase px-10 py-4 rounded-xl"
            >
              Comprar online
            </Link>
          </div>
        </div>
      </section>

      {/* ====== FAIXAS SECUNDÁRIAS — Copa e COPAG ====== */}
      <section className="container mx-auto px-4 py-20 space-y-4">
        <Link
          to="/copa-2026"
          className="flex flex-col sm:flex-row items-center justify-between gap-4 rounded-2xl border border-border bg-muted px-6 py-5 hover:border-secondary transition-colors"
        >
          <span className="font-display text-xl md:text-2xl tracking-wider uppercase">
            Coleção Copa 2026 — últimas unidades
          </span>
          <span className="inline-flex items-center gap-2 font-display text-base tracking-widest uppercase text-secondary">
            Ver a coleção <ArrowRight size={16} />
          </span>
        </Link>
        <Link
          to="/copag"
          className="flex flex-col sm:flex-row items-center justify-between gap-4 rounded-2xl border border-border bg-muted px-6 py-5 hover:border-secondary transition-colors"
        >
          <span className="font-display text-xl md:text-2xl tracking-wider uppercase">
            Muito além dos cards — linha COPAG
          </span>
          <span className="inline-flex items-center gap-2 font-display text-base tracking-widest uppercase text-secondary">
            Conhecer a linha <ArrowRight size={16} />
          </span>
        </Link>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
