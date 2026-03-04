import { Link } from "react-router-dom";

const AdrenalynContent = () => (
  <section className="container mx-auto px-6 py-16 max-w-3xl">
    <div className="space-y-6 text-muted-foreground font-body text-[15px] leading-relaxed">
      <p>
        Se você é fã de futebol, já sabe que a Copa do Mundo não começa no apito
        inicial — começa muito antes, no momento em que você abre o primeiro
        envelope.
      </p>

      <p>
        A coleção oficial de trading cards da Panini para a edição mais aguardada
        da história reúne <strong className="text-foreground">48 seleções</strong>,
        três países-sede e os melhores jogadores do planeta em{" "}
        <strong className="text-foreground">630 cards</strong> com acabamento
        premium e gráficos inéditos. Cada card carrega imagem oficial, detalhes
        da seleção e aquela sensação única de segurar na mão um pedaço da Copa.
      </p>

      <p>
        Diferente das figurinhas tradicionais, esses cards foram feitos para
        jogar. Monte seu time dos sonhos, desafie amigos em duelos presenciais
        com o tabuleiro oficial ou enfrente colecionadores do mundo inteiro pelo
        app da Panini.
      </p>

      <p>
        Para quem está começando, o{" "}
        <strong className="text-foreground">Starter Pack</strong> entrega tudo de
        uma vez: pasta porta-cards, tabuleiro e cards Limited Edition exclusivos.
        Quem quer acelerar a busca pelas raridades vai na{" "}
        <strong className="text-foreground">Lata Classic Tin</strong> — Golden
        Baller garantido e visual colecionável em quatro cores sortidas. E para
        quem curte o ritual da abertura, os cards e kits avulsos mantêm a emoção
        viva a cada compra.
      </p>

      <p>
        Todos os produtos são{" "}
        <strong className="text-foreground">
          100% originais e licenciados pela Panini Brasil
        </strong>
        .
      </p>

      <p>
        Compre diretamente pelo site com entrega para todo o Brasil, ou consulte
        os pontos de venda físicos mais próximos de você pela nossa{" "}
        <Link
          to="/lojas"
          className="text-primary underline underline-offset-2 hover:text-primary/80 transition-colors"
        >
          página de pontos de venda
        </Link>
        .
      </p>
    </div>
  </section>
);

export default AdrenalynContent;
