import { CheckCircle } from "lucide-react";

const items = [
  { bold: "8 cards oficiais", text: "com arte exclusiva — Goleiros, Defensores, Meio-campistas e Atacantes das 42 seleções" },
  { bold: "1 cupom exclusivo", text: "para resgatar benefícios em paniniAdrenalyn.com" },
  { bold: "Tipos raros: Fan Favourite (FF) e Icon (IC)", text: "— um de cada por seleção" },
  { bold: "Chance de encontrar Golden Ballers", text: "(100 pts em tudo!), Eternos 22 e Momentum" },
  { bold: "Team Logo (+5 pts) e Official Emblem (+10 pts)", text: "mudam o jogo quando combinados" },
  { bold: "Cards compatíveis com o álbum Adrenalyn XL", text: "— cada bolso guarda 2 cards (frente e verso)" },
  { bold: "App MyPanini", text: "para criar seu card personalizado em mypanini.com" },
  { bold: "Produto licenciado oficialmente pela FIFA", text: "— dados atualizados em novembro de 2025" },
];

export const EnvelopeContent = () => (
  <section className="mt-20">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
      {/* Left: envelope image placeholder */}
      <div className="bg-card border-2 border-primary/20 rounded-2xl p-8 flex flex-col items-center justify-center min-h-[400px]">
        <p className="font-display text-6xl md:text-7xl tracking-wider uppercase text-foreground/10 text-center leading-tight">
          1 ENVELOPE
        </p>
      </div>

      {/* Right: content list */}
      <div className="space-y-6">
        <div className="inline-block bg-primary text-primary-foreground text-xs font-display tracking-widest uppercase px-4 py-1.5 rounded-full shadow-yellow">
          Conteúdo do Envelope
        </div>

        <h2 className="font-display text-3xl md:text-4xl tracking-wider uppercase text-foreground leading-tight">
          O que vem dentro?
        </h2>

        <p className="text-muted-foreground font-body text-sm leading-relaxed">
          Cada envelope é uma surpresa com cards premium dos maiores jogadores da Copa do Mundo 2026.
        </p>

        <ul className="space-y-4">
          {items.map((item) => (
            <li key={item.bold} className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <span className="text-sm font-body text-foreground leading-relaxed">
                <strong>{item.bold}</strong> {item.text}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </section>
);
