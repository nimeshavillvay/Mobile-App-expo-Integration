import { api } from "@/_lib/api";
import type { GroupList, OldPagination } from "@/_lib/types";
import { getBoolean } from "@/_lib/utils";
import { useSuspenseQuery } from "@tanstack/react-query";

type useSuspenseSearchArgs = {
  categoryId?: string;
  /**
   * Group items together such as multiple variations of the same product
   */
  groupResults?: boolean;
  /**
   * The page number to fetch (starts from 1)
   */
  page: number;
};

type GroupsList = {
  group_list: GroupList[];
  pagination: [OldPagination];
};

const useSuspenseSearch = (
  token: string | undefined,
  { categoryId, groupResults = false, page }: useSuspenseSearchArgs,
  selectedFilters?: {
    [attributeId: string]: string[];
  },
) => {
  return useSuspenseQuery({
    queryKey: [
      "search",
      {
        categoryId,
        groupResults,
        page,
      },
      selectedFilters,
      token,
    ],
    queryFn: () => {
      const searchParams = new URLSearchParams({
        sort_direction: "asc",
        page: page.toString(),
        perpage: "20",
        group_result: groupResults ? "true" : "false",
      });

      if (categoryId) {
        searchParams.set("categoryid", categoryId);
      }

      const body: {
        [attributeId: string]: {
          [valueId: string]: "Y";
        };
      } = {};
      if (selectedFilters) {
        for (const [key, values] of Object.entries(selectedFilters)) {
          values.forEach((value) => {
            body[key] = {
              ...body[key],
              [value]: "Y",
            };
          });
        }
      }

      return api
        .post("rest/search", {
          searchParams,
          headers: {
            Authorization: token ? `Bearer ${token}` : token,
          },
          cache: "no-store",
          json: {
            rf_data: body,
          },
        })
        .json<GroupsList>();
    },
    select: (data) => {
      const { group_list, pagination } = data;

      const mappedGroups = group_list.map(
        ({
          groupid,
          type,
          item_group_name,
          slug,
          brandName,
          brandid,
          group_img,
          compliance_flags,
          fclassid,
          itemSkuList,
          variationsCount,
        }) => ({
          groupId: groupid,
          type: type,
          productGroupName: item_group_name,
          slug: slug,
          brandName: brandName,
          brandId: Number(brandid),
          groupImage: group_img,
          complianceFlags: compliance_flags,
          fClassId: fclassid,
          productSkuList: itemSkuList.map((item) => ({
            productId: item.productid,
            isExcludedProduct: item.is_product_exclude,
            productSku: item.txt_wurth_lac_item,
            productName: item.item_name,
            image: item.img,
            slug: item.slug,
            isFavorite: item.is_favourite,
            isComparison: item.is_comparison,
            skuAttribute: item["SKU-attribute"],
            isHazardous: getBoolean(item.txt_hazardous),
            productIdOnSap: item.txt_sap,
            mfrPartNo: item.txt_mfn,
            productSummary: item.txt_description_name,
            productDescription: item.txt_sub_description,
            productBrandId: item.sel_assigned_brand,
            unitOfMeasure: item.txt_uom_label,
            boxQuantity: Number(item.txt_box_qt) || 1,
            minimumOrderQuantity: Number(item.txt_min_order_amount) || 1,
            quantityByIncrements: Number(item.txt_order_qty_increments) || 1,
            weight: Number(item.txt_weight_value),
            prop65MessageOne: item.txt_prop65_message_01,
            prop65MessageTwo: item.txt_prop65_message_02,
            prop65MessageThree: item.txt_prop65_message_03,
            listPrice: Number(item.list_price),
            isSaleItem: getBoolean(item.on_sale),
            isNewItem: getBoolean(item.is_new),
            isDirectlyShippedFromVendor: item.is_directly_shipped_from_vendor,
          })),
          variationsCount: Number(variationsCount),
        }),
      );

      const firstPagination = pagination[0] || {
        db_count: 0,
        offset: 0,
        perPage: 0,
      };

      const mappedPagination = {
        totalCount: Number(firstPagination.db_count),
        offset: firstPagination.offset,
        perPage: firstPagination.perPage,
      };

      return { groupList: mappedGroups, pagination: mappedPagination };
    },
  });
};

export default useSuspenseSearch;
