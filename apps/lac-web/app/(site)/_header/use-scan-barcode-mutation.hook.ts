import { searchApi } from "@/_lib/api";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

type SearchResult = {
  brandName: string;
  id: string;
  lastUpdatedDate: string | null;
  MFRPartNo: string;
  sellingBookSequenceNo: string;
  UPCCode: string;
  alias: string;
  materialNumber: string;
  productTitle: string;
  Status: string;
  productStatus: string;
  createDate: string;
  keywords: string;
  minimumOrderQuantity: string;
  orderQuantityByIncrements: string;
  categoryPath: string;
  categoryName: string;
  attributes: string[] | null;
  itemImage: string;
  slug: string;
  uom?: string;
  groupId?: string;
  categoryId?: string;
  categorySlug?: string;
  brandId?: string;
  brandSlug?: string;
};

type SearchData = {
  summary: {
    total: number;
    page_size: number;
    page_no: number;
    plp: boolean;
    searchParams?: string;
  };
  results: SearchResult;
};

type BarcodeSearchProps = {
  setOpen: (open: boolean) => void;
  setProductNotFound: (productNotFound: boolean) => void;
  setIsDiscontinued: (isDiscounted: boolean) => void;
  setCategoryId: (categoryId: string) => void;
  setCategorySlug: (categorySlug: string) => void;
  setSearchQuery: (searchQuery: string) => void;
};

const useScanBarcodeMutation = ({
  setOpen,
  setProductNotFound,
  setIsDiscontinued,
  setCategoryId,
  setCategorySlug,
  setSearchQuery,
}: BarcodeSearchProps) => {
  const router = useRouter();
  const PRODUCT_DISCONTINUED_STATUS = "discontinued";

  return useMutation({
    mutationFn: async (query: string) => {
      setSearchQuery("");
      const searchResults = await searchApi
        .get("barcode", {
          searchParams: { query },
        })
        .json<SearchData>();

      const firstProduct = searchResults.results;

      const isDiscontinuedProduct =
        firstProduct.productStatus === PRODUCT_DISCONTINUED_STATUS &&
        firstProduct.categoryId &&
        firstProduct.categorySlug;

      const isCategoryMissingProduct =
        !Array.isArray(firstProduct) &&
        firstProduct.productStatus !== PRODUCT_DISCONTINUED_STATUS;

      const actionForDiscontinuedProduct = () => {
        setIsDiscontinued(true);
        setCategoryId(firstProduct.categoryId ?? "");
        setCategorySlug(firstProduct.categorySlug ?? "");
        setOpen(false);
      };

      if (searchResults.summary.plp) {
        if (isCategoryMissingProduct) {
          setOpen(false);
          router.push(`/search?query=${firstProduct.MFRPartNo}`);
        } else if (isDiscontinuedProduct) {
          actionForDiscontinuedProduct();
        } else if (firstProduct) {
          setOpen(false);
          setProductNotFound(false);
          router.push(`/product/${firstProduct.id}/${firstProduct.slug}`);
        }
      } else {
        setProductNotFound(true);
      }
      setSearchQuery(query);
    },
  });
};

export default useScanBarcodeMutation;
