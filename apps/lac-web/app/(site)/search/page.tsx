import DiscontinuedItemNotice from "@/_components/discontinued-item-notice";
import {
  ProductsGrid,
  ProductsGridDesktopContainer,
  ProductsGridHeaderSkeleton,
  ProductsGridListSkeleton,
} from "@/_components/products-grid";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@repo/web-ui/components/ui/breadcrumb";
import type { Metadata } from "next";
import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Fragment, Suspense } from "react";
import { getSearchResults } from "./apis";
import { TOTAL_COOKIE } from "./constants";
import ProductsList from "./products-list";
import ResultCacher from "./result-cacher";

export const metadata: Metadata = {
  title: "Search",
  robots: {
    index: false,
    follow: false,
  },
};

const SearchPage = async ({
  searchParams,
}: {
  readonly searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const query = searchParams.query?.toString() ?? "";
  const pageNo = searchParams.page?.toString() ?? "1";
  const searchResults = await getSearchResults({
    query,
    pageNo,
  });

  const cookiesStore = cookies();

  const total =
    searchResults.summary.total === 0
      ? parseInt(cookiesStore.get(TOTAL_COOKIE)?.value ?? "0")
      : searchResults.summary.total;

  if (
    searchResults.summary.plp &&
    !Array.isArray(searchResults.results) &&
    searchResults.results.productStatus != "discontinued"
  ) {
    return redirect(
      `/product/${searchResults.results.id}/${searchResults.results.slug}`,
    );
  }

  if (
    searchResults.summary.plp &&
    !Array.isArray(searchResults.results) &&
    searchResults.results.productStatus != "discontinued"
  ) {
    throw new Error("Product category is not set");
  }

  return (
    <>
      <ResultCacher
        total={searchResults.summary.total}
        searchParams={searchResults.summary.searchParams}
      />

      <Breadcrumb className="container my-3 block">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link
                href="/"
                className="btnAction bread-crumb"
                data-btn-action="View Home Link"
              >
                Home
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>

          <Fragment>
            <BreadcrumbSeparator />

            <BreadcrumbItem>
              <BreadcrumbPage>Search Results</BreadcrumbPage>
            </BreadcrumbItem>
          </Fragment>
        </BreadcrumbList>
      </Breadcrumb>

      {searchResults.summary.plp &&
        !Array.isArray(searchResults.results) &&
        searchResults.results.productStatus === "discontinued" &&
        searchResults.results.categoryId &&
        searchResults.results.categorySlug && (
          <DiscontinuedItemNotice
            categoryId={searchResults.results.categoryId}
            slug={searchResults.results.categorySlug}
          />
        )}

      {searchResults.summary.total == 0 &&
        Array.isArray(searchResults.results) &&
        searchResults.results.length == 0 && (
          <div className="max-w-500px max-h-200px mx-auto flex flex-col items-center justify-center pb-[250px] pt-[10px]">
            <h1 className="mb-4 text-3xl font-bold">No results</h1>
            <h4>Sorry, no results were found for your search term.</h4>
          </div>
        )}

      {total !== 0 &&
        Array.isArray(searchResults.results) &&
        searchResults.results.length !== 0 && (
          <>
            <h1 className="container line-clamp-3 text-balance font-title text-4xl font-medium tracking-tight text-wurth-gray-800 md:text-5xl md:leading-[3.5rem] md:tracking-[-0.036rem]">
              Search Results for &quot;{query}&quot;
            </h1>
            <div className="mx-auto">
              <Suspense
                fallback={
                  <ProductsGrid>
                    <ProductsGridHeaderSkeleton />
                    <ProductsGridListSkeleton type="mobile" />
                    <ProductsGridDesktopContainer>
                      <ProductsGridListSkeleton
                        type="desktop"
                        numberOfCards={24}
                      />
                    </ProductsGridDesktopContainer>
                  </ProductsGrid>
                }
              >
                <ProductsList query={query} pageNo={pageNo} total={total} />
              </Suspense>
            </div>
          </>
        )}
    </>
  );
};

export default SearchPage;
