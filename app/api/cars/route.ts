import {NextRequest, NextResponse} from 'next/server'
import {prisma} from '@/lib/prisma'
import {authGuard} from "@/lib/auth";


export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const user = authGuard(req)
    const {name, seat, transmisi, type, image} = body
    
    if (!user) {
      return NextResponse.json(
        {message: 'Unauthorized'},
        {status: 401}
      )
    }
    
    // Validasi sederhana
    if (!name || !seat || !transmisi || !type || !image) {
      return NextResponse.json(
        {message: 'Semua field wajib diisi'},
        {status: 400}
      )
    }
    
    const car = await prisma.car.create({
      data: {
        name,
        seat,
        transmisi,
        type,
        image,
      },
    })
    
    return NextResponse.json(
      {
        message: 'Car berhasil dibuat',
        data: car,
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
  const cars = await prisma.car.findMany({
    include: {
      rent: true
    }
  })
  return NextResponse.json(cars)
  
}