import { type NextRequest, NextResponse } from "next/server"
import { contentOperations } from "../../../../../lib/database"

export async function GET(request: NextRequest, { params }: { params: { type: string; id: string } }) {
  try {
    const type = params.type as "music" | "tattoo" | "news"

    if (!["music", "tattoo", "news"].includes(type)) {
      return NextResponse.json({ error: "Invalid content type" }, { status: 400 })
    }

    const service = contentOperations[type]
    const content = await service.getById(params.id)

    if (!content) {
      return NextResponse.json({ error: `${type} not found` }, { status: 404 })
    }

    return NextResponse.json(content)
  } catch (error) {
    console.error(`Error fetching ${params.type}:`, error)
    return NextResponse.json({ error: `Failed to fetch ${params.type}` }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { type: string; id: string } }) {
  try {
    const type = params.type as "music" | "tattoo" | "news"

    if (!["music", "tattoo", "news"].includes(type)) {
      return NextResponse.json({ error: "Invalid content type" }, { status: 400 })
    }

    const body = await request.json()
    const service = contentOperations[type]
    const content = await service.update(params.id, body)

    return NextResponse.json(content)
  } catch (error) {
    console.error(`Error updating ${params.type}:`, error)
    return NextResponse.json({ error: `Failed to update ${params.type}` }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { type: string; id: string } }) {
  try {
    const type = params.type as "music" | "tattoo" | "news"

    if (!["music", "tattoo", "news"].includes(type)) {
      return NextResponse.json({ error: "Invalid content type" }, { status: 400 })
    }

    const service = contentOperations[type]
    await service.delete(params.id)

    return NextResponse.json({ message: `${type} deleted successfully` })
  } catch (error) {
    console.error(`Error deleting ${params.type}:`, error)
    return NextResponse.json({ error: `Failed to delete ${params.type}` }, { status: 500 })
  }
}
