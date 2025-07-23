import { supabaseAdmin } from "./supabase"
import type { Music, Tattoo, News } from "./supabase"

// Generic CRUD operations
export class DatabaseService<T> {
  constructor(private tableName: string) {}

  async getAll(filters?: Record<string, any>): Promise<T[]> {
    let query = supabaseAdmin.from(this.tableName).select("*")

    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          if (key === "tags" && Array.isArray(value)) {
            // Filter by tags using array overlap
            query = query.overlaps("tags", value)
          } else {
            query = query.eq(key, value)
          }
        }
      })
    }

    const { data, error } = await query.order("created_at", { ascending: false })

    if (error) throw error
    return data || []
  }

  async getById(id: string): Promise<T | null> {
    const { data, error } = await supabaseAdmin.from(this.tableName).select("*").eq("id", id).single()

    if (error) throw error
    return data
  }

  async create(item: Omit<T, "id" | "created_at" | "updated_at">): Promise<T> {
    const { data, error } = await supabaseAdmin.from(this.tableName).insert(item).select().single()

    if (error) throw error
    return data
  }

  async update(id: string, updates: Partial<T>): Promise<T> {
    const { data, error } = await supabaseAdmin.from(this.tableName).update(updates).eq("id", id).select().single()

    if (error) throw error
    return data
  }

  async delete(id: string): Promise<void> {
    const { error } = await supabaseAdmin.from(this.tableName).delete().eq("id", id)

    if (error) throw error
  }

  async search(searchTerm: string, searchFields: string[]): Promise<T[]> {
    let query = supabaseAdmin.from(this.tableName).select("*")

    // Build OR conditions for search
    const orConditions = searchFields.map((field) => `${field}.ilike.%${searchTerm}%`).join(",")
    query = query.or(orConditions)

    const { data, error } = await query.order("created_at", { ascending: false })

    if (error) throw error
    return data || []
  }

  async getByTags(tags: string[]): Promise<T[]> {
    const { data, error } = await supabaseAdmin
      .from(this.tableName)
      .select("*")
      .overlaps("tags", tags)
      .eq("status", "published")
      .order("created_at", { ascending: false })

    if (error) throw error
    return data || []
  }

  async getFeatured(): Promise<T[]> {
    const { data, error } = await supabaseAdmin
      .from(this.tableName)
      .select("*")
      .eq("is_featured", true)
      .eq("status", "published")
      .order("created_at", { ascending: false })

    if (error) throw error
    return data || []
  }

  async getByFeaturedSection(section: string): Promise<T[]> {
    const { data, error } = await supabaseAdmin
      .from(this.tableName)
      .select("*")
      .eq("featured_section", section)
      .eq("status", "published")
      .order("created_at", { ascending: false })

    if (error) throw error
    return data || []
  }

  async getAllTags(): Promise<string[]> {
    const { data, error } = await supabaseAdmin.from(this.tableName).select("tags").eq("status", "published")

    if (error) throw error

    // Extract unique tags from all records
    const allTags = data?.flatMap((item) => item.tags || []) || []
    return [...new Set(allTags)].sort()
  }
}

// Service instances
export const musicService = new DatabaseService<Music>("music")
export const tattooService = new DatabaseService<Tattoo>("tattoos")
export const newsService = new DatabaseService<News>("news")

// Content operations with specialized methods
export const contentOperations = {
  music: {
    ...musicService,
    async incrementPlays(id: string): Promise<void> {
      const { error } = await supabaseAdmin.rpc("increment_plays", { music_id: id })
      if (error) throw error
    },
    async toggleLike(id: string, increment: boolean): Promise<void> {
      const { error } = await supabaseAdmin.rpc("toggle_music_like", {
        music_id: id,
        increment_likes: increment,
      })
      if (error) throw error
    },
  },

  tattoo: {
    ...tattooService,
    async incrementViews(id: string): Promise<void> {
      const { error } = await supabaseAdmin.rpc("increment_views", { tattoo_id: id })
      if (error) throw error
    },
    async toggleLike(id: string, increment: boolean): Promise<void> {
      const { error } = await supabaseAdmin.rpc("toggle_tattoo_like", {
        tattoo_id: id,
        increment_likes: increment,
      })
      if (error) throw error
    },
  },

  news: {
    ...newsService,
  },
}

// Get all featured content for homepage
export async function getFeaturedContent() {
  const [featuredMusic, featuredTattoos, featuredNews] = await Promise.all([
    contentOperations.music.getByFeaturedSection("hero"),
    contentOperations.tattoo.getByFeaturedSection("gallery"),
    contentOperations.news.getByFeaturedSection("latest"),
  ])

  return {
    music: featuredMusic,
    tattoos: featuredTattoos,
    news: featuredNews,
  }
}

// Get content by tags across all types
export async function getContentByTags(tags: string[]) {
  const [music, tattoos, news] = await Promise.all([
    contentOperations.music.getByTags(tags),
    contentOperations.tattoo.getByTags(tags),
    contentOperations.news.getByTags(tags),
  ])

  return { music, tattoos, news }
}

// Get all available tags across all content types
export async function getAllAvailableTags() {
  const [musicTags, tattooTags, newsTags] = await Promise.all([
    contentOperations.music.getAllTags(),
    contentOperations.tattoo.getAllTags(),
    contentOperations.news.getAllTags(),
  ])

  const allTags = [...musicTags, ...tattooTags, ...newsTags]
  return [...new Set(allTags)].sort()
}
