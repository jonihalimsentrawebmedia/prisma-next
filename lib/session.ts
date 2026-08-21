import {cookies} from 'next/headers'
import {redirect} from 'next/navigation'
import {verifyJwt} from '@/lib/jwt'

export type SessionUser = {
  id: number
  email: string
  name: string
}

export async function getSessionUser(): Promise<SessionUser> {
  const token = (await cookies()).get('token')?.value

  if (!token) {
    redirect('/login')
  }

  try {
    return verifyJwt<SessionUser>(token as string)
  } catch {
    redirect('/login')
  }
}
