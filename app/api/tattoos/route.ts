import { type NextRequest, NextResponse } from "next/server"
import { supabaseAdmin } from "../../../lib/supabase"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const style = searchParams.get("style")
    const featured = searchParams.get("featured")
    const tags = searchParams.get("tags")

    let query = supabaseAdmin.from("tattoos").select("*").eq("status", "published")

    if (style && style !== "all") {
      query = query.eq("style", style)
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
    console.error("Error fetching tattoos:", error)
    return NextResponse.json({ error: "Failed to fetch tattoos" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const tattooData = {
      title: body.title,
      artist: body.artist,
      style: body.style,
      description: body.description,
      image_url: body.image_url,
      tags: body.tags || [],
      is_featured: body.is_featured || false,
      featured_section: body.featured_section || null,
      status: "published",
    }

    const { data, error } = await supabaseAdmin.from("tattoos").insert(tattooData).select().single()

    if (error) throw error
    return NextResponse.json(data, { status: 201 })
  } catch (error) {
    console.error("Error creating tattoo:", error)
    return NextResponse.json({ error: "Failed to create tattoo" }, { status: 500 })
  }
}
