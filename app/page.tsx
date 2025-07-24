"use client"

import { useState } from "react"
import DynamicFrameLayout from "../components/DynamicFrameLayout"
import EnhancedSpotifyPlayer from "../components/EnhancedSpotifyPlayer"
import LatestMusic from "../components/LatestMusic"
import Navigation from "../components/Navigation"
import Footer from "../components/Footer"
import { ppEditorialNewUltralightItalic, inter } from "./fonts"
import { useTranslation } from "../contexts/TranslationContext"
import { useTheme } from "../contexts/ThemeContext"
import Image from "next/image"
import Link from "next/link"

export default function Home() {
  const [headerSize] = useState(1.2)
  const [textSize] = useState(0.8)
  const { t } = useTranslation()
  const { theme } = useTheme()

  return (
    <div
      className={`min-h-screen transition-colors ${
        theme === "dark" ? "bg-[#141414]" : "bg-gray-50"
      } ${ppEditorialNewUltralightItalic.variable} ${inter.variable}`}
    >
      <Navigation />

      <div className="pt-20 flex items-center justify-center p-8">
        <div className="w-full h-full flex flex-col md:flex-row items-start gap-8 md:gap-8">
          {/* Left Content */}
          <div className="w-full md:w-[260px] flex-shrink-0 flex flex-col justify-between h-full">
            <div className="flex flex-col">
              <h1
                className={`${ppEditorialNewUltralightItalic.className} text-4xl md:text-6xl font-light italic tracking-tighter leading-[130%] transition-colors mt-14 ${
                  theme === "dark" ? "text-white/80" : "text-gray-800"
                }`}
                style={{ fontSize: `${4 * headerSize}rem` }}
              >
                {t("brandDesigner")}
              </h1>
              <div
                className={`${inter.className} flex flex-col gap-12 text-sm font-light max-w-[300px] transition-colors ${
                  theme === "dark" ? "text-white/50" : "text-gray-600"
                }`}
                style={{ fontSize: `${0.875 * textSize}rem` }}
              >
                <div className="space-y-6">
                  <div className={`h-px w-full ${theme === "dark" ? "bg-white/10" : "bg-gray-300"}`} />
                  <p>{t("brandDescription1")}</p>
                  <p>{t("brandDescription2")}</p>
                  <p>{t("favoriteWorks")}</p>
                  <div className={`h-px w-full ${theme === "dark" ? "bg-white/10" : "bg-gray-300"}`} />
                </div>
              </div>
            </div>
          </div>

          {/* Right Content */}
          <div className="w-full md:flex-grow h-[60vh] md:h-[80vh]">
            <DynamicFrameLayout />
          </div>
        </div>
      </div>

      {/* Enhanced Spotify Player Section */}
      <EnhancedSpotifyPlayer />

      {/* Latest Music Section */}
      <LatestMusic />

      {/* Footer */}
      <Footer />
    </div>
  )
}
