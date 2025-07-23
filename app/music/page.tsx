"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Play, Heart, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Navigation from "../../components/Navigation"
import { useTranslation } from "../../contexts/TranslationContext"
import { useTheme } from "../../contexts/ThemeContext"
import Footer from "@/components/Footer"

const musicData = [
  {
    id: "1",
    title: "Blinding Lights",
    artist: "The Weeknd",
    album: "After Hours",
    genre: "Pop",
    duration: "3:20",
    image: "/placeholder.svg?height=300&width=300",
    plays: "1.2M",
    isLiked: false,
  },
  {
    id: "2",
    title: "Levitating",
    artist: "Dua Lipa",
    album: "Future Nostalgia",
    genre: "Dance Pop",
    duration: "3:23",
    image: "/placeholder.svg?height=300&width=300",
    plays: "980K",
    isLiked: true,
  },
  {
    id: "3",
    title: "Good 4 U",
    artist: "Olivia Rodrigo",
    album: "SOUR",
    genre: "Pop Rock",
    duration: "2:58",
    image: "/placeholder.svg?height=300&width=300",
    plays: "850K",
    isLiked: false,
  },
  {
    id: "4",
    title: "Stay",
    artist: "The Kid LAROI & Justin Bieber",
    album: "F*CK LOVE 3",
    genre: "Pop",
    duration: "2:21",
    image: "/placeholder.svg?height=300&width=300",
    plays: "1.5M",
    isLiked: true,
  },
  {
    id: "5",
    title: "Heat Waves",
    artist: "Glass Animals",
    album: "Dreamland",
    genre: "Indie Pop",
    duration: "3:58",
    image: "/placeholder.svg?height=300&width=300",
    plays: "720K",
    isLiked: false,
  },
  {
    id: "6",
    title: "Industry Baby",
    artist: "Lil Nas X & Jack Harlow",
    album: "MONTERO",
    genre: "Hip Hop",
    duration: "3:32",
    image: "/placeholder.svg?height=300&width=300",
    plays: "1.1M",
    isLiked: false,
  },
]

export default function MusicPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedGenre, setSelectedGenre] = useState("All")
  const [likedSongs, setLikedSongs] = useState<string[]>(
    musicData.filter((song) => song.isLiked).map((song) => song.id),
  )
  const { t } = useTranslation()
  const { theme } = useTheme()

  const genres = ["all", "pop", "dancePop", "popRock", "indiePop", "hipHop"]

  const filteredMusic = musicData.filter((song) => {
    const matchesSearch =
      song.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      song.artist.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesGenre = selectedGenre === "All" || song.genre === selectedGenre
    return matchesSearch && matchesGenre
  })

  const toggleLike = (songId: string) => {
    setLikedSongs((prev) => (prev.includes(songId) ? prev.filter((id) => id !== songId) : [...prev, songId]))
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
                className={`pl-10 transition-colors ${
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
                  className={`transition-colors ${
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

          {/* Music Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMusic.map((song, index) => (
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
                    src={song.image || "/placeholder.svg"}
                    alt={song.album}
                    className="w-full aspect-square object-cover rounded-xl shadow-lg"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl flex items-center justify-center">
                    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                      <Button size="lg" className="rounded-full bg-green-500 hover:bg-green-600 text-white shadow-lg">
                        <Play size={24} />
                      </Button>
                    </motion.div>
                  </div>
                </div>

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

          {filteredMusic.length === 0 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20">
              <p className={`text-lg transition-colors ${theme === "dark" ? "text-white/60" : "text-gray-600"}`}>
                No music found matching your criteria.
              </p>
            </motion.div>
          )}
        </div>
      </div>
       <Footer/>
    </div>
    
  )
}
