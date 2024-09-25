import { api } from "@/_lib/api";
import { SPECIAL_SHIPPING_FLAG } from "@/_lib/constants";
import type { LaminateItemInfo } from "@/_lib/types";
import { getBoolean } from "@/_lib/utils";
import { useQuery } from "@tanstack/react-query";

const useLaminateProductsInfo = (productIdList: string[]) => {
  return useQuery({
    queryKey: ["laminate-finder", "products", productIdList],
    queryFn: async () => {
      const response = await api
        .get("rest/laminate-finder/products", {
          searchParams: { productids: productIdList.toString() },
          cache: "no-cache",
        })
        .json<LaminateItemInfo[]>();

      const transformedResponse = response.map((item) => ({
        productId: parseInt(item.productid, 10),
        slug: item.slug,
        isExcludedProduct: item.is_product_exclude,
        productSku: item.txt_wurth_lac_item,
        productName: item.item_name,
        image: item.img,
        isComparison: !!item.is_comparison,
        isHazardous: getBoolean(item.txt_hazardous),
        specialShipping: !!SPECIAL_SHIPPING_FLAG.find(
          (flag) => flag === item.txt_special_shipping,
        ),
        productIdOnSap: item.txt_sap,
        mfrPartNo: item.txt_mfn,
        productDescription: item.txt_description_name,
        productSubDescription: item.txt_sub_description,
        brandCode: parseInt(item.sel_assigned_brand, 10),
        unitOfMeasure: item.txt_uom_label,
        boxQuantity: parseInt(item.txt_box_qt, 10) || 1,
        minimumOrderQuantity: parseInt(item.txt_min_order_amount, 10) || 1,
        quantityByIncrements: parseInt(item.txt_box_qt, 10) || 1,
        weight: parseFloat(item.txt_weight_value),
        prop65MessageOne: item.txt_prop65_message_01 ?? "",
        prop65MessageTwo: item.txt_prop65_message_02 ?? "",
        prop65MessageThree: item.txt_prop65_message_03 ?? "",
        listPrice: parseFloat(item.list_price),
        isSaleItem: getBoolean(item.on_sale),
        isNewItem: getBoolean(item.is_new),
        fClassId: parseInt(item.fclassid),
        class: item.class,
        attributes: item.attributes,
        productStatus: item.item_status ?? "",
        isDirectlyShippedFromVendor: item.is_directly_shipped_from_vendor,
        productSummary: item.product_summary,
        brand: item.brand_name,
        productCategory: item.category_name,
        size: item.size,
      }));

      return transformedResponse;
    },
    enabled: productIdList.length > 0,
  });
};

export default useLaminateProductsInfo;
