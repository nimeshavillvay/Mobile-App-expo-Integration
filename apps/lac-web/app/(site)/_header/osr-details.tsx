import { SESSION_TOKEN_COOKIE } from "@/_lib/constants";
import { cookies } from "next/headers";
import OSRDetailsView from "./osr-details-view";

const OSRDetails = async () => {
  const sessionTokenCookie = cookies().get(SESSION_TOKEN_COOKIE);

  if (!sessionTokenCookie?.value) {
    return null;
  }

  return <OSRDetailsView token={sessionTokenCookie.value} />;
};

export default OSRDetails;
