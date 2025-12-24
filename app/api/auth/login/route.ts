import {NextResponse} from 'next/server'
import {prisma} from '@/lib/prisma'
import bcrypt from 'bcrypt'
import {signJwt} from "@/lib/jwt";


export async function POST(req: Request) {
  try {
    const {email, password} = await req.json()
    
    if (!email || !password) {
      return NextResponse.json(
        {message: 'Email dan password wajib diisi'},
        {status: 400}
      )
    }
    
    const user = await prisma.user.findUnique({
      where: {email},
    })
    
    if (!user) {
      return NextResponse.json(
        {message: 'Email atau password salah'},
        {status: 401}
      )
    }
    
    
    const isPasswordValid = await bcrypt.compare(password, user.password)
    
    if (!isPasswordValid) {
      return NextResponse.json(
        {message: 'password salah'},
        {status: 401}
      )
    }
    
    const token = signJwt({
      id: user.id,
      email: user.email,
      name: user.name,
      password: user?.password
    })
    
    return NextResponse.json({
      message: 'Login berhasil',
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        phone: user.phone,
        token: token
      },
    })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      {message: 'Terjadi kesalahan server'},
      {status: 500}
    )
  }
}
