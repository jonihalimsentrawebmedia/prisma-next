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
    const {icon, title, description} = await req.json()

    if (!icon || !title || !description) {
      return NextResponse.json(
        {message: 'icon, title, dan description wajib diisi'},
        {status: 400}
      )
    }

    const feature = await prisma.feature.update({
      where: {id: Number(id)},
      data: {
        icon,
        title,
        description,
      },
    })

    return NextResponse.json({
      message: 'Feature berhasil diupdate',
      data: feature,
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

    await prisma.feature.delete({
      where: {id: Number(id)},
    })

    return NextResponse.json({
      message: 'Feature berhasil dihapus',
    })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      {message: 'Internal server error'},
      {status: 500}
    )
  }
}
