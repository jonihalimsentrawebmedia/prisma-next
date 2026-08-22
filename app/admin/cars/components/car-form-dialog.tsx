"use client"

import {useEffect, useRef, useState} from "react";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form} from "@/components/ui/form";
import {Button} from "@/components/ui/button";
import TextInput from "@/components/common/input";
import AxiosClient from "@/provider/axios";
import {CarResolver, type CarResolverType} from "@/app/admin/cars/types/resolver";
import {ImagePlus, Loader2, X} from "lucide-react";

export type Car = {
  id: number
  name: string
  seat: string
  transmisi: string
  type: string
  image: string
}

type CarFormDialogProps = {
  open: boolean
  initialData: Car | null
  onClose: () => void
  onSubmit: (values: CarResolverType) => Promise<void>
}

const emptyValues: CarResolverType = {
  name: '',
  seat: '',
  transmisi: '',
  type: '',
  image: '',
}

const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp']
const MAX_SIZE = 4 * 1024 * 1024

const CarFormDialog = ({open, initialData, onClose, onSubmit}: CarFormDialogProps) => {
  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [uploadError, setUploadError] = useState('')
  const fileRef = useRef<HTMLInputElement>(null)

  const form = useForm<CarResolverType>({
    resolver: zodResolver(CarResolver),
    defaultValues: emptyValues,
  })

  const image = form.watch('image')

  useEffect(() => {
    if (open) {
      setUploadError('')
      form.reset(initialData ?? emptyValues)
    }
  }, [open, initialData, form])

  if (!open) return null

  const handleUpload = async (file: File) => {
    setUploadError('')

    if (!ALLOWED_TYPES.includes(file.type)) {
      setUploadError('Format gambar harus JPEG, PNG, atau WebP')
      return
    }

    if (file.size > MAX_SIZE) {
      setUploadError('Ukuran gambar maksimal 4MB')
      return
    }

    setUploading(true)
    try {
      const formData = new FormData()
      formData.append('file', file)

      const res = await AxiosClient.post('/upload', formData)
      form.setValue('image', res.data.url, {shouldValidate: true})
    } catch (err) {
      console.log(err)
      setUploadError('Gagal mengupload gambar, coba lagi')
    } finally {
      setUploading(false)
    }
  }

  const handle = async (values: CarResolverType) => {
    setLoading(true)
    try {
      await onSubmit(values)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="max-h-[90dvh] w-full max-w-3xl overflow-y-auto rounded-lg bg-white shadow-lg">
        <div className="flex items-center justify-between border-b px-5 py-4">
          <h2 className="text-lg font-semibold">
            {initialData ? 'Edit Mobil' : 'Tambah Mobil'}
          </h2>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
            <X className="size-5"/>
          </button>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handle)} className="space-y-4 px-5 py-5">
            <TextInput
              form={form}
              name={'name'}
              label={'Nama Mobil'}
              placeholder={'Masukkan nama mobil'}
              isRequired
            />
            <TextInput
              form={form}
              name={'seat'}
              label={'Kursi'}
              placeholder={'Contoh: 4 Kursi'}
              isRequired
            />
            <TextInput
              form={form}
              name={'transmisi'}
              label={'Transmisi'}
              placeholder={'Contoh: Manual / Matic'}
              isRequired
            />
            <TextInput
              form={form}
              name={'type'}
              label={'Tipe'}
              placeholder={'Contoh: MPV / SUV'}
              isRequired
            />

            <div className="flex flex-col gap-2">
              <label className="text-gray-600">
                Gambar <span className="text-red-500">*</span>
              </label>

              <input
                ref={fileRef}
                type="file"
                accept={ALLOWED_TYPES.join(',')}
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0]
                  if (file) handleUpload(file)
                  e.target.value = ''
                }}
              />

              {image ? (
                <div className="group relative w-fit overflow-hidden rounded-md border">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={image}
                    alt="Preview gambar mobil"
                    className="h-44 w-full object-contain"
                  />
                  <div className="absolute inset-x-0 bottom-0 flex justify-end gap-2 bg-gradient-to-t from-black/60 to-transparent p-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <Button
                      type="button"
                      variant="secondary"
                      size="sm"
                      onClick={() => fileRef.current?.click()}
                      disabled={uploading}
                    >
                      Ganti
                    </Button>
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      onClick={() => form.setValue('image', '', {shouldValidate: true})}
                    >
                      Hapus
                    </Button>
                  </div>
                  {uploading && (
                    <div
                      className="absolute inset-0 flex items-center justify-center bg-black/50"
                    >
                      <Loader2 className="size-6 animate-spin text-white"/>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => fileRef.current?.click()}
                  disabled={uploading}
                  className="flex h-32 w-full flex-col items-center justify-center gap-2 rounded-md border border-dashed text-sm text-muted-foreground transition-colors hover:border-primary/50 hover:bg-primary/5 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {uploading ? (
                    <>
                      <Loader2 className="size-6 animate-spin text-primary"/>
                      Mengunggah...
                    </>
                  ) : (
                    <>
                      <ImagePlus className="size-6 text-primary"/>
                      Klik untuk pilih gambar
                      <span className="text-xs">JPEG, PNG, atau WebP — maksimal 4MB</span>
                    </>
                  )}
                </button>
              )}

              {uploadError && <p className="text-sm text-red-500">{uploadError}</p>}
              {form.formState.errors.image && (
                <p className="text-sm text-red-500">{form.formState.errors.image.message}</p>
              )}
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <Button type="button" variant="outline" onClick={onClose}>
                Batal
              </Button>
              <Button type="submit" disabled={loading || uploading}>
                {initialData ? 'Update' : 'Simpan'}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  )
}

export default CarFormDialog
