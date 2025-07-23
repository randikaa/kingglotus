import { NextResponse } from "next/server"
import { contributionOperations } from "../../../../lib/database"

export async function GET() {
  try {
    const stats = await contributionOperations.getStats()
    return NextResponse.json(stats)
  } catch (error) {
    console.error("Error fetching contribution stats:", error)
    return NextResponse.json({ error: "Failed to fetch stats" }, { status: 500 })
  }
}
