import { SESSION_TOKEN_COOKIE } from "@/_lib/constants";
import { Skeleton } from "@repo/web-ui/components/ui/skeleton";
import { cookies } from "next/headers";
import { Suspense, type ComponentProps } from "react";
import WillCallPlant from "./will-call-plant";

const WillCallPlantMain = (
  props: Omit<ComponentProps<typeof WillCallPlant>, "token">,
) => {
  const cookiesStore = cookies();
  const sessionCookie = cookiesStore.get(SESSION_TOKEN_COOKIE);

  if (!sessionCookie?.value) {
    return null;
  }

  return <WillCallPlant token={sessionCookie.value} {...props} />;
};

const WillCallPlantRoot = async (
  props: ComponentProps<typeof WillCallPlantMain>,
) => {
  return (
    <Suspense fallback={<Skeleton className="h-5 w-20" />}>
      <WillCallPlantMain {...props} />
    </Suspense>
  );
};

export default WillCallPlantRoot;
