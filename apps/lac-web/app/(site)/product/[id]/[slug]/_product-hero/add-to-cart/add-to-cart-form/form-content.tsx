import { AddToCart as AddToCartIcon } from "@repo/web-ui/components/icons/add-to-cart";
import { Minus } from "@repo/web-ui/components/icons/minus";
import { Plus } from "@repo/web-ui/components/icons/plus";
import { Button } from "@repo/web-ui/components/ui/button";
import { type ComponentProps, type ReactNode } from "react";

type FormContentProps = {
  readonly uom?: string;
  readonly formProps: Omit<ComponentProps<"form">, "className">;
  readonly decrementButtonProps: Omit<
    ComponentProps<typeof Button>,
    "type" | "variant" | "size" | "className"
  >;
  readonly children: ReactNode;
  readonly incrementButtonProps: Omit<
    ComponentProps<typeof Button>,
    "type" | "variant" | "size" | "className"
  >;
  readonly submitButtonProps: Omit<
    ComponentProps<typeof Button>,
    "type" | "variant" | "className"
  >;
};

const FormContent = ({
  uom,
  formProps,
  decrementButtonProps,
  children,
  incrementButtonProps,
  submitButtonProps,
}: FormContentProps) => {
  return (
    <form className="flex flex-row items-stretch gap-2" {...formProps}>
      <div className="flex-[4] rounded-md border border-wurth-gray-250 p-0.5 md:flex-1">
        <div className="text-center text-xs font-medium uppercase leading-none text-wurth-gray-400">
          Qty / {uom}
        </div>

        <div className="flex flex-row items-center justify-between gap-2">
          <Button
            type="button"
            variant="subtle"
            size="icon"
            className="up-minus up-control ml-2 h-7 w-10 rounded-sm"
            {...decrementButtonProps}
          >
            <Minus
              className="btnAction size-4"
              data-button-action="Decrease Quantity"
            />
            <span className="sr-only">Reduce quantity</span>
          </Button>

          {children}

          <Button
            type="button"
            variant="subtle"
            size="icon"
            className="up-plus up-control mr-2 h-7 w-10 rounded-sm"
            {...incrementButtonProps}
          >
            <Plus
              className="btnAction size-4"
              data-button-action="Increase Quantity"
            />
            <span className="sr-only">Increase quantity</span>
          </Button>
        </div>
      </div>

      <Button
        type="submit"
        variant="secondary"
        className="h-full flex-[5] gap-2 rounded-lg px-5 py-4 shadow-md md:flex-[2]"
        {...submitButtonProps}
      >
        <AddToCartIcon className="stroke-white" />

        <span className="text-lg font-semibold">Add to cart</span>
      </Button>
    </form>
  );
};

export default FormContent;
