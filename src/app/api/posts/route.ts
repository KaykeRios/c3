
import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  const posts = await prisma.post.findMany({
    include: {
      author: {
        select: {
          id: true,
          name: true,
          email: true
        }
      }
    },
    orderBy: {
      createdAt: "desc"
    }
  })

  return NextResponse.json(posts)
}
