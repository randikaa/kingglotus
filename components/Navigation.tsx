"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { Menu, X, Moon, Sun } from "lucide-react"
import { useTranslation } from "../contexts/TranslationContext"
import { useTheme } from "../contexts/ThemeContext"

const navItems = [
  { name: "home", href: "/" },
  { name: "music", href: "/music" },
  { name: "tattoo", href: "/tattoo" },
  { name: "news", href: "/news" },
  { name: "contact", href: "/contact" },
  { name: "contribute", href: "/contribute" },
]

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()
  const { language, setLanguage, t } = useTranslation()
  const { theme, toggleTheme } = useTheme()

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      // Adjust blur based on scroll position (e.g., blur when scrolled > 50px)
      setIsScrolled(scrollPosition > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleLanguageToggle = () => {
    const newLanguage = language === "en" ? "si" : "en"
    setLanguage(newLanguage)
  }

  return (
    <nav
  className={`fixed top-0 left-0 right-0 z-50 border-b transition-all duration-300 ${
    theme === "dark"
      ? isScrolled
        ? "bg-[#141414]/70 border-[#141414] backdrop-blur-2xl"
        : "bg-[#141414]/100 border-[#141414] backdrop-blur-none"
      : isScrolled
        ? "bg-white/80 border-gray-200 backdrop-blur-2xl"
        : "bg-white/100 border-gray-200 backdrop-blur-none"
  }`}
>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link
            href="/"
            className={`font-bold text-xl transition-colors ${theme === "dark" ? "text-white" : "text-gray-900"}`}
          >
            KingLotuss
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="flex items-baseline space-x-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`px-3 py-2 rounded-[5px] text-sm font-medium transition-colors ${
                    pathname === item.href
                      ? theme === "dark"
                        ? "bg-white/10 text-white"
                        : "bg-gray-900/10 text-gray-900"
                      : theme === "dark"
                        ? "text-white/70 hover:bg-white/5 hover:text-white"
                        : "text-gray-600 hover:bg-gray-900/5 hover:text-gray-900"
                  }`}
                >
                  {t(item.name)}
                </Link>
              ))}
            </div>

            {/* Language Selector */}
            <button
              onClick={handleLanguageToggle}
              className={`w-8 h-8 rounded-full overflow-hidden border-2 transition-colors flex items-center justify-center ${
                theme === "dark" ? "border-white/20 hover:border-white/40" : "border-gray-300 hover:border-gray-500"
              }`}
              title={language === "en" ? "Switch to Sinhala" : "Switch to English"}
            >
              {language === "en" ? <span className="text-xs">🇬🇧</span> : <span className="text-xs">🇱🇰</span>}
            </button>

            {/* Theme Selector */}
            <button
              onClick={toggleTheme}
              className={`w-8 h-8 rounded-full transition-colors flex items-center justify-center ${
                theme === "dark" ? "bg-white/10 hover:bg-white/20" : "bg-gray-900/10 hover:bg-gray-900/20"
              }`}
              title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            >
              {theme === "dark" ? (
                <Moon size={16} className="text-white/70" />
              ) : (
                <Sun size={16} className="text-gray-600" />
              )}
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`transition-colors ${
                theme === "dark" ? "text-white hover:text-white/80" : "text-gray-900 hover:text-gray-700"
              }`}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className={`md:hidden backdrop-blur-md ${theme === "dark" ? "bg-black/90" : "bg-white/90"}`}
        >
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                  pathname === item.href
                    ? theme === "dark"
                      ? "bg-white/10 text-white"
                      : "bg-gray-900/10 text-gray-900"
                    : theme === "dark"
                      ? "text-white/70 hover:bg-white/5 hover:text-white"
                      : "text-gray-600 hover:bg-gray-900/5 hover:text-gray-900"
                }`}
                onClick={() => setIsOpen(false)}
              >
                {t(item.name)}
              </Link>
            ))}

            {/* Mobile Language and Theme Controls */}
            <div className="flex items-center justify-center space-x-4 pt-4 border-t border-white/10">
              <button
                onClick={handleLanguageToggle}
                className={`w-8 h-8 rounded-full overflow-hidden border-2 flex items-center justify-center ${
                  theme === "dark" ? "border-white/20" : "border-gray-300"
                }`}
                title={language === "en" ? "Switch to Sinhala" : "Switch to English"}
              >
                {language === "en" ? <span className="text-xs">🇬🇧</span> : <span className="text-xs">🇱🇰</span>}
              </button>
              <button
                onClick={toggleTheme}
                className={`w-8 h-8 rounded-full transition-colors flex items-center justify-center ${
                  theme === "dark" ? "bg-white/10 hover:bg-white/20" : "bg-gray-900/10 hover:bg-gray-900/20"
                }`}
                title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
              >
                {theme === "dark" ? (
                  <Moon size={16} className="text-white/70" />
                ) : (
                  <Sun size={16} className="text-gray-600" />
                )}
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </nav>
  )
}