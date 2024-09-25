import { useCheckRecaptcha } from "@/_context/recaptcha-ref";
import usePhoneNumberFormatter from "@/_hooks/address/use-phone-number-formatter.hook";
import type { PasswordPolicies } from "@/_lib/types";
import { cn, isErrorResponse } from "@/_lib/utils";
import { PHONE_NUMBER_VALIDATION } from "@/_lib/zod-helper";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle } from "@repo/web-ui/components/icons/check-circle";
import { Button } from "@repo/web-ui/components/ui/button";
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
import { useToast } from "@repo/web-ui/components/ui/toast";
import { useSearchParams } from "next/navigation";
import { useId, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { StepContainer, StepContainerOpen } from "./step-container";
import useRegisterExistingUserMutation from "./use-register-existing-user-mutation.hook";

type Step = "account" | "personal";

const currentUserSchema = z.object({
  soldToAccount: z.string(),
  invoiceNo: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  password: z.string().min(8),
  confirmPassword: z.string().min(8),
  phoneNumber: z.string(),
});

type CurrentUserFlowProps = {
  readonly passwordPolicies: PasswordPolicies;
};

const CurrentUserFlow = ({ passwordPolicies }: CurrentUserFlowProps) => {
  const id = useId();
  const formId = `form-${id}`;
  const checkRecaptcha = useCheckRecaptcha();
  const { toast } = useToast();

  const searchParams = useSearchParams();
  const email = searchParams.get("email");

  const [step, setStep] = useState<Step>("account");

  const { phoneNumber, formatPhoneNumber } = usePhoneNumberFormatter();

  const refinedCurrentUserSchema = useMemo(
    () =>
      currentUserSchema
        .extend({
          password: z.string().min(passwordPolicies.minimumLength),
          phoneNumber: PHONE_NUMBER_VALIDATION,
        })
        .superRefine(({ password, confirmPassword }, context) => {
          const containsAlphabet = (ch: string) => /[a-z,A-Z]/.test(ch);
          const containsNumber = (ch: string) => /[0-9]/.test(ch);

          let countOfAlphabets = 0;
          let countOfNumbers = 0;

          for (const ch of password) {
            if (containsAlphabet(ch)) {
              countOfAlphabets++;
            } else if (containsNumber(ch)) {
              countOfNumbers++;
            }
          }

          // TODO Add better messaging
          if (
            countOfAlphabets < passwordPolicies.minimumAlphabets ||
            countOfNumbers < passwordPolicies.minimumNumbers
          ) {
            context.addIssue({
              path: ["password"],
              code: "custom",
              message: "Password does not meet complexity requirements",
            });
          }

          if (confirmPassword !== password) {
            context.addIssue({
              path: ["confirmPassword"],
              code: "custom",
              message: "The passwords did not match",
            });
          }
        }),
    [passwordPolicies],
  );

  const form = useForm<z.infer<typeof refinedCurrentUserSchema>>({
    resolver: zodResolver(refinedCurrentUserSchema),
    values: {
      soldToAccount: "",
      invoiceNo: "",
      firstName: "",
      lastName: "",
      password: "",
      confirmPassword: "",
      phoneNumber: "",
    },
  });
  const soldToAccount = form.watch("soldToAccount");
  const invoiceNo = form.watch("invoiceNo");

  const onAccountDetailsSubmit = () => {
    setStep("personal");
  };

  const createUserMutation = useRegisterExistingUserMutation();
  const onSubmit = form.handleSubmit(async (data) => {
    try {
      await checkRecaptcha();
    } catch {
      return toast({
        variant: "destructive",
        title: "Registration failed.",
      });
    }

    await createUserMutation.mutateAsync(
      {
        accountNo: data.soldToAccount,
        documentId: data.invoiceNo,
        firstName: data.firstName,
        lastName: data.lastName,
        email: email ?? "",
        password: data.password,
        phoneNumber: data.phoneNumber,
      },
      {
        onError: async (error) => {
          if (error.response) {
            const response = await error.response.json();

            if (
              isErrorResponse(response) &&
              response.message ===
                "Sorry, the account/document combination is invalid."
            ) {
              // Set errors on fields
              form.setError("soldToAccount", {
                message: response.message,
              });
              form.setError("invoiceNo", {
                message: response.message,
              });

              // Move back a step
              setStep("account");
            }
          }
        },
      },
    );
  });

  return (
    <Form {...form}>
      <div
        className={cn(
          "flex flex-col gap-5 rounded-lg border border-wurth-gray-250 p-6 shadow-lg",
          step !== "account" && "hidden",
        )}
      >
        <div className="flex flex-row items-start justify-between">
          <h3 className="text-base font-semibold text-wurth-gray-800">
            Account details
          </h3>

          <div className="text-sm text-wurth-gray-500">1 of 2 steps</div>
        </div>

        <p className="text-sm leading-6 text-wurth-gray-800">
          To set up your online account with customer pricing,{" "}
          <span className="font-semibold">
            please provide a recent invoice, delivery, or order number (within
            the last 12 months)
          </span>
          . This will help us validate your account information. Please complete
          the entire form before submitting.
        </p>

        <div className="flex flex-col gap-8 md:grid md:grid-cols-2">
          <FormField
            control={form.control}
            name="soldToAccount"
            disabled={createUserMutation.isPending}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Sold-to account</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    required
                    placeholder="XXXXXXXX"
                    form={formId}
                    {...field}
                    className={cn(
                      !!form?.formState?.errors?.soldToAccount?.message &&
                        "border-red-500",
                    )}
                  />
                </FormControl>
                <FormDescription>
                  Enter your Wurth Louis And Company Account Number
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="invoiceNo"
            disabled={createUserMutation.isPending}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Invoice, delivery or order number</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    required
                    placeholder="XXXXXXXX"
                    form={formId}
                    {...field}
                    className={cn(
                      !!form?.formState?.errors?.invoiceNo?.message &&
                        "border-red-500",
                    )}
                  />
                </FormControl>
                <FormDescription>
                  Recent invoice, delivery or order number from within the last
                  12 months
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <p className="text-sm text-wurth-gray-800">
          By continuing, you agree to the{" "}
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="/privacy-policy"
            className="btnAction font-semibold underline"
            data-btn-action="Current User Flow Privacy Notice"
          >
            Privacy Notice
          </a>{" "}
          and{" "}
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="/terms-of-sale"
            className="btnAction font-semibold underline"
            data-btn-action="Current User Flow Terms and Conditions"
          >
            Terms and Conditions
          </a>{" "}
          and you consent to the collection and processing of your personal data
          for purposes of completing transactions.
        </p>

        <div className="flex flex-row-reverse items-center justify-between pt-1">
          <Button
            type="button"
            onClick={onAccountDetailsSubmit}
            className="h-fit min-w-[7.5rem] py-2.5 font-bold shadow-md"
            disabled={!soldToAccount || !invoiceNo}
            data-button-action="Register Current User Flow"
          >
            Continue
          </Button>

          <div className="text-xs text-wurth-gray-500">
            *All fields are required
          </div>
        </div>
      </div>

      {step === "personal" && (
        <section className="flex flex-col gap-4 rounded-lg border border-wurth-gray-250 p-6 shadow-lg">
          <div className="flex flex-row items-center gap-3">
            <CheckCircle className="size-5 stroke-green-700" />

            <h3 className="flex-1 text-base font-semibold text-wurth-gray-800">
              Account details
            </h3>

            <Button
              variant="subtle"
              className="font-bold"
              onClick={() => setStep("account")}
              disabled={createUserMutation.isPending}
              data-button-action="Register Current User Flow Update"
            >
              Edit
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-8">
            <div className="space-y-1">
              <h4 className="text-sm font-semibold text-black">
                WLC Account Number
              </h4>

              <div className="text-base text-wurth-gray-800">
                {soldToAccount}
              </div>
            </div>

            <div className="space-y-1">
              <h4 className="text-sm font-semibold text-black">Order Number</h4>

              <div className="text-base text-wurth-gray-800">{invoiceNo}</div>
            </div>
          </div>
        </section>
      )}

      <StepContainer state="open" title="Personal details">
        <StepContainerOpen
          steps={{
            current: 2,
            total: 2,
          }}
          allFieldsRequired
          submitBtnText="Create account"
          onSubmit={onSubmit}
          disableSubmit={createUserMutation.isPending}
          className={cn(step !== "personal" && "hidden")}
          id={formId}
        >
          <div className="flex flex-col gap-5 md:grid md:grid-cols-2">
            <FormField
              control={form.control}
              name="soldToAccount"
              disabled={createUserMutation.isPending}
              render={({ field }) => (
                <FormItem className="sr-only">
                  <FormLabel>Sold-to account</FormLabel>
                  <FormControl>
                    <Input type="hidden" required {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="invoiceNo"
              disabled={createUserMutation.isPending}
              render={({ field }) => (
                <FormItem className="sr-only">
                  <FormLabel>Invoice, delivery or order number</FormLabel>
                  <FormControl>
                    <Input type="hidden" required {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="firstName"
              disabled={createUserMutation.isPending}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First name</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      autoComplete="given-name"
                      required
                      {...field}
                    />
                  </FormControl>
                  <FormDescription className="sr-only">
                    This is your first name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="lastName"
              disabled={createUserMutation.isPending}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last name</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      autoComplete="family-name"
                      required
                      {...field}
                    />
                  </FormControl>
                  <FormDescription className="sr-only">
                    This is your last name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phoneNumber"
              disabled={createUserMutation.isPending}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input
                      required
                      type="tel"
                      autoComplete="phone-number"
                      {...field}
                      value={phoneNumber}
                      onChange={(event) => {
                        const formatted = formatPhoneNumber(event);
                        field.onChange(formatted ?? "");
                      }}
                    />
                  </FormControl>
                  <FormDescription className="sr-only">
                    This is your phone number.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              disabled={createUserMutation.isPending}
              render={({ field }) => (
                <FormItem className="md:row-start-4">
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      autoComplete="password"
                      required
                      {...field}
                    />
                  </FormControl>
                  <FormDescription className="sr-only">
                    This is your password.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmPassword"
              disabled={createUserMutation.isPending}
              render={({ field }) => (
                <FormItem className="md:row-start-4">
                  <FormLabel>Confirm password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      autoComplete="password"
                      required
                      {...field}
                    />
                  </FormControl>
                  <FormDescription className="sr-only">
                    Type the same password here to confirm it.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </StepContainerOpen>
      </StepContainer>
    </Form>
  );
};

export default CurrentUserFlow;
