import { SESSION_TOKEN_COOKIE } from "@/_lib/constants";
import { useCookies as useReactCookies } from "react-cookie";

const useCookies = () => {
  return useReactCookies([
    SESSION_TOKEN_COOKIE, // X-Cart session token
  ]);
};

export default useCookies;
