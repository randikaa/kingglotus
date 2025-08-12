// Sample script to add music tracks with Spotify links
// Run this with: node scripts/add-sample-music.js

const sampleTracks = [
  {
    title: "Blinding Lights",
    artist: "The Weeknd",
    genre: "Pop",
    description: "Hit single from After Hours album",
    image_url: "https://i.scdn.co/image/ab67616d0000b273c02c2c0e0e5e8e8e8e8e8e8e",
    spotify_url: "https://open.spotify.com/track/0VjIjW4GlULA4LGoDOLVja",
    youtube_url: "https://www.youtube.com/watch?v=4NRXx6U8ABQ",
    tags: ["pop", "synthwave", "hit"],
    is_featured: true
  },
  {
    title: "Levitating",
    artist: "Dua Lipa",
    genre: "Pop",
    description: "Dance-pop anthem from Future Nostalgia",
    image_url: "https://i.scdn.co/image/ab67616d0000b273c02c2c0e0e5e8e8e8e8e8e8e",
    spotify_url: "https://open.spotify.com/track/463CkQjx2Zk1yXoBuierM9",
    youtube_url: "https://www.youtube.com/watch?v=TUVcZfQe-Kw",
    tags: ["pop", "dance", "disco"],
    is_featured: true
  },
  {
    title: "Good 4 U",
    artist: "Olivia Rodrigo",
    genre: "Pop Rock",
    description: "Pop-punk inspired track from SOUR",
    image_url: "https://i.scdn.co/image/ab67616d0000b273c02c2c0e0e5e8e8e8e8e8e8e",
    spotify_url: "https://open.spotify.com/track/4ZtFanR9U6ndgddUvNcjcG",
    youtube_url: "https://www.youtube.com/watch?v=gNi_6U5Pm_o",
    tags: ["pop", "rock", "alternative"],
    is_featured: false
  },
  {
    title: "Stay",
    artist: "The Kid LAROI & Justin Bieber",
    genre: "Pop",
    description: "Collaborative hit single",
    image_url: "https://i.scdn.co/image/ab67616d0000b273c02c2c0e0e5e8e8e8e8e8e8e",
    spotify_url: "https://open.spotify.com/track/5HCyWlXZPP0y6Gqq8TgA20",
    youtube_url: "https://www.youtube.com/watch?v=kTJczUoc26U",
    tags: ["pop", "collaboration"],
    is_featured: false
  },
  {
    title: "Heat Waves",
    artist: "Glass Animals",
    genre: "Indie Pop",
    description: "Dreamy indie pop hit",
    image_url: "https://i.scdn.co/image/ab67616d0000b273c02c2c0e0e5e8e8e8e8e8e8e",
    spotify_url: "https://open.spotify.com/track/02MWAaffLxlfxAUY7c5dvx",
    youtube_url: "https://www.youtube.com/watch?v=mRD0-GxqHVo",
    tags: ["indie", "alternative", "chill"],
    is_featured: true
  }
]

async function addSampleTracks() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
  
  console.log('Adding sample music tracks...')
  
  for (const track of sampleTracks) {
    try {
      const response = await fetch(`${baseUrl}/api/music`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(track)
      })
      
      if (response.ok) {
        const result = await response.json()
        console.log(`✅ Added: ${track.title} by ${track.artist}`)
      } else {
        const error = await response.text()
        console.log(`❌ Failed to add ${track.title}: ${error}`)
      }
    } catch (error) {
      console.log(`❌ Error adding ${track.title}:`, error.message)
    }
  }
  
  console.log('Finished adding sample tracks!')
}

// Run the script
addSampleTracks()
