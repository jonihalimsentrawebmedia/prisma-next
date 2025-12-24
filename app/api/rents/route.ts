import {NextRequest, NextResponse} from 'next/server'
import {prisma} from '@/lib/prisma'
import {authGuard} from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const user = authGuard(req)
    const body = await req.json()
    const {type, price, is_nego, carId} = body
    
    if (!user) {
      return NextResponse.json(
        {message: 'Unauthorized'},
        {status: 401}
      )
    }
    
    if (!type || !price || carId === undefined) {
      return NextResponse.json(
        {message: 'type, price, dan carId wajib diisi'},
        {status: 400}
      )
    }
    
    const car = await prisma.car.findUnique({
      where: {id: carId},
    })
    
    if (!car) {
      return NextResponse.json(
        {message: 'Car tidak ditemukan'},
        {status: 404}
      )
    }
    
    const rent = await prisma.rent.create({
      data: {
        type,
        price,
        is_nego: is_nego ?? false,
        carId,
      },
      include: {
        car: true,
      },
    })
    
    return NextResponse.json(
      {
        message: 'Rent berhasil dibuat',
        data: rent,
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
  
  const rents = await prisma.rent.findMany({
    include: {
      car: true,
    }
  })
  return NextResponse.json(rents)
  
  
}