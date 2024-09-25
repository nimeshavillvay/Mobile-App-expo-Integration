import { useCombobox } from "downshift";
import Image from "next/image";
import Link from "next/link";
import { type ComponentProps } from "react";
import { Close } from "~/components/icons/close";
import { MagnifyingGlass } from "~/components/icons/magnifying-glass";
import type {
  Result,
  SearchData,
  SearchDropDownItem,
} from "~/components/search-box/types";
import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";

type SearchableFields = "productTitle" | "brandName" | "categoryName";

const INVALID_SEARCH_VALUES = {
  productStatus: "discontinued",
};

const isValidProduct = (result: Result): boolean => {
  return Object.entries(INVALID_SEARCH_VALUES).every(([key, invalidValue]) => {
    const resultValue = result[key as keyof Result];

    return resultValue !== invalidValue;
  });
};

export const SearchBox = ({
  className,
  ...delegated
}: ComponentProps<"div">) => {
  return (
    <div
      className={cn(
        "flex flex-row items-center rounded-full border border-wurth-gray-250",
        className,
      )}
      {...delegated}
    />
  );
};

/**
 * This method renders a search box with autocomplete functionality.
 *
 * @param {ComponentProps<"input"> & {
 *   data: {
 *     products: SearchData;
 *     categories: SearchData;
 *     brands: SearchData;
 *   };
 *   value: string;
 *   setValue: (value: string) => void;
 *   onEnterPressed: () => void;
 * }} props - The input and data properties for the search box.
 */
export const SearchBoxInput = ({
  className,
  data,
  value,
  setValue,
  onEnterPressed,
  onHandleDropDownClick,
  children,
  ...delegated
}: ComponentProps<"input"> & {
  readonly data: {
    products: SearchData;
    categories: SearchData;
    brands: SearchData;
  };
  readonly value: string;
  readonly setValue: (value: string) => void;
  readonly onEnterPressed: () => void;
  readonly onHandleDropDownClick: (
    value: string,
    linkType: string,
    linkUrl: string,
  ) => void;
}) => {
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      onEnterPressed();
      closeMenu();
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setValue(newValue);
  };

  const { products, categories, brands } = data;
  const validSearches = products.results
    .filter(isValidProduct)
    .map((product, index) => ({
      product,
      index,
    }));

  const { isOpen, getMenuProps, getInputProps, getItemProps, closeMenu } =
    useCombobox({
      inputValue: value,
      items: [...brands.results, ...categories.results, ...products.results],
      // eslint-disable-next-line prefer-arrow-functions/prefer-arrow-functions
      itemToString(result: SearchDropDownItem | null): string {
        if (!result) {
          return "";
        }

        const searchableFieldsPriority: Array<SearchableFields> = [
          "productTitle",
          "brandName",
          "categoryName",
        ];

        //TODO - You are discriminating the result type
        return getFirstSearchableFieldValue(result, searchableFieldsPriority);
      },
    });

  /**
   * This function takes an result (object) and an array of searchable field names.
   * It checks each field in the result in provided order and returns the value
   * of the first searchable field it finds that has a truthy value.
   * If no valid field is found, it returns an empty string.
   *
   * @param result - The object to be checked.
   * @param fields - The array of searchable field names.
   * @return The value of the first valid searchable field found or an empty string
   */
  const getFirstSearchableFieldValue = (
    result: Result,
    fields: Array<SearchableFields>,
  ): string => {
    for (const field of fields) {
      if (result && result[field]) {
        return result[field] as string;
      }
    }

    return "";
  };

  const handleDropDownClick = (
    value: string,
    linkType: string,
    linkUrl: string,
  ) => {
    setValue(value);
    onHandleDropDownClick(value, linkType, linkUrl);
  };

  return (
    <div className="relative w-full rounded-md">
      <div className="relative flex items-center">
        <input
          className={cn(
            "placeholder-text-wurth-gray-400 w-full min-w-0 flex-1 shrink rounded-full border-0 py-2.5 pl-3.5 pr-32 text-sm",
            className,
          )}
          {...delegated}
          {...getInputProps()}
          onKeyDown={handleKeyDown}
          value={value}
          onChange={handleInputChange}
        />
        <div className="absolute right-0 flex items-center">{children}</div>
      </div>
      <ul
        className={`${
          isOpen ? "block" : "hidden"
        } absolute left-0 right-0 z-50 mt-4 rounded-b-lg bg-white p-0 pl-4 text-sm shadow-sm`}
        {...getMenuProps()}
      >
        {isOpen && value && (
          <div id="instand_search_menu" className="block-did-you-mean">
            {brands.summary.total > 0 && (
              <>
                <li className="text-black-500 break-all px-3 py-1 font-semibold">
                  Brands for &quot;{value}&quot;
                </li>
                <ul className="flex flex-wrap">
                  {brands.results.map((brand, index) => (
                    <li
                      key={brand.id}
                      {...getItemProps({
                        item: brand,
                        index,
                      })}
                      className="w-full sm:w-full md:w-full lg:w-1/2 xl:w-1/3 2xl:w-1/3 3xl:w-1/3"
                    >
                      <Link
                        href={`/search?query=${brand.slug}`}
                        key={brand.id}
                        className="btnAction cs-did-you-mean-link m-2 mb-2 mr-2 flex items-center rounded-md border-2 p-2 shadow-sm hover:bg-gray-100"
                        onClick={() => {
                          if (brand.brandName) {
                            handleDropDownClick(
                              brand.brandName,
                              "brand",
                              `/search?query=${brand.slug}`,
                            );
                          }
                        }}
                        data-btn-action="Search Results for Brand Link"
                      >
                        {brand.brandImage && brand.brandName && (
                          <Image
                            src={brand.brandImage}
                            alt={brand.brandName}
                            className="mr-2 min-h-10 min-w-10 object-contain"
                            width={40}
                            height={40}
                          />
                        )}
                        {!brand.brandImage && (
                          <div className="h-10 w-10 rounded-full" />
                        )}
                        <span className="break-all">{brand.brandName}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </>
            )}

            {categories.summary.total > 0 && (
              <ul className="block-categories">
                <li className="text-black-500 break-all px-3 py-1 font-semibold">
                  Categories for &quot;{value}&quot;
                </li>
                {categories.results.map((category, index) => (
                  <li
                    className="p-2 pl-8 hover:bg-gray-100"
                    key={category.id}
                    {...getItemProps({
                      item: category,
                      index: index + brands.results.length,
                    })}
                  >
                    <Link
                      className="btnAction root-category cs-category-link"
                      href={`/category/${category.id}/${category.slug}`}
                      key={category.id}
                      onClick={() => {
                        if (category.categoryName) {
                          handleDropDownClick(
                            category.categoryName,
                            "category",
                            `/category/${category.id}/${category.slug}`,
                          );
                        }
                      }}
                      data-btn-action="Search Results for Category Link"
                    >
                      <span className="text-[#74767B]">&#8627;</span>{" "}
                      <span className="break-words font-semibold text-[#CC0000]">
                        {category.categoryPath}
                      </span>
                    </Link>
                  </li>
                ))}
                <br />
              </ul>
            )}

            {products.summary.total > 0 && validSearches.length > 0 && (
              <div id="block-products">
                <li className="text-black-500 whitespace-normal break-all px-3 py-1 font-semibold">
                  Products for &quot;{value}&quot;
                </li>
                <ul className="grid grid-cols-1 gap-4 break-words md:grid-cols-1 lg:grid-cols-2">
                  {validSearches.slice(0, 10).map(({ product, index }) => (
                    <li
                      key={product.id}
                      {...getItemProps({
                        item: product,
                        index:
                          index +
                          categories.results.length +
                          brands.results.length,
                      })}
                    >
                      <div
                        className="cs-list-image flex items-start justify-start gap-4 px-3 py-2"
                        key={product.id}
                      >
                        <Link
                          className="btn-view-product btnAction cs-product-link-img flex-shrink-0 overflow-hidden rounded-md border border-gray-300"
                          href={`/product/${product.id}/${product.slug}`}
                          onClick={() => {
                            if (product.productTitle) {
                              handleDropDownClick(
                                product.productTitle,
                                "product",
                                `/product/${product.id}/${product.slug}`,
                              );
                            }
                          }}
                          data-btn-action="View Product"
                        >
                          {product.itemImage && product.productTitle ? (
                            <Image
                              src={product.itemImage}
                              alt={product.productTitle}
                              className="cs-list-image object-cover"
                              width={80}
                              height={80}
                            />
                          ) : (
                            <div className="h-20 w-20 rounded-full" />
                          )}
                        </Link>
                        <Link
                          className="btn-view-product btnAction cs-product-link"
                          href={`/product/${product.id}/${product.slug}`}
                          onClick={() => {
                            if (product.productTitle) {
                              handleDropDownClick(
                                product.productTitle,
                                "product",
                                `/product/${product.id}/${product.slug}`,
                              );
                            }
                          }}
                          data-btn-action="View Product"
                        >
                          <div className="productcode font-normal hover:underline">
                            <p className="break-all">{product.productTitle}</p>
                          </div>
                          <div className="break-all text-[#74767B]">
                            Item# {product.materialNumber}
                          </div>
                        </Link>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </ul>
    </div>
  );
};

export const SearchBoxButton = ({
  type = "submit",
  className,
  ...delegated
}: Omit<ComponentProps<"button">, "children">) => {
  return (
    <Button
      type={type}
      variant="ghost"
      size="icon"
      className={cn(
        "image-button btn-search mx-0.5 rounded-full px-2",
        className,
      )}
      {...delegated}
    >
      <MagnifyingGlass
        className="btnAction size-5"
        data-button-action="Search"
      />

      <span className="sr-only">Search</span>
    </Button>
  );
};

export const SearchClearButton = ({
  type = "button",
  className,
  ...delegated
}: Omit<ComponentProps<"button">, "children">) => {
  return (
    <Button
      type={type}
      variant="ghost"
      size="icon"
      className={cn("mx-0.5 rounded-full px-2", className)}
      {...delegated}
    >
      <Close className="size-5" data-button-action="Clear Search" />
      <span className="sr-only">Clear search</span>
    </Button>
  );
};
