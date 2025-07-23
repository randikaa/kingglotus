"use client"

import { motion } from "framer-motion"
import { Heart, Share2, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import Navigation from "../../components/Navigation"
import { useTranslation } from "../../contexts/TranslationContext"
import { useTheme } from "../../contexts/ThemeContext"

const tattooData = [
  {
    id: "1",
    title: "Dragon Sleeve",
    artist: "Mike Chen",
    style: "traditional",
    image: "/placeholder.svg?height=400&width=300",
    likes: 245,
    views: "1.2K",
    description: "Intricate dragon design with traditional Japanese elements and vibrant colors.",
  },
  {
    id: "2",
    title: "Geometric Mandala",
    artist: "Sarah Johnson",
    style: "geometric",
    image: "/placeholder.svg?height=400&width=300",
    likes: 189,
    views: "890",
    description: "Sacred geometry mandala with precise lines and symmetrical patterns.",
  },
  {
    id: "3",
    title: "Realistic Portrait",
    artist: "David Rodriguez",
    style: "realism",
    image: "/placeholder.svg?height=400&width=300",
    likes: 312,
    views: "1.5K",
    description: "Photorealistic portrait tattoo with incredible detail and shading.",
  },
  {
    id: "4",
    title: "Watercolor Phoenix",
    artist: "Emma Thompson",
    style: "watercolor",
    image: "/placeholder.svg?height=400&width=300",
    likes: 156,
    views: "750",
    description: "Vibrant watercolor phoenix with flowing colors and artistic brush strokes.",
  },
  {
    id: "5",
    title: "Minimalist Line Art",
    artist: "Alex Kim",
    style: "minimalist",
    image: "/placeholder.svg?height=400&width=300",
    likes: 98,
    views: "420",
    description: "Clean, minimalist design with simple lines and elegant composition.",
  },
  {
    id: "6",
    title: "Tribal Polynesian",
    artist: "Kai Nakamura",
    style: "tribal",
    image: "/placeholder.svg?height=400&width=300",
    likes: 203,
    views: "980",
    description: "Traditional Polynesian tribal design with cultural significance and bold patterns.",
  },
]

export default function TattooPage() {
  const { t } = useTranslation()
  const { theme } = useTheme()

  const styles = ["all", "traditional", "geometric", "realism", "watercolor", "minimalist", "tribal"]

  return (
    <div
      className={`min-h-screen transition-colors ${theme === "dark" ? "bg-[#141414] text-white" : "bg-gray-50 text-gray-900"}`}
    >
      <Navigation />

      <div className="pt-24 px-8">
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
              {t("tattooGallery")}
            </h1>
            <p
              className={`text-lg max-w-3xl mx-auto transition-colors ${theme === "dark" ? "text-white/60" : "text-gray-600"}`}
            >
              {t("tattooDescription")}
            </p>
          </motion.div>

          {/* Style Filter */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-3 mb-12"
          >
            {styles.map((style) => (
              <Button
                key={style}
                variant="outline"
                className={`transition-colors ${
                  theme === "dark"
                    ? "bg-transparent border-white/20 text-white hover:bg-white/10 hover:border-white/40"
                    : "bg-transparent border-gray-300 text-gray-700 hover:bg-gray-100 hover:border-gray-400"
                }`}
              >
                {t(style)}
              </Button>
            ))}
          </motion.div>

          {/* Tattoo Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tattooData.map((tattoo, index) => (
              <motion.div
                key={tattoo.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className={`group backdrop-blur-sm rounded-2xl overflow-hidden transition-all duration-300 border ${
                  theme === "dark"
                    ? "bg-gradient-to-br from-white/10 to-white/5 hover:from-white/15 hover:to-white/10 border-white/10"
                    : "bg-white hover:bg-gray-50 border-gray-200 shadow-lg hover:shadow-xl"
                }`}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={tattoo.image || "/placeholder.svg"}
                    alt={tattoo.title}
                    className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute top-4 right-4 flex space-x-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      className="bg-black/40 backdrop-blur-sm text-white hover:bg-black/60"
                    >
                      <Heart size={16} />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="bg-black/40 backdrop-blur-sm text-white hover:bg-black/60"
                    >
                      <Share2 size={16} />
                    </Button>
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <div>
                    <h3
                      className={`text-xl font-semibold mb-2 transition-colors ${theme === "dark" ? "text-white" : "text-gray-900"}`}
                    >
                      {tattoo.title}
                    </h3>
                    <p
                      className={`text-sm mb-1 transition-colors ${theme === "dark" ? "text-white/60" : "text-gray-600"}`}
                    >
                      {t("by")} {tattoo.artist}
                    </p>
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs transition-colors ${
                        theme === "dark" ? "bg-white/10 text-white/80" : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {t(tattoo.style)}
                    </span>
                  </div>

                  <p
                    className={`text-sm leading-relaxed transition-colors ${theme === "dark" ? "text-white/70" : "text-gray-600"}`}
                  >
                    {tattoo.description}
                  </p>

                  <div
                    className={`flex items-center justify-between pt-4 border-t transition-colors ${theme === "dark" ? "border-white/10" : "border-gray-200"}`}
                  >
                    <div
                      className={`flex items-center space-x-4 text-sm transition-colors ${theme === "dark" ? "text-white/60" : "text-gray-600"}`}
                    >
                      <div className="flex items-center space-x-1">
                        <Heart size={14} />
                        <span>
                          {tattoo.likes} {t("likes")}
                        </span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Eye size={14} />
                        <span>
                          {tattoo.views} {t("views")}
                        </span>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      className={`border transition-colors ${
                        theme === "dark"
                          ? "bg-white/10 hover:bg-white/20 text-white border-white/20"
                          : "bg-gray-100 hover:bg-gray-200 text-gray-900 border-gray-300"
                      }`}
                    >
                      {t("viewDetails")}
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Load More */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-center mt-12"
          >
            <Button
              size="lg"
              className={`px-8 py-3 border rounded-full transition-colors ${
                theme === "dark"
                  ? "bg-white/10 hover:bg-white/20 text-white border-white/20"
                  : "bg-gray-100 hover:bg-gray-200 text-gray-900 border-gray-300"
              }`}
            >
              {t("loadMoreTattoos")}
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
