const categories = [
  {
    count: "378 cards",
    name: "HEROES",
    description: "A espinha dorsal da coleção: 9 figurinhas por cada uma das 42 seleções participantes da Copa. Descubra os destaques de cada país.",
    gradient: "from-blue-600 to-blue-900",
  },
  {
    count: "36 cards",
    name: "CONTENDERS",
    description: "6 seleções que chegaram pela repescagem com tudo a provar. 6 figurinhas por equipa — heróis com fome de Copa.",
    gradient: "from-blue-500 to-indigo-800",
  },
  {
    count: "FF — 42 cards",
    name: "FAN FAVOURITES",
    description: "1 figurinha por seleção — o jogador mais amado pela torcida. Líder de público, eleito pelos fãs ao redor do mundo.",
    gradient: "from-orange-500 to-pink-600",
  },
  {
    count: "IC — 42 cards",
    name: "ICONS",
    description: "1 por seleção — os primeiros nomes que vêm à mente ao pensar em cada país. Referências absolutas dentro e fora de campo.",
    gradient: "from-yellow-500 to-amber-700",
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

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      {categories.map((cat) => (
        <div key={cat.name} className="bg-card border border-border rounded-2xl overflow-hidden hover:border-primary/40 transition-colors group">
          {/* Card visual placeholder */}
          <div className={`h-56 bg-gradient-to-br ${cat.gradient} flex items-center justify-center relative overflow-hidden`}>
            <span className="font-display text-5xl tracking-widest uppercase text-white/20 group-hover:text-white/30 transition-colors">
              {cat.name.charAt(0)}
            </span>
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
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
