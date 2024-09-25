import { ProductsGridPagination } from "@/_components/products-grid";

type ProductsListPaginationProps = {
  readonly total: number;
};

const ProductsListPagination = async ({
  total,
}: ProductsListPaginationProps) => {
  const totalPages = Math.ceil(total / 24);

  return <ProductsGridPagination totalPages={totalPages} />;
};

export default ProductsListPagination;
