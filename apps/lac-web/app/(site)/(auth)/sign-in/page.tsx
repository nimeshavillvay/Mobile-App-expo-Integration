import { Skeleton } from "@repo/web-ui/components/ui/skeleton";
import type { Metadata } from "next";
import { Suspense } from "react";
import SignIn from "./sign-in";

export const metadata: Metadata = {
  title: "Sign In",
};

const SignInPage = () => {
  return (
    <Suspense
      fallback={
        <div className="container">
          <Skeleton className="mx-auto my-20 h-[210px] max-w-[25rem] rounded-lg shadow-lg" />
        </div>
      }
    >
      <SignIn />
    </Suspense>
  );
};

export default SignInPage;
