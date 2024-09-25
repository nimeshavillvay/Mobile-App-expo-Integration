import SalesRepresentative from "@/_components/sales-representative";
import { loginCheck } from "@/_lib/apis/shared";
import { SESSION_TOKEN_COOKIE } from "@/_lib/constants";
import { Skeleton } from "@repo/web-ui/components/ui/skeleton";
import { cookies } from "next/headers";
import { Suspense } from "react";

const FooterSaleRepDetails = async () => {
  const cookieStore = cookies();
  const sessionToken = cookieStore.get(SESSION_TOKEN_COOKIE);

  const token = sessionToken?.value;
  if (!token) {
    return null;
  }

  const loginData = await loginCheck(token);

  if (loginData?.status_code === "NOT_LOGGED_IN") {
    return null;
  }

  return (
    <Suspense fallback={<Skeleton className="h-72" />}>
      <SalesRepresentative token={token} />
    </Suspense>
  );
};

export default FooterSaleRepDetails;
