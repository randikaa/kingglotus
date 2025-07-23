"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { DollarSign, Target, Users, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import Navigation from "../../components/Navigation"
import { useTranslation } from "../../contexts/TranslationContext"
import { useTheme } from "../../contexts/ThemeContext"

const contributionStats = {
  totalRaised: 45000,
  target: 100000,
  contributors: 234,
  categories: {
    music: 25000,
    movies: 12000,
    tattoo: 8000,
  },
}

export default function ContributePage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    category: "",
    amount: "",
    currency: "USD",
  })
  const { t } = useTranslation()
  const { theme } = useTheme()

  const progressPercentage = (contributionStats.totalRaised / contributionStats.target) * 100

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Contribution submitted:", formData)
    // Handle form submission
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
              {t("contributeTitle")}
            </h1>
            <p
              className={`text-lg max-w-3xl mx-auto transition-colors ${theme === "dark" ? "text-white/60" : "text-gray-600"}`}
            >
              {t("supportCommunity")}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Progress Section */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-8"
            >
              {/* Main Progress */}
              <div
                className={`backdrop-blur-sm rounded-2xl p-8 border transition-colors ${
                  theme === "dark" ? "bg-white/5 border-white/10" : "bg-white border-gray-200 shadow-lg"
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <h2
                    className={`text-2xl font-semibold transition-colors ${theme === "dark" ? "text-white" : "text-gray-900"}`}
                  >
                    {t("fundingProgress")}
                  </h2>
                  <Target className="text-green-500" size={24} />
                </div>

                <div className="space-y-4">
                  <div
                    className={`flex justify-between text-sm transition-colors ${theme === "dark" ? "text-white/60" : "text-gray-600"}`}
                  >
                    <span>{t("raised")}</span>
                    <span>{t("target")}</span>
                  </div>
                  <Progress value={progressPercentage} className="h-3" />
                  <div className="flex justify-between">
                    <span className="text-2xl font-bold text-green-500">
                      ${contributionStats.totalRaised.toLocaleString()}
                    </span>
                    <span
                      className={`text-xl transition-colors ${theme === "dark" ? "text-white/60" : "text-gray-600"}`}
                    >
                      ${contributionStats.target.toLocaleString()}
                    </span>
                  </div>
                  <p className={`text-sm transition-colors ${theme === "dark" ? "text-white/60" : "text-gray-600"}`}>
                    {progressPercentage.toFixed(1)}% {t("of")} {t("target").toLowerCase()} reached
                  </p>
                </div>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-2 gap-4">
                <div
                  className={`backdrop-blur-sm rounded-xl p-6 border transition-colors ${
                    theme === "dark" ? "bg-white/5 border-white/10" : "bg-white border-gray-200 shadow-lg"
                  }`}
                >
                  <div className="flex items-center space-x-3 mb-2">
                    <Users className="text-blue-500" size={20} />
                    <span
                      className={`text-sm transition-colors ${theme === "dark" ? "text-white/60" : "text-gray-600"}`}
                    >
                      {t("contributors")}
                    </span>
                  </div>
                  <p
                    className={`text-2xl font-bold transition-colors ${theme === "dark" ? "text-white" : "text-gray-900"}`}
                  >
                    {contributionStats.contributors}
                  </p>
                </div>

                <div
                  className={`backdrop-blur-sm rounded-xl p-6 border transition-colors ${
                    theme === "dark" ? "bg-white/5 border-white/10" : "bg-white border-gray-200 shadow-lg"
                  }`}
                >
                  <div className="flex items-center space-x-3 mb-2">
                    <TrendingUp className="text-green-500" size={20} />
                    <span
                      className={`text-sm transition-colors ${theme === "dark" ? "text-white/60" : "text-gray-600"}`}
                    >
                      {t("thisMonth")}
                    </span>
                  </div>
                  <p
                    className={`text-2xl font-bold transition-colors ${theme === "dark" ? "text-white" : "text-gray-900"}`}
                  >
                    $12,450
                  </p>
                </div>
              </div>

              {/* Category Breakdown */}
              <div
                className={`backdrop-blur-sm rounded-2xl p-8 border transition-colors ${
                  theme === "dark" ? "bg-white/5 border-white/10" : "bg-white border-gray-200 shadow-lg"
                }`}
              >
                <h3
                  className={`text-xl font-semibold mb-6 transition-colors ${theme === "dark" ? "text-white" : "text-gray-900"}`}
                >
                  {t("contributionByCategory")}
                </h3>
                <div className="space-y-4">
                  {Object.entries(contributionStats.categories).map(([category, amount]) => (
                    <div key={category} className="space-y-2">
                      <div className="flex justify-between">
                        <span
                          className={`capitalize transition-colors ${theme === "dark" ? "text-white/80" : "text-gray-800"}`}
                        >
                          {t(category)}
                        </span>
                        <span className={`transition-colors ${theme === "dark" ? "text-white/60" : "text-gray-600"}`}>
                          ${amount.toLocaleString()}
                        </span>
                      </div>
                      <Progress value={(amount / contributionStats.totalRaised) * 100} className="h-2" />
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Contribution Form */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className={`backdrop-blur-sm rounded-2xl p-8 border transition-colors ${
                theme === "dark" ? "bg-white/5 border-white/10" : "bg-white border-gray-200 shadow-lg"
              }`}
            >
              <h2
                className={`text-3xl font-semibold mb-6 transition-colors ${theme === "dark" ? "text-white" : "text-gray-900"}`}
              >
                {t("makeContribution")}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label
                      className={`block text-sm font-medium mb-2 transition-colors ${theme === "dark" ? "text-white/80" : "text-gray-700"}`}
                    >
                      {t("fullName")}
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
                      placeholder={t("fullName")}
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
                    {t("mobile")}
                  </label>
                  <Input
                    name="mobile"
                    type="tel"
                    value={formData.mobile}
                    onChange={handleChange}
                    className={`transition-colors ${
                      theme === "dark"
                        ? "bg-white/10 border-white/20 text-white placeholder:text-white/40"
                        : "bg-white border-gray-300 text-gray-900 placeholder:text-gray-500"
                    }`}
                    placeholder="+1 (555) 123-4567"
                    required
                  />
                </div>

                <div>
                  <label
                    className={`block text-sm font-medium mb-2 transition-colors ${theme === "dark" ? "text-white/80" : "text-gray-700"}`}
                  >
                    {t("contributeFor")}
                  </label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => setFormData({ ...formData, category: value })}
                  >
                    <SelectTrigger
                      className={`transition-colors ${
                        theme === "dark"
                          ? "bg-white/10 border-white/20 text-white"
                          : "bg-white border-gray-300 text-gray-900"
                      }`}
                    >
                      <SelectValue placeholder={t("selectCategory")} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="music">{t("music")}</SelectItem>
                      <SelectItem value="movies">{t("movies")}</SelectItem>
                      <SelectItem value="tattoo">{t("tattoo")}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="col-span-2">
                    <label
                      className={`block text-sm font-medium mb-2 transition-colors ${theme === "dark" ? "text-white/80" : "text-gray-700"}`}
                    >
                      {t("amount")}
                    </label>
                    <Input
                      name="amount"
                      type="number"
                      value={formData.amount}
                      onChange={handleChange}
                      className={`transition-colors ${
                        theme === "dark"
                          ? "bg-white/10 border-white/20 text-white placeholder:text-white/40"
                          : "bg-white border-gray-300 text-gray-900 placeholder:text-gray-500"
                      }`}
                      placeholder="100"
                      required
                    />
                  </div>
                  <div>
                    <label
                      className={`block text-sm font-medium mb-2 transition-colors ${theme === "dark" ? "text-white/80" : "text-gray-700"}`}
                    >
                      {t("currency")}
                    </label>
                    <Select
                      value={formData.currency}
                      onValueChange={(value) => setFormData({ ...formData, currency: value })}
                    >
                      <SelectTrigger
                        className={`transition-colors ${
                          theme === "dark"
                            ? "bg-white/10 border-white/20 text-white"
                            : "bg-white border-gray-300 text-gray-900"
                        }`}
                      >
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="USD">USD</SelectItem>
                        <SelectItem value="LKR">LKR</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Button type="submit" className="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-3">
                  <DollarSign size={18} className="mr-2" />
                  {t("contributeNow")}
                </Button>
              </form>

              {/* Recent Contributors */}
              <div
                className={`mt-8 pt-8 border-t transition-colors ${theme === "dark" ? "border-white/10" : "border-gray-200"}`}
              >
                <h3
                  className={`text-lg font-semibold mb-4 transition-colors ${theme === "dark" ? "text-white" : "text-gray-900"}`}
                >
                  {t("recentContributors")}
                </h3>
                <div className="space-y-3">
                  {[
                    { name: "John D.", amount: "$250", category: "Music" },
                    { name: "Sarah M.", amount: "$100", category: "Tattoo" },
                    { name: "Mike R.", amount: "$500", category: "Movies" },
                  ].map((contributor, index) => (
                    <div key={index} className="flex justify-between items-center text-sm">
                      <div>
                        <span className={`transition-colors ${theme === "dark" ? "text-white/80" : "text-gray-800"}`}>
                          {contributor.name}
                        </span>
                        <span
                          className={`ml-2 transition-colors ${theme === "dark" ? "text-white/40" : "text-gray-500"}`}
                        >
                          • {contributor.category}
                        </span>
                      </div>
                      <span className="text-green-500 font-medium">{contributor.amount}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
