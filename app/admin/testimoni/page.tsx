"use client"

import {useCallback, useEffect, useState} from "react";
import AxiosClient from "@/provider/axios";
import {Button} from "@/components/ui/button";
import {Card, CardContent} from "@/components/ui/card";
import TestimoniFormDialog, {type Testimoni} from "@/app/admin/testimoni/components/testimoni-form-dialog";
import TestimoniDeleteDialog from "@/app/admin/testimoni/components/testimoni-delete-dialog";
import type {TestimoniResolverType} from "@/app/admin/testimoni/types/resolver";
import {Pencil, Plus, Trash2} from "lucide-react";

const TestimoniPage = () => {
  const [testimoni, setTestimoni] = useState<Testimoni[]>([])
  const [loading, setLoading] = useState(true)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editing, setEditing] = useState<Testimoni | null>(null)
  const [deleting, setDeleting] = useState<Testimoni | null>(null)

  const loadTestimoni = useCallback(async () => {
    setLoading(true)
    try {
      const res = await AxiosClient.get('/testimoni')
      setTestimoni(res.data.data ?? [])
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadTestimoni()
  }, [loadTestimoni])

  const handleOpenCreate = () => {
    setEditing(null)
    setDialogOpen(true)
  }

  const handleOpenEdit = (item: Testimoni) => {
    setEditing(item)
    setDialogOpen(true)
  }

  const handleClose = () => {
    setDialogOpen(false)
    setEditing(null)
  }

  const handleSubmit = async (values: TestimoniResolverType) => {
    try {
      if (editing) {
        await AxiosClient.put(`/testimoni/${editing.id}`, values)
      } else {
        await AxiosClient.post('/testimoni', values)
      }
      handleClose()
      await loadTestimoni()
    } catch (err) {
      console.log(err)
    }
  }

  const handleDelete = async (id: number) => {
    try {
      await AxiosClient.delete(`/testimoni/${id}`)
      setDeleting(null)
      await loadTestimoni()
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Data Testimoni</h1>
          <p className="text-sm text-muted-foreground">Kelola data testimoni di sini.</p>
        </div>
        <Button onClick={handleOpenCreate}>
          <Plus className="size-4"/>
          Tambah Testimoni
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/50 text-left text-muted-foreground">
                  <th className="px-4 py-3 font-medium">Nama</th>
                  <th className="px-4 py-3 font-medium">Pekerjaan</th>
                  <th className="px-4 py-3 font-medium">Testimoni</th>
                  <th className="px-4 py-3 font-medium">Publish</th>
                  <th className="px-4 py-3 font-medium text-right">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={5} className="px-4 py-10 text-center text-muted-foreground">
                      Loading...
                    </td>
                  </tr>
                ) : testimoni.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-4 py-10 text-center text-muted-foreground">
                      Belum ada data testimoni.
                    </td>
                  </tr>
                ) : (
                  testimoni.map((item) => (
                    <tr key={item.id} className="border-b last:border-b-0">
                      <td className="px-4 py-3 font-medium">{item.name}</td>
                      <td className="px-4 py-3">{item.pekerjaan}</td>
                      <td className="max-w-md px-4 py-3">{item.description}</td>
                      <td className="px-4 py-3">{item.is_publish ? 'Ya' : 'Tidak'}</td>
                      <td className="px-4 py-3">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="outline"
                            size="icon-sm"
                            onClick={() => handleOpenEdit(item)}
                          >
                            <Pencil className="size-4"/>
                          </Button>
                          <Button
                            variant="destructive"
                            size="icon-sm"
                            onClick={() => setDeleting(item)}
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

      <TestimoniFormDialog
        open={dialogOpen}
        initialData={editing}
        onClose={handleClose}
        onSubmit={handleSubmit}
      />

      <TestimoniDeleteDialog
        open={deleting !== null}
        testimoni={deleting}
        onClose={() => setDeleting(null)}
        onConfirm={handleDelete}
      />
    </div>
  )
}

export default TestimoniPage
