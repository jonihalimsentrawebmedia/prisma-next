import {NextRequest, NextResponse} from 'next/server'
import {prisma} from '@/lib/prisma'
import {authGuard} from "@/lib/auth";

type Params = {params: Promise<{id: string}>}

export async function PUT(req: NextRequest, {params}: Params) {
  try {
    const user = authGuard(req)

    if (!user) {
      return NextResponse.json(
        {message: 'Unauthorized'},
        {status: 401}
      )
    }

    const {id} = await params
    const {name, pekerjaan, description, is_publish} = await req.json()

    if (!name || !pekerjaan || !description) {
      return NextResponse.json(
        {message: 'name, pekerjaan, dan description wajib diisi'},
        {status: 400}
      )
    }

    const testimoni = await prisma.testimoni.update({
      where: {id: Number(id)},
      data: {
        name,
        pekerjaan,
        description,
        is_publish: is_publish ?? false,
      },
    })

    return NextResponse.json({
      message: 'Testimoni berhasil diupdate',
      data: testimoni,
    })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      {
        message: 'Internal server error',
        ...(process.env.NODE_ENV === 'development' && {
          error: error instanceof Error ? error.message : String(error),
        }),
      },
      {status: 500}
    )
  }
}

export async function DELETE(req: NextRequest, {params}: Params) {
  try {
    const user = authGuard(req)

    if (!user) {
      return NextResponse.json(
        {message: 'Unauthorized'},
        {status: 401}
      )
    }

    const {id} = await params

    await prisma.testimoni.delete({
      where: {id: Number(id)},
    })

    return NextResponse.json({
      message: 'Testimoni berhasil dihapus',
    })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      {message: 'Internal server error'},
      {status: 500}
    )
  }
}
