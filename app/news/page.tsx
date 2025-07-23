"use client"

import { motion } from "framer-motion"
import { Calendar, User, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Navigation from "../../components/Navigation"
import { useTranslation } from "../../contexts/TranslationContext"
import { useTheme } from "../../contexts/ThemeContext"

const newsData = [
  {
    id: "1",
    title: "New Music Platform Launch",
    excerpt: "We're excited to announce the launch of our new music streaming platform with enhanced features.",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
    author: "Admin",
    date: "2024-01-20",
    image: "/placeholder.svg?height=300&width=500",
    category: "platform",
  },
  {
    id: "2",
    title: "Artist Spotlight: Rising Stars",
    excerpt: "Discover the talented artists who are making waves in the music industry.",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
    author: "Music Team",
    date: "2024-01-18",
    image: "/placeholder.svg?height=300&width=500",
    category: "artists",
  },
  {
    id: "3",
    title: "Tattoo Art Exhibition",
    excerpt: "Join us for an exclusive tattoo art exhibition featuring works from renowned artists.",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
    author: "Art Team",
    date: "2024-01-15",
    image: "/placeholder.svg?height=300&width=500",
    category: "events",
  },
]

export default function NewsPage() {
  const { t } = useTranslation()
  const { theme } = useTheme()

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
            className="text-center mb-16"
          >
            <h1
              className={`text-6xl md:text-8xl font-light italic mb-6 transition-colors ${theme === "dark" ? "text-white/80" : "text-gray-800"}`}
            >
              {t("latestNews")}
            </h1>
            <p
              className={`text-lg max-w-2xl mx-auto transition-colors ${theme === "dark" ? "text-white/60" : "text-gray-600"}`}
            >
              {t("newsDescription")}
            </p>
          </motion.div>

          {/* Featured Article */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-16"
          >
            <div
              className={`backdrop-blur-sm rounded-2xl overflow-hidden border transition-colors ${
                theme === "dark" ? "bg-white/5 border-white/10" : "bg-white border-gray-200 shadow-lg"
              }`}
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                <div className="relative h-64 lg:h-auto">
                  <img
                    src={newsData[0].image || "/placeholder.svg"}
                    alt={newsData[0].title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-green-500 text-white text-xs font-medium rounded-full">
                      {t("featured")}
                    </span>
                  </div>
                </div>
                <div className="p-8 flex flex-col justify-center">
                  <div
                    className={`flex items-center space-x-4 text-sm mb-4 transition-colors ${theme === "dark" ? "text-white/60" : "text-gray-600"}`}
                  >
                    <div className="flex items-center space-x-1">
                      <Calendar size={14} />
                      <span>{newsData[0].date}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <User size={14} />
                      <span>{newsData[0].author}</span>
                    </div>
                    <span
                      className={`px-2 py-1 rounded-full text-xs transition-colors ${
                        theme === "dark" ? "bg-white/10 text-white/80" : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {t(newsData[0].category)}
                    </span>
                  </div>
                  <h2
                    className={`text-3xl font-bold mb-4 transition-colors ${theme === "dark" ? "text-white" : "text-gray-900"}`}
                  >
                    {newsData[0].title}
                  </h2>
                  <p
                    className={`mb-6 leading-relaxed transition-colors ${theme === "dark" ? "text-white/70" : "text-gray-600"}`}
                  >
                    {newsData[0].excerpt}
                  </p>
                  <Button
                    className={`self-start transition-colors ${
                      theme === "dark"
                        ? "bg-white text-black hover:bg-white/90"
                        : "bg-gray-900 text-white hover:bg-gray-800"
                    }`}
                  >
                    {t("readMore")}
                    <ArrowRight className="ml-2" size={16} />
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* News Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {newsData.slice(1).map((article, index) => (
              <motion.article
                key={article.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: (index + 1) * 0.1 }}
                className={`group backdrop-blur-sm rounded-2xl overflow-hidden border transition-all duration-300 ${
                  theme === "dark"
                    ? "bg-white/5 hover:bg-white/10 border-white/10"
                    : "bg-white hover:bg-gray-50 border-gray-200 shadow-lg hover:shadow-xl"
                }`}
              >
                <div className="relative">
                  <img
                    src={article.image || "/placeholder.svg"}
                    alt={article.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-2 py-1 bg-black/60 backdrop-blur-sm text-white text-xs rounded-full">
                      {t(article.category)}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <div
                    className={`flex items-center space-x-4 text-sm mb-3 transition-colors ${theme === "dark" ? "text-white/60" : "text-gray-600"}`}
                  >
                    <div className="flex items-center space-x-1">
                      <Calendar size={14} />
                      <span>{article.date}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <User size={14} />
                      <span>{article.author}</span>
                    </div>
                  </div>

                  <h3
                    className={`text-xl font-semibold mb-3 group-hover:text-opacity-90 transition-colors ${theme === "dark" ? "text-white" : "text-gray-900"}`}
                  >
                    {article.title}
                  </h3>

                  <p
                    className={`text-sm leading-relaxed mb-4 transition-colors ${theme === "dark" ? "text-white/70" : "text-gray-600"}`}
                  >
                    {article.excerpt}
                  </p>

                  <Button
                    variant="ghost"
                    className={`p-0 transition-colors ${
                      theme === "dark" ? "text-white/60 hover:text-white" : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    {t("readMore")}
                    <ArrowRight className="ml-2" size={14} />
                  </Button>
                </div>
              </motion.article>
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
              {t("loadMoreArticles")}
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
