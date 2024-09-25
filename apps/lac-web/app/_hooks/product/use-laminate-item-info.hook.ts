import { api } from "@/_lib/api";
import { DEFAULT_REVALIDATE, SPECIAL_SHIPPING_FLAG } from "@/_lib/constants";
import type { ProductItemInfo } from "@/_lib/types";
import { getBoolean } from "@/_lib/utils";
import { useQuery } from "@tanstack/react-query";

type GroupFilter = {
  group_filters?: {
    values_ALL?: {
      GRADE: string[];
      FINISH: string[];
    };
    values_GRADE?: Record<string, Record<string, { productids: string[] }>>;
    values_FINISH?: Record<string, Record<string, { productids: string[] }>>;
  };
  brand_img: string;
  brand_name: string;
  edgebanding: ProductItemInfo[];
};

const useLaminateFilter = (productId: number) => {
  return useQuery({
    queryKey: ["laminate-finder", "product", productId],
    queryFn: async () => {
      const response = await api
        .get(`rest/laminate-finder/product/${productId}`, {
          next: {
            revalidate: DEFAULT_REVALIDATE,
          },
        })
        .json<GroupFilter>();

      return {
        groupFilters: response.group_filters,
        brandName: response.brand_name,
        brandImage: response.brand_img,
        edgebanding: response.edgebanding.map((item) => ({
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
        })),
      };
    },
  });
};

export default useLaminateFilter;
