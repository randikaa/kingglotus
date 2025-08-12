"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useApiMutation } from "../hooks/useApi"

interface MusicFormData {
  title: string
  artist: string
  genre: string
  description: string
  image_url: string
  spotify_url: string
  youtube_url: string
  tags: string
  is_featured: boolean
}

export default function AddMusicForm() {
  const [formData, setFormData] = useState<MusicFormData>({
    title: "",
    artist: "",
    genre: "",
    description: "",
    image_url: "",
    spotify_url: "",
    youtube_url: "",
    tags: "",
    is_featured: false,
  })

  const { mutate, loading, error } = useApiMutation()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const dataToSubmit = {
        ...formData,
        tags: formData.tags.split(",").map(tag => tag.trim()).filter(tag => tag),
      }

      await mutate("/api/music", {
        method: "POST",
        body: JSON.stringify(dataToSubmit),
      })

      // Reset form on success
      setFormData({
        title: "",
        artist: "",
        genre: "",
        description: "",
        image_url: "",
        spotify_url: "",
        youtube_url: "",
        tags: "",
        is_featured: false,
      })

      alert("Track added successfully!")
    } catch (err) {
      console.error("Error adding track:", err)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value
    }))
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
        Add New Music Track
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
              Track Title *
            </label>
            <Input
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter track title"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
              Artist *
            </label>
            <Input
              name="artist"
              value={formData.artist}
              onChange={handleChange}
              placeholder="Enter artist name"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
              Genre *
            </label>
            <Input
              name="genre"
              value={formData.genre}
              onChange={handleChange}
              placeholder="e.g., Pop, Rock, Hip-Hop"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
              Tags
            </label>
            <Input
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              placeholder="tag1, tag2, tag3"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
            Description
          </label>
          <Textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Brief description of the track"
            rows={3}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
            Album Cover URL
          </label>
          <Input
            name="image_url"
            value={formData.image_url}
            onChange={handleChange}
            placeholder="https://example.com/album-cover.jpg"
            type="url"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
              Spotify URL *
            </label>
            <Input
              name="spotify_url"
              value={formData.spotify_url}
              onChange={handleChange}
              placeholder="https://open.spotify.com/track/..."
              type="url"
              required
            />
            <p className="text-xs text-gray-500 mt-1">
              Get this from Spotify: Share → Copy link
            </p>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
              YouTube URL (Optional)
            </label>
            <Input
              name="youtube_url"
              value={formData.youtube_url}
              onChange={handleChange}
              placeholder="https://www.youtube.com/watch?v=..."
              type="url"
            />
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="is_featured"
            checked={formData.is_featured}
            onChange={handleChange}
            className="rounded"
          />
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Featured Track
          </label>
        </div>

        {error && (
          <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            Error: {error}
          </div>
        )}

        <Button 
          type="submit" 
          disabled={loading}
          className="w-full text-black bg-blue-500 hover:bg-blue-600 focus:bg-blue-700 font-medium py-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Adding Track..." : "Add Track"}
        </Button>
      </form>

      <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
        <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
          How to get Spotify URLs:
        </h3>
        <ol className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
          <li>1. Go to Spotify Web Player or Desktop App</li>
          <li>2. Find your track</li>
          <li>3. Click "..." menu → "Share" → "Copy link"</li>
          <li>4. Paste the URL in the Spotify URL field above</li>
        </ol>
      </div>
    </div>
  )
}
