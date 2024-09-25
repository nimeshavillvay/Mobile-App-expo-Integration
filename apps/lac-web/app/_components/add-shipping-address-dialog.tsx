import FullAddress from "@/_components/full-address";
import useAddShippingAddressMutation from "@/_hooks/address/use-add-shipping-address-mutation.hook";
import usePhoneNumberFormatter from "@/_hooks/address/use-phone-number-formatter.hook";
import useZipCodeFormatter from "@/_hooks/address/use-zip-code.hook";
import useCounties from "@/_hooks/registration/use-counties.hook";
import useStates from "@/_hooks/registration/use-states.hook";
import type { Address, Country } from "@/_lib/types";
import { cn } from "@/_lib/utils";
import { PHONE_NUMBER_VALIDATION } from "@/_lib/zod-helper";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle } from "@repo/web-ui/components/icons/check-circle";
import { Button } from "@repo/web-ui/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
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
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  address: z.string().min(1),
  city: z.string().min(1),
  country: z.string().min(1),
  state: z.string().min(1),
  county: z.string().optional(),
  postCode: z.string().min(5),
  zip: z.string().optional(),
  phoneNumber: PHONE_NUMBER_VALIDATION,
});

type AddShippingAddressDialogProps = {
  readonly open: boolean;
  readonly closeDialog: () => void;
  readonly countries: Country[];
};

const AddShippingAddressDialog = ({
  open,
  closeDialog,
  countries,
}: AddShippingAddressDialogProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      address: "",
      city: "",
      country: countries?.[0]?.code,
      state: "",
      county: "",
      postCode: "",
      zip: "",
      phoneNumber: "",
    },
  });

  const selectedCountry = form.watch("country");
  const selectedState = form.watch("state");

  const statesQuery = useStates(selectedCountry);
  const countiesQuery = useCounties(selectedState);

  const addShippingAddressMutation = useAddShippingAddressMutation();

  const [selectedSuggestionId, setSelectedSuggestionId] = useState("");
  const [addressSuggestions, setAddressSuggestions] = useState<Address[]>([]);

  const { phoneNumber, formatPhoneNumber } = usePhoneNumberFormatter();
  const { zipCode, formatZipCode } = useZipCodeFormatter();

  const selectedSuggestion = addressSuggestions.find(
    (address) => address.xcAddressId === selectedSuggestionId,
  );

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    addShippingAddressMutation.mutate(
      {
        country: values.country,
        county: values.county,
        city: values.city,
        company: "",
        phoneNumber: values.phoneNumber,
        state: values.state,
        addressLineOne: values.address,
        zipCode: values.postCode,
        zip4: values.zip,
      },
      {
        onSuccess: (data) => {
          if ("xcAddressId" in data) {
            form.reset();
            closeDialog();
          } else if ("suggestions" in data) {
            setAddressSuggestions(
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
    if (selectedSuggestion) {
      addShippingAddressMutation.mutate(
        {
          country: selectedSuggestion.countryName,
          county: selectedSuggestion.county ?? "",
          city: selectedSuggestion.locality,
          company: "",
          phoneNumber: form.getValues("phoneNumber"),
          state: selectedSuggestion.region,
          addressLineOne: selectedSuggestion.streetAddress,
          zipCode: selectedSuggestion.postalCode,
          zip4: selectedSuggestion.zip4 ?? "",
          skipAddressCheck: true, // Force saving the suggestion
        },
        {
          onSuccess: (data) => {
            if ("xcAddressId" in data) {
              form.reset();
              setAddressSuggestions([]);
              closeDialog();
            } else if ("suggestions" in data) {
              // This is to handle address conflicts in SAP after the UPS check
              setAddressSuggestions(
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

  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        if (!open) {
          form.reset();
          closeDialog();
        }
      }}
    >
      <DialogContent className="flex max-h-dvh max-w-[27.75rem] flex-col">
        <DialogHeader>
          <DialogTitle>Add New Shipping Address</DialogTitle>
        </DialogHeader>

        {addressSuggestions.length === 0 ? (
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="grid-col-6 grid gap-4"
            >
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem className="col-span-6">
                    <FormLabel>Street address</FormLabel>
                    <FormControl>
                      <Input placeholder="Address" {...field} />
                    </FormControl>
                    <FormDescription className="sr-only">
                      Enter your street name
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem className="col-span-6">
                    <FormLabel>City</FormLabel>
                    <FormControl>
                      <Input placeholder="City" {...field} />
                    </FormControl>
                    <FormDescription className="sr-only">
                      Enter your city
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="country"
                render={({ field }) => (
                  <FormItem className="col-span-6">
                    <FormLabel>Country</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Country" />
                        </SelectTrigger>
                      </FormControl>

                      <SelectContent>
                        {countries?.map((country) => (
                          <SelectItem key={country.code} value={country.code}>
                            {country.country}
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

              <FormField
                control={form.control}
                name="state"
                render={({ field }) => (
                  <FormItem className="col-span-3">
                    <FormLabel>State</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      disabled={!selectedCountry}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="State" />
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
                      Select your country
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
                      disabled={!selectedState}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="County" />
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
                      Select your country
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="postCode"
                render={({ field }) => (
                  <FormItem className="col-span-4">
                    <FormLabel>Zip/Post code</FormLabel>
                    <FormControl>
                      <Input
                        autoComplete="zip-code"
                        {...field}
                        value={zipCode}
                        onChange={(event) => {
                          const formatted = formatZipCode(event);
                          field.onChange(formatted ?? "");
                        }}
                      />
                    </FormControl>
                    <FormDescription className="sr-only">
                      Enter your postal code
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="zip"
                render={({ field }) => (
                  <FormItem className="col-span-2">
                    <FormLabel>Zip4 (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="Zip4" {...field} />
                    </FormControl>
                    <FormDescription className="sr-only">
                      Enter your Zip4
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem className="col-span-6">
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input
                        required
                        type="tel"
                        autoComplete="phone-number"
                        {...field}
                        placeholder="Phone Number"
                        value={phoneNumber}
                        onChange={(event) => {
                          const formatted = formatPhoneNumber(event);
                          field.onChange(formatted ?? "");
                        }}
                      />
                    </FormControl>
                    <FormDescription className="sr-only">
                      Enter your phone number
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <DialogFooter className="col-span-6">
                <Button
                  variant="outline"
                  type="button"
                  className="font-bold shadow-md"
                  onClick={() => {
                    form.reset();
                    closeDialog();
                  }}
                  data-button-action="Back to Change Shipping Address Dialog"
                >
                  Back
                </Button>

                <Button
                  type="submit"
                  className="font-bold shadow-md"
                  data-button-action="Submit New Shipping Address"
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
              {addressSuggestions.map((address) => (
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
                    disabled={addShippingAddressMutation.isPending}
                  >
                    <CheckCircle
                      className={cn(
                        "size-5 shrink-0 stroke-wurth-gray-150",
                        selectedSuggestionId === address.xcAddressId &&
                          "stroke-wurth-gray-800",
                      )}
                      data-button-action="Select New Shipping Address from Conflicts"
                    />

                    <span
                      className="flex-1 text-wrap text-left text-base font-medium text-wurth-gray-800"
                      data-button-action="Select New Shipping Address from Conflicts"
                    >
                      <FullAddress address={address} />
                    </span>
                  </Button>
                </li>
              ))}
            </ul>

            <DialogFooter className="col-span-6">
              <Button
                variant="outline"
                type="button"
                className="font-bold shadow-md"
                onClick={() => {
                  setAddressSuggestions([]);
                }}
                data-button-action="Edit New Shipping Address"
              >
                Back
              </Button>

              <Button
                type="button"
                className="font-bold shadow-md"
                onClick={submitSuggestion}
                disabled={
                  addShippingAddressMutation.isPending || !selectedSuggestionId
                }
                data-button-action="Submit Selected New Shipping Address"
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

export default AddShippingAddressDialog;
