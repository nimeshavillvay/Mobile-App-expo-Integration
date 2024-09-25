import {
  ProductsGrid,
  ProductsGridDesktopContainer,
  ProductsGridFiltersSkeleton,
  ProductsGridPaginationSkeleton,
} from "@/_components/products-grid";
import { SESSION_TOKEN_COOKIE } from "@/_lib/constants";
import { cookies } from "next/headers";
import { Suspense } from "react";
import { LaminatesGridHeaderSkeleton } from "./laminates-grid-header";
import LaminatesListDesktopFiltersHeader from "./laminates-list-desktop-filters-header";
import ProductsListFilters from "./laminates-list-filters";
import ProductsListGrid from "./laminates-list-grid";
import ProductsListHeader from "./laminates-list-header";
import ProductsListPagination from "./laminates-list-pagination";

const LaminatesList = () => {
  const cookieStore = cookies();
  const tokenCookie = cookieStore.get(SESSION_TOKEN_COOKIE);

  if (!tokenCookie) {
    return null;
  }

  return (
    <ProductsGrid>
      <Suspense fallback={<LaminatesGridHeaderSkeleton />}>
        <ProductsListHeader token={tokenCookie.value} />
      </Suspense>

      <Suspense>
        <LaminatesListDesktopFiltersHeader token={tokenCookie.value} />
      </Suspense>

      <ProductsGridDesktopContainer>
        <Suspense fallback={<ProductsGridFiltersSkeleton />}>
          <ProductsListFilters token={tokenCookie.value} />
        </Suspense>

        <div className="flex-1">
          <ProductsListGrid token={tokenCookie.value} />
        </div>
      </ProductsGridDesktopContainer>

      <Suspense fallback={<ProductsGridPaginationSkeleton />}>
        <ProductsListPagination token={tokenCookie.value} />
      </Suspense>
    </ProductsGrid>
  );
};

export default LaminatesList;
