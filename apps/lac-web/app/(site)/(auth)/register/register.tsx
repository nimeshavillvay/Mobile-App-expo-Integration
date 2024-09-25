"use client";

import { RecaptchaRefProvider } from "@/_context/recaptcha-ref";
import type { Country, PasswordPolicies } from "@/_lib/types";
import { cn } from "@/_lib/utils";
import { CheckCircle } from "@repo/web-ui/components/icons/check-circle";
import { CheckCircleFilled } from "@repo/web-ui/components/icons/check-circle-filled";
import { Button, buttonVariants } from "@repo/web-ui/components/ui/button";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import Balancer from "react-wrap-balancer";
import CurrentUserFlow from "./current-user-flow";
import NewUserFlow from "./new-user-flow";
import type { Industry } from "./types";

const IS_CURRENT_USER = ["Yes", "No"] as const;

type RegisterProps = {
  readonly passwordPolicies: PasswordPolicies;
  readonly industries: Industry[];
  readonly countries: Country[];
};

const Register = ({
  passwordPolicies,
  industries,
  countries,
}: RegisterProps) => {
  const [isCurrentUser, setIsCurrentUser] = useState<string>();

  const searchParams = useSearchParams();
  const email = searchParams.get("email");

  return (
    <RecaptchaRefProvider>
      <div className="container max-w-[41.5rem] space-y-5 pb-14 pt-4 md:mt-6">
        <div className="flex flex-col gap-5 text-wurth-gray-800">
          <h1 className="font-title text-2xl font-medium tracking-[-0.144px] md:text-center md:text-5xl md:leading-[3.5rem] md:tracking-[-0.576px]">
            Create an Account
          </h1>

          <div className="flex flex-row items-center justify-between">
            <div className="text-base text-wurth-gray-800">{email}</div>

            <Link
              href="/sign-in"
              className={cn(
                buttonVariants({ variant: "outline" }),
                "btnAction font-bold text-black shadow-md",
              )}
              data-button-action="Register Change Email"
            >
              Change email
            </Link>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <section className="space-y-4 rounded-lg bg-wurth-gray-50 p-6">
            <h2 className="text-center text-base font-semibold text-black">
              <Balancer>
                Are you a current Wurth Louis & Company customer?
              </Balancer>
            </h2>

            <div className="flex flex-row items-center justify-center gap-3">
              {IS_CURRENT_USER.map((value) => (
                <Button
                  key={value}
                  variant="ghost"
                  className={cn(
                    "h-fit flex-1 gap-2 rounded-lg border-2 border-wurth-gray-150 bg-white p-4 font-bold text-wurth-gray-800 md:min-w-[7.5rem] md:flex-none",
                    value === isCurrentUser && "border-black",
                  )}
                  onClick={() => setIsCurrentUser(value)}
                >
                  {value === isCurrentUser ? (
                    <CheckCircleFilled
                      className="size-5"
                      data-button-action="Register Select Current User Flow"
                    />
                  ) : (
                    <CheckCircle
                      className="size-5 stroke-wurth-gray-150"
                      data-button-action="Register Select New User Flow"
                    />
                  )}

                  <span>{value}</span>
                </Button>
              ))}
            </div>
          </section>

          {isCurrentUser === "Yes" && (
            <CurrentUserFlow passwordPolicies={passwordPolicies} />
          )}

          {isCurrentUser === "No" && (
            <NewUserFlow
              passwordPolicies={passwordPolicies}
              industries={industries}
              countries={countries}
            />
          )}
        </div>
      </div>
    </RecaptchaRefProvider>
  );
};

export default Register;
