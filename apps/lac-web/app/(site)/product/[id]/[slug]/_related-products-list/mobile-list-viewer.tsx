"use client";

import { Button } from "@repo/web-ui/components/ui/button";
import { useState } from "react";
import type { RelatedProduct } from "../types";
import ProductsList from "./products-list";

const PAGE_SIZE = 4;

type MobileListViewerProps = {
  readonly token: string;
  readonly products: RelatedProduct[];
};

const MobileListViewer = ({ token, products }: MobileListViewerProps) => {
  const [shownProducts, setShownProducts] = useState(
    products.slice(0, PAGE_SIZE),
  );

  const hasMore = shownProducts.length < products.length;

  const loadMore = () => {
    setShownProducts(products.slice(0, shownProducts.length + PAGE_SIZE));
  };

  return (
    <div className="container grid grid-cols-1 gap-3 md:hidden">
      <ProductsList token={token} products={shownProducts} />

      {hasMore && (
        <Button
          className="w-full font-bold"
          onClick={loadMore}
          data-button-action="Product Mobile Load More Related Products"
        >
          Load {PAGE_SIZE} more
        </Button>
      )}
    </div>
  );
};

export default MobileListViewer;
