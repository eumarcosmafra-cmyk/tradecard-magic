import { Link } from "react-router-dom";

const AdrenalynContent = () => (
  <section className="container mx-auto px-6 py-16 max-w-3xl">
    <div className="space-y-6 text-muted-foreground font-body text-[15px] leading-relaxed">
      <p>
        Os cards Adrenalyn XL FIFA World Cup 2026 são a coleção oficial de
        trading cards da Panini para a Copa do Mundo mais aguardada da história
        — <strong className="text-foreground">48 seleções</strong>, três
        países-sede e{" "}
        <strong className="text-foreground">630 cards</strong> com acabamento
        premium, gráficos inéditos e imagens oficiais dos melhores jogadores do
        planeta.
      </p>

      <p>
        Diferente das figurinhas tradicionais, os trading cards Panini Copa 2026
        foram feitos para jogar. Monte seu time dos sonhos, desafie amigos em
        duelos presenciais com o tabuleiro oficial ou enfrente colecionadores do
        mundo inteiro pelo app da Panini — a coleção vive dentro e fora do
        álbum.
      </p>

      {/* Starter Pack */}
      <div>
        <h3 className="font-display text-lg tracking-wider uppercase text-foreground mb-1">
          Starter Pack Adrenalyn XL 2026
        </h3>
        <p>
          A melhor opção para começar a colecionar cards da Copa do Mundo 2026
          do jeito certo. O kit já vem com pasta porta-cards, tabuleiro para
          duelos e cards Limited Edition exclusivos — tudo pronto para entrar em
          campo no primeiro dia.
        </p>
      </div>

      {/* Lata Classic Tin */}
      <div>
        <h3 className="font-display text-lg tracking-wider uppercase text-foreground mb-1">
          Lata Classic Tin Adrenalyn XL 2026
        </h3>
        <p>
          Para quem leva a coleção a sério ou quer o presente perfeito para um
          fã de futebol. Cada lata traz um Golden Baller garantido, cards
          Limited Edition e visual colecionável em quatro cores sortidas: Prata,
          Bronze, Azul ou Verde.
        </p>
      </div>

      {/* Cards Avulsos */}
      <div>
        <h3 className="font-display text-lg tracking-wider uppercase text-foreground mb-1">
          Cards e Kits Avulsos
        </h3>
        <p>
          Para quem curte o ritual de abrir envelope por envelope. Cada pacote
          traz 8 cards oficiais Panini + cupom de ativação para o jogo digital —
          e a chance de encontrar as raridades mais disputadas da linha a cada
          abertura.
        </p>
      </div>

      <p>
        Todos os produtos são{" "}
        <strong className="text-foreground">
          100% originais e licenciados pela Panini Brasil
        </strong>
        . Compre os cards Adrenalyn XL Copa 2026 diretamente pelo site com
        entrega para todo o Brasil, ou consulte os pontos de venda físicos perto
        de você pela nossa{" "}
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
