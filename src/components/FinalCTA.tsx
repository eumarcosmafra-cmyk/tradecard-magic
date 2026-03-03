export const FinalCTA = () => (
  <section className="mt-20 mb-10">
    <div className="bg-gradient-to-br from-primary/10 via-card to-secondary/10 border-2 border-primary/20 rounded-2xl p-10 md:p-16 text-center">
      <p className="text-sm font-display tracking-widest uppercase text-primary mb-3">Coleção oficial FIFA — Estoque limitado</p>
      <h2 className="font-display text-4xl md:text-5xl tracking-wider uppercase text-foreground">
        Monte sua coleção<br />FIFA World Cup 2026™
      </h2>
      <p className="text-muted-foreground font-body mt-4 max-w-lg mx-auto">
        Garanta já seus envelopes e descubra qual Golden Baller vai parar nas suas mãos.
      </p>
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="mt-8 inline-flex items-center gap-2 bg-gradient-to-r from-primary to-yellow-400 text-primary-foreground font-display text-xl tracking-wider uppercase px-10 py-4 rounded-xl shadow-yellow-lg hover:opacity-90 transition-opacity"
      >
        Comprar Agora ↑
      </button>
    </div>
  </section>
);
