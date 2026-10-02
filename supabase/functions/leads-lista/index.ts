import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors';
import { createClient } from 'npm:@supabase/supabase-js@2';

const digits = (v: unknown) => String(v ?? '').replace(/\D/g, '');

function validCpf(cpf: string) {
  if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false;
  const calc = (n: number) => {
    let s = 0;
    for (let i = 0; i < n; i++) s += +cpf[i] * (n + 1 - i);
    const d = (s * 10) % 11;
    return d === 10 ? 0 : d;
  };
  return calc(9) === +cpf[9] && calc(10) === +cpf[10];
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });

  const json = (body: unknown, status = 200) =>
    new Response(JSON.stringify(body), {
      status,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  try {
    const p = (await req.json().catch(() => null)) as Record<string, unknown> | null;
    const expected = Deno.env.get('LEADS_PASSWORD') ?? '';
    if (!p?.senha || p.senha !== expected) return json({ error: 'Senha incorreta.' }, 401);

    const sb = createClient(Deno.env.get('SUPABASE_URL') ?? '', Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '');
    const atendente = String(p.atendente ?? '').trim().slice(0, 60) || null;

    const buscar = async (cpf: string) => {
      const { data: lead } = await sb.from('early_access_leads').select('*').eq('cpf', cpf).maybeSingle();
      if (!lead) return null;
      const { data: hist } = await sb.from('retiradas').select('*').eq('lead_id', lead.id).order('created_at', { ascending: false });
      return { lead, retiradas: hist ?? [] };
    };

    switch (p.action) {
      case 'buscar': {
        const cpf = digits(p.cpf);
        if (!validCpf(cpf)) return json({ error: 'CPF inválido. Confira os números digitados.' }, 400);
        return json({ cliente: await buscar(cpf) });
      }
      case 'cadastrar': {
        const cpf = digits(p.cpf);
        const nome = String(p.nome ?? '').trim().slice(0, 120) || 'Cliente sem nome';
        const whatsapp = digits(p.whatsapp).slice(0, 11) || null;
        const instagram = String(p.instagram ?? '').trim().replace(/^@+/, '').replace(/\s/g, '').slice(0, 60) || null;
        if (!validCpf(cpf)) return json({ error: 'CPF inválido.' }, 400);
        const existing = await buscar(cpf);
        if (existing) return json({ cliente: existing });
        const { error } = await sb.from('early_access_leads').insert({
          cpf, nome, whatsapp, instagram, email: null, pre_cadastro: false, origem: 'quiosque',
          consent_accepted: true, terms_version: 'quiosque',
        });
        if (error && !error.message.includes('duplicate')) return json({ error: error.message }, 400);
        return json({ cliente: await buscar(cpf) });
      }
      case 'retirar': {
        const qtd = Number(p.quantidade);
        if (![1, 2, 3].includes(qtd) || typeof p.lead_id !== 'string') return json({ error: 'Dados inválidos.' }, 400);
        const { error } = await sb.rpc('registrar_retirada', { _lead_id: p.lead_id, _qtd: qtd, _atendente: atendente });
        if (error) return json({ error: error.message }, 409);
        const { data: lead } = await sb.from('early_access_leads').select('cpf').eq('id', p.lead_id).single();
        return json({ cliente: await buscar(lead!.cpf) });
      }
      case 'estornar': {
        const admin = Deno.env.get('ADMIN_PASSWORD') ?? '';
        if (!admin || p.admin_senha !== admin) return json({ error: 'Senha de administrador incorreta.' }, 403);
        const motivo = String(p.motivo ?? '').trim().slice(0, 300);
        if (motivo.length < 3) return json({ error: 'Informe o motivo.' }, 400);
        const { error } = await sb.rpc('estornar_retirada', { _id: p.retirada_id, _motivo: motivo, _por: atendente ?? 'admin' });
        if (error) return json({ error: error.message }, 400);
        return json({ ok: true });
      }
      default: {
        const [{ data: leads, error }, { data: rets }] = await Promise.all([
          sb.from('early_access_leads').select('id,nome,cpf,whatsapp,email,created_at,origem,utm_campaign,pre_cadastro,promo_redeemed,redeemed_at,redeem_code').order('created_at', { ascending: false }).limit(5000),
          sb.from('retiradas').select('lead_id,quantidade,created_at').eq('status', 'confirmada').limit(20000),
        ]);
        if (error) return json({ error: error.message }, 400);
        const agg = new Map<string, { usados: number; ultima: string | null }>();
        for (const r of rets ?? []) {
          const a = agg.get(r.lead_id) ?? { usados: 0, ultima: null };
          a.usados += r.quantidade;
          if (!a.ultima || r.created_at > a.ultima) a.ultima = r.created_at;
          agg.set(r.lead_id, a);
        }
        return json({
          leads: (leads ?? []).map((l) => ({ ...l, usados: agg.get(l.id)?.usados ?? 0, ultima_retirada: agg.get(l.id)?.ultima ?? null })),
        });
      }
    }
  } catch (_e) {
    return json({ error: 'Erro inesperado.' }, 500);
  }
});
