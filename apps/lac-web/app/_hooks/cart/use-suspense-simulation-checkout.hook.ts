import { api } from "@/_lib/api";
import type { CartConfiguration } from "@/_lib/types";
import { useSuspenseQuery } from "@tanstack/react-query";

const useSuspenseSimulationCheckout = (token: string) => {
  return useSuspenseQuery({
    queryKey: ["cart", "simulation-checkout", token],
    queryFn: async () => {
      return await api
        .get("rest/simulation-checkout", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          cache: "no-cache",
        })
        .json<{
          net: number;
          shippingcost: number;
          tax: number;
          discount: number;
          total: number;
          "total-quantity": number;
          cartItemsCount: number;
          delivery?: {
            home: number;
            multi: number;
            truck: string;
          };
          configuration: CartConfiguration;
          productslist: {
            extendedprice: number;
            price: number;
            priceunit: string;
            sku: string;
            productid: string;
            cartid?: number;
            coupon: string | null;
            quantity: number;
            overrideprice: string;
            originalprice: number | null;
          }[];
        }>();
    },
    select: (data) => {
      return {
        net: data.net,
        shippingCost: data.shippingcost,
        tax: data.tax,
        discount: data.discount,
        total: data.total,
        totalQuantity: data["total-quantity"],
        cartItemsCount: data.cartItemsCount,
        delivery: data.delivery
          ? {
              home: data.delivery.home,
              multi: data.delivery.multi,
              truck: data.delivery.truck,
            }
          : undefined,
        configuration: {
          soldTo: data.configuration.sold_to,
          shipTo: data.configuration.ship_to,
          paymentMethod: data.configuration.paymentMethod,
          orderEmail: data.configuration.orderEmail,
          poJob: data.configuration.po_job,
          jobName: data.configuration.jobName,
          po: data.configuration.po,
          userEmail: data.configuration.user_email,
          isOverridden: data.configuration.is_overridden,
          overriddenEmail: data.configuration.overridden_email,
          completeDelivery: data.configuration.completeDelivery,
          pickDate: data.configuration.pickDate,
          coupon: data.configuration.coupon,
          osr: data.configuration.osr,
          attnName: data.configuration.attnName,
          driverNote: data.configuration.driverNote,
          firstName: data.configuration["first-name"],
          deliveringPlant: data.configuration.delivering_plant,
          availablePaymentOptions: data.configuration.avail_payment_options,
          cardName: data.configuration.cardName,
          cardType: data.configuration.cardType,
          expireDate: data.configuration.expireDate,
          shippingAddressId: data.configuration.shippingAddressId,
          paymentToken: data.configuration.paymentToken,
          backOrderDate: data.configuration.backorder_date,
          backOrderQuantity: data.configuration.backorder_quantity,
        },
        productslist: data.productslist.map((item) => ({
          extendedPrice: item.extendedprice,
          price: item.price,
          productSku: item.sku,
          productId: parseInt(item.productid),
          cartId: item.cartid,
          coupon: item.coupon,
          quantity: item.quantity,
          overridePrice: item.overrideprice,
          originalPrice: item.originalprice != null ? item.originalprice : null,
        })),
      };
    },
  });
};

export default useSuspenseSimulationCheckout;
