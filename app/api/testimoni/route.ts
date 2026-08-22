import {NextRequest, NextResponse} from 'next/server'
import {prisma} from '@/lib/prisma'
import {authGuard} from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const user = authGuard(req)
    const body = await req.json()
    const {name, pekerjaan, description, is_publish} = body

    if (!user) {
      return NextResponse.json(
        {message: 'Unauthorized'},
        {status: 401}
      )
    }

    if (!name || !pekerjaan || !description) {
      return NextResponse.json(
        {message: 'name, pekerjaan, dan description wajib diisi'},
        {status: 400}
      )
    }

    const testimoni = await prisma.testimoni.create({
      data: {
        name,
        pekerjaan,
        description,
        is_publish: is_publish ?? false,
      },
    })

    return NextResponse.json(
      {
        message: 'Testimoni berhasil dibuat',
        data: testimoni,
      },
      {status: 201}
    )
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      {message: 'Internal server error'},
      {status: 500}
    )
  }
}

export async function GET(req: NextRequest) {
  const user = authGuard(req)

  if (!user) {
    return NextResponse.json(
      {message: 'Unauthorized'},
      {status: 401}
    )
  }

  const testimoni = await prisma.testimoni.findMany({
    orderBy: {id: 'asc'},
  })
  return NextResponse.json({
    status: 200,
    data: testimoni
  })
}
