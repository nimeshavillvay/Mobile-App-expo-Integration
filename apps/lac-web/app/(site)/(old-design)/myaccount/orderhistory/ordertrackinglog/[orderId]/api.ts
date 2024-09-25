import { api } from "@/_lib/api";
import { SESSION_TOKEN_COOKIE } from "@/_lib/constants";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import "server-only";
import type { OrderTracker } from "./types";

export const getOrderTrackingLog = async (orderId: string) => {
  const cookiesStore = cookies();
  const sessionToken = cookiesStore.get(SESSION_TOKEN_COOKIE);

  try {
    const { orderNo, shipToAddress, tracking_info, driverNotes } = await api
      .get("rest/order-history/tracker", {
        headers: {
          Authorization: `Bearer ${sessionToken?.value}`,
        },
        searchParams: {
          orderNo: orderId,
        },
      })
      .json<OrderTracker>();

    if (!orderNo) {
      throw new Error("Order not found");
    } else {
      const transformedData = {
        orderNo: orderNo,
        shipToAddress: {
          attention: shipToAddress.attention,
          street: shipToAddress.shipToStreet,
          city: shipToAddress.shipToCity,
          zipCode: shipToAddress.shipToZip,
          country: shipToAddress.shipToCountry,
          region: shipToAddress.shipToRegion,
          phoneNumber: shipToAddress.shipToPhone,
        },
        trackingInfo: tracking_info,
        driverNotes: driverNotes,
      };

      return transformedData;
    }
  } catch {
    return notFound();
  }
};
