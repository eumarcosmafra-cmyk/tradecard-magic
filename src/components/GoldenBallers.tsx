const goldenBallers = [
  { name: "Messi", country: "Argentina", flag: "https://flagcdn.com/w40/ar.png" },
  { name: "Vinícius Jr.", country: "Brasil", flag: "https://flagcdn.com/w40/br.png" },
  { name: "Salah", country: "Egito", flag: "https://flagcdn.com/w40/eg.png" },
  { name: "Kane", country: "Inglaterra", flag: "https://flagcdn.com/w40/gb-eng.png" },
  { name: "Mbappé", country: "França", flag: "https://flagcdn.com/w40/fr.png" },
  { name: "Son", country: "Coreia do Sul", flag: "https://flagcdn.com/w40/kr.png" },
  { name: "Haaland", country: "Noruega", flag: "https://flagcdn.com/w40/no.png" },
  { name: "Ronaldo", country: "Portugal", flag: "https://flagcdn.com/w40/pt.png" },
  { name: "Yamal", country: "Espanha", flag: "https://flagcdn.com/w40/es.png" },
];

export const GoldenBallers = () => (
  <section className="mt-20 bg-primary/5 border border-primary/10 rounded-3xl p-8 md:p-12">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
      {/* Left: card image */}
      <div className="bg-card border-2 border-primary/20 rounded-2xl p-8 flex items-center justify-center">
        <img
          src="https://cdn.shopify.com/s/files/1/0804/3990/2447/files/5-goldenballers_fifa-26-tcg.jpg?v=1772392604"
          alt="Golden Baller Card"
          className="w-full max-w-sm object-contain"
        />
      </div>

      {/* Right: info */}
      <div className="space-y-6">
        <p className="text-sm font-display tracking-widest uppercase text-primary">🍪 9 Cards Lendários — 100 pts em TUDO!</p>
        <h2 className="font-display text-4xl md:text-5xl tracking-wider uppercase text-foreground">Os Golden Ballers</h2>
        <p className="text-muted-foreground font-body leading-relaxed">
          Pela <strong>primeira vez</strong> numa coleção FIFA World Cup™! Os 9 maiores craques do planeta em cards premium dourados — <strong>100 pontos em TODOS os valores de jogo</strong> para sempre no Adrenalyn XL™. Cada envelope esconde a chance de um deles.
        </p>

        <div className="grid grid-cols-3 gap-3">
          {goldenBallers.map((player) => (
            <div
              key={player.name}
              className="bg-card border border-border rounded-xl p-3 flex items-center gap-3 hover:border-primary/40 transition-colors"
            >
              <img src={player.flag} alt={player.country} className="w-7 h-5 object-cover rounded-sm flex-shrink-0" />
              <div className="min-w-0">
                <p className="font-display text-sm tracking-wider uppercase truncate">{player.name}</p>
                <p className="text-[10px] text-muted-foreground font-body truncate">{player.country}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);
