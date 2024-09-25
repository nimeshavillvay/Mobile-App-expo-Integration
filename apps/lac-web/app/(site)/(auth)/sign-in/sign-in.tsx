"use client";

import { PasswordInput } from "@/_components/password-input";
import useCheckEmailMutation from "@/_hooks/user/use-check-email-mutation.hook";
import { cn, isErrorResponse } from "@/_lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Alert as AlertIcon } from "@repo/web-ui/components/icons/alert";
import {
  Alert,
  AlertContent,
  AlertDescription,
  AlertTitle,
} from "@repo/web-ui/components/ui/alert";
import { Button, buttonVariants } from "@repo/web-ui/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@repo/web-ui/components/ui/dialog";
import { Input } from "@repo/web-ui/components/ui/input";
import { Label } from "@repo/web-ui/components/ui/label";
import { HTTPError } from "ky";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useId, useState } from "react";
import { useForm } from "react-hook-form";
import Balancer from "react-wrap-balancer";
import { z } from "zod";
import useSignInMutation from "./use-sign-in-mutation.hook";

const emailFormSchema = z.object({
  email: z.string().email(),
});
const loginFormSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

const SignIn = () => {
  const [open, setOpen] = useState(false);
  const id = useId();
  const emailId = `email-${id}`;
  const passwordId = `password-${id}`;

  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const timeout = searchParams.get("timeout");

  const router = useRouter();

  const emailForm = useForm<z.infer<typeof emailFormSchema>>({
    values: {
      email: email ?? "",
    },
    resolver: zodResolver(emailFormSchema),
  });
  const checkEmailMutation = useCheckEmailMutation();

  const createNewUser = (email: string) => {
    const newURLSearchParams = new URLSearchParams({
      email,
    });

    router.replace(`/register?${newURLSearchParams.toString()}`);
  };

  const onSubmitEmail = emailForm.handleSubmit((data) => {
    checkEmailMutation.mutate(data.email, {
      onSuccess: (data, email) => {
        if (data.statusCode === "USER_NEW" && email) {
          setOpen(true);
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

  const loginForm = useForm<z.infer<typeof loginFormSchema>>({
    values: {
      email: email ?? "",
      password: "",
    },
    resolver: zodResolver(loginFormSchema),
  });

  const clearEmail = () => {
    router.replace("/sign-in");
  };

  const signInMutation = useSignInMutation();
  const onSubmitLogin = loginForm.handleSubmit((data) => {
    signInMutation.mutate(data, {
      onError: async (error) => {
        if (error instanceof HTTPError && error.response.status === 401) {
          const errorResponse = await error.response.json();

          if (
            isErrorResponse(errorResponse) &&
            errorResponse.status_code === "FAILED"
          ) {
            loginForm.setError("password", {
              type: "custom",
              message: errorResponse.message,
            });
          }
        } else {
          loginForm.setError("password", {
            type: "custom",
            message: "An unexpected error occurred. Please try again later.",
          });
        }
      },
    });
  });

  if (!email) {
    return (
      <div className="container">
        <div className="mx-auto my-20 max-w-[25rem] rounded-lg border border-wurth-gray-250 p-6 shadow-lg">
          <form className="mx-auto max-w-[25rem] space-y-4">
            {timeout && timeout === "true" && (
              <Alert variant="destructive">
                <AlertIcon className="size-4" />
                <AlertContent>
                  <AlertTitle>Session Timed Out</AlertTitle>
                  <AlertDescription>
                    Your session has timed out. Please sign in again.
                  </AlertDescription>
                </AlertContent>
              </Alert>
            )}
            <h1 className="text-center font-title text-xl font-medium tracking-[-0.1px] text-wurth-gray-800">
              <Balancer>Enter your email address to sign in</Balancer>
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
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button
                  type="submit"
                  className="w-full py-2.5 font-bold"
                  disabled={checkEmailMutation.isPending}
                  onClick={onSubmitEmail}
                  data-button-action="Sign in Check Email Address"
                >
                  Continue
                  <span className="sr-only">Confirm Action</span>
                </Button>
              </DialogTrigger>

              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Confirm Action</DialogTitle>
                  <DialogDescription>
                    We Couldn&apos;t Find Your Email Address. Do you want to
                    check your email and try again?
                  </DialogDescription>
                </DialogHeader>

                <DialogFooter>
                  <Button
                    onClick={() => setOpen(false)}
                    data-button-action="Sign in Check User's Email Correct"
                  >
                    Yes
                  </Button>
                  <Button
                    disabled={checkEmailMutation.isPending}
                    onClick={() => createNewUser(emailForm.getValues("email"))}
                    data-button-action="Sign Create New User"
                  >
                    No
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </form>
          <div className="text-center font-normal">
            Don&apos;t Have an Account?
            <Link
              href={"/sign-up"}
              className={cn(
                buttonVariants({
                  variant: "link",
                }),
                "btnAction btn-register mx-auto inline-block h-fit p-0 px-4 py-2 text-center text-sm font-normal",
              )}
              data-button-action="Sign up"
            >
              Sign up
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="mx-auto my-20 max-w-[25rem] space-y-5">
        <h1 className="text-center font-title text-3xl font-medium tracking-[-0.225px] text-wurth-gray-800">
          Welcome back!
        </h1>

        <div className="flex flex-row items-center justify-between p-2.5">
          <h2 className="text-lg">{email}</h2>

          <Button
            className="w-20 flex-none text-sm font-bold"
            variant="outline"
            onClick={clearEmail}
            data-button-action="Sign in Change Email Address"
          >
            Change
          </Button>
        </div>

        <form onSubmit={onSubmitLogin} className="flex flex-col gap-6 p-2.5">
          <div className="sr-only">
            <Label htmlFor={emailId}>Email</Label>

            <Input
              {...loginForm.register("email")}
              id={emailId}
              type="hidden"
              autoComplete="email"
              required
            />
          </div>

          <div className="flex flex-col gap-3">
            <Label htmlFor={passwordId} className="sr-only">
              Password
            </Label>

            <PasswordInput
              {...loginForm.register("password")}
              id={passwordId}
              autoComplete="password"
              required
              placeholder="Password"
              className="rounded border-wurth-gray-250 px-3 py-2 text-base shadow-sm"
              disabled={signInMutation.isPending}
            />

            {!!loginForm?.formState?.errors?.password?.message && (
              <p className="text-center text-sm text-wurth-gray-500">
                {loginForm.formState.errors.password.message}
              </p>
            )}
          </div>

          <div className="flex flex-col items-center gap-2">
            <Button
              type="submit"
              className="btn-submit-login w-full p-2.5 font-bold"
              disabled={signInMutation.isPending}
              data-button-action="Sign in Submit Credentials"
            >
              Sign in
            </Button>

            <Link
              href={`/forgot-password?${new URLSearchParams({ email }).toString()}`}
              className={cn(
                buttonVariants({
                  variant: "link",
                }),
                "btnAction btn-forgot-password mx-auto inline-block h-fit p-0 text-center text-sm font-normal",
              )}
              data-button-action="Sign in Forgot Password Link"
            >
              Forgot password?
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
