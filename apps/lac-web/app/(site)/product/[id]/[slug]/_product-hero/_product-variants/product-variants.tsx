import { api } from "@/_lib/api";
import { DEFAULT_REVALIDATE } from "@/_lib/constants";
import { cva } from "@/_lib/cva.config";
import { cn } from "@/_lib/utils";
import { Check } from "@repo/web-ui/components/icons/check";
import { buttonVariants } from "@repo/web-ui/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { type ReactNode } from "react";
import type { Value } from "./types";
import VariantSelect from "./variant-select";

type ProductVariantsProps = {
  readonly id: string;
  readonly className?: string;
};

const ProductVariants = async ({ id, className }: ProductVariantsProps) => {
  const filters = await api
    .get(`rest/groupfilters/${id}`, {
      next: {
        revalidate: DEFAULT_REVALIDATE,
      },
    })
    .json<
      {
        id: number;
        name: string;
        type: "icon" | "text";
        values: Value[];
      }[]
    >();

  const validFilters = filters
    .map((filter) => ({
      ...filter,
      values: filter.values.map((value) => ({
        ...value,
        name: value.name?.length > 0 ? value.name : "N/A",
      })),
    }))
    .filter((filter) => filter.values.length > 1);

  return (
    <section className={cn("flex flex-col gap-6", className)}>
      {validFilters.map((filter) => (
        <div key={filter.id} className="space-y-2">
          <h3 className="text-base text-wurth-gray-800">
            {filter.name}:{" "}
            <span className="font-semibold">
              {filter.values.find((value) => value.selected)?.name}
            </span>
          </h3>

          <nav className="flex flex-row flex-wrap items-center gap-2">
            {filter.values.length < 5 ? (
              filter.values.map((value) => (
                <VariantLink
                  key={value.id}
                  type={filter.type}
                  selected={value.selected}
                  valid={!!value.productid}
                  href={
                    value.productid
                      ? `/product/${value.productid}/${value.slug}`
                      : null
                  }
                  data-button-action="Product Variant"
                >
                  {filter.type === "icon" ? (
                    <>
                      <Image
                        src={value.icon ?? ""}
                        alt={`A picture of the ${filter.name} ${value.name}`}
                        width={52}
                        height={52}
                        data-button-action="Product Variant"
                      />

                      {value.selected && (
                        <div className="absolute left-1/2 top-1/2 z-10 grid size-5 -translate-x-1/2 -translate-y-1/2 select-none place-items-center rounded-full border-2 border-wurth-gray-250 bg-wurth-red-650">
                          <Check
                            className="size-3 stroke-white"
                            data-button-action="Product Variant"
                          />
                        </div>
                      )}

                      <span className="sr-only">{value.name}</span>
                    </>
                  ) : (
                    value.name
                  )}
                </VariantLink>
              ))
            ) : (
              <VariantSelect values={filter.values} />
            )}
          </nav>
        </div>
      ))}
    </section>
  );
};

export default ProductVariants;

const linkStyle = cva({
  base: [buttonVariants({ variant: "ghost" }), "h-fit rounded-lg border-2"],
  variants: {
    selected: {
      true: "border-wurth-red-650 bg-red-50 hover:bg-red-100",
      false: "border-wurth-gray-150 bg-white",
    },
    type: {
      icon: "relative p-1.5",
      text: "px-4 py-3 text-sm font-semibold",
    },
  },
});

const VariantLink = <Valid extends boolean>({
  children,
  type,
  selected,
  valid,
  href,
}: {
  readonly children: ReactNode;
  readonly type: "icon" | "text";
  readonly selected: boolean;
  readonly valid: Valid;
  readonly href: Valid extends true ? string : null;
}) => {
  if (!valid || !href) {
    return (
      <button
        className={cn(
          linkStyle({
            selected: false,
            type,
          }),
          "btnAction",
        )}
        disabled
      >
        {children}
      </button>
    );
  }

  return (
    <Link
      href={href}
      className={cn(
        linkStyle({
          selected,
          type,
        }),
        "btnAction",
      )}
      data-btn-action="View Product Variant"
    >
      {children}
    </Link>
  );
};
