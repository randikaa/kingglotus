import { type NextRequest, NextResponse } from "next/server"
import { supabaseAdmin } from "../../../lib/supabase"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // First, try to insert into the contact_messages table
    try {
      const { data, error } = await supabaseAdmin
        .from("contact_messages")
        .insert({
          name: body.name,
          email: body.email,
          subject: body.subject || "Contact Form Submission",
          message: body.message,
          status: "unread",
        })
        .select()
        .single()

      if (!error) {
        return NextResponse.json({ success: true, data })
      }
    } catch (err) {
      console.log("Contact messages table might not exist yet, continuing with legacy handling")
    }

    // Legacy handling - store in a different table or format
    const { data, error } = await supabaseAdmin.from("contacts").insert({
      name: body.name,
      email: body.email,
      message: body.message,
    })

    if (error) throw error
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error submitting contact form:", error)
    return NextResponse.json({ error: "Failed to submit form" }, { status: 500 })
  }
}
