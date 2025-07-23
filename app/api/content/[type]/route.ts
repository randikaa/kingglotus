import { type NextRequest, NextResponse } from "next/server"
import { contentOperations } from "../../../../lib/database"

export async function POST(request: NextRequest, { params }: { params: { type: string } }) {
  try {
    const type = params.type as "music" | "tattoo" | "news"

    if (!["music", "tattoo", "news"].includes(type)) {
      return NextResponse.json({ error: "Invalid content type" }, { status: 400 })
    }

    const body = await request.json()
    const service = contentOperations[type]
    const content = await service.create(body)

    return NextResponse.json(content, { status: 201 })
  } catch (error) {
    console.error(`Error creating ${params.type}:`, error)
    return NextResponse.json({ error: `Failed to create ${params.type}` }, { status: 500 })
  }
}
