import type {FieldValues, Path, UseFormReturn} from 'react-hook-form'
import {FormControl, FormField, FormItem, FormLabel, FormMessage} from '@/components/ui/form'
import {Input} from '@/components/ui/input'
import type {ReactNode} from 'react'
import {useMobile} from '@/hooks/useMobile'

interface Props<T extends FieldValues> {
  label?: string | ReactNode
  htmlFor?: string
  name: Path<T>
  placeholder?: string
  form: UseFormReturn<T>
  className?: string
  inputClassName?: string
  isRow?: boolean
  isDisabled?: boolean
  isRequired?: boolean
  currency?: string
}

const formatCurrency = (value: string) => new Intl.NumberFormat('id-ID').format(Number(value))

function CurrencyInput<T extends FieldValues>(
  {
    label,
    htmlFor,
    placeholder,
    name,
    form,
    className,
    inputClassName,
    isDisabled,
    isRequired,
    isRow = false,
    currency = 'Rp',
  }: Props<T>) {
  const {isMobile} = useMobile()

  return (
    <FormField
      control={form.control}
      name={name}
      render={({field}) => {
        const digits = String(field.value ?? '').replace(/\D/g, '')

        return (
          <FormItem
            className={`whitespace-nowrap
            ${isRow ? `${isMobile ? 'flex flex-col gap-4' : 'grid grid-cols-[10rem_1fr] flex-row items-center gap-5'} ` : 'flex flex-col gap-2'}
            ${className}`}
          >
            <FormLabel className={'text-gray-600'} htmlFor={htmlFor}>
              {label} {isRequired && <span className={'text-red-500'}>*</span>}
            </FormLabel>
            <FormControl>
              <div className="relative w-full">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-500 pointer-events-none">
                  {currency}
                </span>
                <Input
                  id={htmlFor}
                  inputMode="numeric"
                  disabled={isDisabled}
                  placeholder={placeholder}
                  className={`w-full focus-visible:ring-0 rounded pl-10 ${inputClassName}`}
                  value={digits ? formatCurrency(digits) : ''}
                  onChange={(e) => {
                    field.onChange(e.target.value.replace(/\D/g, ''))
                  }}
                />
              </div>
            </FormControl>
            <FormMessage/>
          </FormItem>
        )
      }}
    />
  )
}

export default CurrencyInput
