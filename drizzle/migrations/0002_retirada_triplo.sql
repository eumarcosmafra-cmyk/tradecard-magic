CREATE OR REPLACE FUNCTION public.registrar_retirada_item(_lead_id uuid, _produto text, _atendente text)
RETURNS integer LANGUAGE plpgsql SECURITY DEFINER SET search_path TO 'public' AS $$
DECLARE usado int; nome_item text; limite int;
BEGIN
  nome_item := CASE _produto WHEN 'booster' THEN 'Combo Booster' WHEN 'etb' THEN 'ETB' WHEN 'fichario' THEN 'Fichário' WHEN 'triplo' THEN 'Triplo' ELSE NULL END;
  IF nome_item IS NULL THEN RAISE EXCEPTION 'Produto inválido'; END IF;
  limite := CASE _produto WHEN 'triplo' THEN 2 ELSE 1 END;
  PERFORM 1 FROM early_access_leads WHERE id = _lead_id FOR UPDATE;
  IF NOT FOUND THEN RAISE EXCEPTION 'Cliente não encontrado'; END IF;
  SELECT COALESCE(SUM(quantidade),0) INTO usado FROM retiradas WHERE lead_id=_lead_id AND status='confirmada' AND produto=_produto;
  IF usado >= limite THEN RAISE EXCEPTION 'Este CPF já retirou % %. Limite: % por CPF.', usado, nome_item, limite; END IF;
  INSERT INTO retiradas(lead_id, quantidade, atendente, produto) VALUES (_lead_id, 1, _atendente, _produto);
  RETURN 1;
END $$;
REVOKE EXECUTE ON FUNCTION public.registrar_retirada_item(uuid, text, text) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.registrar_retirada_item(uuid, text, text) TO service_role;