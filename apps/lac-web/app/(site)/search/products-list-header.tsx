import { ProductsGridHeader } from "@/_components/products-grid";

type ProductsListHeaderProps = {
  readonly total: number;
};

const ProductsListHeader = async ({ total }: ProductsListHeaderProps) => {
  const totalPages = Math.ceil(total / 24);

  return <ProductsGridHeader totalCount={total} totalPages={totalPages} />;
};

export default ProductsListHeader;
