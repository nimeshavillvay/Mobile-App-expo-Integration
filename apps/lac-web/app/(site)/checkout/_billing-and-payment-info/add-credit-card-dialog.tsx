import useExpDateFormatter from "@/_hooks/address/use-exp-date-formatter.hook";
import useUpdateCartConfigMutation from "@/_hooks/cart/use-update-cart-config-mutation.hook";
import type { PaymentMethod } from "@/_lib/types";
import { cn } from "@/_lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "@repo/web-ui/components/icons/plus";
import { Button } from "@repo/web-ui/components/ui/button";
import { Checkbox } from "@repo/web-ui/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@repo/web-ui/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@repo/web-ui/components/ui/form";
import { Input, inputStyles } from "@repo/web-ui/components/ui/input";
import dayjs from "dayjs";
// eslint-disable-next-line no-restricted-imports
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import useAddCreditCardMutation from "./use-add-credit-card-mutation.hook";
import useSuspenseCreditCardSignature from "./use-suspense-credit-card-signature.hook";
import useSuspenseCreditCards from "./use-suspense-credit-cards.hook";

const formSchema = z
  .object({
    name: z.string().min(2),
    token: z.string().min(16, {
      message: "Please enter a valid card number.",
    }),
    brand: z.string().min(1),
    date: z.string().min(5).max(5),
    save: z.boolean(),
  })
  .superRefine((data, ctx) => {
    const addExpiryDateIssue = () => {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Please enter a valid Expiration date",
        path: ["date"],
      });
    };

    const [month, year] = data.date.split("/");

    if (month && year) {
      // Check if the month and year are exactly two characters
      if (month.length !== 2 || year.length !== 2) {
        return addExpiryDateIssue();
      }

      // Check if the month is valid
      if (parseInt(month) < 1 || parseInt(month) > 12) {
        return addExpiryDateIssue();
      }

      // Check if the date is valid
      const date = dayjs()
        .set("month", parseInt(month) - 1)
        .set("year", parseInt(year) + 2000);

      if (!date.isValid() || date.isBefore(dayjs(), "month")) {
        return addExpiryDateIssue();
      }
    } else {
      return addExpiryDateIssue();
    }
  });

type AddCreditCardDialogProps = {
  readonly token: string;
  readonly paymentMethods: PaymentMethod[];
  readonly onCreatedNewCreditCard: (newCardId: string) => void;
};

const AddCreditCardDialog = ({
  token,
  paymentMethods,
  onCreatedNewCreditCard,
}: AddCreditCardDialogProps) => {
  const [open, setOpen] = useState(false);
  const creditCardSignatureQuery = useSuspenseCreditCardSignature(token);
  const creditCartsQuery = useSuspenseCreditCards(token);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      token: "",
      brand: "",
      date: "",
      save: true,
    },
  });

  const { date, formatDate } = useExpDateFormatter();
  const addCreditCardMutation = useAddCreditCardMutation();
  const updateCartConfigMutation = useUpdateCartConfigMutation();

  const onSubmit = form.handleSubmit((values) => {
    addCreditCardMutation.mutate(
      {
        token: values.token,
        expDate: values.date,
        holderName: values.name,
        type: values.brand,
        defaultCard: false,
        save: values.save,
      },
      {
        onSuccess: async (data) => {
          const query = await creditCartsQuery.refetch({
            cancelRefetch: false, // This is set to false because the mutation will invalidate the query by default
          });

          // Select the newly added credit card
          const newCardId = data.card_id;
          const selectedCreditCard = query.data?.find(
            (card) => card.id === newCardId,
          );
          if (selectedCreditCard) {
            await updateCartConfigMutation.mutate({
              cardName: selectedCreditCard.name,
              cardType: selectedCreditCard.type,
              expireDate: selectedCreditCard.expiryDate,
              paymentMethod: paymentMethods.find(
                (paymentMethod) => paymentMethod.isCreditCard,
              )?.code,
              paymentToken: selectedCreditCard.number,
            });
          }

          setOpen(false);

          // Clear form when the dialog is closed
          form.reset();

          onCreatedNewCreditCard(newCardId.toString());
        },
      },
    );
  });

  useEffect(() => {
    // Listener for the token returned from the Snappay iframe
    const eventListener = (event: MessageEvent) => {
      if (typeof event.data === "string" && event.data.includes("token")) {
        const pairs = event.data.split("&");

        pairs.forEach((pair) => {
          const [key, value] = pair.split("=");

          if (key === "token") {
            if (value) {
              form.setValue("token", value, { shouldValidate: true });
            } else {
              form.setValue("token", "", { shouldValidate: true }); // Clear the form state if empty
            }
          } else if (key === "brand") {
            form.setValue("brand", value ?? "");
          }
        });
      }
    };

    window.addEventListener("message", eventListener, false);

    return () => {
      window.removeEventListener("message", eventListener, false);
    };
  }, [form]);

  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        setOpen(open);
        formatDate("");

        // Refetch the credit card signature when the dialog is opened to get a new requestId
        if (open) {
          creditCardSignatureQuery.refetch();
        } else {
          // Clear form when the dialog is closed
          form.reset();
        }
      }}
    >
      <DialogTrigger asChild>
        <Button variant="outline" className="max-w-fit font-bold shadow-md">
          <Plus
            width={16}
            height={16}
            data-button-action="Checkout Open Add New Credit Card Dialog"
          />

          <span data-button-action="Checkout Open Add New Credit Card Dialog">
            Add new card
          </span>
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-[27.75rem]">
        <DialogHeader>
          <DialogTitle>Add Credit Card</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={onSubmit} className="flex flex-col gap-4">
            <FormField
              control={form.control}
              name="name"
              disabled={addCreditCardMutation.isPending}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name on card</FormLabel>
                  <FormControl>
                    <Input placeholder="Name" {...field} />
                  </FormControl>
                  <FormDescription className="sr-only">
                    This is the name of the holder of the card.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="token"
              disabled={addCreditCardMutation.isPending}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Card number</FormLabel>
                  <FormControl>
                    {!creditCardSignatureQuery.isFetching ? (
                      <>
                        <iframe
                          title="Snappay credit card iframe"
                          src={`${process.env.NEXT_PUBLIC_WURTH_LAC_SNAPPAY_URL}/Interop/InteropRequest?reqno=${creditCardSignatureQuery.data.requestId}`}
                          className={cn(
                            inputStyles(),
                            "block w-full px-0 py-0 [&_input]:!p-0",
                          )}
                        />

                        <Input type="hidden" id="token" {...field} />
                      </>
                    ) : (
                      <Input type="text" disabled {...field} />
                    )}
                  </FormControl>
                  <FormDescription className="sr-only">
                    The card number.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="brand"
              disabled={addCreditCardMutation.isPending}
              render={({ field }) => (
                <FormItem className="sr-only">
                  <FormLabel>Name on card</FormLabel>
                  <FormControl>
                    <Input type="hidden" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is the name of the holder of the card.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="date"
              disabled={addCreditCardMutation.isPending}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Expiration date</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="MM / YY"
                      {...field}
                      value={date}
                      onChange={(event) => {
                        const formatted = formatDate(event.target.value);
                        field.onChange(formatted ?? "");
                      }}
                    />
                  </FormControl>
                  <FormDescription className="sr-only">
                    The expiration data of the card.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="save"
              disabled={addCreditCardMutation.isPending}
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-2 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      className="overflow-hidden rounded-sm"
                    />
                  </FormControl>

                  <FormLabel>Save for future</FormLabel>

                  <FormDescription className="sr-only">
                    Save the card for future purchases
                  </FormDescription>
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="self-end"
              disabled={addCreditCardMutation.isPending}
              data-button-action="Checkout Submit Add New Credit Card"
            >
              Submit
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddCreditCardDialog;
