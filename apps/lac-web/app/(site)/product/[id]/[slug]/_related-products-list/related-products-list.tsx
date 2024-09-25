import ProductCardSkeleton from "@/_components/product-card-skeleton";
import { SESSION_TOKEN_COOKIE } from "@/_lib/constants";
import { cookies } from "next/headers";
import { Suspense } from "react";
import type { RelatedProduct } from "../types";
import MobileListViewer from "./mobile-list-viewer";
import ProductsList from "./products-list";

type RelatedProductsListProps = {
  readonly products: RelatedProduct[];
};

const RelatedProductsList = ({ products }: RelatedProductsListProps) => {
  const cookiesStore = cookies();
  const sessionToken = cookiesStore.get(SESSION_TOKEN_COOKIE);

  if (!sessionToken?.value) {
    return null;
  }

  return (
    <>
      {/* Desktop view is separate because we don't need to paginate */}
      <div className="container hidden gap-3 md:grid md:grid-cols-2 md:gap-4 xl:grid-cols-3 2xl:grid-cols-4">
        <Suspense
          fallback={Array.from({ length: 4 }).map((_, index) => (
            <ProductCardSkeleton key={index} orientation="horizontal" />
          ))}
        >
          <ProductsList token={sessionToken.value} products={products} />
        </Suspense>
      </div>

      <MobileListViewer token={sessionToken.value} products={products} />
    </>
  );
};

export default RelatedProductsList;
