import {NextRequest, NextResponse} from 'next/server'
import {prisma} from '@/lib/prisma'
import {authGuard} from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const user = authGuard(req)
    const body = await req.json()
    const {price, carId} = body

    if (!user) {
      return NextResponse.json(
        {message: 'Unauthorized'},
        {status: 401}
      )
    }

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

    const airPort = await prisma.airPort.create({
      data: {
        price,
        carId,
      },
      include: {
        car: true,
      },
    })

    return NextResponse.json(
      {
        message: 'AirPort berhasil dibuat',
        data: airPort,
      },
      {status: 201}
    )
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

export async function GET(req: NextRequest) {
  const user = authGuard(req)

  if (!user) {
    return NextResponse.json(
      {message: 'Unauthorized'},
      {status: 401}
    )
  }

  const airPorts = await prisma.airPort.findMany({
    include: {
      car: true,
    }
  })
  return NextResponse.json({
    status: 200,
    data: airPorts
  })
}
