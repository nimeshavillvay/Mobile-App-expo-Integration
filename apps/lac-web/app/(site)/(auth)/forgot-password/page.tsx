import { RecaptchaRefProvider } from "@/_context/recaptcha-ref";
import type { Metadata } from "next";
import ForgotPasswordForm from "./forgot-password-form";

export const metadata: Metadata = {
  title: "Forgot Password",
};

type ForgotPasswordProps = {
  readonly searchParams: { [key: string]: string | string[] | undefined };
};

const ForgotPassword = ({ searchParams }: ForgotPasswordProps) => {
  const email = searchParams.email?.toString() ?? "";

  return (
    <RecaptchaRefProvider>
      <ForgotPasswordForm email={email} />
    </RecaptchaRefProvider>
  );
};

export default ForgotPassword;
