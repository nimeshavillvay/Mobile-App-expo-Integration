import { api } from "@/_lib/api";
import type { Pagination } from "@/_lib/types";
import { useSuspenseQuery } from "@tanstack/react-query";
import type {
  ShoppingListItems,
  ShoppingListItemsElement,
  ShoppingListItemsElementResponse,
  ShoppingListItemsResponse,
} from "./type";

const useSuspenseShoppingListItems = (
  token: string,
  shoppingListId: string,
  page: number,
  perPage: number,
  sort: string,
  sortDirection: string,
) => {
  return useSuspenseQuery({
    queryKey: [
      "my-account",
      "shopping-list",
      "items",
      token,
      shoppingListId,
      page,
      perPage,
      sort,
      sortDirection,
    ],
    queryFn: () =>
      api
        .get("rest/my-favourite/list-items/" + shoppingListId, {
          headers: {
            authorization: `Bearer ${token}`,
          },
          searchParams: {
            page,
            perpage: perPage,
            sort,
            sort_direction: sortDirection,
          },
        })
        .json<ShoppingListItemsResponse>(),
    select: (data): ShoppingListItems => {
      const { items, pagination } = data;

      const shoppingListItems = items.map(
        (item: ShoppingListItemsElementResponse): ShoppingListItemsElement => ({
          productId: item.productid,
          isProductExclude: item.is_product_exclude,
          txtWurthLacItem: item.txt_wurth_lac_item,
          itemName: item.item_name,
          img: item.img,
          slug: item.slug,
          isFavorite: item.is_favourite,
          isComparison: item.is_comparison,
          txtHazardous: item.txt_hazardous,
          txtSpecialShipping: item.txt_special_shipping,
          txtSap: item.txt_sap,
          txtMfn: item.txt_mfn,
          txtDescriptionName: item.txt_description_name,
          txtSubDescription: item.txt_sub_description,
          selAssignedBrand: item.sel_assigned_brand,
          txtUom: item.txt_uom,
          txtUomLabel: item.txt_uom_label,
          txtUomValue: item.txt_uom_value,
          txtRounding: item.txt_rounding,
          txtBoxQt: item.txt_box_qt,
          txtMinOrderAmount: item.txt_min_order_amount,
          txtOrderQtyIncrements: item.txt_order_qty_increments,
          txtWeightValue: item.txt_weight_value,
          txtWight: item.txt_wight,
          txtWeightLabel: item.txt_weight_label,
          date: item.date,
          txtChemicalCarncengen: item.txt_chemical_carncengen,
          txtChemicalReproduction: item.txt_chemical_reproduction,
          txtContainsWood: item.txt_contains_wood,
          txtProp65Message01: item.txt_prop65_message_01,
          txtProp65Message02: item.txt_prop65_message_02,
          txtProp65Message03: item.txt_prop65_message_03,
          txtMetaTitle: item.txt_meta_title,
          txtUpc1: item.txt_upc1,
          txtSeoMetaDescription: item.txt_seo_meta_description,
          txtKeywords: item.txt_keywords,
          listPrice: item.list_price,
          onSale: item.on_sale,
          isNewItem: item.is_new,
          fClassId: item.fclassid,
          brandName: item.brand_name,
          txtGroupCode: item.txt_group_code,
          itemStatus: item.item_status,
          categoryName: item.category_name,
          productSummary: item.product_summary,
          isDirectlyShippedFromVendor: item.is_directly_shipped_from_vendor,
        }),
      );

      const shoppingListItemsPagination: Pagination = {
        totalCount: Number(pagination.db_count),
        offset: pagination.offset,
        perPage: pagination.perPage,
      };

      return {
        items: shoppingListItems,
        pagination: shoppingListItemsPagination,
      };
    },
  });
};

export default useSuspenseShoppingListItems;
