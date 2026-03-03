const selecoes = [
  { name: "Argentina", flag: "ar" },
  { name: "Brasil", flag: "br" },
  { name: "França", flag: "fr" },
  { name: "Espanha", flag: "es" },
  { name: "Portugal", flag: "pt" },
  { name: "Inglaterra", flag: "gb-eng" },
  { name: "Alemanha", flag: "de" },
  { name: "Holanda", flag: "nl" },
  { name: "Bélgica", flag: "be" },
  { name: "Noruega", flag: "no" },
  { name: "Coreia do Sul", flag: "kr" },
  { name: "Croácia", flag: "hr" },
  { name: "Marrocos", flag: "ma" },
  { name: "Arábia Saudita", flag: "sa" },
  { name: "EUA", flag: "us" },
  { name: "México", flag: "mx" },
  { name: "Uruguai", flag: "uy" },
  { name: "Egito", flag: "eg" },
  { name: "Japão", flag: "jp" },
  { name: "Irã", flag: "ir" },
  { name: "Suíça", flag: "ch" },
  { name: "Senegal", flag: "sn" },
];

export const Selecoes = () => (
  <div className="mt-10 bg-card border border-border rounded-2xl p-6">
    <p className="text-center font-display text-base tracking-wider uppercase text-foreground mb-1">
      42 Seleções representadas na coleção — 378 cards Heroes + 36 Contenders
    </p>
    <div className="flex flex-wrap justify-center gap-3 mt-4">
      {selecoes.map((s) => (
        <div key={s.name} className="flex items-center gap-1.5 bg-background rounded-full px-3 py-1.5 border border-border">
          <img src={`https://flagcdn.com/w20/${s.flag}.png`} alt={s.name} className="w-5 h-3.5 object-cover rounded-sm" />
          <span className="text-xs font-body text-foreground/70">{s.name}</span>
        </div>
      ))}
      <div className="flex items-center gap-1.5 bg-primary/10 rounded-full px-3 py-1.5 border border-primary/30">
        <span className="text-xs font-display tracking-wider text-primary">+ muitas outras</span>
      </div>
    </div>
  </div>
);
