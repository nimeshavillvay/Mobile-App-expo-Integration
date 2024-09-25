import { SESSION_TOKEN_COOKIE } from "@/_lib/constants";
import { Skeleton } from "@repo/web-ui/components/ui/skeleton";
import { cookies } from "next/headers";
import { Suspense, type ComponentProps } from "react";
import LocationStocks from "./location-stocks";

const LocationStocksWrapper = (
  props: Omit<ComponentProps<typeof LocationStocks>, "token">,
) => {
  const cookiesStore = cookies();
  const sessionCookie = cookiesStore.get(SESSION_TOKEN_COOKIE);

  if (!sessionCookie?.value) {
    return null;
  }

  return <LocationStocks token={sessionCookie.value} {...props} />;
};

const LocationStocksRoot = (
  props: ComponentProps<typeof LocationStocksWrapper>,
) => {
  return (
    <Suspense fallback={<Skeleton className="h-6" />}>
      <LocationStocksWrapper {...props} />
    </Suspense>
  );
};

export default LocationStocksRoot;
