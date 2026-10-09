ALTER TABLE public.retiradas ADD COLUMN IF NOT EXISTS produto text NOT NULL DEFAULT 'geral';

CREATE OR REPLACE FUNCTION public.registrar_retirada_booster(_lead_id uuid, _atendente text)
RETURNS integer LANGUAGE plpgsql SECURITY DEFINER SET search_path TO 'public' AS $$
DECLARE usado int;
BEGIN
  PERFORM 1 FROM early_access_leads WHERE id = _lead_id FOR UPDATE;
  IF NOT FOUND THEN RAISE EXCEPTION 'Cliente não encontrado'; END IF;
  SELECT COALESCE(SUM(quantidade),0) INTO usado FROM retiradas WHERE lead_id=_lead_id AND status='confirmada' AND produto='booster';
  IF usado >= 1 THEN RAISE EXCEPTION 'Este CPF já retirou o Combo Booster. Limite: 1 por CPF.'; END IF;
  INSERT INTO retiradas(lead_id, quantidade, atendente, produto) VALUES (_lead_id, 1, _atendente, 'booster');
  RETURN 1;
END $$;

CREATE OR REPLACE FUNCTION public.registrar_retirada(_lead_id uuid, _qtd integer, _atendente text)
RETURNS integer LANGUAGE plpgsql SECURITY DEFINER SET search_path TO 'public' AS $$
DECLARE usado int;
BEGIN
  IF _qtd < 1 OR _qtd > 3 THEN RAISE EXCEPTION 'Quantidade inválida'; END IF;
  PERFORM 1 FROM early_access_leads WHERE id = _lead_id FOR UPDATE;
  IF NOT FOUND THEN RAISE EXCEPTION 'Cliente não encontrado'; END IF;
  SELECT COALESCE(SUM(quantidade),0) INTO usado FROM retiradas WHERE lead_id=_lead_id AND status='confirmada' AND produto='geral';
  IF usado + _qtd > 3 THEN
    RAISE EXCEPTION 'Este CPF possui apenas % produto(s) disponível(is). Limite máximo: 3 produtos por CPF.', 3-usado;
  END IF;
  INSERT INTO retiradas(lead_id, quantidade, atendente) VALUES (_lead_id, _qtd, _atendente);
  RETURN usado + _qtd;
END $$;

REVOKE EXECUTE ON FUNCTION public.registrar_retirada_booster(uuid, text) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.registrar_retirada_booster(uuid, text) TO service_role;