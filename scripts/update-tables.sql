-- Drop unnecessary tables
DROP TABLE IF EXISTS contributions CASCADE;
DROP TABLE IF EXISTS contact_messages CASCADE;
DROP TABLE IF EXISTS user_likes CASCADE;
DROP TABLE IF EXISTS users CASCADE;

-- Update music table with tags
ALTER TABLE music 
ADD COLUMN IF NOT EXISTS tags TEXT[] DEFAULT '{}',
ADD COLUMN IF NOT EXISTS featured_section VARCHAR(100);

-- Update tattoos table with tags  
ALTER TABLE tattoos
ADD COLUMN IF NOT EXISTS tags TEXT[] DEFAULT '{}',
ADD COLUMN IF NOT EXISTS featured_section VARCHAR(100);

-- Update news table with tags
ALTER TABLE news
ADD COLUMN IF NOT EXISTS tags TEXT[] DEFAULT '{}',
ADD COLUMN IF NOT EXISTS featured_section VARCHAR(100);

-- Remove foreign key constraints
ALTER TABLE music DROP COLUMN IF EXISTS created_by;
ALTER TABLE tattoos DROP COLUMN IF EXISTS created_by;
ALTER TABLE news DROP COLUMN IF EXISTS created_by;

-- Create indexes for tags and featured sections
CREATE INDEX IF NOT EXISTS idx_music_tags ON music USING GIN(tags);
CREATE INDEX IF NOT EXISTS idx_music_featured_section ON music(featured_section);
CREATE INDEX IF NOT EXISTS idx_tattoos_tags ON tattoos USING GIN(tags);
CREATE INDEX IF NOT EXISTS idx_tattoos_featured_section ON tattoos(featured_section);
CREATE INDEX IF NOT EXISTS idx_news_tags ON news USING GIN(tags);
CREATE INDEX IF NOT EXISTS idx_news_featured_section ON news(featured_section);

-- Update existing data with sample tags
UPDATE music SET 
  tags = CASE 
    WHEN genre = 'Pop' THEN ARRAY['pop', 'mainstream', 'radio-hit']
    WHEN genre = 'Dance Pop' THEN ARRAY['dance', 'pop', 'electronic']
    WHEN genre = 'Pop Rock' THEN ARRAY['pop', 'rock', 'alternative']
    WHEN genre = 'Indie Pop' THEN ARRAY['indie', 'pop', 'alternative']
    WHEN genre = 'Hip Hop' THEN ARRAY['hip-hop', 'rap', 'urban']
    ELSE ARRAY['music']
  END,
  featured_section = CASE 
    WHEN is_featured = true THEN 'hero'
    ELSE NULL
  END;

UPDATE tattoos SET 
  tags = CASE 
    WHEN style = 'Traditional Japanese' THEN ARRAY['traditional', 'japanese', 'cultural']
    WHEN style = 'Geometric' THEN ARRAY['geometric', 'modern', 'abstract']
    WHEN style = 'Realism' THEN ARRAY['realistic', 'portrait', 'detailed']
    WHEN style = 'Watercolor' THEN ARRAY['watercolor', 'artistic', 'colorful']
    WHEN style = 'Minimalist' THEN ARRAY['minimalist', 'simple', 'clean']
    WHEN style = 'Tribal' THEN ARRAY['tribal', 'traditional', 'cultural']
    ELSE ARRAY['tattoo']
  END,
  featured_section = CASE 
    WHEN is_featured = true THEN 'gallery'
    ELSE NULL
  END;

UPDATE news SET 
  tags = CASE 
    WHEN category = 'Platform' THEN ARRAY['platform', 'updates', 'technology']
    WHEN category = 'Artists' THEN ARRAY['artists', 'spotlight', 'community']
    WHEN category = 'Events' THEN ARRAY['events', 'exhibition', 'community']
    ELSE ARRAY['news']
  END,
  featured_section = CASE 
    WHEN is_featured = true THEN 'latest'
    ELSE NULL
  END;
