import { api } from "@/_lib/api";
import { useQuery } from "@tanstack/react-query";

const useStates = (country?: string) => {
  return useQuery({
    queryKey: ["address", "countries", country, "states"],
    queryFn: () =>
      api
        .get("rest/register/states", {
          searchParams: new URLSearchParams({
            country: country ?? "",
          }),
        })
        .json<{ code: string; country: string }[]>(),
    staleTime: Infinity,
    enabled: !!country,
  });
};

export default useStates;
