"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Play, Heart, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTranslation } from "../contexts/TranslationContext"
import { useTheme } from "../contexts/ThemeContext"
import { useApi } from "../hooks/useApi"
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, Pagination } from "swiper/modules"
import "swiper/css"
import "swiper/css/pagination"

interface MusicTrack {
  id: string
  title: string
  artist: string
  genre: string
  description?: string
  image_url: string
  spotify_url?: string
  youtube_url?: string
  tags: string[]
  is_featured: boolean
  created_at: string
}

export default function LatestMusic() {
  const { t } = useTranslation()
  const { theme } = useTheme()
  const { data: musicTracks, loading, error } = useApi<MusicTrack[]>("/api/music")
  const [playingTrackId, setPlayingTrackId] = useState<string | null>(null)

  const handlePlayTrack = (track: MusicTrack) => {
    setPlayingTrackId(prev => (prev === track.id ? null : track.id))
  }

  const renderPlayer = (track: MusicTrack) => {
    if (track.spotify_url) {
      return (
        <iframe
          style={{ borderRadius: "12px" }}
          src={`https://open.spotify.com/embed/track/${track.spotify_url.split("/").pop()?.split("?")[0]}`}
          width="100%"
          height="80"
          frameBorder="0"
          allow="autoplay; clipboard-write; encrypted-media; picture-in-picture"
          loading="lazy"
        ></iframe>
      )
    }
    if (track.youtube_url) {
      return (
        <iframe
          width="100%"
          height="180"
          src={`https://www.youtube.com/embed/${track.youtube_url.split("v=").pop()}`}
          title={track.title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      )
    }
    return null
  }

  // Loading state
  if (loading) {
    return (
      <section className="py-20 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
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
              Loading latest tracks...
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(4)].map((_, index) => (
              <div
                key={index}
                className={`backdrop-blur-lg rounded-2xl p-4 animate-pulse ${
                  theme === "dark"
                    ? "bg-gradient-to-b from-white/10 to-white/5"
                    : "bg-white/90 shadow-lg"
                }`}
              >
                <div className="w-full aspect-square bg-gray-300 rounded-xl mb-4"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-300 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  // Error state
  if (error) {
    return (
      <section className="py-20 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h2
            className={`text-4xl md:text-6xl font-light italic mb-4 transition-colors ${
              theme === "dark" ? "text-white/90" : "text-gray-800"
            }`}
          >
            {t("latestMusic")}
          </h2>
          <p
            className={`max-w-2xl mx-auto transition-colors ${
              theme === "dark" ? "text-red-400" : "text-red-600"
            }`}
          >
            Failed to load music tracks. Please try again later.
          </p>
        </div>
      </section>
    )
  }

  const tracks = musicTracks || []

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

        <div className="relative">
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={24}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
              1280: { slidesPerView: 4 },
            }}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            className="relative"
          >
            {tracks.map((track, index) => (
              <SwiperSlide key={track.id}>
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
                      src={track.image_url || "/placeholder.svg"}
                      alt={track.title}
                      className="w-full aspect-square object-cover rounded-xl"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl flex items-center justify-center gap-2">
                      <Button
                        size="sm"
                        onClick={() => handlePlayTrack(track)}
                        className="rounded-full bg-green-500 hover:bg-green-600 text-white transform group-hover:scale-110 transition-transform"
                      >
                        <Play size={16} />
                      </Button>
                      {(track.spotify_url || track.youtube_url) && (
                        <Button
                          size="sm"
                          onClick={() => handlePlayTrack(track)}
                          className="rounded-full bg-black/50 hover:bg-black/70 text-white transform group-hover:scale-110 transition-transform"
                        >
                          <ExternalLink size={14} />
                        </Button>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3
                      className={`font-semibold truncate transition-colors ${
                        theme === "dark" ? "text-white" : "text-gray-900"
                      }`}
                    >
                      {track.title}
                    </h3>
                    <p
                      className={`text-sm truncate transition-colors ${
                        theme === "dark" ? "text-white/70" : "text-gray-600"
                      }`}
                    >
                      {track.artist}
                    </p>
                    <div className="flex items-center justify-between">
                      <span
                        className={`text-xs px-2 py-1 rounded-full transition-colors ${
                          theme === "dark"
                            ? "bg-white/10 text-white/70"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {track.genre}
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
                    {track.tags && track.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {track.tags.slice(0, 2).map((tag, tagIndex) => (
                          <span
                            key={tagIndex}
                            className={`text-xs px-2 py-1 rounded-full transition-colors ${
                              theme === "dark"
                                ? "bg-white/5 text-white/50"
                                : "bg-gray-50 text-gray-500"
                            }`}
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}

                    {playingTrackId === track.id && (
                      <div className="mt-3">{renderPlayer(track)}</div>
                    )}
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>

          <style jsx global>{`
            .swiper {
              position: relative;
              padding-bottom: 3.5rem;
            }
            .swiper-pagination-bullets {
              position: absolute;
              left: 0;
              right: 0;
              bottom: 0.5rem;
              display: flex;
              justify-content: center;
              gap: 0.5rem;
              margin-top: 0;
            }
            .swiper-pagination-bullet {
              width: 10px;
              height: 10px;
              background: ${theme === "dark" ? "#fff8" : "#3338"};
              opacity: 1;
              border-radius: 9999px;
              transition: background 0.2s;
            }
            .swiper-pagination-bullet-active {
              background: ${theme === "dark" ? "#fff" : "#111"};
            }
          `}</style>
        </div>
      </div>
    </section>
  )
}
