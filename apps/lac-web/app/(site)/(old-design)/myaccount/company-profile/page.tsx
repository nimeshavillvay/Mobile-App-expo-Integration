import SalesRepresentative from "@/_components/sales-representative";
import { getCountries } from "@/_lib/apis/server";
import { SESSION_TOKEN_COOKIE } from "@/_lib/constants";
import Separator from "@/old/_components/separator";
import Title from "@/old/_components/title";
import { CloudDownload } from "@repo/web-ui/components/icons/cloud-download";
import { Skeleton } from "@repo/web-ui/components/ui/skeleton";
import type { Metadata } from "next";
import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import BillingAddress from "./billing-address";
import CompanyProfileImage from "./company-profile-image";
import ShippingAddress from "./shipping-address";

export const metadata: Metadata = {
  title: "Company Profile",
};

const CompanyProfilePage = async () => {
  const cookieStore = cookies();
  const sessionToken = cookieStore.get(SESSION_TOKEN_COOKIE);

  if (!sessionToken?.value) {
    return redirect("/");
  }
  const apiUrl = process.env.NEXT_PUBLIC_WURTH_LAC_API;

  const countries = await getCountries();

  return (
    <>
      <div className="mb-4 flex flex-row items-center gap-2.5">
        <Title className="relative font-wurth text-xl font-medium text-brand-primary">
          Company Profile
        </Title>

        <Separator
          orientation="horizontal"
          className="h-px flex-1 bg-brand-primary"
        />
      </div>

      <div className="mb-5 grid grid-cols-1 gap-10 md:grid-cols-6">
        <div className="md:col-span-2">
          <Suspense fallback={<Skeleton className="mb-5 h-[114px]" />}>
            <CompanyProfileImage token={sessionToken?.value} />
          </Suspense>

          <BillingAddress token={sessionToken?.value} />
        </div>

        <div className="md:col-span-3">
          <Suspense fallback={<Skeleton className="h-72" />}>
            <SalesRepresentative token={sessionToken.value} />
          </Suspense>
          <div className="mt-3 flex items-center">
            <Link
              className="btnAction flex items-center text-nowrap rounded-sm bg-brand-secondary px-4 py-2 text-center font-wurth font-extrabold uppercase text-white hover:bg-[#008fc6]"
              href={`${apiUrl}/assets/Account_Application.pdf`}
              target="_blank"
              data-button-action="Company Profile Request for Payment Terms"
            >
              <CloudDownload className="ml-2 mr-4 h-5 w-5" />
              <span>Request for Payment Terms</span>
            </Link>
          </div>
        </div>
      </div>
      <ShippingAddress token={sessionToken?.value} countries={countries} />
    </>
  );
};

export default CompanyProfilePage;
