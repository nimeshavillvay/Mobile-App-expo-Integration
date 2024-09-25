import useSuspenseCheckLogin from "@/_hooks/user/use-suspense-check-login.hook";
import type { ItemPrice, Token } from "@/_lib/types";
import { cn, formatNumberToPrice } from "@/_lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@repo/web-ui/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useCartFormIdContext } from "../cart-form-id-context";
import type { ViewportTypes } from "./types";

const EXCLUDED_KEYS = ["e", "E", "+", "-", "Enter"] as const;
const MIN_STEP = 0.0001;

type CartItemPriceProps = {
  readonly token: Token;
  readonly priceData: ItemPrice;
  readonly onPriceChange?: (newPrice: number) => void;
  readonly type: ViewportTypes;
  readonly isLaminateItem: boolean;
};

const cartItemPriceSchema = z.object({
  price: z
    .number({
      message: "Price required",
    })
    .positive("Price must be positive")
    .multipleOf(MIN_STEP, "Invalid price"),
});

const CartItemPrice = ({
  token,
  priceData,
  onPriceChange,
  type,
  isLaminateItem,
}: CartItemPriceProps) => {
  const cartFormId = useCartFormIdContext();

  const loginCheckResponse = useSuspenseCheckLogin(token);

  const extendedPrice = priceData?.extendedPrice;
  const price = priceData?.price;
  const priceUnit = priceData?.priceUnit;
  const listPrice = priceData?.listPrice;

  const loginCheckData = loginCheckResponse.data;

  const { register, formState, trigger, getValues } = useForm<
    z.infer<typeof cartItemPriceSchema>
  >({
    resolver: zodResolver(cartItemPriceSchema),
    values: {
      price: Number(price) ?? 0,
    },
  });

  const onBlur = async () => {
    const data = getValues();

    await trigger(); // Trigger validation on blur

    if (onPriceChange) {
      onPriceChange(Number(data.price));
    }
  };

  const onChange = async () => {
    await trigger(); // Trigger validation on change
  };

  if (
    loginCheckData?.status_code === "OK" &&
    "sales_rep_id" in loginCheckData &&
    "user_id" in loginCheckData
  ) {
    return (
      <>
        <div
          className={cn(
            "flex w-full items-center",
            type === "desktop" ? "justify-end" : "justify-start md:hidden",
          )}
        >
          <Input
            className={cn(
              "h-fit w-24 rounded-none rounded-l border-r-0 px-2.5 py-1 text-right text-base focus:border-none focus:outline-none focus:ring-0 md:w-20",
              formState.errors.price ? "border-red-700" : "border-gray-200",
            )}
            type="number"
            {...register("price", {
              required: true,
              valueAsNumber: true,
              onBlur: onBlur,
              onChange: onChange,
            })}
            onWheel={(e) => (e.target as HTMLInputElement).blur()}
            min={MIN_STEP}
            step={MIN_STEP}
            form={cartFormId} // This is to check the validity when clicking "checkout"
            onKeyDown={(e) => {
              if (EXCLUDED_KEYS.includes(e.key)) {
                e.preventDefault();

                // Submit the price if the user presses "Enter"
                if (e.key === "Enter") {
                  const price = getValues("price");

                  if (onPriceChange) {
                    onPriceChange(Number(price));
                  }
                }
              }
            }}
            disabled={isLaminateItem}
          />
          <span
            className={cn(
              "rounded-r border border-l-0 p-1 pr-1.5 lowercase text-wurth-gray-400",
              formState.errors.price ? "border-red-700" : "border-gray-200",
            )}
          >
            /{priceUnit}
          </span>
        </div>

        {formState.errors.price && (
          <p className="text-xs text-red-700">
            {formState.errors.price.message}
          </p>
        )}
      </>
    );
  }

  return (
    <div
      className={cn(
        "flex flex-wrap",
        type === "desktop"
          ? "flex-col items-end text-right"
          : "flex-row items-center md:hidden",
      )}
    >
      <div
        className={cn(
          type === "mobile" && "flex flex-row flex-wrap items-center gap-x-2",
        )}
      >
        <div className="text-lg text-green-700">
          ${formatNumberToPrice(extendedPrice)}
        </div>

        <div className="text-sm font-medium text-wurth-gray-500">
          ${formatNumberToPrice(price)}/{priceUnit}
        </div>
      </div>

      {listPrice > 0 && price > 0 && listPrice > price && (
        <div className="ml-1 text-[13px] leading-5 text-wurth-gray-500 line-through">
          ${formatNumberToPrice(listPrice)}/{priceUnit}
        </div>
      )}
    </div>
  );
};

export default CartItemPrice;
