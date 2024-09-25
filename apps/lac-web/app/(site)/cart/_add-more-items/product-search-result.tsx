import WurthLacLogo from "@/_components/wurth-lac-logo";
import { Alert } from "@repo/web-ui/components/icons/alert";
import Image from "next/image";

const ProductSearchResult = ({
  product,
  isLoading,
  isLastEditedIndex,
}: {
  readonly product: {
    isInvalid?: boolean | null;
    info?: {
      title: string;
      minQuantity: number;
      orderIncrementBy: number;
      image: string;
    };
  };
  readonly isLoading: boolean;
  readonly isLastEditedIndex: boolean;
}) => {
  if (isLoading && isLastEditedIndex) {
    return (
      <div className="flex h-10 items-center px-3 font-medium">
        Please wait...
      </div>
    );
  }

  if (product.isInvalid) {
    return (
      <div className="flex h-10 items-center gap-2 rounded bg-[#FEF2F2] p-3 text-sm font-medium text-wurth-red-650">
        <Alert
          className="mt-1 shrink-0 stroke-wurth-red-650"
          width={18}
          height={18}
        />
        Item not found. Try again.
      </div>
    );
  }

  if (product.info) {
    return (
      <div className="flex items-center gap-2 text-sm">
        <div className="min-w-16 text-xs">
          <div>Min qty: {product.info.minQuantity}</div>
          <div>Sold in: {product.info.orderIncrementBy}</div>
        </div>

        {product.info.image ? (
          <Image
            src={product.info?.image}
            alt={product.info?.title}
            width={40}
            height={40}
          />
        ) : (
          <WurthLacLogo className="max-w-10" />
        )}

        <div>
          {product.info.title?.length > 65
            ? product.info.title.substring(0, 65) + "..."
            : product.info.title}
        </div>
      </div>
    );
  }

  return null;
};

export default ProductSearchResult;
