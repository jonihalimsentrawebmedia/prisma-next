import {NextRequest} from 'next/server'
import {verifyJwt} from '@/lib/jwt'

export function authGuard(req: NextRequest) {
  const authHeader = req.headers.get('authorization')
  
  if (!authHeader) {
    return null
  }
  
  const [type, token] = authHeader.split(' ')
  
  if (type !== 'Bearer' || !token) {
    return null
  }
  
  return verifyJwt(token)
}
