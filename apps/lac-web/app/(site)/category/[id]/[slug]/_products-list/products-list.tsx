import {
  ProductsGrid,
  ProductsGridDesktopContainer,
  ProductsGridFiltersSkeleton,
  ProductsGridHeaderSkeleton,
  ProductsGridListSkeleton,
  ProductsGridMobileFiltersHeaderSkeleton,
  ProductsGridPaginationSkeleton,
} from "@/_components/products-grid";
import { SESSION_TOKEN_COOKIE } from "@/_lib/constants";
import { cookies } from "next/headers";
import { Suspense } from "react";
import ProductsListDesktopFiltersHeader from "./products-list-desktop-filters-header";
import ProductsListFilters from "./products-list-filters";
import ProductsListGrid from "./products-list-grid";
import ProductsListHeader from "./products-list-header";
import ProductsListMobileFilters from "./products-list-mobile-filters";
import ProductsListPagination from "./products-list-pagination";

type ProductsListProps = {
  readonly categoryId: string;
};

const ProductsList = ({ categoryId }: ProductsListProps) => {
  const cookieStore = cookies();
  const tokenCookie = cookieStore.get(SESSION_TOKEN_COOKIE);

  return (
    <ProductsGrid>
      <Suspense fallback={<ProductsGridMobileFiltersHeaderSkeleton />}>
        <ProductsListMobileFilters
          token={tokenCookie?.value}
          categoryId={categoryId}
        />
      </Suspense>

      <Suspense fallback={<ProductsGridHeaderSkeleton />}>
        <ProductsListHeader
          token={tokenCookie?.value}
          categoryId={categoryId}
        />
      </Suspense>

      <Suspense>
        <ProductsListDesktopFiltersHeader
          token={tokenCookie?.value}
          categoryId={categoryId}
        />
      </Suspense>

      <Suspense fallback={<ProductsGridListSkeleton type="mobile" />}>
        <ProductsListGrid
          type="mobile"
          token={tokenCookie?.value}
          categoryId={categoryId}
        />
      </Suspense>

      <ProductsGridDesktopContainer>
        <Suspense fallback={<ProductsGridFiltersSkeleton />}>
          <ProductsListFilters
            token={tokenCookie?.value}
            categoryId={categoryId}
          />
        </Suspense>

        <Suspense fallback={<ProductsGridListSkeleton type="desktop" />}>
          <ProductsListGrid
            type="desktop"
            token={tokenCookie?.value}
            categoryId={categoryId}
          />
        </Suspense>
      </ProductsGridDesktopContainer>

      <Suspense fallback={<ProductsGridPaginationSkeleton />}>
        <ProductsListPagination
          token={tokenCookie?.value}
          categoryId={categoryId}
        />
      </Suspense>
    </ProductsGrid>
  );
};

export default ProductsList;
