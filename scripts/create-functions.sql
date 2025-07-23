-- Create database functions for common operations

-- Function to increment music plays
CREATE OR REPLACE FUNCTION increment_plays(music_id UUID)
RETURNS VOID AS $$
BEGIN
  UPDATE music 
  SET plays = plays + 1 
  WHERE id = music_id;
END;
$$ LANGUAGE plpgsql;

-- Function to increment tattoo views
CREATE OR REPLACE FUNCTION increment_views(tattoo_id UUID)
RETURNS VOID AS $$
BEGIN
  UPDATE tattoos 
  SET views = views + 1 
  WHERE id = tattoo_id;
END;
$$ LANGUAGE plpgsql;

-- Function to toggle music likes
CREATE OR REPLACE FUNCTION toggle_music_like(music_id UUID, increment_likes BOOLEAN)
RETURNS VOID AS $$
BEGIN
  IF increment_likes THEN
    UPDATE music SET likes = likes + 1 WHERE id = music_id;
  ELSE
    UPDATE music SET likes = GREATEST(likes - 1, 0) WHERE id = music_id;
  END IF;
END;
$$ LANGUAGE plpgsql;

-- Function to toggle tattoo likes
CREATE OR REPLACE FUNCTION toggle_tattoo_like(tattoo_id UUID, increment_likes BOOLEAN)
RETURNS VOID AS $$
BEGIN
  IF increment_likes THEN
    UPDATE tattoos SET likes = likes + 1 WHERE id = tattoo_id;
  ELSE
    UPDATE tattoos SET likes = GREATEST(likes - 1, 0) WHERE id = tattoo_id;
  END IF;
END;
$$ LANGUAGE plpgsql;

-- Function to get dashboard stats
CREATE OR REPLACE FUNCTION get_dashboard_stats()
RETURNS JSON AS $$
DECLARE
  result JSON;
BEGIN
  SELECT json_build_object(
    'total_music', (SELECT COUNT(*) FROM music WHERE status = 'published'),
    'total_tattoos', (SELECT COUNT(*) FROM tattoos WHERE status = 'published'),
    'total_news', (SELECT COUNT(*) FROM news WHERE status = 'published'),
    'total_contributions', (SELECT COUNT(*) FROM contributions WHERE status = 'completed'),
    'total_raised', (SELECT COALESCE(SUM(amount), 0) FROM contributions WHERE status = 'completed'),
    'unread_messages', (SELECT COUNT(*) FROM contact_messages WHERE status = 'unread')
  ) INTO result;
  
  RETURN result;
END;
$$ LANGUAGE plpgsql;
