"use client"

import {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Form} from "@/components/ui/form";
import {Button} from "@/components/ui/button";
import TextInput from "@/components/common/input";
import {
  TestimoniResolver,
  type TestimoniResolverType,
} from "@/app/admin/testimoni/types/resolver";
import {X} from "lucide-react";

export type Testimoni = {
  id: number
  name: string
  pekerjaan: string
  description: string
  is_publish: boolean
}

type TestimoniFormDialogProps = {
  open: boolean
  initialData: Testimoni | null
  onClose: () => void
  onSubmit: (values: TestimoniResolverType) => Promise<void>
}

const emptyValues: TestimoniResolverType = {
  name: '',
  pekerjaan: '',
  description: '',
  is_publish: false,
}

const textareaClassName =
  'flex min-h-24 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50'

const TestimoniFormDialog = ({open, initialData, onClose, onSubmit}: TestimoniFormDialogProps) => {
  const [loading, setLoading] = useState(false)

  const form = useForm<TestimoniResolverType>({
    resolver: zodResolver(TestimoniResolver),
    defaultValues: emptyValues,
  })

  useEffect(() => {
    if (open) {
      form.reset(
        initialData
          ? {
              name: initialData.name,
              pekerjaan: initialData.pekerjaan,
              description: initialData.description,
              is_publish: initialData.is_publish,
            }
          : emptyValues
      )
    }
  }, [open, initialData, form])

  if (!open) return null

  const handle = async (values: TestimoniResolverType) => {
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
            {initialData ? 'Edit Testimoni' : 'Tambah Testimoni'}
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
              label={'Nama'}
              placeholder={'Masukkan nama'}
              isRequired
            />

            <TextInput
              form={form}
              name={'pekerjaan'}
              label={'Pekerjaan'}
              placeholder={'Masukkan pekerjaan'}
              isRequired
            />

            <FormField
              control={form.control}
              name={'description'}
              render={({field}) => (
                <FormItem className="flex flex-col gap-2">
                  <FormLabel className="text-gray-600">
                    Testimoni <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <textarea
                      value={field.value}
                      onChange={(e) => field.onChange(e.target.value)}
                      placeholder={'Masukkan isi testimoni'}
                      className={textareaClassName}
                    />
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name={'is_publish'}
              render={({field}) => (
                <FormItem className="flex items-center gap-2">
                  <FormControl>
                    <input
                      type="checkbox"
                      checked={field.value}
                      onChange={(e) => field.onChange(e.target.checked)}
                      className="size-4 accent-[var(--primary)]"
                    />
                  </FormControl>
                  <FormLabel className="text-gray-600">Publish</FormLabel>
                  <FormMessage/>
                </FormItem>
              )}
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

export default TestimoniFormDialog
