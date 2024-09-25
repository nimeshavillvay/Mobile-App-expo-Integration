import { getPlants, getShippingMethods } from "@/_lib/apis/server";
import { SESSION_TOKEN_COOKIE } from "@/_lib/constants";
import Separator from "@/old/_components/separator";
import { Skeleton } from "@repo/web-ui/components/ui/skeleton";
import type { Metadata } from "next";
import { cookies } from "next/headers";
import { notFound, redirect } from "next/navigation";
import { Suspense } from "react";
import BackButton from "../../back-button";
import { getOrderTrackingLog } from "./api";
import OrderTrackingCard from "./order-tracking-card";
import SelectedShippingName from "./selected-shipping-name";

type OrderTrackingLogPageProps = {
  readonly params: {
    orderId: string;
  };
};

export const generateMetadata = async ({
  params: { orderId },
}: OrderTrackingLogPageProps): Promise<Metadata> => {
  // Check if the orderId exists
  if (!orderId) {
    return notFound();
  }

  return {
    title: `Order Tracking - ${orderId}`,
    description: `Order tracking log related to order - ${orderId}`,
  };
};

const OrderTrackingLogPage = async ({
  params: { orderId },
}: OrderTrackingLogPageProps) => {
  const sessionTokenCookie = cookies().get(SESSION_TOKEN_COOKIE);

  if (!sessionTokenCookie?.value) {
    return redirect("/");
  }

  if (!orderId) {
    return notFound();
  }

  const { trackingInfo, orderNo, shipToAddress, driverNotes } =
    await getOrderTrackingLog(orderId);

  const [shippingMethods, plants] = await Promise.all([
    getShippingMethods(),
    getPlants(sessionTokenCookie?.value),
  ]);

  return (
    <>
      <BackButton title={`Back to Order #${orderNo}`} className="md:my-4" />

      <div className="container md:px-0">
        <h1 className="mt-[0.938rem] font-wurth text-[1.188rem] leading-6 text-brand-primary md:hidden">
          Order tracking - {orderNo}
        </h1>

        <Separator
          orientation="horizontal"
          className="mt-[0.313rem] h-px flex-1 bg-brand-primary"
        />

        <div className="space-y-4">
          <div className="grid grid-cols-1 pt-4 text-brand-gray-500 md:grid-cols-3 md:py-4">
            <div className="hidden py-2 font-wurth text-[1.188rem] font-bold md:block">
              Order# {orderNo}
            </div>

            <div className="flex flex-col rounded-t border border-b-0 p-3 md:border-0 md:p-0">
              <div className="mb-1 text-sm md:mb-0 md:py-2 md:font-wurth md:text-[1.188rem] md:font-bold">
                Shipping Address
              </div>

              <Suspense fallback={<Skeleton className="mb-1 h-4 w-60" />}>
                <SelectedShippingName token={sessionTokenCookie?.value} />
              </Suspense>

              <div className="text-wrap">
                {shipToAddress.street && `${shipToAddress.street},`}
              </div>

              {shipToAddress?.attention && shipToAddress.attention !== "" && (
                <div>{`${shipToAddress.attention},`}</div>
              )}

              <div>
                {shipToAddress.city && `${shipToAddress.city}, `}
                {shipToAddress.region}&nbsp;
                {shipToAddress.zipCode}
              </div>

              <div>
                Phone:&nbsp;
                {shipToAddress.phoneNumber}
              </div>
            </div>

            <div className="flex flex-col rounded-b border p-3 md:border-0 md:p-0">
              <div className="text-sm md:py-2 md:font-wurth md:text-[1.188rem] md:font-bold">
                Driver&rsquo;s Notes
              </div>

              <p>{driverNotes}</p>
            </div>
          </div>

          {trackingInfo?.length > 0 &&
            trackingInfo.map((info, index) => (
              <OrderTrackingCard
                key={`${info?.plant}-${index}`}
                trackingInfo={info}
                shippingMethods={shippingMethods}
                plants={plants}
              />
            ))}
        </div>
      </div>
    </>
  );
};

export default OrderTrackingLogPage;
