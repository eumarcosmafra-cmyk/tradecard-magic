CREATE TABLE public.influencer_rsvps (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  nome text NOT NULL,
  instagram text NOT NULL,
  whatsapp text NOT NULL,
  email text NOT NULL,
  consent_accepted boolean NOT NULL DEFAULT true,
  attended boolean NOT NULL DEFAULT false,
  attended_at timestamptz,
  origem text,
  landing_path text,
  referrer text,
  utm_source text,
  utm_medium text,
  utm_campaign text,
  utm_content text,
  utm_term text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE UNIQUE INDEX influencer_rsvps_email_key ON public.influencer_rsvps (lower(email));
CREATE UNIQUE INDEX influencer_rsvps_instagram_key ON public.influencer_rsvps (lower(instagram));

GRANT SELECT, UPDATE ON public.influencer_rsvps TO authenticated;
GRANT ALL ON public.influencer_rsvps TO service_role;

ALTER TABLE public.influencer_rsvps ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can view influencer rsvps"
ON public.influencer_rsvps FOR SELECT TO authenticated
USING (private.has_role(auth.uid(), 'admin'::app_role) OR private.has_role(auth.uid(), 'staff'::app_role));

CREATE POLICY "Admins can update influencer rsvps"
ON public.influencer_rsvps FOR UPDATE TO authenticated
USING (private.has_role(auth.uid(), 'admin'::app_role) OR private.has_role(auth.uid(), 'staff'::app_role))
WITH CHECK (private.has_role(auth.uid(), 'admin'::app_role) OR private.has_role(auth.uid(), 'staff'::app_role));

CREATE TRIGGER update_influencer_rsvps_updated_at
BEFORE UPDATE ON public.influencer_rsvps
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();