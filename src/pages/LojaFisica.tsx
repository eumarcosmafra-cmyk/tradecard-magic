import { useEffect } from "react";
import { Link } from "react-router-dom";
import { MapPin, Clock, Zap, Navigation } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SEOHead } from "@/components/SEOHead";
import { Countdown } from "@/components/Countdown";
import { breadcrumbSchema, organizationSchema, injectJsonLd } from "@/lib/jsonld";
import { trackEvent } from "@/lib/analytics";
import { DROP_DATE_LABEL } from "@/lib/drop";

const MAPS_URL = "https://www.google.com/maps/search/?api=1&query=Shopping+Palladium+Curitiba";

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
        description="A nova experiência Bella Figurinha começa no Shopping Palladium, em Curitiba, a partir de 25 de setembro de 2026. Cards, colecionáveis e o primeiro drop."
        canonical="https://bellafigurinha.com.br/loja-fisica"
      />
      <Header />

      <section className="bg-arena text-white pt-32 pb-20">
        <div className="container mx-auto px-4 text-center space-y-6">
          <span className="inline-flex items-center gap-2 rounded-full bg-electric/15 text-electric px-4 py-1.5 font-display text-sm tracking-widest uppercase">
            <Zap size={15} /> 30 anos de cards
          </span>
          <h1 className="font-display text-5xl md:text-7xl tracking-wider uppercase leading-none">
            Bella Figurinha <span className="text-gradient-electric">Palladium</span>
          </h1>
          <p className="font-body text-lg text-white/80 max-w-2xl mx-auto">
            A nova experiência Bella começa aqui. Nosso quiosque nasce da comemoração dos 30 anos da coleção de cards
            mais amada do mundo — e é onde o desconto do acesso antecipado é resgatado.
          </p>
          <div className="flex justify-center">
            <Countdown />
          </div>
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
              to="/acesso-antecipado"
              onClick={() => trackEvent("early_access_cta_click", { placement: "loja_fisica" })}
              className="inline-flex items-center justify-center border border-white/25 text-white font-display text-lg tracking-widest uppercase px-8 py-4 rounded-xl"
            >
              Entrar na lista
            </Link>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16 grid md:grid-cols-3 gap-6">
        <div className="rounded-2xl border border-border bg-card p-6">
          <MapPin className="text-secondary" size={26} />
          <h2 className="font-display text-2xl tracking-wider uppercase mt-3">Onde</h2>
          <p className="font-body text-muted-foreground mt-2">Shopping Palladium<br />Curitiba – PR</p>
        </div>
        <div className="rounded-2xl border border-border bg-card p-6">
          <Zap className="text-secondary" size={26} />
          <h2 className="font-display text-2xl tracking-wider uppercase mt-3">Abertura</h2>
          <p className="font-body text-muted-foreground mt-2">{DROP_DATE_LABEL}</p>
        </div>
        <div className="rounded-2xl border border-border bg-card p-6">
          <Clock className="text-secondary" size={26} />
          <h2 className="font-display text-2xl tracking-wider uppercase mt-3">Horário</h2>
          <p className="font-body text-muted-foreground mt-2">Seguindo o funcionamento do shopping.</p>
        </div>
      </section>

      <section className="container mx-auto px-4 pb-20">
        <div className="rounded-3xl bg-muted p-8 md:p-12 text-center">
          <h2 className="font-display text-3xl md:text-4xl tracking-wider uppercase">
            Resgate do acesso antecipado
          </h2>
          <p className="font-body text-muted-foreground mt-3 max-w-2xl mx-auto">
            {OFFER_FULL} Cadastros na pré-lista até {DROP_DATE_SHORT}.
          </p>
          <p className="font-body text-sm font-semibold text-foreground mt-4 max-w-2xl mx-auto border border-secondary/40 bg-secondary/10 rounded-xl px-4 py-3">
            {OFFER_NO_RESERVE}
          </p>

          <Link
            to="/acesso-antecipado"
            onClick={() => trackEvent("early_access_cta_click", { placement: "loja_fisica_resgate" })}
            className="inline-block mt-6 bg-gradient-yellow text-primary-foreground font-display text-lg tracking-widest uppercase px-8 py-4 rounded-xl shadow-yellow"
          >
            Quero acesso antecipado
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default LojaFisica;
