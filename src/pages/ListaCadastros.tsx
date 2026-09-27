import { useCallback, useEffect, useMemo, useState } from "react";
import { Download, Loader2, Lock, Search, CheckCircle2, UserPlus, Undo2, X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { SEOHead } from "@/components/SEOHead";
import { SortableTh, SortState, nextSort, sortRows } from "@/components/SortableTh";
import { isValidCpf, maskCpf, maskPhone, onlyDigits } from "@/lib/cpf";

const LIMITE = 3;

type Lead = {
  id: string; nome: string; cpf: string; whatsapp: string | null; email: string | null;
  created_at: string; origem: string | null; utm_campaign: string | null;
  pre_cadastro: boolean; promo_redeemed: boolean; redeemed_at: string | null; redeem_code: string | null;
  usados: number; ultima_retirada: string | null;
};
type Retirada = { id: string; quantidade: number; status: string; atendente: string | null; created_at: string; estorno_motivo: string | null; estornado_em: string | null };
type Cliente = { lead: Lead; retiradas: Retirada[] };
type SortKey = "nome" | "cpf" | "whatsapp" | "pre" | "usados" | "disp" | "ultima";

const fmt = (d: string) => new Date(d).toLocaleString("pt-BR", { day: "2-digit", month: "2-digit", hour: "2-digit", minute: "2-digit" });
const usadosDe = (c: Cliente) => c.retiradas.filter((r) => r.status === "confirmada").reduce((s, r) => s + r.quantidade, 0);

const ListaCadastros = () => {
  const [senha, setSenha] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(false);
  const [tab, setTab] = useState<"controle" | "lista">("controle");
  const [atendente, setAtendente] = useState(() => localStorage.getItem("bella_atendente") ?? "");

  const call = useCallback(async (body: Record<string, unknown>) => {
    const { data, error } = await supabase.functions.invoke("leads-lista", { body: { senha, atendente, ...body } });
    const d = data as Record<string, unknown> | null;
    if (d?.error) return { error: String(d.error) };
    if (error) {
      let msg = "Falha na comunicação.";
      try { msg = (await (error as { context?: Response }).context?.json())?.error ?? msg; } catch { /* */ }
      return { error: msg };
    }
    return d ?? {};
  }, [senha, atendente]);

  useEffect(() => { localStorage.setItem("bella_atendente", atendente); }, [atendente]);

  const entrar = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); setErro("");
    const r = await call({});
    setLoading(false);
    if ("error" in r) setErro("Senha incorreta.");
    else setUnlocked(true);
  };

  if (!unlocked) {
    return (
      <div className="min-h-screen bg-arena text-white flex items-center justify-center px-4">
        <SEOHead title="Controle de retirada | Bella Figurinha" description="Acesso restrito." noindex />
        <form onSubmit={entrar} className="w-full max-w-sm rounded-2xl bg-ink-soft/70 p-8 holo-border space-y-4">
          <div className="flex items-center gap-2 text-electric"><Lock size={18} />
            <h1 className="font-display text-2xl tracking-wider uppercase">Controle de retirada</h1></div>
          <input type="password" value={senha} onChange={(e) => setSenha(e.target.value)} placeholder="Senha"
            className="w-full rounded-xl bg-ink border border-white/15 px-4 py-3 font-body text-white outline-none" />
          {erro && <p className="font-body text-sm text-red-400">{erro}</p>}
          <button type="submit" disabled={loading || !senha}
            className="w-full bg-gradient-electric text-ink font-display tracking-widest uppercase py-3 rounded-xl disabled:opacity-50">
            {loading ? <Loader2 className="animate-spin mx-auto" size={18} /> : "Entrar"}
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-arena text-white">
      <SEOHead title="Controle de retirada | Bella Figurinha" description="Acesso restrito." noindex />
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-wrap items-center gap-3 justify-between">
          <div className="flex gap-2">
            {(["controle", "lista"] as const).map((t) => (
              <button key={t} onClick={() => setTab(t)}
                className={`font-display tracking-widest uppercase px-5 py-2 rounded-xl ${tab === t ? "bg-gradient-electric text-ink" : "border border-white/20 text-white/70"}`}>
                {t === "controle" ? "Controle de retirada" : "Lista geral"}
              </button>
            ))}
          </div>
          <input value={atendente} onChange={(e) => setAtendente(e.target.value)} placeholder="Seu nome (atendente)"
            className="rounded-xl bg-ink border border-white/15 px-4 py-2 font-body text-sm outline-none w-56" />
        </div>
        {tab === "controle" ? <Controle call={call} atendente={atendente} /> : <Lista call={call} />}
      </div>
    </div>
  );
};

type Call = (b: Record<string, unknown>) => Promise<Record<string, unknown>>;

function Controle({ call, atendente }: { call: Call; atendente: string }) {
  const [cpf, setCpf] = useState("");
  const [busy, setBusy] = useState(false);
  const [erro, setErro] = useState("");
  const [cliente, setCliente] = useState<Cliente | null>(null);
  const [naoEncontrado, setNaoEncontrado] = useState(false);
  const [nome, setNome] = useState("");
  const [whats, setWhats] = useState("");
  const [confirmar, setConfirmar] = useState<number | null>(null);
  const [sucesso, setSucesso] = useState("");
  const [estorno, setEstorno] = useState<Retirada | null>(null);

  const reset = () => { setCliente(null); setNaoEncontrado(false); setErro(""); setSucesso(""); setConfirmar(null); };

  const buscar = async (e?: React.FormEvent) => {
    e?.preventDefault(); reset();
    if (!isValidCpf(cpf)) { setErro("CPF inválido. Confira os números digitados."); return; }
    setBusy(true);
    const r = await call({ action: "buscar", cpf: onlyDigits(cpf) });
    setBusy(false);
    if ("error" in r) return setErro(String(r.error));
    if (r.cliente) setCliente(r.cliente as Cliente); else setNaoEncontrado(true);
  };

  const cadastrar = async (e: React.FormEvent) => {
    e.preventDefault(); setErro("");
    if (nome.trim().length < 2) return setErro("Informe o nome.");
    setBusy(true);
    const r = await call({ action: "cadastrar", cpf: onlyDigits(cpf), nome, whatsapp: whats });
    setBusy(false);
    if ("error" in r) return setErro(String(r.error));
    setNaoEncontrado(false); setCliente(r.cliente as Cliente); setNome(""); setWhats("");
  };

  const retirar = async () => {
    if (!cliente || !confirmar) return;
    setBusy(true); setErro("");
    const r = await call({ action: "retirar", lead_id: cliente.lead.id, quantidade: confirmar });
    setBusy(false); setConfirmar(null);
    if ("error" in r) return setErro(String(r.error));
    const c = r.cliente as Cliente;
    setCliente(c); setSucesso(`RETIRADA REGISTRADA — ${usadosDe(c)} DE ${LIMITE} UTILIZADOS`);
  };

  const usados = cliente ? usadosDe(cliente) : 0;
  const saldo = LIMITE - usados;
  const cor = saldo <= 0 ? "bg-red-600" : saldo === 1 ? "bg-yellow-400 text-ink" : "bg-green-600";

  return (
    <div className="max-w-2xl mx-auto mt-8 space-y-6">
      <form onSubmit={buscar} className="flex gap-3">
        <input value={cpf} onChange={(e) => { setCpf(maskCpf(e.target.value)); reset(); }} inputMode="numeric" autoFocus
          placeholder="Digite o CPF do cliente"
          className="flex-1 rounded-2xl bg-ink border-2 border-white/20 px-5 py-5 font-display text-3xl tracking-wider outline-none focus:border-electric" />
        <button disabled={busy} className="bg-gradient-electric text-ink font-display text-xl tracking-widest uppercase px-6 rounded-2xl disabled:opacity-50">
          {busy ? <Loader2 className="animate-spin" /> : <span className="flex items-center gap-2"><Search size={20} />Buscar CPF</span>}
        </button>
      </form>
      {erro && <p className="rounded-xl bg-red-600/20 border border-red-500 px-4 py-3 font-body">{erro}</p>}

      {naoEncontrado && (
        <form onSubmit={cadastrar} className="rounded-2xl bg-ink-soft/80 p-6 holo-border space-y-3">
          <p className="font-display text-2xl uppercase">CPF não encontrado na base</p>
          <p className="font-body text-white/70">Este cliente não fazia parte da lista de pré-cadastro e não possui o desconto de 20%. Pode comprar normalmente até 3 produtos.</p>
          <input value={nome} onChange={(e) => setNome(e.target.value)} placeholder="Nome" autoFocus
            className="w-full rounded-xl bg-ink border border-white/15 px-4 py-3 font-body outline-none" />
          <input value={whats} onChange={(e) => setWhats(maskPhone(e.target.value))} placeholder="WhatsApp (opcional)" inputMode="numeric"
            className="w-full rounded-xl bg-ink border border-white/15 px-4 py-3 font-body outline-none" />
          <button disabled={busy} className="w-full inline-flex justify-center items-center gap-2 bg-gradient-electric text-ink font-display text-xl tracking-widest uppercase py-3 rounded-xl">
            <UserPlus size={20} /> Cadastrar cliente
          </button>
        </form>
      )}

      {cliente && (
        <div className="rounded-2xl bg-ink-soft/80 p-6 holo-border space-y-5">
          <div>
            <p className="font-display text-3xl uppercase">{cliente.lead.nome}</p>
            <p className="font-body text-white/60">CPF {maskCpf(cliente.lead.cpf)}</p>
          </div>
          <div className={`rounded-xl px-4 py-2 inline-block font-display tracking-widest uppercase border-2 ${cliente.lead.pre_cadastro ? "border-electric text-electric" : "border-white/30 text-white/60"}`}>
            {cliente.lead.pre_cadastro ? "✓ 20% pré-cadastro — tem direito ao desconto" : "Sem pré-cadastro — não possui o desconto de 20%"}
          </div>
          <div className={`rounded-2xl p-6 text-center ${cor}`}>
            <p className="font-display text-4xl md:text-5xl uppercase leading-tight">
              {saldo <= 0 ? "Limite esgotado — não realizar nova venda" : `Este CPF ainda pode levar ${saldo} produto${saldo > 1 ? "s" : ""}`}
            </p>
            <p className="font-body mt-2 opacity-90">{usados} de {LIMITE} utilizados</p>
          </div>
          {sucesso && <p className="flex items-center gap-2 font-display text-2xl text-green-400"><CheckCircle2 /> {sucesso}</p>}
          {saldo > 0 && (
            <div>
              <p className="font-body text-white/70 mb-2">Quantos produtos o cliente está levando agora?</p>
              <div className="grid grid-cols-3 gap-3">
                {[1, 2, 3].map((n) => (
                  <button key={n} disabled={n > saldo || busy} onClick={() => { setSucesso(""); setConfirmar(n); }}
                    className="font-display text-2xl uppercase py-5 rounded-xl bg-gradient-electric text-ink disabled:opacity-20 disabled:cursor-not-allowed">
                    {n} produto{n > 1 ? "s" : ""}
                  </button>
                ))}
              </div>
            </div>
          )}
          {cliente.retiradas.length > 0 && (
            <div>
              <p className="font-body text-xs uppercase tracking-widest text-white/50 mb-2">Histórico</p>
              <ul className="space-y-1 font-body text-sm">
                {cliente.retiradas.map((r) => (
                  <li key={r.id} className={`flex items-center justify-between gap-2 ${r.status === "estornada" ? "text-white/40 line-through" : ""}`}>
                    <span>{fmt(r.created_at)} — {r.quantidade} produto{r.quantidade > 1 ? "s" : ""}{r.atendente ? ` · ${r.atendente}` : ""}
                      {r.status === "estornada" && <span className="no-underline"> (estornada: {r.estorno_motivo})</span>}</span>
                    {r.status === "confirmada" && (
                      <button onClick={() => setEstorno(r)} className="text-xs text-white/50 hover:text-red-400 inline-flex items-center gap-1"><Undo2 size={12} />Estornar</button>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {confirmar && cliente && (
        <Modal onClose={() => setConfirmar(null)}>
          <p className="font-display text-3xl uppercase mb-4">Confirmar retirada?</p>
          <dl className="font-body space-y-1 mb-6">
            <div>CPF: <b>{maskCpf(cliente.lead.cpf)}</b></div>
            <div>Cliente: <b>{cliente.lead.nome}</b></div>
            <div>Quantidade nesta retirada: <b>{confirmar}</b></div>
            <div>Já utilizados anteriormente: <b>{usados}</b></div>
            <div>Total após esta operação: <b>{usados + confirmar} de {LIMITE}</b></div>
            <div>Saldo após esta operação: <b>{LIMITE - usados - confirmar}</b></div>
          </dl>
          <div className="grid grid-cols-2 gap-3">
            <button onClick={() => setConfirmar(null)} className="border border-white/30 rounded-xl py-3 font-display tracking-widest uppercase">Cancelar</button>
            <button onClick={retirar} disabled={busy} className="bg-green-600 rounded-xl py-3 font-display tracking-widest uppercase">
              {busy ? <Loader2 className="animate-spin mx-auto" /> : "Confirmar retirada"}</button>
          </div>
        </Modal>
      )}

      {estorno && (
        <EstornoModal r={estorno} call={call} atendente={atendente} onClose={() => setEstorno(null)}
          onDone={() => { setEstorno(null); buscar(); }} />
      )}
    </div>
  );
}

function EstornoModal({ r, call, onClose, onDone }: { r: Retirada; call: Call; atendente: string; onClose: () => void; onDone: () => void }) {
  const [admin, setAdmin] = useState("");
  const [motivo, setMotivo] = useState("");
  const [erro, setErro] = useState("");
  const [busy, setBusy] = useState(false);
  const go = async () => {
    setBusy(true); setErro("");
    const res = await call({ action: "estornar", retirada_id: r.id, admin_senha: admin, motivo });
    setBusy(false);
    if ("error" in res) setErro(String(res.error)); else onDone();
  };
  return (
    <Modal onClose={onClose}>
      <p className="font-display text-2xl uppercase mb-2">Estornar retirada</p>
      <p className="font-body text-white/70 mb-4">{fmt(r.created_at)} — {r.quantidade} produto(s). Somente administrador.</p>
      <input type="password" value={admin} onChange={(e) => setAdmin(e.target.value)} placeholder="Senha de administrador"
        className="w-full rounded-xl bg-ink border border-white/15 px-4 py-3 font-body outline-none mb-3" />
      <input value={motivo} onChange={(e) => setMotivo(e.target.value)} placeholder="Motivo do estorno"
        className="w-full rounded-xl bg-ink border border-white/15 px-4 py-3 font-body outline-none mb-3" />
      {erro && <p className="text-red-400 font-body text-sm mb-3">{erro}</p>}
      <button onClick={go} disabled={busy || !admin || motivo.trim().length < 3} className="w-full bg-red-600 rounded-xl py-3 font-display tracking-widest uppercase disabled:opacity-50">
        {busy ? <Loader2 className="animate-spin mx-auto" /> : "Estornar"}</button>
    </Modal>
  );
}

function Modal({ children, onClose }: { children: React.ReactNode; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center px-4" onClick={onClose}>
      <div className="relative w-full max-w-md rounded-2xl bg-ink p-6 holo-border text-white" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-3 right-3 text-white/50"><X size={18} /></button>
        {children}
      </div>
    </div>
  );
}

function Lista({ call }: { call: Call }) {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<SortState<SortKey>>(null);

  useEffect(() => {
    call({}).then((r) => { setLeads(((r as { leads?: Lead[] }).leads) ?? []); setLoading(false); });
  }, [call]);

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    const d = onlyDigits(q);
    const f = !q ? leads : leads.filter((l) => l.nome.toLowerCase().includes(q) || (d && (l.cpf.includes(d) || (l.whatsapp ?? "").includes(d))));
    return sortRows(f, sort, (l, k) => ({
      nome: l.nome.toLowerCase(), cpf: l.cpf, whatsapp: l.whatsapp ?? "", pre: l.pre_cadastro ? 1 : 0,
      usados: l.usados, disp: LIMITE - l.usados, ultima: l.ultima_retirada ?? "",
    })[k]);
  }, [leads, query, sort]);

  const totalProdutos = leads.reduce((s, l) => s + l.usados, 0);
  const cards = [
    ["CPFs cadastrados", leads.length], ["Clientes do pré-cadastro", leads.filter((l) => l.pre_cadastro).length],
    ["Produtos retirados", totalProdutos], ["CPFs que atingiram 3/3", leads.filter((l) => l.usados >= LIMITE).length],
  ] as const;

  const exportCsv = () => {
    const header = ["nome", "cpf", "whatsapp", "email", "pre_cadastro", "utilizados", "disponiveis", "ultima_retirada", "cadastro", "origem", "promo_utilizada_antiga", "codigo"];
    const data = rows.map((l) => [l.nome, l.cpf, l.whatsapp ?? "", l.email ?? "", l.pre_cadastro ? "sim" : "não", l.usados, LIMITE - l.usados,
      l.ultima_retirada ? new Date(l.ultima_retirada).toLocaleString("pt-BR") : "", new Date(l.created_at).toLocaleString("pt-BR"),
      l.utm_campaign || l.origem || "", l.promo_redeemed ? "sim" : "não", l.redeem_code ?? ""]);
    const csv = [header, ...data].map((r) => r.map((v) => `"${String(v).replace(/"/g, '""')}"`).join(";")).join("\n");
    const url = URL.createObjectURL(new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" }));
    const a = document.createElement("a"); a.href = url; a.download = `controle-retirada-${new Date().toISOString().slice(0, 10)}.csv`; a.click();
    URL.revokeObjectURL(url);
  };

  const onSort = (k: SortKey) => setSort((s) => nextSort(s, k));

  return (
    <div className="mt-8">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {cards.map(([l, v]) => (
          <div key={l} className="rounded-2xl bg-ink-soft/70 p-5 holo-border">
            <p className="font-body text-xs uppercase tracking-widest text-white/50">{l}</p>
            <p className="font-display text-4xl text-electric">{loading ? "…" : v}</p>
          </div>
        ))}
      </div>
      <div className="flex flex-wrap gap-3 mt-6">
        <div className="flex items-center gap-2 flex-1 min-w-[240px] rounded-xl bg-ink border border-white/15 px-4">
          <Search size={18} className="text-white/40" />
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Buscar por CPF, nome ou telefone"
            className="flex-1 bg-transparent py-3 text-white outline-none font-body text-sm" />
        </div>
        <button onClick={exportCsv} className="inline-flex items-center gap-2 bg-gradient-electric text-ink font-display tracking-widest uppercase px-5 rounded-xl">
          <Download size={18} /> Exportar CSV</button>
      </div>
      <div className="mt-6 overflow-x-auto rounded-2xl border border-white/10">
        <table className="w-full text-sm font-body">
          <thead className="bg-ink-soft/80 text-white/60 text-left">
            <tr>
              <SortableTh label="Nome" k="nome" sort={sort} onSort={onSort} />
              <SortableTh label="CPF" k="cpf" sort={sort} onSort={onSort} />
              <SortableTh label="WhatsApp" k="whatsapp" sort={sort} onSort={onSort} />
              <SortableTh label="Pré-cadastro" k="pre" sort={sort} onSort={onSort} />
              <SortableTh label="Utilizados" k="usados" sort={sort} onSort={onSort} />
              <SortableTh label="Disponíveis" k="disp" sort={sort} onSort={onSort} />
              <SortableTh label="Última retirada" k="ultima" sort={sort} onSort={onSort} />
            </tr>
          </thead>
          <tbody>
            {loading && <tr><td colSpan={7} className="px-4 py-10 text-center"><Loader2 className="animate-spin mx-auto" /></td></tr>}
            {!loading && rows.length === 0 && <tr><td colSpan={7} className="px-4 py-10 text-center text-white/50">Nenhum cliente encontrado.</td></tr>}
            {rows.map((l) => {
              const disp = LIMITE - l.usados;
              return (
                <tr key={l.id} className="border-t border-white/5">
                  <td className="px-4 py-3">{l.nome}</td>
                  <td className="px-4 py-3">{maskCpf(l.cpf)}</td>
                  <td className="px-4 py-3">{l.whatsapp ? maskPhone(l.whatsapp) : "—"}</td>
                  <td className="px-4 py-3">{l.pre_cadastro ? <span className="text-electric font-display tracking-wider">✓ 20%</span> : <span className="text-white/50">Não</span>}</td>
                  <td className="px-4 py-3">{l.usados}/{LIMITE}</td>
                  <td className="px-4 py-3"><span className={`inline-block min-w-8 text-center rounded-full px-2 font-display ${disp <= 0 ? "bg-red-600" : disp === 1 ? "bg-yellow-400 text-ink" : "bg-green-600"}`}>{disp}</span></td>
                  <td className="px-4 py-3 text-white/60">{l.ultima_retirada ? fmt(l.ultima_retirada) : "—"}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ListaCadastros;
