import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SEOHead } from "@/components/SEOHead";
import { Link } from "react-router-dom";
import { DROP_DATE_LABEL, OFFER_DISCOUNT, OFFER_LINE } from "@/lib/drop";

const RegulamentoAcessoAntecipado = () => (
  <div className="min-h-screen bg-background">
    <SEOHead
      title="Regulamento do Acesso Antecipado | Bella Figurinha"
      description="Regras do acesso antecipado da Bella Figurinha: 20% de desconto em produtos Pokémon 30 anos, 1 unidade por CPF, por ordem de chegada e enquanto durar o estoque."
      canonical="https://bellafigurinha.com.br/regulamento-acesso-antecipado"
    />
    <Header />

    <main className="container mx-auto px-4 pt-32 pb-20 max-w-3xl">
      <h1 className="font-display text-4xl md:text-6xl tracking-wider uppercase">
        Regulamento do acesso antecipado
      </h1>
      <p className="font-body text-muted-foreground mt-3">Versão v1 — vigente a partir de setembro de 2026.</p>

      <div className="prose prose-neutral max-w-none mt-8 font-body">
        <h2>1. Do que se trata</h2>
        <p>
          A Bella Figurinha LTDA (CNPJ 65.289.034/0001-93) realiza uma ação de acesso antecipado ao primeiro drop de
          produtos colecionáveis da nova fase da marca, com abertura do quiosque no Shopping Palladium, em Curitiba – PR,
          em {DROP_DATE_LABEL}.
        </p>

        <h2>2. Quem pode participar e até quando</h2>
        <p>
          Pessoas físicas maiores de 18 anos, com CPF válido, que realizem o cadastro na página de acesso antecipado
          informando nome completo, CPF, WhatsApp e e-mail, e que aceitem este regulamento. Os cadastros ficam abertos
          <strong> até {DROP_DATE_LABEL}</strong>, data de abertura do quiosque e do primeiro drop.
        </p>

        <h2>3. O benefício</h2>
        <p>
          Participantes cadastrados têm direito a <strong>{OFFER_DISCOUNT} de desconto em produtos {OFFER_LINE}</strong>,
          limitado a <strong>1 (uma) unidade por CPF</strong>. O atendimento é por <strong>ordem de chegada</strong> ao
          quiosque e o benefício é válido <strong>enquanto durar o estoque</strong>, podendo ser encerrado a qualquer
          momento.
        </p>
        <p>
          <strong>O cadastro dá acesso ao desconto, mas não reserva produto nem garante unidade.</strong> Não há
          cobrança antecipada, reserva de item ou fila prioritária além da ordem de chegada ao quiosque.
        </p>

        <h2>4. Como resgatar</h2>
        <p>
          O resgate é presencial, no quiosque do Shopping Palladium, mediante identificação do CPF cadastrado. Cada CPF
          pode resgatar o benefício uma única vez; após o resgate, o cadastro é marcado como utilizado.
        </p>


        <h2>5. Cadastro duplicado</h2>
        <p>
          Cada CPF pode ser cadastrado apenas uma vez. Tentativas de novo cadastro com o mesmo CPF são identificadas e
          não geram novo registro nem novo benefício.
        </p>

        <h2>6. Dados pessoais (LGPD)</h2>
        <p>
          Os dados informados são utilizados exclusivamente para a operação desta ação: comunicação sobre o drop,
          validação do benefício e controle do resgate. Registramos data e hora do consentimento, versão deste
          regulamento e a origem do cadastro. CPF, telefone, e-mail e nome não são enviados a plataformas de
          publicidade ou de medição. Para exercer seus direitos (acesso, correção ou exclusão), escreva para
          contato@bellafigurinha.com.br. Detalhes completos na{" "}
          <Link to="/politica-de-privacidade">Política de Privacidade</Link>.
        </p>

        <h2>7. Disposições gerais</h2>
        <p>
          Esta ação não é uma pré-venda: não há reserva, cobrança antecipada nem garantia de unidade. A Bella Figurinha
          pode alterar ou encerrar a ação mediante comunicação em seus canais oficiais.
        </p>
      </div>
    </main>

    <Footer />
  </div>
);

export default RegulamentoAcessoAntecipado;
