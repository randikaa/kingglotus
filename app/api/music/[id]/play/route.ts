import { type NextRequest, NextResponse } from "next/server"
import { musicOperations } from "../../../../../lib/database"

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await musicOperations.incrementPlays(params.id)
    return NextResponse.json({ message: "Play count incremented" })
  } catch (error) {
    console.error("Error incrementing plays:", error)
    return NextResponse.json({ error: "Failed to increment plays" }, { status: 500 })
  }
}
