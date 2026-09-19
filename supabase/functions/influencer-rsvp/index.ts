import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors';
import { createClient } from 'npm:@supabase/supabase-js@2';

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

  try {
    const payload = await req.json().catch(() => null);
    if (!payload || typeof payload !== 'object') return json({ error: 'Dados inválidos.' }, 400);

    const nome = String(payload.nome ?? '').trim();
    const instagram = String(payload.instagram ?? '').trim().replace(/^@+/, '').toLowerCase();
    const whatsapp = String(payload.whatsapp ?? '').replace(/\D/g, '');
    const email = String(payload.email ?? '').trim().toLowerCase();
    const consent = payload.consent === true;

    const fieldErrors: Record<string, string> = {};
    if (nome.length < 3 || nome.length > 120) fieldErrors.nome = 'Informe seu nome completo.';
    if (!/^[a-z0-9._]{2,40}$/.test(instagram)) fieldErrors.instagram = 'Informe um @ válido.';
    if (whatsapp.length < 10 || whatsapp.length > 13) fieldErrors.whatsapp = 'WhatsApp inválido.';
    if (!isEmail(email) || email.length > 255) fieldErrors.email = 'E-mail inválido.';
    if (!consent) fieldErrors.consent = 'É preciso aceitar para confirmar.';
    if (Object.keys(fieldErrors).length > 0) return json({ error: 'validation', fieldErrors }, 400);

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
      { auth: { persistSession: false } },
    );

    const clip = (v: unknown, max = 255) =>
      typeof v === 'string' && v.trim() ? v.trim().slice(0, max) : null;

    const { error } = await supabase.from('influencer_rsvps').insert({
      nome: nome.slice(0, 120),
      instagram,
      whatsapp,
      email,
      consent_accepted: true,
      origem: clip(payload.origem, 80) ?? 'convite-influenciadores',
      landing_path: clip(payload.landingPath, 300),
      referrer: clip(payload.referrer, 300),
      utm_source: clip(payload.utm_source, 120),
      utm_medium: clip(payload.utm_medium, 120),
      utm_campaign: clip(payload.utm_campaign, 120),
      utm_content: clip(payload.utm_content, 120),
      utm_term: clip(payload.utm_term, 120),
    });

    if (error) {
      if (error.code === '23505') return json({ status: 'already_registered' });
      console.error('influencer-rsvp insert failed:', error.message);
      return json({ error: 'Não foi possível confirmar agora.' }, 500);
    }

    return json({ status: 'created' });
  } catch (err) {
    console.error('influencer-rsvp error:', err);
    return json({ error: 'Erro inesperado.' }, 500);
  }
});
