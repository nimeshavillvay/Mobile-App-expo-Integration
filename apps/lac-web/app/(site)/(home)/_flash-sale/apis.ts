import { api } from "@/_lib/api";
import { DEFAULT_REVALIDATE, SPECIAL_SHIPPING_FLAG } from "@/_lib/constants";
import { getBoolean } from "@/_lib/utils";
import "server-only";
import type { FeatureProduct, MappedFeaturedProduct } from "./type";

export const getSaleItems = async () => {
  const response = await api
    .get("rest/getfeatureproducts", {
      next: { revalidate: DEFAULT_REVALIDATE },
    })
    .json<{
      bestsellers: unknown[];
      featured: unknown[];
      on_sale: FeatureProduct[];
      quick_ship: unknown[];
    }>();

  return response.on_sale.map(
    (data) =>
      ({
        productTitle: data.productTitle,
        productDescription: data.txt_description_name,
        mfrPartNo: data.txt_mfn,
        isHazardous: getBoolean(data.txt_hazardous),
        isDirectlyShippedFromVendor: getBoolean(data.txt_web_direct),
        specialShipping: !!SPECIAL_SHIPPING_FLAG.find(
          (flag) => flag === data.txt_special_shipping,
        ),
        groupId: Number(data.groupId),
        productId: data.productId,
        slug: data.slug,
        groupImage: data.group_img,
        productImage: data.product_img,
        productSku: data.sku,
        unitOfMeasure: data.txt_uom_label,
        isSaleItem: data.is_sale,
        isNewItem: data.is_new,
        minimumOrderQuantity: Number(data.min_order_amount) ?? 1,
        quantityByIncrements: Number(data.order_qty_increments) ?? 1,
        brandId: Number(data.brandId),
        brandName: data.brandName,
        categoryId: Number(data.categoryId),
        categoryName: data.categoryName,
        subCategoryId: Number(data.subCategoryId),
        subCategoryName: data.subCategoryName,
      }) satisfies MappedFeaturedProduct,
  );
};
