import {prisma} from '@/lib/prisma'
import {NextRequest, NextResponse} from 'next/server'
import {authGuard} from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const user = authGuard(req)
    const body = await req.json()
    const {icon, title, description} = body
    
    if (!user) {
      return NextResponse.json(
        {message: 'Unauthorized'},
        {status: 401}
      )
    }
    
    if (!icon || !title || !description) {
      return NextResponse.json(
        {message: 'icon, title, dan description wajib diisi'},
        {status: 400}
      )
    }
    
    const feature = await prisma.feature.create({
      data: {
        icon,
        title,
        description,
      },
    })
    
    return NextResponse.json(
      {
        message: 'Feature berhasil dibuat',
        data: feature,
      },
      {status: 201}
    )
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      {message: 'Terjadi kesalahan server'},
      {status: 500}
    )
  }
}

export async function GET(req: NextRequest) {
  try {
    const user = authGuard(req)
    
    if (!user) {
      return NextResponse.json({
        message: 'Unauthorized',
        status: 401
      })
    }
    
    const features = await prisma.feature.findMany()
    return NextResponse.json({
      status: 200,
      data: features
    })
    
    
  } catch (error) {
    console.log(error)
    return NextResponse.json({
      message: 'Terjadi kesalahan server',
      status: 500
    })
  }
}