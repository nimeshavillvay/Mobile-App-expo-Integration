import FullAddress from "@/_components/full-address";
import ZipCodeInputField from "@/_components/zip-code-input-field";
import useSuspenseBillingAddress from "@/_hooks/address/use-suspense-billing-address.hook";
import useUpdateBillingAddressMutation from "@/_hooks/address/use-update-billing-address-mutation.hook";
import useCounties from "@/_hooks/registration/use-counties.hook";
import useCountries from "@/_hooks/registration/use-countries.hook";
import useStates from "@/_hooks/registration/use-states.hook";
import type { Address } from "@/_lib/types";
import { cn } from "@/_lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle } from "@repo/web-ui/components/icons/check-circle";
import { Button } from "@repo/web-ui/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
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
import { Input } from "@repo/web-ui/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@repo/web-ui/components/ui/select";
import { nanoid } from "nanoid";
import { useState, type ComponentProps } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  streetAddress: z.string(),
  city: z.string(),
  country: z.string(),
  state: z.string(),
  county: z.string().optional(),
  postalCode: z.string(),
  zip: z.string().optional(),
});
type FormSchema = z.infer<typeof formSchema>;

type EditBillingAddressDialogProps = {
  readonly token: string;
};

const EditBillingAddressDialog = ({ token }: EditBillingAddressDialogProps) => {
  const [open, setOpen] = useState(false);
  const [suggestions, setSuggestions] = useState<Address[]>([]);
  const [selectedSuggestionId, setSelectedSuggestionId] = useState("");

  const billingAddressQuery = useSuspenseBillingAddress(token);

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    values: {
      streetAddress: billingAddressQuery.data.streetAddress,
      city: billingAddressQuery.data.locality,
      country: billingAddressQuery.data.countryName,
      state: billingAddressQuery.data.region,
      county: billingAddressQuery.data.county ?? "",
      postalCode: billingAddressQuery.data.postalCode,
      zip: billingAddressQuery.data.zip4 ?? "",
    },
  });

  const country = form.watch("country");
  const state = form.watch("state");

  const updateBillingAddressMutation = useUpdateBillingAddressMutation();

  const closeDialog = () => {
    setOpen(false);

    // Reset the form when the dialog is closed
    form.reset();
  };

  const onSubmit = (values: FormSchema) => {
    updateBillingAddressMutation.mutate(
      {
        addressLineOne: values.streetAddress,
        city: values.city,
        country: values.country,
        state: values.state,
        county: values.county,
        zipCode: values.postalCode,
        zip4: values.zip,
      },
      {
        onSuccess: (data) => {
          if ("xcAddressId" in data) {
            closeDialog();
          } else if ("suggestions" in data) {
            setSuggestions(
              data.suggestions.map((address) => ({
                ...address,
                xcAddressId: nanoid(), // Give a temporary ID to each suggestion
              })),
            );
          }
        },
      },
    );
  };

  const submitSuggestion = () => {
    const selectedSuggestion = suggestions.find(
      (suggestion) => selectedSuggestionId === suggestion.xcAddressId,
    );

    if (selectedSuggestion) {
      updateBillingAddressMutation.mutate(
        {
          addressLineOne: selectedSuggestion.streetAddress,
          city: selectedSuggestion.locality,
          country: selectedSuggestion.countryName,
          state: selectedSuggestion.region,
          county: selectedSuggestion.county ?? "",
          zipCode: selectedSuggestion.postalCode,
          zip4: selectedSuggestion.zip4,
          skipAddressCheck: true, // Skip the suggestions and force save
        },
        {
          onSuccess: (data) => {
            if ("xcAddressId" in data) {
              // Reset the form and clear the suggestions
              form.reset();
              setSuggestions([]);
              closeDialog();
            } else if ("suggestions" in data) {
              // This is to handle address conflicts in SAP after the UPS check
              setSuggestions(
                data.suggestions.map((address) => ({
                  ...address,
                  xcAddressId: nanoid(), // Give a temporary ID to each suggestion
                })),
              );
            }
          },
        },
      );
    }
  };

  const countriesQuery = useCountries();
  const statesQuery = useStates(country);
  const countiesQuery = useCounties(state);

  const onOpenChange: ComponentProps<typeof Dialog>["onOpenChange"] = (
    open: boolean,
  ) => {
    setOpen(open);

    if (!open) {
      // Reset the form when the dialog is closed
      form.reset();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button variant="outline" className="max-w-fit font-bold shadow-md">
          Edit Address
        </Button>
      </DialogTrigger>

      <DialogContent className="flex max-h-dvh max-w-[37.5rem] flex-col">
        <DialogHeader>
          <DialogTitle>Edit Billing Address</DialogTitle>
        </DialogHeader>

        {suggestions.length === 0 ? (
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="grid grid-cols-3 gap-5 md:grid-cols-6"
            >
              <FormField
                control={form.control}
                name="streetAddress"
                disabled={updateBillingAddressMutation.isPending}
                render={({ field }) => (
                  <FormItem className="col-span-3 md:col-span-6">
                    <FormLabel>Street address</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        required
                        disabled={updateBillingAddressMutation.isPending}
                        {...field}
                      />
                    </FormControl>
                    <FormDescription className="sr-only">
                      This is the street address of your billing address.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="city"
                disabled={updateBillingAddressMutation.isPending}
                render={({ field }) => (
                  <FormItem className="col-span-3 md:col-span-6">
                    <FormLabel>City</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        required
                        disabled={updateBillingAddressMutation.isPending}
                        {...field}
                      />
                    </FormControl>
                    <FormDescription className="sr-only">
                      This is the city of your billing address.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="country"
                render={({ field }) => (
                  <FormItem className="col-span-3">
                    <FormLabel>Country</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      disabled={updateBillingAddressMutation.isPending}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {countriesQuery.data?.map((country) => (
                          <SelectItem key={country.code} value={country.code}>
                            {country.country}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormDescription className="sr-only">
                      This is the country of your billing address.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="state"
                render={({ field }) => (
                  <FormItem className="col-span-3">
                    <FormLabel>State</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      disabled={
                        !country || updateBillingAddressMutation.isPending
                      }
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {statesQuery.data?.map((state) => (
                          <SelectItem key={state.code} value={state.code}>
                            {state.country}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormDescription className="sr-only">
                      This is the state of your billing address.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="county"
                render={({ field }) => (
                  <FormItem className="col-span-3">
                    <FormLabel>County (Optional)</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      disabled={
                        !state || updateBillingAddressMutation.isPending
                      }
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {countiesQuery.data?.map(({ county }) => (
                          <SelectItem key={county} value={county}>
                            {county}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormDescription className="sr-only">
                      This is the county of your billing address.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="postalCode"
                disabled={updateBillingAddressMutation.isPending}
                render={({ field }) => (
                  <FormItem className="col-span-2">
                    <FormLabel>Zip/Post code</FormLabel>
                    <FormControl>
                      <ZipCodeInputField
                        {...field}
                        required
                        placeholder="Zip/Post code"
                        disabled={updateBillingAddressMutation.isPending}
                      />
                    </FormControl>
                    <FormDescription className="sr-only">
                      This is the Zip/Post code of your billing address.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="zip"
                disabled={updateBillingAddressMutation.isPending}
                render={({ field }) => (
                  <FormItem className="col-span-1">
                    <FormLabel className="overflow-hidden text-ellipsis text-nowrap">
                      Zip4 (Optional)
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        disabled={updateBillingAddressMutation.isPending}
                        {...field}
                      />
                    </FormControl>
                    <FormDescription className="sr-only">
                      This is the Zip4 of your billing address.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <DialogFooter className="col-span-3 md:col-span-6">
                <Button
                  variant="outline"
                  type="button"
                  className="font-bold shadow-md"
                  disabled={updateBillingAddressMutation.isPending}
                  onClick={closeDialog}
                >
                  Back
                </Button>

                <Button
                  type="submit"
                  className="font-bold shadow-md"
                  disabled={updateBillingAddressMutation.isPending}
                >
                  Submit
                </Button>
              </DialogFooter>
            </form>
          </Form>
        ) : (
          <div className="flex min-h-0 flex-1 flex-col gap-4">
            <div className="space-y-1">
              <h3 className="text-base font-semibold text-wurth-gray-800">
                Address Conflict
              </h3>

              <p className="text-sm text-wurth-gray-800">
                We found a few possible versions of your address. Please select
                the most accurate one to ensure correct shipping and taxes. If
                none match, please update your address.
              </p>
            </div>

            <ul className="flex flex-1 flex-col gap-2 overflow-y-auto">
              {suggestions.map((address) => (
                <li key={address.xcAddressId}>
                  <Button
                    variant="outline"
                    className={cn(
                      "flex h-fit w-full flex-row justify-start rounded-lg border-2 border-wurth-gray-150 p-4",
                      selectedSuggestionId === address.xcAddressId &&
                        "border-wurth-gray-800",
                    )}
                    onClick={() => {
                      if (address.xcAddressId) {
                        setSelectedSuggestionId(address.xcAddressId);
                      }
                    }}
                    disabled={updateBillingAddressMutation.isPending}
                  >
                    <CheckCircle
                      className={cn(
                        "size-5 shrink-0 stroke-wurth-gray-150",
                        selectedSuggestionId === address.xcAddressId &&
                          "stroke-wurth-gray-800",
                      )}
                    />

                    <div className="flex-1 text-wrap text-left text-base font-medium text-wurth-gray-800">
                      <FullAddress address={address} />
                    </div>
                  </Button>
                </li>
              ))}
            </ul>

            <DialogFooter className="col-span-6">
              <Button
                variant="outline"
                type="button"
                className="font-bold shadow-md"
                disabled={updateBillingAddressMutation.isPending}
                onClick={() => {
                  setSuggestions([]);
                }}
              >
                Back
              </Button>

              <Button
                type="button"
                className="font-bold shadow-md"
                disabled={
                  updateBillingAddressMutation.isPending ||
                  !selectedSuggestionId
                }
                onClick={submitSuggestion}
              >
                Submit
              </Button>
            </DialogFooter>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default EditBillingAddressDialog;
