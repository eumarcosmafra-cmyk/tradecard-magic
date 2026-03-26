import { useEffect } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SEOHead } from "@/components/SEOHead";
import { organizationSchema, breadcrumbSchema, injectJsonLd } from "@/lib/jsonld";

const PoliticaTrocas = () => {
  useEffect(() => {
    const cleanup1 = injectJsonLd("org-returns", { "@context": "https://schema.org", ...organizationSchema });
    const cleanup2 = injectJsonLd("breadcrumb-returns", breadcrumbSchema([
      { name: "Início", url: "https://bellafigurinha.com.br/" },
      { name: "Política de Trocas e Devoluções", url: "https://bellafigurinha.com.br/politica-de-trocas-e-devolucoes" },
    ]));
    return () => { cleanup1(); cleanup2(); };
  }, []);

  return (
  <div className="min-h-screen bg-background">
    <SEOHead
      title="Política de Trocas e Devoluções | Bella Figurinha"
      description="Política de Trocas e Devoluções da Bella Figurinha. Saiba como solicitar troca ou devolução dos seus produtos."
      canonical="https://bellafigurinha.com.br/politica-de-trocas-e-devolucoes"
    />
    <Header />

    <main className="container mx-auto px-4 pt-28 pb-20 max-w-3xl">
      <h1 className="font-display text-4xl md:text-5xl tracking-wider uppercase text-foreground mb-8">
        Política de Trocas e <span className="text-gradient-yellow">Devoluções</span>
      </h1>

      <div className="prose prose-invert max-w-none space-y-6 text-muted-foreground font-body leading-relaxed">
        <p><strong className="text-foreground">Última atualização:</strong> 03 de março de 2026</p>

        <h2 className="font-display text-xl tracking-wider uppercase text-foreground !mt-10">1. Direito de Arrependimento</h2>
        <p>De acordo com o Código de Defesa do Consumidor (Art. 49), você pode desistir da compra em até <strong className="text-foreground">7 dias corridos</strong> após o recebimento do produto, sem necessidade de justificativa.</p>

        <h2 className="font-display text-xl tracking-wider uppercase text-foreground !mt-10">2. Condições para Troca ou Devolução</h2>
        <p>Para solicitar troca ou devolução, o produto deve:</p>
        <ul className="list-disc pl-6 space-y-1">
          <li>Estar na embalagem original, lacrado e sem sinais de uso</li>
          <li>Estar acompanhado da nota fiscal</li>
          <li>Ser devolvido dentro do prazo de 7 dias corridos</li>
        </ul>
        <p><strong className="text-foreground">Importante:</strong> Envelopes e caixas de cards abertos não são elegíveis para troca ou devolução, exceto em caso de defeito de fabricação.</p>

        <h2 className="font-display text-xl tracking-wider uppercase text-foreground !mt-10">3. Produtos com Defeito</h2>
        <p>Caso receba um produto com defeito de fabricação, entre em contato conosco em até <strong className="text-foreground">30 dias</strong> após o recebimento. Enviaremos um novo produto ou realizaremos o reembolso integral.</p>

        <h2 className="font-display text-xl tracking-wider uppercase text-foreground !mt-10">4. Como Solicitar</h2>
        <p>Para solicitar uma troca ou devolução:</p>
        <ol className="list-decimal pl-6 space-y-1">
          <li>Entre em contato pelo WhatsApp (11) 97660-9139 ou e-mail contato@bellafigurinha.com.br</li>
          <li>Informe o número do pedido e o motivo da solicitação</li>
          <li>Envie fotos do produto (em caso de defeito)</li>
          <li>Aguarde as instruções de envio da nossa equipe</li>
        </ol>

        <h2 className="font-display text-xl tracking-wider uppercase text-foreground !mt-10">5. Reembolso</h2>
        <p>O reembolso será processado em até <strong className="text-foreground">10 dias úteis</strong> após o recebimento do produto devolvido. O valor será estornado na mesma forma de pagamento utilizada na compra.</p>
        <ul className="list-disc pl-6 space-y-1">
          <li><strong className="text-foreground">Cartão de crédito:</strong> estorno em até 2 faturas</li>
          <li><strong className="text-foreground">PIX/Boleto:</strong> depósito na conta informada</li>
        </ul>

        <h2 className="font-display text-xl tracking-wider uppercase text-foreground !mt-10">6. Frete de Devolução</h2>
        <p>Em caso de arrependimento, o frete de devolução é por conta do cliente. Em caso de defeito de fabricação ou erro no envio, o frete de devolução é por conta da Bella Figurinha.</p>

        <h2 className="font-display text-xl tracking-wider uppercase text-foreground !mt-10">7. Contato</h2>
        <p>Dúvidas sobre trocas e devoluções:<br />
        <strong className="text-foreground">E-mail:</strong> contato@bellafigurinha.com.br<br />
        <strong className="text-foreground">WhatsApp:</strong> (11) 97660-9139</p>
      </div>
    </main>

    <Footer />
  </div>
  );
};

export default PoliticaTrocas;
