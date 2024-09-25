"use client";

import WurthLacLogo from "@/_components/wurth-lac-logo";
import useGtmUser from "@/_hooks/gtm/use-gtm-user.hook";
import usePathnameHistoryState from "@/_hooks/misc/use-pathname-history-state.hook";
import { GTM_ITEM_PAGE_TYPES } from "@/_lib/constants";
import { getGTMPageType } from "@/_lib/gtm-utils";
import type { GtmProduct } from "@/_lib/types";
import { cn } from "@/_lib/utils";
import { sendGTMEvent } from "@next/third-parties/google";
import Image from "next/image";
import Link from "next/link";

const OrderItemImageTitle = ({
  productId,
  itemDescription,
  productName,
  slug,
  image,
  gtmItemInfo,
}: {
  readonly productId: number;
  readonly itemDescription: string;
  readonly productName?: string;
  readonly image?: string;
  readonly slug?: string;
  readonly gtmItemInfo: GtmProduct | undefined;
}) => {
  const pathnameHistory = usePathnameHistoryState(
    (state) => state.pathnameHistory,
  );

  const gtmItemUserQuery = useGtmUser();
  const gtmUser = gtmItemUserQuery.data;

  const sendToGTM = () => {
    if (gtmItemInfo) {
      sendGTMEvent({
        event: "select_item",
        item_list_name: GTM_ITEM_PAGE_TYPES.ORDER_HISTORY,
        selectItemData: {
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
            },
          ],
        },
        data: {
          userid: gtmUser?.userid,
          account_type: gtmUser?.account_type,
          account_industry: gtmUser?.account_industry,
          account_sales_category: gtmUser?.account_sales_category,
        },
        page_type: getGTMPageType(
          pathnameHistory[pathnameHistory.length - 1] ?? "",
        ),
      });
    }
  };

  const generateItemUrl = ({
    productId,
    slug,
  }: {
    productId: number;
    slug: string;
  }) => {
    if (slug !== "") {
      return `/product/${productId}/${slug}`;
    }

    return "#";
  };

  return (
    <Link
      href={generateItemUrl({ productId, slug: slug ?? "" })}
      onClick={sendToGTM}
      className={cn(
        productId ? "pointer-events-auto" : "pointer-events-none",
        "btnAction btn-view-product btnAction btn-product-detail-img",
      )}
      data-btn-action="View Product"
    >
      {image ? (
        <Image
          src={image}
          alt={productName ?? itemDescription}
          width={76}
          height={76}
        />
      ) : (
        <WurthLacLogo
          width={76}
          height={76}
          className="border border-brand-gray-200 px-2"
        />
      )}
    </Link>
  );
};

export default OrderItemImageTitle;
