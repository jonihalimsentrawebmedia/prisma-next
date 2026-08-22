import {NextRequest, NextResponse} from 'next/server'
import {authGuard} from '@/lib/auth'
import cloudinary from '@/lib/cloudinary'

const MAX_SIZE = 5 * 1024 * 1024
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp']

type UploadResult = {secure_url: string; public_id: string}

function uploadStream(buffer: Buffer): Promise<UploadResult> {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {folder: 'prisma-rental'},
      (error, result) => {
        if (error || !result) {
          return reject(error ?? new Error('Upload gagal'))
        }
        resolve({
          secure_url: result.secure_url,
          public_id: result.public_id,
        })
      }
    )
    stream.end(buffer)
  })
}

export async function POST(req: NextRequest) {
  try {
    const user = authGuard(req)

    if (!user) {
      return NextResponse.json(
        {message: 'Unauthorized'},
        {status: 401}
      )
    }

    const contentType = req.headers.get('content-type') ?? ''
    let buffer: Buffer
    let mimeType: string

    if (contentType.includes('multipart/form-data')) {
      const formData = await req.formData()
      const file = formData.get('file')

      if (!(file instanceof File)) {
        return NextResponse.json(
          {message: 'Field "file" wajib diisi'},
          {status: 400}
        )
      }

      mimeType = file.type
      buffer = Buffer.from(await file.arrayBuffer())
    } else {
      mimeType = contentType
      buffer = Buffer.from(await req.arrayBuffer())
    }

    if (!ALLOWED_TYPES.includes(mimeType)) {
      return NextResponse.json(
        {message: 'Format gambar harus JPEG, PNG, atau WebP'},
        {status: 400}
      )
    }

    if (buffer.length === 0) {
      return NextResponse.json(
        {message: 'File kosong'},
        {status: 400}
      )
    }

    if (buffer.length > MAX_SIZE) {
      return NextResponse.json(
        {message: 'Ukuran gambar maksimal 5MB'},
        {status: 400}
      )
    }

    const result = await uploadStream(buffer)

    return NextResponse.json(
      {
        message: 'Upload berhasil',
        url: result.secure_url,
        publicId: result.public_id,
      },
      {status: 201}
    )
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      {
        message: 'Internal server error',
        ...(process.env.NODE_ENV === 'development' && {
          error: error instanceof Error ? error.message : JSON.stringify(error),
        }),
      },
      {status: 500}
    )
  }
}
