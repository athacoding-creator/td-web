-- Add speaker and event_date columns to programs table
ALTER TABLE programs 
ADD COLUMN speaker TEXT,
ADD COLUMN event_date TEXT;

-- Add comment for documentation
COMMENT ON COLUMN programs.speaker IS 'Nama pengisi acara/ustadz untuk program';
COMMENT ON COLUMN programs.event_date IS 'Tanggal acara dalam format DD/MM atau teks bebas';
