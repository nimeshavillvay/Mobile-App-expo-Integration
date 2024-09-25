"use client";

import { Button } from "@repo/web-ui/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Balancer from "react-wrap-balancer";
import type { SubCategory } from "./types";

const MAIN_CATEGORIES_LENGTH = 6;

type SubCategoriesListProps = {
  readonly categories: SubCategory[];
};

const SubCategoriesList = ({ categories }: SubCategoriesListProps) => {
  const [showAll, setShowAll] = useState(false);

  if (categories.length === 0) {
    return null;
  }

  const visibleSubCategories = categories.slice(0, MAIN_CATEGORIES_LENGTH);
  const hiddenSubCategories = categories.slice(
    MAIN_CATEGORIES_LENGTH,
    MAIN_CATEGORIES_LENGTH + categories.length,
  );

  return (
    <section className="container my-10 space-y-6 md:my-16 md:space-y-9">
      <ul className="grid grid-cols-3 justify-items-center gap-y-10 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
        {[...visibleSubCategories, ...(showAll ? hiddenSubCategories : [])].map(
          (category, index) => (
            <li key={category.id}>
              <Link
                href={`/category/${category.id}/${category.slug}`}
                className="btnAction btn-nav flex flex-col items-center gap-4"
                data-btn-action={`View Sub-Category ${category.title}`}
              >
                <div className="grid size-28 place-items-center rounded-full bg-gradient-to-t from-[#EBEFF5] to-[#F7FAFF] md:size-[11.25rem]">
                  <Image
                    src={category.image}
                    alt={`An image of ${category.title}`}
                    width={127}
                    height={127}
                    className="size-[79px] object-contain mix-blend-multiply md:size-[127px]"
                    priority={index < MAIN_CATEGORIES_LENGTH}
                  />
                </div>

                <h2 className="text-center text-[0.9375rem] font-semibold leading-5 text-black">
                  <Balancer>{category.title}</Balancer>
                </h2>
              </Link>
            </li>
          ),
        )}
      </ul>

      {hiddenSubCategories.length > 0 && (
        <div className="flex flex-row justify-center">
          <Button
            variant="outline"
            className="mx-auto self-center py-2.5 font-bold text-black"
            onClick={() => setShowAll(!showAll)}
            data-button-action={`Sub-Category ${showAll ? "Show less" : "Show all"}`}
          >
            {showAll ? "Show less" : "Show all"}
          </Button>
        </div>
      )}
    </section>
  );
};

export default SubCategoriesList;
