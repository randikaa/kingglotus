"use client"

import { motion } from "framer-motion"
import { Play, Heart, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTranslation } from "../contexts/TranslationContext"
import { useTheme } from "../contexts/ThemeContext"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Autoplay } from "swiper/modules"
import "swiper/css"
import "swiper/css/navigation"

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
  {
    id: "5",
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
    <section className="py-20 px-4 sm:px-8">
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
              theme === "dark" ? "text-white/90" : "text-gray-800"
            }`}
          >
            {t("latestMusic")}
          </h2>
          <p
            className={`max-w-2xl mx-auto transition-colors ${
              theme === "dark" ? "text-white/70" : "text-gray-600"
            }`}
          >
            {t("discoverTracks")}
          </p>
        </motion.div>

        <Swiper
          modules={[Navigation, Autoplay]}
          spaceBetween={24}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1280: { slidesPerView: 4 },
          }}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          }}
          className="relative"
        >
          {latestSongs.map((song, index) => (
            <SwiperSlide key={song.id}>
              <motion.div
                initial={{ opacity: 0, scale: index === 0 ? 1.1 : 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className={`group backdrop-blur-lg rounded-2xl p-4 transition-all duration-300 ${
                  theme === "dark"
                    ? "bg-gradient-to-b from-white/10 to-white/5 hover:bg-white/15"
                    : "bg-white/90 hover:bg-white shadow-lg hover:shadow-2xl"
                }`}
              >
                <div className="relative mb-4">
                  <img
                    src={song.image || "/placeholder.svg"}
                    alt={song.title}
                    className="w-full aspect-square object-cover rounded-xl"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl flex items-center justify-center">
                    <Button
                      size="sm"
                      className="rounded-full bg-green-500 hover:bg-green-600 text-white transform group-hover:scale-110 transition-transform"
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
                      theme === "dark" ? "text-white/70" : "text-gray-600"
                    }`}
                  >
                    {song.artist}
                  </p>
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-xs transition-colors ${
                        theme === "dark" ? "text-white/50" : "text-gray-500"
                      }`}
                    >
                      {song.duration}
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      className={`p-1 transition-colors ${
                        theme === "dark"
                          ? "text-white/70 hover:text-red-500"
                          : "text-gray-500 hover:text-red-500"
                      }`}
                    >
                      <Heart size={14} className="group-hover:fill-red-500" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            </SwiperSlide>
          ))}
          <div
            className={`swiper-button-prev absolute top-1/2 -left-12 transform -translate-y-1/2 ${
              theme === "dark" ? "text-white/50" : "text-gray-500"
            }`}
          >
            <ChevronLeft size={10} />
          </div>
          <div
            className={`swiper-button-next absolute top-1/2 -right-12 transform -translate-y-1/2 ${
              theme === "dark" ? "text-white/50" : "text-gray-500"
            }`}
          >
            <ChevronRight size={10} />
          </div>
        </Swiper>
      </div>
    </section>
  )
}