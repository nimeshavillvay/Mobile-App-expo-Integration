import { getCountries, getPasswordPolicies } from "@/_lib/apis/server";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getIndustries } from "./apis";
import Register from "./register";

export const metadata: Metadata = {
  title: "Register",
};

type RegisterPageProps = {
  readonly searchParams: { [key: string]: string | string[] | undefined };
};

const RegisterPage = async ({ searchParams }: RegisterPageProps) => {
  const email = searchParams.email?.toString();

  // If there is not email, redirect to the sign in page
  if (!email) {
    redirect("/sign-in");
  }

  const [passwordPolicies, industries, countries] = await Promise.all([
    getPasswordPolicies(),
    getIndustries(),
    getCountries(),
  ]);

  return (
    <Register
      passwordPolicies={passwordPolicies}
      industries={industries}
      countries={countries}
    />
  );
};

export default RegisterPage;
