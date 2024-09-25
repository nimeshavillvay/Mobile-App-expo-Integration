import { SESSION_TOKEN_COOKIE } from "@/_lib/constants";
import { Skeleton } from "@repo/web-ui/components/ui/skeleton";
import { cookies } from "next/headers";
import { Suspense, type ComponentProps } from "react";
import CheckoutButton from "./checkout-button";

const ButtonSkeleton = () => {
  return <Skeleton className="h-[3.75rem] rounded-lg shadow-md" />;
};

const CheckoutButtonWrapper = (
  props: Omit<ComponentProps<typeof CheckoutButton>, "token">,
) => {
  const cookiesStore = cookies();
  const sessionCookie = cookiesStore.get(SESSION_TOKEN_COOKIE);

  if (!sessionCookie?.value) {
    return <ButtonSkeleton />;
  }

  return <CheckoutButton token={sessionCookie.value} {...props} />;
};

const CheckoutButtonRoot = (
  props: ComponentProps<typeof CheckoutButtonWrapper>,
) => {
  return (
    <Suspense fallback={<ButtonSkeleton />}>
      <CheckoutButtonWrapper {...props} />
    </Suspense>
  );
};

export default CheckoutButtonRoot;
