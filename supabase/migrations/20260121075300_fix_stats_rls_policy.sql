-- Drop existing policy
DROP POLICY IF EXISTS "Anyone can view active stats" ON public.stats;

-- Create new policy that allows anonymous and authenticated users
CREATE POLICY "Anyone can view active stats"
ON public.stats
FOR SELECT
TO anon, authenticated
USING (is_active = true);
