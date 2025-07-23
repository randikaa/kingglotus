import { type NextRequest, NextResponse } from "next/server"
import { supabaseAdmin } from "../../../lib/supabase"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get("status")

    let query = supabaseAdmin.from("contributions").select("*")

    if (status && status !== "all") {
      query = query.eq("status", status)
    }

    const { data, error } = await query.order("created_at", { ascending: false })

    if (error) {
      console.error("Error fetching contributions:", error)
      // Return empty array if table doesn't exist
      return NextResponse.json([])
    }

    return NextResponse.json(data || [])
  } catch (error) {
    console.error("Error fetching contributions:", error)
    return NextResponse.json([])
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const contributionData = {
      name: body.name,
      email: body.email,
      mobile: body.mobile,
      category: body.category,
      amount: body.amount,
      currency: body.currency || "USD",
      status: "pending",
    }

    const { data, error } = await supabaseAdmin.from("contributions").insert(contributionData).select().single()

    if (error) {
      console.error("Error creating contribution:", error)
      return NextResponse.json({ error: "Failed to create contribution" }, { status: 500 })
    }

    return NextResponse.json(data, { status: 201 })
  } catch (error) {
    console.error("Error creating contribution:", error)
    return NextResponse.json({ error: "Failed to create contribution" }, { status: 500 })
  }
}
