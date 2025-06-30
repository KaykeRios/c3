
import { prisma } from "@/lib/prisma"
import { NextRequest, NextResponse } from "next/server"

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const postId = parseInt(params.id)
  const { title, content } = await request.json()

  if (!title || !content) {
    return NextResponse.json({ message: "Dados incompletos" }, { status: 400 })
  }

  const updated = await prisma.post.update({
    where: { id: postId },
    data: { title, content }
  })

  return NextResponse.json(updated)
}
