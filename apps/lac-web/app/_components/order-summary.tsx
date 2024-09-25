"use client";

import useSuspenseCart from "@/_hooks/cart/use-suspense-cart.hook";
import useSuspenseSimulationCheckout from "@/_hooks/cart/use-suspense-simulation-checkout.hook";
import useUpdateCartConfigMutation from "@/_hooks/cart/use-update-cart-config-mutation.hook";
import useSuspenseCheckLogin from "@/_hooks/user/use-suspense-check-login.hook";
import { formatNumberToPrice } from "@/_lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Close } from "@repo/web-ui/components/icons/close";
import { Plus } from "@repo/web-ui/components/icons/plus";
import { Button } from "@repo/web-ui/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@repo/web-ui/components/ui/collapsible";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@repo/web-ui/components/ui/form";
import { Input } from "@repo/web-ui/components/ui/input";
import { useQueryClient } from "@tanstack/react-query";
import { useState, type ReactNode } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const promoSchema = z.object({
  promo: z.string(),
});

type OrderSummaryProps = {
  readonly token: string;
  readonly children?: ReactNode;
};

/**
 * Always wrap this component in a Suspense boundary
 * to avoid blocking the rendering of the parent component.
 */
const OrderSummary = ({ token, children }: OrderSummaryProps) => {
  const checkLoginQuery = useSuspenseCheckLogin(token);
  const simulationCheckoutQuery = useSuspenseSimulationCheckout(token);
  const simulationData = simulationCheckoutQuery.data;
  const {
    configuration: { coupon },
    cartItemsCount,
    discount,
    shippingCost,
    tax,
    net,
    total,
  } = simulationData;

  const [openPromo, setOpenPromo] = useState(
    // Open the promo code section if a promo code is already applied
    !!simulationCheckoutQuery.data.configuration.coupon,
  );
  const queryClient = useQueryClient();
  const cartQuery = useSuspenseCart(token);

  const form = useForm<z.infer<typeof promoSchema>>({
    resolver: zodResolver(promoSchema),
    values: {
      promo: simulationCheckoutQuery.data.configuration.coupon ?? "",
    },
  });

  const updateCartConfigMutation = useUpdateCartConfigMutation();

  const formattedNumberToPrice = (value: number) =>
    `$${formatNumberToPrice(parseFloat(value.toFixed(2)))}`;

  const updateCartConfig = (promo: string = "") => {
    updateCartConfigMutation.mutate(
      { coupon: promo },
      {
        onSuccess: (data) => {
          if (promo !== cartQuery.data.configuration.coupon) {
            queryClient.invalidateQueries({
              queryKey: ["user", "price-check"],
            });
          }
          if (data.error.coupon) {
            form.setError("promo", {
              message: "Invalid Promo Code",
            });

            return;
          }
          setOpenPromo(false);
        },
      },
    );
  };

  const onSubmit = form.handleSubmit((data) => {
    updateCartConfig(data.promo);
  });

  const onOpenChange = (open: boolean) => {
    setOpenPromo(open);

    if (!open) {
      // Remove the promo code when cancelling
      updateCartConfigMutation.mutate({ coupon: "" });

      // Reset the form when closing
      form.reset();
    }
  };

  return (
    <div className="flex flex-col gap-3 rounded-lg border border-wurth-gray-150 px-5 py-4 shadow-md">
      <h3 className="font-title text-xl font-medium tracking-[-0.1px] text-wurth-gray-800">
        Order Summary
      </h3>

      <table className="w-full text-sm text-wurth-gray-800">
        <tbody>
          <tr>
            <td className="pb-1">Subtotal ({cartItemsCount} items)</td>

            <td className="pb-1 text-right">{formattedNumberToPrice(net)}</td>
          </tr>

          {discount > 0 && (
            <tr>
              <td className="py-1">Savings</td>

              <td className="py-1 text-right font-medium text-green-700">
                -{formattedNumberToPrice(discount)}
              </td>
            </tr>
          )}

          {checkLoginQuery.data?.status_code === "OK" && (
            <>
              {shippingCost > 0 && (
                <tr>
                  <td className="py-1">Shipping</td>

                  <td className="py-1 text-right">
                    {shippingCost > 0
                      ? `${formattedNumberToPrice(shippingCost)}`
                      : "Free"}
                  </td>
                </tr>
              )}
              <tr>
                <td className="py-1">Sales Tax</td>
                <td className="py-1 text-right">
                  {formattedNumberToPrice(tax)}
                </td>
              </tr>
            </>
          )}

          <tr>
            <td colSpan={2} className="pb-3 pt-1">
              <Form {...form}>
                <Collapsible
                  open={openPromo}
                  onOpenChange={onOpenChange}
                  disabled={
                    updateCartConfigMutation.isPending ||
                    simulationCheckoutQuery.isFetching
                  }
                >
                  <div className="flex flex-row items-center justify-between">
                    <div className="flex py-1 font-medium">
                      Promo Code
                      {!!coupon && <div className="ml-1"> {coupon}</div>}
                    </div>

                    {!!coupon == false && (
                      <CollapsibleTrigger asChild>
                        <Button
                          variant="subtle"
                          className="h-fit gap-1 px-2 py-0.5 font-bold"
                          data-button-action="Close Add Promo Code"
                        >
                          {!openPromo ? (
                            <>
                              <Plus
                                className="size-4"
                                data-button-action="Open Add Promo Code"
                              />{" "}
                              <span data-button-action="Open Add Promo Code">
                                Add
                              </span>
                            </>
                          ) : (
                            "Cancel"
                          )}
                        </Button>
                      </CollapsibleTrigger>
                    )}

                    {!!coupon && (
                      <div className="flex items-center gap-1 text-green-700">
                        <div>Applied</div>

                        <Close
                          className="cursor-pointer"
                          onClick={() => {
                            updateCartConfig();
                          }}
                          width={12}
                          height={12}
                          data-button-action="Remove Promo Code"
                        />
                      </div>
                    )}
                  </div>

                  {!!coupon == false && (
                    <CollapsibleContent asChild>
                      <form
                        onSubmit={onSubmit}
                        className="mt-2 flex flex-row gap-2"
                      >
                        <FormField
                          control={form.control}
                          name="promo"
                          disabled={
                            updateCartConfigMutation.isPending ||
                            simulationCheckoutQuery.isFetching
                          }
                          render={({ field }) => (
                            <FormItem className="flex-1">
                              <FormLabel className="sr-only">
                                Promo Code
                              </FormLabel>

                              <FormControl>
                                <Input
                                  required
                                  type="text"
                                  className="h-8"
                                  {...field}
                                />
                              </FormControl>

                              <FormDescription className="sr-only">
                                Enter your promo code here.
                              </FormDescription>

                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <Button
                          className="btn-add-promo-code"
                          size="sm"
                          type="submit"
                          disabled={
                            updateCartConfigMutation.isPending ||
                            simulationCheckoutQuery.isFetching
                          }
                          data-button-action="Add Promo Code"
                        >
                          Add
                        </Button>
                      </form>
                    </CollapsibleContent>
                  )}
                </Collapsible>
              </Form>
            </td>
          </tr>

          <tr className="border-t border-t-wurth-gray-250">
            <td className="py-4 pb-1">Estimated total</td>

            <td className="py-4 pb-1 text-right text-base">
              {formattedNumberToPrice(total)}
            </td>
          </tr>
        </tbody>
      </table>

      {children}
    </div>
  );
};

export default OrderSummary;
