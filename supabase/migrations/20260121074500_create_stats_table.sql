-- Create stats table for managing statistics section
CREATE TABLE public.stats (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    value INTEGER NOT NULL,
    label TEXT NOT NULL,
    display_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on stats
ALTER TABLE public.stats ENABLE ROW LEVEL SECURITY;

-- RLS policies for stats
CREATE POLICY "Anyone can view active stats"
ON public.stats
FOR SELECT
USING (is_active = true);

CREATE POLICY "Admins can manage stats"
ON public.stats
FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Add trigger for updated_at
CREATE TRIGGER update_stats_updated_at
    BEFORE UPDATE ON public.stats
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

-- Insert default stats data
INSERT INTO public.stats (title, value, label, display_order) VALUES
    ('Rewind 2025', 49200, 'Total Penerima Manfaat', 1),
    ('Rewind 2025', 280, 'Program Terlaksana', 2),
    ('Rewind 2025', 8456, 'Total Jamaah Kajian', 3);
