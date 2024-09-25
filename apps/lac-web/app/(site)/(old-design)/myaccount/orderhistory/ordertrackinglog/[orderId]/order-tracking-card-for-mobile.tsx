"use client";

import type { Plant, ShippingMethod } from "@/_lib/types";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/old/_components/ui/collapsible";
import dayjs from "dayjs";
import Link from "next/link";
import { useState } from "react";
import { MdAssignment, MdKeyboardArrowDown } from "react-icons/md";
import { UI_DATE_FORMAT } from "./constants";
import type { TrackingInfo } from "./types";

type OrderTrackingCardProps = {
  readonly trackingInfo: TrackingInfo;
  readonly shippingMethods: ShippingMethod[];
  readonly plants: Plant[];
};

const OrderTrackingCardForMobile = ({
  trackingInfo,
  shippingMethods,
  plants,
}: OrderTrackingCardProps) => {
  const [isOpen, setIsOpen] = useState(false);

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
    <Collapsible
      className="rounded border p-4 md:hidden"
      open={isOpen}
      onOpenChange={setIsOpen}
    >
      <CollapsibleTrigger className="group flex w-full cursor-pointer items-center justify-between text-base font-bold text-black">
        <MdAssignment className="mr-2 text-2xl leading-none text-brand-gray-400" />
        <span className="w-full text-left">
          Shipped from&nbsp;
          {trackingInfo?.plant ? getPlantName(trackingInfo.plant) : "N/A"}
        </span>
        <MdKeyboardArrowDown className="text-2xl leading-none text-brand-gray-400 transition-transform duration-200 ease-out group-data-[state=open]:rotate-180" />
      </CollapsibleTrigger>

      <CollapsibleContent className="mt-4">
        {trackingInfo?.deliveries?.length &&
          trackingInfo.deliveries.map((delivery) => (
            <div
              key={`${delivery?.deliveryNo}-${delivery?.shipDate}`}
              className="rounded bg-brand-gray-100 p-3"
            >
              <div className="grid grid-cols-2 gap-3 text-brand-gray-500">
                <div>
                  <div className="text-[13px]">Ship Date</div>
                  <div className="text-sm font-bold">
                    {delivery?.shipDate
                      ? dayjs(delivery?.shipDate).format(UI_DATE_FORMAT)
                      : "N/A"}
                  </div>
                </div>

                <div>
                  <div className="text-[13px]">Delivery#</div>
                  <div className="text-sm font-bold">
                    {delivery?.deliveryNo ?? "N/A"}
                  </div>
                </div>

                <div>
                  <div className="text-[13px]">Shipper</div>
                  <div className="text-sm font-bold">
                    {delivery?.shippingMethod
                      ? getShippingMethodName(delivery.shippingMethod)
                      : "N/A"}
                  </div>
                </div>

                <div>
                  <div className="text-[13px]">Tracking#</div>
                  {delivery &&
                    delivery.tracker?.length &&
                    delivery.tracker.map((tracker) => (
                      <Link
                        key={`${delivery.deliveryNo}-${tracker.code}`}
                        href={tracker.url ?? "#"}
                        target="_blank"
                        className="btnAction text-sm font-bold"
                        data-button-action={`View Tracker Code ${tracker.code ?? "N/A"}`}
                      >
                        {tracker.code ?? "N/A"}
                      </Link>
                    ))}
                </div>
              </div>
            </div>
          ))}
      </CollapsibleContent>
    </Collapsible>
  );
};

export default OrderTrackingCardForMobile;
