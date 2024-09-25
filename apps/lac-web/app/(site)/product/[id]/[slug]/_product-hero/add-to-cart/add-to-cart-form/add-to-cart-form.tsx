"use client";

import NumberInputField from "@/_components/number-input-field";
import useAddToCartMutation from "@/_hooks/cart/use-add-to-cart-mutation.hook";
import useAddToCartDialog from "@/_hooks/misc/use-add-to-cart-dialog.hook";
import useSuspenseCheckAvailability from "@/_hooks/product/use-suspense-check-availability.hook";
import useSuspenseCheckLogin from "@/_hooks/user/use-suspense-check-login.hook";
import { MAX_QUANTITY, NOT_AVAILABLE } from "@/_lib/constants";
import {
  calculateIncreaseQuantity,
  calculateReduceQuantity,
} from "@/_lib/utils";
import { Controller } from "react-hook-form";
import useAddToCartForm from "../../use-add-to-cart-form.hook";
import FormContent from "./form-content";

type AddToCartFormProps = {
  readonly token?: string;
  readonly productId: number;
  readonly minQty: number;
  readonly incQty: number;
  readonly uom: string;
};

const AddToCartForm = ({
  token,
  productId,
  minQty,
  incQty,
  uom,
}: AddToCartFormProps) => {
  const checkLoginQuery = useSuspenseCheckLogin(token);

  const { watch, setValue, handleSubmit, control } = useAddToCartForm();
  const quantity = watch("quantity");

  const { setQuantity } = useAddToCartDialog((state) => state.actions);

  const reduceQuantity = () => {
    // Use `Number(quantity)` because `quantity` is a string at runtime
    setValue(
      "quantity",
      calculateReduceQuantity(Number(quantity), minQty, incQty),
    );
  };
  const increaseQuantity = () => {
    // Use `Number(quantity)` because `quantity` is a string at runtime
    setValue(
      "quantity",
      calculateIncreaseQuantity(Number(quantity), minQty, incQty),
    );
  };

  const addToCartMutation = useAddToCartMutation({
    productId,
  });

  const onSubmit = handleSubmit((values) => {
    // Update the quantity in add to cart dialog
    setQuantity(quantity);

    addToCartMutation.mutate(values);
  });

  const checkAvailabilityQuery = useSuspenseCheckAvailability(token, {
    productId,
    qty: minQty,
  });
  const disableAddToCartButton =
    checkAvailabilityQuery.data.status === NOT_AVAILABLE;

  if (checkLoginQuery.data?.status_code === "OK") {
    // If the user has logged in, we should do an additional check to
    // see if the product is regional locked
    return (
      <AddToCartFormLoggedIn
        token={token}
        productId={productId}
        minQty={minQty}
        incQty={incQty}
        uom={uom}
      />
    );
  }

  return (
    <FormContent
      uom={uom}
      formProps={{ onSubmit }}
      decrementButtonProps={{
        onClick: reduceQuantity,
        disabled:
          !quantity ||
          Number(quantity) === minQty ||
          addToCartMutation.isPending ||
          disableAddToCartButton,
      }}
      incrementButtonProps={{
        onClick: increaseQuantity,
        disabled:
          quantity?.toString().length > 5 ||
          addToCartMutation.isPending ||
          disableAddToCartButton ||
          Number(quantity) + incQty >= MAX_QUANTITY,
      }}
      submitButtonProps={{
        disabled: addToCartMutation.isPending || disableAddToCartButton,
      }}
    >
      <Controller
        control={control}
        name="quantity"
        render={({ field: { onChange, onBlur, value, name, ref } }) => (
          <NumberInputField
            onBlur={onBlur}
            onChange={onChange}
            value={value}
            ref={ref}
            name={name}
            disabled={addToCartMutation.isPending || disableAddToCartButton}
            required
            min={minQty}
            step={incQty}
            label="Quantity"
          />
        )}
      />
    </FormContent>
  );
};

export default AddToCartForm;

// A separate component for logged in users so that the
// regional restriction can be checked
const AddToCartFormLoggedIn = ({
  token,
  productId,
  minQty,
  incQty,
  uom,
}: AddToCartFormProps) => {
  // TODO Try to remove the duplicated code
  const { watch, setValue, handleSubmit, control } = useAddToCartForm();
  const quantity = watch("quantity");

  const { setQuantity } = useAddToCartDialog((state) => state.actions);

  const reduceQuantity = () => {
    // Use `Number(quantity)` because `quantity` is a string at runtime
    setValue(
      "quantity",
      calculateReduceQuantity(Number(quantity), minQty, incQty),
    );
  };
  const increaseQuantity = () => {
    // Use `Number(quantity)` because `quantity` is a string at runtime
    setValue(
      "quantity",
      calculateIncreaseQuantity(Number(quantity), minQty, incQty),
    );
  };

  const addToCartMutation = useAddToCartMutation({
    productId,
  });

  const onSubmit = handleSubmit((values) => {
    // Update the quantity in add to cart dialog
    setQuantity(quantity);

    addToCartMutation.mutate(values);
  });

  const checkAvailabilityQuery = useSuspenseCheckAvailability(token, {
    productId,
    qty: minQty,
  });
  const disableAddToCartButton =
    checkAvailabilityQuery.data.status === NOT_AVAILABLE;

  return (
    <FormContent
      uom={uom}
      formProps={{ onSubmit }}
      decrementButtonProps={{
        onClick: reduceQuantity,
        disabled:
          !quantity ||
          Number(quantity) === minQty ||
          addToCartMutation.isPending ||
          disableAddToCartButton,
      }}
      incrementButtonProps={{
        onClick: increaseQuantity,
        disabled:
          quantity?.toString().length > 5 ||
          addToCartMutation.isPending ||
          disableAddToCartButton ||
          Number(quantity) + incQty >= MAX_QUANTITY,
      }}
      submitButtonProps={{
        disabled:
          !quantity ||
          quantity < minQty ||
          quantity % incQty !== 0 ||
          addToCartMutation.isPending ||
          disableAddToCartButton,
      }}
    >
      <Controller
        control={control}
        name="quantity"
        render={({ field: { onChange, onBlur, value, name, ref } }) => (
          <NumberInputField
            onBlur={onBlur}
            onChange={onChange}
            value={value}
            ref={ref}
            name={name}
            disabled={addToCartMutation.isPending || disableAddToCartButton}
            required
            min={minQty}
            step={incQty}
            label="Quantity"
          />
        )}
      />
    </FormContent>
  );
};
