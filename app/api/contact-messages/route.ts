import { type NextRequest, NextResponse } from "next/server"
import { supabaseAdmin } from "../../../lib/supabase"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get("status")

    let query = supabaseAdmin.from("contact_messages").select("*")

    if (status && status !== "all") {
      query = query.eq("status", status)
    }

    const { data, error } = await query.order("created_at", { ascending: false })

    if (error) {
      console.error("Error fetching contact messages:", error)
      // Return empty array if table doesn't exist
      return NextResponse.json([])
    }

    return NextResponse.json(data || [])
  } catch (error) {
    console.error("Error fetching contact messages:", error)
    return NextResponse.json([])
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const messageData = {
      name: body.name,
      email: body.email,
      subject: body.subject,
      message: body.message,
      status: "unread",
    }

    const { data, error } = await supabaseAdmin.from("contact_messages").insert(messageData).select().single()

    if (error) {
      console.error("Error creating contact message:", error)
      return NextResponse.json({ error: "Failed to create message" }, { status: 500 })
    }

    return NextResponse.json(data, { status: 201 })
  } catch (error) {
    console.error("Error creating contact message:", error)
    return NextResponse.json({ error: "Failed to create message" }, { status: 500 })
  }
}
