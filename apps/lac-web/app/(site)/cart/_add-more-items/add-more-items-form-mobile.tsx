"use client";

import WurthLacLogo from "@/_components/wurth-lac-logo";
import useAddMultipleToCartMutation from "@/_hooks/cart/use-add-multiple-to-cart-mutation.hook";
import { zodResolver } from "@hookform/resolvers/zod";
import { Alert } from "@repo/web-ui/components/icons/alert";
import { Plus } from "@repo/web-ui/components/icons/plus";
import { Button } from "@repo/web-ui/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@repo/web-ui/components/ui/drawer";
import { Input } from "@repo/web-ui/components/ui/input";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import getStatus from "./apis";

const ALLOWED_KEYS = [
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "Backspace",
];

const formSchema = z.object({
  sku: z.string(),
  quantity: z.union([z.number().int().positive(), z.nan()]).nullable(),
  poJobName: z.string().optional(),
});
type FormSchema = z.infer<typeof formSchema>;

const AddMoreItemsFormMobile = () => {
  const [product, setProduct] = useState<{
    productid: string;
    sku: string;
    availability: string;
    mqt: string;
    qmm: string;
    quantityMultiplier: string;
    requestedQT: number;
    minimumQuantity: string;
    title: string;
    product_exclution: boolean;
    product_exclution_msg: null;
    product_discontinue: boolean;
    product_discontinue_msg: null;
    product_qty_multiple: boolean;
    product_qty_multiple_msg: null;
    image: string;
    brand: string;
  }>();
  const INVALID_ITEM_ERROR_MESSAGE = "Item not found. Try again.";
  const REQUIRED_ITEM_NUMBER_ERROR_MESSAGE = "Item number is required";
  const REQUIRED_QUANTITY_ERROR_MESSAGE = "Quantity is required";
  const MINIMUM_QUANTITY_ERROR_MESSAGE =
    "Quantity is less than minimum quantity";
  const QUANTITY_MULTIPLIER_ERROR_MESSAGE =
    "Quantity is not a multiple of sold in";

  const [isValidProduct, setIsValidProduct] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [open, setOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const addMultipleToCartMutation = useAddMultipleToCartMutation();

  const { handleSubmit, register, reset } = useForm<FormSchema>({
    defaultValues: {
      sku: "",
      quantity: null,
      poJobName: "",
    },
    mode: "onBlur",
    resolver: zodResolver(formSchema),
  });

  const verify = async (values: FormSchema) => {
    setErrorMessage(null);

    if (values.sku == "") {
      setErrorMessage(REQUIRED_ITEM_NUMBER_ERROR_MESSAGE);

      return;
    }

    try {
      const validatedCartItem = await getStatus({
        products: [
          {
            sku: values.sku,
            mqt: values.quantity ?? 0,
            poOrJobName: values.poJobName,
          },
        ],
      });

      setProduct(validatedCartItem[0]);
      setIsValidProduct(true);
      setIsVerified(true);
    } catch (error) {
      setIsValidProduct(false);
      setErrorMessage(INVALID_ITEM_ERROR_MESSAGE);
    }
  };

  const addItem = async (values: FormSchema) => {
    if (!isVerified) {
      verify(values);

      return;
    }

    if (!values.sku) {
      setErrorMessage(REQUIRED_ITEM_NUMBER_ERROR_MESSAGE);

      return;
    }

    if (!values.quantity) {
      setErrorMessage(REQUIRED_QUANTITY_ERROR_MESSAGE);

      return;
    }

    if (!product) {
      setErrorMessage(INVALID_ITEM_ERROR_MESSAGE);

      return;
    }

    if (Number(values.quantity) < Number(product.minimumQuantity)) {
      setErrorMessage(MINIMUM_QUANTITY_ERROR_MESSAGE);

      return;
    }

    if (Number(values.quantity) % Number(product.quantityMultiplier) !== 0) {
      setErrorMessage(QUANTITY_MULTIPLIER_ERROR_MESSAGE);

      return;
    }

    addMultipleToCartMutation.mutateAsync(
      [
        {
          productId: parseInt(product.productid),
          quantity: values.quantity,
          poOrJobName: values.poJobName,
          sku: values.sku,
          isDiscontinued: product.product_discontinue,
        },
      ],
      {
        onSuccess: () => {
          setProduct(undefined);
          setOpen(false);
          setErrorMessage(null); // Clear error after successfully adding to cart
          reset();
        },
      },
    );
  };

  return (
    <div>
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger asChild>
          <Button
            variant="default"
            className="flex h-fit w-full flex-row items-center gap-2 font-bold"
          >
            <Plus
              className="h-4 w-4 stroke-white stroke-2"
              data-button-action="Cart Add an Item"
            />
            <span data-button-action="Cart Mobile Open Add an Item Drawer">
              Add an item
            </span>
          </Button>
        </DrawerTrigger>

        <DrawerContent>
          <div className="mx-auto w-full max-w-[26.75rem] overflow-y-scroll px-4">
            <DrawerHeader className="px-0">
              <DrawerTitle className="px-0 text-left">
                Add an item to cart
              </DrawerTitle>

              <DrawerDescription className="sr-only">
                Add an item to cart
              </DrawerDescription>
            </DrawerHeader>

            <div className="mb-4 text-sm">
              Forgot Something? Add More Items to this Cart.
            </div>

            {errorMessage && (
              <div className="mb-4 flex h-10 items-center gap-2 rounded bg-[#FEF2F2] p-3 text-sm font-medium text-wurth-red-650">
                <Alert
                  className="mt-1 shrink-0 stroke-wurth-red-650"
                  width={18}
                  height={18}
                />
                {errorMessage}
              </div>
            )}

            {isVerified && isValidProduct && product && (
              <div className="mb-4 flex items-center gap-2 rounded border border-zinc-200 p-1 text-sm">
                {product.image ? (
                  <Image
                    src={product?.image}
                    alt={product?.title ?? ""}
                    width={60}
                    height={60}
                  />
                ) : (
                  <WurthLacLogo className="max-w-10" />
                )}

                <div className="min-w-16 text-xs">
                  <div>Min qty: {product?.minimumQuantity ?? ""}</div>
                  <div>Sold in: {product?.quantityMultiplier ?? ""}</div>
                </div>

                <div>
                  {product?.title.length > 65
                    ? product?.title.substring(0, 65) + "..."
                    : product?.title}
                </div>
              </div>
            )}

            <form
              onSubmit={handleSubmit(addItem)}
              noValidate
              className="text-sm font-medium"
            >
              <div className="mb-4 flex gap-2">
                <div className="w-2/3">
                  <div>Item Number</div>
                  <Input
                    {...register("sku")}
                    className="h-10 px-3 py-2"
                    onChange={() => setIsVerified(false)}
                  />
                </div>

                <div className="w-1/3">
                  <div>Qty</div>
                  <Input
                    className="h-10 px-3 py-2"
                    {...register("quantity", {
                      valueAsNumber: true,
                    })}
                    min={1}
                    step={1}
                    onKeyDown={(event) => {
                      const value = (event.target as HTMLInputElement).value;
                      if (
                        !ALLOWED_KEYS.includes(event.key) ||
                        (value &&
                          value.toString().length >= 5 &&
                          event.key !== "Backspace") || // Limit to 5 characters
                        (value !== undefined &&
                          value.toString().length === 0 &&
                          event.key === "0") // Disable "0" as first character
                      ) {
                        event.preventDefault();
                      }
                    }}
                  />
                </div>
              </div>

              <div className="mb-4">
                <div>PO #/ Job Name</div>
                <Input className="h-10 px-3 py-2" {...register("poJobName")} />
              </div>

              <DrawerFooter className="px-0 pb-9">
                <Button
                  type="submit"
                  data-button-action={`Cart Mobile Open ${isVerified ? "Add item" : "Verify"}`}
                >
                  {isVerified ? "Add item" : "Verify"}
                </Button>
              </DrawerFooter>
            </form>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default AddMoreItemsFormMobile;
