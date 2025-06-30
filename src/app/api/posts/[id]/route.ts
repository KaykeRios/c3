import { prisma } from "@/lib/prisma"
import { NextRequest, NextResponse } from "next/server"

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const postId = parseInt(params.id)

  const post = await prisma.post.findUnique({
    where: { id: postId },
    include: {
      author: {
        select: {
          name: true,
          email: true,
        }
      }
    }
  })

  if (!post) {
    return NextResponse.json({ message: "Post não encontrado" }, { status: 404 })
  }

  return NextResponse.json(post)
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const postId = parseInt(params.id)

  try {
    await prisma.post.delete({ where: { id: postId } })
    return NextResponse.json({ message: "Post deletado com sucesso" })
  } catch (err) {
    return NextResponse.json({ message: "Erro ao deletar post" }, { status: 500 })
  }
}
