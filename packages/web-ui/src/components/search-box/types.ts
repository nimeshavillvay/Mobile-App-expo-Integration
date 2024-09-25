export type Result = {
  id: string;
  categoryName?: string;
  categoryPath?: string;
  parentCategoryList?: string;
  subCategoryList?: string;
  slug: string;
  brandName?: string;
  brandImage?: string;
  lastUpdatedDate?: string | null;
  MFRPartNo?: string;
  sellingBookSequenceNo?: string;
  UPCCode?: string;
  alias?: string;
  materialNumber?: string;
  productTitle?: string;
  Status?: string;
  productStatus?: string;
  createDate?: string;
  keywords?: string;
  minimumOrderQuantity?: string;
  orderQuantityByIncrements?: string;
  attributes?: [];
  itemImage?: string;
  uom?: string;
  groupId?: string;
  categoryId?: string;
  categorySlug?: string;
  brandId?: string;
  brandSlug?: string;
};

export type SearchDropDownItem = Pick<
  Result,
  | "id"
  | "categoryName"
  | "categoryPath"
  | "parentCategoryList"
  | "subCategoryList"
  | "slug"
  | "brandName"
  | "productTitle"
  | "itemImage"
> | null;

export type SearchData = {
  summary: {
    total: number;
    page_size: number;
    page_no: number;
    plp: boolean;
  };
  results: Result[];
};
