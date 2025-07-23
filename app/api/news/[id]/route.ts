import { type NextRequest, NextResponse } from "next/server"
import { supabaseAdmin } from "../../../../lib/supabase"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { data, error } = await supabaseAdmin.from("news").select("*").eq("id", params.id).single()

    if (error) throw error
    return NextResponse.json(data)
  } catch (error) {
    console.error("Error fetching news:", error)
    return NextResponse.json({ error: "News not found" }, { status: 404 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await request.json()

    const updateData = {
      title: body.title,
      author: body.author,
      category: body.category,
      excerpt: body.excerpt,
      content: body.content,
      image_url: body.image_url,
      tags: body.tags || [],
      is_featured: body.is_featured || false,
      featured_section: body.featured_section || null,
      updated_at: new Date().toISOString(),
    }

    const { data, error } = await supabaseAdmin.from("news").update(updateData).eq("id", params.id).select().single()

    if (error) throw error
    return NextResponse.json(data)
  } catch (error) {
    console.error("Error updating news:", error)
    return NextResponse.json({ error: "Failed to update news" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { error } = await supabaseAdmin.from("news").delete().eq("id", params.id)

    if (error) throw error
    return NextResponse.json({ message: "News deleted successfully" })
  } catch (error) {
    console.error("Error deleting news:", error)
    return NextResponse.json({ error: "Failed to delete news" }, { status: 500 })
  }
}
