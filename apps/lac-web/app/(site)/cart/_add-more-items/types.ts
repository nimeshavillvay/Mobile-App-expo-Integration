export type Product = {
  sku: string;
  title: string;
  image: string;
  minimumOrderQuantity: number;
  orderQuantityByIncrements: number;
};

export type CartItem = {
  sku: string;
  isBulkUploadItem: boolean;
  quantity?: number | null | undefined;
  jobName?: string | undefined;
  isInvalid?: boolean | null | undefined;
  info?:
    | {
        minQuantity: number;
        orderIncrementBy: number;
        title: string;
        image: string;
      }
    | undefined;
};
