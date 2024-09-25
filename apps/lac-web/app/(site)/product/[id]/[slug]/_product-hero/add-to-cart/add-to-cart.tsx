import { SESSION_TOKEN_COOKIE } from "@/_lib/constants";
import { cn } from "@/_lib/utils";
import { cookies } from "next/headers";
import { Suspense } from "react";
import AddToCartForm from "./add-to-cart-form";
import FavoriteButton from "./favorite-button";
import LocationStocks from "./location-stocks";
import QuantityWarning from "./quantity-warning";
import RegionalExclusionNotice from "./regional-exclusion-notice";

type AddToCartProps = {
  readonly productId: number;
  readonly minQty: number;
  readonly incQty: number;
  readonly uom: string;
  readonly className?: string;
  readonly isExcludedProduct?: boolean;
};

const AddToCart = ({
  productId,
  minQty,
  incQty,
  uom,
  className,
  isExcludedProduct = false,
}: AddToCartProps) => {
  const cookiesStore = cookies();
  const sessionCookie = cookiesStore.get(SESSION_TOKEN_COOKIE);

  return (
    <section className={cn("space-y-3", className)}>
      <LocationStocks productId={productId} />

      <QuantityWarning minimumQuantity={minQty} incrementQuantity={incQty} />

      <AddToCartForm
        productId={productId}
        minQty={minQty}
        incQty={incQty}
        uom={uom}
      />

      <div className="flex flex-row items-center justify-between gap-2">
        <div className="flex-1 text-sm text-wurth-gray-500 md:flex md:flex-row md:items-center md:gap-4">
          <div>
            Min Order:{" "}
            <span className="font-semibold text-wurth-gray-800">{minQty}</span>
          </div>

          <div>
            Quantity Multiple by:{" "}
            <span className="font-semibold text-wurth-gray-800">{incQty}</span>
          </div>
        </div>

        <FavoriteButton productId={productId} token={sessionCookie?.value} />
      </div>

      <Suspense>
        <RegionalExclusionNotice
          productId={productId}
          isExcludedInLoggedOutState={isExcludedProduct}
        />
      </Suspense>
    </section>
  );
};

export default AddToCart;
