CREATE TABLE public.leads_b2b (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  nome TEXT NOT NULL,
  email TEXT NOT NULL,
  telefone TEXT NOT NULL,
  volume_interesse TEXT NOT NULL,
  cnpj TEXT NOT NULL,
  cep TEXT NOT NULL,
  endereco_completo TEXT NOT NULL,
  observacoes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.leads_b2b ENABLE ROW LEVEL SECURITY;

-- Anyone (including anonymous) can submit a B2B lead
CREATE POLICY "Anyone can submit B2B leads"
ON public.leads_b2b
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- No public read access — only backend/admin via service role can read leads
