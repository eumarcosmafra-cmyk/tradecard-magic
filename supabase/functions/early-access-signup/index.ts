import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors';
import { createClient } from 'npm:@supabase/supabase-js@2';

function normalizeCpf(value: string): string {
  return (value || '').replace(/\D/g, '');
}

function isValidCpf(cpf: string): boolean {
  if (cpf.length !== 11) return false;
  if (/^(\d)\1{10}$/.test(cpf)) return false;
  let sum = 0;
  for (let i = 0; i < 9; i++) sum += parseInt(cpf[i], 10) * (10 - i);
  let d1 = (sum * 10) % 11;
  if (d1 === 10) d1 = 0;
  if (d1 !== parseInt(cpf[9], 10)) return false;
  sum = 0;
  for (let i = 0; i < 10; i++) sum += parseInt(cpf[i], 10) * (11 - i);
  let d2 = (sum * 10) % 11;
  if (d2 === 10) d2 = 0;
  return d2 === parseInt(cpf[10], 10);
}

const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  const json = (body: unknown, status = 200) =>
    new Response(JSON.stringify(body), {
      status,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  // Pré-lista encerrada em 25/09/2026 10:00 (Brasília).
  if (Date.now() >= new Date('2026-09-25T10:00:00-03:00').getTime()) {
    return json({ error: 'closed', message: 'Cadastros encerrados. O prazo da pré-lista terminou em 25/09.' }, 410);
  }

  try {
    const payload = await req.json().catch(() => null);
    if (!payload || typeof payload !== 'object') {
      return json({ error: 'Dados inválidos.' }, 400);
    }

    const nome = String(payload.nome ?? '').trim();
    const cpf = normalizeCpf(String(payload.cpf ?? ''));
    const whatsapp = String(payload.whatsapp ?? '').replace(/\D/g, '');
    const email = String(payload.email ?? '').trim().toLowerCase();
    const consent = payload.consent === true;

    const fieldErrors: Record<string, string> = {};
    if (nome.length < 3 || nome.length > 120 || !nome.includes(' ')) {
      fieldErrors.nome = 'Informe seu nome completo.';
    }
    if (!isValidCpf(cpf)) fieldErrors.cpf = 'CPF inválido.';
    if (whatsapp.length < 10 || whatsapp.length > 13) fieldErrors.whatsapp = 'WhatsApp inválido.';
    if (!isEmail(email) || email.length > 255) fieldErrors.email = 'E-mail inválido.';
    if (!consent) fieldErrors.consent = 'É preciso aceitar os termos.';

    if (Object.keys(fieldErrors).length > 0) {
      return json({ error: 'validation', fieldErrors }, 400);
    }

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
      { auth: { persistSession: false } },
    );

    const clip = (v: unknown, max = 255) =>
      typeof v === 'string' && v.trim() ? v.trim().slice(0, max) : null;

    const { error } = await supabase.from('early_access_leads').insert({
      nome: nome.slice(0, 120),
      cpf,
      whatsapp,
      email,
      consent_accepted: true,
      terms_version: clip(payload.termsVersion, 20) ?? 'v1',
      origem: clip(payload.origem, 80) ?? 'site',
      landing_path: clip(payload.landingPath, 300),
      referrer: clip(payload.referrer, 300),
      utm_source: clip(payload.utm_source, 120),
      utm_medium: clip(payload.utm_medium, 120),
      utm_campaign: clip(payload.utm_campaign, 120),
      utm_content: clip(payload.utm_content, 120),
      utm_term: clip(payload.utm_term, 120),
    });

    if (error) {
      if (error.code === '23505') {
        return json({ status: 'already_registered' });
      }
      console.error('early-access-signup insert failed:', error.message);
      return json({ error: 'Não foi possível concluir o cadastro.' }, 500);
    }

    return json({ status: 'created' });
  } catch (err) {
    console.error('early-access-signup error:', err);
    return json({ error: 'Erro inesperado.' }, 500);
  }
});
