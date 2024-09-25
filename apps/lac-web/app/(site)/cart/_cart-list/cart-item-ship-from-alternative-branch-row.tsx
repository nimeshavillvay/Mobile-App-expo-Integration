import NumberInputField from "@/_components/number-input-field";
import useDebouncedState from "@/_hooks/misc/use-debounced-state.hook";
import { type AvailabilityOptionPlants } from "@/_hooks/product/use-suspense-check-availability.hook";
import { type Plant } from "@/_lib/types";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@repo/web-ui/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@repo/web-ui/components/ui/select";
import { TableCell, TableRow } from "@repo/web-ui/components/ui/table";
import { useDeferredValue, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import type { z } from "zod";
import { type Availability } from "../types";
import useUnSavedAlternativeQuantityState from "../use-cart-alternative-qty-method-store.hook";
import {
  BackOrderItemCountLabel,
  ItemCountBadge,
  ItemInStockCountBadge,
} from "./cart-item-shipping-method";
import { shipFromAltQtySchema } from "./helpers";
import PlantName from "./plant-name";

type BranchRowProps = {
  readonly quantityFieldIndex: number;
  readonly plant: AvailabilityOptionPlants;
  readonly plants: Plant[];
  readonly availability: Availability;
  readonly increment: number;
  readonly uom: string;
  readonly availableQuantityInPlant: number;
  readonly sku: string;
  readonly cartItemId: number;
  readonly boPlant: string;
};

const CartItemShipFromAlternativeBranchRow = ({
  quantityFieldIndex,
  plant,
  plants,
  availability,
  increment,
  uom,
  availableQuantityInPlant,
  sku,
  cartItemId,
  boPlant,
}: BranchRowProps) => {
  const schema = shipFromAltQtySchema(increment);
  type ShipFromAltQtySchema = z.infer<typeof schema>;
  const { control, watch } = useFormContext<ShipFromAltQtySchema>();

  const quantity = watch("quantityAlt");
  const delayedQuantity = useDebouncedState(quantity);
  const deferredQuantity = useDeferredValue(delayedQuantity);

  const currentEnteredQuantity = Number(deferredQuantity[quantityFieldIndex]);

  const [boQty, setBoQty] = useState(
    currentEnteredQuantity > availableQuantityInPlant
      ? currentEnteredQuantity - availableQuantityInPlant
      : 0,
  );
  const { pushSku, popSku } = useUnSavedAlternativeQuantityState(
    (state) => state.actions,
  );

  const formId = `alternative-${cartItemId}`;

  const updateBackOrderQuantity = (quantity: number, defaultValue: number) => {
    if (quantity !== defaultValue) {
      pushSku(sku);
    } else {
      popSku([sku]);
    }

    setBoQty(
      availableQuantityInPlant < quantity
        ? quantity - availableQuantityInPlant
        : 0,
    );
  };

  const isBOPlant = plant.plant === boPlant;
  const availabilityOfPlant =
    availability.availableLocations.find(
      (item) => item.location === plant.plant,
    )?.amount ?? 0;

  return (
    <>
      <TableRow key={plant.plant} className="w-full border-b-0 pt-5">
        <TableCell className="w-1/2 font-medium">
          <PlantName plants={plants} plantCode={plant.plant} />
          <div className="text-sm">
            <ItemInStockCountBadge availableCount={availabilityOfPlant} />
          </div>
        </TableCell>
        <TableCell className="w-1/2 text-right">
          <Controller
            control={control}
            name={`quantityAlt.${quantityFieldIndex}`}
            render={({ field: { onChange, onBlur, value, name, ref } }) => (
              <div className="flex items-center rounded border focus:border-none focus:outline-none focus:ring-0">
                <NumberInputField
                  onBlur={onBlur}
                  onChange={(event) => {
                    updateBackOrderQuantity(
                      Number(event.target.value),
                      Number(event.target.defaultValue),
                    );
                    onChange(
                      Number(event.target.value) > availabilityOfPlant &&
                        !isBOPlant
                        ? availabilityOfPlant
                        : event,
                    );
                  }}
                  value={value}
                  ref={ref}
                  name={name}
                  removeDefaultStyles
                  className="h-fit w-24 border-none px-2.5 py-1 text-base shadow-none focus:border-r-0 focus:border-none focus:outline-none focus:ring-0 md:w-20"
                  step={increment}
                  label="Quantity"
                  form={formId}
                />
                <span className="px-1.5 lowercase text-zinc-500">{uom}</span>
              </div>
            )}
          />
        </TableCell>
      </TableRow>

      <TableRow>
        <TableCell colSpan={2}>
          {plant.shippingMethods.length > 0 && (
            <FormField
              control={control}
              name={`shippingMethod.${quantityFieldIndex}`}
              render={({ field }) => (
                <FormItem className="col-span-3">
                  <Select
                    disabled={plant.shippingMethods.length === 1}
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a delivery method" />
                      </SelectTrigger>
                    </FormControl>

                    <SelectContent>
                      {plant.shippingMethods.map((option) => (
                        <SelectItem key={option.code} value={option.code}>
                          {option.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <FormDescription className="sr-only">
                    Select your country
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          {isBOPlant && (
            <div className="py-2 text-sm font-medium">
              <span>
                <ItemCountBadge
                  count={Math.min(currentEnteredQuantity, availabilityOfPlant)}
                />{" "}
                <span className="text-sm font-medium">ship to me</span>
              </span>
              {boQty > 0 && <BackOrderItemCountLabel count={boQty} />}{" "}
            </div>
          )}
        </TableCell>
      </TableRow>
    </>
  );
};

export default CartItemShipFromAlternativeBranchRow;
