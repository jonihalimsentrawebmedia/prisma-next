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
    const {name, seat, transmisi, type, image} = await req.json()

    if (!name || !seat || !transmisi || !type || !image) {
      return NextResponse.json(
        {message: 'Semua field wajib diisi'},
        {status: 400}
      )
    }

    const car = await prisma.car.update({
      where: {id: Number(id)},
      data: {name, seat, transmisi, type, image},
    })

    return NextResponse.json({
      message: 'Car berhasil diupdate',
      data: car,
    })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      {message: 'Internal server error'},
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

    await prisma.car.delete({
      where: {id: Number(id)},
    })

    return NextResponse.json({
      message: 'Car berhasil dihapus',
    })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      {message: 'Internal server error'},
      {status: 500}
    )
  }
}
