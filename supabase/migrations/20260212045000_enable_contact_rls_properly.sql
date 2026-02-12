-- Enable RLS back with proper policy for contact_messages
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- Drop existing policies first
DROP POLICY IF EXISTS "Allow anonymous insert on contact_messages" ON contact_messages;
DROP POLICY IF EXISTS "Allow authenticated insert on contact_messages" ON contact_messages;
DROP POLICY IF EXISTS "Authenticated users can view contact messages" ON contact_messages;
DROP POLICY IF EXISTS "Authenticated users can update contact messages" ON contact_messages;

-- Create policy for anonymous users to insert
CREATE POLICY "Allow anonymous insert on contact_messages"
  ON contact_messages
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Create policy for authenticated users to insert
CREATE POLICY "Allow authenticated insert on contact_messages"
  ON contact_messages
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Policy for authenticated users to view
CREATE POLICY "Authenticated users can view contact messages"
  ON contact_messages
  FOR SELECT
  TO authenticated
  USING (true);

-- Policy for authenticated users to update
CREATE POLICY "Authenticated users can update contact messages"
  ON contact_messages
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);
