"use client";

import useGtmProducts from "@/_hooks/gtm/use-gtm-item-info.hook";
import useGtmUser from "@/_hooks/gtm/use-gtm-user.hook";
import usePathnameHistoryState from "@/_hooks/misc/use-pathname-history-state.hook";
import { getGTMPageType } from "@/_lib/gtm-utils";
import { sendGTMEvent } from "@next/third-parties/google";
// eslint-disable-next-line no-restricted-imports
import { useEffect } from "react";

const ProductPageGtm = ({ productId }: { readonly productId: string }) => {
  const pathnameHistory = usePathnameHistoryState(
    (state) => state.pathnameHistory,
  );

  const gtmItemInfoQuery = useGtmProducts(
    productId ? [{ productid: Number(productId), cartid: 0 }] : [],
  );

  const gtmItemUserQuery = useGtmUser();
  const gtmItemInfo = gtmItemInfoQuery.data?.[0];
  const gtmUser = gtmItemUserQuery.data;

  useEffect(() => {
    if (gtmItemInfo !== undefined) {
      sendGTMEvent({
        event: "view_item",
        viewItemData: {
          currency: "USD",
          value: gtmItemInfo?.price,
          items: [
            {
              item_id: gtmItemInfo?.item_id,
              item_sku: gtmItemInfo?.item_sku,
              item_name: gtmItemInfo?.item_name,
              item_brand: gtmItemInfo?.item_brand,
              price: gtmItemInfo?.price,
              quantity: 1,
              item_categoryid: gtmItemInfo?.item_categoryid,
              item_primarycategory: gtmItemInfo?.item_primarycategory,
              item_category: gtmItemInfo?.item_category_path[0] ?? "",
              item_category1: gtmItemInfo?.item_category_path[1] ?? "",
              item_category2: gtmItemInfo?.item_category_path[2] ?? "",
              item_category3: gtmItemInfo?.item_category_path[3] ?? "",
            },
          ],
          page_type: getGTMPageType(
            pathnameHistory[pathnameHistory.length - 1] ?? "",
          ),
        },
        data: {
          userid: gtmUser?.userid,
          account_type: gtmUser?.account_type,
          account_industry: gtmUser?.account_industry,
          account_sales_category: gtmUser?.account_sales_category,
        },
      });
    }
  }, [gtmItemInfo, gtmUser, pathnameHistory]);

  return null;
};

export default ProductPageGtm;
