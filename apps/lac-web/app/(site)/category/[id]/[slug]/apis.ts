import { api } from "@/_lib/api";
import { DEFAULT_REVALIDATE } from "@/_lib/constants";
import { notFound } from "next/navigation";
import "server-only";

type ProductLandingCategory = {
  main: {
    catId: string;
    type: string;
    catTitle: string;
    description: string;
    additional_description: string;
    Image: string | null;
    slug: string;
    subCatgores: {
      SubCatId: string;
      SubCatTitle: string;
      slug: string;
      Image: string;
    }[];
  };
};

export const getCategory = async (id: string, slug: string) => {
  try {
    const response = await api
      .get(`rest/productlandingcategory/${id}`, {
        next: { revalidate: DEFAULT_REVALIDATE },
      })
      .json<ProductLandingCategory>();

    const transformResponse = {
      mainCategory: {
        id: Number(response.main.catId),
        type: response.main.type,
        title: response.main.catTitle,
        description: response.main.description,
        additionalDescription: response.main.additional_description,
        image: response.main.Image,
        slug: response.main.slug,
        subCategories: response.main.subCatgores.map(
          ({ SubCatId, SubCatTitle, slug, Image }) => ({
            id: Number(SubCatId),
            title: SubCatTitle,
            slug: slug,
            image: Image ?? null,
          }),
        ),
      },
    };

    // Compare slug
    if (slug !== transformResponse.mainCategory.slug) {
      notFound();
    }

    return transformResponse.mainCategory;
  } catch {
    notFound();
  }
};
