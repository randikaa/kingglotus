"use client"

import { motion } from "framer-motion"
import { Play, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTranslation } from "../contexts/TranslationContext"
import { useTheme } from "../contexts/ThemeContext"

const latestSongs = [
  {
    id: "1",
    title: "Midnight Dreams",
    artist: "Luna Eclipse",
    image: "/placeholder.svg?height=200&width=200",
    duration: "3:45",
  },
  {
    id: "2",
    title: "Electric Pulse",
    artist: "Neon Waves",
    image: "/placeholder.svg?height=200&width=200",
    duration: "4:12",
  },
  {
    id: "3",
    title: "Ocean Breeze",
    artist: "Coastal Vibes",
    image: "/placeholder.svg?height=200&width=200",
    duration: "3:28",
  },
  {
    id: "4",
    title: "Urban Nights",
    artist: "City Lights",
    image: "/placeholder.svg?height=200&width=200",
    duration: "4:01",
  },
]

export default function LatestMusic() {
  const { t } = useTranslation()
  const { theme } = useTheme()

  return (
    <section className="py-20 px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2
            className={`text-4xl md:text-6xl font-light italic mb-4 transition-colors ${
              theme === "dark" ? "text-white/80" : "text-gray-800"
            }`}
          >
            {t("latestMusic")}
          </h2>
          <p className={`max-w-2xl mx-auto transition-colors ${theme === "dark" ? "text-white/60" : "text-gray-600"}`}>
            {t("discoverTracks")}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {latestSongs.map((song, index) => (
            <motion.div
              key={song.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className={`group backdrop-blur-sm rounded-2xl p-4 transition-all duration-300 ${
                theme === "dark"
                  ? "bg-white/5 hover:bg-white/10"
                  : "bg-white/80 hover:bg-white shadow-lg hover:shadow-xl"
              }`}
            >
              <div className="relative mb-4">
                <img
                  src={song.image || "/placeholder.svg"}
                  alt={song.title}
                  className="w-full aspect-square object-cover rounded-xl"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl flex items-center justify-center">
                  <Button size="sm" className="rounded-full bg-green-500 hover:bg-green-600 text-white">
                    <Play size={16} />
                  </Button>
                </div>
              </div>
              <div className="space-y-2">
                <h3
                  className={`font-semibold truncate transition-colors ${
                    theme === "dark" ? "text-white" : "text-gray-900"
                  }`}
                >
                  {song.title}
                </h3>
                <p
                  className={`text-sm truncate transition-colors ${
                    theme === "dark" ? "text-white/60" : "text-gray-600"
                  }`}
                >
                  {song.artist}
                </p>
                <div className="flex items-center justify-between">
                  <span className={`text-xs transition-colors ${theme === "dark" ? "text-white/40" : "text-gray-500"}`}>
                    {song.duration}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    className={`p-1 transition-colors ${
                      theme === "dark" ? "text-white/60 hover:text-red-500" : "text-gray-500 hover:text-red-500"
                    }`}
                  >
                    <Heart size={14} />
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Button
            className={`px-8 py-3 border rounded-full transition-colors ${
              theme === "dark"
                ? "bg-white/10 hover:bg-white/20 text-white border-white/20"
                : "bg-gray-100 hover:bg-gray-200 text-gray-900 border-gray-300"
            }`}
          >
            {t("viewAllMusic")}
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
