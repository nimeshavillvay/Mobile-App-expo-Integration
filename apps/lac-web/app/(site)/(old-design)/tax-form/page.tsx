import Separator from "@/old/_components/separator";
import Title from "@/old/_components/title";
import { Skeleton } from "@repo/web-ui/components/ui/skeleton";
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { getTaxFormDetails } from "./apis";
import StateSelector from "./state-selector";

const DynamicMap = dynamic(() => import("./map"), {
  ssr: false,
  loading: () => (
    <Skeleton className="w-full md:h-[285px] lg:h-[388px] xl:h-[490px] 2xl:h-[595px]" />
  ),
});

export const metadata: Metadata = {
  title: "Sales Tax And Exemption",
};

const SalesTaxAndExemptionPage = async () => {
  const taxFormDetails = await getTaxFormDetails();

  return (
    <div className="container mt-7">
      <div className="flex flex-row items-center gap-2.5">
        <Title className="text-brand-primary">
          Sales Tax (Exemption Certificates)
        </Title>

        <Separator
          orientation="horizontal"
          className="h-px flex-1 bg-brand-primary"
        />
      </div>

      <div className="mt-4">
        <b>Sales taxes are charged in the following states:&nbsp;</b>
        You can download the PDF form by clicking on your state or selecting it
        from the dropdown
      </div>

      <div className="mt-4 grid grid-cols-3 gap-1 md:grid-cols-4">
        <div className="col-span-1 hidden md:col-span-3 md:block">
          <DynamicMap taxFormDetails={taxFormDetails} />
        </div>

        <div className="col-span-3 md:col-span-1">
          <StateSelector taxFormDetails={taxFormDetails} />
        </div>
      </div>

      <div className="mt-3">
        If your state is not displayed, please call (800) 444-0043 Option 2 for
        more information
      </div>
    </div>
  );
};

export default SalesTaxAndExemptionPage;
