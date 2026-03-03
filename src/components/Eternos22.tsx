const eternosCards = [
  { icon: "🛡️", number: "#628", title: "Eternos — Defensores", desc: "Os defensores impassíveis que construíram a muralha campeã do mundo em 2022. Molina, Romero, Otamendi." },
  { icon: "🌟", number: "#629", title: "Eternos — Meio-campistas", desc: "Os maestros que deram ritmo e inteligência à seleção mais completa do torneio. De Paul, Mac Allister." },
  { icon: "⚽", number: "#630", title: "Eternos — Atacantes", desc: "Os goleadores eternos encabeçados por Messi — o card final e mais precioso da coleção de 630." },
];

export const Eternos22 = () => (
  <section className="mt-20 bg-secondary/5 border border-secondary/10 rounded-3xl p-8 md:p-12">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
      {/* Left: card image */}
      <div className="bg-card border-2 border-primary/20 rounded-2xl p-8 flex items-center justify-center">
        <img
          src="https://cdn.shopify.com/s/files/1/0804/3990/2447/files/628-eternos_fifa-26-tcg.jpg?v=1772392603"
          alt="Eternos 22 Card"
          className="w-full max-w-sm object-contain"
        />
      </div>

      {/* Right: info */}
      <div className="space-y-6">
        <p className="text-sm font-display tracking-widest uppercase text-primary">🌟 Cards #628 · #629 · #630 · Ultra Raros</p>
        <h2 className="font-display text-4xl md:text-5xl tracking-wider uppercase text-foreground">Eternos 22 — Uma homenagem eterna</h2>
        <p className="text-muted-foreground font-body leading-relaxed">
          Quatro anos depois, as memórias da vitória incrível da Argentina em 2022 ainda estão vivas. Os <strong>Eternos 22</strong> são uma homenagem aos heróis daquela conquista histórica — Molina, Martínez, Romero e os demais. Um verdadeiro tesouro para qualquer colecionador.
        </p>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-card border border-border rounded-xl p-4 text-center">
            <p className="font-display text-2xl text-foreground">3</p>
            <p className="text-xs text-muted-foreground font-body">Cards</p>
          </div>
          <div className="bg-card border border-border rounded-xl p-4 text-center">
            <p className="font-display text-2xl text-foreground">#630</p>
            <p className="text-xs text-muted-foreground font-body">Último card</p>
          </div>
          <div className="bg-card border border-border rounded-xl p-4 text-center">
            <p className="font-display text-2xl text-foreground">🇦🇷</p>
            <p className="text-xs text-muted-foreground font-body">Argentina</p>
          </div>
        </div>

        {/* Card breakdown */}
        <div className="space-y-3">
          {eternosCards.map((card) => (
            <div key={card.number} className="bg-card border border-border rounded-xl p-4 hover:border-primary/40 transition-colors">
              <div className="flex items-center gap-3 mb-1">
                <span className="text-lg">{card.icon}</span>
                <span className="font-display text-sm tracking-wider uppercase text-foreground">{card.number}</span>
                <span className="font-display text-sm tracking-wider uppercase text-foreground">{card.title}</span>
              </div>
              <p className="text-xs text-muted-foreground font-body pl-9">{card.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);
