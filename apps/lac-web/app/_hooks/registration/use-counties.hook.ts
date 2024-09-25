import { api } from "@/_lib/api";
import { useQuery } from "@tanstack/react-query";

const useCounties = (state?: string) => {
  return useQuery({
    queryKey: ["address", "states", state, "counties"],
    queryFn: () =>
      api
        .get("rest/register/counties", {
          searchParams: new URLSearchParams({
            state: state ?? "",
          }),
        })
        .json<{ county: string }[]>(),
    staleTime: Infinity,
    enabled: !!state,
  });
};

export default useCounties;
