"use client"

import {useCallback, useEffect, useState} from "react";
import AxiosClient from "@/provider/axios";
import {Button} from "@/components/ui/button";
import {Card, CardContent} from "@/components/ui/card";
import FeatureFormDialog, {type Feature} from "@/app/admin/feature/components/feature-form-dialog";
import FeatureDeleteDialog from "@/app/admin/feature/components/feature-delete-dialog";
import type {FeatureResolverType} from "@/app/admin/feature/types/resolver";
import {
  BadgePercent,
  FileCheck2,
  Headset,
  MapPinned,
  Pencil,
  Plus,
  ShieldCheck,
  Sparkles,
  Trash2,
  type LucideIcon,
} from "lucide-react";

const ICON_COMPONENTS: Record<string, LucideIcon> = {
  ShieldCheck,
  BadgePercent,
  Sparkles,
  MapPinned,
  Headset,
  FileCheck2,
}

const FeaturePage = () => {
  const [features, setFeatures] = useState<Feature[]>([])
  const [loading, setLoading] = useState(true)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editing, setEditing] = useState<Feature | null>(null)
  const [deleting, setDeleting] = useState<Feature | null>(null)

  const loadFeatures = useCallback(async () => {
    setLoading(true)
    try {
      const res = await AxiosClient.get('/feature')
      setFeatures(res.data.data ?? [])
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadFeatures()
  }, [loadFeatures])

  const handleOpenCreate = () => {
    setEditing(null)
    setDialogOpen(true)
  }

  const handleOpenEdit = (feature: Feature) => {
    setEditing(feature)
    setDialogOpen(true)
  }

  const handleClose = () => {
    setDialogOpen(false)
    setEditing(null)
  }

  const handleSubmit = async (values: FeatureResolverType) => {
    try {
      if (editing) {
        await AxiosClient.put(`/feature/${editing.id}`, values)
      } else {
        await AxiosClient.post('/feature', values)
      }
      handleClose()
      await loadFeatures()
    } catch (err) {
      console.log(err)
    }
  }

  const handleDelete = async (id: number) => {
    try {
      await AxiosClient.delete(`/feature/${id}`)
      setDeleting(null)
      await loadFeatures()
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Data Feature</h1>
          <p className="text-sm text-muted-foreground">Kelola data feature di sini.</p>
        </div>
        <Button onClick={handleOpenCreate}>
          <Plus className="size-4"/>
          Tambah Feature
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/50 text-left text-muted-foreground">
                  <th className="px-4 py-3 font-medium">Icon</th>
                  <th className="px-4 py-3 font-medium">Judul</th>
                  <th className="px-4 py-3 font-medium">Deskripsi</th>
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
                ) : features.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-4 py-10 text-center text-muted-foreground">
                      Belum ada data feature.
                    </td>
                  </tr>
                ) : (
                  features.map((feature) => {
                    const IconComponent = ICON_COMPONENTS[feature.icon]
                    return (
                      <tr key={feature.id} className="border-b last:border-b-0">
                        <td className="px-4 py-3">
                          {IconComponent ? (
                            <span
                              className="flex size-9 items-center justify-center rounded-lg bg-primary/15 text-primary"
                            >
                              <IconComponent className="size-4.5"/>
                            </span>
                          ) : (
                            feature.icon
                          )}
                        </td>
                        <td className="px-4 py-3 font-medium">{feature.title}</td>
                        <td className="max-w-md px-4 py-3">{feature.description}</td>
                        <td className="px-4 py-3">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="outline"
                              size="icon-sm"
                              onClick={() => handleOpenEdit(feature)}
                            >
                              <Pencil className="size-4"/>
                            </Button>
                            <Button
                              variant="destructive"
                              size="icon-sm"
                              onClick={() => setDeleting(feature)}
                            >
                              <Trash2 className="size-4"/>
                            </Button>
                          </div>
                        </td>
                      </tr>
                    )
                  })
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <FeatureFormDialog
        open={dialogOpen}
        initialData={editing}
        onClose={handleClose}
        onSubmit={handleSubmit}
      />

      <FeatureDeleteDialog
        open={deleting !== null}
        feature={deleting}
        onClose={() => setDeleting(null)}
        onConfirm={handleDelete}
      />
    </div>
  )
}

export default FeaturePage
