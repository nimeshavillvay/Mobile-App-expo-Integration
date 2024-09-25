import { api } from "@/_lib/api";
import { DEFAULT_REVALIDATE } from "@/_lib/constants";
import { notFound, permanentRedirect } from "next/navigation";

type OldProductPageProps = {
  params: {
    sku: string;
    groupId: string;
  };
};

const OldProductPage = async ({ params: { sku } }: OldProductPageProps) => {
  const response = await api
    .get("rest/getproductid", {
      searchParams: {
        sku,
      },
      next: {
        revalidate: DEFAULT_REVALIDATE,
      },
    })
    .json<
      {
        productid: string;
        groupid: string;
        slug: string;
      }[]
    >();

  if (response[0] && response[0].productid && response[0].slug) {
    return permanentRedirect(
      `/product/${response[0].productid}/${response[0].slug}`,
    );
  } else {
    return notFound();
  }
};

export default OldProductPage;
