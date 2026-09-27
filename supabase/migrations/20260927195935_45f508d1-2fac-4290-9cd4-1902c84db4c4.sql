ALTER TABLE public.early_access_leads ADD COLUMN IF NOT EXISTS pre_cadastro boolean NOT NULL DEFAULT true;
ALTER TABLE public.early_access_leads ALTER COLUMN email DROP NOT NULL;
ALTER TABLE public.early_access_leads ALTER COLUMN whatsapp DROP NOT NULL;
CREATE UNIQUE INDEX IF NOT EXISTS early_access_leads_cpf_unique ON public.early_access_leads (cpf);

CREATE TABLE public.retiradas (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id uuid NOT NULL REFERENCES public.early_access_leads(id) ON DELETE RESTRICT,
  quantidade int NOT NULL CHECK (quantidade BETWEEN 1 AND 3),
  status text NOT NULL DEFAULT 'confirmada' CHECK (status IN ('confirmada','estornada')),
  atendente text,
  estornado_em timestamptz,
  estornado_por text,
  estorno_motivo text,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT ALL ON public.retiradas TO service_role;
ALTER TABLE public.retiradas ENABLE ROW LEVEL SECURITY;
CREATE INDEX retiradas_lead_idx ON public.retiradas(lead_id);

CREATE OR REPLACE FUNCTION public.registrar_retirada(_lead_id uuid, _qtd int, _atendente text)
RETURNS int LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE usado int;
BEGIN
  IF _qtd < 1 OR _qtd > 3 THEN RAISE EXCEPTION 'Quantidade inválida'; END IF;
  PERFORM 1 FROM early_access_leads WHERE id = _lead_id FOR UPDATE;
  IF NOT FOUND THEN RAISE EXCEPTION 'Cliente não encontrado'; END IF;
  SELECT COALESCE(SUM(quantidade),0) INTO usado FROM retiradas WHERE lead_id=_lead_id AND status='confirmada';
  IF usado + _qtd > 3 THEN
    RAISE EXCEPTION 'Este CPF possui apenas % produto(s) disponível(is). Limite máximo: 3 produtos por CPF.', 3-usado;
  END IF;
  INSERT INTO retiradas(lead_id, quantidade, atendente) VALUES (_lead_id, _qtd, _atendente);
  RETURN usado + _qtd;
END $$;

CREATE OR REPLACE FUNCTION public.estornar_retirada(_id uuid, _motivo text, _por text)
RETURNS void LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  UPDATE retiradas SET status='estornada', estornado_em=now(), estorno_motivo=_motivo, estornado_por=_por
  WHERE id=_id AND status='confirmada';
  IF NOT FOUND THEN RAISE EXCEPTION 'Retirada não encontrada ou já estornada'; END IF;
END $$;

REVOKE ALL ON FUNCTION public.registrar_retirada(uuid,int,text) FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.estornar_retirada(uuid,text,text) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.registrar_retirada(uuid,int,text) TO service_role;
GRANT EXECUTE ON FUNCTION public.estornar_retirada(uuid,text,text) TO service_role;

INSERT INTO public.retiradas(lead_id, quantidade, atendente, created_at)
SELECT id, 1, 'migração (resgate antigo)', COALESCE(redeemed_at, updated_at)
FROM public.early_access_leads WHERE promo_redeemed = true;