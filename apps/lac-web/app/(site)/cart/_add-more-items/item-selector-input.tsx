"use client";

import WurthLacLogo from "@/_components/wurth-lac-logo";
import { cn } from "@/_lib/utils";
import { Alert } from "@repo/web-ui/components/icons/alert";
import { CheckCircle } from "@repo/web-ui/components/icons/check-circle";
import { Input } from "@repo/web-ui/components/ui/input";
import { useCombobox } from "downshift";
import Image from "next/image";
import type { ChangeEvent } from "react";
import type { Product } from "./types";

type ItemSelectorInputProps = {
  readonly items: Product[];
  readonly onTextChange: (selection: string, isItemClick: boolean) => void;
  readonly onSelectedItemChange: (value: Product) => void;
  readonly id: string;
  readonly isPopupOpen: boolean;
  readonly isInvalid: boolean | null;
  readonly value: string;
};

const ItemSelectorInput = ({
  items = [],
  onTextChange,
  onSelectedItemChange,
  id,
  isPopupOpen,
  isInvalid,
  value,
}: ItemSelectorInputProps) => {
  const {
    isOpen,
    getMenuProps,
    getInputProps,
    highlightedIndex,
    getItemProps,
    selectedItem,
  } = useCombobox({
    inputValue: value,
    isOpen: isPopupOpen,
    onSelectedItemChange: ({ selectedItem }) => {
      onSelectedItemChange(selectedItem);
    },
    items: items,
    itemToString: (item) => {
      return item ? item.sku : "N/A";
    },
  });

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    onTextChange(newValue, false);
  };

  return (
    <div>
      <div className="relative flex w-48 flex-col gap-0.5 bg-white shadow-sm">
        <Input
          id={id}
          placeholder="Item #"
          className={cn(
            "h-10 w-full",
            isInvalid === true && "border-wurth-red-650 text-wurth-red-650",
          )}
          {...getInputProps()}
          value={value}
          onChange={handleInputChange}
        />

        {isInvalid === false && (
          <CheckCircle
            className="absolute right-2 top-2.5 shrink-0 stroke-green-700"
            width={20}
            height={20}
          />
        )}
        {isInvalid === true && (
          <Alert
            className="absolute right-2 top-2.5 shrink-0 stroke-wurth-red-650"
            width={20}
            height={20}
          />
        )}
      </div>

      <ul
        className={cn(
          "absolute z-50 max-h-80 w-72 overflow-x-hidden overflow-y-scroll bg-white p-0",
          !(isOpen && items.length) && "hidden",
        )}
        {...getMenuProps()}
      >
        {isOpen &&
          items.length > 0 &&
          items.map((item, index) => (
            <li
              className={cn(
                highlightedIndex === index && "bg-blue-300",
                selectedItem === item && "font-bold",
                "cursor-pointer px-3 py-2 shadow-sm hover:bg-gray-100",
              )}
              key={item.sku}
              {...getItemProps({ item, index })}
            >
              <SearchResultProductData item={item} />
            </li>
          ))}
      </ul>
    </div>
  );
};

export default ItemSelectorInput;

const SearchResultProductData = ({ item }: { readonly item: Product }) => {
  return (
    <div className="flex gap-2">
      {item.image ? (
        <Image
          src={item.image}
          height={64}
          width={64}
          alt={item.sku}
          className="min-w-16"
        />
      ) : (
        <WurthLacLogo className="max-w-16" />
      )}

      <div>
        <div className="text-md">{item.sku}</div>

        <span className="text-sm font-medium text-gray-500">{item.title}</span>
      </div>
    </div>
  );
};
