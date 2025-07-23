import { type NextRequest, NextResponse } from "next/server"
import { supabaseAdmin } from "../../../lib/supabase"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const genre = searchParams.get("genre")
    const featured = searchParams.get("featured")
    const tags = searchParams.get("tags")

    let query = supabaseAdmin.from("music").select("*").eq("status", "published")

    if (genre && genre !== "all") {
      query = query.eq("genre", genre)
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
    console.error("Error fetching music:", error)
    return NextResponse.json({ error: "Failed to fetch music" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const musicData = {
      title: body.title,
      artist: body.artist,
      genre: body.genre,
      description: body.description,
      image_url: body.image_url,
      spotify_url: body.spotify_url,
      youtube_url: body.youtube_url,
      tags: body.tags || [],
      is_featured: body.is_featured || false,
      featured_section: body.featured_section || null,
      status: "published",
    }

    const { data, error } = await supabaseAdmin.from("music").insert(musicData).select().single()

    if (error) throw error
    return NextResponse.json(data, { status: 201 })
  } catch (error) {
    console.error("Error creating music:", error)
    return NextResponse.json({ error: "Failed to create music" }, { status: 500 })
  }
}
