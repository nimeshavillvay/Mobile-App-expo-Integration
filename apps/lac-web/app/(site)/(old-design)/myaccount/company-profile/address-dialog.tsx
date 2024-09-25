import useAddShippingAddressMutation from "@/_hooks/address/use-add-shipping-address-mutation.hook";
import usePhoneNumberFormatter from "@/_hooks/address/use-phone-number-formatter.hook";
import useUpdateBillingAddressMutation from "@/_hooks/address/use-update-billing-address-mutation.hook";
import useUpdateShippingAddressMutation from "@/_hooks/address/use-update-shipping-address-mutation.hook";
import useZipCodeFormatter from "@/_hooks/address/use-zip-code.hook";
import useCounties from "@/_hooks/registration/use-counties.hook";
import useCountries from "@/_hooks/registration/use-countries.hook";
import useStates from "@/_hooks/registration/use-states.hook";
import type {
  Address,
  AddressCheckSuggestions,
  AddressFormData,
} from "@/_lib/types";
import { PHONE_NUMBER_VALIDATION } from "@/_lib/zod-helper";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/old/_components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/old/_components/ui/form";
import { Input } from "@/old/_components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/old/_components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { nanoid } from "nanoid";
import { type Dispatch, type SetStateAction } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import type { AddressCheckSuggestionsWithUuid } from "./types";

type AddressDialogProps = {
  readonly open: boolean;
  readonly setOpenAddressDialog: Dispatch<SetStateAction<boolean>>;
  readonly setOpenAddressSuggestionDialog: Dispatch<SetStateAction<boolean>>;
  readonly setAddress: (address?: AddressFormData) => void;
  readonly setAddressCheckSuggestions: (
    addressCheckSuggestions?: AddressCheckSuggestionsWithUuid,
  ) => void;
  readonly isShippingAddress: boolean;
  readonly isShippingAddressUpdate: boolean;
  readonly address: Address;
};

const AddressDialog = ({
  open,
  setOpenAddressDialog,
  setOpenAddressSuggestionDialog,
  setAddress,
  setAddressCheckSuggestions,
  isShippingAddress,
  isShippingAddressUpdate,
  address,
}: AddressDialogProps) => {
  const queryClient = useQueryClient();

  const addressDataSchema = z.object({
    county: z.string(),
    zip4: z.string().refine((value) => /^\d{0,10}$/.test(value), {
      message: "Please enter a valid ZIP4",
    }),
    company: z.string(),
    addressLineOne: z
      .string()
      .trim()
      .min(1, "Please enter address line one")
      .max(40),
    city: z.string().trim().min(1, "Please enter city").max(40),
    state: z.string().trim().min(1, "Please select a state").max(40),
    zipCode: z
      .string()
      .length(5, "Please enter a valid Zip/Postal code")
      .refine((value) => /^\d+$/.test(value), {
        message: "Please enter a valid ZIP Code",
      }),
    phoneNumber: PHONE_NUMBER_VALIDATION,
    country: z.string().trim().min(1, "Please enter country").max(40),
  });

  type AddressDataSchema = z.infer<typeof addressDataSchema>;

  const form = useForm<AddressDataSchema>({
    resolver: zodResolver(addressDataSchema),
    values: {
      company: address.organization ?? "",
      addressLineOne: address.streetAddress,
      city: address.locality,
      state: address.region,
      zipCode: address.postalCode,
      phoneNumber: address.phoneNumber ?? "",
      zip4: address.zip4,
      country: address.country ?? address.countryName,
      county: address.county ?? "",
    },
  });

  const addShippingAddressMutation = useAddShippingAddressMutation();
  const updateShippingAddressMutation = useUpdateShippingAddressMutation();
  const updateBillingAddressMutation = useUpdateBillingAddressMutation();

  const { formatPhoneNumber } = usePhoneNumberFormatter();
  const { formatZipCode } = useZipCodeFormatter();

  const getAddressSuggestionsWithUuid = (
    data: AddressCheckSuggestions,
  ): AddressCheckSuggestionsWithUuid => {
    const suggestions = data.suggestions.map((suggestion) => {
      return { ...suggestion, uuid: nanoid() };
    });

    const addressSuggestions: AddressCheckSuggestionsWithUuid = {
      checkType: data.checkType,
      message: data.message,
      suggestions,
    };

    return addressSuggestions;
  };

  const onAddressSubmit = (data: AddressDataSchema) => {
    const addressData: AddressFormData = {
      company: data.company,
      addressLineOne: data.addressLineOne,
      city: data.city,
      state: data.state,
      zipCode: data.zipCode,
      phoneNumber: data.phoneNumber,
      zip4: data.zip4,
      country: data.country,
      county: data.county,
    };

    if (isShippingAddress) {
      if (isShippingAddressUpdate) {
        const requestData: AddressFormData = {
          xcAddressId: address.xcAddressId,
          shipTo: address.shipTo,
          ...addressData,
        };

        updateShippingAddressMutation.mutate(requestData, {
          onSuccess: (data) => {
            setOpenAddressDialog(false);
            form.reset();

            if ("checkType" in data) {
              setAddressCheckSuggestions(getAddressSuggestionsWithUuid(data));
              setAddress(requestData);
              setOpenAddressSuggestionDialog(true);
            }
          },
        });
      } else {
        addShippingAddressMutation.mutate(addressData, {
          onSuccess: (data) => {
            setOpenAddressDialog(false);
            form.reset();

            if ("checkType" in data) {
              setAddressCheckSuggestions(getAddressSuggestionsWithUuid(data));
              setAddress(addressData);
              setOpenAddressSuggestionDialog(true);
            }
          },
        });
      }
    } else {
      updateBillingAddressMutation.mutate(addressData, {
        onSuccess: (data) => {
          setOpenAddressDialog(false);
          form.reset();

          if ("checkType" in data) {
            setAddressCheckSuggestions(getAddressSuggestionsWithUuid(data));
            setAddress(addressData);
            setOpenAddressSuggestionDialog(true);
          }
          queryClient.invalidateQueries();
        },
      });
    }
  };

  const selectedCountry = form.watch("country");
  const selectedState = form.watch("state");

  const countriesQuery = useCountries();
  const statesQuery = useStates(selectedCountry);
  const countiesQuery = useCounties(selectedState);

  const handleOpenChange = (open: boolean) => {
    setOpenAddressDialog(open);
    if (!open) {
      form.reset();
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="old-design-text-base max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {isShippingAddress ? "Shipping Address" : "Billing Address"}
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onAddressSubmit)}
            className="space-y-4 p-5"
          >
            <div className="grid grid-cols-1 gap-4">
              <FormField
                control={form.control}
                name="company"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold">Company</FormLabel>
                    <FormDescription className="sr-only">
                      Company
                    </FormDescription>

                    <FormControl>
                      <Input placeholder="Company" type="text" {...field} />
                    </FormControl>
                    <FormDescription className="sr-only">
                      Enter Address CompanyName
                    </FormDescription>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-1 gap-4">
              <FormField
                control={form.control}
                name="addressLineOne"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold">Address Line 1*</FormLabel>
                    <FormDescription className="sr-only">
                      Address Line 1
                    </FormDescription>

                    <FormControl>
                      <Input
                        placeholder="Address Line 1"
                        type="text"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription className="sr-only">
                      Enter Address Line 1
                    </FormDescription>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="country"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold">Country*</FormLabel>
                    <FormDescription className="sr-only">
                      Country
                    </FormDescription>

                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="h-8 rounded-sm py-0 focus:ring-brand-gray-500">
                          <SelectValue placeholder="Country" />
                        </SelectTrigger>
                      </FormControl>

                      <SelectContent>
                        {countriesQuery.data?.map((country) => (
                          <SelectItem key={country?.code} value={country?.code}>
                            {country?.country}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <FormDescription className="sr-only">
                      Enter Country
                    </FormDescription>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="state"
                disabled={!selectedCountry}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold">State*</FormLabel>
                    <FormDescription className="sr-only">State</FormDescription>

                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="h-8 rounded-sm py-0 focus:ring-brand-gray-500">
                          <SelectValue placeholder="State" />
                        </SelectTrigger>
                      </FormControl>

                      <SelectContent>
                        {statesQuery.data?.map((state) => (
                          <SelectItem key={state?.code} value={state?.code}>
                            {state?.country}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <FormDescription className="sr-only">
                      Enter State
                    </FormDescription>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="county"
                disabled={!selectedState}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold">County</FormLabel>
                    <FormDescription className="sr-only">
                      County
                    </FormDescription>

                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="h-8 rounded-sm py-0 focus:ring-brand-gray-500">
                          <SelectValue placeholder="County" />
                        </SelectTrigger>
                      </FormControl>

                      <SelectContent>
                        {countiesQuery.data?.map((county) => (
                          <SelectItem
                            key={county?.county}
                            value={county?.county}
                          >
                            {county?.county}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormDescription className="sr-only">
                      Enter County
                    </FormDescription>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold">City*</FormLabel>
                    <FormDescription className="sr-only">City</FormDescription>

                    <FormControl>
                      <Input placeholder="City" type="text" {...field} />
                    </FormControl>
                    <FormDescription className="sr-only">
                      Enter City
                    </FormDescription>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid grid-cols-2 gap-2">
                <FormField
                  control={form.control}
                  name="zipCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-bold">Zip Code*</FormLabel>
                      <FormDescription className="sr-only">
                        Zip Code
                      </FormDescription>
                      <FormControl>
                        <Input
                          autoComplete="zip-code"
                          placeholder="Zip Code"
                          className="h-8 rounded-sm border-brand-gray-400 font-medium"
                          {...field}
                          onChange={(event) => {
                            const formatted = formatZipCode(event);
                            field.onChange(formatted ?? "");
                          }}
                        />
                      </FormControl>
                      <FormDescription className="sr-only">
                        Enter Zip Code
                      </FormDescription>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="zip4"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-bold">Zip 4</FormLabel>
                      <FormDescription className="sr-only">
                        Zip 4
                      </FormDescription>

                      <FormControl>
                        <Input placeholder="Zip 4" type="text" {...field} />
                      </FormControl>
                      <FormDescription className="sr-only">
                        Enter Zip 4
                      </FormDescription>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold">Phone Number*</FormLabel>
                    <FormDescription className="sr-only">
                      Phone Number
                    </FormDescription>

                    <FormControl>
                      <Input
                        type="tel"
                        autoComplete="phone-number"
                        placeholder="Phone Number"
                        {...field}
                        onChange={(event) => {
                          const formatted = formatPhoneNumber(event);
                          field.onChange(formatted ?? "");
                        }}
                      />
                    </FormControl>
                    <FormDescription className="sr-only">
                      Enter Phone Number
                    </FormDescription>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="text-right">
              <button
                type="submit"
                className="btnAction h-9 rounded-[3px] bg-brand-primary px-4 text-base font-normal uppercase text-white"
                data-button-action={`Company Profile Update ${isShippingAddress ? "Shipping" : "Billing"} Address`}
              >
                Done
              </button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddressDialog;
