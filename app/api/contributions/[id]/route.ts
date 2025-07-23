import { type NextRequest, NextResponse } from "next/server"
import { supabaseAdmin } from "../../../../lib/supabase"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { data, error } = await supabaseAdmin.from("contributions").select("*").eq("id", params.id).single()

    if (error) {
      console.error("Error fetching contribution:", error)
      return NextResponse.json({ error: "Contribution not found" }, { status: 404 })
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error("Error fetching contribution:", error)
    return NextResponse.json({ error: "Failed to fetch contribution" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await request.json()

    const { data, error } = await supabaseAdmin
      .from("contributions")
      .update({
        status: body.status,
        updated_at: new Date().toISOString(),
      })
      .eq("id", params.id)
      .select()
      .single()

    if (error) {
      console.error("Error updating contribution:", error)
      return NextResponse.json({ error: "Failed to update contribution" }, { status: 500 })
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error("Error updating contribution:", error)
    return NextResponse.json({ error: "Failed to update contribution" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { error } = await supabaseAdmin.from("contributions").delete().eq("id", params.id)

    if (error) {
      console.error("Error deleting contribution:", error)
      return NextResponse.json({ error: "Failed to delete contribution" }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting contribution:", error)
    return NextResponse.json({ error: "Failed to delete contribution" }, { status: 500 })
  }
}
