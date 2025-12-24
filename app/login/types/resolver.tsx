import {z} from "zod";

export const LoginResolver = z.object({
  email: z.string(),
  password: z.string(),
});

export type LoginResolverType = z.infer<typeof LoginResolver>;