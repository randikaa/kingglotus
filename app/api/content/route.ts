import { type NextRequest, NextResponse } from "next/server"
import { contentOperations, getFeaturedContent, getContentByTags, getAllAvailableTags } from "../../../lib/database"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const type = searchParams.get("type") as "music" | "tattoo" | "news" | null
    const featured = searchParams.get("featured")
    const featuredSection = searchParams.get("featuredSection")
    const tags = searchParams.get("tags")?.split(",").filter(Boolean)
    const search = searchParams.get("search")
    const getTags = searchParams.get("getTags")

    // Get all available tags
    if (getTags === "true") {
      const allTags = await getAllAvailableTags()
      return NextResponse.json({ tags: allTags })
    }

    // Get all featured content for homepage
    if (featured === "true" && !type) {
      const featuredContent = await getFeaturedContent()
      return NextResponse.json(featuredContent)
    }

    // Get content by tags across all types
    if (tags && tags.length > 0 && !type) {
      const content = await getContentByTags(tags)
      return NextResponse.json(content)
    }

    // Get specific content type
    if (!type) {
      return NextResponse.json({ error: "Content type is required" }, { status: 400 })
    }

    const service = contentOperations[type]
    let content

    if (search) {
      const searchFields =
        type === "music"
          ? ["title", "artist", "album"]
          : type === "tattoo"
            ? ["title", "artist", "style"]
            : ["title", "excerpt", "content", "author"]

      content = await service.search(search, searchFields)
    } else if (featuredSection) {
      content = await service.getByFeaturedSection(featuredSection)
    } else if (featured === "true") {
      content = await service.getFeatured()
    } else if (tags && tags.length > 0) {
      content = await service.getByTags(tags)
    } else {
      const filters: any = { status: "published" }

      // Add type-specific filters
      if (type === "music") {
        const genre = searchParams.get("genre")
        if (genre && genre !== "all") filters.genre = genre
      } else if (type === "tattoo") {
        const style = searchParams.get("style")
        if (style && style !== "all") filters.style = style
      } else if (type === "news") {
        const category = searchParams.get("category")
        if (category && category !== "all") filters.category = category
      }

      content = await service.getAll(filters)
    }

    return NextResponse.json(content)
  } catch (error) {
    console.error("Error fetching content:", error)
    return NextResponse.json({ error: "Failed to fetch content" }, { status: 500 })
  }
}
