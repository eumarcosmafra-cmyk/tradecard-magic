import { useCallback, useMemo, useState } from "react";
import { Download, Loader2, Lock, Search, CheckCircle2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { SEOHead } from "@/components/SEOHead";
import { maskCpf, maskPhone, onlyDigits } from "@/lib/cpf";

type Lead = {
  id: string;
  nome: string;
  cpf: string;
  whatsapp: string;
  email: string;
  created_at: string;
  origem: string | null;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  utm_content: string | null;
  promo_redeemed: boolean;
  redeemed_at: string | null;
  redeem_code: string | null;
};

const ListaCadastros = () => {
  const [senha, setSenha] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(false);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [query, setQuery] = useState("");

  const load = useCallback(
    async (pass: string) => {
      setLoading(true);
      setErro("");
      const { data, error } = await supabase.functions.invoke("leads-lista", { body: { senha: pass } });
      setLoading(false);
      if (error || (data as { error?: string })?.error) {
        setErro("Senha incorreta ou falha ao carregar.");
        return false;
      }
      setLeads(((data as { leads?: Lead[] })?.leads ?? []) as Lead[]);
      return true;
    },
    [],
  );

  const entrar = async (e: React.FormEvent) => {
    e.preventDefault();
    const ok = await load(senha);
    if (ok) setUnlocked(true);
  };

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return leads;
    const digits = onlyDigits(q);
    return leads.filter(
      (l) =>
        l.nome.toLowerCase().includes(q) ||
        (digits.length > 0 && (l.cpf.includes(digits) || l.whatsapp.includes(digits))) ||
        l.email.toLowerCase().includes(q) ||
        (l.utm_campaign || "").toLowerCase().includes(q),
    );
  }, [leads, query]);

  const toggleRedeemed = async (lead: Lead) => {
    const next = !lead.promo_redeemed;
    const { error } = await supabase.functions.invoke("leads-lista", {
      body: { senha, action: "toggle", id: lead.id, redeemed: next },
    });
    if (!error) {
      setLeads((prev) =>
        prev.map((l) =>
          l.id === lead.id ? { ...l, promo_redeemed: next, redeemed_at: next ? new Date().toISOString() : null } : l,
        ),
      );
    }
  };

  const exportCsv = () => {
    const header = [
      "nome", "cpf", "whatsapp", "email", "cadastro", "origem",
      "utm_source", "utm_medium", "utm_campaign", "utm_content",
      "promo_utilizada", "data_resgate", "codigo",
    ];
    const rows = filtered.map((l) => [
      l.nome, l.cpf, l.whatsapp, l.email, new Date(l.created_at).toLocaleString("pt-BR"), l.origem ?? "",
      l.utm_source ?? "", l.utm_medium ?? "", l.utm_campaign ?? "", l.utm_content ?? "",
      l.promo_redeemed ? "sim" : "não", l.redeemed_at ? new Date(l.redeemed_at).toLocaleString("pt-BR") : "",
      l.redeem_code ?? "",
    ]);
    const csv = [header, ...rows]
      .map((r) => r.map((v) => `"${String(v).replace(/"/g, '""')}"`).join(";"))
      .join("\n");
    const url = URL.createObjectURL(new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" }));
    const a = document.createElement("a");
    a.href = url;
    a.download = `acesso-antecipado-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (!unlocked) {
    return (
      <div className="min-h-screen bg-arena text-white flex items-center justify-center px-4">
        <SEOHead title="Lista de cadastros | Bella Figurinha" description="Acesso restrito." noindex />
        <form onSubmit={entrar} className="w-full max-w-sm rounded-2xl bg-ink-soft/70 p-8 holo-border space-y-4">
          <div className="flex items-center gap-2 text-electric">
            <Lock size={18} />
            <h1 className="font-display text-2xl tracking-wider uppercase">Lista de cadastros</h1>
          </div>
          <p className="font-body text-sm text-white/60">Digite a senha para ver quem preencheu a pré-lista.</p>
          <input
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            placeholder="Senha"
            className="w-full rounded-xl bg-ink border border-white/15 px-4 py-3 font-body text-white outline-none"
          />
          {erro && <p className="font-body text-sm text-red-400">{erro}</p>}
          <button
            type="submit"
            disabled={loading || !senha}
            className="w-full bg-gradient-electric text-ink font-display tracking-widest uppercase py-3 rounded-xl disabled:opacity-50"
          >
            {loading ? <Loader2 className="animate-spin mx-auto" size={18} /> : "Entrar"}
          </button>
        </form>
      </div>
    );
  }

  const redeemed = leads.filter((l) => l.promo_redeemed).length;

  return (
    <div className="min-h-screen bg-arena text-white">
      <SEOHead title="Lista de cadastros | Bella Figurinha" description="Acesso restrito." noindex />
      <div className="container mx-auto px-4 py-10">
        <h1 className="font-display text-4xl tracking-wider uppercase">Lista de cadastros</h1>

        <div className="grid sm:grid-cols-3 gap-4 mt-6">
          <div className="rounded-2xl bg-ink-soft/70 p-5 holo-border">
            <p className="font-body text-xs uppercase tracking-widest text-white/50">Cadastros</p>
            <p className="font-display text-4xl text-electric">{leads.length}</p>
          </div>
          <div className="rounded-2xl bg-ink-soft/70 p-5 holo-border">
            <p className="font-body text-xs uppercase tracking-widest text-white/50">Resgatados</p>
            <p className="font-display text-4xl text-electric">{redeemed}</p>
          </div>
          <div className="rounded-2xl bg-ink-soft/70 p-5 holo-border">
            <p className="font-body text-xs uppercase tracking-widest text-white/50">Pendentes</p>
            <p className="font-display text-4xl text-electric">{leads.length - redeemed}</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-3 mt-8">
          <div className="flex items-center gap-2 flex-1 min-w-[240px] rounded-xl bg-ink border border-white/15 px-4">
            <Search size={18} className="text-white/40" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar por nome, CPF, telefone, e-mail ou campanha"
              className="flex-1 bg-transparent py-3 text-white outline-none font-body text-sm"
            />
          </div>
          <button
            onClick={exportCsv}
            className="inline-flex items-center gap-2 bg-gradient-electric text-ink font-display tracking-widest uppercase px-5 rounded-xl"
          >
            <Download size={18} /> Exportar CSV
          </button>
        </div>

        <div className="mt-6 overflow-x-auto rounded-2xl border border-white/10">
          <table className="w-full text-sm font-body">
            <thead className="bg-ink-soft/80 text-white/60 text-left">
              <tr>
                <th className="px-4 py-3">Nome</th>
                <th className="px-4 py-3">CPF</th>
                <th className="px-4 py-3">WhatsApp</th>
                <th className="px-4 py-3">E-mail</th>
                <th className="px-4 py-3">Cadastro</th>
                <th className="px-4 py-3">Campanha</th>
                <th className="px-4 py-3">Resgate</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 && (
                <tr><td colSpan={7} className="px-4 py-10 text-center text-white/50">Nenhum cadastro encontrado.</td></tr>
              )}
              {filtered.map((l) => (
                <tr key={l.id} className="border-t border-white/5">
                  <td className="px-4 py-3">{l.nome}</td>
                  <td className="px-4 py-3">{maskCpf(l.cpf)}</td>
                  <td className="px-4 py-3">{maskPhone(l.whatsapp)}</td>
                  <td className="px-4 py-3 text-white/60">{l.email}</td>
                  <td className="px-4 py-3 text-white/60">{new Date(l.created_at).toLocaleDateString("pt-BR")}</td>
                  <td className="px-4 py-3 text-white/60">{l.utm_campaign || l.origem || "—"}</td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => toggleRedeemed(l)}
                      className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-display tracking-widest uppercase ${
                        l.promo_redeemed ? "bg-electric text-ink" : "border border-white/20 text-white/70"
                      }`}
                    >
                      <CheckCircle2 size={14} />
                      {l.promo_redeemed ? "Utilizado" : "Marcar"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ListaCadastros;
