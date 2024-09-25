import { api } from "@/_lib/api";
import { useQuery } from "@tanstack/react-query";

const useCountries = () => {
  return useQuery({
    queryKey: ["address", "countries"],
    queryFn: () =>
      api
        .get("rest/register/countries")
        .json<{ code: string; country: string }[]>(),
    staleTime: Infinity,
  });
};

export default useCountries;
