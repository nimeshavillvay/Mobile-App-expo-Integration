"use client";

import { useCheckRecaptcha } from "@/_context/recaptcha-ref";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@repo/web-ui/components/ui/button";
import { Input } from "@repo/web-ui/components/ui/input";
import { Label } from "@repo/web-ui/components/ui/label";
import { useToast } from "@repo/web-ui/components/ui/toast";
import { useId } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import useResetPasswordMutation from "./use-reset-password-mutation.hook";

const emailFormSchema = z.object({
  email: z.string().email(),
});

type ForgotPasswordFormProps = {
  readonly email: string;
};

const ForgotPasswordForm = ({ email }: ForgotPasswordFormProps) => {
  const id = useId();
  const emailId = `email-${id}`;
  const checkRecaptcha = useCheckRecaptcha();
  const { toast } = useToast();

  const emailForm = useForm<z.infer<typeof emailFormSchema>>({
    values: {
      email,
    },
    resolver: zodResolver(emailFormSchema),
  });

  const resetPasswordMutation = useResetPasswordMutation();

  const onSubmit = emailForm.handleSubmit(async (data) => {
    try {
      await checkRecaptcha();
    } catch {
      return toast({
        variant: "destructive",
        title: "Failed to send email.",
      });
    }

    await resetPasswordMutation.mutateAsync(data.email);
  });

  return (
    <form className="container" onSubmit={onSubmit}>
      <div className="mx-auto my-20 max-w-[25rem] space-y-5">
        <h1 className="text-center font-title text-3xl font-medium tracking-[-0.225px] text-wurth-gray-800">
          Forgot Password
        </h1>

        <p className="text-center text-sm text-wurth-gray-500">
          Please enter your email address to request a password reset
        </p>

        <div className="flex flex-col gap-6 p-2.5">
          <div className="flex flex-col gap-3">
            <Label htmlFor={emailId} className="sr-only">
              Email
            </Label>

            <Input
              {...emailForm.register("email")}
              id={emailId}
              type="email"
              required
              className="rounded border-wurth-gray-250 px-3 py-2 text-base shadow-sm"
              disabled={resetPasswordMutation.isPending}
            />

            {!!emailForm?.formState?.errors?.email?.message && (
              <p className="text-center text-sm text-wurth-gray-500">
                {emailForm.formState.errors.email.message}
              </p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full p-2.5 font-bold"
            disabled={resetPasswordMutation.isPending}
            data-button-action="Reset Password Send Email Request"
          >
            Reset Password
          </Button>
        </div>
      </div>
    </form>
  );
};

export default ForgotPasswordForm;
