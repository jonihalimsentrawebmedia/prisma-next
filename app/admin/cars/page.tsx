"use client"

import {useCallback, useEffect, useState} from "react";
import AxiosClient from "@/provider/axios";
import {Button} from "@/components/ui/button";
import {Card, CardContent} from "@/components/ui/card";
import CarFormDialog, {type Car} from "@/app/admin/cars/components/car-form-dialog";
import CarDeleteDialog from "@/app/admin/cars/components/car-delete-dialog";
import type {CarResolverType} from "@/app/admin/cars/types/resolver";
import {ImageOff, Pencil, Plus, Trash2} from "lucide-react";

const CarsPage = () => {
  const [cars, setCars] = useState<Car[]>([])
  const [loading, setLoading] = useState(true)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editing, setEditing] = useState<Car | null>(null)
  const [deleting, setDeleting] = useState<Car | null>(null)

  const loadCars = useCallback(async () => {
    setLoading(true)
    try {
      const res = await AxiosClient.get('/cars')
      setCars(res.data.data ?? [])
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadCars()
  }, [loadCars])

  const handleOpenCreate = () => {
    setEditing(null)
    setDialogOpen(true)
  }

  const handleOpenEdit = (car: Car) => {
    setEditing(car)
    setDialogOpen(true)
  }

  const handleClose = () => {
    setDialogOpen(false)
    setEditing(null)
  }

  const handleSubmit = async (values: CarResolverType) => {
    try {
      if (editing) {
        await AxiosClient.put(`/cars/${editing.id}`, values)
      } else {
        await AxiosClient.post('/cars', values)
      }
      handleClose()
      await loadCars()
    } catch (err) {
      console.log(err)
    }
  }

  const handleDelete = async (id: number) => {
    try {
      await AxiosClient.delete(`/cars/${id}`)
      setDeleting(null)
      await loadCars()
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Data Mobil</h1>
          <p className="text-sm text-muted-foreground">Kelola data mobil di sini.</p>
        </div>
        <Button onClick={handleOpenCreate}>
          <Plus className="size-4"/>
          Tambah Mobil
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/50 text-left text-muted-foreground">
                  <th className="px-4 py-3 font-medium">Gambar</th>
                  <th className="px-4 py-3 font-medium">Nama</th>
                  <th className="px-4 py-3 font-medium">Kursi</th>
                  <th className="px-4 py-3 font-medium">Transmisi</th>
                  <th className="px-4 py-3 font-medium">Tipe</th>
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
                ) : cars.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-4 py-10 text-center text-muted-foreground">
                      Belum ada data mobil.
                    </td>
                  </tr>
                ) : (
                  cars.map((car) => (
                    <tr key={car.id} className="border-b last:border-b-0">
                      <td className="px-4 py-3">
                        {car.image ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={car.image}
                            alt={car.name}
                            className="size-12 rounded-md object-contain"
                          />
                        ) : (
                          <div className="flex size-12 items-center justify-center rounded-md bg-muted">
                            <ImageOff className="size-5 text-muted-foreground"/>
                          </div>
                        )}
                      </td>
                      <td className="px-4 py-3 font-medium">{car.name}</td>
                      <td className="px-4 py-3">{car.seat}</td>
                      <td className="px-4 py-3">{car.transmisi}</td>
                      <td className="px-4 py-3">{car.type}</td>
                      <td className="px-4 py-3">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="outline"
                            size="icon-sm"
                            onClick={() => handleOpenEdit(car)}
                          >
                            <Pencil className="size-4"/>
                          </Button>
                          <Button
                            variant="destructive"
                            size="icon-sm"
                            onClick={() => setDeleting(car)}
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

      <CarFormDialog
        open={dialogOpen}
        initialData={editing}
        onClose={handleClose}
        onSubmit={handleSubmit}
      />

      <CarDeleteDialog
        open={deleting !== null}
        car={deleting}
        onClose={() => setDeleting(null)}
        onConfirm={handleDelete}
      />
    </div>
  )
}

export default CarsPage
