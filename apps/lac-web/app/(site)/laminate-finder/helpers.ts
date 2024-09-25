import { z } from "zod";

export const laminateAddToCartFormSchema = z.object({
  quantity: z.array(z.string()),
});

export type LaminateAddToCartFormSchema = z.infer<
  typeof laminateAddToCartFormSchema
>;
