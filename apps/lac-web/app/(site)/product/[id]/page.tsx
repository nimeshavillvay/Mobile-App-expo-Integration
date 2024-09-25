import { getProduct } from "../apis";

type ProductPageProps = {
  params: {
    id: string;
  };
};

const ProductPage = async ({ params: { id } }: ProductPageProps) => {
  await getProduct(id);
};
export default ProductPage;
