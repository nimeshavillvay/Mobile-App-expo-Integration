import { api } from "@/_lib/api";
import type { GroupList, OldPagination } from "@/_lib/types";
import { getBoolean } from "@/_lib/utils";
import { useSuspenseQuery } from "@tanstack/react-query";

type useSuspenseSearchArgs = {
  /**
   * Group items together such as multiple variations of the same product
   */
  groupResults?: boolean;
  /**
   * The page number to fetch (starts from 1)
   */
  page: number;
  /**
   * Filter by search term on the laminates
   */
  searchText?: string;
  /**
   * The number of items per page
   */
  perPage: number;
};

type GroupsList = {
  group_list: GroupList[];
  pagination: [OldPagination];
};

const useSuspenseLaminateSearch = (
  token: string,
  { groupResults = false, page, searchText, perPage }: useSuspenseSearchArgs,
  selectedFilters?: {
    [attributeId: string]: string[];
  },
) => {
  return useSuspenseQuery({
    queryKey: [
      "laminate-finder",
      "search",
      {
        groupResults,
        page,
        searchText,
        perPage,
      },
      selectedFilters,
      token,
    ],
    queryFn: () => {
      const searchParams = new URLSearchParams({
        sort_direction: "asc",
        page: page.toString(),
        perpage: perPage.toString(),
        group_result: groupResults ? "true" : "false",
      });

      if (searchText) {
        searchParams.append("substring", searchText);
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
        .post("rest/laminate-finder/search", {
          searchParams,
          headers: {
            Authorization: `Bearer ${token}`,
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
          txt_meta_title,
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
          metaTitle: txt_meta_title,
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

export default useSuspenseLaminateSearch;
