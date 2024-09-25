import { loginCheck } from "@/_lib/apis/shared";
import { SESSION_TOKEN_COOKIE } from "@/_lib/constants";
import { cookies } from "next/headers";
import FooterLinksLoggedIn from "./footer-links-logged-in";
import FooterLinksLoggedOut from "./footer-links-logged-out";

const FooterLinks = async () => {
  const cookieStore = cookies();
  const sessionToken = cookieStore.get(SESSION_TOKEN_COOKIE);

  const token = sessionToken?.value;
  if (!token) {
    return null;
  }

  const loginData = await loginCheck(token);

  if (loginData?.status_code === "NOT_LOGGED_IN") {
    return <FooterLinksLoggedOut />;
  }

  return <FooterLinksLoggedIn token={token} />;
};

export default FooterLinks;
