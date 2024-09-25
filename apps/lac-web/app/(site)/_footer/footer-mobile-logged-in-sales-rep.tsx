import { getAccountList } from "@/_hooks/user/use-suspense-account-list.hook";
import { loginCheck } from "@/_lib/apis/shared";
import { SESSION_TOKEN_COOKIE } from "@/_lib/constants";
import { cn } from "@/_lib/utils";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@repo/web-ui/components/ui/accordion";
import { Skeleton } from "@repo/web-ui/components/ui/skeleton";
import { cookies } from "next/headers";
import { Suspense } from "react";
import { SECTIONS } from "./constants";
import FooterSaleRepDetails from "./footer-sales-rep-details";

const FooterMobileLoggedInSalesRep = async ({
  heading,
  index,
}: {
  readonly heading: string;
  readonly index: number;
}) => {
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

  const accountListQuery = await getAccountList(token);
  const salesRep = accountListQuery.sales_rep;

  if (Array.isArray(salesRep) || !("fullname" in salesRep)) {
    // If there is not sales rep, the field is an empty array
    return null;
  }

  return (
    <AccordionItem
      key={heading}
      value={heading}
      className={cn(
        "border-t border-y-wurth-gray-250",
        index === SECTIONS.length - 1 && "border-b",
      )}
    >
      <AccordionTrigger className="flex-row-reverse justify-between gap-4 p-3 text-base font-semibold text-black">
        {heading}
      </AccordionTrigger>

      <AccordionContent className="px-3">
        <Suspense fallback={<Skeleton className="h-fit w-full" />}>
          <FooterSaleRepDetails />
        </Suspense>
      </AccordionContent>
    </AccordionItem>
  );
};

export default FooterMobileLoggedInSalesRep;
