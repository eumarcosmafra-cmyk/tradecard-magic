import { useEffect } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SEOHead } from "@/components/SEOHead";
import { MapPin } from "lucide-react";
import { storesPageJsonLd, breadcrumbSchema, organizationSchema, injectJsonLd } from "@/lib/jsonld";

const regions = [
  {
    state: "São Paulo",
    abbr: "SP",
    locations: [
      "Morumbi Shopping",
      "Shopping Anália Franco",
      "Parque Shopping São Caetano",
      "Shopping Alphaville",
    ],
  },
  {
    state: "Paraná",
    abbr: "PR",
    locations: [
      "Park Shopping Barigui",
      "Shopping Palladium",
      "Jockey Plaza Shopping",
      "Ventura Shopping",
      "Shopping Estação",
      "City Center Outlet Premium",
      "Palladium Ponta Grossa",
      "Shopping Plaza Campos Gerais",
    ],
  },
  {
    state: "Santa Catarina",
    abbr: "SC",
    locations: [
      "Outlet Premium Porto Belo",
      "Itajaí Shopping",
    ],
  },
];

const storeAddresses: Record<string, string> = {
  "Shopping Alphaville": "Centro Comercial Alphaville\nCalçada das Hortênsias, 156 - Alphaville\nCEP: 06453-017",
};

const kioskImages = [
  "/images/kiosk-new-1.jpeg",
  "/images/kiosk-new-2.jpeg",
];
const kioskVideo = "/images/kiosk-new.mp4";

const Quiosques = () => {
  useEffect(() => {
    const cleanup1 = injectJsonLd("stores", storesPageJsonLd());
    const cleanup2 = injectJsonLd("breadcrumb-stores", breadcrumbSchema([
      { name: "Início", url: "https://bellafigurinha.com.br/" },
      { name: "Nossas Lojas", url: "https://bellafigurinha.com.br/lojas" },
    ]));
    const cleanup3 = injectJsonLd("org-stores", { "@context": "https://schema.org", ...organizationSchema });
    return () => { cleanup1(); cleanup2(); cleanup3(); };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Nossas Lojas | Bella Figurinha — Quiosques e Pontos de Venda"
        description="Encontre os quiosques e lojas físicas da Bella Figurinha em shoppings de São Paulo, Paraná e Santa Catarina. Distribuidor oficial Panini de figurinhas e cards."
        canonical="https://bellafigurinha.com.br/lojas"
      />
      <Header />

      {/* Hero */}
      <section className="pt-28 pb-16 px-4 text-center">
        <h1 className="font-display text-5xl md:text-7xl tracking-wider uppercase text-foreground">
          Lojas Bella Figurinha
        </h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          Nossas pop-up stores estarão em funcionamento de <strong className="text-foreground">01/05/2026</strong> até <strong className="text-foreground">30/07/2026</strong> nos principais shoppings do Sul e Sudeste do Brasil. Encontre a loja mais perto de você!
        </p>
      </section>

      {/* Photo & video gallery */}
      <section className="container mx-auto px-4 mb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="rounded-xl overflow-hidden aspect-[4/3]">
            <img src={kioskImages[1]} alt="Quiosque Bella Figurinha 2" className="w-full h-full object-cover" loading="lazy" />
          </div>
          <div className="rounded-xl overflow-hidden aspect-[4/3] bg-black">
            <video
              src={kioskVideo}
              className="w-full h-full object-cover"
              autoPlay
              muted
              loop
              playsInline
              controls
            />
          </div>
          <div className="rounded-xl overflow-hidden aspect-[4/3]">
            <img src={kioskImages[0]} alt="Quiosque Bella Figurinha 1" className="w-full h-full object-cover" loading="lazy" />
          </div>
        </div>
      </section>

      {/* Locations */}
      <section className="container mx-auto px-4 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {regions.map((region) => (
            <div
              key={region.abbr}
              className="bg-card border border-border rounded-2xl p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center gap-3 mb-6">
                <span className="bg-primary text-primary-foreground font-display text-2xl tracking-wider px-4 py-1 rounded-lg">
                  {region.abbr}
                </span>
                <h2 className="font-display text-2xl tracking-wider uppercase text-foreground">
                  {region.state}
                </h2>
              </div>

              <ul className="space-y-3">
                {region.locations.map((loc) => {
                  const address = storeAddresses[loc];
                  return (
                    <li key={loc} className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-secondary mt-0.5 shrink-0" />
                      <div className="flex flex-col">
                        <span className="text-foreground/80 font-medium">{loc}</span>
                        {address && (
                          <span className="text-sm text-muted-foreground whitespace-pre-line mt-1">
                            {address}
                          </span>
                        )}
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Quiosques;
