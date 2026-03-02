const categories = [
  {
    count: "378 cards",
    name: "Heroes",
    description: "A espinha dorsal da coleção: 9 figurinhas por cada uma das 42 seleções participantes da Copa. Descubra os destaques de cada país.",
    image: "https://cdn.shopify.com/s/files/1/0804/3990/2447/files/184-hero_fifa-26-tcg.jpg?v=1772392604",
  },
  {
    count: "36 cards",
    name: "Contenders",
    description: "6 seleções que chegaram pela repescagem com tudo a provar. 6 figurinhas por equipa — heróis com fome de Copa.",
    image: "https://cdn.shopify.com/s/files/1/0804/3990/2447/files/522-contenders_fifa-26-tcg.jpg?v=1772392604",
  },
  {
    count: "FF — 42 cards",
    name: "Fan Favourites",
    description: "1 figurinha por seleção — o jogador mais amado pela torcida. Líder de público, eleito pelos fãs ao redor do mundo.",
    image: "https://cdn.shopify.com/s/files/1/0804/3990/2447/files/310_fanfavourite_fifa-26-tcg.jpg?v=1772392604",
  },
  {
    count: "IC — 42 cards",
    name: "Icons",
    description: "1 por seleção — os primeiros nomes que vêm à mente ao pensar em cada país. Referências absolutas dentro e fora de campo.",
    image: "https://cdn.shopify.com/s/files/1/0804/3990/2447/files/204-icon_fifa-26-tcg.jpg?v=1772392604",
  },
  {
    count: "9 cards — 100 pts!",
    name: "Golden Ballers",
    description: "Novidade absoluta na Copa do Mundo! 100 pontos em TODOS os atributos — os 9 melhores do planeta em dose máxima.",
    image: "https://cdn.shopify.com/s/files/1/0804/3990/2447/files/5-goldenballers_fifa-26-tcg.jpg?v=1772392604",
    badge: "100 pts!",
  },
  {
    count: "9 cards",
    name: "Top Keepers",
    description: "Alisson, Courtois, ter Stegen — as últimas linhas de defesa. Os goleiros mais decisivos desta Copa do Mundo.",
    image: "https://cdn.shopify.com/s/files/1/0804/3990/2447/files/555_top-keepers_fifa-26-tcg.jpg?v=1772392603",
  },
  {
    count: "9 cards",
    name: "Defensive Rocks",
    description: "Militão, Van Dijk, Hakimi, Rüdiger — muros intransponíveis. Os zagueiros e laterais que decidem jogos antes de atacar.",
    image: "https://cdn.shopify.com/s/files/1/0804/3990/2447/files/562_defensive-rocks_fifa-26-tcg.jpg?v=1772392603",
  },
  {
    count: "18 cards",
    name: "Midfield Maestros",
    description: "De Bruyne, Bellingham, Pedri — os maestros que controlam o jogo. Motor criativo de box a box, imprescindíveis para qualquer time.",
    image: "https://cdn.shopify.com/s/files/1/0804/3990/2447/files/578_midfield-maestros_fifa-26-tcg.jpg?v=1772392604",
  },
  {
    count: "22 cards",
    name: "Goal Machines",
    description: "Haaland, Raphinha, Álvarez — artilheiros que decidem jogos grandes. Os homens de área com estatística de gol impressionante.",
    image: "https://cdn.shopify.com/s/files/1/0804/3990/2447/files/605_goal-machine_fifa-26-tcg.jpg?v=1772392604",
  },
  {
    count: "16 cards",
    name: "Master Rookies",
    description: "Yamal, Estévão, Mastantuono — as novas estrelas da Copa 2026. Os jovens que chegam pra mudar a história do futebol mundial.",
    image: "https://cdn.shopify.com/s/files/1/0804/3990/2447/files/623_master-rookie_fifa-26-tcg.jpg?v=1772392604",
  },
  {
    count: "TL — 42 cards",
    name: "Team Logos",
    description: "O escudo das 42 seleções. Use junto com qualquer TEAM MATE do mesmo país e ganhe +5 pontos extras na batalha!",
    image: "https://cdn.shopify.com/s/files/1/0804/3990/2447/files/23-logo_fifa-26-tcg.jpg?v=1772392604",
  },
  {
    count: "3 cards — #628·629·630",
    name: "Eternos 22",
    description: "Homenagem especial à Argentina campeã do mundo em 2022. Os cards #628, #629 e #630 — Messi e companhia eternizados.",
    image: "https://cdn.shopify.com/s/files/1/0804/3990/2447/files/628-eternos_fifa-26-tcg.jpg?v=1772392603",
    badge: "Ultra Raro",
  },
  {
    count: "3 cards — Wildcards",
    name: "Official Mascots",
    description: "Maple™ (Canadá), Clutch™ (EUA) e Zayu™ (México) — os mascotes-sede. Cards Wild que podem ser pareados com qualquer seleção!",
    image: "https://cdn.shopify.com/s/files/1/0804/3990/2447/files/627-mascots_fifa-26-tcg.jpg?v=1772392603",
  },
  {
    count: "OE — 1 card — +10 pts!",
    name: "Official Emblem",
    description: "+10 pontos junto com qualquer TEAM MATE — a arma secreta definitiva! Apenas 1 card nesta categoria em toda a coleção.",
    image: "https://cdn.shopify.com/s/files/1/0804/3990/2447/files/624-secret-weapons_fifa-26-tcg.jpg?v=1772392604",
    badge: "+10 pts!",
  },
  {
    count: "3 cards — Sem numeração",
    name: "Momentum",
    description: "3 cards sem numeração, fora da coleção principal. A surpresa escondida no envelope para quem não se contenta com o óbvio.",
    image: "https://cdn.shopify.com/s/files/1/0804/3990/2447/files/momentum-card_fifa-26-tcg.jpg?v=1772392604",
    badge: "Sem núm.",
  },
];

export const CardCategories = () => (
  <section className="mt-20">
    <div className="inline-block bg-primary text-primary-foreground text-xs font-display tracking-widest uppercase px-4 py-1.5 rounded-full shadow-yellow mb-6">
      15 Categorias Oficiais
    </div>

    <h2 className="font-display text-3xl md:text-4xl tracking-wider uppercase text-foreground leading-tight mb-3">
      630 cards, cada um com sua raridade
    </h2>

    <p className="text-muted-foreground font-body text-sm leading-relaxed mb-10 max-w-2xl">
      Heroes, Golden Ballers, Mascotes, Eternos 22 e muito mais — 15 categorias para colecionar, jogar e se surpreender.
    </p>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
      {categories.map((cat) => (
        <div key={cat.name} className="bg-card border border-border rounded-2xl overflow-hidden hover:border-primary/40 transition-colors group">
          <div className="h-64 relative overflow-hidden bg-muted/30">
            <img
              src={cat.image}
              alt={cat.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
            {cat.badge && (
              <span className="absolute top-3 right-3 bg-primary text-primary-foreground text-[10px] font-display tracking-widest uppercase px-2.5 py-1 rounded-md shadow-yellow">
                {cat.badge}
              </span>
            )}
          </div>
          <div className="p-5 space-y-2">
            <span className="inline-block text-[11px] font-display tracking-wider uppercase text-primary bg-primary/10 border border-primary/20 px-2 py-0.5 rounded-full">
              {cat.count}
            </span>
            <h3 className="font-display text-lg tracking-wider uppercase text-foreground">{cat.name}</h3>
            <p className="text-xs text-muted-foreground font-body leading-relaxed">{cat.description}</p>
          </div>
        </div>
      ))}
    </div>
  </section>
);
