import { Link } from "react-router-dom";
import { Sparkles } from "lucide-react";
import binder from "@/assets/pkm30-binder.webp.asset.json";
import poster from "@/assets/pkm30-poster.webp.asset.json";
import trainerBox from "@/assets/pkm30-trainer-box.webp.asset.json";
import trainerBoxConteudo from "@/assets/pkm30-trainer-box-conteudo.webp.asset.json";
import lucario from "@/assets/pkm30-lucario.webp.asset.json";

const items = [
  {
    img: binder.url,
    title: "Coleção com Fichário",
    text: "1 fichário + 5 pacotes de booster · 30 cartas no total.",
  },
  {
    img: poster.url,
    title: "Coleção com Pôster",
    text: "3 cartas promocionais, 1 pôster 68 × 99 cm e 3 boosters · 21 cartas.",
  },
  {
    img: trainerBox.url,
    title: "Coleção Treinador Avançado",
    text: "Box premium com 55 cartas, dados, moeda e sleeves temáticos.",
  },
  {
    img: trainerBoxConteudo.url,
    title: "Conteúdo do Treinador Avançado",
    text: "9 boosters, carta promocional, sleeves, dados e moeda comemorativa.",
  },
  {
    img: lucario.url,
    title: "Coleção com Adesivos Tech",
    text: "Blister com 19 cartas, adesivos exclusivos e carta promo Lucario.",
  },
];

type Props = {
  /** Dark background version (used inside the Pokémon category page). */
  dark?: boolean;
};

export const Pokemon30Showcase = ({ dark = false }: Props) => (
  <section className={dark ? "bg-arena text-white py-20" : "bg-background py-20"}>
    <div className="container mx-auto px-4">
      <div className="text-center space-y-3 mb-12">
        <span
          className={`inline-flex items-center gap-2 rounded-full px-4 py-1.5 font-display text-sm tracking-widest uppercase ${
            dark ? "bg-electric/15 text-electric" : "bg-secondary/10 text-secondary"
          }`}
        >
          <Sparkles size={16} /> Celebração de 30 anos
        </span>
        <h2 className="font-display text-4xl md:text-6xl tracking-wider uppercase">
          O que vem em cada coleção
        </h2>
        <p className={`font-body max-w-2xl mx-auto ${dark ? "text-white/80" : "text-muted-foreground"}`}>
          Conteúdo das coleções comemorativas de 30 anos dos cards Pokémon.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => (
          <article
            key={item.title}
            className={`rounded-2xl border p-5 flex flex-col ${
              dark ? "border-white/15 bg-white/5" : "border-border bg-card"
            }`}
          >
            <div className="rounded-xl bg-white p-4 flex items-center justify-center aspect-[4/3] overflow-hidden">
              <img
                src={item.img}
                alt={`${item.title} — coleção comemorativa de 30 anos de cards Pokémon`}
                loading="lazy"
                className="max-h-full w-auto object-contain"
              />
            </div>
            <h3 className="font-display text-2xl tracking-wider uppercase mt-4">{item.title}</h3>
            <p className={`font-body text-sm mt-2 ${dark ? "text-white/70" : "text-muted-foreground"}`}>
              {item.text}
            </p>
          </article>
        ))}
      </div>

      <div className="text-center mt-10">
        <Link
          to="/acesso-antecipado"
          className={`inline-flex items-center gap-2 font-display text-lg tracking-widest uppercase ${
            dark ? "text-electric" : "text-secondary"
          }`}
        >
          Entrar na pré-lista <ArrowRight size={18} />
        </Link>
      </div>
    </div>
  </section>
);
