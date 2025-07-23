-- Insert sample data

-- Insert sample users
INSERT INTO users (email, name, role) VALUES
('admin@luma.com', 'Admin User', 'admin'),
('john@example.com', 'John Doe', 'contributor'),
('sarah@example.com', 'Sarah Smith', 'user')
ON CONFLICT (email) DO NOTHING;

-- Insert sample music
INSERT INTO music (title, artist, album, genre, duration, image_url, spotify_url, plays, likes, is_featured) VALUES
('Blinding Lights', 'The Weeknd', 'After Hours', 'Pop', 200, '/placeholder.svg?height=300&width=300', 'https://open.spotify.com/track/0VjIjW4GlULA4LGoDOLVKN', 1200000, 45000, true),
('Levitating', 'Dua Lipa', 'Future Nostalgia', 'Dance Pop', 203, '/placeholder.svg?height=300&width=300', 'https://open.spotify.com/track/463CkQjx2Zk1yXoBuierM9', 980000, 32000, false),
('Good 4 U', 'Olivia Rodrigo', 'SOUR', 'Pop Rock', 178, '/placeholder.svg?height=300&width=300', 'https://open.spotify.com/track/4ZtFanR9U6ndgddUvNcjcG', 850000, 28000, false),
('Stay', 'The Kid LAROI & Justin Bieber', 'F*CK LOVE 3', 'Pop', 141, '/placeholder.svg?height=300&width=300', 'https://open.spotify.com/track/5PjdY0CKGZdEuoNab3yDmX', 1500000, 52000, true),
('Heat Waves', 'Glass Animals', 'Dreamland', 'Indie Pop', 238, '/placeholder.svg?height=300&width=300', 'https://open.spotify.com/track/02MWAaffLxlfxAUY7c5dvx', 720000, 19000, false),
('Industry Baby', 'Lil Nas X & Jack Harlow', 'MONTERO', 'Hip Hop', 212, '/placeholder.svg?height=300&width=300', 'https://open.spotify.com/track/27NovPIUIRrOZoCHxABJwK', 1100000, 38000, false);

-- Insert sample tattoos
INSERT INTO tattoos (title, artist, style, description, image_url, likes, views, is_featured) VALUES
('Dragon Sleeve', 'Mike Chen', 'Traditional Japanese', 'Intricate dragon design with traditional Japanese elements and vibrant colors.', '/placeholder.svg?height=400&width=300', 245, 1200, true),
('Geometric Mandala', 'Sarah Johnson', 'Geometric', 'Sacred geometry mandala with precise lines and symmetrical patterns.', '/placeholder.svg?height=400&width=300', 189, 890, false),
('Realistic Portrait', 'David Rodriguez', 'Realism', 'Photorealistic portrait tattoo with incredible detail and shading.', '/placeholder.svg?height=400&width=300', 312, 1500, true),
('Watercolor Phoenix', 'Emma Thompson', 'Watercolor', 'Vibrant watercolor phoenix with flowing colors and artistic brush strokes.', '/placeholder.svg?height=400&width=300', 156, 750, false),
('Minimalist Line Art', 'Alex Kim', 'Minimalist', 'Clean, minimalist design with simple lines and elegant composition.', '/placeholder.svg?height=400&width=300', 98, 420, false),
('Tribal Polynesian', 'Kai Nakamura', 'Tribal', 'Traditional Polynesian tribal design with cultural significance and bold patterns.', '/placeholder.svg?height=400&width=300', 203, 980, false);

-- Insert sample news
INSERT INTO news (title, excerpt, content, image_url, category, author, is_featured) VALUES
('New Music Platform Launch', 'We''re excited to announce the launch of our new music streaming platform with enhanced features.', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', '/placeholder.svg?height=300&width=500', 'Platform', 'Admin Team', true),
('Artist Spotlight: Rising Stars', 'Discover the talented artists who are making waves in the music industry.', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', '/placeholder.svg?height=300&width=500', 'Artists', 'Music Team', false),
('Tattoo Art Exhibition', 'Join us for an exclusive tattoo art exhibition featuring works from renowned artists.', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', '/placeholder.svg?height=300&width=500', 'Events', 'Art Team', false),
('Platform Updates and New Features', 'Check out the latest updates and new features we''ve added to improve your experience.', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', '/placeholder.svg?height=300&width=500', 'Platform', 'Development Team', false);

-- Insert sample contributions
INSERT INTO contributions (name, email, mobile, category, amount, currency, status) VALUES
('John Doe', 'john@example.com', '+1-555-0123', 'Music', 250.00, 'USD', 'completed'),
('Sarah Smith', 'sarah@example.com', '+1-555-0124', 'Tattoo', 100.00, 'USD', 'completed'),
('Mike Johnson', 'mike@example.com', '+1-555-0125', 'Movies', 500.00, 'USD', 'completed'),
('Emily Davis', 'emily@example.com', '+1-555-0126', 'Music', 75.00, 'USD', 'pending'),
('Alex Wilson', 'alex@example.com', '+1-555-0127', 'Tattoo', 150.00, 'USD', 'completed');

-- Insert sample contact messages
INSERT INTO contact_messages (name, email, subject, message, status) VALUES
('Jane Smith', 'jane@example.com', 'Collaboration Inquiry', 'Hi, I''m interested in collaborating with your platform. Could we schedule a call?', 'unread'),
('Bob Wilson', 'bob@example.com', 'Technical Issue', 'I''m experiencing some issues with the music player. Can you help?', 'read'),
('Alice Brown', 'alice@example.com', 'Feature Request', 'Would it be possible to add a dark mode to the platform?', 'replied');
