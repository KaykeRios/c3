
import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { postSchema } from "@/lib/validators/postSchema"

export async function POST(request: Request) {
  const body = await request.json()
  const parsed = postSchema.safeParse(body)

  if (!parsed.success) {
    return NextResponse.json({ errors: parsed.error.flatten().fieldErrors }, { status: 400 })
  }

  const { title, content, authorId } = parsed.data

  if (!title || !content || !authorId) {
    return NextResponse.json({ message: "Dados incompletos" }, { status: 400 })
  }

  const post = await prisma.post.create({
    data: {
      title,
      content,
      authorId
    }
  })

  return NextResponse.json(post)
}
