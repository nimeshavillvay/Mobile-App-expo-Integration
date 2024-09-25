import OrderSummary from "@/_components/order-summary";
import { getCountries, getPaymentMethods, getPlants } from "@/_lib/apis/server";
import { SESSION_TOKEN_COOKIE } from "@/_lib/constants";
import { Skeleton } from "@repo/web-ui/components/ui/skeleton";
import type { Metadata } from "next";
import { cookies } from "next/headers";
import { Suspense } from "react";
import BillingAndPaymentInfo from "./_billing-and-payment-info";
import ShippingAndPickupDetails from "./_shipping-and-pickup-details";
import CartSummary from "./cart-summary";

export const metadata: Metadata = {
  title: "Checkout",
  robots: {
    index: false,
    follow: false,
  },
};

const CheckoutPage = async () => {
  const cookiesStore = cookies();
  const sessionCookie = cookiesStore.get(SESSION_TOKEN_COOKIE);

  if (!sessionCookie?.value) {
    return null;
  }

  const [plants, paymentMethods, countries] = await Promise.all([
    getPlants(sessionCookie?.value),
    getPaymentMethods(),
    getCountries(),
  ]);

  return (
    <>
      <h1 className="container mb-6 mt-4 text-2xl font-medium tracking-[-0.144px] text-wurth-gray-800 md:mb-7 md:mt-6 md:text-5xl md:leading-[3.5rem] md:tracking-[-0.576px]">
        Checkout
      </h1>

      <div className="container flex flex-col md:flex-row md:gap-12">
        <div className="flex min-w-0 flex-1 flex-col gap-5 md:gap-6">
          <Suspense
            fallback={
              <Skeleton className="h-[246px] rounded-lg shadow-lg md:h-[254px]" />
            }
          >
            <CartSummary token={sessionCookie.value} plants={plants} />
          </Suspense>

          <Suspense
            fallback={
              <Skeleton className="h-[694px] rounded-lg shadow-lg md:h-[350px]" />
            }
          >
            <ShippingAndPickupDetails
              token={sessionCookie.value}
              countries={countries}
            />
          </Suspense>

          <Suspense
            fallback={
              <Skeleton className="h-[854px] rounded-lg shadow-lg md:h-[570px]" />
            }
          >
            <BillingAndPaymentInfo
              token={sessionCookie.value}
              paymentMethods={paymentMethods}
            />
          </Suspense>
        </div>

        <aside className="flex shrink-0 flex-col gap-5 py-4 md:w-[19.75rem] md:px-0 md:py-0">
          <Suspense
            fallback={<Skeleton className="h-[244px] rounded-lg shadow-md" />}
          >
            <OrderSummary token={sessionCookie.value} />
          </Suspense>
        </aside>
      </div>
    </>
  );
};

export default CheckoutPage;
