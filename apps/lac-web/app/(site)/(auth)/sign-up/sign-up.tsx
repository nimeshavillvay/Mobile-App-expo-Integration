"use client";

import useCheckEmailMutation from "@/_hooks/user/use-check-email-mutation.hook";
import { isErrorResponse } from "@/_lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@repo/web-ui/components/ui/button";
import { Input } from "@repo/web-ui/components/ui/input";
import { Label } from "@repo/web-ui/components/ui/label";
import { useRouter, useSearchParams } from "next/navigation";
import { useId } from "react";
import { useForm } from "react-hook-form";
import Balancer from "react-wrap-balancer";
import { z } from "zod";

const emailFormSchema = z.object({
  email: z.string().email(),
});

const SignUp = () => {
  const id = useId();
  const emailId = `email-${id}`;

  const searchParams = useSearchParams();
  const email = searchParams.get("email");

  const router = useRouter();

  const emailForm = useForm<z.infer<typeof emailFormSchema>>({
    values: {
      email: email ?? "",
    },
    resolver: zodResolver(emailFormSchema),
  });
  const checkEmailMutation = useCheckEmailMutation();

  const onSubmitEmail = emailForm.handleSubmit((data) => {
    checkEmailMutation.mutate(data.email, {
      onSuccess: (data, email) => {
        if (data.statusCode === "USER_NEW") {
          const newURLSearchParams = new URLSearchParams({
            email,
          });

          router.replace(`/register?${newURLSearchParams.toString()}`);
        }
      },
      onError: async (error, email) => {
        if (error?.response?.status === 400) {
          const errorResponse = await error.response.json();

          // The email already exists
          if (
            isErrorResponse(errorResponse) &&
            errorResponse["status_code"] === "USER_ACTIVE" &&
            errorResponse.message === "Email exists and is valid."
          ) {
            const newURLSearchParams = new URLSearchParams({
              email,
            });

            router.replace(`/sign-in?${newURLSearchParams.toString()}`);
          } else if (
            isErrorResponse(errorResponse) &&
            errorResponse["status_code"] === "USER_DEACTIVE" &&
            errorResponse.message === "User is deactivated."
          ) {
            emailForm.setError("email", {
              type: "custom",
              message: "User is deactivated.",
            });
          }
        }
      },
    });
  });

  return (
    <div className="container">
      <form
        onSubmit={onSubmitEmail}
        className="mx-auto my-20 max-w-[25rem] space-y-4 rounded-lg border border-wurth-gray-250 p-6 shadow-lg"
      >
        <h1 className="text-center font-title text-xl font-medium tracking-[-0.1px] text-wurth-gray-800">
          <Balancer>
            Enter the email address you want to use to create the account
          </Balancer>
        </h1>

        <Label htmlFor={emailId} className="sr-only">
          Email
        </Label>

        <Input
          {...emailForm.register("email")}
          id={emailId}
          type="email"
          autoComplete="email"
          required
          placeholder="someone@example.com"
          className="rounded border-wurth-gray-250 px-3 py-2 text-center text-base shadow-sm"
          disabled={checkEmailMutation.isPending}
        />
        {!!emailForm?.formState?.errors?.email?.message && (
          <p className="text-center text-sm text-wurth-gray-500">
            {emailForm.formState.errors.email.message}
          </p>
        )}
        <Button
          type="submit"
          className="w-full py-2.5 font-bold"
          disabled={checkEmailMutation.isPending}
          data-button-action="Sign Up Check Email Address"
        >
          Continue
        </Button>
      </form>
    </div>
  );
};

export default SignUp;
