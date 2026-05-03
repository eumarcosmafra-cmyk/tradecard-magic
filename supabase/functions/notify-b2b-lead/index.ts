import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { lead_id } = await req.json();
    if (!lead_id) {
      return new Response(JSON.stringify({ error: "lead_id required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    const { data: lead, error } = await supabase
      .from("leads_b2b")
      .select("*")
      .eq("id", lead_id)
      .single();

    if (error || !lead) {
      console.error("Lead not found", error);
      return new Response(JSON.stringify({ error: "lead not found" }), {
        status: 404,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const createdAt = new Date(lead.created_at);
    const dataFmt = createdAt.toLocaleString("pt-BR", {
      timeZone: "America/Sao_Paulo",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
    const [data, hora] = dataFmt.split(" ");

    const phoneDigits = (lead.telefone || "").replace(/\D/g, "");
    const waLink = phoneDigits ? `https://wa.me/55${phoneDigits}` : "";

    const text =
      `🚨 *NOVO LEAD REVENDA*\n\n` +
      `*Nome:* ${lead.nome}\n` +
      `*Email:* ${lead.email}\n` +
      `*Telefone:* ${lead.telefone}\n\n` +
      `*Volume de interesse:* ${lead.volume_interesse}\n` +
      `*CNPJ:* ${lead.cnpj}\n` +
      `*CEP:* ${lead.cep}\n` +
      `*Endereço:* ${lead.endereco_completo}\n` +
      (lead.observacoes ? `\n*Observações:* ${lead.observacoes}\n` : "") +
      `\n*Cadastro em:* ${data} às ${hora}` +
      (waLink ? `\n\n👉 ${waLink}` : "");

    const apiUrl = Deno.env.get("EVOLUTION_API_URL")!;
    const apiKey = Deno.env.get("EVOLUTION_API_KEY")!;
    const groupId = Deno.env.get("EVOLUTION_WHATSAPP_GROUP")!;

    const res = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: apiKey,
      },
      body: JSON.stringify({ number: groupId, text }),
    });

    const respText = await res.text();
    console.log("Evolution response", res.status, respText);

    if (!res.ok) {
      return new Response(JSON.stringify({ error: "evolution failed", details: respText }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    await supabase
      .from("leads_b2b")
      .update({ sent_to_whatsapp: true })
      .eq("id", lead_id);

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("notify-b2b-lead error", e);
    return new Response(JSON.stringify({ error: String(e) }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
