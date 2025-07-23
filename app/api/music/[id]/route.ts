import { type NextRequest, NextResponse } from "next/server"
import { supabaseAdmin } from "../../../../lib/supabase"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { data, error } = await supabaseAdmin.from("music").select("*").eq("id", params.id).single()

    if (error) throw error
    return NextResponse.json(data)
  } catch (error) {
    console.error("Error fetching music:", error)
    return NextResponse.json({ error: "Music not found" }, { status: 404 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await request.json()

    const updateData = {
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
      updated_at: new Date().toISOString(),
    }

    const { data, error } = await supabaseAdmin.from("music").update(updateData).eq("id", params.id).select().single()

    if (error) throw error
    return NextResponse.json(data)
  } catch (error) {
    console.error("Error updating music:", error)
    return NextResponse.json({ error: "Failed to update music" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { error } = await supabaseAdmin.from("music").delete().eq("id", params.id)

    if (error) throw error
    return NextResponse.json({ message: "Music deleted successfully" })
  } catch (error) {
    console.error("Error deleting music:", error)
    return NextResponse.json({ error: "Failed to delete music" }, { status: 500 })
  }
}
