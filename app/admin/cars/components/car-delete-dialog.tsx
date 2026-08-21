"use client"

import {useState} from "react";
import {Button} from "@/components/ui/button";
import type {Car} from "@/app/admin/cars/components/car-form-dialog";
import {Loader2} from "lucide-react";

type CarDeleteDialogProps = {
  open: boolean
  car: Car | null
  onClose: () => void
  onConfirm: (id: number) => Promise<void>
}

const CarDeleteDialog = ({open, car, onClose, onConfirm}: CarDeleteDialogProps) => {
  const [loading, setLoading] = useState(false)

  if (!open || !car) return null

  const handleConfirm = async () => {
    setLoading(true)
    try {
      await onConfirm(car.id)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-md rounded-lg bg-white shadow-lg">
        <div className="px-5 py-5">
          <h2 className="text-lg font-semibold">Hapus Mobil</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Yakin ingin menghapus mobil{' '}
            <span className="font-medium text-foreground">{car.name}</span>? Tindakan ini
            tidak dapat dibatalkan.
          </p>
        </div>

        <div className="flex justify-end gap-2 border-t px-5 py-4">
          <Button type="button" variant="outline" onClick={onClose} disabled={loading}>
            Batal
          </Button>
          <Button variant="destructive" onClick={handleConfirm} disabled={loading}>
            {loading && <Loader2 className="size-4 animate-spin"/>}
            Hapus
          </Button>
        </div>
      </div>
    </div>
  )
}

export default CarDeleteDialog
