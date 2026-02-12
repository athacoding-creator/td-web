-- Fix RLS policy for contact_messages table
-- Drop existing policy if exists
DROP POLICY IF EXISTS "Anyone can insert contact messages" ON contact_messages;

-- Recreate policy with anon role explicitly
CREATE POLICY "Anyone can insert contact messages"
  ON contact_messages
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Ensure RLS is enabled
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
