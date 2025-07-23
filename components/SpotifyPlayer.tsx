"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Play, Pause, SkipBack, SkipForward, Volume2, Heart } from "lucide-react"
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
  },
  {
    id: "2",
    title: "Levitating",
    artist: "Dua Lipa",
    album: "Future Nostalgia",
    duration: 203,
    image: "/placeholder.svg?height=300&width=300",
    preview_url: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav",
  },
  {
    id: "3",
    title: "Good 4 U",
    artist: "Olivia Rodrigo",
    album: "SOUR",
    duration: 178,
    image: "/placeholder.svg?height=300&width=300",
    preview_url: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav",
  },
]

export default function SpotifyPlayer() {
  const [isOpen, setIsOpen] = useState(false)
  const [currentSong, setCurrentSong] = useState(mockSongs[0])
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [volume, setVolume] = useState(50)
  const [isLiked, setIsLiked] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    const interval = setInterval(() => {
      if (isPlaying && audioRef.current) {
        setCurrentTime(audioRef.current.currentTime)
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [isPlaying])

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

  const nextSong = () => {
    const currentIndex = mockSongs.findIndex((song) => song.id === currentSong.id)
    const nextIndex = (currentIndex + 1) % mockSongs.length
    setCurrentSong(mockSongs[nextIndex])
    setCurrentTime(0)
  }

  const prevSong = () => {
    const currentIndex = mockSongs.findIndex((song) => song.id === currentSong.id)
    const prevIndex = currentIndex === 0 ? mockSongs.length - 1 : currentIndex - 1
    setCurrentSong(mockSongs[prevIndex])
    setCurrentTime(0)
  }

  return (
    <>
      {/* Floating Player Button */}
      <motion.div
        className="fixed bottom-8 right-8 z-40"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 2, type: "spring", stiffness: 260, damping: 20 }}
      >
        <Button
          onClick={() => setIsOpen(true)}
          className="w-16 h-16 rounded-full bg-green-500 hover:bg-green-600 text-white shadow-lg hover:shadow-xl transition-all duration-300"
          style={{ borderRadius: "50%" }}
        >
          <Play size={24} />
        </Button>
      </motion.div>

      {/* Spotify Player Popup */}
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
              <div className="flex justify-end mb-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsOpen(false)}
                  className="text-white/60 hover:text-white"
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
                <Button variant="ghost" size="sm" onClick={prevSong} className="text-white/60 hover:text-white">
                  <SkipBack size={20} />
                </Button>
                <Button onClick={togglePlay} className="w-12 h-12 rounded-full bg-white text-black hover:bg-white/90">
                  {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                </Button>
                <Button variant="ghost" size="sm" onClick={nextSong} className="text-white/60 hover:text-white">
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

              {/* Hidden Audio Element */}
              <audio
                ref={audioRef}
                src={currentSong.preview_url}
                onEnded={() => {
                  setIsPlaying(false)
                  nextSong()
                }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
