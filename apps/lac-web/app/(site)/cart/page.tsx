import OrderSummary from "@/_components/order-summary";
import { getPlants } from "@/_lib/apis/server";
import { SESSION_TOKEN_COOKIE } from "@/_lib/constants";
import { Skeleton } from "@repo/web-ui/components/ui/skeleton";
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import CartList from "./_cart-list";
import CheckoutButton from "./_checkout-button";
import CartDetails from "./cart-details";
import { CartFormIdProvider } from "./cart-form-id-context";
import CartHeading from "./cart-heading";
import CartItemFallback from "./cart-item-fallback";
import ShippingMethod from "./shipping-method";

const DynamicAddMoreItemsSection = dynamic(
  () => import("./_add-more-items/add-more-items-form"),
  {
    ssr: false,
    loading: () => <Skeleton className="h-[415px] w-full" />,
  },
);

export const metadata: Metadata = {
  title: "Cart",
  robots: {
    index: false,
    follow: false,
  },
};

const CartPage = async () => {
  const cookiesStore = cookies();
  const sessionToken = cookiesStore.get(SESSION_TOKEN_COOKIE);

  if (!sessionToken?.value) {
    return redirect("/");
  }

  const plants = await getPlants(sessionToken?.value);

  if (!sessionToken?.value) {
    return null;
  }

  return (
    <CartFormIdProvider>
      <Suspense
        fallback={
          <div className="container">
            <Skeleton className="mb-6 mt-4 h-8 w-40 md:mb-7 md:mt-6 md:h-14" />
          </div>
        }
      >
        <CartHeading token={sessionToken.value} />
      </Suspense>
      <div className="ml-2 flex flex-col md:container xl:flex-row xl:gap-12">
        <div className="flex-1">
          <Suspense
            fallback={
              <ul className="flex flex-col">
                {Array.from({ length: 3 }).map((_, index) => (
                  <li
                    key={index}
                    className="border-b border-b-wurth-gray-250 px-4 pb-7 md:px-0 [&:not(:first-child)]:pt-7"
                  >
                    <CartItemFallback />
                  </li>
                ))}
              </ul>
            }
          >
            <CartList token={sessionToken.value} plants={plants} />

            <div className="hidden md:block">
              <DynamicAddMoreItemsSection />
            </div>
          </Suspense>
        </div>

        <aside className="flex shrink-0 flex-col gap-5 px-6 py-4 xl:w-[19.75rem] xl:px-0 xl:py-0">
          <Suspense
            fallback={<Skeleton className="h-[182px] rounded-lg shadow-md" />}
          >
            <CartDetails token={sessionToken.value} />
          </Suspense>

          <Suspense
            fallback={<Skeleton className="h-[158px] rounded-lg shadow-md" />}
          >
            <ShippingMethod token={sessionToken.value} plants={plants} />
          </Suspense>

          <Suspense
            fallback={<Skeleton className="h-[316px] rounded-lg shadow-md" />}
          >
            <OrderSummary token={sessionToken.value}>
              <CheckoutButton />
            </OrderSummary>
          </Suspense>
        </aside>
      </div>
    </CartFormIdProvider>
  );
};

export default CartPage;
