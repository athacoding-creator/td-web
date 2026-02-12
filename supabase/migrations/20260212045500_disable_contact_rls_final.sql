-- Disable RLS for contact_messages (public contact form)
-- This table needs to accept submissions from anonymous users via public form
-- Data is not sensitive at submission time, only contains contact requests

-- Drop all policies first
DROP POLICY IF EXISTS "Allow anonymous insert on contact_messages" ON contact_messages;
DROP POLICY IF EXISTS "Allow authenticated insert on contact_messages" ON contact_messages;
DROP POLICY IF EXISTS "Authenticated users can view contact messages" ON contact_messages;
DROP POLICY IF EXISTS "Authenticated users can update contact messages" ON contact_messages;
DROP POLICY IF EXISTS "Anyone can insert contact messages" ON contact_messages;

-- Disable RLS permanently
ALTER TABLE contact_messages DISABLE ROW LEVEL SECURITY;

-- Note: Admin access control is handled at application level via auth
-- Only authenticated admin users can view/manage messages in admin panel
