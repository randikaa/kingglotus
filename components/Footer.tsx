"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin, Youtube } from "lucide-react"
import { useTranslation } from "../contexts/TranslationContext"
import { useTheme } from "../contexts/ThemeContext"

export default function Footer() {
  const { t } = useTranslation()
  const { theme } = useTheme()

  const footerLinks = {
    company: [
      { name: "about", href: "/about" },
      { name: "careers", href: "/careers" },
      { name: "press", href: "/press" },
      { name: "blog", href: "/blog" },
    ],
    services: [
      { name: "music", href: "/music" },
      { name: "tattoo", href: "/tattoo" },
      { name: "news", href: "/news" },
      { name: "contribute", href: "/contribute" },
    ],
    support: [
      { name: "contact", href: "/contact" },
      { name: "help", href: "/help" },
      { name: "privacy", href: "/privacy" },
      { name: "terms", href: "/terms" },
    ],
  }

  const socialLinks = [
    { icon: Facebook, href: "https://facebook.com/luma", label: "Facebook" },
    { icon: Twitter, href: "https://twitter.com/luma", label: "Twitter" },
    { icon: Instagram, href: "https://instagram.com/luma", label: "Instagram" },
    { icon: Linkedin, href: "https://linkedin.com/company/luma", label: "LinkedIn" },
    { icon: Youtube, href: "https://youtube.com/luma", label: "YouTube" },
  ]

  return (
    <footer
      className={`relative overflow-hidden transition-colors ${
        theme === "dark"
          ? "bg-gradient-to-br from-black via-gray-900 to-black border-t border-white/10"
          : "bg-gradient-to-br from-gray-50 via-white to-gray-100 border-t border-gray-200"
      }`}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full blur-3xl transform -translate-x-48 -translate-y-48" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-green-500 to-blue-500 rounded-full blur-3xl transform translate-x-48 translate-y-48" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-8 py-8 sm:py-12 lg:py-16">
        {/* Mobile-First Layout */}
        <div className="space-y-8">
          {/* Brand Section - Mobile Optimized */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center space-y-4"
          >
            <div className="flex items-center justify-center space-x-3">
              <Link href="/" className="flex items-center space-x-3">
                {/* <div className="w-8 h-8 sm:w-10 sm:h-10 relative">
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/LumaLogo%201-MA3upjPymxFHKoHJgpdAUfZMeKGq3i.png"
                    alt="Luma Logo"
                    fill
                    className="object-contain"
                  />
                </div> */}
                <span
                  className={`text-xl sm:text-2xl font-bold transition-colors ${
                    theme === "dark" ? "text-white" : "text-gray-900"
                  }`}
                >
                  Kinglotuss
                </span>
              </Link>
            </div>
            <p
              className={`text-sm leading-relaxed max-w-xs sm:max-w-md mx-auto transition-colors ${
                theme === "dark" ? "text-white/70" : "text-gray-600"
              }`}
            >
              King Lothus isn’t just a name. It’s a voice for people who don’t get heard.
            </p>
          </motion.div>

          {/* Contact Info - Mobile Stack */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="space-y-3 sm:space-y-0"
          >
            {/* Mobile: Stack vertically, Tablet+: Horizontal */}
            <div className="flex flex-col sm:flex-row sm:justify-center sm:space-x-6 space-y-3 sm:space-y-0">
              <div className="flex items-center justify-center space-x-2">
                <Mail
                  size={14}
                  className={`transition-colors ${theme === "dark" ? "text-white/60" : "text-gray-500"}`}
                />
                <span className={`text-sm transition-colors ${theme === "dark" ? "text-white/70" : "text-gray-600"}`}>
                  hello@kinglotuss.com
                </span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <Phone
                  size={14}
                  className={`transition-colors ${theme === "dark" ? "text-white/60" : "text-gray-500"}`}
                />
                <span className={`text-sm transition-colors ${theme === "dark" ? "text-white/70" : "text-gray-600"}`}>
                  +94 (74) 381-9590
                </span>
              </div>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <MapPin
                size={14}
                className={`transition-colors ${theme === "dark" ? "text-white/60" : "text-gray-500"}`}
              />
              <span className={`text-sm transition-colors ${theme === "dark" ? "text-white/70" : "text-gray-600"}`}>
                Colombo, Sri Lanka
              </span>
            </div>
          </motion.div>

          {/* Links Section - Mobile Optimized */}
          <div className="space-y-6 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-8">
            {/* Company Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-center space-y-3"
            >
              <h3
                className={`text-base sm:text-lg font-semibold transition-colors ${
                  theme === "dark" ? "text-white" : "text-gray-900"
                }`}
              >
                Company
              </h3>
              <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 sm:flex-col sm:space-y-2">
                {footerLinks.company.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`text-sm transition-all duration-200 hover:translate-y-[-1px] ${
                      theme === "dark" ? "text-white/70 hover:text-white" : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    {t(link.name) || link.name.charAt(0).toUpperCase() + link.name.slice(1)}
                  </Link>
                ))}
              </div>
            </motion.div>

            {/* Services Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="text-center space-y-3"
            >
              <h3
                className={`text-base sm:text-lg font-semibold transition-colors ${
                  theme === "dark" ? "text-white" : "text-gray-900"
                }`}
              >
                Services
              </h3>
              <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 sm:flex-col sm:space-y-2">
                {footerLinks.services.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`text-sm transition-all duration-200 hover:translate-y-[-1px] ${
                      theme === "dark" ? "text-white/70 hover:text-white" : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    {t(link.name)}
                  </Link>
                ))}
              </div>
            </motion.div>

            {/* Support Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="text-center space-y-3"
            >
              <h3
                className={`text-base sm:text-lg font-semibold transition-colors ${
                  theme === "dark" ? "text-white" : "text-gray-900"
                }`}
              >
                Support
              </h3>
              <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 sm:flex-col sm:space-y-2">
                {footerLinks.support.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`text-sm transition-all duration-200 hover:translate-y-[-1px] ${
                      theme === "dark" ? "text-white/70 hover:text-white" : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    {t(link.name) || link.name.charAt(0).toUpperCase() + link.name.slice(1)}
                  </Link>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Social Links - Mobile Optimized */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            viewport={{ once: true }}
            className="text-center space-y-3"
          >
            <h4
              className={`text-sm font-medium transition-colors ${
                theme === "dark" ? "text-white/90" : "text-gray-800"
              }`}
            >
              Follow Us
            </h4>
            <div className="flex justify-center space-x-3">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all duration-200 ${
                    theme === "dark"
                      ? "bg-white/10 hover:bg-white/20 text-white/70 hover:text-white"
                      : "bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-900"
                  }`}
                  aria-label={social.label}
                >
                  <social.icon size={16} />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Newsletter Signup - Centered on all screens */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className={`mt-8 sm:mt-12 pt-6 sm:pt-8 border-t transition-colors ${
            theme === "dark" ? "border-white/10" : "border-gray-200"
          }`}
        >
          <div className="text-center max-w-lg mx-auto space-y-4 sm:space-y-6">
            <h3
              className={`text-lg sm:text-xl lg:text-2xl font-semibold transition-colors ${
                theme === "dark" ? "text-white" : "text-gray-900"
              }`}
            >
              Stay Updated
            </h3>
            <p
              className={`text-sm sm:text-base transition-colors ${
                theme === "dark" ? "text-white/70" : "text-gray-600"
              }`}
            >
              Subscribe to our newsletter for the latest updates, creative insights, and exclusive content.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className={`flex-1 px-4 py-3 sm:py-4 rounded-lg text-sm rounded-[10px] sm:text-base transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  theme === "dark"
                    ? "bg-white/10 border border-white/20 text-white placeholder:text-white/50"
                    : "bg-white border border-gray-300 text-gray-900 placeholder:text-gray-500"
                }`}
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 rounded-[10px] sm:py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm sm:text-base font-medium rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200 whitespace-nowrap"
              >
                Subscribe
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          viewport={{ once: true }}
          className={`mt-6 sm:mt-8 pt-4 sm:pt-6 border-t flex flex-col space-y-3 sm:space-y-0 sm:flex-row sm:justify-between sm:items-center transition-colors ${
            theme === "dark" ? "border-white/10" : "border-gray-200"
          }`}
        >
          <p
            className={`text-xs sm:text-sm text-center transition-colors ${
              theme === "dark" ? "text-white/60" : "text-gray-500"
            }`}
          >
            © 2025 Wideech. All rights reserved. Made with ❤️ in Wideech.
          </p>
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4 text-xs sm:text-sm">
            <Link
              href="/privacy"
              className={`transition-colors ${
                theme === "dark" ? "text-white/60 hover:text-white" : "text-gray-500 hover:text-gray-900"
              }`}
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className={`transition-colors ${
                theme === "dark" ? "text-white/60 hover:text-white" : "text-gray-500 hover:text-gray-900"
              }`}
            >
              Terms of Service
            </Link>
            <Link
              href="/cookies"
              className={`transition-colors ${
                theme === "dark" ? "text-white/60 hover:text-white" : "text-gray-500 hover:text-gray-900"
              }`}
            >
              Cookie Policy
            </Link>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
