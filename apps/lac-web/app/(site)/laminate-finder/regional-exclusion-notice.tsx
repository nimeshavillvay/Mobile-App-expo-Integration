"use client";

import useSuspenseProductExcluded from "@/_hooks/product/use-suspense-product-excluded.hook";

const RegionalExclusionNotice = ({
  token,
  productId,
}: {
  readonly token: string;
  readonly productId: number;
}) => {
  const productExcludedQuery = useSuspenseProductExcluded(token, productId);

  if (!productExcludedQuery.data.isExcluded) {
    return null;
  }

  return (
    <p className="mt-1 max-w-44 rounded bg-red-50 px-2 py-1 text-xs text-red-800">
      This item is not available
      <br /> in your territory.
    </p>
  );
};

export default RegionalExclusionNotice;
