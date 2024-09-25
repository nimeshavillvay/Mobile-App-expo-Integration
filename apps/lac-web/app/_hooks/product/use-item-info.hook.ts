import { getItemInfo } from "@/_lib/apis/shared";
import { useQuery } from "@tanstack/react-query";

const useItemInfo = (productIdList: number[]) => {
  return useQuery({
    queryKey: ["item-info", productIdList],
    queryFn: async () => {
      return await getItemInfo(productIdList);
    },
    enabled: productIdList.length > 0,
  });
};

export default useItemInfo;
