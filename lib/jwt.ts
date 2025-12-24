// lib/jwt.ts
import jwt, {SignOptions} from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET as string

if (!JWT_SECRET) {
  throw new Error('JWT_SECRET tidak ditemukan di environment variable')
}

const signOptions: SignOptions = {
  expiresIn: '1d',
}

export function signJwt(payload: object) {
  return jwt.sign(payload, JWT_SECRET, signOptions)
}

export function verifyJwt<T>(token: string): T {
  return jwt.verify(token, JWT_SECRET) as T
}
