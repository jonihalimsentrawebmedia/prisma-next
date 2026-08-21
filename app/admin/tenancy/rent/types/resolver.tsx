import {z} from "zod";

export const RENT_TYPES = ['SUPIR', 'LEPAS_KUNCI'] as const;

export const RentResolver = z.object({
  name: z.string().min(1, 'Nama wajib diisi'),
  type: z.enum(RENT_TYPES),
  price: z.string().min(1, 'Harga wajib diisi'),
  is_nego: z.boolean(),
  carId: z.string().min(1, 'Mobil wajib dipilih'),
});

export type RentResolverType = z.infer<typeof RentResolver>;
