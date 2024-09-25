import useAddMultipleToCartMutation from "@/_hooks/cart/use-add-multiple-to-cart-mutation.hook";
import useLaminateProductsInfo from "@/_hooks/laminate/use-suspense-laminate-info.hook";
import useDebouncedState from "@/_hooks/misc/use-debounced-state.hook";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@repo/web-ui/components/ui/button";
import { Form } from "@repo/web-ui/components/ui/form";
import { Skeleton } from "@repo/web-ui/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@repo/web-ui/components/ui/table";
import { useRouter } from "next/navigation";
import { Suspense, useDeferredValue } from "react";
import { useForm } from "react-hook-form";
import {
  laminateAddToCartFormSchema,
  type LaminateAddToCartFormSchema,
} from "./helpers";
import LaminateCardTotalPrice from "./laminate-card-total-price";
import LaminateItem from "./laminate-item";
import LaminatesDialogLoading from "./laminates-dialog-loading";

const LaminateItems = ({
  groupId,
  productIds,
  token,
}: {
  readonly productIds: string[];
  readonly token: string;
  readonly groupId: string;
}) => {
  const router = useRouter();

  const form = useForm<LaminateAddToCartFormSchema>({
    resolver: zodResolver(laminateAddToCartFormSchema),
    defaultValues: { quantity: productIds.map(() => "") },
  });

  const laminates = useLaminateProductsInfo(productIds);
  const formId = `add-laminates-to-cart-${groupId}`;

  const quantities = form.getValues("quantity");
  const delayedQuantities = useDebouncedState(quantities);
  const deferredQuantities = useDeferredValue(delayedQuantities);

  const priceCheckRequest =
    laminates.data !== undefined &&
    deferredQuantities !== undefined &&
    deferredQuantities.length > 0
      ? laminates.data
          .map((laminate, index) => ({
            productId: Number(laminate.productId),
            qty: Number(deferredQuantities[index]),
            sku: laminate.productSku,
          }))
          .filter((item) => !isNaN(item.qty ?? 0) && item.qty !== 0)
      : [];

  const addMultipleToCartMutation = useAddMultipleToCartMutation();

  const handleAddAllItemsToCart = async () => {
    const addToCartRequest = priceCheckRequest
      .map((laminate) => ({
        productId: Number(laminate.productId),
        quantity: Number(laminate.qty),
        sku: laminate.sku,
      }))
      .filter((item) => item.quantity !== undefined);
    addMultipleToCartMutation.mutateAsync(addToCartRequest, {
      onSuccess: () => {
        router.push("/cart");
      },
    });
  };

  if (productIds.length === 0) {
    return "No results found";
  }

  return (
    <Form {...form}>
      <form id={formId}>
        <Suspense fallback={<LaminatesDialogLoading />}>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-40">Size</TableHead>
                <TableHead>Stock/EA</TableHead>
                <TableHead className="text-center">QTY</TableHead>
                <TableHead className="text-right font-medium">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {laminates.data?.map((laminate, index) => (
                <LaminateItem
                  productId={laminate.productId}
                  size={laminate.size}
                  token={token}
                  quantityFieldIndex={index}
                  isExcludedProduct={laminate.isExcludedProduct}
                  key={index}
                />
              ))}
            </TableBody>
          </Table>
        </Suspense>

        <div className="flex items-center gap-4 rounded bg-gray-50 p-4">
          <div className="grow">
            <Suspense fallback={<Skeleton className="h-9 w-40" />}>
              <span className="text-wurth-gray-500">Total:</span>{" "}
              {priceCheckRequest.length > 0 ? (
                <LaminateCardTotalPrice
                  token={token}
                  priceCheckRequest={priceCheckRequest}
                />
              ) : (
                <strong className="text-lg">$0.00</strong>
              )}
            </Suspense>
          </div>
          <Button
            type="button"
            onClick={handleAddAllItemsToCart}
            disabled={priceCheckRequest.length === 0}
            data-button-action="Laminate Finder Add To Cart"
          >
            Add to cart
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default LaminateItems;
