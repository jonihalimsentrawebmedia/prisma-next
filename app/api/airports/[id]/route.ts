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
    const {price, carId} = await req.json()

    if (!price || carId === undefined) {
      return NextResponse.json(
        {message: 'price, dan carId wajib diisi'},
        {status: 400}
      )
    }

    const car = await prisma.car.findUnique({
      where: {id: Number(carId)},
    })

    if (!car) {
      return NextResponse.json(
        {message: 'Car tidak ditemukan'},
        {status: 404}
      )
    }

    const airPort = await prisma.airPort.update({
      where: {id: Number(id)},
      data: {
        price,
        carId,
      },
      include: {
        car: true,
      },
    })

    return NextResponse.json({
      message: 'AirPort berhasil diupdate',
      data: airPort,
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

    await prisma.airPort.delete({
      where: {id: Number(id)},
    })

    return NextResponse.json({
      message: 'AirPort berhasil dihapus',
    })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      {message: 'Internal server error'},
      {status: 500}
    )
  }
}
