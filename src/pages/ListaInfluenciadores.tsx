import { useCallback, useMemo, useState } from "react";
import { CheckCircle2, Download, Loader2, Lock, Search } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { SEOHead } from "@/components/SEOHead";
import { maskPhone, onlyDigits } from "@/lib/cpf";

type Rsvp = {
  id: string;
  nome: string;
  instagram: string;
  whatsapp: string;
  email: string;
  created_at: string;
  origem: string | null;
  utm_campaign: string | null;
  attended: boolean;
  attended_at: string | null;
};

const ListaInfluenciadores = () => {
  const [senha, setSenha] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(false);
  const [rsvps, setRsvps] = useState<Rsvp[]>([]);
  const [query, setQuery] = useState("");

  const load = useCallback(async (pass: string) => {
    setLoading(true);
    setErro("");
    const { data, error } = await supabase.functions.invoke("influencer-lista", { body: { senha: pass } });
    setLoading(false);
    if (error || (data as { error?: string })?.error) {
      setErro("Senha incorreta ou falha ao carregar.");
      return false;
    }
    setRsvps(((data as { rsvps?: Rsvp[] })?.rsvps ?? []) as Rsvp[]);
    return true;
  }, []);

  const entrar = async (e: React.FormEvent) => {
    e.preventDefault();
    const ok = await load(senha);
    if (ok) setUnlocked(true);
  };

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase().replace(/^@/, "");
    if (!q) return rsvps;
    const digits = onlyDigits(q);
    return rsvps.filter(
      (r) =>
        r.nome.toLowerCase().includes(q) ||
        r.instagram.toLowerCase().includes(q) ||
        r.email.toLowerCase().includes(q) ||
        (digits.length > 0 && r.whatsapp.includes(digits)),
    );
  }, [rsvps, query]);

  const toggleAttended = async (rsvp: Rsvp) => {
    const next = !rsvp.attended;
    const { error } = await supabase.functions.invoke("influencer-lista", {
      body: { senha, action: "toggle", id: rsvp.id, attended: next },
    });
    if (!error) {
      setRsvps((prev) =>
        prev.map((r) =>
          r.id === rsvp.id ? { ...r, attended: next, attended_at: next ? new Date().toISOString() : null } : r,
        ),
      );
    }
  };

  const exportCsv = () => {
    const header = ["nome", "instagram", "whatsapp", "email", "confirmacao", "compareceu", "check_in", "campanha"];
    const rows = filtered.map((r) => [
      r.nome,
      "@" + r.instagram,
      r.whatsapp,
      r.email,
      new Date(r.created_at).toLocaleString("pt-BR"),
      r.attended ? "sim" : "não",
      r.attended_at ? new Date(r.attended_at).toLocaleString("pt-BR") : "",
      r.utm_campaign ?? r.origem ?? "",
    ]);
    const csv = [header, ...rows]
      .map((r) => r.map((v) => `"${String(v).replace(/"/g, '""')}"`).join(";"))
      .join("\n");
    const url = URL.createObjectURL(new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" }));
    const a = document.createElement("a");
    a.href = url;
    a.download = `lista-influenciadores-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (!unlocked) {
    return (
      <div className="min-h-screen bg-arena text-white flex items-center justify-center px-4">
        <SEOHead title="Lista de influenciadores | Bella Figurinha" description="Acesso restrito." noindex />
        <form onSubmit={entrar} className="w-full max-w-sm rounded-2xl bg-ink-soft/70 p-8 holo-border space-y-4">
          <div className="flex items-center gap-2 text-electric">
            <Lock size={18} />
            <h1 className="font-display text-2xl tracking-wider uppercase">Lista de presença</h1>
          </div>
          <p className="font-body text-sm text-white/60">Digite a senha para ver quem confirmou presença.</p>
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

  const presentes = rsvps.filter((r) => r.attended).length;

  return (
    <div className="min-h-screen bg-arena text-white">
      <SEOHead title="Lista de influenciadores | Bella Figurinha" description="Acesso restrito." noindex />
      <div className="container mx-auto px-4 py-10">
        <h1 className="font-display text-4xl tracking-wider uppercase">Evento de influenciadores · 27/09</h1>

        <div className="grid sm:grid-cols-3 gap-4 mt-6">
          <div className="rounded-2xl bg-ink-soft/70 p-5 holo-border">
            <p className="font-body text-xs uppercase tracking-widest text-white/50">Confirmados</p>
            <p className="font-display text-4xl text-electric">{rsvps.length}</p>
          </div>
          <div className="rounded-2xl bg-ink-soft/70 p-5 holo-border">
            <p className="font-body text-xs uppercase tracking-widest text-white/50">Compareceram</p>
            <p className="font-display text-4xl text-electric">{presentes}</p>
          </div>
          <div className="rounded-2xl bg-ink-soft/70 p-5 holo-border">
            <p className="font-body text-xs uppercase tracking-widest text-white/50">Aguardando</p>
            <p className="font-display text-4xl text-electric">{rsvps.length - presentes}</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-3 mt-8">
          <div className="flex items-center gap-2 flex-1 min-w-[240px] rounded-xl bg-ink border border-white/15 px-4">
            <Search size={18} className="text-white/40" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar por nome, @, telefone ou e-mail"
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
                <th className="px-4 py-3">Instagram</th>
                <th className="px-4 py-3">WhatsApp</th>
                <th className="px-4 py-3">E-mail</th>
                <th className="px-4 py-3">Confirmou em</th>
                <th className="px-4 py-3">Check-in</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-4 py-10 text-center text-white/50">Nenhuma confirmação ainda.</td>
                </tr>
              )}
              {filtered.map((r) => (
                <tr key={r.id} className="border-t border-white/5">
                  <td className="px-4 py-3">{r.nome}</td>
                  <td className="px-4 py-3">
                    <a
                      href={`https://instagram.com/${r.instagram}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-electric hover:underline"
                    >
                      @{r.instagram}
                    </a>
                  </td>
                  <td className="px-4 py-3">{maskPhone(r.whatsapp)}</td>
                  <td className="px-4 py-3 text-white/60">{r.email}</td>
                  <td className="px-4 py-3 text-white/60">{new Date(r.created_at).toLocaleDateString("pt-BR")}</td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => toggleAttended(r)}
                      className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-display tracking-widest uppercase ${
                        r.attended ? "bg-electric text-ink" : "border border-white/20 text-white/70"
                      }`}
                    >
                      <CheckCircle2 size={14} />
                      {r.attended ? "Presente" : "Marcar"}
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

export default ListaInfluenciadores;
