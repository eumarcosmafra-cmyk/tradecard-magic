import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CalendarDays, CheckCircle2, Instagram, Loader2, MapPin, Sparkles } from "lucide-react";
import { SEOHead } from "@/components/SEOHead";
import { supabase } from "@/integrations/supabase/client";
import { captureAttribution, getAttribution, trackEvent } from "@/lib/analytics";
import { isValidEmail, maskPhone, onlyDigits } from "@/lib/cpf";
import quiosque from "@/assets/quiosque-arena.png.asset.json";
import logo from "@/assets/logo-bella.png";

type Status = "idle" | "sending" | "created" | "already_registered";

const EVENT_DATE = new Date("2026-09-24T19:00:00-03:00");

const useCountdown = () => {
  const [left, setLeft] = useState(EVENT_DATE.getTime() - Date.now());
  useEffect(() => {
    const t = setInterval(() => setLeft(EVENT_DATE.getTime() - Date.now()), 1000);
    return () => clearInterval(t);
  }, []);
  const clamped = Math.max(0, left);
  return {
    d: Math.floor(clamped / 86400000),
    h: Math.floor((clamped / 3600000) % 24),
    m: Math.floor((clamped / 60000) % 60),
    s: Math.floor((clamped / 1000) % 60),
  };
};

const ConviteInfluenciadores = () => {
  const [form, setForm] = useState({ nome: "", instagram: "", whatsapp: "", email: "", consent: false });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<Status>("idle");
  const { d, h, m, s } = useCountdown();

  useEffect(() => {
    captureAttribution();
    trackEvent("landing_view", { page: "convite_influenciadores" });
  }, []);

  const validate = () => {
    const e: Record<string, string> = {};
    if (form.nome.trim().length < 3) e.nome = "Informe seu nome completo.";
    if (!/^@?[a-zA-Z0-9._]{2,40}$/.test(form.instagram.trim())) e.instagram = "Informe seu @ do Instagram.";
    if (onlyDigits(form.whatsapp).length < 10) e.whatsapp = "Informe um WhatsApp com DDD.";
    if (!isValidEmail(form.email)) e.email = "E-mail inválido.";
    if (!form.consent) e.consent = "É preciso aceitar para confirmar.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!validate()) return;
    setStatus("sending");

    const attribution = getAttribution();
    const { data, error } = await supabase.functions.invoke("influencer-rsvp", {
      body: {
        nome: form.nome.trim(),
        instagram: form.instagram.trim(),
        whatsapp: onlyDigits(form.whatsapp),
        email: form.email.trim(),
        consent: true,
        origem: "convite-influenciadores",
        landingPath: attribution.landingPath,
        referrer: attribution.referrer,
        utm_source: attribution.utm_source,
        utm_medium: attribution.utm_medium,
        utm_campaign: attribution.utm_campaign,
        utm_content: attribution.utm_content,
        utm_term: attribution.utm_term,
      },
    });

    if (error || !(data as { status?: string })?.status) {
      setStatus("idle");
      setErrors({ form: "Não foi possível confirmar agora. Tente novamente em instantes." });
      return;
    }

    const next = (data as { status: string }).status;
    if (next === "already_registered") {
      setStatus("already_registered");
      return;
    }
    setStatus("created");
    trackEvent("influencer_rsvp_success", { page: "convite_influenciadores" });
  };

  const done = status === "created" || status === "already_registered";

  return (
    <div className="min-h-screen bg-arena text-white">
      <SEOHead
        title="Convite | Evento de Influenciadores Bella Figurinha"
        description="Confirmação de presença exclusiva para convidados."
        noindex
      />

      <header className="container mx-auto px-4 py-6 flex items-center justify-between">
        <Link to="/" className="inline-flex items-center bg-black rounded-lg px-3 py-1.5">
          <img src={logo} alt="Bella Figurinha" className="h-9 w-auto" />
        </Link>
        <span className="font-display text-sm tracking-widest uppercase text-electric">Convite exclusivo</span>
      </header>

      <section className="container mx-auto px-4 pb-16">
        <div className="grid lg:grid-cols-2 gap-10 items-start">
          <div className="space-y-6">
            <span className="inline-flex items-center gap-2 rounded-full bg-electric/15 text-electric px-4 py-1.5 font-display text-sm tracking-widest uppercase">
              <Sparkles size={15} /> Evento de influenciadores
            </span>
            <h1 className="font-display text-5xl md:text-7xl leading-none tracking-wider uppercase">
              Você está convidado para a <span className="text-gradient-electric">abertura da nova Bella</span>
            </h1>
            <p className="font-body text-lg text-white/80 max-w-xl">
              Uma noite comemorativa dos 30 anos dos cards mais amados do mundo, no nosso quiosque do Shopping
              Palladium. Confirme sua presença para garantir seu lugar na lista.
            </p>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="rounded-2xl bg-ink-soft/70 p-5 holo-border">
                <CalendarDays className="text-electric" size={20} />
                <p className="font-display text-2xl tracking-wider uppercase mt-2">24/09/2026</p>
                <p className="font-body text-sm text-white/70">Domingo</p>
              </div>
              <div className="rounded-2xl bg-ink-soft/70 p-5 holo-border">
                <MapPin className="text-electric" size={20} />
                <p className="font-display text-2xl tracking-wider uppercase mt-2">Shopping Palladium</p>
                <p className="font-body text-sm text-white/70">Quiosque da Bella — 30 anos de cards</p>
              </div>
            </div>

            <div className="flex gap-3">
              {[
                { v: d, l: "dias" },
                { v: h, l: "horas" },
                { v: m, l: "min" },
                { v: s, l: "seg" },
              ].map((item) => (
                <div key={item.l} className="rounded-2xl bg-ink-soft/70 px-5 py-3 holo-border text-center">
                  <p className="font-display text-3xl text-electric leading-none">{String(item.v).padStart(2, "0")}</p>
                  <p className="font-body text-[11px] uppercase tracking-widest text-white/50 mt-1">{item.l}</p>
                </div>
              ))}
            </div>

            <img
              src={quiosque.url}
              alt="Quiosque da Bella Figurinha no Shopping Palladium"
              loading="lazy"
              className="rounded-3xl w-full object-cover max-h-[420px]"
            />
          </div>

          <div className="rounded-3xl bg-ink-soft/90 p-6 md:p-8 holo-border shadow-volt">
            {!done ? (
              <form onSubmit={submit} noValidate className="space-y-4">
                <h2 className="font-display text-3xl tracking-wider uppercase">Confirmar presença</h2>
                <p className="font-body text-sm text-white/70">Leva menos de 30 segundos.</p>

                <div>
                  <label htmlFor="nome" className="font-body text-sm text-white/70">Nome completo</label>
                  <input
                    id="nome"
                    autoComplete="name"
                    value={form.nome}
                    onChange={(e) => setForm({ ...form, nome: e.target.value })}
                    className="mt-1 w-full rounded-xl bg-ink border border-white/15 px-4 py-4 text-base text-white outline-none focus:border-electric"
                    placeholder="Seu nome e sobrenome"
                  />
                  {errors.nome && <p className="text-spark text-xs mt-1 font-body">{errors.nome}</p>}
                </div>

                <div>
                  <label htmlFor="instagram" className="font-body text-sm text-white/70">@ do Instagram</label>
                  <input
                    id="instagram"
                    value={form.instagram}
                    onChange={(e) => setForm({ ...form, instagram: e.target.value })}
                    className="mt-1 w-full rounded-xl bg-ink border border-white/15 px-4 py-4 text-base text-white outline-none focus:border-electric"
                    placeholder="@seuperfil"
                  />
                  {errors.instagram && <p className="text-spark text-xs mt-1 font-body">{errors.instagram}</p>}
                </div>

                <div>
                  <label htmlFor="whatsapp" className="font-body text-sm text-white/70">WhatsApp</label>
                  <input
                    id="whatsapp"
                    inputMode="tel"
                    autoComplete="tel"
                    value={form.whatsapp}
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
                  <span>Autorizo o contato da Bella Figurinha sobre este evento.</span>
                </label>
                {errors.consent && <p className="text-spark text-xs font-body">{errors.consent}</p>}
                {errors.form && <p className="text-spark text-sm font-body">{errors.form}</p>}

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="w-full inline-flex items-center justify-center gap-2 bg-gradient-electric text-ink font-display text-xl tracking-widest uppercase py-4 rounded-xl hover:opacity-90 transition-opacity disabled:opacity-60"
                >
                  {status === "sending" && <Loader2 className="animate-spin" size={20} />}
                  Confirmar presença
                </button>
              </form>
            ) : (
              <div className="text-center space-y-5 py-4">
                <CheckCircle2 className="text-electric mx-auto" size={56} />
                <h2 className="font-display text-4xl tracking-wider uppercase">
                  {status === "created" ? "Presença confirmada!" : "Você já está confirmado"}
                </h2>
                <p className="font-body text-white/80">
                  Te esperamos dia 24/09 no quiosque da Bella, no Shopping Palladium.
                </p>
                <a
                  href="https://www.instagram.com/bellafigurinha"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 border border-white/25 text-white font-display text-lg tracking-widest uppercase py-3 px-6 rounded-xl"
                >
                  <Instagram size={18} /> Seguir a Bella
                </a>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ConviteInfluenciadores;
