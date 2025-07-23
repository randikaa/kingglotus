"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import {
  Plus,
  Edit,
  Trash2,
  Music,
  ImageIcon,
  Newspaper,
  TrendingUp,
  LogOut,
  Mail,
  DollarSign,
  AlertTriangle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { useRouter } from "next/navigation"

interface ContentItem {
  id: string
  title: string
  artist?: string
  author?: string
  description?: string
  excerpt?: string
  content?: string
  image_url: string
  category?: string
  genre?: string
  style?: string
  tags: string[]
  is_featured: boolean
  featured_section?: string
  created_at: string
}

interface ContactMessage {
  id: string
  name: string
  email: string
  subject: string
  message: string
  status: "unread" | "read" | "replied"
  created_at: string
}

interface Contribution {
  id: string
  name: string
  email: string
  mobile?: string
  category: string
  amount: number
  currency: string
  status: "pending" | "completed" | "failed"
  created_at: string
}

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const [musicItems, setMusicItems] = useState<ContentItem[]>([])
  const [tattooItems, setTattooItems] = useState<ContentItem[]>([])
  const [newsItems, setNewsItems] = useState<ContentItem[]>([])
  const [contactMessages, setContactMessages] = useState<ContactMessage[]>([])
  const [contributions, setContributions] = useState<Contribution[]>([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingItem, setEditingItem] = useState<ContentItem | null>(null)
  const [currentCategory, setCurrentCategory] = useState<"music" | "tattoo" | "news">("music")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [setupNeeded, setSetupNeeded] = useState(false)
  const router = useRouter()

  const [formData, setFormData] = useState({
    title: "",
    artist: "",
    author: "",
    description: "",
    excerpt: "",
    content: "",
    image_url: "",
    category: "",
    genre: "",
    style: "",
    tags: [] as string[],
    is_featured: false,
    featured_section: "",
  })

  useEffect(() => {
    const isAdmin = localStorage.getItem("adminAuth")
    if (!isAdmin) {
      router.push("/admin")
      return
    }
    loadData()
  }, [router])

  const loadData = async () => {
    try {
      setLoading(true)
      setError(null)
      setSetupNeeded(false)

      const [musicRes, tattooRes, newsRes, contactRes, contributionRes] = await Promise.all([
        fetch("/api/music").catch(() => ({ json: () => Promise.resolve([]) })),
        fetch("/api/tattoos").catch(() => ({ json: () => Promise.resolve([]) })),
        fetch("/api/news").catch(() => ({ json: () => Promise.resolve([]) })),
        fetch("/api/contact-messages").catch(() => ({ json: () => Promise.resolve([]) })),
        fetch("/api/contributions").catch(() => ({ json: () => Promise.resolve([]) })),
      ])

      const [music, tattoos, news, contacts, contributions] = await Promise.all([
        musicRes.json().catch(() => []),
        tattooRes.json().catch(() => []),
        newsRes.json().catch(() => []),
        contactRes.json().catch(() => []),
        contributionRes.json().catch(() => []),
      ])

      // Check if we need to show setup instructions
      if (contacts.error && contacts.error.includes("does not exist")) {
        setSetupNeeded(true)
      }

      // Ensure all data is arrays
      setMusicItems(Array.isArray(music) ? music : [])
      setTattooItems(Array.isArray(tattoos) ? tattoos : [])
      setNewsItems(Array.isArray(news) ? news : [])
      setContactMessages(Array.isArray(contacts) ? contacts : [])
      setContributions(Array.isArray(contributions) ? contributions : [])
    } catch (error) {
      console.error("Error loading data:", error)
      setError("Failed to load data")
      // Set empty arrays as fallback
      setMusicItems([])
      setTattooItems([])
      setNewsItems([])
      setContactMessages([])
      setContributions([])
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("adminAuth")
    router.push("/admin")
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const endpoint = editingItem ? `/${currentCategory}/${editingItem.id}` : `/${currentCategory}`
      const method = editingItem ? "PUT" : "POST"

      const payload = {
        ...formData,
        tags: formData.tags.filter((tag) => tag.trim() !== ""),
      }

      const response = await fetch(`/api${endpoint}`, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      if (!response.ok) throw new Error("Failed to save")

      await loadData()
      resetForm()
      setIsDialogOpen(false)
    } catch (error) {
      console.error("Error saving:", error)
      alert("Error saving item")
    }
  }

  const handleEdit = (item: ContentItem) => {
    setEditingItem(item)
    setFormData({
      title: item.title,
      artist: item.artist || "",
      author: item.author || "",
      description: item.description || "",
      excerpt: item.excerpt || "",
      content: item.content || "",
      image_url: item.image_url,
      category: item.category || "",
      genre: item.genre || "",
      style: item.style || "",
      tags: Array.isArray(item.tags) ? item.tags : [],
      is_featured: item.is_featured,
      featured_section: item.featured_section || "",
    })
    setIsDialogOpen(true)
  }

  const handleDelete = async (id: string, type: string) => {
    if (!confirm("Are you sure you want to delete this item?")) return

    try {
      const response = await fetch(`/api/${type}/${id}`, { method: "DELETE" })
      if (!response.ok) throw new Error("Failed to delete")
      await loadData()
    } catch (error) {
      console.error("Error deleting:", error)
      alert("Error deleting item")
    }
  }

  const handleMessageStatusUpdate = async (id: string, status: string) => {
    try {
      const response = await fetch(`/api/contact-messages/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      })
      if (!response.ok) throw new Error("Failed to update")
      await loadData()
    } catch (error) {
      console.error("Error updating message:", error)
    }
  }

  const handleContributionStatusUpdate = async (id: string, status: string) => {
    try {
      const response = await fetch(`/api/contributions/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      })
      if (!response.ok) throw new Error("Failed to update")
      await loadData()
    } catch (error) {
      console.error("Error updating contribution:", error)
    }
  }

  const resetForm = () => {
    setFormData({
      title: "",
      artist: "",
      author: "",
      description: "",
      excerpt: "",
      content: "",
      image_url: "",
      category: "",
      genre: "",
      style: "",
      tags: [],
      is_featured: false,
      featured_section: "",
    })
    setEditingItem(null)
  }

  const handleTagsChange = (value: string) => {
    const tags = value
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag !== "")
    setFormData({ ...formData, tags })
  }

  // Safe calculations with fallback to empty arrays
  const stats = {
    totalMusic: musicItems.length,
    totalTattoos: tattooItems.length,
    totalNews: newsItems.length,
    totalMessages: contactMessages.length,
    unreadMessages: contactMessages.filter((m) => m?.status === "unread").length || 0,
    totalContributions: contributions.length,
    totalEarnings: contributions.filter((c) => c?.status === "completed").reduce((sum, c) => sum + (c?.amount || 0), 0),
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#141414] text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-white"></div>
          <p className="mt-4 text-xl">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  if (setupNeeded) {
    return (
      <div className="min-h-screen bg-[#141414] text-white flex items-center justify-center p-4">
        <div className="max-w-2xl w-full bg-black/40 backdrop-blur-sm border border-white/10 rounded-xl p-8">
          <div className="flex items-center gap-3 mb-6">
            <AlertTriangle className="text-yellow-500" size={32} />
            <h1 className="text-2xl font-bold">Database Setup Required</h1>
          </div>

          <div className="space-y-4">
            <p>The required database tables for contact messages and contributions don't exist yet.</p>
            <p>Please run the following SQL script in your Supabase SQL Editor:</p>

            <div className="bg-black/60 p-4 rounded-md overflow-auto max-h-96">
              <pre className="text-sm text-white/80 whitespace-pre-wrap">
                {`-- Create contact_messages table
CREATE TABLE IF NOT EXISTS contact_messages (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    subject VARCHAR(500) NOT NULL,
    message TEXT NOT NULL,
    status VARCHAR(50) DEFAULT 'unread' CHECK (status IN ('unread', 'read', 'replied')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create contributions table
CREATE TABLE IF NOT EXISTS contributions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    mobile VARCHAR(50),
    category VARCHAR(100) NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    currency VARCHAR(10) DEFAULT 'USD',
    status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_contact_messages_status ON contact_messages(status);
CREATE INDEX IF NOT EXISTS idx_contact_messages_created_at ON contact_messages(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_contributions_status ON contributions(status);
CREATE INDEX IF NOT EXISTS idx_contributions_created_at ON contributions(created_at DESC);`}
              </pre>
            </div>

            <div className="flex justify-center mt-6">
              <Button onClick={loadData} className="bg-blue-500 hover:bg-blue-600">
                Refresh Dashboard
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#141414] text-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-400 text-xl mb-4">{error}</p>
          <Button onClick={loadData} className="bg-blue-500 hover:bg-blue-600">
            Retry
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#141414] text-white">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-black/40 backdrop-blur-sm border-r border-white/10 min-h-screen">
          <div className="p-6">
            <h1 className="text-2xl font-bold mb-8">Admin Dashboard</h1>
            <nav className="space-y-2">
              <button
                onClick={() => setActiveTab("overview")}
                className={`w-full text-left p-3 rounded-lg transition-colors ${
                  activeTab === "overview" ? "bg-white/10" : "hover:bg-white/5"
                }`}
              >
                <TrendingUp className="inline mr-3" size={18} />
                Overview
              </button>
              <button
                onClick={() => setActiveTab("music")}
                className={`w-full text-left p-3 rounded-lg transition-colors ${
                  activeTab === "music" ? "bg-white/10" : "hover:bg-white/5"
                }`}
              >
                <Music className="inline mr-3" size={18} />
                Music
              </button>
              <button
                onClick={() => setActiveTab("tattoo")}
                className={`w-full text-left p-3 rounded-lg transition-colors ${
                  activeTab === "tattoo" ? "bg-white/10" : "hover:bg-white/5"
                }`}
              >
                <ImageIcon className="inline mr-3" size={18} />
                Tattoos
              </button>
              <button
                onClick={() => setActiveTab("news")}
                className={`w-full text-left p-3 rounded-lg transition-colors ${
                  activeTab === "news" ? "bg-white/10" : "hover:bg-white/5"
                }`}
              >
                <Newspaper className="inline mr-3" size={18} />
                News
              </button>
              <button
                onClick={() => setActiveTab("messages")}
                className={`w-full text-left p-3 rounded-lg transition-colors ${
                  activeTab === "messages" ? "bg-white/10" : "hover:bg-white/5"
                }`}
              >
                <Mail className="inline mr-3" size={18} />
                Messages
                {stats.unreadMessages > 0 && <Badge className="ml-2 bg-red-500">{stats.unreadMessages}</Badge>}
              </button>
              <button
                onClick={() => setActiveTab("contributions")}
                className={`w-full text-left p-3 rounded-lg transition-colors ${
                  activeTab === "contributions" ? "bg-white/10" : "hover:bg-white/5"
                }`}
              >
                <DollarSign className="inline mr-3" size={18} />
                Contributions
              </button>
            </nav>
            <Button onClick={handleLogout} variant="ghost" className="w-full mt-8 text-red-400 hover:text-red-300">
              <LogOut className="mr-2" size={18} />
              Logout
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          {activeTab === "overview" && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
              <h2 className="text-4xl font-bold">Dashboard Overview</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white/60 text-sm">Total Music</p>
                      <p className="text-2xl font-bold">{stats.totalMusic}</p>
                    </div>
                    <Music className="text-green-500" size={24} />
                  </div>
                </div>

                <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white/60 text-sm">Total Tattoos</p>
                      <p className="text-2xl font-bold">{stats.totalTattoos}</p>
                    </div>
                    <ImageIcon className="text-purple-500" size={24} />
                  </div>
                </div>

                <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white/60 text-sm">Total News</p>
                      <p className="text-2xl font-bold">{stats.totalNews}</p>
                    </div>
                    <Newspaper className="text-blue-500" size={24} />
                  </div>
                </div>

                <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white/60 text-sm">Messages</p>
                      <p className="text-2xl font-bold">{stats.totalMessages}</p>
                      <p className="text-red-400 text-xs">{stats.unreadMessages} unread</p>
                    </div>
                    <Mail className="text-yellow-500" size={24} />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                  <h3 className="text-xl font-semibold mb-4">Recent Messages</h3>
                  <div className="space-y-3">
                    {contactMessages.slice(0, 5).map((message) => (
                      <div key={message.id} className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                        <div>
                          <p className="font-medium">{message.name}</p>
                          <p className="text-sm text-white/60">{message.subject}</p>
                        </div>
                        <Badge variant={message.status === "unread" ? "destructive" : "secondary"}>
                          {message.status}
                        </Badge>
                      </div>
                    ))}
                    {contactMessages.length === 0 && <p className="text-white/60 text-center py-4">No messages yet</p>}
                  </div>
                </div>

                <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                  <h3 className="text-xl font-semibold mb-4">Recent Contributions</h3>
                  <div className="space-y-3">
                    {contributions.slice(0, 5).map((contribution) => (
                      <div
                        key={contribution.id}
                        className="flex justify-between items-center p-3 bg-white/5 rounded-lg"
                      >
                        <div>
                          <p className="font-medium">{contribution.name}</p>
                          <p className="text-sm text-white/60">{contribution.category}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-green-500">${contribution.amount}</p>
                          <Badge variant={contribution.status === "completed" ? "default" : "secondary"}>
                            {contribution.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                    {contributions.length === 0 && (
                      <p className="text-white/60 text-center py-4">No contributions yet</p>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Messages Tab */}
          {activeTab === "messages" && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
              <h2 className="text-4xl font-bold">Contact Messages</h2>

              <div className="grid gap-4">
                {contactMessages.map((message) => (
                  <div key={message.id} className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-lg font-semibold">{message.subject}</h3>
                        <p className="text-white/60">
                          From: {message.name} ({message.email})
                        </p>
                        <p className="text-white/40 text-sm">{new Date(message.created_at).toLocaleString()}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={message.status === "unread" ? "destructive" : "secondary"}>
                          {message.status}
                        </Badge>
                        <Select
                          value={message.status}
                          onValueChange={(value) => handleMessageStatusUpdate(message.id, value)}
                        >
                          <SelectTrigger className="w-32 bg-white/10 border-white/20">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="unread">Unread</SelectItem>
                            <SelectItem value="read">Read</SelectItem>
                            <SelectItem value="replied">Replied</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="bg-white/5 p-4 rounded-lg">
                      <p className="text-white/80">{message.message}</p>
                    </div>
                  </div>
                ))}
                {contactMessages.length === 0 && (
                  <div className="text-center py-12">
                    <Mail className="mx-auto h-12 w-12 text-white/40 mb-4" />
                    <p className="text-white/60">No messages yet</p>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* Contributions Tab */}
          {activeTab === "contributions" && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-4xl font-bold">Contributions</h2>
                <div className="bg-white/5 p-4 rounded-lg">
                  <p className="text-sm text-white/60">Total Earnings</p>
                  <p className="text-2xl font-bold text-green-500">${stats.totalEarnings.toFixed(2)}</p>
                </div>
              </div>

              <div className="grid gap-4">
                {contributions.map((contribution) => (
                  <div
                    key={contribution.id}
                    className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-semibold">{contribution.name}</h3>
                        <p className="text-white/60">{contribution.email}</p>
                        {contribution.mobile && <p className="text-white/60">{contribution.mobile}</p>}
                        <p className="text-white/40 text-sm">{new Date(contribution.created_at).toLocaleString()}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-green-500">
                          ${contribution.amount} {contribution.currency}
                        </p>
                        <p className="text-white/60 mb-2">Category: {contribution.category}</p>
                        <div className="flex items-center gap-2">
                          <Badge
                            variant={
                              contribution.status === "completed"
                                ? "default"
                                : contribution.status === "failed"
                                  ? "destructive"
                                  : "secondary"
                            }
                          >
                            {contribution.status}
                          </Badge>
                          <Select
                            value={contribution.status}
                            onValueChange={(value) => handleContributionStatusUpdate(contribution.id, value)}
                          >
                            <SelectTrigger className="w-32 bg-white/10 border-white/20">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="pending">Pending</SelectItem>
                              <SelectItem value="completed">Completed</SelectItem>
                              <SelectItem value="failed">Failed</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                {contributions.length === 0 && (
                  <div className="text-center py-12">
                    <DollarSign className="mx-auto h-12 w-12 text-white/40 mb-4" />
                    <p className="text-white/60">No contributions yet</p>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* Content Management Sections */}
          {(activeTab === "music" || activeTab === "tattoo" || activeTab === "news") && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-4xl font-bold capitalize">{activeTab} Management</h2>
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger asChild>
                    <Button
                      onClick={() => {
                        setCurrentCategory(activeTab as "music" | "tattoo" | "news")
                        resetForm()
                      }}
                      className="bg-green-500 hover:bg-green-600"
                    >
                      <Plus className="mr-2" size={18} />
                      Add {activeTab}
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="bg-gray-900 border-white/20 text-white max-w-2xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>
                        {editingItem ? "Edit" : "Add"} {activeTab}
                      </DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Title</label>
                        <Input
                          value={formData.title}
                          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                          className="bg-white/10 border-white/20 text-white"
                          required
                        />
                      </div>

                      {activeTab === "music" && (
                        <>
                          <div>
                            <label className="block text-sm font-medium mb-2">Artist</label>
                            <Input
                              value={formData.artist}
                              onChange={(e) => setFormData({ ...formData, artist: e.target.value })}
                              className="bg-white/10 border-white/20 text-white"
                              required
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-2">Genre</label>
                            <Select
                              value={formData.genre}
                              onValueChange={(value) => setFormData({ ...formData, genre: value })}
                            >
                              <SelectTrigger className="bg-white/10 border-white/20 text-white">
                                <SelectValue placeholder="Select genre" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Pop">Pop</SelectItem>
                                <SelectItem value="Dance Pop">Dance Pop</SelectItem>
                                <SelectItem value="Pop Rock">Pop Rock</SelectItem>
                                <SelectItem value="Indie Pop">Indie Pop</SelectItem>
                                <SelectItem value="Hip Hop">Hip Hop</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-2">Description</label>
                            <Textarea
                              value={formData.description}
                              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                              className="bg-white/10 border-white/20 text-white"
                              rows={3}
                            />
                          </div>
                        </>
                      )}

                      {activeTab === "tattoo" && (
                        <>
                          <div>
                            <label className="block text-sm font-medium mb-2">Artist</label>
                            <Input
                              value={formData.artist}
                              onChange={(e) => setFormData({ ...formData, artist: e.target.value })}
                              className="bg-white/10 border-white/20 text-white"
                              required
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-2">Style</label>
                            <Select
                              value={formData.style}
                              onValueChange={(value) => setFormData({ ...formData, style: value })}
                            >
                              <SelectTrigger className="bg-white/10 border-white/20 text-white">
                                <SelectValue placeholder="Select style" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Traditional Japanese">Traditional Japanese</SelectItem>
                                <SelectItem value="Geometric">Geometric</SelectItem>
                                <SelectItem value="Realism">Realism</SelectItem>
                                <SelectItem value="Watercolor">Watercolor</SelectItem>
                                <SelectItem value="Minimalist">Minimalist</SelectItem>
                                <SelectItem value="Tribal">Tribal</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-2">Description</label>
                            <Textarea
                              value={formData.description}
                              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                              className="bg-white/10 border-white/20 text-white"
                              rows={3}
                            />
                          </div>
                        </>
                      )}

                      {activeTab === "news" && (
                        <>
                          <div>
                            <label className="block text-sm font-medium mb-2">Author</label>
                            <Input
                              value={formData.author}
                              onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                              className="bg-white/10 border-white/20 text-white"
                              required
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-2">Category</label>
                            <Select
                              value={formData.category}
                              onValueChange={(value) => setFormData({ ...formData, category: value })}
                            >
                              <SelectTrigger className="bg-white/10 border-white/20 text-white">
                                <SelectValue placeholder="Select category" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Platform">Platform</SelectItem>
                                <SelectItem value="Artists">Artists</SelectItem>
                                <SelectItem value="Events">Events</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-2">Excerpt</label>
                            <Textarea
                              value={formData.excerpt}
                              onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                              className="bg-white/10 border-white/20 text-white"
                              rows={2}
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-2">Content</label>
                            <Textarea
                              value={formData.content}
                              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                              className="bg-white/10 border-white/20 text-white"
                              rows={4}
                              required
                            />
                          </div>
                        </>
                      )}

                      <div>
                        <label className="block text-sm font-medium mb-2">Image URL</label>
                        <Input
                          value={formData.image_url}
                          onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                          className="bg-white/10 border-white/20 text-white"
                          placeholder="https://example.com/image.jpg"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">Tags (comma separated)</label>
                        <Input
                          value={formData.tags.join(", ")}
                          onChange={(e) => handleTagsChange(e.target.value)}
                          className="bg-white/10 border-white/20 text-white"
                          placeholder="tag1, tag2, tag3"
                        />
                      </div>

                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="featured"
                          checked={formData.is_featured}
                          onCheckedChange={(checked) => setFormData({ ...formData, is_featured: !!checked })}
                        />
                        <label htmlFor="featured" className="text-sm font-medium">
                          Featured
                        </label>
                      </div>

                      {formData.is_featured && (
                        <div>
                          <label className="block text-sm font-medium mb-2">Featured Section</label>
                          <Select
                            value={formData.featured_section}
                            onValueChange={(value) => setFormData({ ...formData, featured_section: value })}
                          >
                            <SelectTrigger className="bg-white/10 border-white/20 text-white">
                              <SelectValue placeholder="Select section" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="hero">Hero</SelectItem>
                              <SelectItem value="gallery">Gallery</SelectItem>
                              <SelectItem value="latest">Latest</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      )}

                      <div className="flex space-x-4">
                        <Button type="submit" className="bg-green-500 hover:bg-green-600">
                          {editingItem ? "Update" : "Add"}
                        </Button>
                        <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                          Cancel
                        </Button>
                      </div>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>

              {/* Content Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {(activeTab === "music" ? musicItems : activeTab === "tattoo" ? tattooItems : newsItems).map((item) => (
                  <div key={item.id} className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                    <img
                      src={item.image_url || "/placeholder.svg"}
                      alt={item.title}
                      className="w-full h-40 object-cover rounded-lg mb-4"
                    />
                    <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                    {(item.artist || item.author) && (
                      <p className="text-white/60 text-sm mb-2">by {item.artist || item.author}</p>
                    )}
                    <div className="flex flex-wrap gap-1 mb-2">
                      {(Array.isArray(item.tags) ? item.tags : []).slice(0, 3).map((tag) => (
                        <span key={tag} className="px-2 py-1 bg-white/10 rounded-full text-xs">
                          {tag}
                        </span>
                      ))}
                    </div>
                    {item.is_featured && (
                      <span className="inline-block px-2 py-1 bg-green-500 text-white text-xs rounded-full mb-2">
                        Featured {item.featured_section && `(${item.featured_section})`}
                      </span>
                    )}
                    <div className="flex justify-between items-center">
                      <span className="text-white/40 text-xs">{new Date(item.created_at).toLocaleDateString()}</span>
                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleEdit(item)}
                          className="text-blue-400 hover:text-blue-300"
                        >
                          <Edit size={16} />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleDelete(item.id, activeTab)}
                          className="text-red-400 hover:text-red-300"
                        >
                          <Trash2 size={16} />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Empty state for content */}
              {(activeTab === "music" ? musicItems : activeTab === "tattoo" ? tattooItems : newsItems).length === 0 && (
                <div className="text-center py-12">
                  {activeTab === "music" && <Music className="mx-auto h-12 w-12 text-white/40 mb-4" />}
                  {activeTab === "tattoo" && <ImageIcon className="mx-auto h-12 w-12 text-white/40 mb-4" />}
                  {activeTab === "news" && <Newspaper className="mx-auto h-12 w-12 text-white/40 mb-4" />}
                  <p className="text-white/60">No {activeTab} items yet</p>
                  <p className="text-white/40 text-sm">Click the "Add {activeTab}" button to get started</p>
                </div>
              )}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}
