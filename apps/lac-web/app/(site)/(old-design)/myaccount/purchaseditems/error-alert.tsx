import AlertInline from "@/old/_components/alert-inline";
import type { DetailedPurchasedItem } from "./types";

const ErrorAlert = ({ item }: { readonly item: DetailedPurchasedItem }) => {
  if (!item?.productSku) {
    return (
      <AlertInline
        variant="destructive"
        title="Error!"
        description="Not available online. Please call Customer Service for availability"
      />
    );
  }

  if (item?.isDiscontinued || item?.productStatus === "DL") {
    return (
      <AlertInline
        variant="destructive"
        title="DISCONTINUED"
        description="This item is no longer available"
      />
    );
  }

  if (item?.productStatus === "DU" || item?.productStatus === "DV") {
    return (
      <AlertInline
        variant="destructive"
        title="Will be Discontinued"
        description="Stock is limited"
      />
    );
  }

  return null;
};

export default ErrorAlert;
