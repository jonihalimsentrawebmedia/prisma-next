import {z} from "zod";

export const AirPortResolver = z.object({
  price: z.string().min(1, 'Harga wajib diisi'),
  carId: z.string().min(1, 'Mobil wajib dipilih'),
});

export type AirPortResolverType = z.infer<typeof AirPortResolver>;
