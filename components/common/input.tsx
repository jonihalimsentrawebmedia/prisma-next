import type {FieldValues, Path, UseFormReturn} from 'react-hook-form'
import {FormControl, FormField, FormItem, FormLabel, FormMessage} from '@/components/ui/form'
import {Input} from '@/components/ui/input'
import {LucideEye, LucideEyeClosed} from 'lucide-react'
import {type ReactNode, useState} from 'react'
import {useMobile} from '@/hooks/useMobile'

interface Props<T extends FieldValues> {
  label?: string | ReactNode
  type?:
    | 'text'
    | 'password'
    | 'email'
    | 'url'
    | 'date'
    | 'number'
    | 'tel'
    | 'file'
    | 'time'
    | 'datetime-local'
  htmlFor?: string
  name: Path<T> // ✅ FIX DISINI, pakai Path<T> bukan string biasa
  placeholder?: string
  form: UseFormReturn<T>
  className?: string
  inputClassName?: string
  isRow?: boolean
  accept?: string
  isDisabled?: boolean
  isRequired?: boolean
  isNumber?: boolean
  min?: number | string
  max?: number | string
}

function TextInput<T extends FieldValues>(
  {
    label,
    type = 'text',
    htmlFor,
    placeholder,
    name,
    min,
    max,
    form,
    className,
    isRequired,
    accept,
    inputClassName,
    isNumber,
    isDisabled,
    isRow = false,
  }: Props<T>) {
  const [showPassword, setShowPassword] = useState(false)
  const isPassword = type === 'password'
  const {isMobile} = useMobile()
  
  return (
    <FormField
      control={form.control}
      name={name}
      render={({field}) => (
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
              <Input
                id={htmlFor}
                min={min}
                onWheel={(e) => (e.target as HTMLElement).blur()}
                max={max}
                accept={accept}
                disabled={isDisabled}
                type={isPassword ? (showPassword ? 'text' : 'password') : type}
                placeholder={placeholder}
                className={`w-full focus-visible:ring-0 rounded ${inputClassName}`}
                value={field.value !== undefined && field.value !== null ? String(field.value) : ''}
                onChange={(e) => {
                  const value = e.target.value
                  if (isNumber) {
                    Number(e.target.value)
                  }
                  field.onChange(value)
                }}
              />
              {isPassword && (
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 z-10"
                >
                  {showPassword ? (
                    <LucideEye className="w-5 h-5"/>
                  ) : (
                    <LucideEyeClosed className="w-5 h-5"/>
                  )}
                </button>
              )}
            </div>
          </FormControl>
          <FormMessage/>
        </FormItem>
      )}
    />
  )
}

export default TextInput
