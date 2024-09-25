import {
  getOrderDetails,
  getPaymentMethods,
  getPlants,
  getShippingMethods,
} from "@/_lib/apis/server";
import { getGtmProducts, getItemInfo } from "@/_lib/apis/shared";
import { SESSION_TOKEN_COOKIE } from "@/_lib/constants";
import { formatNumberToPrice } from "@/_lib/utils";
import AlertInline from "@/old/_components/alert-inline";
import Separator from "@/old/_components/separator";
import { Badge } from "@/old/_components/ui/badge";
import dayjs from "dayjs";
import type { Metadata } from "next";
import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import BackButton from "../back-button";
import OrderDetailsForMobile from "./order-details-for-mobile";
import OrderItem from "./order-item";
import OrderItemForMobile from "./order-item-for-mobile";

type DetailedOrderPageProps = {
  readonly params: {
    orderId: string;
  };
};

const getOrder = async (orderId: string) => {
  const cookiesStore = cookies();
  const sessionToken = cookiesStore.get(SESSION_TOKEN_COOKIE);

  if (!sessionToken?.value) {
    return redirect("/sign-in");
  }

  return await getOrderDetails(sessionToken.value, orderId);
};

export const generateMetadata = async ({
  params: { orderId },
}: DetailedOrderPageProps): Promise<Metadata> => {
  const orderDetail = await getOrder(orderId);

  return {
    title: `Order - ${orderDetail.orderNo}`,
    description: `Order details - ${orderDetail.orderNo}`,
  };
};

const DetailedOrderPage = async ({
  params: { orderId },
}: DetailedOrderPageProps) => {
  const cookiesStore = cookies();
  const sessionToken = cookiesStore.get(SESSION_TOKEN_COOKIE);

  if (!sessionToken?.value) {
    return redirect("/sign-in");
  }
  const orderDetail = await getOrder(orderId);

  const itemList = orderDetail.items
    .map((item) => item.productId)
    .filter((productId) => productId !== 0);

  if (itemList.length === 0) {
    return <h3>No valid products found</h3>;
  }

  const gtmProducts = itemList.map((productId) => {
    return {
      productid: productId,
      cartid: 0,
    };
  });

  const [paymentMethods, shippingMethods, plants, itemsInfo, gtmProductInfo] =
    await Promise.all([
      getPaymentMethods(),
      getShippingMethods(),
      getPlants(sessionToken?.value),
      getItemInfo(itemList),
      getGtmProducts(gtmProducts, sessionToken?.value),
    ]);

  if (orderDetail?.items?.length) {
    const productIds = orderDetail.items.map((item) => item.productId);

    if (productIds.length > 0) {
      const itemInfo = await getItemInfo(productIds);

      if (itemInfo?.length > 0) {
        orderDetail.items = orderDetail.items.map((item) => {
          const details =
            itemInfo.find(
              (infoItem) => infoItem.productId === item.productId,
            ) ?? undefined;

          return {
            ...item,
            ...details,
          };
        });
      }
    }
  }

  const orderTrackingHref = orderDetail.orderNo
    ? `/myaccount/orderhistory/ordertrackinglog/${orderDetail.orderNo}`
    : "#";

  const getPaymentMethodName = (paymentCode: string) => {
    const paymentMethod = paymentMethods.find(
      (method) => method.code === paymentCode,
    );

    return paymentMethod?.name ?? "N/A";
  };

  const getShippingMethodName = (shippingCode: string) => {
    const shippingMethod = shippingMethods.find(
      (method) => method.code === shippingCode,
    );

    return shippingMethod?.name ?? "N/A";
  };

  const getPlantName = (plantCode: string) => {
    const plant = plants.find((plant) => plant.code === plantCode);

    return plant?.name ?? "N/A";
  };

  return (
    <>
      <BackButton title="Back to My Orders" className="mb-2 mt-2 md:mt-0" />

      <div className="container pb-6 md:px-0">
        <h2 className="relative mt-[0.938rem] font-wurth text-xl font-medium text-brand-primary">
          Order #{orderId}
        </h2>

        <Separator
          orientation="horizontal"
          className="mb-6 mt-2 h-px flex-1 bg-brand-primary"
        />

        {/* Desktop View for Order Details */}
        <div className="mt-2 hidden space-y-4 md:block">
          {/* Order Details Section */}
          <div className="grid w-full grid-cols-1 text-brand-gray-500 md:grid-cols-4">
            <div className="col-span-1 md:col-span-2">
              <div className="mb-1 font-bold">Document Status</div>

              <Badge className="mb-4 border-brand-secondary px-2 py-0.5 capitalize text-brand-secondary">
                {orderDetail?.orderStatus ?? "N/A"}
              </Badge>

              <div>
                <div className="flex flex-row">
                  <div className="flex-1 font-bold">Account No:</div>
                  <div className="flex-1">{orderDetail?.soldTo ?? "N/A"}</div>
                </div>
                <div className="flex flex-row">
                  <div className="flex-1 font-bold">Order By:</div>
                  <div className="flex-1 truncate whitespace-nowrap">
                    {orderDetail?.orderBy !== orderDetail?.email
                      ? orderDetail?.orderBy
                      : `${orderDetail.firstName} ${orderDetail.lastName}`}
                  </div>
                </div>
                <div className="flex flex-row">
                  <div className="flex-1 font-bold">Email:</div>
                  <div className="flex-1 truncate whitespace-nowrap">
                    {orderDetail?.email ?? "N/A"}
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className="font-bold">Billing Address</div>
              <div>{orderDetail?.billToAddress?.attention ?? ""}</div>
              <div>{orderDetail?.billToAddress?.street ?? ""}</div>
              <div>{orderDetail?.billToAddress?.city ?? ""}</div>
              <div>
                {orderDetail?.billToAddress?.region ?? ""}&nbsp;
                {orderDetail?.billToAddress?.zipCode ?? ""}
              </div>
              <div>Phone : {orderDetail?.billToAddress?.phoneNumber ?? ""}</div>
            </div>

            <div>
              <div className="font-bold">Shipping Address</div>
              <div>{orderDetail?.shipToAddress?.attention ?? ""}</div>
              <div>{orderDetail?.shipToAddress?.street ?? ""}</div>
              <div>{orderDetail?.shipToAddress?.city ?? ""}</div>
              <div>
                {orderDetail?.shipToAddress?.region ?? ""}&nbsp;
                {orderDetail?.shipToAddress?.zipCode ?? ""}
              </div>
              <div>Phone : {orderDetail?.shipToAddress?.phoneNumber ?? ""}</div>
            </div>
          </div>

          <Separator
            orientation="horizontal"
            className="h-px flex-1 bg-brand-gray-200"
          />

          <div className="grid grid-cols-2 text-brand-gray-500">
            <div>
              <div className="flex flex-row">
                <div className="flex-1 font-bold">Order Date:</div>
                <div className="flex-1">
                  {orderDetail?.orderDate !== ""
                    ? dayjs(orderDetail.orderDate).format("MM/DD/YYYY")
                    : "N/A"}
                </div>
              </div>

              <div className="flex flex-row">
                <div className="flex-1 font-bold">Job Name:</div>
                <div className="flex-1">{orderDetail?.jobName ?? "N/A"}</div>
              </div>

              <div className="flex flex-row">
                <div className="flex-1 font-bold">PO#:</div>
                <div className="flex-1">{orderDetail?.po ?? "N/A"}</div>
              </div>

              <div className="flex flex-row">
                <div className="flex-1 font-bold">Payment Method:</div>
                <div className="flex-1">
                  {getPaymentMethodName(orderDetail?.paymentMethod)}
                </div>
              </div>

              <div className="flex flex-row">
                <div className="flex-1 font-bold">Promo Code:</div>
                <div className="flex-1">
                  {orderDetail?.promoCode !== ""
                    ? orderDetail.promoCode
                    : "N/A"}
                </div>
              </div>

              <div className="flex flex-row">
                <div className="flex-1 font-bold">Driver Note:</div>
                <div className="flex-1">
                  {orderDetail?.driverNotes !== ""
                    ? orderDetail.driverNotes
                    : "N/A"}
                </div>
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex flex-row items-center justify-between">
                <div>Shipping & Handing</div>
                <div>${formatNumberToPrice(orderDetail.handlingFee)}</div>
              </div>

              <Separator
                orientation="horizontal"
                className="h-px flex-1 bg-brand-gray-200"
              />

              <div className="flex flex-row items-center justify-between">
                <div>Sub Total</div>
                <div>${formatNumberToPrice(orderDetail.subTotal)}</div>
              </div>

              <div className="flex flex-row items-center justify-between">
                <div>Sales Tax</div>
                <div>${formatNumberToPrice(orderDetail.taxAmount)}</div>
              </div>

              <Separator
                orientation="horizontal"
                className="h-0.5 flex-1 bg-brand-gray-200"
              />

              <div className="flex flex-row items-center justify-between font-bold">
                <div>Order Total</div>
                <div>${formatNumberToPrice(orderDetail.orderTotal)}</div>
              </div>
            </div>
          </div>

          <Link
            href={orderTrackingHref}
            className="btnAction block w-fit rounded-sm bg-brand-secondary px-4 py-2 text-center font-wurth text-base font-extrabold uppercase text-white"
            data-button-action="Order History Order Tracking Log"
          >
            Order Tracking Log
          </Link>

          {orderDetail.completeDelivery && (
            <AlertInline
              variant="destructive"
              title="Important!"
              description="This order will not ship until back order item(s) are in stock."
            />
          )}

          {/* Desktop View for Order Line Items */}
          {orderDetail.items.length > 0 &&
            orderDetail.items.map((item, index) => (
              <OrderItem
                key={item.productId}
                orderItem={item}
                index={index}
                // If the product is discontinued, the get item info API
                // doesn't return anything
                isDiscontinued={
                  !itemsInfo.some((info) => info.productId === item.productId)
                }
                getShippingMethodName={getShippingMethodName}
                getPlantName={getPlantName}
                gtmProductInfo={gtmProductInfo.find(
                  (product) => Number(product.productid) === item.productId,
                )}
              />
            ))}
        </div>

        {/* Mobile View for Order Details */}
        <OrderDetailsForMobile
          orderDetail={orderDetail}
          paymentMethods={paymentMethods}
        />
      </div>

      {/* Mobile View for Order Line Items */}
      <div className="block md:hidden">
        {orderDetail.items.length > 0 &&
          orderDetail.items.map((item) => (
            <OrderItemForMobile
              key={item.productId}
              orderItem={item}
              // If the product is discontinued, the get item info API
              // doesn't return anything
              isDiscontinued={
                !itemsInfo.some((info) => info.productId === item.productId)
              }
              shippingMethods={shippingMethods}
              plants={plants}
              gtmProductInfo={gtmProductInfo.find(
                (product) => Number(product.productid) === item.productId,
              )}
            />
          ))}
      </div>
    </>
  );
};

export default DetailedOrderPage;
