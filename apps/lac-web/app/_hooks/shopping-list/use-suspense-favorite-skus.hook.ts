import { api } from "@/_lib/api";
import { useSuspenseQuery } from "@tanstack/react-query";
import { z } from "zod";

const favoriteSkuSchema = z.array(
  z.object({
    productid: z.number(),
    isFavourite: z.boolean(),
    favoriteIds: z.array(z.string()),
  }),
);

const useSuspenseFavoriteSKUs = (
  token: string | undefined,
  productIds: string[],
) => {
  return useSuspenseQuery({
    queryKey: ["user", "favorite-skus", productIds, token],
    queryFn: async () => {
      const response = await api
        .post("rest/my-favourite/favourite-skus", {
          headers: {
            authorization: `Bearer ${token}`,
          },
          json: {
            products: productIds,
          },
          cache: "no-cache",
        })
        .json();

      const parsedResponse = await favoriteSkuSchema.parseAsync(response);

      return parsedResponse.map((data) => ({
        productId: data.productid,
        isFavorite: data.isFavourite,
        favoriteListIds: data.favoriteIds,
      }));
    },
  });
};

export default useSuspenseFavoriteSKUs;
