import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Zap, ShieldCheck, Sparkles, MapPin, Instagram, CheckCircle2, Loader2 } from "lucide-react";
import { Footer } from "@/components/Footer";
import { SEOHead } from "@/components/SEOHead";
import { Countdown } from "@/components/Countdown";
import { supabase } from "@/integrations/supabase/client";
import { captureAttribution, getAttribution, trackEvent } from "@/lib/analytics";
import { isValidCpf, isValidEmail, maskCpf, maskPhone, onlyDigits } from "@/lib/cpf";
import {
  DROP_DATE_LABEL,
  DROP_DATE_SHORT,
  OFFER_FULL,
  
  OFFER_NO_RESERVE,
  OFFER_SHORT,
  TERMS_VERSION,
  isSignupOpen,
} from "@/lib/drop";
import pkm30TrainerBox from "@/assets/pkm30-trainer-box.webp.asset.json";
import logo from "@/assets/logo-bella.png";

type Status = "idle" | "sending" | "created" | "already_registered";

const steps = [
  { n: "01", title: "Cadastre-se", text: `Entre gratuitamente na lista de acesso antecipado até ${DROP_DATE_SHORT}.` },
  { n: "02", title: "Receba o aviso", text: "Avisamos quando o primeiro drop estiver disponível." },
  {
    n: "03",
    title: "Garanta o seu",
    text: `No quiosque do Palladium você usa o desconto de ${OFFER_SHORT.toLowerCase()} — 1 unidade por CPF, por ordem de chegada e enquanto durar o estoque. O cadastro não reserva produto.`,
  },
];


const AcessoAntecipado = () => {
  const [form, setForm] = useState({ nome: "", cpf: "", whatsapp: "", email: "", consent: false });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<Status>("idle");
  const [started, setStarted] = useState(false);

  useEffect(() => {
    captureAttribution();
    trackEvent("landing_view", { page: "acesso_antecipado" });
  }, []);

  const onFieldFocus = () => {
    if (!started) {
      setStarted(true);
      trackEvent("form_started", { page: "acesso_antecipado" });
    }
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (form.nome.trim().length < 3 || !form.nome.trim().includes(" ")) e.nome = "Informe seu nome completo.";
    if (!isValidCpf(form.cpf)) e.cpf = "CPF inválido.";
    if (onlyDigits(form.whatsapp).length < 10) e.whatsapp = "Informe um WhatsApp com DDD.";
    if (!isValidEmail(form.email)) e.email = "E-mail inválido.";
    if (!form.consent) e.consent = "É preciso aceitar os termos para participar.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!validate()) return;
    setStatus("sending");
    trackEvent("form_completed", { page: "acesso_antecipado" });

    const attribution = getAttribution();
    const { data, error } = await supabase.functions.invoke("early-access-signup", {
      body: {
        nome: form.nome.trim(),
        cpf: onlyDigits(form.cpf),
        whatsapp: onlyDigits(form.whatsapp),
        email: form.email.trim(),
        consent: true,
        termsVersion: TERMS_VERSION,
        origem: "acesso-antecipado",
        landingPath: attribution.landingPath,
        referrer: attribution.referrer,
        utm_source: attribution.utm_source,
        utm_medium: attribution.utm_medium,
        utm_campaign: attribution.utm_campaign,
        utm_content: attribution.utm_content,
        utm_term: attribution.utm_term,
      },
    });

    if (error || !data?.status) {
      setStatus("idle");
      setErrors({ form: "Não foi possível concluir agora. Tente novamente em instantes." });
      return;
    }

    if (data.status === "already_registered") {
      setStatus("already_registered");
      trackEvent("registration_duplicate", { page: "acesso_antecipado" });
      return;
    }

    setStatus("created");
    trackEvent("registration_success", { page: "acesso_antecipado" });
  };

  const done = status === "created" || status === "already_registered";
  const signupOpen = isSignupOpen();

  return (
    <div className="min-h-screen bg-arena text-white">
      <SEOHead
        title="Acesso Antecipado | Primeiro Drop da Bella Figurinha"
        description="Entre na lista de acesso antecipado da Bella Figurinha até 25/09 e garanta 20% de desconto em produtos Pokémon 30 anos — 1 unidade por CPF, enquanto durar o estoque."
        canonical="https://bellafigurinha.com.br/acesso-antecipado"
      />

      <header className="container mx-auto px-4 py-6 flex items-center justify-between">
        <Link to="/" className="inline-flex items-center bg-white rounded-lg px-3 py-1.5">
          <img src={logo} alt="Bella Figurinha" className="h-9 w-auto" />
        </Link>
        <span className="font-display text-sm tracking-widest uppercase text-electric">30 anos de cards</span>
      </header>

      {/* Seção 1 — hero + formulário */}
      <section className="container mx-auto px-4 pb-16">
        <div className="grid lg:grid-cols-2 gap-10 items-start">
          <div className="space-y-6">
            <span className="inline-flex items-center gap-2 rounded-full bg-electric/15 text-electric px-4 py-1.5 font-display text-sm tracking-widest uppercase">
              <Zap size={15} /> Primeiro drop · {DROP_DATE_LABEL}
            </span>
            <h1 className="font-display text-5xl md:text-7xl leading-none tracking-wider uppercase">
              O primeiro drop da <span className="text-gradient-electric">nova Bella</span> está chegando.
            </h1>
            <p className="font-body text-lg text-white/80 max-w-xl">
              Comemorando os 30 anos da coleção de cards mais amada do mundo, abrimos nosso quiosque no Shopping
              Palladium. Quem entrar na lista até {DROP_DATE_SHORT} leva a oferta de lançamento:
            </p>
            <p className="font-display text-3xl md:text-4xl tracking-wider uppercase text-electric leading-tight">
              {OFFER_FULL}
            </p>
            <div className="rounded-2xl border-2 border-spark/60 bg-spark/10 px-5 py-4">
              <p className="font-display text-lg tracking-widest uppercase text-spark">Atenção</p>
              <p className="font-body text-sm text-white/90 mt-1">{OFFER_NO_RESERVE}</p>
            </div>
            <Countdown />
            <ul className="space-y-3 font-body text-white/80">
              <li className="flex gap-3">
                <Sparkles className="text-electric shrink-0 mt-0.5" size={18} />
                {OFFER_SHORT} para quem está na lista.
              </li>
              <li className="flex gap-3">
                <ShieldCheck className="text-electric shrink-0 mt-0.5" size={18} />
                1 unidade por CPF, por ordem de chegada e enquanto durar o estoque.
              </li>
              <li className="flex gap-3">
                <MapPin className="text-electric shrink-0 mt-0.5" size={18} />
                Resgate presencial no quiosque do Shopping Palladium, em Curitiba.
              </li>
            </ul>

            <img
              src={pkm30TrainerBox.url}
              alt="Coleção comemorativa de 30 anos de cards Pokémon"
              loading="lazy"
              className="hidden lg:block rounded-3xl w-full max-w-md object-contain bg-white/5 p-4"
            />
          </div>

          {/* Formulário */}
          <div id="cadastro" className="rounded-3xl bg-ink-soft/90 p-6 md:p-8 holo-border shadow-volt">
            {!signupOpen ? (
              <div className="text-center space-y-4 py-4">
                <h2 className="font-display text-3xl tracking-wider uppercase">Cadastros encerrados</h2>
                <p className="font-body text-white/80">
                  A lista de acesso antecipado ficou aberta até {DROP_DATE_LABEL}. Agora é só passar no quiosque do
                  Shopping Palladium — o atendimento é por ordem de chegada, enquanto durar o estoque.
                </p>
                <Link
                  to="/loja-fisica"
                  className="inline-block bg-gradient-electric text-ink font-display text-lg tracking-widest uppercase py-3 px-8 rounded-xl"
                >
                  Ver o quiosque
                </Link>
              </div>
            ) : !done ? (
              <form onSubmit={submit} noValidate className="space-y-4">
                <h2 className="font-display text-3xl tracking-wider uppercase">Quem entra antes tem vantagem</h2>
                <p className="font-body text-sm text-white/70">
                  Cadastro gratuito, leva menos de 30 segundos. Inscrições até {DROP_DATE_SHORT}.
                </p>


                <div>
                  <label htmlFor="nome" className="font-body text-sm text-white/70">Nome completo</label>
                  <input
                    id="nome"
                    name="name"
                    autoComplete="name"
                    value={form.nome}
                    onFocus={onFieldFocus}
                    onChange={(e) => setForm({ ...form, nome: e.target.value })}
                    className="mt-1 w-full rounded-xl bg-ink border border-white/15 px-4 py-4 text-base text-white outline-none focus:border-electric"
                    placeholder="Seu nome e sobrenome"
                  />
                  {errors.nome && <p className="text-spark text-xs mt-1 font-body">{errors.nome}</p>}
                </div>

                <div>
                  <label htmlFor="cpf" className="font-body text-sm text-white/70">CPF</label>
                  <input
                    id="cpf"
                    inputMode="numeric"
                    value={form.cpf}
                    onFocus={onFieldFocus}
                    onChange={(e) => setForm({ ...form, cpf: maskCpf(e.target.value) })}
                    className="mt-1 w-full rounded-xl bg-ink border border-white/15 px-4 py-4 text-base text-white outline-none focus:border-electric"
                    placeholder="000.000.000-00"
                  />
                  {errors.cpf && <p className="text-spark text-xs mt-1 font-body">{errors.cpf}</p>}
                </div>

                <div>
                  <label htmlFor="whatsapp" className="font-body text-sm text-white/70">WhatsApp</label>
                  <input
                    id="whatsapp"
                    inputMode="tel"
                    autoComplete="tel"
                    value={form.whatsapp}
                    onFocus={onFieldFocus}
                    onChange={(e) => setForm({ ...form, whatsapp: maskPhone(e.target.value) })}
                    className="mt-1 w-full rounded-xl bg-ink border border-white/15 px-4 py-4 text-base text-white outline-none focus:border-electric"
                    placeholder="(00) 00000-0000"
                  />
                  {errors.whatsapp && <p className="text-spark text-xs mt-1 font-body">{errors.whatsapp}</p>}
                </div>

                <div>
                  <label htmlFor="email" className="font-body text-sm text-white/70">E-mail</label>
                  <input
                    id="email"
                    type="email"
                    inputMode="email"
                    autoComplete="email"
                    value={form.email}
                    onFocus={onFieldFocus}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="mt-1 w-full rounded-xl bg-ink border border-white/15 px-4 py-4 text-base text-white outline-none focus:border-electric"
                    placeholder="voce@email.com"
                  />
                  {errors.email && <p className="text-spark text-xs mt-1 font-body">{errors.email}</p>}
                </div>

                <label className="flex gap-3 items-start font-body text-sm text-white/70">
                  <input
                    type="checkbox"
                    checked={form.consent}
                    onChange={(e) => setForm({ ...form, consent: e.target.checked })}
                    className="mt-1 h-5 w-5 accent-[hsl(var(--electric))]"
                  />
                  <span>
                    Li e concordo com os termos da ação e com o tratamento dos meus dados para participação no acesso
                    antecipado.
                  </span>
                </label>
                {errors.consent && <p className="text-spark text-xs font-body">{errors.consent}</p>}

                <Link to="/regulamento-acesso-antecipado" className="block font-body text-sm underline text-electric">
                  Ver regulamento e política de privacidade
                </Link>

                {errors.form && <p className="text-spark text-sm font-body">{errors.form}</p>}

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="w-full inline-flex items-center justify-center gap-2 bg-gradient-electric text-ink font-display text-xl tracking-widest uppercase py-4 rounded-xl hover:opacity-90 transition-opacity disabled:opacity-60"
                >
                  {status === "sending" && <Loader2 className="animate-spin" size={20} />}
                  Quero acesso antecipado
                </button>

                <p className="font-body text-xs text-white/70 border border-spark/40 bg-spark/10 rounded-xl px-4 py-3">
                  {OFFER_NO_RESERVE}
                </p>
              </form>

            ) : (
              <div className="text-center space-y-5 py-4">
                <CheckCircle2 className="text-electric mx-auto" size={56} />
                <h2 className="font-display text-4xl tracking-wider uppercase">
                  {status === "created" ? "Você está dentro." : "Você já está na lista!"}
                </h2>
                <p className="font-body text-white/80">
                  {status === "created"
                    ? "Seu acesso antecipado à nova fase da Bella está confirmado. Acompanhe seu WhatsApp e seu e-mail."
                    : "Seu cadastro já estava confirmado. É só ficar de olho no WhatsApp e no e-mail."}
                </p>
                <p className="font-body text-white/60 text-sm">O primeiro drop acontece em {DROP_DATE_LABEL}.</p>
                <div className="flex flex-col gap-3 pt-2">
                  <Link
                    to="/"
                    className="bg-gradient-electric text-ink font-display text-lg tracking-widest uppercase py-3 rounded-xl"
                  >
                    Conhecer a nova Bella
                  </Link>
                  <a
                    href="https://www.instagram.com/bellafigurinha"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 border border-white/25 text-white font-display text-lg tracking-widest uppercase py-3 rounded-xl"
                  >
                    <Instagram size={18} /> Seguir a Bella
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Seção 3 — como funciona */}
      <section className="container mx-auto px-4 pb-20">
        <h2 className="font-display text-4xl md:text-5xl tracking-wider uppercase text-center mb-10">Como funciona</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {steps.map((s) => (
            <div key={s.n} className="rounded-2xl bg-ink-soft/70 p-6 holo-border">
              <span className="font-display text-5xl text-electric/70">{s.n}</span>
              <h3 className="font-display text-2xl tracking-wider uppercase mt-3">{s.title}</h3>
              <p className="font-body text-white/70 mt-2 text-sm leading-relaxed">{s.text}</p>
            </div>
          ))}
        </div>
        <div className="text-center mt-10">
          <a
            href="#cadastro"
            onClick={() => trackEvent("early_access_cta_click", { placement: "como_funciona" })}
            className="inline-block bg-gradient-electric text-ink font-display text-xl tracking-widest uppercase px-10 py-4 rounded-xl"
          >
            Entrar na lista
          </a>
          <p className="font-body text-white/70 text-sm mt-3 max-w-2xl mx-auto">{OFFER_NO_RESERVE}</p>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AcessoAntecipado;
