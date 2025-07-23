import { type NextRequest, NextResponse } from "next/server"
import { supabaseAdmin } from "../../../lib/supabase"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get("category")
    const featured = searchParams.get("featured")
    const tags = searchParams.get("tags")

    let query = supabaseAdmin.from("news").select("*").eq("status", "published")

    if (category && category !== "all") {
      query = query.eq("category", category)
    }

    if (featured === "true") {
      query = query.eq("is_featured", true)
    }

    if (tags) {
      const tagArray = tags.split(",").map((tag) => tag.trim())
      query = query.overlaps("tags", tagArray)
    }

    const { data, error } = await query.order("created_at", { ascending: false })

    if (error) throw error
    return NextResponse.json(data || [])
  } catch (error) {
    console.error("Error fetching news:", error)
    return NextResponse.json({ error: "Failed to fetch news" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const newsData = {
      title: body.title,
      author: body.author,
      category: body.category,
      excerpt: body.excerpt,
      content: body.content,
      image_url: body.image_url,
      tags: body.tags || [],
      is_featured: body.is_featured || false,
      featured_section: body.featured_section || null,
      status: "published",
    }

    const { data, error } = await supabaseAdmin.from("news").insert(newsData).select().single()

    if (error) throw error
    return NextResponse.json(data, { status: 201 })
  } catch (error) {
    console.error("Error creating news:", error)
    return NextResponse.json({ error: "Failed to create news" }, { status: 500 })
  }
}
