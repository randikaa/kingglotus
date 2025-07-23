"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Play, Pause, SkipBack, SkipForward, Volume2, Heart, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"

interface Song {
  id: string
  title: string
  artist: string
  album: string
  duration: number
  image: string
  preview_url: string
  spotify_url?: string
  youtube_url?: string
}

const mockSongs: Song[] = [
  {
    id: "1",
    title: "Blinding Lights",
    artist: "The Weeknd",
    album: "After Hours",
    duration: 200,
    image: "/placeholder.svg?height=300&width=300",
    preview_url: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav",
    spotify_url: "https://open.spotify.com/track/1eAAmf2ccUFXvz3KsUQ5bE?si=6a2153732ecb41f5",
  },
  {
    id: "2",
    title: "Levitating",
    artist: "Dua Lipa",
    album: "Future Nostalgia",
    duration: 203,
    image: "/placeholder.svg?height=300&width=300",
    preview_url: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav",
    youtube_url: "https://youtu.be/YNGh4Qkgw8w?si=xL0KWK_3nCcdKs24",
  },
]

export default function EnhancedSpotifyPlayer() {
  const [isOpen, setIsOpen] = useState(false)
  const [currentSong, setCurrentSong] = useState(mockSongs[0])
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [volume, setVolume] = useState(50)
  const [isLiked, setIsLiked] = useState(false)
  const audioRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const interval = setInterval(() => {
      if (isPlaying && audioRef.current) {
        setCurrentTime(audioRef.current.currentTime)
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [isPlaying])

  // ...existing code...

useEffect(() => {
  if (audioRef.current) {
    audioRef.current.src = currentSong.preview_url
    audioRef.current.volume = volume / 100
    audioRef.current.play().then(() => {
      setIsPlaying(true)
    }).catch(() => {
      // Autoplay might be blocked by browser, handle if needed
    })
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, []) // Run only on mount

// ...existing code...

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, "0")}`
  }

  const openExternalLink = () => {
    if (currentSong.spotify_url) {
      window.open(currentSong.spotify_url, "_blank")
    } else if (currentSong.youtube_url) {
      window.open(currentSong.youtube_url, "_blank")
    }
  }

  return (
    <>
      {/* Enhanced Floating Player Button */}
      <motion.div
        className="fixed bottom-8 right-8 z-40"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 2, type: "spring", stiffness: 260, damping: 20 }}
      >
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-gradient-to-r from-green-500 to-green-600 rounded-full p-4 shadow-2xl cursor-pointer min-w-[200px]"
          onClick={() => setIsOpen(true)}
        >
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
              <Play size={20} className="text-white ml-1" />
            </div>
            <div className="text-white flex-1">
              <p className="font-semibold text-sm truncate">{currentSong.title}</p>
              <p className="text-white/80 text-xs truncate">
                {currentSong.artist} • {formatTime(currentSong.duration)}
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Enhanced Spotify Player Popup */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-gradient-to-br from-gray-900 to-black p-8 max-w-md w-full mx-4 shadow-2xl"
              style={{ borderRadius: "50px" }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <div className="flex justify-between items-center mb-4">
                <Button variant="ghost" size="sm" onClick={openExternalLink} className="text-white/60 hover:text-white">
                  <ExternalLink size={16} />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsOpen(false)}
                  className="text-white/60 hover:text-white text-xl"
                >
                  ×
                </Button>
              </div>

              {/* Album Art */}
              <div className="flex justify-center mb-6">
                <motion.img
                  src={currentSong.image}
                  alt={currentSong.album}
                  className="w-48 h-48 object-cover shadow-lg"
                  style={{ borderRadius: "25px" }}
                  animate={{ rotate: isPlaying ? 360 : 0 }}
                  transition={{ duration: 10, repeat: isPlaying ? Number.POSITIVE_INFINITY : 0, ease: "linear" }}
                />
              </div>

              {/* Song Info */}
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-white mb-2">{currentSong.title}</h3>
                <p className="text-white/60">{currentSong.artist}</p>
                <p className="text-white/40 text-sm">{currentSong.album}</p>
              </div>

              {/* Progress Bar */}
              <div className="mb-6">
                <Slider
                  value={[currentTime]}
                  max={currentSong.duration}
                  step={1}
                  className="w-full"
                  onValueChange={(value) => {
                    setCurrentTime(value[0])
                    if (audioRef.current) {
                      audioRef.current.currentTime = value[0]
                    }
                  }}
                />
                <div className="flex justify-between text-sm text-white/60 mt-2">
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(currentSong.duration)}</span>
                </div>
              </div>

              {/* Controls */}
              <div className="flex items-center justify-center space-x-4 mb-6">
                <Button variant="ghost" size="sm" className="text-white/60 hover:text-white">
                  <SkipBack size={20} />
                </Button>
                <Button onClick={togglePlay} className="w-12 h-12 rounded-full bg-white text-black hover:bg-white/90">
                  {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                </Button>
                <Button variant="ghost" size="sm" className="text-white/60 hover:text-white">
                  <SkipForward size={20} />
                </Button>
              </div>

              {/* Volume and Like */}
              <div className="flex items-center justify-between">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsLiked(!isLiked)}
                  className={`${isLiked ? "text-red-500" : "text-white/60"} hover:text-red-500`}
                >
                  <Heart size={20} fill={isLiked ? "currentColor" : "none"} />
                </Button>
                <div className="flex items-center space-x-2 flex-1 max-w-32">
                  <Volume2 size={16} className="text-white/60" />
                  <Slider
                    value={[volume]}
                    max={100}
                    step={1}
                    className="flex-1"
                    onValueChange={(value) => {
                      setVolume(value[0])
                      if (audioRef.current) {
                        audioRef.current.volume = value[0] / 100
                      }
                    }}
                  />
                </div>
              </div>

              {/* Hidden Video Element for YouTube/Spotify embeds */}
              <video
                ref={audioRef}
                className="hidden"
                onEnded={() => {
                  setIsPlaying(false)
                }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
