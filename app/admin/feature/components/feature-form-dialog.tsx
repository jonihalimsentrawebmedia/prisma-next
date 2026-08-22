"use client"

import {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Form} from "@/components/ui/form";
import {Button} from "@/components/ui/button";
import TextInput from "@/components/common/input";
import {
  FeatureResolver,
  FEATURE_ICONS,
  type FeatureResolverType,
} from "@/app/admin/feature/types/resolver";
import {X} from "lucide-react";

export type Feature = {
  id: number
  icon: string
  title: string
  description: string
}

type FeatureFormDialogProps = {
  open: boolean
  initialData: Feature | null
  onClose: () => void
  onSubmit: (values: FeatureResolverType) => Promise<void>
}

const emptyValues: FeatureResolverType = {
  icon: 'ShieldCheck',
  title: '',
  description: '',
}

const selectClassName =
  'flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50'

const textareaClassName =
  'flex min-h-24 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50'

const FeatureFormDialog = ({open, initialData, onClose, onSubmit}: FeatureFormDialogProps) => {
  const [loading, setLoading] = useState(false)

  const form = useForm<FeatureResolverType>({
    resolver: zodResolver(FeatureResolver),
    defaultValues: emptyValues,
  })

  useEffect(() => {
    if (open) {
      form.reset(
        initialData
          ? {
              icon: initialData.icon as FeatureResolverType['icon'],
              title: initialData.title,
              description: initialData.description,
            }
          : emptyValues
      )
    }
  }, [open, initialData, form])

  if (!open) return null

  const handle = async (values: FeatureResolverType) => {
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
            {initialData ? 'Edit Feature' : 'Tambah Feature'}
          </h2>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
            <X className="size-5"/>
          </button>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handle)} className="space-y-4 px-5 py-5">
            <FormField
              control={form.control}
              name={'icon'}
              render={({field}) => (
                <FormItem className="flex flex-col gap-2">
                  <FormLabel className="text-gray-600">
                    Icon <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <select
                      value={field.value}
                      onChange={(e) => field.onChange(e.target.value)}
                      className={selectClassName}
                    >
                      {FEATURE_ICONS.map((icon) => (
                        <option key={icon} value={icon}>
                          {icon}
                        </option>
                      ))}
                    </select>
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}
            />

            <TextInput
              form={form}
              name={'title'}
              label={'Judul'}
              placeholder={'Masukkan judul feature'}
              isRequired
            />

            <FormField
              control={form.control}
              name={'description'}
              render={({field}) => (
                <FormItem className="flex flex-col gap-2">
                  <FormLabel className="text-gray-600">
                    Deskripsi <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <textarea
                      value={field.value}
                      onChange={(e) => field.onChange(e.target.value)}
                      placeholder={'Masukkan deskripsi feature'}
                      className={textareaClassName}
                    />
                  </FormControl>
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

export default FeatureFormDialog
