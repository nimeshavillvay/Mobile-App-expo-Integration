import { NUMBER_TYPE } from "@/_lib/zod-helper";
import { z } from "zod";

export const addToCartSchema = z.object({
  quantity: NUMBER_TYPE,
});
export type AddToCartSchema = z.infer<typeof addToCartSchema>;
