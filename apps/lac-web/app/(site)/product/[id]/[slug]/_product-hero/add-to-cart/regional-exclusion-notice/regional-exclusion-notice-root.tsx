import { SESSION_TOKEN_COOKIE } from "@/_lib/constants";
import { cookies } from "next/headers";
import { type ComponentProps } from "react";
import RegionalExclusionNotice from "./regional-exclusion-notice";

const RegionalExclusionNoticeRoot = (
  props: Omit<ComponentProps<typeof RegionalExclusionNotice>, "token">,
) => {
  const cookiesStore = cookies();
  const sessionCookie = cookiesStore.get(SESSION_TOKEN_COOKIE);

  if (!sessionCookie?.value) {
    return null;
  }

  return <RegionalExclusionNotice token={sessionCookie.value} {...props} />;
};

export default RegionalExclusionNoticeRoot;
