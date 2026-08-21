import {z} from "zod";

export const CarResolver = z.object({
  name: z.string().min(1, 'Nama mobil wajib diisi'),
  seat: z.string().min(1, 'Kursi wajib diisi'),
  transmisi: z.string().min(1, 'Transmisi wajib diisi'),
  type: z.string().min(1, 'Tipe wajib diisi'),
  image: z.string().min(1, 'URL gambar wajib diisi'),
});

export type CarResolverType = z.infer<typeof CarResolver>;
