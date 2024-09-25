import { SESSION_TOKEN_COOKIE } from "@/_lib/constants";
import { cookies } from "next/headers";
import { Suspense, type ComponentProps } from "react";
import SaleBadges from "./sale-badges";

const SaleBadgesWrapper = (
  props: Omit<ComponentProps<typeof SaleBadges>, "token">,
) => {
  const cookiesStore = cookies();
  const sessionCookie = cookiesStore.get(SESSION_TOKEN_COOKIE);

  if (!sessionCookie?.value) {
    return null;
  }

  return <SaleBadges token={sessionCookie.value} {...props} />;
};

const SaleBadgesRoot = (props: ComponentProps<typeof SaleBadgesWrapper>) => {
  return (
    <Suspense>
      <SaleBadgesWrapper {...props} />
    </Suspense>
  );
};

export default SaleBadgesRoot;
