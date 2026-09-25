import { useEffect } from "react";
import { Link } from "react-router-dom";
import { MapPin, Clock, Zap, Navigation } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SEOHead } from "@/components/SEOHead";
import { breadcrumbSchema, organizationSchema, injectJsonLd } from "@/lib/jsonld";
import { trackEvent } from "@/lib/analytics";
import { MAPS_URL as MAPS, STORE_ADDRESS } from "@/lib/drop";
import quiosqueArena from "@/assets/quiosque-arena.png.asset.json";

const MAPS_URL = MAPS;

const LojaFisica = () => {
  useEffect(() => {
    trackEvent("store_page_view", { store: "palladium" });
    const c1 = injectJsonLd("breadcrumb-store", breadcrumbSchema([
      { name: "Início", url: "https://bellafigurinha.com.br/" },
      { name: "Loja Física", url: "https://bellafigurinha.com.br/loja-fisica" },
    ]));
    const c2 = injectJsonLd("org-store", { "@context": "https://schema.org", ...organizationSchema });
    return () => { c1(); c2(); };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Loja Física Bella Figurinha | Shopping Palladium Curitiba"
        description="Quiosque Bella Figurinha Pokémon 30 anos aberto no Shopping Palladium, em Curitiba. Cards, coleções e colecionáveis."
        canonical="https://bellafigurinha.com.br/loja-fisica"
      />
      <Header />

      <section className="bg-arena text-white pt-32 pb-20">
        <div className="container mx-auto px-4 text-center space-y-6">
          <span className="inline-flex items-center gap-2 rounded-full bg-electric/15 text-electric px-4 py-1.5 font-display text-sm tracking-widest uppercase">
            <Zap size={15} /> Aberto agora · Pokémon 30 anos
          </span>
          <h1 className="font-display text-5xl md:text-7xl tracking-wider uppercase leading-none">
            Bella Figurinha <span className="text-gradient-electric">Palladium</span>
          </h1>
          <p className="font-body text-lg text-white/80 max-w-2xl mx-auto">
            Nosso quiosque está aberto e funcionando no Shopping Palladium, em Curitiba, comemorando os 30 anos da
            coleção de cards mais amada do mundo. Venha conhecer as coleções de perto.
          </p>
          <p className="inline-flex items-center gap-2 font-body text-base text-white/90">
            <MapPin size={18} className="text-electric" /> Shopping Palladium · {STORE_ADDRESS}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
            <a
              href={MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent("store_directions_click", { store: "palladium" })}
              className="inline-flex items-center justify-center gap-2 bg-gradient-electric text-ink font-display text-lg tracking-widest uppercase px-8 py-4 rounded-xl"
            >
              <Navigation size={18} /> Como chegar
            </a>
            <Link
              to="/pokemon"
              className="inline-flex items-center justify-center border border-white/25 text-white font-display text-lg tracking-widest uppercase px-8 py-4 rounded-xl"
            >
              Comprar online
            </Link>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 pt-12">
        <div className="rounded-3xl overflow-hidden border border-border shadow-yellow">
          <img
            src={quiosqueArena.url}
            alt="Quiosque da Bella Figurinha com arena de cards no shopping"
            loading="lazy"
            className="w-full object-cover aspect-[16/9]"
          />
        </div>
      </section>

      <section className="container mx-auto px-4 py-16 grid md:grid-cols-3 gap-6">
        <div className="rounded-2xl border border-border bg-card p-6">
          <MapPin className="text-secondary" size={26} />
          <h2 className="font-display text-2xl tracking-wider uppercase mt-3">Onde</h2>
          <p className="font-body text-muted-foreground mt-2">Shopping Palladium<br />{STORE_ADDRESS}</p>
        </div>
        <div className="rounded-2xl border border-border bg-card p-6">
          <Zap className="text-secondary" size={26} />
          <h2 className="font-display text-2xl tracking-wider uppercase mt-3">Status</h2>
          <p className="font-body text-muted-foreground mt-2">Aberto e funcionando</p>
        </div>
        <div className="rounded-2xl border border-border bg-card p-6">
          <Clock className="text-secondary" size={26} />
          <h2 className="font-display text-2xl tracking-wider uppercase mt-3">Horário</h2>
          <p className="font-body text-muted-foreground mt-2">Seguindo o funcionamento do shopping.</p>
        </div>
      </section>

      <section className="container mx-auto px-4 pb-20">
        <div className="rounded-3xl overflow-hidden border border-border">
          <iframe
            title="Mapa do Shopping Palladium Curitiba"
            src="https://www.google.com/maps?q=Shopping+Palladium+Av.+Pres.+Kennedy+4121+Curitiba&output=embed"
            className="w-full h-80"
            loading="lazy"
          />
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default LojaFisica;
