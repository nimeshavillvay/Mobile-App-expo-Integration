import { updateSearchParams } from "@/old/_utils/client-helpers";
import "client-only";
import type { QUERY_KEYS } from "./constants";
import type { DetailedPurchasedItem } from "./types";

export const changeSearchParams = (
  searchParams: URLSearchParams,
  params: {
    key: (typeof QUERY_KEYS)[keyof typeof QUERY_KEYS];
    value: string;
  }[],
) => {
  const newSearchParams = new URLSearchParams(searchParams);

  params.map((param) => {
    newSearchParams.set(param.key, param.value);
  });

  updateSearchParams(newSearchParams);
};

export const generateItemUrl = ({
  productId,
  slug,
}: {
  productId: number;
  slug: string;
}) => {
  // Check if slug is empty
  if (slug !== "") {
    return `/product/${productId}/${slug}`;
  }

  return "#";
};

// Check if purchase item has an error
export const isItemError = (item: DetailedPurchasedItem) => {
  return (
    !item ||
    !item.productSku ||
    item.productStatus === "DL" ||
    item.productStatus === "DU" ||
    item.productStatus === "DV" ||
    item.isDiscontinued
  );
};
