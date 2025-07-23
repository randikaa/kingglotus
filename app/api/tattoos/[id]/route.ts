import { type NextRequest, NextResponse } from "next/server"
import { supabaseAdmin } from "../../../../lib/supabase"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { data, error } = await supabaseAdmin.from("tattoos").select("*").eq("id", params.id).single()

    if (error) throw error
    return NextResponse.json(data)
  } catch (error) {
    console.error("Error fetching tattoo:", error)
    return NextResponse.json({ error: "Tattoo not found" }, { status: 404 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await request.json()

    const updateData = {
      title: body.title,
      artist: body.artist,
      style: body.style,
      description: body.description,
      image_url: body.image_url,
      tags: body.tags || [],
      is_featured: body.is_featured || false,
      featured_section: body.featured_section || null,
      updated_at: new Date().toISOString(),
    }

    const { data, error } = await supabaseAdmin.from("tattoos").update(updateData).eq("id", params.id).select().single()

    if (error) throw error
    return NextResponse.json(data)
  } catch (error) {
    console.error("Error updating tattoo:", error)
    return NextResponse.json({ error: "Failed to update tattoo" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { error } = await supabaseAdmin.from("tattoos").delete().eq("id", params.id)

    if (error) throw error
    return NextResponse.json({ message: "Tattoo deleted successfully" })
  } catch (error) {
    console.error("Error deleting tattoo:", error)
    return NextResponse.json({ error: "Failed to delete tattoo" }, { status: 500 })
  }
}
