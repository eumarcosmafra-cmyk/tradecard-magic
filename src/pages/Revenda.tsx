import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SEOHead } from "@/components/SEOHead";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Briefcase, Package, Truck, HandshakeIcon, Send } from "lucide-react";
import { z } from "zod";
import { breadcrumbSchema, injectJsonLd } from "@/lib/jsonld";

const schema = z.object({
  nome: z.string().trim().min(2, "Informe seu nome").max(120),
  email: z.string().trim().email("E-mail inválido").max(255),
  telefone: z.string().trim().min(8, "Informe um telefone válido").max(30),
  volume_interesse: z.string().trim().min(1, "Selecione o volume").max(120),
  cnpj: z.string().trim().min(14, "CNPJ inválido").max(20),
  cep: z.string().trim().min(8, "CEP inválido").max(12),
  endereco_completo: z.string().trim().min(5, "Informe o endereço completo").max(500),
  observacoes: z.string().trim().max(1000).optional(),
});

const maskCNPJ = (v: string) =>
  v.replace(/\D/g, "").slice(0, 14)
    .replace(/^(\d{2})(\d)/, "$1.$2")
    .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
    .replace(/\.(\d{3})(\d)/, ".$1/$2")
    .replace(/(\d{4})(\d)/, "$1-$2");

const maskCEP = (v: string) =>
  v.replace(/\D/g, "").slice(0, 8).replace(/^(\d{5})(\d)/, "$1-$2");

const maskPhone = (v: string) =>
  v.replace(/\D/g, "").slice(0, 11)
    .replace(/^(\d{2})(\d)/, "($1) $2")
    .replace(/(\d{5})(\d)/, "$1-$2");

const Revenda = () => {
  const { toast } = useToast();
  const [sending, setSending] = useState(false);
  const [form, setForm] = useState({
    nome: "",
    email: "",
    telefone: "",
    volume_interesse: "",
    cnpj: "",
    cep: "",
    endereco_completo: "",
    observacoes: "",
  });

  useEffect(() => {
    const cleanup = injectJsonLd("breadcrumb-revenda", breadcrumbSchema([
      { name: "Início", url: "https://bellafigurinha.com.br/" },
      { name: "Revenda", url: "https://bellafigurinha.com.br/revenda" },
    ]));
    return cleanup;
  }, []);

  const handleCEPBlur = async () => {
    const cep = form.cep.replace(/\D/g, "");
    if (cep.length !== 8) return;
    try {
      const res = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await res.json();
      if (!data.erro) {
        const endereco = `${data.logradouro || ""}${data.bairro ? ", " + data.bairro : ""}${data.localidade ? " - " + data.localidade : ""}${data.uf ? "/" + data.uf : ""}`;
        setForm((p) => ({ ...p, endereco_completo: endereco }));
      }
    } catch {
      // silent
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      toast({
        title: "Verifique o formulário",
        description: parsed.error.issues[0]?.message ?? "Dados inválidos",
        variant: "destructive",
      });
      return;
    }
    setSending(true);
    const { error } = await supabase.from("leads_b2b").insert({
      nome: parsed.data.nome,
      email: parsed.data.email,
      telefone: parsed.data.telefone,
      volume_interesse: parsed.data.volume_interesse,
      cnpj: parsed.data.cnpj,
      cep: parsed.data.cep,
      endereco_completo: parsed.data.endereco_completo,
      observacoes: parsed.data.observacoes || null,
    });
    setSending(false);
    if (error) {
      toast({
        title: "Erro ao enviar",
        description: "Tente novamente em instantes.",
        variant: "destructive",
      });
      return;
    }
    toast({
      title: "Solicitação enviada!",
      description: "Nosso time comercial entrará em contato em breve.",
    });
    setForm({
      nome: "",
      email: "",
      telefone: "",
      volume_interesse: "",
      cnpj: "",
      cep: "",
      endereco_completo: "",
      observacoes: "",
    });
  };

  return (
    <>
      <SEOHead
        title="Seja Revendedor Bella Figurinha | Atacado B2B"
        description="Quer vender produtos Bella Figurinha na sua loja? Cadastre-se como revendedor B2B e receba uma proposta comercial exclusiva."
        canonical="https://bellafigurinha.com.br/revenda"
      />
      <Header />
      <main className="min-h-screen bg-background pt-24 pb-16">
        {/* Hero */}
        <section className="container mx-auto px-4 py-12 text-center">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary/15 text-secondary font-display tracking-wider uppercase text-sm mb-6">
            <Briefcase size={16} /> Atacado B2B
          </span>
          <h1 className="font-display text-4xl md:text-6xl uppercase tracking-wider mb-4">
            Seja um <span className="text-secondary">Revendedor</span> Bella Figurinha
          </h1>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            Leve os produtos oficiais Panini e as figurinhas mais desejadas do Brasil para o seu ponto de venda.
            Preencha os dados abaixo e nosso time comercial entrará em contato.
          </p>
        </section>

        {/* Benefits */}
        <section className="container mx-auto px-4 mb-12">
          <div className="grid md:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {[
              { icon: Package, title: "Produtos oficiais", desc: "Catálogo Panini e licenciados originais." },
              { icon: Truck, title: "Logística ágil", desc: "Entrega rápida para todo o Brasil." },
              { icon: HandshakeIcon, title: "Condições especiais", desc: "Preços e prazos para revendedores." },
            ].map((b) => (
              <div key={b.title} className="bg-card border border-border rounded-xl p-6 text-center">
                <b.icon className="mx-auto mb-3 text-secondary" size={32} />
                <h3 className="font-display text-lg uppercase tracking-wider mb-1">{b.title}</h3>
                <p className="text-sm text-foreground/70">{b.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Form */}
        <section className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto bg-card border border-border rounded-2xl p-6 md:p-10 shadow-lg">
            <h2 className="font-display text-2xl md:text-3xl uppercase tracking-wider mb-6 text-center">
              Cadastro de Revendedor
            </h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <Label htmlFor="nome">Nome / Razão Social *</Label>
                  <Input
                    id="nome"
                    value={form.nome}
                    onChange={(e) => setForm((p) => ({ ...p, nome: e.target.value }))}
                    placeholder="Sua empresa"
                    required
                    maxLength={120}
                  />
                </div>
                <div>
                  <Label htmlFor="email">E-mail comercial *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                    placeholder="contato@empresa.com"
                    required
                    maxLength={255}
                  />
                </div>
                <div>
                  <Label htmlFor="telefone">Telefone / WhatsApp *</Label>
                  <Input
                    id="telefone"
                    value={form.telefone}
                    onChange={(e) => setForm((p) => ({ ...p, telefone: maskPhone(e.target.value) }))}
                    placeholder="(11) 99999-9999"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="cnpj">CNPJ *</Label>
                  <Input
                    id="cnpj"
                    value={form.cnpj}
                    onChange={(e) => setForm((p) => ({ ...p, cnpj: maskCNPJ(e.target.value) }))}
                    placeholder="00.000.000/0000-00"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="volume">Volume de interesse / quantidade *</Label>
                  <select
                    id="volume"
                    value={form.volume_interesse}
                    onChange={(e) => setForm((p) => ({ ...p, volume_interesse: e.target.value }))}
                    required
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  >
                    <option value="">Selecione...</option>
                    <option value="Até 100 unidades">Até 100 unidades</option>
                    <option value="100 a 500 unidades">100 a 500 unidades</option>
                    <option value="500 a 1.000 unidades">500 a 1.000 unidades</option>
                    <option value="1.000 a 5.000 unidades">1.000 a 5.000 unidades</option>
                    <option value="Acima de 5.000 unidades">Acima de 5.000 unidades</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="cep">CEP *</Label>
                  <Input
                    id="cep"
                    value={form.cep}
                    onChange={(e) => setForm((p) => ({ ...p, cep: maskCEP(e.target.value) }))}
                    onBlur={handleCEPBlur}
                    placeholder="00000-000"
                    required
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="endereco">Endereço completo *</Label>
                <Input
                  id="endereco"
                  value={form.endereco_completo}
                  onChange={(e) => setForm((p) => ({ ...p, endereco_completo: e.target.value }))}
                  placeholder="Rua, número, complemento, bairro, cidade/UF"
                  required
                  maxLength={500}
                />
              </div>
              <div>
                <Label htmlFor="obs">Observações (opcional)</Label>
                <Textarea
                  id="obs"
                  value={form.observacoes}
                  onChange={(e) => setForm((p) => ({ ...p, observacoes: e.target.value }))}
                  placeholder="Conte mais sobre seu negócio, prazos, produtos de interesse..."
                  maxLength={1000}
                  rows={4}
                />
              </div>
              <Button
                type="submit"
                disabled={sending}
                className="w-full h-12 bg-secondary text-secondary-foreground hover:bg-secondary/90 font-display tracking-wider uppercase text-base"
              >
                {sending ? "Enviando..." : (<><Send size={18} /> Quero ser revendedor</>)}
              </Button>
              <p className="text-xs text-foreground/60 text-center">
                Ao enviar, você autoriza nossa equipe comercial a entrar em contato.
              </p>
            </form>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Revenda;
