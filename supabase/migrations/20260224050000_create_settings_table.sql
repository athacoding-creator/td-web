-- Create settings table for app-wide configuration
CREATE TABLE IF NOT EXISTS settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key TEXT UNIQUE NOT NULL,
  value TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can read settings
CREATE POLICY "Anyone can read settings"
  ON settings
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- Policy: Only authenticated users can update settings
CREATE POLICY "Authenticated users can update settings"
  ON settings
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Policy: Only authenticated users can insert settings
CREATE POLICY "Authenticated users can insert settings"
  ON settings
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Insert default donation link
INSERT INTO settings (key, value, description)
VALUES (
  'donation_link',
  'https://sedekah.terasdakwah.com',
  'Link untuk button donasi di seluruh website'
)
ON CONFLICT (key) DO NOTHING;

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_settings_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER settings_updated_at
  BEFORE UPDATE ON settings
  FOR EACH ROW
  EXECUTE FUNCTION update_settings_updated_at();
