import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SEOHead } from "@/components/SEOHead";
import { MessageCircle, Phone, Mail, MapPin, Send } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { contactPageJsonLd, breadcrumbSchema, injectJsonLd } from "@/lib/jsonld";
import logo from "@/assets/logo-bella.png";

const Contato = () => {
  const { toast } = useToast();
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    subject: "",
    message: "",
  });
  const [sending, setSending] = useState(false);

  useEffect(() => {
    const cleanup1 = injectJsonLd("contact", contactPageJsonLd());
    const cleanup2 = injectJsonLd("breadcrumb-contact", breadcrumbSchema([
      { name: "Início", url: "https://bellafigurinha.com.br/" },
      { name: "Contato", url: "https://bellafigurinha.com.br/contato" },
    ]));
    return () => { cleanup1(); cleanup2(); };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast({ title: "Preencha os campos obrigatórios", variant: "destructive" });
      return;
    }
    setSending(true);
    const text = `Olá! Meu nome é ${form.name}.%0A📧 ${form.email}%0A📞 ${form.phone || "Não informado"}%0A📋 Assunto: ${form.subject || "Geral"}%0A%0A${form.message}`;
    window.open(`https://wa.me/5511976609139?text=${text}`, "_blank");
    setSending(false);
    toast({ title: "Redirecionado para o WhatsApp!" });
    setForm({ name: "", phone: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Contato | Bella Figurinha — Fale Conosco"
        description="Entre em contato com a Bella Figurinha, distribuidor oficial Panini. Atendimento via WhatsApp, telefone e e-mail. Tire suas dúvidas sobre figurinhas e cards FIFA World Cup 2026."
        canonical="https://bellafigurinha.com.br/contato"
      />
      <Header />

      {/* Hero */}
      <section className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/80 to-secondary" />
        <div className="absolute inset-0 bg-black/20" />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <span className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm text-white font-display text-sm tracking-widest uppercase px-5 py-2 rounded-full mb-6">
            <MessageCircle size={16} />
            Fale com a Bella Figurinha
          </span>
          <h1 className="font-display text-4xl md:text-7xl tracking-wider text-white leading-tight">
            Como podemos<br />
            <span className="text-gradient-yellow">te ajudar?</span>
          </h1>
          <p className="text-white/80 mt-4 max-w-xl mx-auto font-body text-lg">
            Tire dúvidas sobre pedidos, trocas ou qualquer coisa sobre a coleção Panini FIFA 2026. Estamos aqui!
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left: Contact cards */}
          <div className="space-y-4">
            <a
              href="https://wa.me/5511976609139?text=Ol%C3%A1!%20Vim%20pelo%20site%20e%20gostaria%20de%20saber%20mais%20sobre%20os%20produtos%20da%20Bella%20Figurinha%20%E2%9A%BD"
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-card border border-border rounded-2xl p-6 hover:border-primary/30 transition-colors group"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center shrink-0">
                  <MessageCircle size={22} className="text-green-500" />
                </div>
                <div>
                  <p className="text-xs font-display tracking-widest uppercase text-muted-foreground">WhatsApp</p>
                  <p className="font-display text-lg text-foreground">(11) 97660-9139</p>
                  <p className="text-sm text-muted-foreground font-body">Resposta rápida · Seg a Sex</p>
                  <span className="inline-flex items-center gap-1.5 mt-3 bg-green-500 text-white text-sm font-display tracking-wider px-4 py-1.5 rounded-full group-hover:bg-green-600 transition-colors">
                    <MessageCircle size={14} /> Iniciar conversa
                  </span>
                </div>
              </div>
            </a>

            <a href="tel:+5511976609139" className="block bg-card border border-border rounded-2xl p-6 hover:border-primary/30 transition-colors">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <Phone size={22} className="text-primary" />
                </div>
                <div>
                  <p className="text-xs font-display tracking-widest uppercase text-muted-foreground">Telefone</p>
                  <p className="font-display text-lg text-foreground">(11) 97660-9139</p>
                  <p className="text-sm text-muted-foreground font-body">Ligações e mensagens</p>
                </div>
              </div>
            </a>

            <a href="mailto:contato@bellafigurinha.com.br" className="block bg-card border border-border rounded-2xl p-6 hover:border-primary/30 transition-colors">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center shrink-0">
                  <Mail size={22} className="text-secondary" />
                </div>
                <div>
                  <p className="text-xs font-display tracking-widest uppercase text-muted-foreground">E-mail</p>
                  <p className="font-display text-lg text-foreground">contato@bellafigurinha.com.br</p>
                  <p className="text-sm text-muted-foreground font-body">Respondemos em até 24h úteis</p>
                </div>
              </div>
            </a>

            <div className="bg-card border border-border rounded-2xl p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-destructive/10 flex items-center justify-center shrink-0">
                  <MapPin size={22} className="text-destructive" />
                </div>
                <div>
                  <p className="text-xs font-display tracking-widest uppercase text-muted-foreground">Correspondência</p>
                  <p className="font-display text-lg text-foreground">Bella Figurinha LTDA</p>
                  <p className="text-sm text-muted-foreground font-body">Rua Brigadeiro Franco, 1466</p>
                  <p className="text-sm text-muted-foreground font-body">Andar 09 — Cond. Soul Batel Soho Ed.</p>
                  <p className="text-sm text-muted-foreground font-body">Centro — Curitiba / PR</p>
                  <p className="text-sm text-muted-foreground font-body">CEP 80420-200</p>
                </div>
              </div>
            </div>

            <p className="text-sm text-muted-foreground font-body text-center pt-2">
              Atendimento: Seg a Sex · 9h às 18h
            </p>
          </div>

          {/* Right: Form */}
          <div className="bg-card border border-border rounded-2xl p-8">
            <h2 className="font-display text-2xl md:text-3xl tracking-wider text-foreground mb-2">
              Envie uma mensagem
            </h2>
            <p className="text-muted-foreground font-body mb-8">
              Preencha o formulário que retornamos o mais breve possível.
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="font-display text-xs tracking-widest uppercase">Nome</Label>
                  <Input name="name" placeholder="Seu nome" value={form.name} onChange={handleChange} maxLength={100} required />
                </div>
                <div className="space-y-2">
                  <Label className="font-display text-xs tracking-widest uppercase">Telefone</Label>
                  <Input name="phone" placeholder="(00) 00000-0000" value={form.phone} onChange={handleChange} maxLength={20} />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="font-display text-xs tracking-widest uppercase">E-mail</Label>
                <Input name="email" type="email" placeholder="seu@email.com" value={form.email} onChange={handleChange} maxLength={255} required />
              </div>

              <div className="space-y-2">
                <Label className="font-display text-xs tracking-widest uppercase">Assunto</Label>
                <Input name="subject" placeholder="Ex: Dúvida sobre meu pedido" value={form.subject} onChange={handleChange} maxLength={200} />
              </div>

              <div className="space-y-2">
                <Label className="font-display text-xs tracking-widest uppercase">Mensagem</Label>
                <Textarea name="message" placeholder="Escreva sua mensagem aqui..." value={form.message} onChange={handleChange} maxLength={1000} rows={5} required />
              </div>

              <Button
                type="submit"
                disabled={sending}
                className="w-full bg-gradient-yellow text-primary-foreground font-display text-lg tracking-wider uppercase py-6 rounded-xl hover:opacity-90 transition-opacity"
              >
                Enviar mensagem <Send size={18} />
              </Button>
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contato;
