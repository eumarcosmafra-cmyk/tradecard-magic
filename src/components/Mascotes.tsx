const mascots = [
  {
    name: "Maple™",
    country: "Canadá",
    flag: "https://flagcdn.com/w40/ca.png",
    position: "Goleiro",
    desc: "O alce do Canadá! O mascote goleiro que protege a trave com arte e força",
    card: "Card #625 · Wildcard",
    image: "https://cdn.shopify.com/s/files/1/0804/3990/2447/files/maple-fifa.jpg-removebg-preview.png?v=1772390764",
  },
  {
    name: "Clutch™",
    country: "EUA",
    flag: "https://flagcdn.com/w40/us.png",
    position: "Meio-campista",
    desc: "A águia-americana dos EUA! Controla o jogo com poder, visão e precisão",
    card: "Card #626 · Wildcard",
    image: "https://cdn.shopify.com/s/files/1/0804/3990/2447/files/Clutch-mascote-fifa-1.jpg-removebg-preview.png?v=1772390763",
  },
  {
    name: "Zayu™",
    country: "México",
    flag: "https://flagcdn.com/w40/mx.png",
    position: "Atacante",
    desc: "A onça-pintada do México! Atacante veloz e mortal que decide jogos com um toque",
    card: "Card #627 · Wildcard",
    image: "https://cdn.shopify.com/s/files/1/0804/3990/2447/files/Zayu-mascote-fifa.jpg-removebg-preview.png?v=1772390763",
  },
];

export const Mascotes = () => (
  <section className="mt-20">
    <div className="text-center mb-10">
      <p className="text-sm font-display tracking-widest uppercase text-primary mb-2">Exclusivos da Copa 2026</p>
      <h2 className="font-display text-4xl md:text-5xl tracking-wider uppercase text-foreground">
        3 Mascotes Oficiais da FIFA — Wildcards!
      </h2>
      <p className="text-muted-foreground font-body mt-4 max-w-2xl mx-auto">
        Três cards Wild especiais dos mascotes oficiais do FIFA World Cup 2026™, cada um representando um país-sede — e adicionando um elemento surpresa ao seu time!
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {mascots.map((m) => (
        <div key={m.name} className="bg-card border border-border rounded-2xl p-6 text-center hover:border-primary/40 transition-all hover:shadow-lg group">
          <div className="h-48 flex items-center justify-center mb-4">
            <img src={m.image} alt={m.name} className="max-h-full object-contain group-hover:scale-105 transition-transform" />
          </div>
          <div className="flex items-center justify-center gap-2 mb-2">
            <img src={m.flag} alt={m.country} className="w-6 h-4 object-cover rounded-sm" />
            <span className="text-xs text-muted-foreground font-body">{m.country}</span>
          </div>
          <h3 className="font-display text-xl tracking-wider uppercase text-foreground">{m.name}</h3>
          <p className="text-xs font-display tracking-wider uppercase text-primary mt-1">{m.position}</p>
          <p className="text-sm text-muted-foreground font-body mt-3">{m.desc}</p>
          <p className="text-xs font-display tracking-wider uppercase text-foreground/50 mt-3">{m.card}</p>
        </div>
      ))}
    </div>
  </section>
);
