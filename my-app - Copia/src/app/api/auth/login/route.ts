
import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"

export async function POST(request: Request) {
  const { email, password } = await request.json()

  const user = await prisma.user.findUnique({ where: { email } })

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return NextResponse.json({ message: "Credenciais inválidas" }, { status: 401 })
  }

  const { password: _, ...userWithoutPassword } = user
  return NextResponse.json(userWithoutPassword)
}
