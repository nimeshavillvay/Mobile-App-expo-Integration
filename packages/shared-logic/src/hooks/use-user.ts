import { useQuery } from "@tanstack/react-query";
import { useApiContext } from "../context/api-context";

const useUser = (id: number) => {
  const api = useApiContext();

  return useQuery({
    queryKey: ["user", id],
    queryFn: () =>
      api.get(`users/${id}`).json<{
        id: number;
        name: string;
        username: string;
        email: string;
        address: {
          street: string;
          suite: string;
          city: string;
          zipcode: string;
          geo: {
            lat: string;
            lng: string;
          };
        };
        phone: string;
        website: string;
        company: {
          name: string;
          catchPhrase: string;
          bs: string;
        };
      }>(),
  });
};

export default useUser;
