"use client";

import NumberInputField from "@/_components/number-input-field";
import { cn } from "@/_lib/utils";
import { Close } from "@repo/web-ui/components/icons/close";
import { Button } from "@repo/web-ui/components/ui/button";
import { Input } from "@repo/web-ui/components/ui/input";
import { type UseFormRegisterReturn } from "react-hook-form";
import ItemSelectorInput from "./item-selector-input";
import ProductSearchResult from "./product-search-result";
import type { CartItem, Product } from "./types";

type NewItemRowProps = {
  readonly index: number;
  readonly id: string;
  readonly searchResultProducts: Product[];
  readonly onSelectedItemChange: (value: Product, index: number) => void;
  readonly lineItemFormData: CartItem;
  readonly onChange: (
    value: string,
    isItemClick: boolean,
    index: number,
  ) => void;
  readonly lastEditedIndex: number;
  readonly setLastEditedIndex: (index: number) => void;
  readonly isPopupOpen: boolean;
  readonly registerQuantityField: UseFormRegisterReturn<`cart.${number}.quantity`>;
  readonly registerJobNameField: UseFormRegisterReturn<`cart.${number}.jobName`>;
  readonly isFormSubmitted: boolean;
  readonly isInvalidQuantity: (index: number) => boolean;
  readonly isLoading: boolean;
  readonly removeLineItem: () => void;
};

const NewItemRow = ({
  index,
  id,
  searchResultProducts,
  onSelectedItemChange,
  lineItemFormData,
  onChange,
  lastEditedIndex,
  setLastEditedIndex,
  isPopupOpen,
  registerQuantityField,
  registerJobNameField,
  isFormSubmitted,
  isInvalidQuantity,
  isLoading,
  removeLineItem,
}: NewItemRowProps) => {
  const getLineItemStatus = () => {
    if (lineItemFormData.sku == "") {
      return null;
    }

    return lineItemFormData.isInvalid;
  };

  return (
    <div className="mb-3 flex items-center gap-2">
      <ItemSelectorInput
        id={id}
        items={searchResultProducts}
        onSelectedItemChange={(value) => {
          onSelectedItemChange(value, index);
        }}
        value={lineItemFormData.sku}
        isInvalid={getLineItemStatus() ?? null}
        onTextChange={(value, isItemClick) => {
          onChange(value, isItemClick, index);
          setLastEditedIndex(index);
        }}
        isPopupOpen={isPopupOpen && lastEditedIndex == index}
      />

      <Input
        {...registerJobNameField}
        id={`sku-${index}-${id}`}
        placeholder="PO number / job name"
        className="h-10 min-w-32 px-3 py-2"
      />

      <NumberInputField
        {...registerQuantityField}
        label="quantity"
        placeholder="Qty"
        min={1}
        step={1}
        removeDefaultStyles
        className={cn(
          "h-10 w-20 px-3 py-2",
          isFormSubmitted &&
            isInvalidQuantity(index) &&
            "border-wurth-red-650 text-wurth-red-650",
        )}
      />

      <div className="h-10 min-w-52 lg:min-w-96">
        <ProductSearchResult
          product={{
            isInvalid: lineItemFormData?.isInvalid,
            info: lineItemFormData?.info,
          }}
          isLoading={isLoading}
          isLastEditedIndex={lastEditedIndex == index}
        />
      </div>

      <Button
        variant="ghost"
        className="h-6 w-6 cursor-pointer px-1.5"
        onClick={removeLineItem}
        data-button-action="Quick Order Remove Item"
      >
        <Close
          width={12}
          height={12}
          className="stroke-2 hover:stroke-black"
          data-button-action="Quick Order Remove Item"
        />
      </Button>
    </div>
  );
};

export default NewItemRow;
