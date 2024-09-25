import { api } from "@/_lib/api";
import { useSuspenseQuery } from "@tanstack/react-query";
import { z } from "zod";

const companyDetailsResponseSchema = z.object({
  company_name: z.string(),
  image: z.string(),
});

const useSuspenseCompanyProfileDetails = (token: string) => {
  return useSuspenseQuery({
    queryKey: ["my-account", "company-profile", token],
    queryFn: async () => {
      const response = await api
        .get("rest/osrdetails", {
          headers: {
            authorization: `Bearer ${token}`,
          },
        })
        .json();

      const parsedResponse =
        await companyDetailsResponseSchema.parseAsync(response);

      return {
        companyName: parsedResponse["company_name"],
        image: parsedResponse["image"],
      };
    },
  });
};

export default useSuspenseCompanyProfileDetails;
