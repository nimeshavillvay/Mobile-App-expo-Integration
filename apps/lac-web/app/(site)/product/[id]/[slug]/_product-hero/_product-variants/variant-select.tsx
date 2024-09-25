"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@repo/web-ui/components/ui/select";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { Value } from "./types";

type VariantSelectProps = {
  readonly values: Value[];
};

const VariantSelect = ({ values }: VariantSelectProps) => {
  const router = useRouter();
  const selectedValue = values.find((value) => value.selected);

  const onValueChange = (newValue: string) => {
    const selectedValue = values.find(
      (value) => value.id?.toString() === newValue,
    );

    if (selectedValue) {
      router.push(`/product/${selectedValue.productid}/${selectedValue.slug}`);
    }
  };

  return (
    <>
      <Select
        defaultValue={selectedValue?.id.toString()}
        onValueChange={onValueChange}
      >
        <SelectTrigger className="h-12">
          <SelectValue placeholder="Select a variant" />
        </SelectTrigger>
        <SelectContent>
          {values.map((value) => (
            <SelectItem
              key={value.id}
              value={value?.id.toString() ?? ""}
              disabled={!value.productid}
            >
              {value.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Hidden links for crawling */}
      <nav className="hidden">
        {values
          .filter((value) => value.productid && value.slug)
          .map((value) => (
            <Link
              key={value.id}
              href={`/product/${value.productid}/${value.slug}`}
              className="btnAction"
              data-btn-action="Select Product Variant"
            >
              {value.name}
            </Link>
          ))}
      </nav>
    </>
  );
};

export default VariantSelect;
