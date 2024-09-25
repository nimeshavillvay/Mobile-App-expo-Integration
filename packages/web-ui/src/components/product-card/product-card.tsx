"use client";

import Image, { type ImageProps } from "next/image";
import Link, { type LinkProps } from "next/link";
import { createContext, useContext, type ComponentProps } from "react";
import { BookmarkOutline } from "~/components/icons/bookmark-outline";
import { Badge, type BadgeProps } from "~/components/ui/badge";
import { Button, buttonVariants } from "~/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import type { SkeletonProps } from "~/components/ui/skeleton";
import { Skeleton } from "~/components/ui/skeleton";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import { cn, formatNumberToPrice } from "~/lib/utils";
import { BookmarkFilled } from "../icons/bookmark-filled";

type Orientation = "vertical" | "horizontal";

const OrientationContext = createContext<Orientation>("vertical");
const useOrientation = () => {
  return useContext(OrientationContext);
};

const ProductCard = ({
  className,
  orientation = "vertical",
  ...delegated
}: ComponentProps<"article"> & { readonly orientation?: Orientation }) => {
  return (
    <OrientationContext.Provider value={orientation}>
      <article
        className={cn(
          "flex rounded-lg border border-solid border-wurth-gray-250 bg-white p-3 shadow-[0px_1px_2px_-1px_rgba(0,0,0,0.06),0px_1px_3px_0px_rgba(0,0,0,0.08)]",
          orientation === "vertical" &&
            "w-[12.5rem] flex-col gap-3 md:w-64 md:p-4",
          orientation === "horizontal" && "w-[24.75rem] flex-row gap-3",
          className,
        )}
        {...delegated}
      />
    </OrientationContext.Provider>
  );
};

const ProductCardHero = ({
  className,
  ...delegated
}: ComponentProps<"div">) => {
  const orientation = useOrientation();

  return (
    <div
      className={cn(
        "relative shrink-0 overflow-hidden rounded",
        orientation === "horizontal" && "flex flex-col justify-between",
        className,
      )}
      {...delegated}
    />
  );
};

const ProductCardImage = ({
  src,
  alt,
  width = 224,
  height = 224,
  className,
  href,
  title,
  productTitleOrImageOnClick,
  ...delegated
}: ImageProps &
  Pick<LinkProps, "href"> & {
    /**
     * Title to show for screen readers
     */
    readonly title: string;
    readonly productTitleOrImageOnClick: () => void;
  }) => {
  const orientation = useOrientation();

  return (
    <Link
      href={href}
      onClick={productTitleOrImageOnClick}
      className="btn-view-product btnAction btn-product-detail-img flex items-center justify-center"
      data-btn-action="View Product"
    >
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={cn(
          "aspect-1 object-contain",
          orientation === "vertical" && "size-44 md:size-56",
          orientation === "horizontal" && "size-[8.5rem]",
          className,
        )}
        {...delegated}
      />

      <span className="sr-only">{title}</span>
    </Link>
  );
};

const ProductCardDiscount = ({
  className,
  children,
  ...delegated
}: ComponentProps<"div">) => {
  const orientation = useOrientation();

  return (
    <div
      className={cn(
        "flex items-center gap-0.5 bg-green-50 px-1.5 pr-5 text-base text-green-700",
        orientation === "vertical" && "md:px-2 md:text-lg",
        className,
      )}
      {...delegated}
    >
      <span className="font-semibold">{children}%</span> <span>off</span>
    </div>
  );
};

/**
 * When the orientation is "vertical", this component needs to be a child
 * of `ProductCardHero`. If the orientation is "horizontal", the parent
 * component should be `ProductCardContent`.
 */
const ProductCardLabel = ({
  variant = "success",
  className,
  ...delegated
}: BadgeProps) => {
  const orientation = useOrientation();

  return (
    <Badge
      variant={variant}
      className={cn(
        "bg-wurth-gray-50 text-wurth-gray-800 shadow-none hover:bg-wurth-gray-150",
        orientation === "vertical" && "absolute right-0 top-0",
        orientation === "horizontal" && "-mb-1 self-end",
        className,
      )}
      {...delegated}
    />
  );
};

const ProductCardContent = ({
  className,
  ...delegated
}: ComponentProps<"div">) => {
  const orientation = useOrientation();

  return (
    <div
      className={cn(
        "flex flex-1 flex-col justify-between gap-2",
        orientation === "horizontal" && "w-2/4 md:w-full",
        className,
      )}
      {...delegated}
    />
  );
};

const ProductCardDetails = ({
  title,
  sku,
  href,
  productTitleOrImageOnClick,
}: {
  readonly title: string;
  readonly sku: string;
  readonly href: LinkProps["href"];
  readonly productTitleOrImageOnClick: () => void;
}) => {
  return (
    <div className="space-y-1 text-sm">
      <Tooltip>
        <TooltipTrigger asChild>
          <h3 className="line-clamp-2 font-medium text-black">
            <Link
              href={href}
              dangerouslySetInnerHTML={{ __html: title }}
              className="btn-view-product btnAction product-title btn-product-detail"
              onClick={productTitleOrImageOnClick}
              data-btn-action="View Product"
            />
          </h3>
        </TooltipTrigger>

        <TooltipContent>
          <p dangerouslySetInnerHTML={{ __html: title }} />
        </TooltipContent>
      </Tooltip>

      <div className="font-normal leading-none text-wurth-gray-500">{sku}</div>
    </div>
  );
};

const ProductCardPrice = ({
  price,
  uom,
  actualPrice,
  isLaminateItem,
  showDiscount,
}: {
  readonly price: number;
  readonly uom: string;
  readonly actualPrice?: number;
  readonly isLaminateItem: boolean;
  readonly showDiscount: boolean;
}) => {
  return (
    <div className="text-xs font-normal text-wurth-gray-800 md:text-sm md:leading-none">
      <span
        className={cn(
          "font-bold",
          !isLaminateItem && actualPrice && price < actualPrice && showDiscount
            ? "text-green-700"
            : "text-wurth-gray-800",
        )}
      >
        $
        <span className="text-base md:text-lg">
          {formatNumberToPrice(price)}
        </span>
      </span>
      {!isLaminateItem &&
        !!actualPrice &&
        price < actualPrice &&
        showDiscount && (
          <span className="ml-1 text-base font-normal text-wurth-gray-500 line-through md:text-lg">
            {formatNumberToPrice(actualPrice)}
          </span>
        )}
      /{uom}
    </div>
  );
};

const ProductCardActions = ({
  addToCart,
  isFavorite = false,
  onClickShoppingList,
  disabled = false,
}: {
  readonly addToCart: () => void;
  readonly isFavorite?: boolean;
  readonly onClickShoppingList: () => void;
  readonly disabled?: boolean;
}) => {
  return (
    <div className="flex flex-row items-center gap-1 md:gap-2">
      <Button
        className="h-10 max-h-full flex-1 px-4 text-[0.875rem] leading-5"
        onClick={addToCart}
        disabled={disabled}
        data-button-action="Product Card Add to Cart"
      >
        Add to cart
      </Button>

      <Button
        variant="outline"
        size="icon"
        className="size-10"
        aria-label="Add to list"
        disabled={disabled}
        onClick={onClickShoppingList}
      >
        {isFavorite ? (
          <BookmarkFilled
            className="size-4"
            data-button-action="Product Card Add to Wishlist"
          />
        ) : (
          <BookmarkOutline
            className="size-4"
            data-button-action="Product Card Add to Wishlist"
          />
        )}
      </Button>
    </div>
  );
};

const ProductCardVariantSelector = ({
  href,
  variants,
  value,
  onValueChange,
  addToCart,
  disabled,
  isFavorite = false,
  onClickShoppingList,
}: {
  readonly href: string;
  readonly variants: { value: string; title: string }[];
  readonly value?: string;
  readonly onValueChange: (value: string) => void;
  readonly isFavorite?: boolean;
  readonly onClickShoppingList: () => void;
} & ComponentProps<typeof ProductCardActions>) => {
  return (
    <div className="mt-auto space-y-1">
      <h4 className="text-sm font-normal text-wurth-gray-800">
        {variants.length} variations
      </h4>

      <Select value={value} onValueChange={onValueChange}>
        <SelectTrigger className="w-full" aria-label="Select a variation">
          <SelectValue placeholder="Select a variation" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {variants.map((variant) => (
              <SelectItem
                key={variant.value}
                value={variant.value}
                className="product-variant-select"
              >
                <span dangerouslySetInnerHTML={{ __html: variant.title }} />
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

      {value ? (
        <ProductCardActions
          addToCart={addToCart}
          disabled={disabled}
          isFavorite={isFavorite}
          onClickShoppingList={onClickShoppingList}
        />
      ) : (
        <Link
          href={href}
          className={cn(
            buttonVariants({ variant: "default" }),
            "btnAction h-10 w-full",
          )}
          data-button-action="View Item"
        >
          View item
        </Link>
      )}
    </div>
  );
};

const ProductCardSkeleton = ({
  className = "",
  orientation = "vertical",
  ...delegated
}: Omit<SkeletonProps, "children"> & {
  readonly orientation?: Orientation;
}) => {
  return (
    <Skeleton
      className={cn(
        "rounded-lg shadow-[0px_1px_2px_-1px_rgba(0,0,0,0.06),0px_1px_3px_0px_rgba(0,0,0,0.08)]",
        orientation === "vertical" &&
          "h-[23.25rem] w-[17.5rem] md:h-[25.75rem] md:w-64",
        orientation === "horizontal" && "h-48 w-[24.75rem]",
        className,
      )}
      {...delegated}
    />
  );
};

export {
  ProductCard,
  ProductCardActions,
  ProductCardContent,
  ProductCardDetails,
  ProductCardDiscount,
  ProductCardHero,
  ProductCardImage,
  ProductCardLabel,
  ProductCardPrice,
  ProductCardSkeleton,
  ProductCardVariantSelector,
};
