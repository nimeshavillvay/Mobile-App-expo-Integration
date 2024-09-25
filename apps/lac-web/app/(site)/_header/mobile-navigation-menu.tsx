"use client";

import { cva } from "@/_lib/cva.config";
import type { TransformedCategory } from "@/_lib/types";
import { cn } from "@/_lib/utils";
import { ArrowLeft } from "@repo/web-ui/components/icons/arrow-left";
import { ChevronRight } from "@repo/web-ui/components/icons/chevron-right";
import { Menu } from "@repo/web-ui/components/icons/menu";
import { Button } from "@repo/web-ui/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@repo/web-ui/components/ui/sheet";
import Link from "next/link";
import { useState } from "react";

const sectionHeadingStyles = cva({
  base: "pb-2 pl-4 pr-2 pt-5 text-sm font-semibold text-wurth-gray-800",
});
const sectionLinkStyles = cva({
  base: "flex flex-row items-center justify-between gap-2 bg-white px-4 py-3 text-base font-normal text-black",
});
const dividerStyles = cva({
  base: "divide-y divide-wurth-gray-250",
});

type MobileNavigationMenuProps = {
  readonly categories: TransformedCategory[];
};

const MobileNavigationMenu = ({ categories }: MobileNavigationMenuProps) => {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="size-6 flex-shrink-0 md:hidden"
        >
          <Menu data-button-action="View Mobile Category Menu" />

          <span className="sr-only">Menu</span>
        </Button>
      </SheetTrigger>

      <SheetContent side="left" className="w-80 bg-wurth-gray-50">
        <SheetHeader className="text-left">
          <SheetTitle>Explore</SheetTitle>

          <SheetDescription className="sr-only">
            View all categories here.
          </SheetDescription>
        </SheetHeader>

        <div className={dividerStyles()}>
          <section className={dividerStyles()}>
            <h3 className={sectionHeadingStyles()}>All Categories</h3>

            <ul className={dividerStyles()}>
              {categories.map((category) => (
                <li key={category.id}>
                  {!!category.subCategory && category.subCategory.length > 0 ? (
                    <SubCategorySheet
                      category={category}
                      onCloseMain={() => setOpen(false)}
                    />
                  ) : (
                    <SheetClose asChild className={sectionLinkStyles()}>
                      <Link
                        href={`/category/${category.id}/${category.slug}`}
                        className="btnAction"
                        data-button-action={`View Category ${category.name}`}
                      >
                        <span>{category.name}</span>

                        <ChevronRight className="size-5" />
                      </Link>
                    </SheetClose>
                  )}
                </li>
              ))}
            </ul>
          </section>

          <section className={dividerStyles()}>
            <h3 className={sectionHeadingStyles()}>
              <span className="invisible">Other Links</span>
            </h3>

            <ul className={dividerStyles()}>
              <li className="border-b border-b-wurth-gray-250">
                <SheetClose asChild className={sectionLinkStyles()}>
                  <Link
                    href="/catalogs-literature"
                    data-button-action="View Resources"
                    className="btnAction"
                  >
                    <span>Resources</span>

                    <ChevronRight className="size-5" />
                  </Link>
                </SheetClose>
              </li>
            </ul>
          </section>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNavigationMenu;

type SubCategorySheetProps = {
  readonly category: TransformedCategory;
  readonly onCloseMain: () => void;
};

const SubCategorySheet = ({ category, onCloseMain }: SubCategorySheetProps) => {
  const [openSub, setOpenSub] = useState(false);

  return (
    <Sheet
      open={openSub}
      onOpenChange={(open) => {
        setOpenSub(open);

        if (!open) {
          onCloseMain();
        }
      }}
    >
      <SheetTrigger asChild className={cn(sectionLinkStyles(), "h-fit w-full")}>
        <Button variant="ghost" onClick={() => setOpenSub(true)}>
          <span data-button-action="View Mobile Categories">
            {category.name}
          </span>
          <ChevronRight
            className="size-5"
            data-button-action="View Mobile Categories"
          />
        </Button>
      </SheetTrigger>

      <SheetContent
        side="left"
        className="flex w-80 flex-col gap-0 bg-wurth-gray-50"
      >
        <SheetHeader className="text-left">
          <button
            className="btnAction flex flex-row items-center gap-1"
            onClick={() => setOpenSub(false)}
          >
            <ArrowLeft
              className="size-4 stroke-white"
              data-button-action="Close Mobile Categories"
            />
            <span
              className="text-sm font-medium text-white"
              data-button-action="Close Mobile Categories"
            >
              Back
            </span>
          </button>
          <SheetTitle>{category.name}</SheetTitle>
          <SheetDescription className="sr-only">
            All subcategories of {category.name}.
          </SheetDescription>
        </SheetHeader>

        <ul className={cn(dividerStyles(), "flex-1 overflow-y-auto")}>
          <li>
            <SheetClose
              asChild
              className={cn(sectionLinkStyles(), "font-semibold")}
              onClick={onCloseMain}
            >
              <Link
                href={`/category/${category.id}/${category.slug}`}
                data-button-action="Shop All"
                className="btnAction"
              >
                Shop all
              </Link>
            </SheetClose>
          </li>

          {category.subCategory?.map((subcategory) => (
            <li
              key={subcategory.id}
              className="last:!border-b last:!border-b-wurth-gray-250"
            >
              <SheetClose
                asChild
                className={sectionLinkStyles()}
                onClick={onCloseMain}
              >
                <Link
                  href={`/category/${subcategory.id}/${subcategory.slug}`}
                  data-button-action={`View Sub-Category ${subcategory.name}`}
                  className="btnAction"
                >
                  <span>{subcategory.name}</span>
                </Link>
              </SheetClose>
            </li>
          ))}
        </ul>
      </SheetContent>
    </Sheet>
  );
};
