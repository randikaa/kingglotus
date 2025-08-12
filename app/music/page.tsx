"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Play, Heart, Search, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Navigation from "../../components/Navigation"
import { useTranslation } from "../../contexts/TranslationContext"
import { useTheme } from "../../contexts/ThemeContext"
import Footer from "@/components/Footer"

export default function MusicPage() {
  const [musicData, setMusicData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedGenre, setSelectedGenre] = useState("All")
  const [likedSongs, setLikedSongs] = useState<string[]>([])
  const [playingTrackId, setPlayingTrackId] = useState<string | null>(null)
  const { t } = useTranslation()
  const { theme } = useTheme()

  useEffect(() => {
    async function fetchMusic() {
      setLoading(true)
      setError(false)
      try {
        const res = await fetch("/api/music") // Change to your API endpoint
        if (!res.ok) throw new Error("Failed to fetch")
        const data = await res.json()
        setMusicData(data)
        setLikedSongs(data.filter((song: any) => song.isLiked).map((song: any) => song.id))
      } catch (err) {
        setError(true)
      } finally {
        setLoading(false)
      }
    }
    fetchMusic()
  }, [])

  const genres = ["all", "pop", "dancePop", "popRock", "indiePop", "hipHop"]

  const filteredMusic = musicData.filter((song: any) => {
    const matchesSearch =
      song.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      song.artist.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesGenre = selectedGenre === "All" || song.genre === selectedGenre
    return matchesSearch && matchesGenre
  })

  const toggleLike = (songId: string) => {
    setLikedSongs((prev) => (prev.includes(songId) ? prev.filter((id) => id !== songId) : [...prev, songId]))
  }

  const handlePlayTrack = (track: any) => {
    setPlayingTrackId(prev => (prev === track.id ? null : track.id))
  }

  return (
    <div
      className={`min-h-screen transition-colors ${theme === "dark" ? "bg-[#141414] text-white" : "bg-gray-50 text-gray-900"}`}
    >
      <Navigation />

      <div className="pt-24 px-8 pb-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h1
              className={`text-6xl md:text-8xl font-light italic mb-6 transition-colors ${theme === "dark" ? "text-white/80" : "text-gray-800"}`}
            >
              {t("musicCollection")}
            </h1>
            <p
              className={`text-lg max-w-2xl mx-auto transition-colors ${theme === "dark" ? "text-white/60" : "text-gray-600"}`}
            >
              {t("exploreCurated")}
            </p>
          </motion.div>

          {/* Search and Filter */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col md:flex-row gap-4 mb-8"
          >
            <div className="relative flex-1">
              <Search
                className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${theme === "dark" ? "text-white/40" : "text-gray-400"}`}
                size={20}
              />
              <Input
                placeholder={t("searchSongs")}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`pl-10 transition-colors rounded-[10px] ${
                  theme === "dark"
                    ? "bg-white/10 border-white/20 text-white placeholder:text-white/40"
                    : "bg-white border-gray-300 text-gray-900 placeholder:text-gray-500"
                }`}
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              {genres.map((genre) => (
                <Button
                  key={genre}
                  variant={selectedGenre === t(genre) ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedGenre(t(genre))}
                  className={`transition-colors rounded-[10px] ${
                    selectedGenre === t(genre)
                      ? theme === "dark"
                        ? "bg-white text-black"
                        : "bg-gray-900 text-white"
                      : theme === "dark"
                        ? "bg-transparent border-white/20 text-white hover:bg-white/10"
                        : "bg-transparent border-gray-300 text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {t(genre)}
                </Button>
              ))}
            </div>
          </motion.div>

          {/* Loading/Error states */}
          {loading && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20">
              <p className={`text-lg transition-colors ${theme === "dark" ? "text-white/60" : "text-gray-600"}`}>
                Loading music...
              </p>
            </motion.div>
          )}
          {error && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20">
              <p className={`text-lg transition-colors ${theme === "dark" ? "text-red-400" : "text-red-600"}`}>
                Failed to load music. Please try again later.
              </p>
            </motion.div>
          )}

          {/* Music Grid */}
          {!loading && !error && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredMusic.map((song: any, index: number) => (
                <motion.div
                  key={song.id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -10, scale: 1.02 }}
                  className={`group backdrop-blur-sm rounded-2xl p-6 transition-all duration-300 border ${
                    theme === "dark"
                      ? "bg-gradient-to-br from-white/10 to-white/5 hover:from-white/15 hover:to-white/10 border-white/10"
                      : "bg-white hover:bg-gray-50 border-gray-200 shadow-lg hover:shadow-xl"
                  }`}
                >
                  <div className="relative mb-4">
                    <img
                      src={song.image || song.image_url || "/placeholder.svg"}
                      alt={song.album}
                      className="w-full aspect-square object-cover rounded-xl shadow-lg"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl flex items-center justify-center gap-2">
                      {song.spotify_url && (
                        <Button
                          size="lg"
                          className="rounded-full bg-green-500 hover:bg-green-600 text-white shadow-lg"
                          onClick={() => handlePlayTrack(song)}
                        >
                          <Play size={24} />
                        </Button>
                      )}
                      {song.spotify_url && (
                        <Button
                          size="lg"
                          className="rounded-full bg-black/50 hover:bg-black/70 text-white"
                          asChild
                        >
                          <a href={song.spotify_url} target="_blank" rel="noopener noreferrer">
                            <ExternalLink size={20} />
                          </a>
                        </Button>
                      )}
                    </div>
                  </div>

                  {/* Spotify Player Embed */}
                  {playingTrackId === song.id && song.spotify_url && (
                    <div className="mb-4">
                      <iframe
                        style={{ borderRadius: "12px" }}
                        src={`https://open.spotify.com/embed/track/${song.spotify_url.split("/").pop()?.split("?")[0]}`}
                        width="100%"
                        height="80"
                        frameBorder="0"
                        allow="autoplay; clipboard-write; encrypted-media; picture-in-picture"
                        loading="lazy"
                      ></iframe>
                    </div>
                  )}

                  <div className="space-y-3">
                    <div>
                      <h3
                        className={`text-xl font-semibold mb-1 truncate transition-colors ${theme === "dark" ? "text-white" : "text-gray-900"}`}
                      >
                        {song.title}
                      </h3>
                      <p className={`truncate transition-colors ${theme === "dark" ? "text-white/60" : "text-gray-600"}`}>
                        {song.artist}
                      </p>
                    </div>

                    <div
                      className={`flex items-center justify-between text-sm transition-colors ${theme === "dark" ? "text-white/40" : "text-gray-500"}`}
                    >
                      <span>{song.album}</span>
                      <span>{song.genre}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div
                        className={`flex items-center space-x-4 text-sm transition-colors ${theme === "dark" ? "text-white/60" : "text-gray-600"}`}
                      >
                        <span>{song.duration}</span>
                        <span>
                          {song.plays} {t("plays")}
                        </span>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleLike(song.id)}
                        className={`p-2 transition-colors ${
                          likedSongs.includes(song.id)
                            ? "text-red-500 hover:text-red-400"
                            : theme === "dark"
                              ? "text-white/60 hover:text-red-500"
                              : "text-gray-500 hover:text-red-500"
                        }`}
                      >
                        <Heart size={18} fill={likedSongs.includes(song.id) ? "currentColor" : "none"} />
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {!loading && !error && filteredMusic.length === 0 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20">
              <p className={`text-lg transition-colors ${theme === "dark" ? "text-white/60" : "text-gray-600"}`}>
                No music found matching your criteria.
              </p>
            </motion.div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  )}