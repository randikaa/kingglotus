import { type NextRequest, NextResponse } from "next/server"
import { contentOperations } from "../../../../../../lib/database"

export async function POST(request: NextRequest, { params }: { params: { type: string; id: string } }) {
  try {
    const type = params.type as "music" | "tattoo" | "news"
    const { searchParams } = new URL(request.url)
    const action = searchParams.get("action")

    if (!["music", "tattoo", "news"].includes(type)) {
      return NextResponse.json({ error: "Invalid content type" }, { status: 400 })
    }

    const service = contentOperations[type]

    switch (action) {
      case "play":
        if (type === "music") {
          await service.incrementPlays(params.id)
          return NextResponse.json({ message: "Play count incremented" })
        }
        break

      case "view":
        if (type === "tattoo") {
          await service.incrementViews(params.id)
          return NextResponse.json({ message: "View count incremented" })
        }
        break

      case "like":
        if (type === "music" || type === "tattoo") {
          const { increment } = await request.json()
          await service.toggleLike(params.id, increment)
          return NextResponse.json({ message: "Like toggled" })
        }
        break

      default:
        return NextResponse.json({ error: "Invalid action" }, { status: 400 })
    }

    return NextResponse.json({ error: "Action not supported for this content type" }, { status: 400 })
  } catch (error) {
    console.error(`Error performing action on ${params.type}:`, error)
    return NextResponse.json({ error: "Failed to perform action" }, { status: 500 })
  }
}
