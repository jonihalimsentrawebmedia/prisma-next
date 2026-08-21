"use client"

import {useCallback, useEffect, useState} from "react";
import AxiosClient from "@/provider/axios";
import {Button} from "@/components/ui/button";
import {Card, CardContent} from "@/components/ui/card";
import RentFormDialog, {type Rent} from "@/app/admin/tenancy/rent/components/rent-form-dialog";
import RentDeleteDialog from "@/app/admin/tenancy/rent/components/rent-delete-dialog";
import type {Car} from "@/app/admin/cars/components/car-form-dialog";
import type {RentResolverType} from "@/app/admin/tenancy/rent/types/resolver";
import {Pencil, Plus, Trash2} from "lucide-react";

const formatPrice = (price: number) =>
  new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(price)

const RentPage = () => {
  const [rents, setRents] = useState<Rent[]>([])
  const [cars, setCars] = useState<Car[]>([])
  const [loading, setLoading] = useState(true)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editing, setEditing] = useState<Rent | null>(null)
  const [deleting, setDeleting] = useState<Rent | null>(null)

  const loadRents = useCallback(async () => {
    setLoading(true)
    try {
      const res = await AxiosClient.get('/rents')
      setRents(res.data.data ?? [])
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  }, [])

  const loadCars = useCallback(async () => {
    try {
      const res = await AxiosClient.get('/cars')
      setCars(res.data.data ?? [])
    } catch (err) {
      console.log(err)
    }
  }, [])

  useEffect(() => {
    loadRents()
    loadCars()
  }, [loadRents, loadCars])

  const handleOpenCreate = () => {
    setEditing(null)
    setDialogOpen(true)
  }

  const handleOpenEdit = (rent: Rent) => {
    setEditing(rent)
    setDialogOpen(true)
  }

  const handleClose = () => {
    setDialogOpen(false)
    setEditing(null)
  }

  const handleSubmit = async (values: RentResolverType) => {
    const payload = {
      ...values,
      price: Number(values.price),
      carId: Number(values.carId),
    }

    try {
      if (editing) {
        await AxiosClient.put(`/rents/${editing.id}`, payload)
      } else {
        await AxiosClient.post('/rents', payload)
      }
      handleClose()
      await loadRents()
    } catch (err) {
      console.log(err)
    }
  }

  const handleDelete = async (id: number) => {
    try {
      await AxiosClient.delete(`/rents/${id}`)
      setDeleting(null)
      await loadRents()
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Data Rental</h1>
          <p className="text-sm text-muted-foreground">Kelola data penyewaan mobil di sini.</p>
        </div>
        <Button onClick={handleOpenCreate}>
          <Plus className="size-4"/>
          Tambah Rental
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/50 text-left text-muted-foreground">
                  <th className="px-4 py-3 font-medium">Nama</th>
                  <th className="px-4 py-3 font-medium">Mobil</th>
                  <th className="px-4 py-3 font-medium">Tipe</th>
                  <th className="px-4 py-3 font-medium">Harga</th>
                  <th className="px-4 py-3 font-medium">Nego</th>
                  <th className="px-4 py-3 font-medium text-right">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={6} className="px-4 py-10 text-center text-muted-foreground">
                      Loading...
                    </td>
                  </tr>
                ) : rents.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-4 py-10 text-center text-muted-foreground">
                      Belum ada data rental.
                    </td>
                  </tr>
                ) : (
                  rents.map((rent) => (
                    <tr key={rent.id} className="border-b last:border-b-0">
                      <td className="px-4 py-3 font-medium">{rent.name}</td>
                      <td className="px-4 py-3">{rent.car?.name ?? '-'}</td>
                      <td className="px-4 py-3">
                        {rent.type === 'SUPIR' ? 'Supir' : 'Lepas Kunci'}
                      </td>
                      <td className="px-4 py-3">{formatPrice(rent.price)}</td>
                      <td className="px-4 py-3">{rent.is_nego ? 'Ya' : 'Tidak'}</td>
                      <td className="px-4 py-3">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="outline"
                            size="icon-sm"
                            onClick={() => handleOpenEdit(rent)}
                          >
                            <Pencil className="size-4"/>
                          </Button>
                          <Button
                            variant="destructive"
                            size="icon-sm"
                            onClick={() => setDeleting(rent)}
                          >
                            <Trash2 className="size-4"/>
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <RentFormDialog
        open={dialogOpen}
        initialData={editing}
        cars={cars}
        onClose={handleClose}
        onSubmit={handleSubmit}
      />

      <RentDeleteDialog
        open={deleting !== null}
        rent={deleting}
        onClose={() => setDeleting(null)}
        onConfirm={handleDelete}
      />
    </div>
  )
}

export default RentPage
