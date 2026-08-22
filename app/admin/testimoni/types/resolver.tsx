import {z} from "zod";

export const TestimoniResolver = z.object({
  name: z.string().min(1, 'Nama wajib diisi'),
  pekerjaan: z.string().min(1, 'Pekerjaan wajib diisi'),
  description: z.string().min(1, 'Testimoni wajib diisi'),
  is_publish: z.boolean(),
});

export type TestimoniResolverType = z.infer<typeof TestimoniResolver>;
