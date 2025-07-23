"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Mail, Phone, MapPin, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import Navigation from "../../components/Navigation"
import { useTranslation } from "../../contexts/TranslationContext"
import { useTheme } from "../../contexts/ThemeContext"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const { t } = useTranslation()
  const { theme } = useTheme()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Contact form submitted:", formData)
    // Handle form submission
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

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
              {t("getInTouch")}
            </h1>
            <p
              className={`text-lg max-w-2xl mx-auto transition-colors ${theme === "dark" ? "text-white/60" : "text-gray-600"}`}
            >
              {t("contactDescription")}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className={`backdrop-blur-sm rounded-2xl p-8 border transition-colors ${
                theme === "dark" ? "bg-white/5 border-white/10" : "bg-white border-gray-200 shadow-lg"
              }`}
            >
              <h2
                className={`text-3xl font-semibold mb-6 transition-colors ${theme === "dark" ? "text-white" : "text-gray-900"}`}
              >
                {t("sendMessage")}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label
                      className={`block text-sm font-medium mb-2 transition-colors ${theme === "dark" ? "text-white/80" : "text-gray-700"}`}
                    >
                      {t("name")}
                    </label>
                    <Input
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`transition-colors ${
                        theme === "dark"
                          ? "bg-white/10 border-white/20 text-white placeholder:text-white/40"
                          : "bg-white border-gray-300 text-gray-900 placeholder:text-gray-500"
                      }`}
                      placeholder={t("yourName")}
                      required
                    />
                  </div>
                  <div>
                    <label
                      className={`block text-sm font-medium mb-2 transition-colors ${theme === "dark" ? "text-white/80" : "text-gray-700"}`}
                    >
                      {t("email")}
                    </label>
                    <Input
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`transition-colors ${
                        theme === "dark"
                          ? "bg-white/10 border-white/20 text-white placeholder:text-white/40"
                          : "bg-white border-gray-300 text-gray-900 placeholder:text-gray-500"
                      }`}
                      placeholder={t("yourEmail")}
                      required
                    />
                  </div>
                </div>
                <div>
                  <label
                    className={`block text-sm font-medium mb-2 transition-colors ${theme === "dark" ? "text-white/80" : "text-gray-700"}`}
                  >
                    {t("subject")}
                  </label>
                  <Input
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className={`transition-colors ${
                      theme === "dark"
                        ? "bg-white/10 border-white/20 text-white placeholder:text-white/40"
                        : "bg-white border-gray-300 text-gray-900 placeholder:text-gray-500"
                    }`}
                    placeholder={t("whatsThis")}
                    required
                  />
                </div>
                <div>
                  <label
                    className={`block text-sm font-medium mb-2 transition-colors ${theme === "dark" ? "text-white/80" : "text-gray-700"}`}
                  >
                    {t("message")}
                  </label>
                  <Textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={6}
                    className={`resize-none transition-colors ${
                      theme === "dark"
                        ? "bg-white/10 border-white/20 text-white placeholder:text-white/40"
                        : "bg-white border-gray-300 text-gray-900 placeholder:text-gray-500"
                    }`}
                    placeholder={t("tellUsMore")}
                    required
                  />
                </div>
                <Button
                  type="submit"
                  className={`w-full font-medium py-3 transition-colors ${
                    theme === "dark"
                      ? "bg-white text-black hover:bg-white/90"
                      : "bg-gray-900 text-white hover:bg-gray-800"
                  }`}
                >
                  <Send size={18} className="mr-2" />
                  {t("sendMessageBtn")}
                </Button>
              </form>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="space-y-8"
            >
              <div>
                <h2
                  className={`text-3xl font-semibold mb-6 transition-colors ${theme === "dark" ? "text-white" : "text-gray-900"}`}
                >
                  {t("contactInformation")}
                </h2>
                <p className={`mb-8 transition-colors ${theme === "dark" ? "text-white/60" : "text-gray-600"}`}>
                  {t("reachOut")}
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div
                    className={`p-3 rounded-lg transition-colors ${theme === "dark" ? "bg-white/10" : "bg-gray-100"}`}
                  >
                    <Mail size={24} className={theme === "dark" ? "text-white/80" : "text-gray-600"} />
                  </div>
                  <div>
                    <h3
                      className={`text-lg font-semibold mb-1 transition-colors ${theme === "dark" ? "text-white" : "text-gray-900"}`}
                    >
                      {t("email")}
                    </h3>
                    <p className={`transition-colors ${theme === "dark" ? "text-white/60" : "text-gray-600"}`}>
                      hello@luma.com
                    </p>
                    <p className={`transition-colors ${theme === "dark" ? "text-white/60" : "text-gray-600"}`}>
                      support@luma.com
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div
                    className={`p-3 rounded-lg transition-colors ${theme === "dark" ? "bg-white/10" : "bg-gray-100"}`}
                  >
                    <Phone size={24} className={theme === "dark" ? "text-white/80" : "text-gray-600"} />
                  </div>
                  <div>
                    <h3
                      className={`text-lg font-semibold mb-1 transition-colors ${theme === "dark" ? "text-white" : "text-gray-900"}`}
                    >
                      {t("phone")}
                    </h3>
                    <p className={`transition-colors ${theme === "dark" ? "text-white/60" : "text-gray-600"}`}>
                      +1 (555) 123-4567
                    </p>
                    <p className={`transition-colors ${theme === "dark" ? "text-white/60" : "text-gray-600"}`}>
                      +1 (555) 987-6543
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div
                    className={`p-3 rounded-lg transition-colors ${theme === "dark" ? "bg-white/10" : "bg-gray-100"}`}
                  >
                    <MapPin size={24} className={theme === "dark" ? "text-white/80" : "text-gray-600"} />
                  </div>
                  <div>
                    <h3
                      className={`text-lg font-semibold mb-1 transition-colors ${theme === "dark" ? "text-white" : "text-gray-900"}`}
                    >
                      {t("address")}
                    </h3>
                    <p className={`transition-colors ${theme === "dark" ? "text-white/60" : "text-gray-600"}`}>
                      123 Creative Street
                      <br />
                      San Francisco, CA 94102
                      <br />
                      United States
                    </p>
                  </div>
                </div>
              </div>

              <div
                className={`backdrop-blur-sm rounded-2xl p-6 border transition-colors ${
                  theme === "dark" ? "bg-white/5 border-white/10" : "bg-white border-gray-200 shadow-lg"
                }`}
              >
                <h3
                  className={`text-xl font-semibold mb-4 transition-colors ${theme === "dark" ? "text-white" : "text-gray-900"}`}
                >
                  {t("officeHours")}
                </h3>
                <div className={`space-y-2 transition-colors ${theme === "dark" ? "text-white/60" : "text-gray-600"}`}>
                  <div className="flex justify-between">
                    <span>{t("mondayFriday")}</span>
                    <span>9:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{t("saturday")}</span>
                    <span>10:00 AM - 4:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{t("sunday")}</span>
                    <span>{t("closed")}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
