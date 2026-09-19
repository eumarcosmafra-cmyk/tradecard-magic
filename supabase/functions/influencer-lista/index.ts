import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors';
import { createClient } from 'npm:@supabase/supabase-js@2';

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
    const payload = await req.json().catch(() => null) as
      | { senha?: string; action?: string; id?: string; attended?: boolean }
      | null;

    const expected = Deno.env.get('LEADS_PASSWORD') ?? '';
    if (!payload?.senha || payload.senha !== expected) {
      return json({ error: 'Senha incorreta.' }, 401);
    }

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
    );

    if (payload.action === 'toggle' && payload.id) {
      const attended = !!payload.attended;
      const { error } = await supabase
        .from('influencer_rsvps')
        .update({ attended, attended_at: attended ? new Date().toISOString() : null })
        .eq('id', payload.id);
      if (error) return json({ error: error.message }, 400);
      return json({ ok: true });
    }

    const { data, error } = await supabase
      .from('influencer_rsvps')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(2000);

    if (error) return json({ error: error.message }, 400);
    return json({ rsvps: data ?? [] });
  } catch (_e) {
    return json({ error: 'Erro inesperado.' }, 500);
  }
});
