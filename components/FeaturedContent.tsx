"use client"

import { motion } from "framer-motion"
import { Play, Heart, Eye, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useContent, useContentMutation } from "../hooks/useContent"
import { useTranslation } from "../contexts/TranslationContext"
import { useTheme } from "../contexts/ThemeContext"
import type { Music, Tattoo, News } from "../lib/supabase"

export default function FeaturedContent() {
  const { data, loading, error } = useContent({ featured: true })
  const { performAction } = useContentMutation()
  const { t } = useTranslation()
  const { theme } = useTheme()

  if (loading) {
    return (
      <div className="py-20 px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="animate-pulse">Loading featured content...</div>
        </div>
      </div>
    )
  }

  if (error || !data) {
    return (
      <div className="py-20 px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="text-red-500">Error loading featured content</div>
        </div>
      </div>
    )
  }

  const featuredData = data as { music: Music[]; tattoos: Tattoo[]; news: News[] }

  const handlePlay = async (musicId: string) => {
    try {
      await performAction("music", musicId, "play")
    } catch (error) {
      console.error("Error playing music:", error)
    }
  }

  const handleLike = async (type: "music" | "tattoo", id: string, increment: boolean) => {
    try {
      await performAction(type, id, "like", { increment })
    } catch (error) {
      console.error("Error toggling like:", error)
    }
  }

  const handleView = async (tattooId: string) => {
    try {
      await performAction("tattoo", tattooId, "view")
    } catch (error) {
      console.error("Error incrementing views:", error)
    }
  }

  return (
    <section className="py-20 px-8">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Featured Music */}
        {featuredData.music && featuredData.music.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2
              className={`text-4xl md:text-6xl font-light italic mb-8 text-center transition-colors ${
                theme === "dark" ? "text-white/80" : "text-gray-800"
              }`}
            >
              Featured Music
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredData.music.map((song, index) => (
                <motion.div
                  key={song.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                  className={`group backdrop-blur-sm rounded-2xl p-4 transition-all duration-300 ${
                    theme === "dark"
                      ? "bg-white/5 hover:bg-white/10"
                      : "bg-white/80 hover:bg-white shadow-lg hover:shadow-xl"
                  }`}
                >
                  <div className="relative mb-4">
                    <img
                      src={song.image_url || "/placeholder.svg?height=200&width=200"}
                      alt={song.title}
                      className="w-full aspect-square object-cover rounded-xl"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl flex items-center justify-center">
                      <Button
                        size="sm"
                        onClick={() => handlePlay(song.id)}
                        className="rounded-full bg-green-500 hover:bg-green-600 text-white"
                      >
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
                    <div className="flex flex-wrap gap-1 mb-2">
                      {song.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className={`px-2 py-1 text-xs rounded-full transition-colors ${
                            theme === "dark" ? "bg-white/10 text-white/70" : "bg-gray-100 text-gray-600"
                          }`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center justify-between">
                      <span
                        className={`text-xs transition-colors ${theme === "dark" ? "text-white/40" : "text-gray-500"}`}
                      >
                        {song.plays.toLocaleString()} plays
                      </span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleLike("music", song.id, true)}
                        className={`p-1 transition-colors ${
                          theme === "dark" ? "text-white/60 hover:text-red-500" : "text-gray-500 hover:text-red-500"
                        }`}
                      >
                        <Heart size={14} />
                        <span className="ml-1 text-xs">{song.likes}</span>
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Featured Tattoos */}
        {featuredData.tattoos && featuredData.tattoos.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2
              className={`text-4xl md:text-6xl font-light italic mb-8 text-center transition-colors ${
                theme === "dark" ? "text-white/80" : "text-gray-800"
              }`}
            >
              Featured Tattoos
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredData.tattoos.map((tattoo, index) => (
                <motion.div
                  key={tattoo.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                  onClick={() => handleView(tattoo.id)}
                  className={`group backdrop-blur-sm rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 ${
                    theme === "dark"
                      ? "bg-white/5 hover:bg-white/10"
                      : "bg-white/80 hover:bg-white shadow-lg hover:shadow-xl"
                  }`}
                >
                  <div className="relative">
                    <img
                      src={tattoo.image_url || "/placeholder.svg"}
                      alt={tattoo.title}
                      className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 right-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleLike("tattoo", tattoo.id, true)
                        }}
                        className="bg-black/40 backdrop-blur-sm text-white hover:bg-black/60"
                      >
                        <Heart size={16} />
                      </Button>
                    </div>
                  </div>
                  <div className="p-4 space-y-2">
                    <h3
                      className={`font-semibold transition-colors ${theme === "dark" ? "text-white" : "text-gray-900"}`}
                    >
                      {tattoo.title}
                    </h3>
                    <p className={`text-sm transition-colors ${theme === "dark" ? "text-white/60" : "text-gray-600"}`}>
                      by {tattoo.artist}
                    </p>
                    <div className="flex flex-wrap gap-1 mb-2">
                      {tattoo.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className={`px-2 py-1 text-xs rounded-full transition-colors ${
                            theme === "dark" ? "bg-white/10 text-white/70" : "bg-gray-100 text-gray-600"
                          }`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-3">
                        <span className="flex items-center space-x-1">
                          <Heart size={14} />
                          <span>{tattoo.likes}</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <Eye size={14} />
                          <span>{tattoo.views}</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Featured News */}
        {featuredData.news && featuredData.news.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2
              className={`text-4xl md:text-6xl font-light italic mb-8 text-center transition-colors ${
                theme === "dark" ? "text-white/80" : "text-gray-800"
              }`}
            >
              Latest News
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {featuredData.news.map((article, index) => (
                <motion.article
                  key={article.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className={`group backdrop-blur-sm rounded-2xl overflow-hidden transition-all duration-300 ${
                    theme === "dark"
                      ? "bg-white/5 hover:bg-white/10"
                      : "bg-white/80 hover:bg-white shadow-lg hover:shadow-xl"
                  }`}
                >
                  <div className="relative">
                    <img
                      src={article.image_url || "/placeholder.svg?height=200&width=400"}
                      alt={article.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6 space-y-3">
                    <div className="flex items-center space-x-2 text-sm">
                      <Calendar size={14} />
                      <span className={`transition-colors ${theme === "dark" ? "text-white/60" : "text-gray-600"}`}>
                        {new Date(article.created_at).toLocaleDateString()}
                      </span>
                      <span
                        className={`px-2 py-1 rounded-full text-xs transition-colors ${
                          theme === "dark" ? "bg-white/10 text-white/70" : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {article.category}
                      </span>
                    </div>
                    <h3
                      className={`text-xl font-semibold transition-colors ${
                        theme === "dark" ? "text-white" : "text-gray-900"
                      }`}
                    >
                      {article.title}
                    </h3>
                    <p
                      className={`text-sm leading-relaxed transition-colors ${
                        theme === "dark" ? "text-white/70" : "text-gray-600"
                      }`}
                    >
                      {article.excerpt}
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {article.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className={`px-2 py-1 text-xs rounded-full transition-colors ${
                            theme === "dark" ? "bg-white/10 text-white/70" : "bg-gray-100 text-gray-600"
                          }`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  )
}
