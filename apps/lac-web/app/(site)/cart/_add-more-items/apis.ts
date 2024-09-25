import { api } from "@/_lib/api";

const getStatus = async ({
  products,
}: {
  products: {
    sku?: string | undefined;
    productid?: number | undefined;
    mqt?: number;
    poOrJobName?: string | undefined;
  }[];
}) => {
  const results = await api
    .post("rest/getstatus", {
      json: {
        products: products,
      },
    })
    .json<
      {
        productid: string;
        sku: string;
        availability: string;
        mqt: string;
        qmm: string;
        qm: string;
        requestedQT: number;
        txt_min_order_amount: string;
        txt_product_summary: string;
        product_exclution: boolean;
        product_exclution_msg: null;
        product_discontinue: boolean;
        product_discontinue_msg: null;
        product_qty_multiple: boolean;
        product_qty_multiple_msg: null;
        product_image: string;
        product_brand: string;
      }[]
    >();

  const mappedResults = results.map((result) => {
    return {
      ...result,
      productId: result.productid,
      brand: result.product_brand,
      minimumQuantity: result.txt_min_order_amount,
      quantityMultiplier: result.qm,
      image: result.product_image,
      title: result.txt_product_summary,
    };
  });

  return mappedResults;
};

export default getStatus;
