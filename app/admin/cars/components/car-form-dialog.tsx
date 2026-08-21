"use client"

import {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form} from "@/components/ui/form";
import {Button} from "@/components/ui/button";
import TextInput from "@/components/common/input";
import {CarResolver, type CarResolverType} from "@/app/admin/cars/types/resolver";
import {X} from "lucide-react";

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

const CarFormDialog = ({open, initialData, onClose, onSubmit}: CarFormDialogProps) => {
  const [loading, setLoading] = useState(false)

  const form = useForm<CarResolverType>({
    resolver: zodResolver(CarResolver),
    defaultValues: emptyValues,
  })

  useEffect(() => {
    if (open) {
      form.reset(initialData ?? emptyValues)
    }
  }, [open, initialData, form])

  if (!open) return null

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
            <TextInput
              form={form}
              name={'image'}
              label={'URL Gambar'}
              placeholder={'Masukkan URL gambar'}
              isRequired
            />

            <div className="flex justify-end gap-2 pt-2">
              <Button type="button" variant="outline" onClick={onClose}>
                Batal
              </Button>
              <Button type="submit" disabled={loading}>
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
