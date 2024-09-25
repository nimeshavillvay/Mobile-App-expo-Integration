export type CategoryPageProps = {
  params: {
    id: string;
    slug: string;
  };
};

export type SubCategory = {
  id: number;
  slug: string;
  title: string;
  image: string;
};
