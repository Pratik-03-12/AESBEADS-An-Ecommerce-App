import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function GET() {
  const session = await getServerSession(authOptions)
  if (!session?.user?.email) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: { id: true, name: true, email: true, phone: true, image: true }
  })

  return NextResponse.json({ user })
}

export async function PUT(request: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.email) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
  }

  const { name, phone } = await request.json()

  const user = await prisma.user.update({
    where: { email: session.user.email },
    data: { name, phone }
  })

  return NextResponse.json({ message: "Profile updated", user: { id: user.id, name: user.name, email: user.email, phone: user.phone, image: user.image } })
}
