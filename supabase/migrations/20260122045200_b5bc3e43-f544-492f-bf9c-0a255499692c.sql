-- Create keep_alive_logs table
CREATE TABLE public.keep_alive_logs (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  status text NOT NULL DEFAULT 'success',
  message text,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.keep_alive_logs ENABLE ROW LEVEL SECURITY;

-- RLS policies for keep_alive_logs
CREATE POLICY "Admins can manage keep_alive_logs" 
ON public.keep_alive_logs 
FOR ALL 
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Anyone can insert keep_alive_logs" 
ON public.keep_alive_logs 
FOR INSERT 
WITH CHECK (true);

-- Create activity_logs table
CREATE TABLE public.activity_logs (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid,
  user_email text,
  action text NOT NULL,
  table_name text,
  record_id uuid,
  description text,
  metadata jsonb DEFAULT '{}'::jsonb,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.activity_logs ENABLE ROW LEVEL SECURITY;

-- RLS policies for activity_logs
CREATE POLICY "Admins can view activity_logs" 
ON public.activity_logs 
FOR SELECT 
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Anyone can insert activity_logs" 
ON public.activity_logs 
FOR INSERT 
WITH CHECK (true);

-- Create indexes for better performance
CREATE INDEX idx_keep_alive_logs_created_at ON public.keep_alive_logs(created_at DESC);
CREATE INDEX idx_activity_logs_created_at ON public.activity_logs(created_at DESC);
CREATE INDEX idx_activity_logs_action ON public.activity_logs(action);
CREATE INDEX idx_activity_logs_table_name ON public.activity_logs(table_name);