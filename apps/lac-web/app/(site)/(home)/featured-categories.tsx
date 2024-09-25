import SubHeading from "@/_components/sub-heading";
import { api } from "@/_lib/api";
import { getCategoriesList } from "@/_lib/apis/server";
import { DEFAULT_REVALIDATE } from "@/_lib/constants";
import { cn } from "@/_lib/utils";
import { buttonVariants } from "@repo/web-ui/components/ui/button";
import Image from "next/image";
import Link from "next/link";

const SHOWN_CATEGORIES = 9;

const FeaturedCategories = async () => {
  const [data, categoriesList] = await Promise.all([
    api
      .get("rest/featuredcategories", {
        next: {
          revalidate: DEFAULT_REVALIDATE,
        },
      })
      .json<
        {
          id: string;
          name: string;
          slug: string;
          shortcode: string;
          item_count: string;
          direct_item_count: string;
          img: string;
        }[]
      >(),
    getCategoriesList(),
  ]);

  const viewAllCategory = categoriesList[0];

  return (
    <section className="container my-14 space-y-6 md:my-20 md:space-y-9">
      <SubHeading>Top Categories for Woodworking and Shop Supplies</SubHeading>

      <p className="mt-2 text-center text-base text-wurth-gray-800 md:mt-6 md:text-lg">
        Explore our top categories to find the best woodworking and shop
        supplies for your projects. From high-quality drawer slides and cabinet
        hinges to decorative hardware and essential woodworking machinery, these
        categories feature our most sought-after products. Whether you&apos;re a
        professional craftsman or a dedicated hobbyist, you&apos;ll have access
        to all the tools and materials you need.
      </p>

      <ul className="w-full space-x-2 space-y-10 pb-4 text-center md:space-x-[1.875rem]">
        {data.slice(0, SHOWN_CATEGORIES).map((category) => (
          <li
            key={category.id}
            className="inline-block w-[7rem] md:w-[7.75rem]"
          >
            <Link
              href={`/category/${category.id}/${category.slug}`}
              className="btnAction flex flex-col items-center gap-4 md:gap-2"
              data-button-action={`An image of the category ${category.name}`}
            >
              <div className="flex size-28 items-center justify-center overflow-hidden rounded-full p-4 shadow-sm md:size-[7.75rem]">
                <Image
                  src={category.img}
                  alt={`An image of the category ${category.name}`}
                  width={124}
                  height={124}
                  className="size-full object-contain object-center"
                />
              </div>

              <span className="text-center text-[0.9375rem] font-semibold leading-5 text-black md:text-base">
                {category.name}
              </span>
            </Link>
          </li>
        ))}
      </ul>

      {!!viewAllCategory && (
        <div className="flex flex-row justify-center">
          <Link
            href={`/category/${viewAllCategory.id}/${viewAllCategory.slug}`}
            className={cn(
              buttonVariants({ variant: "outline" }),
              "btnAction h-fit p-2.5 text-sm font-bold leading-5 text-black",
            )}
            data-button-action="View All Categories"
          >
            View all categories
          </Link>
        </div>
      )}
    </section>
  );
};

export default FeaturedCategories;
