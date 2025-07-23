-- Drop existing tables if they exist
DROP TABLE IF EXISTS user_likes CASCADE;
DROP TABLE IF EXISTS contact_messages CASCADE;
DROP TABLE IF EXISTS contributions CASCADE;
DROP TABLE IF EXISTS news CASCADE;
DROP TABLE IF EXISTS tattoos CASCADE;
DROP TABLE IF EXISTS music CASCADE;
DROP TABLE IF EXISTS users CASCADE;

-- Create users table
CREATE TABLE users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  role VARCHAR(50) DEFAULT 'user' CHECK (role IN ('admin', 'user', 'contributor')),
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create music table
CREATE TABLE music (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  artist VARCHAR(255) NOT NULL,
  album VARCHAR(255),
  genre VARCHAR(100),
  duration INTEGER,
  description TEXT,
  image_url TEXT,
  audio_url TEXT,
  spotify_url TEXT,
  youtube_url TEXT,
  tags TEXT[] DEFAULT '{}',
  plays INTEGER DEFAULT 0,
  likes INTEGER DEFAULT 0,
  is_featured BOOLEAN DEFAULT FALSE,
  featured_section VARCHAR(50),
  status VARCHAR(20) DEFAULT 'published' CHECK (status IN ('draft', 'published', 'archived')),
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create tattoos table
CREATE TABLE tattoos (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  artist VARCHAR(255) NOT NULL,
  style VARCHAR(100),
  description TEXT,
  image_url TEXT NOT NULL,
  tags TEXT[] DEFAULT '{}',
  likes INTEGER DEFAULT 0,
  views INTEGER DEFAULT 0,
  is_featured BOOLEAN DEFAULT FALSE,
  featured_section VARCHAR(50),
  status VARCHAR(20) DEFAULT 'published' CHECK (status IN ('draft', 'published', 'archived')),
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create news table
CREATE TABLE news (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  excerpt TEXT,
  content TEXT NOT NULL,
  image_url TEXT,
  category VARCHAR(100),
  author VARCHAR(255) NOT NULL,
  tags TEXT[] DEFAULT '{}',
  is_featured BOOLEAN DEFAULT FALSE,
  featured_section VARCHAR(50),
  status VARCHAR(20) DEFAULT 'published' CHECK (status IN ('draft', 'published', 'archived')),
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create contributions table
CREATE TABLE contributions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  mobile VARCHAR(50),
  category VARCHAR(100) NOT NULL,
  amount DECIMAL(10, 2) NOT NULL,
  currency VARCHAR(10) DEFAULT 'USD',
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed')),
  payment_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create contact messages table
CREATE TABLE contact_messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  subject VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  status VARCHAR(20) DEFAULT 'unread' CHECK (status IN ('unread', 'read', 'replied')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create user likes table
CREATE TABLE user_likes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  content_type VARCHAR(50) NOT NULL CHECK (content_type IN ('music', 'tattoo')),
  content_id UUID NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, content_type, content_id)
);

-- Create indexes for better performance
CREATE INDEX idx_music_genre ON music(genre);
CREATE INDEX idx_music_status ON music(status);
CREATE INDEX idx_music_featured ON music(is_featured);
CREATE INDEX idx_music_tags ON music USING GIN(tags);

CREATE INDEX idx_tattoos_style ON tattoos(style);
CREATE INDEX idx_tattoos_status ON tattoos(status);
CREATE INDEX idx_tattoos_featured ON tattoos(is_featured);
CREATE INDEX idx_tattoos_tags ON tattoos USING GIN(tags);

CREATE INDEX idx_news_category ON news(category);
CREATE INDEX idx_news_status ON news(status);
CREATE INDEX idx_news_featured ON news(is_featured);
CREATE INDEX idx_news_tags ON news USING GIN(tags);

CREATE INDEX idx_contributions_category ON contributions(category);
CREATE INDEX idx_contributions_status ON contributions(status);
CREATE INDEX idx_contact_status ON contact_messages(status);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_music_updated_at BEFORE UPDATE ON music FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_tattoos_updated_at BEFORE UPDATE ON tattoos FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_news_updated_at BEFORE UPDATE ON news FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_contributions_updated_at BEFORE UPDATE ON contributions FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_contact_messages_updated_at BEFORE UPDATE ON contact_messages FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert sample data
INSERT INTO music (title, artist, genre, description, image_url, tags, is_featured, featured_section) VALUES
('Blinding Lights', 'The Weeknd', 'Pop', 'Popular hit song', '/placeholder.svg?height=200&width=200', ARRAY['pop', 'hit', 'weekend'], true, 'hero'),
('Shape of You', 'Ed Sheeran', 'Pop', 'Chart-topping single', '/placeholder.svg?height=200&width=200', ARRAY['pop', 'acoustic'], false, null);

INSERT INTO tattoos (title, artist, style, description, image_url, tags, is_featured, featured_section) VALUES
('Dragon Sleeve', 'Mike Chen', 'Traditional Japanese', 'Beautiful dragon tattoo sleeve', '/placeholder.svg?height=300&width=200', ARRAY['dragon', 'japanese', 'sleeve'], true, 'gallery'),
('Geometric Wolf', 'Sarah Johnson', 'Geometric', 'Modern geometric wolf design', '/placeholder.svg?height=300&width=200', ARRAY['geometric', 'wolf', 'modern'], false, null);

INSERT INTO news (title, author, category, excerpt, content, image_url, tags, is_featured, featured_section) VALUES
('New Music Platform Launch', 'Admin Team', 'Platform', 'We are excited to announce our new platform', 'We are excited to announce the launch of our new music and art platform...', '/placeholder.svg?height=200&width=300', ARRAY['platform', 'launch', 'music'], true, 'latest'),
('Artist Spotlight: Local Talent', 'Music Editor', 'Artists', 'Featuring amazing local artists', 'This month we are featuring some incredible local talent...', '/placeholder.svg?height=200&width=300', ARRAY['artists', 'local', 'spotlight'], false, null);
