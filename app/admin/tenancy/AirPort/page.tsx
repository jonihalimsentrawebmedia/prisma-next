"use client"

import {useCallback, useEffect, useState} from "react";
import AxiosClient from "@/provider/axios";
import {Button} from "@/components/ui/button";
import {Card, CardContent} from "@/components/ui/card";
import AirPortFormDialog, {type AirPort} from "@/app/admin/tenancy/AirPort/components/airport-form-dialog";
import AirPortDeleteDialog from "@/app/admin/tenancy/AirPort/components/airport-delete-dialog";
import type {Car} from "@/app/admin/cars/components/car-form-dialog";
import type {AirPortResolverType} from "@/app/admin/tenancy/AirPort/types/resolver";
import {Pencil, Plus, Trash2} from "lucide-react";

const formatPrice = (price: number) =>
  new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(price)

const AirPortPage = () => {
  const [airPorts, setAirPorts] = useState<AirPort[]>([])
  const [cars, setCars] = useState<Car[]>([])
  const [loading, setLoading] = useState(true)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editing, setEditing] = useState<AirPort | null>(null)
  const [deleting, setDeleting] = useState<AirPort | null>(null)

  const loadAirPorts = useCallback(async () => {
    setLoading(true)
    try {
      const res = await AxiosClient.get('/airports')
      setAirPorts(res.data.data ?? [])
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
    loadAirPorts()
    loadCars()
  }, [loadAirPorts, loadCars])

  const handleOpenCreate = () => {
    setEditing(null)
    setDialogOpen(true)
  }

  const handleOpenEdit = (airPort: AirPort) => {
    setEditing(airPort)
    setDialogOpen(true)
  }

  const handleClose = () => {
    setDialogOpen(false)
    setEditing(null)
  }

  const handleSubmit = async (values: AirPortResolverType) => {
    const payload = {
      ...values,
      price: Number(values.price),
      carId: Number(values.carId),
    }

    try {
      if (editing) {
        await AxiosClient.put(`/airports/${editing.id}`, payload)
      } else {
        await AxiosClient.post('/airports', payload)
      }
      handleClose()
      await loadAirPorts()
    } catch (err) {
      console.log(err)
    }
  }

  const handleDelete = async (id: number) => {
    try {
      await AxiosClient.delete(`/airports/${id}`)
      setDeleting(null)
      await loadAirPorts()
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Data Airport</h1>
          <p className="text-sm text-muted-foreground">Kelola data airport di sini.</p>
        </div>
        <Button onClick={handleOpenCreate}>
          <Plus className="size-4"/>
          Tambah Airport
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/50 text-left text-muted-foreground">
                  <th className="px-4 py-3 font-medium">ID</th>
                  <th className="px-4 py-3 font-medium">Mobil</th>
                  <th className="px-4 py-3 font-medium">Harga</th>
                  <th className="px-4 py-3 font-medium text-right">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={4} className="px-4 py-10 text-center text-muted-foreground">
                      Loading...
                    </td>
                  </tr>
                ) : airPorts.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-4 py-10 text-center text-muted-foreground">
                      Belum ada data airport.
                    </td>
                  </tr>
                ) : (
                  airPorts.map((airPort) => (
                    <tr key={airPort.id} className="border-b last:border-b-0">
                      <td className="px-4 py-3 font-medium">{airPort.id}</td>
                      <td className="px-4 py-3">{airPort.car?.name ?? '-'}</td>
                      <td className="px-4 py-3">{formatPrice(airPort.price)}</td>
                      <td className="px-4 py-3">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="outline"
                            size="icon-sm"
                            onClick={() => handleOpenEdit(airPort)}
                          >
                            <Pencil className="size-4"/>
                          </Button>
                          <Button
                            variant="destructive"
                            size="icon-sm"
                            onClick={() => setDeleting(airPort)}
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

      <AirPortFormDialog
        open={dialogOpen}
        initialData={editing}
        cars={cars}
        onClose={handleClose}
        onSubmit={handleSubmit}
      />

      <AirPortDeleteDialog
        open={deleting !== null}
        airPort={deleting}
        onClose={() => setDeleting(null)}
        onConfirm={handleDelete}
      />
    </div>
  )
}

export default AirPortPage
