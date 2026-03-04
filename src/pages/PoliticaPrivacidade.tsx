import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SEOHead } from "@/components/SEOHead";

const PoliticaPrivacidade = () => (
  <div className="min-h-screen bg-background">
    <SEOHead
      title="Política de Privacidade | Bella Figurinha"
      description="Política de Privacidade da Bella Figurinha. Saiba como coletamos, usamos e protegemos seus dados pessoais."
      canonical="https://bellafigurinha.com.br/politica-de-privacidade"
    />
    <Header />

    <main className="container mx-auto px-4 pt-28 pb-20 max-w-3xl">
      <h1 className="font-display text-4xl md:text-5xl tracking-wider uppercase text-foreground mb-8">
        Política de <span className="text-gradient-yellow">Privacidade</span>
      </h1>

      <div className="prose prose-invert max-w-none space-y-6 text-muted-foreground font-body leading-relaxed">
        <p><strong className="text-foreground">Última atualização:</strong> 03 de março de 2026</p>

        <h2 className="font-display text-xl tracking-wider uppercase text-foreground !mt-10">1. Informações que Coletamos</h2>
        <p>Ao utilizar nosso site ou realizar uma compra, podemos coletar as seguintes informações pessoais:</p>
        <ul className="list-disc pl-6 space-y-1">
          <li>Nome completo</li>
          <li>Endereço de e-mail</li>
          <li>Endereço de entrega</li>
          <li>Número de telefone</li>
          <li>Dados de pagamento (processados de forma segura por terceiros)</li>
        </ul>

        <h2 className="font-display text-xl tracking-wider uppercase text-foreground !mt-10">2. Como Usamos Seus Dados</h2>
        <p>Utilizamos seus dados pessoais para:</p>
        <ul className="list-disc pl-6 space-y-1">
          <li>Processar e entregar seus pedidos</li>
          <li>Enviar atualizações sobre o status do pedido</li>
          <li>Oferecer suporte ao cliente</li>
          <li>Enviar novidades e promoções (com seu consentimento)</li>
          <li>Melhorar nossos produtos e serviços</li>
        </ul>

        <h2 className="font-display text-xl tracking-wider uppercase text-foreground !mt-10">3. Compartilhamento de Dados</h2>
        <p>Não vendemos, alugamos ou compartilhamos suas informações pessoais com terceiros, exceto quando necessário para:</p>
        <ul className="list-disc pl-6 space-y-1">
          <li>Processar pagamentos (gateways de pagamento seguros)</li>
          <li>Realizar entregas (transportadoras parceiras)</li>
          <li>Cumprir obrigações legais</li>
        </ul>

        <h2 className="font-display text-xl tracking-wider uppercase text-foreground !mt-10">4. Segurança dos Dados</h2>
        <p>Adotamos medidas de segurança técnicas e organizacionais para proteger seus dados pessoais contra acesso não autorizado, perda ou alteração. Nosso checkout é processado por plataformas certificadas com criptografia SSL.</p>

        <h2 className="font-display text-xl tracking-wider uppercase text-foreground !mt-10">5. Cookies</h2>
        <p>Utilizamos cookies para melhorar sua experiência de navegação, lembrar suas preferências e analisar o tráfego do site. Você pode desativar os cookies nas configurações do seu navegador.</p>

        <h2 className="font-display text-xl tracking-wider uppercase text-foreground !mt-10">6. Seus Direitos (LGPD)</h2>
        <p>De acordo com a Lei Geral de Proteção de Dados (LGPD), você tem direito a:</p>
        <ul className="list-disc pl-6 space-y-1">
          <li>Acessar seus dados pessoais</li>
          <li>Corrigir dados incompletos ou desatualizados</li>
          <li>Solicitar a exclusão dos seus dados</li>
          <li>Revogar o consentimento para comunicações</li>
        </ul>

        <h2 className="font-display text-xl tracking-wider uppercase text-foreground !mt-10">7. Contato</h2>
        <p>Para exercer seus direitos ou esclarecer dúvidas sobre esta política, entre em contato:</p>
        <p><strong className="text-foreground">E-mail:</strong> contato@bellafigurinha.com.br<br />
        <strong className="text-foreground">WhatsApp:</strong> (47) 9 9286-1752</p>
      </div>
    </main>

    <Footer />
  </div>
);

export default PoliticaPrivacidade;
