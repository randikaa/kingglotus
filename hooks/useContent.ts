"use client"

import { useState, useEffect } from "react"
import type { Music, Tattoo, News, ContentType } from "../lib/supabase"

interface UseContentOptions {
  type?: ContentType
  featured?: boolean
  featuredSection?: string
  tags?: string[]
  search?: string
  filters?: Record<string, any>
}

interface ContentData {
  music?: Music[]
  tattoos?: Tattoo[]
  news?: News[]
}

export function useContent(options: UseContentOptions = {}) {
  const [data, setData] = useState<ContentData | Music[] | Tattoo[] | News[] | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchContent = async () => {
      try {
        setLoading(true)
        setError(null)

        const params = new URLSearchParams()

        if (options.type) params.append("type", options.type)
        if (options.featured) params.append("featured", "true")
        if (options.featuredSection) params.append("featuredSection", options.featuredSection)
        if (options.tags && options.tags.length > 0) params.append("tags", options.tags.join(","))
        if (options.search) params.append("search", options.search)

        // Add type-specific filters
        if (options.filters) {
          Object.entries(options.filters).forEach(([key, value]) => {
            if (value !== undefined && value !== null) {
              params.append(key, value.toString())
            }
          })
        }

        const response = await fetch(`/api/content?${params.toString()}`)

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        const result = await response.json()
        setData(result)
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred")
      } finally {
        setLoading(false)
      }
    }

    fetchContent()
  }, [
    options.type,
    options.featured,
    options.featuredSection,
    options.tags?.join(","),
    options.search,
    JSON.stringify(options.filters),
  ])

  return { data, loading, error, refetch: () => setLoading(true) }
}

export function useContentTags() {
  const [tags, setTags] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchTags = async () => {
      try {
        setLoading(true)
        setError(null)

        const response = await fetch("/api/content?getTags=true")

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        const result = await response.json()
        setTags(result.tags || [])
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred")
      } finally {
        setLoading(false)
      }
    }

    fetchTags()
  }, [])

  return { tags, loading, error }
}

export function useContentMutation() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const createContent = async (type: ContentType, data: any) => {
    setLoading(true)
    setError(null)

    try {
      const response = await fetch(`/api/content/${type}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      return await response.json()
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "An error occurred"
      setError(errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const updateContent = async (type: ContentType, id: string, data: any) => {
    setLoading(true)
    setError(null)

    try {
      const response = await fetch(`/api/content/${type}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      return await response.json()
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "An error occurred"
      setError(errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const deleteContent = async (type: ContentType, id: string) => {
    setLoading(true)
    setError(null)

    try {
      const response = await fetch(`/api/content/${type}/${id}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      return await response.json()
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "An error occurred"
      setError(errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const performAction = async (type: ContentType, id: string, action: string, data?: any) => {
    setLoading(true)
    setError(null)

    try {
      const response = await fetch(`/api/content/${type}/${id}/action?action=${action}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: data ? JSON.stringify(data) : undefined,
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      return await response.json()
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "An error occurred"
      setError(errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }

  return {
    loading,
    error,
    createContent,
    updateContent,
    deleteContent,
    performAction,
  }
}
