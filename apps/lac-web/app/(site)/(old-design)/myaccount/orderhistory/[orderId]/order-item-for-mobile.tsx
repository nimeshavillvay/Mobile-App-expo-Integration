import type { GtmProduct, Plant, ShippingMethod } from "@/_lib/types";
import { formatNumberToPrice } from "@/_lib/utils";
import MoreItemDetailsForMobile from "./more-item-details-for-mobile";
import OrderItemImageTitle from "./order-item-image-title";

type OrderItemForMobileProps = {
  readonly orderItem: {
    productId: number;
    slug?: string;
    sku: string;
    totalQuantity: number;
    lineItems: {
      itemNo: string;
      sku: string;
      productId: number;
      itemDescription: string;
      deliveryDate: string;
      plant: string;
      shippingCondition: string;
      invoice: string;
      shipQuantity: number;
      boQty: number;
      boDate: string;
      itemStatus: string;
      promoCode: string;
    }[];
    itemDescription: string;
    unitOfMeasure?: string;
    image?: string;
    productTitle?: string;
    isExcludedProduct?: boolean;
    productName?: string;
    price: number;
  };
  readonly isDiscontinued: boolean;
  readonly shippingMethods: ShippingMethod[];
  readonly plants: Plant[];
  readonly gtmProductInfo: GtmProduct | undefined;
};

const OrderItemForMobile = ({
  orderItem,
  isDiscontinued,
  shippingMethods,
  plants,
  gtmProductInfo,
}: OrderItemForMobileProps) => {
  const {
    productId,
    slug,
    sku,
    itemDescription,
    totalQuantity,
    unitOfMeasure,
    image,
    productTitle,
    lineItems,
    isExcludedProduct,
    productName,
    price,
  } = orderItem;

  return (
    <div className="border-t px-4 py-6 text-brand-gray-500">
      <div className="flex flex-col space-y-6">
        <div className="flex flex-row gap-2">
          <div className="min-w-[92px]">
            <OrderItemImageTitle
              productId={productId}
              itemDescription={itemDescription}
              productName={productName}
              image={image}
              slug={slug}
              gtmItemInfo={gtmProductInfo}
            />
          </div>

          <div className="flex flex-col space-y-0.5">
            <div>{sku ?? "N/A"}</div>
            <div
              className="line-clamp-3 font-bold text-black"
              dangerouslySetInnerHTML={{
                __html: productName ?? productTitle ?? "Description N/A",
              }}
            />
            <div className="font-bold text-brand-secondary">
              {lineItems?.length ? lineItems[0]?.itemStatus : "N/A"}
            </div>
            <div className="flex items-center justify-between">
              <div>
                Qty: {totalQuantity} {unitOfMeasure ?? "Unit"}
              </div>
              <div className="font-bold">${formatNumberToPrice(price)}</div>
            </div>
          </div>
        </div>

        <MoreItemDetailsForMobile
          productId={productId}
          lineItems={orderItem.lineItems}
          isDiscontinued={isDiscontinued}
          shippingMethods={shippingMethods}
          plants={plants}
          isExcludedProduct={isExcludedProduct}
        />
      </div>
    </div>
  );
};

export default OrderItemForMobile;
