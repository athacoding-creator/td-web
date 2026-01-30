-- Add new columns to campaigns table for better campaign management

ALTER TABLE campaigns
ADD COLUMN IF NOT EXISTS collected_amount BIGINT DEFAULT 0,
ADD COLUMN IF NOT EXISTS target_amount BIGINT,
ADD COLUMN IF NOT EXISTS donor_count INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS end_date TIMESTAMP WITH TIME ZONE;

-- Update existing campaigns to use target_amount from target field
-- (assuming target field contains numeric values)

-- Add comment
COMMENT ON COLUMN campaigns.collected_amount IS 'Jumlah donasi yang sudah terkumpul (dalam rupiah)';
COMMENT ON COLUMN campaigns.target_amount IS 'Target donasi yang ingin dicapai (dalam rupiah)';
COMMENT ON COLUMN campaigns.donor_count IS 'Jumlah donatur yang sudah berdonasi';
COMMENT ON COLUMN campaigns.end_date IS 'Tanggal berakhirnya campaign';
