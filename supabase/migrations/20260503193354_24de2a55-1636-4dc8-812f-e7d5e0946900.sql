
-- Add tracking column
ALTER TABLE public.leads_b2b 
ADD COLUMN sent_to_whatsapp boolean NOT NULL DEFAULT false;

-- Mark existing leads as already sent
UPDATE public.leads_b2b SET sent_to_whatsapp = true;

-- Enable pg_net for HTTP calls from triggers
CREATE EXTENSION IF NOT EXISTS pg_net WITH SCHEMA extensions;

-- Trigger function to invoke edge function
CREATE OR REPLACE FUNCTION public.notify_new_b2b_lead()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  PERFORM net.http_post(
    url := 'https://ovwaazzelmqpmuixknlh.supabase.co/functions/v1/notify-b2b-lead',
    headers := jsonb_build_object(
      'Content-Type', 'application/json'
    ),
    body := jsonb_build_object('lead_id', NEW.id)
  );
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_new_b2b_lead
AFTER INSERT ON public.leads_b2b
FOR EACH ROW
EXECUTE FUNCTION public.notify_new_b2b_lead();
