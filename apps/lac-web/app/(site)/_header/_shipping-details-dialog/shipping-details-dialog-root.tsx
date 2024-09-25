import ShippingDetailsDialog from "@/_components/shipping-details-dialog";
import { getCountries, getShippingMethods } from "@/_lib/apis/server";
import { SESSION_TOKEN_COOKIE } from "@/_lib/constants";
import { Skeleton } from "@repo/web-ui/components/ui/skeleton";
import { cookies } from "next/headers";
import { Suspense } from "react";

const ShippingDetailsDialogMain = async () => {
  const cookiesStore = cookies();
  const sessionCookies = cookiesStore.get(SESSION_TOKEN_COOKIE);

  const [shippingMethods, countries] = await Promise.all([
    getShippingMethods(),
    getCountries(),
  ]);

  if (!sessionCookies?.value) {
    return null;
  }

  return (
    <ShippingDetailsDialog
      token={sessionCookies.value}
      shippingMethods={shippingMethods}
      countries={countries}
    />
  );
};

const ShippingDetailsDialogRoot = () => {
  return (
    <Suspense fallback={<Skeleton className="h-5 w-20" />}>
      <ShippingDetailsDialogMain />
    </Suspense>
  );
};

export default ShippingDetailsDialogRoot;
