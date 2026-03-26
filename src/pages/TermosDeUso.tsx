import { useEffect } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SEOHead } from "@/components/SEOHead";
import { organizationSchema, breadcrumbSchema, injectJsonLd } from "@/lib/jsonld";

const TermosDeUso = () => {
  useEffect(() => {
    const cleanup1 = injectJsonLd("org-terms", { "@context": "https://schema.org", ...organizationSchema });
    const cleanup2 = injectJsonLd("breadcrumb-terms", breadcrumbSchema([
      { name: "Início", url: "https://bellafigurinha.com.br/" },
      { name: "Termos de Uso", url: "https://bellafigurinha.com.br/termos-de-uso" },
    ]));
    return () => { cleanup1(); cleanup2(); };
  }, []);

  return (
  <div className="min-h-screen bg-background">
    <SEOHead
      title="Termos de Uso | Bella Figurinha"
      description="Termos de Uso da Bella Figurinha. Conheça as condições de uso do nosso site e serviços."
      canonical="https://bellafigurinha.com.br/termos-de-uso"
    />
    <Header />

    <main className="container mx-auto px-4 pt-28 pb-20 max-w-3xl">
      <h1 className="font-display text-4xl md:text-5xl tracking-wider uppercase text-foreground mb-8">
        Termos de <span className="text-gradient-yellow">Uso</span>
      </h1>

      <div className="prose prose-invert max-w-none space-y-6 text-muted-foreground font-body leading-relaxed">
        <p><strong className="text-foreground">Última atualização:</strong> 03 de março de 2026</p>

        <h2 className="font-display text-xl tracking-wider uppercase text-foreground !mt-10">1. Aceitação dos Termos</h2>
        <p>Ao acessar e utilizar o site Bella Figurinha (bellafigurinha.com.br), você concorda com estes Termos de Uso. Caso não concorde, recomendamos que não utilize nossos serviços.</p>

        <h2 className="font-display text-xl tracking-wider uppercase text-foreground !mt-10">2. Sobre a Bella Figurinha</h2>
        <p>A Bella Figurinha é distribuidor oficial Panini, especializada na venda de figurinhas e cards colecionáveis. Todos os produtos comercializados são 100% originais e licenciados.</p>

        <h2 className="font-display text-xl tracking-wider uppercase text-foreground !mt-10">3. Cadastro e Conta</h2>
        <p>Para realizar compras, pode ser necessário fornecer dados pessoais verdadeiros e atualizados. Você é responsável por manter a confidencialidade de suas credenciais de acesso.</p>

        <h2 className="font-display text-xl tracking-wider uppercase text-foreground !mt-10">4. Produtos e Preços</h2>
        <ul className="list-disc pl-6 space-y-1">
          <li>Os preços exibidos estão em Reais (BRL) e podem ser alterados sem aviso prévio</li>
          <li>As imagens dos produtos são ilustrativas e podem variar do produto real</li>
          <li>A disponibilidade dos produtos está sujeita ao estoque</li>
          <li>Produtos em pré-venda serão enviados conforme o prazo informado na página do produto</li>
        </ul>

        <h2 className="font-display text-xl tracking-wider uppercase text-foreground !mt-10">5. Pagamento</h2>
        <p>Aceitamos diversas formas de pagamento processadas por plataformas seguras e certificadas. A confirmação do pedido está sujeita à aprovação do pagamento.</p>

        <h2 className="font-display text-xl tracking-wider uppercase text-foreground !mt-10">6. Entrega</h2>
        <p>Realizamos envios para todo o Brasil. Os prazos de entrega variam conforme a região e a modalidade de frete escolhida. O rastreamento será disponibilizado por e-mail após o despacho.</p>

        <h2 className="font-display text-xl tracking-wider uppercase text-foreground !mt-10">7. Propriedade Intelectual</h2>
        <p>Todo o conteúdo do site (textos, imagens, logos, design) é protegido por direitos autorais. É proibida a reprodução sem autorização prévia. As marcas Panini, FIFA e Adrenalyn XL são de propriedade de seus respectivos detentores.</p>

        <h2 className="font-display text-xl tracking-wider uppercase text-foreground !mt-10">8. Limitação de Responsabilidade</h2>
        <p>A Bella Figurinha não se responsabiliza por danos indiretos decorrentes do uso do site, indisponibilidade temporária ou erros em informações de terceiros.</p>

        <h2 className="font-display text-xl tracking-wider uppercase text-foreground !mt-10">9. Contato</h2>
        <p>Para dúvidas sobre estes termos:<br />
        <strong className="text-foreground">E-mail:</strong> contato@bellafigurinha.com.br<br />
        <strong className="text-foreground">WhatsApp:</strong> (11) 97660-9139</p>
      </div>
    </main>

    <Footer />
  </div>
  );
};

export default TermosDeUso;
