import type { Plant, ShippingMethod } from "@/_lib/types";
import dayjs from "dayjs";
import Link from "next/link";
import { UI_DATE_FORMAT } from "./constants";
import OrderTrackingCardForMobile from "./order-tracking-card-for-mobile";
import type { TrackingInfo } from "./types";

type OrderTrackingCardProps = {
  readonly trackingInfo: TrackingInfo;
  readonly shippingMethods: ShippingMethod[];
  readonly plants: Plant[];
};

const OrderTrackingCard = ({
  trackingInfo,
  shippingMethods,
  plants,
}: OrderTrackingCardProps) => {
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
      <div className="hidden p-[30px] shadow-[0_1px_6px_rgba(0,0,0,.148324)] md:block">
        <div className="mb-5 font-bold text-brand-primary">
          Shipped from&nbsp;
          {trackingInfo?.plant ? getPlantName(trackingInfo.plant) : "N/A"}
        </div>
        {trackingInfo?.deliveries?.length &&
          trackingInfo.deliveries.map((delivery) => (
            <div key={`${delivery?.deliveryNo}-${delivery?.shipDate}`}>
              <div className="mb-4 grid grid-cols-1 text-brand-gray-500 md:grid-cols-3">
                <div className="font-bold">
                  Ship Date:&nbsp;
                  {delivery?.shipDate
                    ? dayjs(delivery?.shipDate).format(UI_DATE_FORMAT)
                    : "N/A"}
                </div>
                <div className="font-bold">
                  Delivery#: {delivery?.deliveryNo ?? "N/A"}
                </div>
                <div className="font-bold">
                  Shipper:&nbsp;
                  {delivery?.shippingMethod
                    ? getShippingMethodName(delivery.shippingMethod)
                    : "N/A"}
                </div>
              </div>
              {delivery &&
                delivery.tracker?.length &&
                delivery.tracker.map((tracker) => (
                  <Link
                    key={`${delivery.deliveryNo}-${tracker.code}`}
                    className="btnAction font-bold text-black"
                    href={tracker.url ?? "#"}
                    target="_blank"
                    data-button-action={`View Tracker Code ${tracker.code ?? "N/A"}`}
                  >
                    Tracking#: {tracker.code ?? "N/A"}
                  </Link>
                ))}
            </div>
          ))}
      </div>

      <OrderTrackingCardForMobile
        trackingInfo={trackingInfo}
        shippingMethods={shippingMethods}
        plants={plants}
      />
    </>
  );
};

export default OrderTrackingCard;
