-- Create stats_config table for section configuration
CREATE TABLE public.stats_config (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  config_key text NOT NULL UNIQUE,
  title text,
  description text,
  metadata jsonb DEFAULT '{}'::jsonb,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.stats_config ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Anyone can view stats config" 
ON public.stats_config 
FOR SELECT 
USING (true);

CREATE POLICY "Admins can manage stats config" 
ON public.stats_config 
FOR ALL 
USING (has_role(auth.uid(), 'admin'::app_role));

-- Create trigger for updated_at
CREATE TRIGGER update_stats_config_updated_at
BEFORE UPDATE ON public.stats_config
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert default stats section title
INSERT INTO public.stats_config (config_key, title, description) 
VALUES ('stats_section', 'Rewind 2025', 'Judul section statistik di halaman utama');

-- Add SEO fields to articles table
ALTER TABLE public.articles 
ADD COLUMN IF NOT EXISTS meta_title text,
ADD COLUMN IF NOT EXISTS meta_description text,
ADD COLUMN IF NOT EXISTS meta_keywords text;