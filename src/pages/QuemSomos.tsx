import { useEffect } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SEOHead } from "@/components/SEOHead";
import { Link } from "react-router-dom";
import { Target, Eye, Heart, CheckCircle, MapPin, MessageCircle } from "lucide-react";
import { breadcrumbSchema, organizationSchema, injectJsonLd } from "@/lib/jsonld";
import heroBg from "@/assets/hero-bg.jpg";
import quemSomosBg from "@/assets/quem-somos-bg.jpg";
import logo from "@/assets/logo-bella.png";

const valores = [
  { bold: "Autenticidade", text: "Somente produtos originais e licenciados." },
  { bold: "Paixão", text: "Somos colecionadores como você!" },
  { bold: "Transparência", text: "Preços justos e comunicação honesta." },
  { bold: "Comunidade", text: "Cada cliente é parte da família." },
  { bold: "Agilidade", text: "Envio rápido e suporte de verdade." },
];

const kiosks = [
  "/images/kiosk-1.jpeg",
  "/images/kiosk-2.jpeg",
  "/images/kiosk-3.jpeg",
  "/images/kiosk-4.jpeg",
  "/images/kiosk-5.jpeg",
  "/images/kiosk-6.jpeg",
  "/images/kiosk-7.jpeg",
];

const QuemSomos = () => {
  useEffect(() => {
    const cleanup1 = injectJsonLd("breadcrumb-about", breadcrumbSchema([
      { name: "Início", url: "https://bellafigurinha.com.br/" },
      { name: "Quem Somos", url: "https://bellafigurinha.com.br/quem-somos" },
    ]));
    const cleanup2 = injectJsonLd("org-about", { "@context": "https://schema.org", ...organizationSchema });
    return () => { cleanup1(); cleanup2(); };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Quem Somos | Bella Figurinha — Distribuidor Oficial Panini"
        description="Conheça a Bella Figurinha: distribuidor oficial Panini de cards e figurinhas colecionáveis FIFA World Cup 2026. Nossa história, missão, visão e valores."
        canonical="https://bellafigurinha.com.br/quem-somos"
      />
      <Header />

      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={quemSomosBg} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
        </div>
        <div className="relative z-10 text-center pt-24 pb-16 px-4">
          <span className="inline-block bg-secondary/90 text-secondary-foreground font-display text-sm tracking-widest uppercase px-5 py-1.5 rounded-full mb-4">
            Sobre a Bella Figurinha
          </span>
          <h1 className="font-display text-5xl md:text-7xl tracking-wider text-white drop-shadow-lg mb-4">
            Quem somos
          </h1>
          <p className="text-white/80 font-body text-lg md:text-xl max-w-2xl mx-auto">
            Somos apaixonados por figurinhas, cards e tudo que envolve o universo de colecionar. Conectamos fãs e colecionadores de todo o Brasil.
          </p>
        </div>
      </section>

      {/* Nossa História */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block bg-secondary/10 text-secondary font-display text-sm tracking-widest uppercase px-4 py-1.5 rounded-full mb-4">
                Nossa História
              </span>
              <h2 className="font-display text-3xl md:text-5xl tracking-wider text-foreground mb-6">
                Nascemos da paixão por colecionar
              </h2>
              <div className="space-y-4 text-muted-foreground font-body leading-relaxed">
                <p>
                  A <strong className="text-foreground">Bella Figurinha</strong> nasceu de um sonho simples: levar a magia das figurinhas e cards colecionáveis para fãs de todas as idades. O que começou como uma pequena operação movida pela paixão por álbuns e envelopes se transformou em uma das referências do segmento no Brasil.
                </p>
                <p>
                  Trabalhamos exclusivamente com <strong className="text-foreground">produtos originais e licenciados</strong>, trazendo as coleções mais desejadas — como a <strong className="text-foreground">Panini FIFA World Cup 2026™ Adrenalyn XL™</strong> — diretamente para a sua casa, com segurança, rapidez e o carinho que todo colecionador merece.
                </p>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl blur-xl" />
                <img
                  src={heroBg}
                  alt="Coleção FIFA World Cup 2026"
                  className="relative rounded-2xl shadow-2xl max-w-sm w-full object-cover aspect-square"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Missão, Visão e Valores */}
      <section className="bg-muted/30 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <span className="inline-block bg-secondary/10 text-secondary font-display text-sm tracking-widest uppercase px-4 py-1.5 rounded-full mb-4">
              🎯 Missão, Visão e Valores
            </span>
            <h2 className="font-display text-3xl md:text-5xl tracking-wider text-foreground mb-3">
              O que nos move todos os dias
            </h2>
            <p className="text-muted-foreground font-body max-w-xl mx-auto">
              Três pilares que guiam cada decisão, cada envio e cada sorriso que provocamos.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-card rounded-2xl p-8 border border-border shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-destructive/10 rounded-xl flex items-center justify-center mb-5">
                <Target className="text-destructive" size={24} />
              </div>
              <h3 className="font-display text-2xl tracking-wider uppercase text-foreground mb-3">Missão</h3>
              <p className="text-muted-foreground font-body text-sm leading-relaxed">
                Democratizar o acesso a figurinhas e cards colecionáveis originais, proporcionando uma experiência de compra segura, acessível e encantadora para colecionadores de todo o Brasil.
              </p>
            </div>

            <div className="bg-card rounded-2xl p-8 border border-border shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center mb-5">
                <Eye className="text-blue-500" size={24} />
              </div>
              <h3 className="font-display text-2xl tracking-wider uppercase text-foreground mb-3">Visão</h3>
              <p className="text-muted-foreground font-body text-sm leading-relaxed">
                Ser a maior referência brasileira em cards e figurinhas colecionáveis, reconhecida pela qualidade dos produtos, excelência no atendimento e pela comunidade apaixonada que construímos.
              </p>
            </div>

            <div className="bg-card rounded-2xl p-8 border border-border shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-accent/20 rounded-xl flex items-center justify-center mb-5">
                <Heart className="text-accent" size={24} />
              </div>
              <h3 className="font-display text-2xl tracking-wider uppercase text-foreground mb-3">Valores</h3>
              <ul className="space-y-2">
                {valores.map((v) => (
                  <li key={v.bold} className="flex items-start gap-2 text-sm font-body">
                    <CheckCircle size={16} className="text-accent mt-0.5 shrink-0" />
                    <span className="text-muted-foreground">
                      <strong className="text-foreground">{v.bold}</strong> — {v.text}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Nossos Quiosques */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4 text-center">
          <span className="inline-block bg-secondary/10 text-secondary font-display text-sm tracking-widest uppercase px-4 py-1.5 rounded-full mb-4">
            ⭐ Nossos Quiosques
          </span>
          <h2 className="font-display text-3xl md:text-5xl tracking-wider text-foreground mb-3">
            Estamos também no físico
          </h2>
          <p className="text-muted-foreground font-body mb-10 max-w-xl mx-auto">
            13 quiosques temáticos FIFA World Cup 2026™ nos principais shoppings de SP, PR e SC.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 max-w-4xl mx-auto mb-8">
            {kiosks.map((src, i) => (
              <div key={i} className="rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                <img src={src} alt={`Quiosque Bella Figurinha ${i + 1}`} className="w-full h-40 object-cover" />
              </div>
            ))}
          </div>

          <Link
            to="/lojas"
            className="inline-flex items-center gap-2 bg-secondary text-secondary-foreground font-display tracking-wider uppercase px-8 py-3 rounded-xl hover:opacity-90 transition-opacity"
          >
            <MapPin size={18} />
            Ver todos os endereços
          </Link>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-primary to-yellow-500 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-display text-3xl md:text-5xl tracking-wider text-primary-foreground mb-4">
            Pronto para colecionar<br />com a gente?
          </h2>
          <p className="text-primary-foreground/80 font-body mb-8 max-w-lg mx-auto">
            Explore nossa loja e descubra as melhores coleções de cards e figurinhas do Brasil.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/#produtos"
              className="inline-flex items-center gap-2 bg-card text-foreground font-display tracking-wider uppercase px-8 py-3 rounded-xl hover:opacity-90 transition-opacity"
            >
              ⚽ Ver Produtos
            </Link>
            <a
              href="https://wa.me/5511976609139"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-accent text-accent-foreground font-display tracking-wider uppercase px-8 py-3 rounded-xl hover:opacity-90 transition-opacity"
            >
              <MessageCircle size={18} />
              Falar no WhatsApp
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default QuemSomos;
