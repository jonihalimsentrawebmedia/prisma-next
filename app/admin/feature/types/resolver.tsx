import {z} from "zod";

export const FEATURE_ICONS = [
  'ShieldCheck',
  'BadgePercent',
  'Sparkles',
  'MapPinned',
  'Headset',
  'FileCheck2',
] as const;

export const FeatureResolver = z.object({
  icon: z.enum(FEATURE_ICONS),
  title: z.string().min(1, 'Judul wajib diisi'),
  description: z.string().min(1, 'Deskripsi wajib diisi'),
});

export type FeatureResolverType = z.infer<typeof FeatureResolver>;
