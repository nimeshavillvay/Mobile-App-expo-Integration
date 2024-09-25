import { api } from "@/_lib/api";
import type { GetPricesResult, PriceBreakDowns } from "@/_lib/types";
import "client-only";
import { z } from "zod";

const getPricesSchema = z.object({
  error: z.literal(true).nullable(),
  items: z.array(
    z.object({
      productid: z.string(),
      price: z.number(),
      price_unit: z.string(),
      extended: z.number(),
      list_price: z.number(),
      coupon: z.string().nullable(),
      price_breakdowns: z.array(
        z.object({
          qty_1: z.number(),
          price_1: z.number(),
        }),
      ),
      uom_price: z.number().optional(),
      uom_price_unit: z.string().optional(),
    }),
  ),
});

export const getPrices = async (
  token: string | undefined,
  products: {
    productId: number;
    qty: number;
    cartId?: number;
  }[],
): Promise<GetPricesResult> => {
  const getPriceBreakDowns = (price_breakdowns: PriceBreakDowns) => {
    return price_breakdowns.map(
      (priceObject): { quantity: number; price: number } => {
        return {
          quantity: Number(priceObject.qty_1),
          price: Number(priceObject.price_1),
        };
      },
    );
  };

  const response = await api
    .post("rest/pricecheck", {
      headers: {
        authorization: token ? `Bearer ${token}` : token,
      },
      json: {
        products: products.map((product) => ({
          productid: product.productId,
          qty: Number(product.qty) <= 0 ? 1 : product.qty,
          cartid: product.cartId,
        })),
      },
      cache: "no-store",
    })
    .json();

  const parsedResponse = await getPricesSchema.parseAsync(response);

  const mappedItems = parsedResponse.items.map(
    ({
      productid,
      price,
      price_unit,
      extended,
      list_price,
      coupon,
      price_breakdowns,
      uom_price,
      uom_price_unit,
    }) => ({
      productId: productid,
      price,
      priceUnit: price_unit,
      extendedPrice: extended,
      listPrice: list_price,
      couponCode: coupon,
      priceBreakDowns: getPriceBreakDowns(price_breakdowns),
      uomPrice: uom_price,
      uomPriceUnit: uom_price_unit,
    }),
  );

  return { error: parsedResponse.error, productPrices: mappedItems };
};
