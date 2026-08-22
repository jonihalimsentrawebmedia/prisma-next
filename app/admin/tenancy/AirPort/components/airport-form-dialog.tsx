"use client"

import {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Form} from "@/components/ui/form";
import {Button} from "@/components/ui/button";
import CurrencyInput from "@/components/common/currency-input";
import {AirPortResolver, type AirPortResolverType} from "@/app/admin/tenancy/AirPort/types/resolver";
import type {Car} from "@/app/admin/cars/components/car-form-dialog";
import {X} from "lucide-react";

export type AirPort = {
  id: number
  price: number
  carId: number
  car: Car
}

type AirPortFormDialogProps = {
  open: boolean
  initialData: AirPort | null
  cars: Car[]
  onClose: () => void
  onSubmit: (values: AirPortResolverType) => Promise<void>
}

const emptyValues: AirPortResolverType = {
  price: '',
  carId: '',
}

const selectClassName =
  'flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50'

const AirPortFormDialog = ({open, initialData, cars, onClose, onSubmit}: AirPortFormDialogProps) => {
  const [loading, setLoading] = useState(false)

  const form = useForm<AirPortResolverType>({
    resolver: zodResolver(AirPortResolver),
    defaultValues: emptyValues,
  })

  useEffect(() => {
    if (open) {
      form.reset(
        initialData
          ? {
              price: String(initialData.price),
              carId: String(initialData.carId),
            }
          : emptyValues
      )
    }
  }, [open, initialData, form])

  if (!open) return null

  const handle = async (values: AirPortResolverType) => {
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
            {initialData ? 'Edit Airport' : 'Tambah Airport'}
          </h2>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
            <X className="size-5"/>
          </button>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handle)} className="space-y-4 px-5 py-5">
            <FormField
              control={form.control}
              name={'carId'}
              render={({field}) => (
                <FormItem className="flex flex-col gap-2">
                  <FormLabel className="text-gray-600">
                    Mobil <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <select
                      value={field.value || ''}
                      onChange={(e) => field.onChange(e.target.value)}
                      className={selectClassName}
                    >
                      <option value="" disabled>
                        Pilih mobil
                      </option>
                      {cars.map((car) => (
                        <option key={car.id} value={String(car.id)}>
                          {car.name}
                        </option>
                      ))}
                    </select>
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}
            />

            <CurrencyInput
              form={form}
              name={'price'}
              label={'Harga'}
              placeholder={'Masukkan harga'}
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

export default AirPortFormDialog
